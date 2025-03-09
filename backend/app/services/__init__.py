from .user_service import UserService
from .notes_service import NoteService
from .course_service import CourseService
from .assignment_service import AssignmentService
from .chat_service import ChatService
from .prog_assignment_service import ProgrammingAssignmentService
from .summary_service import SummaryService
from .rag_service import RAGService
#RAGService.load_lms_content()
#query = "Python"
#retrieved_docs = RAGService.retrieve_lms_content(query)
#print("docs retreived:",retrieved_docs)