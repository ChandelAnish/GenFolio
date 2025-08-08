# 🌐 Environment Variables Configuration

This file lists all the environment variables required to run the project.  
Create a `.env` file in the root directory and add the following variables with appropriate values.

---

## 🔗 Database

| Variable       | Description                                              |
|----------------|----------------------------------------------------------|
| `DATABASE_URL` | The connection string for your database (e.g., PostgreSQL, MongoDB). |

Example:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

---

## 🤖 AI API Keys

| Variable         | Description                                              |
|------------------|----------------------------------------------------------|
| `GROQ_API_KEY`   | Your API key for accessing Groq's LLM services.          |
| `GOOGLE_API_KEY` | Your API key for accessing Google Generative AI (Gemini) services. |

Example:
```env
GROQ_API_KEY=sk-your-groq-api-key-here
GOOGLE_API_KEY=your-google-api-key-here
```

---

## 📝 Notes

- Never commit your actual `.env` file to Git.
- Make sure to add `.env` to `.gitignore` to avoid exposing secrets.
- For deployment, set these values in the platform's environment settings (e.g., Vercel, Render, Railway, etc.)