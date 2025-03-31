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
   GOOGLE_API_KEY=your_gemini_key
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

# Frontend

This document contains the details about the implementation of the frontend part of the project without being integrated to the backend.

# How to run the Code

Download and install node and npm from their website..

Open the root folder containing the README file in a terminal.

Run `npm install` to install the necessary packages.

In the root folder create a file named `.env`

Add the line `VITE_BACKEND_URL=BACKEND_URL` where BACKEND_URL is the url on which the backend is hosted.

Run `npm run dev` to start the server.

# Libraries and Frameworks used

VueJs - JS framework for building the SPA Application.

TypeScript - For more efficient coding with the help of type hints.

Vue Router - Library to implement SPA routing in Vue.

Pinia - For Vue state management.

ViteJs - For scaffolding the VueJs project.

PostCSS - For adding css plugins.

ESLint - For better code practices.

Prettier - Formatter to make the code look good.

shadchan-vue - The UI library used.

Lucide Vue - The icon library used.

Google Fonts - CDN used to get the Inter font.

TailwindCSS - Utility class based css framework for faster styling.

Autoprefixer - For adding custom tailwind breakpoints.

VeeValidate - For form validation

Zod - For form validation Schema

DeepChat - For implementing the chat bot.