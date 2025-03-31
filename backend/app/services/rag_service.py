import chromadb
from sentence_transformers import SentenceTransformer
from app.models import AssignmentQuestion
from app import db 

class RAGService:
    
    # Load embedding model
    chroma_client = chromadb.PersistentClient(path="./vector_db")  # Stores embeddings persistently
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")  # Efficient & lightweight
    collection = chroma_client.get_or_create_collection(name="lms_content")
    restricted_collection = chroma_client.get_or_create_collection(name="restricted_questions")
    
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
    import sqlite3

    @staticmethod
    def load_restricted_questions():
        print("load_restricted_questions")
        questions = db.session.query(AssignmentQuestion).all()
        print(questions)
        for q in questions:
            
            # Generate embedding for question text
            embedding = RAGService.embed_text(q.question_text)

            # Add question to ChromaDB
            RAGService.restricted_collection.add(
                ids=[str(q.question_id)],  # Use question ID as the unique identifier
                embeddings=[embedding],
                documents=[q.question_text]  # Store question text
            )
    
    @staticmethod
    def is_restricted_question(query):
        query_embedding = RAGService.embed_text(query)
        results = RAGService.restricted_collection.query(query_embeddings=[query_embedding], n_results=1)

        if results and results.get("documents") and results["documents"][0]:
            similarity_score = results["distances"][0]  # Retrieve similarity score
            threshold = 0.6 # Adjust based on testing
            print(f"Similarity scores for query '{query}': {similarity_score}")
            return any (score < threshold for score in similarity_score)  # Block answering if similarity is high

        return False

    @staticmethod
    def retrieve_lms_content(query):
        query_embedding = RAGService.embed_text(query)
        results = RAGService.collection.query(query_embeddings=[query_embedding])

        if results and results.get("documents"):
            return results["documents"][0] if results["documents"][0] else ""
        return ""
    