from app.models import Conversation, ChatMessage
from app import db
import google.generativeai as genai
from datetime import datetime
import os
from dotenv import load_dotenv
from app.services.rag_service import RAGService

class ChatService:
    
    @staticmethod
    def initialize_gemini():
        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-1.5-flash')
        return model

    @staticmethod
    def get_student_conversations(student_id):
        return Conversation.query.filter_by(student_id=student_id).order_by(Conversation.updated_at.desc()).all()

    @staticmethod
    def get_conversation(conversation_id, student_id):
        return Conversation.query.filter_by(conversation_id=conversation_id, student_id=student_id).first()
    
    @staticmethod
    def delete_conversation(conversation_id, student_id):
        conversation = ChatService.get_conversation(conversation_id, student_id)
        db.session.delete(conversation)
        db.session.commit()

    @staticmethod
    def generate_conversation_title(message):
        model = ChatService.initialize_gemini()
        prompt = f"""Generate one short, concise title (max 5 words) for a conversation that starts with this message: '{message}.'
                    Do not return any other information except the single title."""
        response = model.generate_content(prompt)
        return response.text.strip()

    @staticmethod
    def start_new_conversation(student_id, first_message):
        title = ChatService.generate_conversation_title(first_message)
        conversation = Conversation(student_id=student_id, title=title)
        db.session.add(conversation)
        db.session.flush()  # This assigns an ID to the conversation without committing
        
        # Save the first message
        first_chat_message = ChatMessage(conversation_id=conversation.conversation_id, message_text=first_message, sender="user")
        db.session.add(first_chat_message)
        
        # Generate and save AI response
        ai_response = ChatService.generate_ai_response(conversation.conversation_id, first_message)
        
        db.session.commit()
        return conversation, first_chat_message, ai_response

    @staticmethod
    def continue_conversation(student_id, conversation_id, user_message):
        conversation = ChatService.get_conversation(conversation_id, student_id)

        # Save user message
        user_chat_message = ChatMessage(conversation_id=conversation_id, message_text=user_message, sender="user")
        db.session.add(user_chat_message)

        # Generate and save AI response
        ai_response = ChatService.generate_ai_response(conversation_id, user_message)

        conversation.updated_at = datetime.now()
        db.session.commit()

        return user_chat_message, ai_response

    @staticmethod
    def generate_ai_response(conversation_id, user_message):
        model = ChatService.initialize_gemini()

        # Retrieve LMS content and check for restricted question
        try:
            retrieved_content = RAGService.retrieve_lms_content(user_message)
            restricted_question = RAGService.is_restricted_question(user_message)
        except Exception as e:
            print(f"Error retrieving content from RAGService: {e}")
            retrieved_content = []
            restricted_question = False

        # If the question is restricted, return a pre-defined response
        if restricted_question:
            message = "This question is restricted and cannot be answered."
            ai_chat_message = ChatMessage(conversation_id=conversation_id, message_text=message, sender="model")
            db.session.add(ai_chat_message)
            return ai_chat_message

        # Retrieve recent chat history (limit to last 10 messages)
        recent_messages = (
            ChatMessage.query.filter_by(conversation_id=conversation_id)
            .order_by(ChatMessage.timestamp.desc()).limit(10).all()
        )
        recent_messages.reverse()

        chat_history = [
            {"role": "user" if msg.sender == "user" else "model", "parts": [msg.message_text]}
            for msg in recent_messages
        ]

        # **💡 Enforce system prompt in every turn**
        system_prompt = (
            "You are an AI tutor guiding students based on LMS content. "
            "Your role is to help them understand concepts, improve learning strategies, and maintain academic integrity. "
            "Do not answer questions that are unrelated to the LMS content. "
            "If the question is off-topic, politely inform the user that you can only answer questions related to course material."
        )

        if retrieved_content:
            system_prompt += f" The most relevant information retrieved from LMS: '{retrieved_content}'."

        # **🔹 Add system prompt in every turn**
        chat_history.insert(0, {"role": "user", "parts": [system_prompt]})

        # **🔹 Append the new user message**
        chat_history.append({"role": "user", "parts": [user_message]})

        # Generate AI response
        try:
            response = model.generate_content(chat_history)
            ai_message_text = response.text.strip()
        except Exception as e:
            print(f"Error generating AI response: {e}")
            ai_message_text = "I'm sorry, but I couldn't generate a response right now. Please try again."

        # Save AI response
        ai_chat_message = ChatMessage(conversation_id=conversation_id, message_text=ai_message_text, sender="model")
        db.session.add(ai_chat_message)

        return ai_chat_message

