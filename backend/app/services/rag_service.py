import chromadb
from sentence_transformers import SentenceTransformer

class RAGService:
    # Load embedding model
    chroma_client = chromadb.PersistentClient(path="./vector_db")  # Stores embeddings persistently
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")  # Efficient & lightweight
    collection = chroma_client.get_or_create_collection(name="lms_content")
    
    @staticmethod
    def embed_text(text):
        return RAGService.embedding_model.encode(text).tolist()
    
    # Example: Store lecture notes in ChromaDB
    @staticmethod
    def load_lms_content():
        # Load lecture notes into ChromaDB
        lecture_notes = [
            {"id": "1", "text": "Programming in Python","metadata": {"course": "Programming"}},
            {"id": "2", "text": "Machine Learning Techniques", "metadata": {"course": "Machine Learning"}},
            {"id": "3", "text": "Statistics for Data Science", "metadata": {"course": "Statistics"}}
        ]
    
        for note in lecture_notes:
            embedding = RAGService.embed_text(note["text"])  
            RAGService.collection.add(
                ids=[note["id"]],
                embeddings=[embedding],  
                metadatas=[note["metadata"]],
                documents=[note["text"]]  # **Ensure text is stored**
            )

    @staticmethod
    def retrieve_lms_content(query):
        query_embedding = RAGService.embed_text(query)
        results = RAGService.collection.query(query_embeddings=[query_embedding])

        if results and results.get("documents"):
            return results["documents"][0] if results["documents"][0] else ""
        return ""