import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Gamepad2,
  Heart,
  Medal,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Upload,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { examMeta, questions, type Question } from "./questions";

type Mode = "cards" | "practice" | "exam";
type AnswerState = Record<string, number | undefined>;

const modeCopy: Record<Mode, { label: string; title: string; icon: typeof Sparkles }> = {
  cards: { label: "Quest Cards", title: "Flip cards, rate your recall, keep your streak alive.", icon: Sparkles },
  practice: { label: "Practice Arena", title: "Answer, check instantly, and learn from each miss.", icon: Swords },
  exam: { label: "Exam Trial", title: "No hints. Submit at the end and earn your readiness badge.", icon: ShieldCheck },
};

function getRank(percent: number) {
  if (percent >= 90) return "Legend";
  if (percent >= 75) return "Ready";
  if (percent >= 60) return "Close";
  return "Training";
}

function percent(value: number, total: number) {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}

export function App() {
  const [mode, setMode] = useState<Mode>("practice");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [checkedPractice, setCheckedPractice] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(120);
  const [hearts, setHearts] = useState(3);

  const activeQuestion = questions[index];
  const selectedAnswer = answers[activeQuestion.id];
  const correctCount = useMemo(
    () => questions.filter((question) => answers[question.id] === question.correctOption).length,
    [answers],
  );
  const answeredCount = Object.values(answers).filter((answer) => answer !== undefined).length;
  const scorePercent = percent(correctCount, questions.length);
  const domains = Array.from(new Set(questions.map((question) => question.domain)));

  function resetSession(nextMode = mode) {
    setMode(nextMode);
    setIndex(0);
    setRevealed(false);
    setAnswers({});
    setCheckedPractice(false);
    setExamSubmitted(false);
    setStreak(0);
    setXp(120);
    setHearts(3);
  }

  function move(direction: -1 | 1) {
    setIndex((current) => Math.min(Math.max(current + direction, 0), questions.length - 1));
    setRevealed(false);
    setCheckedPractice(false);
  }

  function chooseAnswer(question: Question, optionIndex: number) {
    if (mode === "exam" && examSubmitted) return;
    if (mode === "practice" && checkedPractice) return;
    setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
  }

  function checkPracticeAnswer() {
    if (selectedAnswer === undefined) return;
    setCheckedPractice(true);
    if (selectedAnswer === activeQuestion.correctOption) {
      setStreak((current) => current + 1);
      setXp((current) => current + 35);
      return;
    }
    setStreak(0);
    setHearts((current) => Math.max(current - 1, 0));
  }

  const ModeIcon = modeCopy[mode].icon;

  return (
    <main className="app-shell">
      <section className="command-deck">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Gamepad2 aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">ServiceNow exam trainer</p>
            <h1>CIS-DF Quest</h1>
          </div>
        </div>

        <div className="stats-strip" aria-label="Player progress">
          <Stat icon={Flame} label="Streak" value={`${streak}`} />
          <Stat icon={Star} label="XP" value={`${xp}`} />
          <Stat icon={Heart} label="Hearts" value={`${hearts}`} />
          <Stat icon={Medal} label="Rank" value={getRank(scorePercent)} />
        </div>
      </section>

      <section className="hero-board">
        <div className="exam-summary">
          <p className="eyebrow">{examMeta.code}</p>
          <h2>{examMeta.name}</h2>
          <div className="mission-grid">
            <Pill icon={BookOpen} text={`${questions.length} playable questions`} />
            <Pill icon={Upload} text={`PDF source: ${examMeta.totalPdfQuestions} questions`} />
            <Pill icon={Clock3} text="Exam timer ready" />
          </div>
        </div>
        <div className="domain-map">
          {domains.map((domain, domainIndex) => (
            <span key={domain} className="domain-node" style={{ animationDelay: `${domainIndex * 90}ms` }}>
              {domain}
            </span>
          ))}
        </div>
      </section>

      <section className="mode-tabs" aria-label="Study mode">
        {(Object.keys(modeCopy) as Mode[]).map((modeKey) => {
          const Icon = modeCopy[modeKey].icon;
          return (
            <button
              className={mode === modeKey ? "mode-tab active" : "mode-tab"}
              key={modeKey}
              type="button"
              onClick={() => resetSession(modeKey)}
              title={modeCopy[modeKey].label}
            >
              <Icon aria-hidden="true" />
              <span>{modeCopy[modeKey].label}</span>
            </button>
          );
        })}
      </section>

      <section className="play-layout">
        <aside className="side-panel">
          <div className="panel-heading">
            <ModeIcon aria-hidden="true" />
            <div>
              <p className="eyebrow">Current mode</p>
              <h3>{modeCopy[mode].label}</h3>
            </div>
          </div>
          <p>{modeCopy[mode].title}</p>
          <div className="progress-rail">
            <span style={{ width: `${percent(answeredCount, questions.length)}%` }} />
          </div>
          <p className="progress-copy">
            {answeredCount} of {questions.length} answered
          </p>
          <button className="ghost-button" type="button" onClick={() => resetSession()}>
            <RotateCcw aria-hidden="true" />
            Reset run
          </button>
        </aside>

        <section className="question-stage">
          <div className="question-topline">
            <span>Question {index + 1} / {questions.length}</span>
            <span>{activeQuestion.domain}</span>
            <span>{activeQuestion.difficulty}</span>
          </div>

          {mode === "cards" ? (
            <Flashcard
              question={activeQuestion}
              revealed={revealed}
              onReveal={() => {
                setRevealed(true);
                setXp((current) => current + 10);
              }}
            />
          ) : (
            <QuestionPanel
              mode={mode}
              question={activeQuestion}
              selectedAnswer={selectedAnswer}
              showFeedback={mode === "practice" ? checkedPractice : examSubmitted}
              onChoose={chooseAnswer}
            />
          )}

          {mode === "practice" && (
            <div className="action-row">
              <button
                className="primary-button"
                type="button"
                onClick={checkPracticeAnswer}
                disabled={selectedAnswer === undefined || checkedPractice}
              >
                <CheckCircle2 aria-hidden="true" />
                Check answer
              </button>
            </div>
          )}

          {mode === "exam" && !examSubmitted && (
            <div className="action-row">
              <button
                className="primary-button"
                type="button"
                onClick={() => setExamSubmitted(true)}
                disabled={answeredCount < questions.length}
              >
                <Trophy aria-hidden="true" />
                Submit exam
              </button>
            </div>
          )}

          {mode === "exam" && examSubmitted && (
            <ResultBanner score={scorePercent} correct={correctCount} total={questions.length} />
          )}

          <nav className="pager" aria-label="Question navigation">
            <button type="button" onClick={() => move(-1)} disabled={index === 0} title="Previous question">
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="dot-track">
              {questions.map((question, questionIndex) => (
                <button
                  key={question.id}
                  className={[
                    "question-dot",
                    questionIndex === index ? "active" : "",
                    answers[question.id] !== undefined ? "answered" : "",
                  ].join(" ")}
                  type="button"
                  onClick={() => {
                    setIndex(questionIndex);
                    setRevealed(false);
                    setCheckedPractice(false);
                  }}
                  aria-label={`Go to question ${questionIndex + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} disabled={index === questions.length - 1} title="Next question">
              <ChevronRight aria-hidden="true" />
            </button>
          </nav>
        </section>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="stat">
      <Icon aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Pill({ icon: Icon, text }: { icon: typeof BookOpen; text: string }) {
  return (
    <span className="info-pill">
      <Icon aria-hidden="true" />
      {text}
    </span>
  );
}

function Flashcard({
  question,
  revealed,
  onReveal,
}: {
  question: Question;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <article className={revealed ? "flashcard revealed" : "flashcard"}>
      <div>
        <p className="eyebrow">Memory gate</p>
        <h2>{question.prompt}</h2>
      </div>
      {revealed ? (
        <div className="answer-reveal">
          <p className="correct-answer">{question.options[question.correctOption]}</p>
          <p>{question.explanation}</p>
        </div>
      ) : (
        <button className="primary-button" type="button" onClick={onReveal}>
          <Brain aria-hidden="true" />
          Reveal answer
        </button>
      )}
    </article>
  );
}

function QuestionPanel({
  mode,
  question,
  selectedAnswer,
  showFeedback,
  onChoose,
}: {
  mode: Mode;
  question: Question;
  selectedAnswer: number | undefined;
  showFeedback: boolean;
  onChoose: (question: Question, optionIndex: number) => void;
}) {
  return (
    <article className="question-card">
      <h2>{question.prompt}</h2>
      <div className="options-list">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;
          const isCorrect = question.correctOption === optionIndex;
          const stateClass = showFeedback && isCorrect ? " correct" : showFeedback && isSelected ? " wrong" : "";
          return (
            <button
              key={option}
              className={`answer-option${isSelected ? " selected" : ""}${stateClass}`}
              type="button"
              onClick={() => onChoose(question, optionIndex)}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              {option}
              {showFeedback && isCorrect && <CheckCircle2 aria-hidden="true" />}
              {showFeedback && isSelected && !isCorrect && <XCircle aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="feedback-box">
          <strong>{mode === "exam" ? "Review note" : selectedAnswer === question.correctOption ? "Critical hit" : "Training note"}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
}

function ResultBanner({ score, correct, total }: { score: number; correct: number; total: number }) {
  return (
    <div className="result-banner">
      <Trophy aria-hidden="true" />
      <div>
        <p className="eyebrow">Exam result</p>
        <h3>{score}% - {getRank(score)}</h3>
        <p>{correct} correct answers out of {total}. Review missed questions, then run the trial again.</p>
      </div>
    </div>
  );
}
