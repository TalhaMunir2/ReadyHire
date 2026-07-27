# ReadyHire

AI-powered candidate verification and hiring intelligence platform built with React, Tailwind CSS, Firebase, Axios, and Recharts.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Firebase calls activate when `VITE_FIREBASE_API_KEY` is set. Without credentials, authentication continues in presentation/demo mode. Backend calls are isolated in `src/services/api.js` and currently return realistic mock JSON using the shared Candidate data model.

## Demo routes

- `/candidate/dashboard`
- `/recruiter/dashboard`
- `/admin`

