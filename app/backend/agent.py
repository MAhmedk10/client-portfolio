import os
from typing import Annotated, TypedDict
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
import asyncio
from pinecone import Pinecone

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# ----------------------------
# Embedding Model (same as Code 02)
# ----------------------------
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

# ----------------------------
# Pinecone Setup (explicit, no wrapper)
# ----------------------------
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)

# ----------------------------
# Tool: Retrieve Context from Pinecone
# ----------------------------
@tool
def retrieve_query(query: str, top_k: int = 3) -> str:
    """
    Embed the query → search Pinecone → return relevant text chunks.
    """
    vector = embeddings.embed_query(query)

    results = index.query(
        vector=vector,
        top_k=top_k,
        include_metadata=True
    )

    matches = results.get("matches", [])
    if not matches:
        return "NO_RELEVANT_CONTEXT_FOUND"

    context = []
    for match in matches:
        text = match["metadata"].get("text", "")
        source = match["metadata"].get("source", "unknown")
        context.append(f"[Source: {source}]\n{text}")

    return "\n\n".join(context)

# ----------------------------
# Graph State
# ----------------------------
class State(TypedDict):
    messages: Annotated[list, add_messages]

# ----------------------------
# LLM Setup (Groq, same as Code 02)
# ----------------------------
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1,
    groq_api_key=GROQ_API_KEY
)

llm_with_tools = llm.bind_tools([retrieve_query])

# ----------------------------
# Agent Node
# ----------------------------
def agent_node(state: State):
    system_prompt = (
        "You are a professional AI assistant for a company.\n"
        "- If the user greets or asks general questions, answer directly.\n"
        "- If the user asks about company services, projects, or technical details, "
        "use the retrieve_query tool.\n"
        "- If the tool returns NO_RELEVANT_CONTEXT_FOUND, say politely that "
        "you do not have that information.\n"
        "- Never hallucinate."
    )

    messages = [{"role": "system", "content": system_prompt}] + state["messages"]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}

# ----------------------------
# Build LangGraph
# ----------------------------
builder = StateGraph(State)

builder.add_node("agent", agent_node)
builder.add_node("tools", ToolNode([retrieve_query]))

builder.add_edge(START, "agent")
builder.add_conditional_edges("agent", tools_condition)
builder.add_edge("tools", "agent")

graph = builder.compile()

memory = MemorySaver()
graph = builder.compile(checkpointer=memory)

# ----------------------------
# Helper function (like get_agent_response)
# ----------------------------
async def get_agent_response(user_input: str,thread_id:str):
    config = {"configurable": {"thread_id": thread_id}}
    final_state = await graph.ainvoke(
        {"messages": [("user", user_input)]},
        config=config
    )
    return final_state["messages"][-1].content

