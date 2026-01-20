import os
import time
from pinecone import Pinecone, ServerlessSpec
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv

load_dotenv()


# 1. Setup
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = os.getenv("PINECONE_INDEX")

# 2. Embedding Model (Hugging Face - Free)
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]
if index_name not in existing_indexes:
        pc.create_index(
            name=index_name,
            dimension=384,  
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
        # Wait for index to be ready
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)
else:
    print(f"Index '{index_name}' already exists. Ready for ingestion.")

def ingest_data(file_path: str):
    # Load and Split
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = text_splitter.split_documents(docs)
    
    # Create Index if not exists
    
    
    # Store in Pinecone
    vectorstore = PineconeVectorStore.from_documents(chunks, embeddings, index_name=index_name)
    print("Ingestion Complete.")
    return vectorstore
