export type Question = {
  id: string;
  domain: string;
  difficulty: "Novice" | "Skilled" | "Expert";
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: "cisdf-001",
    domain: "CMDB Foundations",
    difficulty: "Novice",
    prompt:
      "A team wants one reliable place to understand business services, infrastructure, and their relationships. Which ServiceNow capability is the best foundation for this?",
    options: [
      "Knowledge Management",
      "Configuration Management Database",
      "Service Catalog",
      "Incident Management",
    ],
    correctOption: 1,
    explanation:
      "The CMDB stores configuration items and relationships so teams can understand service context, impact, and dependencies.",
  },
  {
    id: "cisdf-002",
    domain: "CSDM",
    difficulty: "Skilled",
    prompt:
      "Why is the Common Service Data Model important when organizing service data?",
    options: [
      "It replaces all operational tables with custom tables.",
      "It gives a standard model for connecting services, offerings, applications, and infrastructure.",
      "It is only used for reporting license usage.",
      "It removes the need for discovery tools.",
    ],
    correctOption: 1,
    explanation:
      "CSDM provides a recommended data model that helps teams structure service information consistently across the platform.",
  },
  {
    id: "cisdf-003",
    domain: "Data Quality",
    difficulty: "Skilled",
    prompt:
      "A CMDB has duplicate records for the same server. Which outcome is most likely if duplicates are not resolved?",
    options: [
      "Impact analysis and reporting may become unreliable.",
      "User authentication will stop working.",
      "Catalog items will automatically retire.",
      "Every incident will be cancelled.",
    ],
    correctOption: 0,
    explanation:
      "Duplicate CIs can distort dependency maps, incident impact, change risk, and reporting.",
  },
  {
    id: "cisdf-004",
    domain: "Relationships",
    difficulty: "Novice",
    prompt:
      "What is the main value of CI relationships in a CMDB?",
    options: [
      "They store user passwords.",
      "They show how configuration items depend on or support each other.",
      "They create new assignment groups.",
      "They replace workflow approvals.",
    ],
    correctOption: 1,
    explanation:
      "Relationships make the CMDB useful for service mapping, impact analysis, root cause analysis, and change planning.",
  },
  {
    id: "cisdf-005",
    domain: "Governance",
    difficulty: "Expert",
    prompt:
      "A platform owner wants to improve confidence in CMDB data over time. Which practice is most appropriate?",
    options: [
      "Allow every team to create unrestricted CI classes.",
      "Define ownership, health metrics, reconciliation rules, and regular data quality reviews.",
      "Delete older CIs every month.",
      "Store all CI data in free-text description fields.",
    ],
    correctOption: 1,
    explanation:
      "Healthy data needs governance: clear owners, standards, reconciliation, certification, and ongoing review.",
  },
  {
    id: "cisdf-006",
    domain: "Import Strategy",
    difficulty: "Skilled",
    prompt:
      "When importing question content from a PDF into this app, what should happen before questions are published to learners?",
    options: [
      "The app should publish everything automatically without review.",
      "The app should review parsed questions, options, correct answers, and explanations for accuracy.",
      "The app should ignore answer choices.",
      "The app should convert every page into one question.",
    ],
    correctOption: 1,
    explanation:
      "PDF extraction can be imperfect, so an admin review step prevents malformed questions from reaching learners.",
  },
];

export const examMeta = {
  code: "CIS-DF",
  name: "Certified Implementation Specialist - Data Foundations",
  totalPdfQuestions: 77,
  sourcePages: 74,
};
