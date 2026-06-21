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

This starts as a frontend-only app so the learning experience can be designed quickly. A backend can be added later for accounts, saved progress, admin review, and PDF question imports.

## Product Modes

- Quest Cards: flashcard-style recall practice
- Practice Arena: answer one question at a time with immediate feedback
- Exam Trial: exam-style run with results shown at the end

## PDF Import Direction

The attached CIS-DF PDF is text-readable but has copy restrictions. The production import flow should extract candidate questions, then require admin review before publishing them to learners.

## Development

```bash
npm install
npm run dev
```
