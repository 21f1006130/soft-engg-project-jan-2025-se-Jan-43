# soft-engg-project-jan-2025-se-Jan-43

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/21f1006130/soft-engg-project-jan-2025-se-Jan-43.git
   cd soft-engg-project-jan-2025-se-Jan-43
   ```

2. Set up a virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```sh
   cd backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the root of the backend directory and add the following variables:

   ```sh
   GEMINI_API_KET=your_gemini_key
   ```

5. Run the application:

   ```sh
   python3 run.py
   ```

   The API should now be running on `http://localhost:5000`.

## API Documentation

Once the application is running, you can access the Swagger UI documentation at `http://localhost:5000/docs`. This provides a comprehensive overview of all available endpoints and allows for easy testing.

## Testing

We use pytest for testing in our project. To run the test suite, make sure you're in the backend directory and run:

```sh
pytest -v
```

This will give you the status of all the test cases in the project.
