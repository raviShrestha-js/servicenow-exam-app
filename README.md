# CIS-DF Quest

A gamified practice app for the ServiceNow Certified Implementation Specialist - Data Foundations exam.

## Purpose

This app helps ServiceNow professionals prepare for CIS-DF through flashcards, guided practice, and exam-style sessions.

## Status

First playable frontend scaffold in progress.

## Stack

- React for interactive study modes and stateful quiz flows
- TypeScript for safer question and session data
- Vite for fast local development and builds
- Lucide React for interface icons
- Plain CSS for a custom game-like visual style

This starts as a frontend-only app so the learning experience can be designed quickly. A backend can be added later for accounts, saved progress, admin review, and DOCX/PDF question imports.

## Product Modes

- Quest Cards: flashcard-style recall practice
- Practice Arena: answer one question at a time with immediate feedback
- Exam Trial: exam-style run with results shown at the end

## Question Import Direction

The CIS-DF DOCX source has been converted into the app question bank. The current extraction produces 69 playable multiple-choice questions. Eight drag-and-drop questions are flagged for later visual review because their mappings are embedded visually rather than as normal text.

## Development

```bash
npm install
npm run dev
```

## Regenerate Questions

```bash
python3 scripts/extract_docx_questions.py "/path/to/ServiceNow-CIS-DF (2).docx" src/questions.ts
```
