# Requirements

This file tracks the product and technical direction for the CIS-DF Quest app.

## Product Goals

- Provide certification-focused practice for ServiceNow CIS-Data Foundation learners.
- Make study sessions feel game-like without making exam preparation less serious.
- Support flashcard recall, guided practice, and realistic exam-style attempts.
- Use DOCX/PDF question sources, with review before questions are published.

## First Exam Scope

- Exam: CIS-DF
- Name: Certified Implementation Specialist - Data Foundations
- Source: user-provided DOCX converted from the original PDF
- Source total: 77 questions
- Playable now: 69 multiple-choice questions
- Deferred: 8 drag-and-drop questions that need visual/manual mapping review

## MVP Modes

- Quest Cards
  - Flip/reveal answer flow
  - XP reward for review activity
  - Marking and confidence scoring later
- Practice Arena
  - Immediate answer checking
  - Explanation after each answer
  - Streak and hearts feedback
- Exam Trial
  - Answer all questions before submission
  - Results at the end
  - Review notes after submission

## Game-Like UI Direction

- Player stats: XP, streak, hearts, rank
- Quest language instead of dry quiz language
- Clear answer states for correct, incorrect, selected, and unanswered
- Compact dashboard-like layout suitable for repeated study
- Mobile-friendly controls for short study sessions

## Open Questions

- Should users have accounts in v1, or should progress stay local at first?
- Should DOCX/PDF imports be admin-only?
- Should the DOCX/PDF source be stored in the app, or only extracted question data?
- Should questions support multiple correct answers?
- Should explanations come from the PDF, be manually written, or be generated and reviewed?
- What pass mark and time limit should the CIS-DF exam simulation use?

## Future Decisions

- Backend framework
- Database and persistence model
- Question import/export format
- Authentication and roles
- Hosting and deployment strategy
