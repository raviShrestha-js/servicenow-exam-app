import {
  ArrowLeft,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileSearch,
  Flame,
  Heart,
  Medal,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Upload,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { examMeta, questions, type Question } from "./questions";

type Screen = "home" | "cards" | "practice" | "exam" | "results" | "import";
type StudyMode = Exclude<Screen, "home" | "results" | "import">;
type AnswerState = Record<string, number[] | undefined>;

type ModeConfig = {
  label: string;
  intro: string;
  icon: typeof Sparkles;
  cta: string;
};

const modeConfig: Record<StudyMode, ModeConfig> = {
  cards: {
    label: "Flashcard Quest",
    intro: "Flip one card at a time and train recall before you touch the options.",
    icon: Sparkles,
    cta: "Start Cards",
  },
  practice: {
    label: "Practice Exam",
    intro: "Answer, check instantly, and learn from every miss while keeping your streak.",
    icon: Swords,
    cta: "Start Practice",
  },
  exam: {
    label: "Exam Trial",
    intro: "No feedback until the end. Submit when every question is answered.",
    icon: ShieldCheck,
    cta: "Begin Trial",
  },
};

const screens = new Set<Screen>(["home", "cards", "practice", "exam", "results", "import"]);

function getHashScreen(): Screen {
  const hash = window.location.hash.replace("#", "") as Screen;
  return screens.has(hash) ? hash : "home";
}

function getRank(score: number) {
  if (score >= 90) return "Legend";
  if (score >= 75) return "Ready";
  if (score >= 60) return "Close";
  return "Training";
}

function percent(value: number, total: number) {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}

function arraysMatch(left: number[] = [], right: number[] = []) {
  if (left.length !== right.length) return false;
  const normalizedLeft = [...left].sort((a, b) => a - b);
  const normalizedRight = [...right].sort((a, b) => a - b);
  return normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

export function App() {
  const [screen, setScreen] = useState<Screen>(getHashScreen);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [checkedPractice, setCheckedPractice] = useState(false);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(120);
  const [hearts, setHearts] = useState(3);

  const activeQuestion = questions[index];
  const selectedAnswers = answers[activeQuestion.id] ?? [];
  const correctCount = useMemo(
    () => questions.filter((question) => arraysMatch(answers[question.id], question.correctOptions)).length,
    [answers],
  );
  const answeredCount = questions.filter((question) => (answers[question.id] ?? []).length > 0).length;
  const score = percent(correctCount, questions.length);
  const domains = Array.from(new Set(questions.map((question) => question.domain)));
  const isPracticeCorrect = arraysMatch(selectedAnswers, activeQuestion.correctOptions);
  const canMoveNext = index < questions.length - 1;

  useEffect(() => {
    function syncHash() {
      const nextScreen = getHashScreen();
      setScreen(nextScreen);
      setIndex(0);
      setRevealed(false);
      setCheckedPractice(false);
      if (nextScreen === "cards" || nextScreen === "practice" || nextScreen === "exam") {
        setAnswers({});
        setStreak(0);
        setHearts(3);
      }
    }

    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function navigate(nextScreen: Screen) {
    window.location.hash = nextScreen === "home" ? "" : nextScreen;
    setScreen(nextScreen);
  }

  function startMode(nextScreen: StudyMode) {
    navigate(nextScreen);
    setIndex(0);
    setRevealed(false);
    setAnswers({});
    setCheckedPractice(false);
    setStreak(0);
    setHearts(3);
  }

  function resetCurrentRun() {
    if (screen === "cards" || screen === "practice" || screen === "exam") {
      startMode(screen);
    }
  }

  function goHome() {
    navigate("home");
    setRevealed(false);
    setCheckedPractice(false);
  }

  function move(direction: -1 | 1) {
    setIndex((current) => Math.min(Math.max(current + direction, 0), questions.length - 1));
    setRevealed(false);
    setCheckedPractice(false);
  }

  function chooseAnswer(question: Question, optionIndex: number) {
    if (screen === "practice" && checkedPractice) return;
    setAnswers((current) => {
      const selected = current[question.id] ?? [];
      if (question.correctOptions.length === 1) {
        return { ...current, [question.id]: [optionIndex] };
      }

      const nextSelected = selected.includes(optionIndex)
        ? selected.filter((answer) => answer !== optionIndex)
        : [...selected, optionIndex];

      return { ...current, [question.id]: nextSelected };
    });
  }

  function checkPracticeAnswer() {
    if (selectedAnswers.length === 0) return;
    setCheckedPractice(true);
    if (arraysMatch(selectedAnswers, activeQuestion.correctOptions)) {
      setStreak((current) => current + 1);
      setXp((current) => current + 35);
      return;
    }
    setStreak(0);
    setHearts((current) => Math.max(current - 1, 0));
  }

  function finishExam() {
    navigate("results");
    setXp((current) => current + correctCount * 25);
  }

  function continuePractice() {
    if (canMoveNext) {
      move(1);
      return;
    }
    goHome();
  }

  return (
    <main className="app-shell">
      <AppHeader
        currentScreen={screen}
        onHome={goHome}
        onImport={() => navigate("import")}
        xp={xp}
        streak={streak}
        hearts={hearts}
        rank={getRank(score)}
      />

      {screen === "home" && (
        <HomeScreen domains={domains} />
      )}

      {screen === "cards" && (
        <StudyShell
          title="Flashcard Quest"
          subtitle="One idea at a time. Reveal the answer only after you commit mentally."
          answeredCount={answeredCount}
          index={index}
          answers={answers}
          onBack={goHome}
          onReset={resetCurrentRun}
          onJump={setIndex}
        >
          <Flashcard
            question={activeQuestion}
            questionNumber={index + 1}
            revealed={revealed}
            onReveal={() => {
              setRevealed(true);
              setXp((current) => current + 10);
            }}
          />
          <QuestionControls index={index} onMove={move} />
        </StudyShell>
      )}

      {screen === "practice" && (
        <StudyShell
          title="Practice Exam"
          subtitle="Choose an answer, check it, then move on with the lesson fresh in your head."
          answeredCount={answeredCount}
          index={index}
          answers={answers}
          onBack={goHome}
          onReset={resetCurrentRun}
          onJump={setIndex}
        >
          <QuestionPanel
            question={activeQuestion}
            questionNumber={index + 1}
            selectedAnswers={selectedAnswers}
            showFeedback={checkedPractice}
            onChoose={chooseAnswer}
          />
          <div className="screen-actions">
            {checkedPractice && (
              <span className={isPracticeCorrect ? "result-chip correct" : "result-chip wrong"}>
                {isPracticeCorrect ? "Correct" : "Review the explanation"}
              </span>
            )}
            {!checkedPractice ? (
              <button
                className="primary-button"
                type="button"
                onClick={checkPracticeAnswer}
                disabled={selectedAnswers.length === 0}
              >
                <CheckCircle2 aria-hidden="true" />
                Check Answer
              </button>
            ) : (
              <button className="primary-button" type="button" onClick={continuePractice}>
                {canMoveNext ? "Next Question" : "Finish Practice"}
                <ChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
          <QuestionControls index={index} onMove={move} />
        </StudyShell>
      )}

      {screen === "exam" && (
        <StudyShell
          title="Exam Trial"
          subtitle="No answer feedback during the trial. Answer every question, then submit."
          answeredCount={answeredCount}
          index={index}
          answers={answers}
          onBack={goHome}
          onReset={resetCurrentRun}
          onJump={setIndex}
        >
          <QuestionPanel
            question={activeQuestion}
            questionNumber={index + 1}
            selectedAnswers={selectedAnswers}
            showFeedback={false}
            onChoose={chooseAnswer}
          />
          <div className="screen-actions split">
            <span>{answeredCount === questions.length ? "Ready to submit" : `${questions.length - answeredCount} left`}</span>
            <button
              className="primary-button"
              type="button"
              onClick={finishExam}
              disabled={answeredCount < questions.length}
            >
              <Trophy aria-hidden="true" />
              Submit Trial
            </button>
          </div>
          <QuestionControls index={index} onMove={move} />
        </StudyShell>
      )}

      {screen === "results" && (
        <ResultsScreen correct={correctCount} score={score} onRetake={() => startMode("exam")} onHome={goHome} />
      )}

      {screen === "import" && <ImportScreen onBack={goHome} />}
    </main>
  );
}

function AppHeader({
  currentScreen,
  onHome,
  onImport,
  xp,
  streak,
  hearts,
  rank,
}: {
  currentScreen: Screen;
  onHome: () => void;
  onImport: () => void;
  xp: number;
  streak: number;
  hearts: number;
  rank: string;
}) {
  const navItems: Array<{ screen: Screen; label: string; action: () => void }> = [
    { screen: "home", label: "Missions", action: onHome },
    { screen: "import", label: "Import Lab", action: onImport },
  ];

  return (
    <header className="app-header">
      <button className="brand-button" type="button" onClick={onHome}>
        <span className="brand-mark">
          <BookOpen aria-hidden="true" />
        </span>
        <span>
          <strong>CIS-DF Quest</strong>
          <small>ServiceNow Data Foundations</small>
        </span>
      </button>

      <nav className="top-nav" aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item.screen}
            className={currentScreen === item.screen ? "active" : ""}
            href={item.screen === "home" ? "#" : `#${item.screen}`}
            onClick={item.action}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="player-bar" aria-label="Player status">
        <PlayerStat icon={Flame} value={`${streak}`} label="Streak" />
        <PlayerStat icon={Star} value={`${xp}`} label="XP" />
        <PlayerStat icon={Heart} value={`${hearts}`} label="Hearts" />
        <PlayerStat icon={Medal} value={rank} label="Rank" />
      </div>
    </header>
  );
}

function HomeScreen({ domains }: { domains: string[] }) {
  return (
    <section className="home-screen">
      <div className="mission-hero">
        <p className="eyebrow">{examMeta.code}</p>
        <h1>Choose your training run.</h1>
        <p className="hero-copy">
          A focused CIS-Data Foundation trainer with separate spaces for recall, practice, and exam simulation.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#practice">
            <Play aria-hidden="true" />
            Continue Training
          </a>
          <a className="secondary-button" href="#import">
            <Upload aria-hidden="true" />
            Open Import Lab
          </a>
        </div>
      </div>

      <div className="mission-select">
        {(Object.keys(modeConfig) as StudyMode[]).map((mode) => {
          const Icon = modeConfig[mode].icon;
          return (
            <a className="mission-card" key={mode} href={`#${mode}`}>
              <span className="mission-icon">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <strong>{modeConfig[mode].label}</strong>
                <small>{modeConfig[mode].intro}</small>
              </span>
              <b>{modeConfig[mode].cta}</b>
            </a>
          );
        })}
      </div>

      <section className="intel-strip" aria-label="Exam setup">
        <Intel icon={FileSearch} label="DOCX source" value={`${examMeta.totalSourceQuestions} questions`} />
        <Intel icon={Clock3} label="Question bank" value={`${examMeta.playableQuestions} playable now`} />
        <Intel icon={Brain} label="Domains" value={`${domains.length} mapped`} />
      </section>
    </section>
  );
}

function StudyShell({
  title,
  subtitle,
  answeredCount,
  index,
  answers,
  onBack,
  onReset,
  onJump,
  children,
}: {
  title: string;
  subtitle: string;
  answeredCount: number;
  index: number;
  answers: AnswerState;
  onBack: () => void;
  onReset: () => void;
  onJump: (index: number) => void;
  children: ReactNode;
}) {
  return (
    <section className="study-screen">
      <div className="screen-heading">
        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          Missions
        </button>
        <div>
          <p className="eyebrow">Active run</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="secondary-button compact" type="button" onClick={onReset}>
          <RotateCcw aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="run-progress" aria-label={`${answeredCount} of ${questions.length} answered`}>
        <span style={{ width: `${percent(answeredCount, questions.length)}%` }} />
      </div>

      <div className="study-layout">
        <div className="stage-panel">{children}</div>
        <QuestionPalette index={index} onJump={onJump} answered={answers} />
      </div>
    </section>
  );
}

function Flashcard({
  question,
  questionNumber,
  revealed,
  onReveal,
}: {
  question: Question;
  questionNumber: number;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <article className={revealed ? "focus-card revealed" : "focus-card"}>
      <QuestionMeta question={question} questionNumber={questionNumber} />
      <h2>{question.prompt}</h2>
      {revealed ? (
        <div className="answer-reveal">
          <strong>{question.correctOptions.map((optionIndex) => question.options[optionIndex]).join(", ")}</strong>
          <ExplanationText lines={question.explanation} />
        </div>
      ) : (
        <button className="primary-button" type="button" onClick={onReveal}>
          <Sparkles aria-hidden="true" />
          Reveal Answer
        </button>
      )}
    </article>
  );
}

function QuestionPanel({
  question,
  questionNumber,
  selectedAnswers,
  showFeedback,
  onChoose,
}: {
  question: Question;
  questionNumber: number;
  selectedAnswers: number[];
  showFeedback: boolean;
  onChoose: (question: Question, optionIndex: number) => void;
}) {
  const isCorrectAnswer = arraysMatch(selectedAnswers, question.correctOptions);

  return (
    <article className="focus-card">
      <QuestionMeta question={question} questionNumber={questionNumber} />
      <h2>{question.prompt}</h2>
      {question.correctOptions.length > 1 && (
        <p className="selection-note">Choose {question.correctOptions.length} options.</p>
      )}
      <div className="options-list">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswers.includes(optionIndex);
          const isCorrect = question.correctOptions.includes(optionIndex);
          const stateClass = showFeedback && isCorrect ? " correct" : showFeedback && isSelected ? " wrong" : "";
          return (
            <button
              key={option}
              className={`answer-option${isSelected ? " selected" : ""}${stateClass}`}
              type="button"
              onClick={() => onChoose(question, optionIndex)}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              <strong>{option}</strong>
              {showFeedback && isCorrect && <CheckCircle2 aria-hidden="true" />}
              {showFeedback && isSelected && !isCorrect && <XCircle aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="feedback-box">
          <strong>{isCorrectAnswer ? "Correct" : "Review this"}</strong>
          <ExplanationText lines={question.explanation} />
        </div>
      )}
    </article>
  );
}

function ExplanationText({ lines }: { lines: string[] }) {
  return (
    <div className="explanation-text">
      {lines.map((line, index) => (
        <p key={`${index}-${line.slice(0, 20)}`}>{line}</p>
      ))}
    </div>
  );
}

function ResultsScreen({
  correct,
  score,
  onRetake,
  onHome,
}: {
  correct: number;
  score: number;
  onRetake: () => void;
  onHome: () => void;
}) {
  return (
    <section className="results-screen">
      <div className="result-medal">
        <Trophy aria-hidden="true" />
      </div>
      <p className="eyebrow">Trial Complete</p>
      <h1>{score}% - {getRank(score)}</h1>
      <p>
        You answered {correct} of {questions.length} correctly. Review the question bank, then run another trial.
      </p>
      <div className="hero-actions">
        <button className="primary-button" type="button" onClick={onRetake}>
          <ShieldCheck aria-hidden="true" />
          Retake Trial
        </button>
        <button className="secondary-button" type="button" onClick={onHome}>
          <ArrowLeft aria-hidden="true" />
          Back to Missions
        </button>
      </div>
    </section>
  );
}

function ImportScreen({ onBack }: { onBack: () => void }) {
  return (
    <section className="import-screen">
      <button className="back-button" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" />
        Missions
      </button>
      <div className="import-panel">
        <FileSearch aria-hidden="true" />
        <p className="eyebrow">Import Lab</p>
        <h1>Question import will live here.</h1>
        <p>
          The CIS-DF DOCX can generate playable multiple-choice questions. Drag-and-drop questions need a
          visual review step before they can be published into the bank.
        </p>
        <div className="import-steps">
          <span>1. Extract DOCX text</span>
          <span>2. Review questions</span>
          <span>3. Publish to modes</span>
        </div>
      </div>
    </section>
  );
}

function QuestionMeta({ question, questionNumber }: { question: Question; questionNumber: number }) {
  return (
    <div className="question-meta">
      <span>Question {questionNumber} / {questions.length}</span>
      <span>{question.domain}</span>
      <span>{question.difficulty}</span>
    </div>
  );
}

function QuestionControls({
  index,
  onMove,
}: {
  index: number;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <nav className="question-controls" aria-label="Question navigation">
      <button type="button" onClick={() => onMove(-1)} disabled={index === 0}>
        <ChevronLeft aria-hidden="true" />
        Previous
      </button>
      <span>Question {index + 1} of {questions.length}</span>
      <button type="button" onClick={() => onMove(1)} disabled={index === questions.length - 1}>
        Next
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}

function QuestionPalette({
  index,
  onJump,
  answered,
}: {
  index: number;
  onJump: (index: number) => void;
  answered: AnswerState;
}) {
  return (
    <aside className="question-palette" aria-label="Question palette">
      <div>
        <p className="eyebrow">Questions</p>
        <strong>{questions.length} total</strong>
      </div>
      <div className="palette-grid">
        {questions.map((question, questionIndex) => (
          <button
            key={question.id}
            className={[
              "question-tile",
              questionIndex === index ? "active" : "",
              (answered[question.id] ?? []).length > 0 ? "answered" : "",
            ].join(" ")}
            type="button"
            onClick={() => onJump(questionIndex)}
            aria-label={`Go to question ${questionIndex + 1}${(answered[question.id] ?? []).length > 0 ? ", answered" : ""}`}
          >
            {questionIndex + 1}
          </button>
        ))}
      </div>
    </aside>
  );
}

function PlayerStat({ icon: Icon, value, label }: { icon: typeof Flame; value: string; label: string }) {
  return (
    <span className="player-stat">
      <Icon aria-hidden="true" />
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}

function Intel({ icon: Icon, label, value }: { icon: typeof FileSearch; label: string; value: string }) {
  return (
    <span className="intel-item">
      <Icon aria-hidden="true" />
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  );
}
