export type Question = {
  id: string;
  sourceQuestionNumber: number;
  domain: string;
  difficulty: "Novice" | "Skilled" | "Expert";
  prompt: string;
  options: string[];
  correctOptions: number[];
  explanation: string[];
};

export const questions: Question[] = [
  {
    "id": "cisdf-002",
    "sourceQuestionNumber": 2,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator has built a number of Technology Management Service Offerings (Technical Service Offerings) based on Dynamic CI Groups to better maintain group alignment for the member CIs. Which groups are synced to CIs from the offering that has a relationship to a Dynamic CI Group?",
    "options": [
      "Approval Group",
      "Managed by Group",
      "Owned by Group",
      "Support Group"
    ],
    "correctOptions": [
      1,
      3
    ],
    "explanation": [
      "In ServiceNow, Dynamic CI Groups are a core Data Foundations capability used to automatically manage CI membership based on rules rather than manual maintenance. When Technology Management Service Offerings (Technical Service Offerings) are related to Dynamic CI Groups, ServiceNow uses those relationships to synchronize operational support attributes to the member CIs.",
      "The two CI attributes that are intentionally designed to sync in this model are the Managed by Group and the Support Group. These groups directly influence operational ownership and support routing, which is why they are automatically aligned when Dynamic CI Groups are used. This ensures that incidents, changes, problems, and operational tasks are routed consistently as CI membership changes over time.",
      "The Support Group defines who provides day-to-day operational support and is critical for Incident and Request Management workflows. The Managed by Group represents the team responsible for the technical lifecycle and operational health of the CI. Synchronizing these attributes eliminates manual updates and reduces misrouted tickets, which is a key goal of Configuration Management maturity.",
      "The Approval Group (Option A) is not synced because approvals are process-driven and often context-specific rather than CI-driven. Similarly, the Owned by Group (Option C) represents accountability or financial ownership, which is intentionally decoupled from dynamic operational grouping to avoid unintended governance changes.",
      "Therefore, the correct answers are B (Managed by Group) and D (Support Group)."
    ]
  },
  {
    "id": "cisdf-003",
    "sourceQuestionNumber": 3,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "The following Reconciliation Rules were configured for ServiceNow, Altiris, and SCCM for the Windows Server (cmdb_ci_win_server) class: Which statements are true?",
    "options": [
      "Data collected with a discovery source of Altiris can update records inserted by SCCM into the Windows Server table.",
      "Data collected with a discovery source of ServiceNow can insert new records into the Windows Server table, but cannot update records created by Altiris or SCCM.",
      "Data collected with a discovery source of SCCM can be inserted as new records in the Windows Server table.",
      "Data collected with a discovery source of SCCM can update any record in the Windows Server table because it has the highest priority number."
    ],
    "correctOptions": [
      0,
      2
    ],
    "explanation": [
      "This question tests understanding of reconciliation source priority in the Identification and Reconciliation Engine (IRE) in ServiceNow.",
      "In reconciliation rules, lower numeric values represent higher priority. Therefore, the priority order is: ServiceNow (100) - highest authority",
      "Altiris (200)",
      "SCCM (300) - lowest authority Why A is correct",
      "Because Altiris (200) has higher priority than SCCM (300), data from Altiris can update records originally inserted by SCCM. This is exactly how reconciliation precedence works - higher-priority sources can overwrite lower-priority ones.",
      "Why C is correct",
      "SCCM, even though it has thelowest priority, is still an authorized discovery source. It can insert new records into the Windows Server table when no existing CI is identified. Priority only affects updates, not the ability to create records.",
      "Why B is incorrect",
      "ServiceNow (priority 100) can update records from Altiris and SCCMbecause it has the highest priority. The statement incorrectly claims it cannot.",
      "Why D is incorrect",
      "SCCM does not have the highest authority. A higher numeric value means lower priority, so SCCM cannot update records created by higher-priority sources."
    ]
  },
  {
    "id": "cisdf-004",
    "sourceQuestionNumber": 4,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is using the Duplicate CI Remediator to address a de-duplication task. On the first tab of the wizard, the Main CI is selected. Which attributes are used to identify the Main CI? (Choose two)",
    "options": [
      "Oldest Created",
      "Most Related Items",
      "Newest Created",
      "Least Related Items"
    ],
    "correctOptions": [
      0,
      1
    ],
    "explanation": [
      "In ServiceNow, the Duplicate CI Remediator is a governed tool designed to safely resolve duplicate Configuration Items while preserving the most valuable and authoritative record. The first step in the remediation wizard is identifying the Main CI, which will be retained after remediation.",
      "ServiceNow uses two primary attributes to help determine the best candidate for the Main CI: Oldest Created (Option A)",
      "The oldest CI is often preferred because it typically has a longer operational history, may be referenced by historical incidents, changes, problems, or audits, and is more likely to be embedded in downstream processes and reports. Retaining the oldest CI helps avoid breaking historical references.",
      "Most Related Items (Option B)",
      "A CI with the most relationships (for example, links to applications, services, incidents, or other CIs) is generally the most valuable from a business and operational contextperspective. Preserving these relationships is critical for impact analys is, Change Management, and CSDM-aligned service modeling.",
      "Options C (Newest Created) and D (Least Related Items) are not used as selection criteria because newer or weakly-related CIs typically contain less historical and relational value and are better candidates for removal or merging.",
      "By prioritizing Oldest Created and Most Related Items, the Duplicate CI Remediator aligns with CMDB Data Foundations best practices, ensuring minimal data loss, preserved business context, and safer de-duplication outcomes.",
      "Therefore, the correct answers are A and B."
    ]
  },
  {
    "id": "cisdf-005",
    "sourceQuestionNumber": 5,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "What is the difference between Data Certification and Attestation policies when managing a CI?",
    "options": [
      "Attestation requires correcting specific attributes of a CI, while Data Certification tracks acknowledgement the CI still exists",
      "Attestation can be scheduled, while Data Certification cannot be scheduled",
      "Attestation can be assigned to a group or an individual, while Data Certification can only be assigned to an individual",
      "Attestation tracks acknowledgement the CI still exists, while Data Certification requires validating specific attributes of a CI"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "Within ServiceNow CMDB governance, Attestationand Data Certificationserve distinct but complementary purposes. The key difference lies inwhat is being validated.",
      "Attestationis focused onexistence and ownership confirmation. When a CI is attested, the assigned user or group is asked to confirm that the CIstill exists, is still relevant, and is still owned or managed by the appropriate team. No detailed attribute-level validation is required. This lightweight process is commonly used to prevent \"ghost CIs\" from lingering in the CMDB.",
      "Data Certification, on the other hand, is more rigorous. It requires the certifier tovalidate specific attributesof the CI, such as lifecycle status, support group, environment, or service relationships. Certification ensuresdata correctness and completeness, which directly impacts CMDB Health scores and downstream processes like Change and Incident Management.",
      "Options A, B, and C incorrectly describe these mechanisms or their assignment and scheduling capabilities. Both attestation and certification can be scheduled and assigned flexibly, but theirvalidation depth is what truly differentiates them.",
      "Therefore, Option D correctly describes the distinction: attestation confirms existence, while data certification validates CI attributes."
    ]
  },
  {
    "id": "cisdf-006",
    "sourceQuestionNumber": 6,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is implementing Vulnerability Response or Security Incident Response and needs to ensure customers have enough context to estimate risk and set task priorities. Which Get Well Playbookfrom the CSDM Data Foundations Dashboardhelps with this?",
    "options": [
      "Locations without a Parent Location",
      "Application Services with Business Application Relationships",
      "Named Product Models without Product Owners",
      "Percentage of Custom Status Values for CI Life Cycle Stages"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In ServiceNow, Vulnerability Response and Security Incident Response rely heavily onbusiness contextto accurately assess risk, prioritize remediation tasks, and communicate impact to stakeholders. From a CSDM (Common Service Data Model) perspective, this context is primarily delivered throughproperly modeled relationships between Application Services and Business Applications.",
      "The\"Application Services with Business Application Relationships\" Get Well Playbookdirectly addresses this requirement. In CSDM, Application Servicesrepresent the technical, deployable services that run in the environment, while Business Applicationsrepresent the logical applications that support business capabilities. When these two are correctly related, security teams can clearly understandwhich business processes, customers, and revenue streams are affectedby a vulnerability or security incident.",
      "Without this relationship, vulnerabilities may still be detected, but they lack meaningful prioritization. For example, a critical vulnerability on an application service supporting a revenue-generating or customer-facing business application should be addressed far more urgently than one tied to a low-impact internal tool. This relationship is what enablesrisk-based prioritization, rather than purely technical severity-based prioritization.",
      "The other options do not fulfill this need. Location hierarchy issues (Option A) and CI lifecycle status consistency (Option D) relate more to CMDB hygiene and governance, not security context. Product ownership gaps (Option C) affect accountability but do not directly enable risk estimation during security response.",
      "Therefore, Option Bis the correct and CSDM-aligned Get Well Playbook for ensuring sufficient business context in Vulnerability Response and Security Incident Response workflows."
    ]
  },
  {
    "id": "cisdf-007",
    "sourceQuestionNumber": 7,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A Change Manager aims to streamline ITSM processes by automatically populating fields on the Change formwhen a CI is selected. The Configuration Management team ensures that the Change Groupfield is populated for all managed CIs. As a result, whichbase system field on the Change formwill be automatically populated after selecting a CI?",
    "options": [
      "Change Group",
      "Assignment Group",
      "Managed by Group",
      "Approval Group"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "In a mature Configuration Management implementation within ServiceNow, CI operational attributes are leveraged to automate Change Management workflowsand reduce manual effort.",
      "When a CI is selected on a Change record, ServiceNow evaluates the CI's Change Groupattribute. If this field is populated on the CI, the platform automatically copies its value into the Change Group field on the Change",
      "form. This ensures that change ownership and governance are immediately aligned with the responsible technical team.",
      "The Change Groupis distinct from the Assignment Group, which is used primarily in Incident and Task routing. Managed by Grouprepresents lifecycle ownership and is used by CMDB governance tools, while Approval Groupcontrols approval workflows but is not auto-populated from CI selection.",
      "This behavior demonstrates the value of accurate CI attributes: once populated consistently, they enableautomatic field population, reduced manual errors, and faster processingacross ITSM workflows.",
      "Therefore, the correct answer is A - Change Group."
    ]
  },
  {
    "id": "cisdf-009",
    "sourceQuestionNumber": 9,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator wantsonly the CIs of Principal Classesto appear in CI reference fields, such as the CI reference field on an Incident form. Where does the CMDB Administrator designate Principal Classes?",
    "options": [
      "CMDB Workspace",
      "CI Class Manager",
      "System Properties",
      "CMDB Data Manager"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "Principal Classesare a key CMDB configuration concept used to controlwhich CI classes are selectable in reference fieldsacross ITSM processes. This helps reduce noise, prevent incorrect CI selection, and improve data quality.",
      "In ServiceNow, Principal Classes are designated within the CI Class Manager. This tool allows CMDB administrators to manage the CI class hierarchy, define ownership, and explicitly mark classes asprincipal. Once a class is marked as principal, its CIs become available in CI reference fields such as those on Incident, Change, and Problem forms.",
      "Option A (CMDB Workspace) provides operational and analytical views but does not control schema-level class behavior. Option C (System Properties) does not manage class designation. Option D (CMDB Data Manager) governs lifecycle and data quality policies, not reference field behavior.",
      "By configuring Principal Classes in the CI Class Manager, organizations ensure that only relevant, high-value CI classes are exposed to end users, aligning with Data Foundations best practices.",
      "Therefore, the correct answer is B - CI Class Manager."
    ]
  },
  {
    "id": "cisdf-010",
    "sourceQuestionNumber": 10,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is leveraging CI data as part of an Integrated Risk Management (IRM) implementation and the Entity Scopingprocess. The Administrator wants to leverage the CSDM Data Foundations Dashboard playbooks under the Run tab. Which CSDM relationships are leveraged using the CSDM playbooks?",
    "options": [
      "Business Applications that have their relationships to Information Objects",
      "Locations that have established parent records",
      "Business Applications that have relationships to Application Services",
      "Logical CIs that have relationships with Information Objects"
    ],
    "correctOptions": [
      0,
      3
    ],
    "explanation": [
      "The Runtab in the CSDM Data Foundations Dashboardfocuses on enablingoperationalized, risk-aware use cases, including Integrated Risk Management (IRM) and Entity Scoping. These use cases require organizations to understandwhat data is processed, where it resides, andwhich technical components are involved, rather than only service impact for ITSM.",
      "Information Objectsplay a central role at this stage.",
      "Option Ais correct because Business Applications related to Information Objectsallow organizations to identifywhat types of data (PII, PCI, PHI, regulated data) are processed by each business application. This relationship is essential forrisk classification, regulatory compliance, and audit scopingin IRM. Without it, risk assessments lack data sensitivity context.",
      "Option Dis also correct because Logical CIs (such as databases, schemas, or data stores) related to Information Objectsestablishwhere sensitive data is stored or processedat a technical level. This enables IRM to trace risk from business context down to technical exposure, supporting control testing, issue management, and remediation prioritization.",
      "Option B (Location hierarchy) supports foundational data quality but does not directly enable risk or entity scoping. Option C (Business Applications to Application Services) is critical forservice impact and Change",
      "/Incident Management, but it is more aligned toservice operationsrather thanrisk and data-centric scoping, which is the focus of the Run playbooks for IRM.",
      "Therefore, the correct answers are A and D, as they directly support IRM entity scoping, regulatory analys is, and risk visibilitythrough CSDM-aligned data modeling."
    ]
  },
  {
    "id": "cisdf-011",
    "sourceQuestionNumber": 11,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "The Incident Process Owner asks which classes of CSDM are used on the Incident form. Which classes are appropriate?",
    "options": [
      "Application Service",
      "Business Application",
      "Service Offering",
      "Service Portfolio"
    ],
    "correctOptions": [
      0,
      2
    ],
    "explanation": [
      "In the Common Service Data Model (CSDM), the Incident form is designed to captureoperational impactand enableeffective incident routing, prioritization, and communication. To achieve this, CSDM prescribes using classes that representhow services are delivered and consumed, not how they are planned or governed.",
      "Application Service (Option A) is an appropriate class on the Incident form because it represents thetechnical service that is running in productionand is directly impacted during an incident. Application Services are service-mapped, relate to underlying infrastructure, and support impact analys is, root cause investigation, and automated assignment. This makes them ideal for associating incidents with technical outages or degradations.",
      "Service Offering (Option C) is also appropriate because it representshow a service is consumed by users or business units. Service Offerings allow Incident Management to understandwho is affected, enable targeted communications, and support SLA/OLA alignment. For example, an email service offering for a specific department clearly identifies the impacted consumer group.",
      "Business Application (Option B) isnotrecommended on the Incident form. Business Applications are logical representations used for portfolio, ownership, and governance purposes, not day-to-day operational incident handling. Using them directly on incidents can reduce precision and automation.",
      "Service Portfolio (Option D) is a strategic construct used for service lifecycle management and is never associated with operational incidents.",
      "Therefore, according to CSDM best practices, the correct classes used on the Incident form are Application Serviceand Service Offering, making Options A and Cthe correct answers."
    ]
  },
  {
    "id": "cisdf-012",
    "sourceQuestionNumber": 12,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator has been tasked with gathering information for a presentation to leadership. The Administrator needs to provide Duplicate CI, Orphan CI, and Stale CI metrics. Which scorecardprovides this information on the CMDB Health Dashboard?",
    "options": [
      "Compliance",
      "Correctness",
      "Completeness"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "On the CMDB Health Dashboard in ServiceNow, health metrics are grouped into three primary scorecards: Completeness, Correctness, and Compliance. Each scorecard focuses on a distinct aspect of data quality.",
      "Duplicate CIs, Orphan CIs, and Stale CIsare all indicators ofdata accuracy and reliability, which fall under the Correctnessscorecard.",
      "Duplicate CIsindicate multiple records representing the same real-world item. Orphan CIsare missing required relationships.",
      "Stale CIshave not been updated within an expected timeframe.",
      "All three conditions reflect whether the CMDB data iscorrect and trustworthy, not whether it is complete or policy-compliant.",
      "The Completenessscorecard focuses on missing required attributes or relationships. The Compliancescorecard evaluates adherence to policies such as certifications, lifecycle rules, or patch compliance.",
      "Since leadership reporting typically focuses ontrust and accuracy of CMDB data, the Correctness scorecard is the authoritative source for these metrics.",
      "Therefore, the correct answer is B - Correctness."
    ]
  },
  {
    "id": "cisdf-013",
    "sourceQuestionNumber": 13,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "A Configuration Management Process Owner is preparing solution options for presentation to technical governance for ingestingcustom CIsinto the CMDB. The solution must align withbest practices, minimizefuture technical debt, and ensureupgrade compliance. Which solutions accomplish this?",
    "options": [
      "Repurposing a base CI class and renaming attributes as required",
      "Installing or upgrading the CMDB CI Class Models Storeapplication to find a suitable existing CI class accommodating any new attributes",
      "Extending the existing Assetclass table to custom CI class attributes",
      "Extending an existing CI class table to accommodate the custom CI class attributes"
    ],
    "correctOptions": [
      1,
      3
    ],
    "explanation": [
      "In ServiceNow, ingesting custom CIs must be done with a strong focus onupgrade safety, governance, and long-term maintainability. Data Foundations guidance explicitly discourages repurposing or overloading base classes, as this creates technical debt and upgrade risk.",
      "Option Bis a best practice because the CMDB CI Class Models Storedelivers ServiceNow-supported CI classes that align with platform evolution. Before creating or extending classes, administrators should verify whether a suitable class already exists or has been introduced in newer releases. This avoids duplication and ensures future compatibility.",
      "Option Dis also correct. When no suitable class exists, extending anexisting CI class (under the appropriate parent) to add required attributes preserves inheritance, discovery behavior, reporting, and upgrade compatibility. This approach is preferred over creating entirely new, disconnected schemas.",
      "Option A is incorrect because repurposing base classes and renaming attributes breaks standard semantics, causes confusion, and complicates upgrades. Option C is incorrect because extending Assettables to represent CIs conflates ITAM and CMDB concerns; assets and CIs serve different purposes and lifecycles.",
      "Therefore, the solutions that minimize technical debt and ensure upgrade compliance are B and D."
    ]
  },
  {
    "id": "cisdf-014",
    "sourceQuestionNumber": 14,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "Configuration Management needs to ensure data quality for all CIs in the CMDB. What areas ofdata quality for CIs are included in the CMDB Health Dashboard?",
    "options": [
      "Downgraded CIs",
      "Upgraded CIs",
      "Missing CIs",
      "Stale CIs",
      "Duplicate CIs"
    ],
    "correctOptions": [
      3,
      4
    ],
    "explanation": [
      "The CMDB Health Dashboardis a central component of CMDBData Foundations insight and governance. It measures and tracks data quality using well-defined health indicators that focus on theaccuracy, relevance, and usabilityof CI data.",
      "Two key data quality areas included in the dashboard are Stale CIsand Duplicate CIs.",
      "Stale CIs (Option D) refer to configuration items that have not been updated within a defined time window. These records are risky because they may no longer reflect the current state of the environment, leading to inaccurate impact analys is, poor change decisions, and misrouted incidents. Monitoring staleness helps organizations identify where discovery, integrations, or ownership processes are failing.",
      "Duplicate CIs (Option E) occur when the same real-world asset or service is represented by multiple records. Duplicates undermine trust in the CMDB, distort reporting, and break service mappings. The CMDB Health Dashboard highlights duplicate trends and integrates with de-duplication and remediation workflows to address them.",
      "Options A (Downgraded CIs), B (Upgraded CIs), and C (Missing CIs) are not standard CMDB Health Dashboard quality dimensions. While \"missing\" data may be inferred through completeness checks, Missing CIsas a category is not directly tracked.",
      "Therefore, the correct answers are D - Stale CIsand E - Duplicate CIs, which are core CMDB Health indicators used to maintain high-quality configuration data."
    ]
  },
  {
    "id": "cisdf-015",
    "sourceQuestionNumber": 15,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Manager wants to improve data quality using the CMDB Health Dashboard. What needs to happen to generate CMDB health scores?",
    "options": [
      "The scheduled jobs for the CMDB Health Dashboard must be activated",
      "Nothing, CMDB health scores are calculated by default",
      "The plugin, CMDB health calculation, needs to be installed"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "In ServiceNow, the CMDB Health Dashboarddoes not calculate health scores in real time by default. Instead, health scores are generated and refreshed byscheduled calculation jobsthat evaluate CI data against defined health rules across the dimensions ofcompleteness, correctness, and compliance.",
      "To generate and maintain CMDB health scores, thescheduled jobs for CMDB Health must be active. These jobs periodically scan the CMDB, apply health rules (for example, required attributes populated, lifecycle status compliance, certification results), and calculate scores that are displayed on the dashboard and scorecards. Without these scheduled jobs running, the dashboard cannot produce current or meaningful health metrics.",
      "Option B is incorrect because CMDB health scoring isnot automatic or real-time; it depends on scheduled processing. Option C is also incorrect because CMDB Health is part of the core CMDB/Data Foundations capability in ServiceNow and does not require a separate \"CMDB health calculation\" plugin to be installed in modern implementations.",
      "Activating and maintaining these scheduled jobs ensures that health scores remain accurate, trendable over time, and useful for governance decisions. This is a foundational requirement for using the CMDB Health Dashboard as a data quality improvement tool.",
      "Therefore, the correct answer is A - The scheduled jobs for the CMDB Health Dashboard must be activated."
    ]
  },
  {
    "id": "cisdf-016",
    "sourceQuestionNumber": 16,
    "domain": "Ingest | CMDB 360 / Multisource CMDB",
    "difficulty": "Skilled",
    "prompt": "The CMDB Administrator has set up two Dynamic Reconciliation Rules within the ServiceNow Production Instance. The 'Server' class has a Dynamic Reconciliation Rule of largest value for the RAM field. The 'Windows Server' class has a Dynamic Reconciliation Rule of most reported for the RAM field. Given the above data in Multisource CMDB, which value is added to the CMDB for RAMfor a Server CI?",
    "options": [
      "2,048 MB",
      "8,192 MB",
      "4,096 MB"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "This question hinges on understandingclass-specific Dynamic Reconciliation Rulesin CMDB 360 / Multisource CMDBwithin ServiceNow.",
      "Although two different dynamic rules are configured, the rule applied depends on the CI class being evaluated: For the Serverclass, the configured rule is Largest valuefor the RAM attribute.",
      "For the Windows Serverclass, the rule Most reportedwould apply - butonly if the CI were evaluated as a Windows Server.",
      "The question explicitly asks for the resulting RAM value for a Server CI, not a Windows Server CI. Therefore, the Largest valuerule governs the outcome.",
      "Looking at the multisource values:",
      "2,048 MB (LANDesk)",
      "4,096 MB (Tivoli)",
      "4,096 MB (ServiceNow)",
      "8,192 MB (Altiris)",
      "Under the Largest valuedynamic reconciliation rule, the IRE selects themaximum numeric value, regardless of how frequently it is reported or which source provided it.",
      "The Most reportedlogic (which would result in 4,096 MB) doesnot applyhere because that rule is configured for a different class (Windows Server).",
      "This scenario illustrates an important CMDB 360 principle:Dynamic reconciliation is evaluated per class, and child-class rules do not override parent-class rules unless the CI is actually classified under that child class."
    ]
  },
  {
    "id": "cisdf-017",
    "sourceQuestionNumber": 17,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator needs to import external data into the CMDB. To reduce the risk of creating duplicates and prevent updates from unauthorized sources, it must be ensured that the Identification and Reconciliation Engine (IRE) is not bypassed. What is the recommended method to import data into the CMDB utilizing the Identification and Reconciliation API?",
    "options": [
      "Integration Hub ETL",
      "Table API (REST API or SOAP API)",
      "Import Sets and Transform Maps"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "In ServiceNow, protecting CMDB data quality during ingestion is a core Data Foundationsprinciple. The Identification and Reconciliation Engine (IRE) is designed to ensure that CI records areuniquely identified, merged correctly, andprotected from unauthorized overwrites. Any ingestion method that bypasses IRE introduces a high risk of duplicates and data corruption.",
      "Integration Hub ETLis the recommended method because it isnatively designed to work with the Identification and Reconciliation API. When properly configured, Integration Hub ETL ensures that incoming data is processed through IRE, applying identification rules, reconciliation rules, and source precedence. This allows multiple data sources to coexist safely while maintaining CMDB integrity.",
      "Option B (Table API) is explicitly discouraged for CMDB ingestion because it writes directly to CMDB tables andbypasses IRE entirely, making it one of the most common causes of duplicate and conflicting CI records. While REST and SOAP APIs are powerful, they are not safe for CMDB ingestion unless they explicitly invoke the IRE API, which most generic table integrations do not.",
      "Option C (Import Sets and Transform Maps) can be configured to call IRE, but this requiresadditional scripting and strict governance. Because of this complexity and higher risk of misconfiguration, it is not the recommended approach when safer, purpose-built options exist.",
      "Therefore, Integration Hub ETLis the verified and best-practice answer, making Option Acorrect."
    ]
  },
  {
    "id": "cisdf-018",
    "sourceQuestionNumber": 18,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "The CMDB Administrator group aims to display meaningful results on the CMDB Health Dashboard - Compliance Scorecardforserver records that are not on the latest patch. What must be configured to achieve this goal?",
    "options": [
      "Certification Filter, Certification Template, Audit",
      "Technical Service Offerings, Dynamic CI Groups, CMDB Groups",
      "Stale, Orphan, Duplicate",
      "Certification Policies, Data Filters, Scheduled Jobs"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "In ServiceNow, the Compliancedimension of the CMDB Health Dashboard is driven by Data Certification. To surface meaningful compliance results - such as identifying servers that arenot on the latest patch - the platform requires a combination of Certification Policies, Data Filters, and Scheduled Jobs.",
      "Certification Policiesdefinewhatdata must be validated andwhich attributes are subject to compliance checks (for example, patch level, OS version, or last update date).Data Filtersscope the population - such as server classes only - ensuring the compliance evaluation targets the correct CIs.Scheduled Jobsautomate when certifications run, keeping compliance scores current and reflective of the latest state.",
      "Options A and C are incorrect becauseauditsandstale/orphan/duplicatechecks relate to other health dimensions (correctness and completeness), not compliance. Option B focuses on service modeling and group alignment, which does not directly drive compliance scoring for patch currency.",
      "Therefore, configuring Certification Policies, Data Filters, and Scheduled Jobsis required to accurately measure and display patch compliance on the CMDB Health Dashboard."
    ]
  },
  {
    "id": "cisdf-019",
    "sourceQuestionNumber": 19,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "Which arevalues of CMDB?",
    "options": [
      "Strengthening operational resiliency",
      "Streamlining Incident and Change Management",
      "Automating maintenance for CI relationships",
      "Collecting and managing financial data"
    ],
    "correctOptions": [
      0,
      1
    ],
    "explanation": [
      "The CMDBis a foundational capability that enables organizations to operate IT services withconfidence, resilience, and efficiency. Its value lies not in automation for its own sake or financial data management, but in how it supportsservice-aware operations and decision-making.",
      "Strengthening operational resiliency (Option A) is a core value of the CMDB. By maintaining accurate configuration data and relationships, organizations can better understand dependencies, assess risk, and recover more quickly from incidents or outages. A trusted CMDB enables proactive problem management and informed change planning, directly contributing to resiliency.",
      "Streamlining Incident and Change Management (Option B) is another primary value. Accurate CI data allows incidents to be routed automatically to the correct support groups, enables faster root-cause analys is, and supports risk-based change assessments. This reduces manual effort, improves response times, and lowers operational risk.",
      "Option C is incorrect becauseautomating CI relationship maintenance is a capability enabled by tools like Discovery and Service Mapping - not a value in itself. Option D is also incorrect becausefinancial data management is the domain of IT Asset Management (ITAM) and Financial Management, not the CMDB's core value proposition.",
      "In summary, the CMDB delivers value byimproving operational resilienceandoptimizing ITSM processes, making Options A and Bthe correct answers."
    ]
  },
  {
    "id": "cisdf-020",
    "sourceQuestionNumber": 20,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "What ensuresdata volume in the CMDB is manageable?",
    "options": [
      "Business Rules",
      "Scheduled Jobs",
      "Archive Policies"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "Managing CMDB data volume is a key Data Foundations governanceobjective. Over time, CMDBs naturally accumulate retired, obsolete, or decommissioned CIs. If these records are not properly managed, they degrade CMDB performance, reduce reporting accuracy, and negatively impact discovery reconciliation and health scores.",
      "Archive Policiesare the mechanism designed to address this challenge. They definewhen CI records should be archived or deletedbased on lifecycle state, age, or retention requirements. By automating archival and cleanup, archive policies ensure that onlyrelevant, active CIsremain in the operational CMDB, keeping data volume manageable and performant.",
      "Business Rules (Option A) are used to enforce logic during record creation or updates, not for long-term data volume control. Scheduled Jobs (Option B) may execute tasks, but without archive policies they have no governance logic to determinewhatshould be removed or retained.",
      "Archive policies work in conjunction with CMDB Data Managerto enforce lifecycle-based retention and cleanup, making them the correct and verified answer.",
      "Therefore, Option C - Archive Policiesis correct."
    ]
  },
  {
    "id": "cisdf-021",
    "sourceQuestionNumber": 21,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "The Configuration Management team wants to confirm that all servers in the CMDB actually exist in the data center. Which CMDB Data Manager policy type would the team create? (Choose 1 option)",
    "options": [
      "Certification",
      "Delete",
      "Archive",
      "Retire",
      "Attestation"
    ],
    "correctOptions": [
      4
    ],
    "explanation": [
      "Comprehensive and Detailed Explanation (200 - 300 words)",
      "Within ServiceNow Data Foundations, CMDB Data Manager provides multiple policy types to support governance, data quality, and lifecycle management of configuration items (CIs). The scenario described - confirming that servers recorded in the CMDB physically exist in the data center - is a classic example of existence validation and ownership confirmation, which is exactly the purpose of an Attestation policy.",
      "An Attestation policy is designed to request a human validation from a responsible individual or group (such as a data center manager, platform owner, or infrastructure team). The policy generates attestation tasks",
      "that require reviewers to explicitly confirm whether a CI is valid, accurate, and still exists. This aligns directly with CMDB governance best practices and ITIL 4 Service Configuration Management, where periodic verification ensures trust in the CMDB as a system of record.",
      "The other policy types do not meet this requirement:",
      "Certification is typically used to validate compliance with defined data standards (e.g., mandatory fields populated), not physical existence.",
      "Delete, Archive, and Retire are lifecycle actions, used after a CI has already been identified as obsolete or no longer required.",
      "None of these options involve human confirmation of real-world existence.",
      "From a CSDM and Data Foundations perspective, attestation supports: CMDB accuracy and credibility",
      "Audit and regulatory compliance (especially critical in financial services) Clear accountability for CI ownership and validation",
      "Therefore, when the goal is to confirm that servers actually exist, the correct and fully aligned CMDB Data Manager policy type is Attestation (E)."
    ]
  },
  {
    "id": "cisdf-022",
    "sourceQuestionNumber": 22,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "The CMDB Configuration Management team has successfully developed a healthy and trusted CMDB. They have integrated discovered infrastructure data, accurately referenced non-discoverable data (such as change and support group information), and made the CMDB service-aware using Service Mapping. How will these improvements enhance the change management process? (Choose Two)",
    "options": [
      "Ensures that no changes result in service downtime, regardless of planning or execution",
      "Provides insight into the potential impact of the change",
      "Automatically schedules and deploys changes without human review or approval",
      "Enables auto-population of the assignment group field to dynamically route changes"
    ],
    "correctOptions": [
      1,
      3
    ],
    "explanation": [
      "A healthy and trusted CMDB that aligns with Data Foundations principles - covering accurate data ingestion, strong governance, and service-aware relationships - directly strengthens the insight available to Change Management. When discovered infrastructure data is integrated with well-maintained non-discoverable attributes (such as assignment groups, support groups, and ownership), the CMDB becomes a reliable source of truth for evaluating change risk and impact.",
      "Option B is correct because Service Mapping establishes relationships between configuration items (CIs) and business services. This enables change practitioners to perform impact analys is, identifying which services, applications, and downstream components may be affected by a proposed change. Rather than relying on assumptions or tribal knowledge, change records can reference real dependency data, improving risk assessment, scheduling decisions, and stakeholder communication. This aligns directly with CSDM and CMDB best practices, where service context is essential for informed decision-making.",
      "Option D is also correct because accurate, governed non-discoverable data - such as support and assignment groups - allows Change Management processes to dynamically route work. When a change is associated with a CI or service, the system can automatically populate the appropriate assignment group based on CMDB relationships. This improves efficiency, reduces manual errors, and ensures accountability across federated support models.",
      "Options A and C are incorrect because a CMDB, regardless of maturity, cannot guarantee zero downtime, nor does it eliminate the need for human governance, approvals, and risk-based decision-making. Data Foundations enhance insight and control - not unchecked automation or absolute outcomes."
    ]
  },
  {
    "id": "cisdf-023",
    "sourceQuestionNumber": 23,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "The CMDB Configuration Management team wants to managede-duplication tasksgenerated from data ingested into the CMDB via the Identification and Reconciliation Engine (IRE). In which area of the CMDB Workspacecan they locate these de-duplication tasks?",
    "options": [
      "Important actions tile under the Home tab",
      "CMDB feature adoption tile under the Insights tab",
      "Total status under the My Work tab"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "In ServiceNow, de-duplication tasks generated by the Identification and Reconciliation Engine (IRE) are operational governance tasks that require action by CMDB administrators or data owners. These tasks are surfaced in a role-based and actionable manner to ensure they are addressed promptly.",
      "Within the CMDB Workspace, such tasks are accessed via the My Work tab, specifically under the Total statussection. This area consolidates all actionable CMDB-related work items assigned to the user or their groups, includingduplicate CI remediation tasks, data certification tasks, attestation requests, and lifecycle governance actions generated by CMDB Data Manager and IRE processes.",
      "Option A is incorrect because the Home tabfocuses on high-level navigation and featured actions, not task execution. Option B is also incorrect because the Insights taband feature adoption tiles providevisibility and analytics, not task management.",
      "By centralizing de-duplication tasks in My Work, ServiceNow ensures CMDB governance is embedded into daily operations, improving responsiveness and data quality while maintaining accountability.",
      "Therefore, the correct answer is C - Total status under the My Work tab."
    ]
  },
  {
    "id": "cisdf-024",
    "sourceQuestionNumber": 24,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "What is the value of using the CMDB in security operations? (Choose Two)",
    "options": [
      "Allows the security team to assess and remediate an incident",
      "Auto-resolves a vulnerability",
      "Enables audits and attestations across CIs",
      "Identifies the IT infrastructure with a vulnerability"
    ],
    "correctOptions": [
      0,
      3
    ],
    "explanation": [
      "The CMDB plays a critical role in security operations by providing trusted, structured insight into the organization's IT landscape. When built according to Data Foundations principles - accurate discovery, governed relationships, and alignment to CSDM - the CMDB becomes an essential enabler for security incident response and vulnerability management.",
      "Option D is correct because the CMDB allows security teams to identify exactly which IT infrastructure components are affected by a vulnerability. By correlating vulnerability scan results with configuration items (CIs), security teams can determine whether an issue exists on a server, application, cloud resource, or network device - and understand where that CI sits within the broader service context. This eliminates blind spots and reduces time spent investigating unknown or unmanaged assets.",
      "Option A is also correct because the CMDB supports assessment and remediation activities during security incidents. Once affected CIs are identified, the CMDB provides ownership, support group, environment, and service relationships. This enables security teams to quickly route remediation tasks to the correct resolver groups, assess business impact, and prioritize response based on service criticality. While the CMDB does not perform remediation itself, it enables informed and coordinated action.",
      "Option B is incorrect because vulnerabilities are not auto-resolved by the CMDB; remediation requires human decision-making and execution through security, patching, or change processes. Option C, while related to governance and compliance use cases, is more aligned with GRC and audit functions rather than day-to-day security operations, making it less appropriate for this question.",
      "In summary, the CMDB's primary value in security operations is visibility and actionable insight, enabling faster identification, assessment, and response to security threats."
    ]
  },
  {
    "id": "cisdf-025",
    "sourceQuestionNumber": 25,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "The Configuration Manager is preparing justification to utilize the CMDB Data Foundations Dashboard. Which benefits align with the usage of this dashboard?",
    "options": [
      "It automates approval processes for Change Management",
      "It provides actionable insights to improve data quality and completeness",
      "It helps detect and eliminate duplicate records in the CMDB",
      "It enables monitoring and tracking of CMDB health over time"
    ],
    "correctOptions": [
      1,
      3
    ],
    "explanation": [
      "The CMDB Data Foundations Dashboardis designed to providevisibility, insight, and guidanceinto the overall health of CMDB data. Its purpose is not to automate ITSM workflows, but to enable informed decision-making and continuous improvement of configuration data.",
      "One of its primary benefits is providingactionable insights to improve data quality and completeness (Option B). The dashboard highlights gaps in CI attributes, missing relationships, and compliance issues, enabling CMDB administrators and data owners to take targeted corrective actions using Get Well Playbooks.",
      "Another core benefit is enabling organizations tomonitor and track CMDB health over time (Option D). The dashboard presents trends across health dimensions - completeness, correctness, and compliance - allowing teams to measure progress, justify investments, and demonstrate maturity improvements aligned to CSDM adoption stages.",
      "Option A is incorrect because Change Management approvals are handled by workflow and policy engines, not the Data Foundations Dashboard. Option C is also incorrect because duplicate detection and remediation are handled throughde-duplication tools and the Duplicate CI Remediator, not directly by the dashboard itself.",
      "Therefore, the correct answers are B and D, which accurately reflect the strategic and operational value of the CMDB Data Foundations Dashboard."
    ]
  },
  {
    "id": "cisdf-026",
    "sourceQuestionNumber": 26,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator identifies duplicate CIs. One was created by a manual import, and the other was created by automated discovery. The discovered CI has the latest IP address, while the manually imported CI has an accurate relationship to a critical business application. How does the Administrator use the Duplicate CI Remediator to resolve this issue?",
    "options": [
      "Merge the two CIs automatically, retaining all attributes from the discovered CI",
      "Retain the manually imported CI and delete the discovered CI",
      "Retain the discovered CI, but merge the relationship from the manually imported CI",
      "Retain the discovered CI and delete the manually imported CI"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "In ServiceNow, the Duplicate CI Remediator is designed to resolve duplicate records while preserving the most authoritative data from each source. Data Foundations guidance clearly states that automated discovery is the system of record for technical attributes, such as IP address, hostname, and operational status, while manually maintained records often contain valuable business context, such as relationships to business applications or services.",
      "In this scenario, the discovered CI contains the most accurate and up-to-datetechnical data, making it the correct CI to retain as the primary record. However, the manually imported CI has acritical relationship to a business application, which is essential for impact analys is, incident prioritization, and CSDM alignment.",
      "Deleting this CI without preserving the relationship would result in loss of business context and reduced CMDB value.",
      "The Duplicate CI Remediator supportsselective merging, allowing administrators to retain one CI while merging specific attributes or relationships from the duplicate. Option C reflects this best practice by retaining the discovered CI and merging the relationship from the manually imported CI, ensuring both technical accuracy and business relevance are preserved.",
      "Options A and D would result in the loss of important relationship data, while Option B would discard the discovered CI, violating the principle that discovery should be the authoritative source for technical attributes.",
      "Therefore, Option Cis the correct and Data Foundations - aligned answer."
    ]
  },
  {
    "id": "cisdf-027",
    "sourceQuestionNumber": 27,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is evaluating whether to monitor the metrics provided on the CMDB Data Foundations Dashboard. Which benefits support the decision to continually monitor the results on this dashboard?",
    "options": [
      "Provides a list of all CIs that failed health audits",
      "Provides metrics on active CIs updated in the last 90 days",
      "Provides metrics for CIs processed by the Identification and Reconciliation Engine (IRE)",
      "Reports on all orphan CIs in the CMDB"
    ],
    "correctOptions": [
      1,
      2
    ],
    "explanation": [
      "The CMDB Data Foundations Dashboardin ServiceNow is intended to provideongoing, trend-based visibilityinto how well the CMDB ingestion and maintenance processes are functioning - not just point-in-time issue lists. This is why continual monitoring of its metrics is valuable.",
      "Option Bis correct because trackingactive CIs updated in the last 90 daysprovides a strong indicator ofdata freshness and operational relevance. A healthy CMDB should reflect recent updates from Discovery, integrations, and governed manual processes. Monitoring this metric over time helps organizations detect stagnation, discovery failures, or integration issues early.",
      "Option Cis also correct because metrics for CIs processed by the Identification and Reconciliation Engine (IRE) directly indicate the effectiveness and adoption ofgoverned ingestion practices. Consistent IRE processing confirms that integrations are not bypassing identification rules, reducing duplicates and improving trust in CMDB data. Trending this metric helps validate Data Foundations maturity.",
      "Option A is incorrect because the dashboard is not designed to provide exhaustive audit failure lists; those are handled through certification and remediation workflows. Option D is also incorrect becauseorphan CIsare a specific health condition surfaced via health rules and remediation tools, not a core benefit metric for continual dashboard monitoring.",
      "Therefore, the correct answers are B and C."
    ]
  },
  {
    "id": "cisdf-028",
    "sourceQuestionNumber": 28,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "A ServiceNow Administrator wants to implement Sen/ice Graph Connectors to provide integrations to many third-party solutions that the company wants integrated into the CMDB Which categories of connectors are available to the Administrator\"?",
    "options": [
      "Cloud",
      "Observability",
      "Dev Ops",
      "Workflow Automation"
    ],
    "correctOptions": [
      0,
      1
    ],
    "explanation": [
      "Service Graph Connectorsare a key Data Foundations ingestion capabilityin ServiceNow. They provideout-of-the-box, upgrade-safe integrationsthat ingest data into the CMDB using the Identification and Reconciliation Engine (IRE), ensuring data quality and source governance.",
      "Two primary categories of Service Graph Connectors are:",
      "Cloud (Option A): These connectors integrate with major cloud providers and platforms (such as AWS, Azure, and GCP) to ingest infrastructure, platform, and service data into the CMDB. They are essential for managing hybrid and multi-cloud environments and maintaining accurate cloud CI relationships.",
      "Observability (Option B): These connectors integrate with monitoring and observability tools (such as APM, infrastructure monitoring, and telemetry platforms). They provide near-real-time operational data that enriches CI records and supports incident correlation, impact analys is, and service health insights.",
      "Option C (Dev Ops) is incorrect because Dev Ops integrations are typically handled through CI/CD tools and workflow integrations rather than Service Graph Connectors. Option D (Workflow Automation) is unrelated; Service Graph Connectors focus ondata ingestion, not process orchestration.",
      "Therefore, the correct connector categories are Cloudand Observability, making Options A and Bthe correct answers."
    ]
  },
  {
    "id": "cisdf-030",
    "sourceQuestionNumber": 30,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A Service Owner is using Unified Map to understand the composition of a service but wants to filter irrelevant information. Which options are available to the Service Owner from the filter panel? (Choose 2 options)",
    "options": [
      "CI type",
      "Discovery source",
      "Managed by group",
      "Business criticality"
    ],
    "correctOptions": [
      0,
      3
    ],
    "explanation": [
      "The Unified Mapin ServiceNowprovides a consolidated view of services and their underlying components, integrating Discovery and Service Mapping data. To make this view actionable, Service Owners can applyfiltersto focus on relevant elements and reduce visual noise.",
      "Filtering by CI type (Option A) is a core capability. It allows the Service Owner to show or hide categories such as servers, databases, load balancers, or applications - making it easier to analyze specific layers of the service.",
      "Filtering by Business Criticality (Option D) is also available and highly valuable. This enables Service Owners to prioritize views around high-impact components, ensuring attention is focused on CIs that pose the greatest risk to service delivery.",
      "Option B (Discovery source) is not typically exposed as a Unified Map filter because the map focuses onoperational and service context, not ingestion provenance. Option C (Managed by group) is a governance attribute and is not a standard visual filter within the Unified Map.",
      "Thus, the correct filter options are A - CI typeand D - Business criticality."
    ]
  },
  {
    "id": "cisdf-031",
    "sourceQuestionNumber": 31,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A Configuration Manager needs to leverage a policy type toautomate the creation and assignment of tasks to validate the existence of CIs. Which policy type should be used to accomplish this goal?",
    "options": [
      "Certification",
      "Delete",
      "Retire",
      "Attestation"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "In ServiceNow, validating whether Configuration Items (CIs) still exist is a core CMDB governanceactivity. Over time, environments change rapidly - servers are decommissioned, cloud resources are torn down, and applications are replaced. If existence validation is not enforced, the CMDB quickly fills with obsolete or \"ghost\" CIs.",
      "Attestation policies are specifically designed to address this need. An attestation policy automatically generates and assigns tasks to responsible users or groups, asking them toconfirm that a CI still exists and is still relevant. This process focuses on acknowledgment rather than deep data validation, making it lightweight and scalable across large CMDBs.",
      "Certification policies (Option A) are used whenspecific attributes must be validated, such as lifecycle status, support group, or environment. While important for data correctness, certification is not intended solely to confirm CI existence. Delete (Option B) and Retire (Option C) policies are lifecycle actions that remove or transition records, but they do not validate existence before taking action.",
      "Attestation integrates cleanly with CMDB Workspace, assigns tasks automatically, and supports auditability - ensuring accountability for CI ownership. This makes it the correct and Data Foundations - aligned policy type for validating CI existence.",
      "Therefore, Option D - Attestationis the correct answer."
    ]
  },
  {
    "id": "cisdf-032",
    "sourceQuestionNumber": 32,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A development team is working on a project where an application will be deployed to many servers. There are several security requirements that must be checked to adhere to lawful regulatory compliance because the application will be holding customer personal data (PII and PCI). Where in the CSDMshould the development team store the information that will be used to satisfy audits?",
    "options": [
      "Technology Management Service Offerings (Technical Service Offerings) and Groups",
      "Business Applications and Information Objects",
      "Customer Service Offerings and Databases"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "Within the Common Service Data Model (CSDM), regulatory, security, and compliance-related information - especially for PII and PCI - must be modeled at thebusiness and information level, not at the infrastructure or service offering level. The correct location for this data is Business Applications combined with Information Objects.",
      "Business Applicationsrepresent the logical applications that support business capabilities and processes. Since compliance obligations (such as GDPR, PCI-DSS, or HIPAA) are assessed based on how the business uses data - not how many servers host the application - this is the correct anchor point for audit-relevant context.",
      "Information Objectsare explicitly designed to capturewhat data is processed, stored, or transmittedby an application, including data classifications such as PII, PCI, PHI, or confidential business data. They allow organizations to document regulatory scope, retention rules, encryption requirements, and audit controlswithout overloading CI recordsor polluting infrastructure classes.",
      "Option A is incorrect because Technical Service Offerings and Groups focus on operational support and service delivery, not regulatory data context. Option C is also incorrect because Customer Service Offerings describe how services are consumed, while databases are technical components; neither is the authoritative place for compliance definitions.",
      "Therefore, Business Applications and Information Objectsare the correct CSDM constructs to support audits and regulatory compliance, making Option Bthe correct answer."
    ]
  },
  {
    "id": "cisdf-033",
    "sourceQuestionNumber": 33,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "A customer wants recently imported server records to be automatically reclassified into more specific CMDB classes after being discovered by ServiceNow Discovery. During the discovery process, if existing Server records are reclassified into the Linux Serverand Windows Serverclasses, which reclassification operation occurs?",
    "options": [
      "Class Switch",
      "Class Downgrade",
      "Class Upgrade"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "In the CMDB class hierarchy, Serveris ageneric parent class, while Linux Serverand Windows Serveraremore specific child classes. When ServiceNow Discoverydetects sufficient evidence (such as OS signatures) to move a CI from a generic class to a more specialized one, this action is called a Class Upgrade.",
      "AClass Upgradeoccurs when a CI is reclassifieddown the hierarchy into a more specific subclass, enriching the record with additional attributes, behaviors, and discovery patterns appropriate to that class. This is a standard and expected behavior in mature CMDB implementations and aligns with Data Foundations best practices.",
      "AClass Switchwould imply lateral movement between unrelated classes, which is not what happens here. AClass Downgradewould move a CI from a specific class back to a more generic one, typically when discovery confidence is reduced - not the case in this scenario.",
      "By performing class upgrades automatically, Discovery improves CMDB accuracy, reporting precision, and service mapping quality without manual intervention.",
      "Therefore, the correct answer is C - Class Upgrade."
    ]
  },
  {
    "id": "cisdf-034",
    "sourceQuestionNumber": 34,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "The CMDB Configuration Management team has successfully developed a healthy and trusted CMDB. They have integrated discovered infrastructure data, accurately referenced non-discoverable data (such as change and support group information), and made the CMDB service-aware using Service Mapping. Which field on an Incident form is automatically populated after a CI is selected that references an appropriate support group? Managed by Group",
    "options": [
      "Approval Group",
      "Assignment Group",
      "Change Group",
      "Support Group"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "In a mature CMDB implementation within ServiceNow, CI operational attributes are leveraged toautomate ITSM workflows. One of the most important outcomes of accurate Configuration Management isautomatic incident routing.",
      "When a CI is selected on an Incident record, ServiceNow evaluates the CI's Support Groupattribute. If populated correctly, the platform automatically copies this value into the Assignment Groupfield on the Incident. This ensures incidents are routed to the correct resolver group without manual triage, reducing mean time to resolution (MTTR).",
      "The Support Groupis a CI attribute, not an incident field that drives workflow directly. The Assignment Groupis the operational field used by Incident Management to assign ownership. Managed by Group, Approval Group, and Change Group are used in other governance and lifecycle contexts and are not auto-populated during incident creation.",
      "This behavior is a direct result of Data Foundations best practices: maintaining accurate CI-to-support-group relationships to enableautomation and consistencyacross ITSM processes.",
      "Therefore, the correct answer is C - Assignment Group."
    ]
  },
  {
    "id": "cisdf-036",
    "sourceQuestionNumber": 36,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator has installed a Service Graph Connectorand customized ascript transform. What will happen on subsequent upgrades if thedefault definition of the script transform is updated?",
    "options": [
      "The upgrade stops and reports an error",
      "A skipped change is created and no change is made to the script transform definition",
      "The Service Graph Connector upgrade refuses to start"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In ServiceNow, Service Graph Connectors deliver data ingestion patterns usingprotected, upgrade-safe artifacts, including script transforms. When a customercustomizesa script transform provided by a Service Graph Connector, ServiceNow follows standardupdate set and upgrade behaviorto protect customer customizations.",
      "During a subsequent upgrade, if theout-of-box (default) script transform definition changes, ServiceNowdoes not overwrite the customized version. Instead, the platform records askipped change, indicating that an update was available but intentionally not applied due to a local customization. This ensures customer-specific logic is preserved while still maintaining transparency about what changed in the newer release.",
      "Option A is incorrect because upgrades do not halt due to customized transforms. Option C is also incorrect because Service Graph Connector upgrades proceed normally; they do not refuse to start because of customizations.",
      "This behavior aligns with Data Foundations best practices:avoid modifying OOTB content when possible, but when customization is necessary, ensure it is protected during upgrades. Administrators should review skipped changes after upgrades to decide whether to manually adopt new OOTB logic.",
      "Therefore, the correct answer is B - A skipped change is created and no change is made to the script transform definition."
    ]
  },
  {
    "id": "cisdf-037",
    "sourceQuestionNumber": 37,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Configuration Manager is reviewing the metrics on the CMDB Health Dashboard - Correctness Scorecardfor the Serverclass, which consists of60,000 serversin the CMDB. For the Duplicatemetric, it shows Healthy CIs / Evaluated = 59,000 / 60,000 For the Orphanmetric, it shows Healthy CIs / Evaluated = 45,000 / 50,000 Which configuration explains thedifference in the scope of Server CIs evaluated (60,000 vs 50,000) between the two metrics?",
    "options": [
      "The Orphan metric has a CMDB Group configured for the Server class",
      "The Orphan metric has a Health Inclusion rule configured for the Server class",
      "The Duplicate metric has a Health Inclusion rule configured for the Server class",
      "The Duplicate metric has a CMDB Group configured for the Server class"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In ServiceNow, each CMDB Health metric can independently definewhich CIs are in scopefor evaluation. This scoping is controlled primarily through Health Inclusion Rules, not CMDB Groups.",
      "In this scenario, the Duplicatemetric evaluates all60,000 Server CIs, indicating no inclusion rule is restricting its scope. In contrast, the Orphanmetric evaluates only50,000 Server CIs, which means10,000 servers are intentionally excludedfrom that metric's evaluation.",
      "This difference is explained by a Health Inclusion ruleconfigured specifically for the Orphan metricon the Server class. Health Inclusion rules allow administrators to define conditions - such as lifecycle state, environment, discovery source, or operational status - that determine whether a CI should be included in a specific health calculation. For example, retired servers or servers in build states may be excluded from orphan checks.",
      "CMDB Groups are not used by the CMDB Health Engine to determine metric scope; they are used for reporting, assignment, and operational grouping. Therefore, Options A and D are incorrect. Option C is also incorrect because the Duplicate metric clearly evaluates the full population of 60,000 servers.",
      "Thus, the scope difference is correctly explained by the Orphan metric having a Health Inclusion rule configured, making Option Bthe verified answer."
    ]
  },
  {
    "id": "cisdf-038",
    "sourceQuestionNumber": 38,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A new custom class is needed to reflect a new application being managed in the CMDB. Which roles areminimally neededto add this custom CI class?",
    "options": [
      "sn_cmdb_admin and personalize_dictionary",
      "sn_cmdb_admin and personalize_form",
      "sn_cmdb_admin and personalize_dictionary",
      "itil_admin and personalize_form"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "Creating acustom CI classin the CMDB is adictionary-level configuration activityand must be performed with the correct minimum privileges to ensure governance and upgrade safety in ServiceNow.",
      "Thesn_cmdb_adminrole is required because it grants administrative access to CMDB structures, including CI class hierarchy management. This role ensures that changes align with CMDB governance controls and Data Foundations practices.",
      "Thepersonalize_dictionaryrole is also required because adding a new CI class involvescreating or extending dictionary entries (tables, attributes, inheritance). Without dictionary-level access, a user cannot define new classes or attributes in the CMDB schema.",
      "Option A is incorrect becausesn_cmdb_adminalone is insufficient without dictionary privileges. Option B and D focus onform personalization, which affects UI layout only and does not allow creation of new CI classes. Additionally, itil_adminis not the correct role for schema-level CMDB changes.",
      "Therefore, the minimal and correct role combination issn_cmdb_admin and personalize_dictionary, making Option Cthe verified answer."
    ]
  },
  {
    "id": "cisdf-039",
    "sourceQuestionNumber": 39,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator wants to run the\"Services Have Owners Identified\"Get Well Playbook to remediate issues shown in the CMDB Data Foundations Dashboard. Whichremediation playswould be used?",
    "options": [
      "Fix Data",
      "Analyze Data",
      "Report Data",
      "Govern Data"
    ],
    "correctOptions": [
      0,
      3
    ],
    "explanation": [
      "The CMDB Data Foundations Dashboardis paired with Get Well Playbooksthat guide administrators through structured remediation. The\"Services Have Owners Identified\"playbook focuses on closing ownership gaps for services, which is agovernance and data correctionactivity.",
      "Fix Data (Option A) is used tocorrect missing or incorrect values, such as populating owner fields, assigning responsible groups, or updating relationships. In this playbook, Fix Data actions are required to actually remediate the issue by assigning owners to services.",
      "Govern Data (Option D) is also required because ownership is not a one-time correction - it must beenforced and sustained. Govern Data establishes policies, ownership accountability, and controls (such as certifications or attestations) to ensure services continue to have owners over time and do not regress.",
      "Analyze Data (Option B) is used to understand patterns and root causes, but it does not remediate the issue. Report Data (Option C) provides visibility and communication, not corrective action.",
      "Therefore, the remediation plays that apply to the Services Have Owners Identifiedplaybook are Fix Dataand Govern Data, making Options A and Dcorrect."
    ]
  },
  {
    "id": "cisdf-041",
    "sourceQuestionNumber": 41,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "Which ServiceNow solutionscreateautomatic relationships?",
    "options": [
      "Integration Hub ETL",
      "Service Mapping",
      "Discovery",
      "Workflow Studio"
    ],
    "correctOptions": [
      1,
      2
    ],
    "explanation": [
      "Automatic relationship creation is fundamental to maintaining aservice-aware and trustworthy CMDB. In ServiceNow, this capability is primarily delivered by Discoveryand Service Mapping.",
      "Discovery (Option C) automatically identifies infrastructure components - such as servers, network devices, and storage - and createstechnical relationshipsbetween them (for example, \"runs on,\" \"connected to,\" or \"depends on\"). These relationships form the backbone of infrastructure dependency mapping.",
      "Service Mapping (Option B) builds on Discovery by creatingapplication- and service-level relationships. It maps how application components interact across servers, databases, and middlew are, resulting in accurate Application Servicemodels aligned with CSDM. These relationships are created and maintained automatically as the environment changes.",
      "Option A (Integration Hub ETL) focuses on data ingestion and transformation; it does not inherently create or maintain relationships unless explicitly scripted. Option D (Workflow Studio) orchestrates processes and automations but does not discover or infer CI relationships.",
      "Therefore, the ServiceNow solutions that create automatic relationships are Service Mappingand Discovery, making Options B and Ccorrect."
    ]
  },
  {
    "id": "cisdf-042",
    "sourceQuestionNumber": 42,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "An Enterprise Architect of a financial services company is working across the enterprise and wants to track their capabilities. Which CSDM 5 domain is used? (Choose 1 option) Foundation",
    "options": [
      "Build and Integration (Build)",
      "Service Consumption (Sell/Consume)",
      "Design and Planning (Design)",
      "Service Delivery (Manage Technical)"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "In CSDM version 5, enterprise-wide capability tracking is firmly positioned within the Design and Planning domain. This domain is specifically intended to support Enterprise Architecture, Portfolio Management, and Strategic Planning use cases, making it the correct choice for an Enterprise Architect working across the organization.",
      "The Design and Planning (Design) domain focuses on answering \"what the business needs and how it should be designed\" before services are built or delivered. It includes core concepts such as Business Capabilities, Value Streams, Information Objects, Business Applications, and Architectural relationships. Business capabilities represent what an organization does to achieve its objectives,",
      "independent of organizational structure, technology, or implementation. This abstraction is essential for enterprise architects, especially in highly regulated industries like financial services, where strategic alignment and impact analys is are critical.",
      "The other domains do not fit this requirement:",
      "Foundation provides shared reference data (companies, locations, users) but does not model enterprise capabilities.",
      "Build and Integration focuses on application development, CI/CD pipelines, and integration layers.",
      "Service Consumption is concerned with customers, offerings, and how services are consumed.",
      "Service Delivery models the operational and technical delivery of services, including infrastructure and runtime environments.",
      "From a Data Foundations and CSDM governance perspective, tracking enterprise capabilities in the Design and Planning domain ensures:",
      "Clear separation between strategy, design, and operations Alignment with ITIL 4 strategy and planning practices",
      "Strong support for impact analys is, rationalization, and transformation initiatives",
      "Therefore, Design and Planning (D) is the correct and fully aligned CSDM 5 domain for tracking enterprise capabilities."
    ]
  },
  {
    "id": "cisdf-043",
    "sourceQuestionNumber": 43,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "In a company, there is a need to understand the CSDM maturity levelrequired. Different stakeholders listed several use cases they expect over time. Which use case requires information objects? The Asset Management team wants to understand asset lifecycle compliance in a Business Application context",
    "options": [
      "The Event Operations team wants to automate their events into incidents for operational actions",
      "The Customer Service team wants to onboard proactive case management",
      "The Sec Ops team wants to understand the operational risk in the Business Application context",
      "The Business Service Management team wants to understand the operational impact for their consumer parties"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "Within the Common Service Data Model (CSDM), information objects are used to representnon-CI data entitiesthat provide important business or governance context but are not configuration items themselves. These objects are especially important when extending service visibility beyond pure infrastructure and application relationships.",
      "The use case described in Option A - understandingasset lifecycle compliance in a Business Application context - explicitly requires information objects. Asset lifecycle data (such as financial state, depreciation, warranty, and compliance milestones) is typically managed in IT Asset Management (ITAM) and must beassociated to Business Applicationswithout converting every asset-related data point into a CI. Information objects enable this linkage while maintaining clean CMDB boundaries.",
      "Option B focuses on event-to-incident automation, which relies on CIs, technical services, and operational relationships, not information objects. Option C (proactive case management) is primarily a CSM and service offeringuse case. Option D (Sec Ops risk context) relies onapplication services and business application relationships, not information objects. Option E (business service impact) is addressed throughservice modeling and service mapping, again without requiring information objects.",
      "Information objects are introduced as organizations mature and need to integrategovernance, financial, or compliance datawith service and application models - making asset lifecycle compliance the correct match.",
      "Therefore, the correct answer is A."
    ]
  },
  {
    "id": "cisdf-044",
    "sourceQuestionNumber": 44,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "When integrating data into the CMDB using Import Sets and Transform Maps, which type of script is added to ensure the data is processed through the Identification and Reconciliation Engine (IRE)?",
    "options": [
      "on Before",
      "on Complete",
      "on After",
      "on Start"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "When using Import Sets and Transform Mapsto ingest data into the CMDB, it is critical that records are processed through the Identification and Reconciliation Engine (IRE) to prevent duplicates and enforce source precedence. In ServiceNow, this is achieved by invoking the IREafterthe transform logic has completed.",
      "Theon Aftertransform script is the correct place to call the IRE API. At this stage, the transformed data has already been mapped and prepared, allowing the IRE to correctly identify whether a CI already exists and reconcile updates according to defined rules.",
      "Theon Beforeandon Startscripts execute too early - before data mapping is complete - making them unsuitable for IRE processing. Theon Completescript runs after the entire import job finishes and is not intended for per-record CI identification and reconciliation.",
      "Because Import Sets can bypass IRE if not configured correctly, using anon After script is a critical Data Foundations safeguard when this ingestion method is chosen.",
      "Therefore, the correct answer is C - on After."
    ]
  },
  {
    "id": "cisdf-045",
    "sourceQuestionNumber": 45,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator needs to identify which attributes have been createdspecifically for the Windows Server class. Which tab in the Attributessection is used?",
    "options": [
      "Child",
      "Added",
      "All",
      "Derived"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "Within the CMDB class dictionary in ServiceNow, attributes can be inherited from parent classes or defined directly on a specific class. To identify attributes createdspecifically for the Windows Server class, administrators must use the Addedtab.",
      "The Addedtab displays attributes that areunique to the selected classand not inherited from parent classes (such as Server or Computer). This is essential for understanding class-specific extensions - like Windows-only configuration details - that were introduced to support platform requirements, discovery enhancements, or organizational needs.",
      "The Alltab shows every attribute available to the class, including inherited and added attributes, which makes it difficult to isolate class-specific additions. The Childtab focuses on attributes inherited by subclasses, not attributes introduced at the current class level. The Derivedtab shows attributes calculated or derived from other data, not necessarily those created specifically for the class.",
      "Using the Addedtab supports best practices for configuration transparency, impact analys is during upgrades, and governance - especially important in Data Foundations to minimize unnecessary customization and maintain upgrade-safe designs.",
      "Therefore, the correct answer is B - Added."
    ]
  },
  {
    "id": "cisdf-046",
    "sourceQuestionNumber": 46,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "An organization is changing data centers and needs to know the consequences of the planned changes. How can Application Service Mappingbe used as part of Change Management?",
    "options": [
      "To identify which devices will go offline first",
      "To understand the business impact of CIs",
      "To understand the physical location of CIs"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "Application Service Mapping is a critical capability in ServiceNowfor enablingbusiness-aware Change Management. Its primary value is not in identifying physical shutdown sequences or CI locations, but in translating technical changes intobusiness impact.",
      "When an organization plans a data center move, multiple infrastructure components - servers, databases, network devices - may be affected. On their own, these technical CIs provide little insight into business risk. Application Service Mapping connects these CIs to Application Services and Business Servicesas defined by the Common Service Data Model (CSDM). This relationship allows Change Managers to seewhich business services, customers, and processes are impactedby the planned change.",
      "By leveraging service maps, Change Management can answer critical questions such as: Which customer-facing services may experience downtime?",
      "What revenue-generating or mission-critical services are at risk? Which stakeholders must be notified or involved in approvals?",
      "Option A is incorrect because service mapping does not determine shutdown order; that is handled by infrastructure planning. Option C focuses on physical location data, which is typically managed through Location CIs and Discovery, not service mapping.",
      "Therefore, the correct answer is B - To understand the business impact of CIs, which aligns directly with ITIL 4, CSDM, and Change Management best practices."
    ]
  },
  {
    "id": "cisdf-047",
    "sourceQuestionNumber": 47,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A Change Manager wants to gain value from CSDM. How will the Change Managementprocess benefit from CSDM?",
    "options": [
      "Identify blackout windows",
      "Determine the root cause of the change issue",
      "Route the change dynamically",
      "Understand the impact of the change on services"
    ],
    "correctOptions": [
      0,
      3
    ],
    "explanation": [
      "CSDM significantly enhances Change Managementby providingservice-aware context, enabling better planning, risk assessment, and stakeholder communication.",
      "One key benefit is the ability toidentify blackout windows (Option A). Through CSDM-aligned Business Services, Service Offerings, and service calendars, Change Managers can clearly see when services are unavailable for change due to business constraints, regulatory requirements, or peak usage periods. This helps prevent changes from being scheduled during high-risk windows.",
      "Another critical benefit is the ability tounderstand the impact of the change on services (Option D). CSDM establishes clear relationships between infrastructure CIs, Application Services, and Business Services. When a change is proposed, these relationships enable accurateimpact analys is, allowing Change Managers to assess risk based on business criticality rather than just technical scope.",
      "Option B (root cause determination) is primarily a Problem Managementfunction. Option C (dynamic routing of changes) is driven by workflow and approval logic, not directly by CSDM.",
      "Therefore, the correct answers are A - Identify blackout windowsand D - Understand the impact of the change on services."
    ]
  },
  {
    "id": "cisdf-048",
    "sourceQuestionNumber": 48,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator wants to create a CMDB queryto findall databases located in Seattle that are connected to application services. They also want toinclude incidents related to those databases. Which actions should be taken to build this query?",
    "options": [
      "Add to the canvas the Incidenttable from the Non-CMDB Tableslist",
      "Add property columns to the Application Servicenode",
      "Add a filter to the Databasenode for Location = Seattle",
      "Set the relationship level toup to 2nd-level relationships"
    ],
    "correctOptions": [
      0,
      2
    ],
    "explanation": [
      "When building advanced CMDB queries using CMDB Query Builderin ServiceNow, the correct approach is to model CI scope, relationships, andtask contextexplicitly on the canvas.",
      "To limit results to databases in a specific location, the administrator mustfilter the Database CI nodeby the Location attribute. Therefore, Option Cis required to scope the query to Database CIs where Location = Seattle.",
      "To include Incidents related to those databases, the Incident table must be added from the Non-CMDB Tableslist and linked through thetask_cirelationship. This is exactly what Option Aprovides. CMDB Query Builder separates CMDB tables (CIs) from task and transactional tables, so incidents must be explicitly added from the Non-CMDB section.",
      "Option B is incorrect because property columns on Application Services do not scope databases or incidents. Option D is unnecessary because relationship depth alone does not include non-CMDB task data and does not filter by location.",
      "Thus, the correct actions are A (add Incident table) and C (filter Database by location)."
    ]
  },
  {
    "id": "cisdf-050",
    "sourceQuestionNumber": 50,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator wants to improvedata quality related to the CSDM. Which action should the Administrator take to meet this goal?",
    "options": [
      "Use the CSDM Data Foundations Dashboard",
      "Start the ServiceNow Health Scan",
      "Use the default configured CMDB Health Dashboard"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "To specifically improvedata quality related to CSDM, the most effective and prescribed action is to use the CSDM Data Foundations Dashboard. In ServiceNow, this dashboard is purpose-built to assess and improve CSDM alignment, not just general CMDB hygiene.",
      "The CSDM Data Foundations Dashboard focuses onservice modeling readiness, highlighting gaps such as missing service ownership, incomplete relationships between Business Applications and Application Services, unmanaged services, and misaligned lifecycle states. It provides Get Well Playbooksthat guide administrators through structured remediation using Analyze Data, Fix Data, and Govern Data plays - directly tied to CSDM outcomes.",
      "Option C (default CMDB Health Dashboard) is valuable, but it measuresgeneric CMDB data quality dimensions (completeness, correctness, compliance) and does not specifically evaluate CSDM constructs or service modeling maturity. Option B (ServiceNow Health Scan) provides platform-wide configuration and performance recommendations, but it is not focused on CMDB or CSDM data quality.",
      "Therefore, to improve CSDM-specific data quality, the administrator should use the CSDM Data Foundations Dashboard, making Option Athe correct answer."
    ]
  },
  {
    "id": "cisdf-051",
    "sourceQuestionNumber": 51,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A healthc are provider faces a critical incident affecting itspatient management system. The provider needs to identify theusers impactedto mitigate disruption effectively. Which CSDM-related datashould they leverage?",
    "options": [
      "Incident history of similar CIs",
      "Service Offerings by Department or Location",
      "Service environment attribute",
      "Affected CI [task_ci] related list"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In a healthc are environment, identifyingwho is impactedduring a critical incident is essential to patient safety and continuity of care. Within the Common Service Data Model (CSDM), the most effective way to determine impacted users is through Service Offerings, particularly when they are definedby department or location.",
      "Service Offeringsrepresent how a service is consumed by specific user groups. In this case, a patient management system may have different offerings for departments such as Emergency, Inpatient Care, or Outpatient Services, or be scoped by hospital location. These offerings explicitly defineconsumer context, allowing incident responders to immediately identify which clinicians, staff, or facilities are affected.",
      "Option D (Affected CI related list) identifies technical impact but does not translate that impact intouser or consumer context. Option A provides historical insight but does not identify current impacted users. Option C (service environment) helps differentiate production vs non-production but does not identifywho is impacted.",
      "By leveraging Service Offerings by Department or Location, the provider can quickly notify the right users, prioritize response based on clinical impact, and coordinate mitigation effectively - aligning with CSDM and ITIL best practices.",
      "Therefore, the correct answer is B - Service Offerings by Department or Location."
    ]
  },
  {
    "id": "cisdf-052",
    "sourceQuestionNumber": 52,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "According to the Common Service Data Model (CSDM), a server team is requesting a catalog item be created for infrastructure requests. Which role is involved ininitiating the request and defining requirements?",
    "options": [
      "Application Service Owners",
      "Technology Service Owners",
      "Enterprise Architect"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In CSDM, Technology Services (and their Service Offerings) representhow technical capabilities are delivered and consumedby internal teams. When a server team requests a catalog item for infrastructure services (e.g., VM provisioning, storage, OS builds), the role responsible forinitiating the request and defining requirements is the Technology Service Owner.",
      "Technology Service Owners understand the operational capabilities, constraints, SLAs, and fulfillment workflows required to deliver infrastructure services. They define catalog requirements such as options, approvals, fulfillment tasks, and guardrails - ensuring the request aligns with standardization, security, and operational readiness.",
      "Application Service Ownersfocus on how applications are delivered and supported, not on defining infrastructure catalog items.Enterprise Architectsprovide standards and guidance but do not initiate or define catalog request requirements.",
      "Thus, the correct role is B - Technology Service Owners."
    ]
  },
  {
    "id": "cisdf-053",
    "sourceQuestionNumber": 53,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A Configuration Manager wants to use the Unified Map. Where would it be accessed?",
    "options": [
      "CI Class Manager",
      "CMDB Data Manager",
      "CMDB Workspace"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "The Unified Mapis a visualization capability used to understandservice composition, dependencies, and relationshipsacross CIs, Application Services, and infrastructure. In ServiceNow, the Unified Map is accessed through the CMDB Workspace.",
      "CMDB Workspace serves as the central experience for CMDB operations, analytics, and visualization. From within the workspace, users can launch the Unified Map to explore how services are constructed, identify dependencies, and analyze impact - leveraging data from Discovery and Service Mapping.",
      "Option A (CI Class Manager) is used forclass hierarchy, ownership, and principal class configuration, not visualization. Option B (CMDB Data Manager) is focused ongovernance and lifecycle policies, such as archival, certification, and attestation, not service mapping views.",
      "Because Unified Map is anoperational and analytical visualization tool, it is correctly accessed via CMDB Workspace.",
      "Therefore, the correct answer is C - CMDB Workspace."
    ]
  },
  {
    "id": "cisdf-054",
    "sourceQuestionNumber": 54,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "Which type of CMDB Data Manager policycreates tasks that allow the assigned individual toupdate fields on the CI record?",
    "options": [
      "Audit",
      "Certification",
      "Attestation",
      "Compliance"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In CMDB governance, different CMDB Data Manager policy typesserve different validation and enforcement purposes. When the objective is to allow an assigned individual toreview and update specific fields on a CI record, the correct policy type is Certification.",
      "ACertification policycreates actionable tasks that require the assignee tovalidate and, if necessary, correct specific CI attributes, such as lifecycle status, support group, environment, or ownership. During certification, the user can directly update CI fields to bring the record into compliance with defined standards.",
      "Attestation (Option C) only asks the user to confirm that a CIstill existsor is still valid; it does not require or enable attribute-level updates.Audit (Option A) is used for reporting and evidence collection, not remediation. Compliance (Option D) measures adherence to rules but does not itself generate editable remediation tasks.",
      "Certification is therefore the primary mechanism used whenhuman validation and correctionof CI data is required - making it a cornerstone of CMDB data quality management.",
      "Hence, the correct answer is B - Certification."
    ]
  },
  {
    "id": "cisdf-055",
    "sourceQuestionNumber": 55,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A customer's CMDB is aligned to the CSDM Walk stage. What benefit is provided by the CMDB?",
    "options": [
      "Allows for additional stratification of technical teams' support structure along the lines of OLAs and commitments",
      "Improves the implementation velocity of APM Foundation for future business application rationalization",
      "Enables impact assessments for incident, problem, and change on Business Services"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "In the CSDM Walk stage, an organization has moved beyond basic data hygiene (Crawl) and has establishedfoundational service models, especially Business Services and their relationships to underlying technical components. One of the most important and immediate benefits of reaching this stage is the ability to performreliable impact analysisacross ITSM processes.",
      "When Business Services are correctly defined and related to Application Services, applications, and infrastructure CIs, the CMDB becomes adecision-support systemrather than just a data repository. This enablesimpact assessments for Incident, Problem, and Change Management, which is exactly what Option C describes. For example, when an incident is logged against a CI, ServiceNow can automatically determine which Business Services are impacted and who the affected stakeholders are. Similarly, during Change Management, planners can assess downstream risk by identifying which business-facing services could be disrupted.",
      "Option A is more aligned with advanced operational governance and support model optimization, which typically appears later as organizations mature toward the Run stage. Option B relates to Application Portfolio Management (APM) acceleration, which benefits more from accurate application ownership and lifecycle data rather than core Walk-stage service modeling.",
      "Therefore, the correct and CSDM-aligned benefit at the Walk stage isenabling impact assessments for incident, problem, and change on Business Services, making Option Cthe verified answer."
    ]
  },
  {
    "id": "cisdf-056",
    "sourceQuestionNumber": 56,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "The followingidentification rulefor a Hardware CI class has been defined Two new CI records are imported into the Hardwareclass of the CMDB: CI1: Thenameof this CI record matches the name of an existing CI record in the CMDB. CI2: The IP addressof this CI record matches the IP address of an existing CI record in the CMDB. Which is correct based on the identification rule and the imported CI records?",
    "options": [
      "CI1 will be inserted as a new record and CI2 will be updated with the matching record",
      "CI1 and CI2 both will be inserted as new records",
      "CI1 will be updated with the matching record and CI2 will be inserted as a new record",
      "CI1 and CI2 both will be updated with matching records"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "This question tests understanding of how the Identification and Reconciliation Engine (IRE) evaluates incoming CI data against Identification Rulesand theirpriority orderin ServiceNow.",
      "From the identification rule shown:",
      "Serial number (+ type)# Priority 100 Serial number# Priority 200",
      "Name (Hardware)# Priority 300",
      "MAC address + name (Network Adapter)# Priority 400",
      "For a CI to beidentified and matched, the incoming record must satisfyone complete identifier entryexactly as defined for that class.",
      "CI1 (Name match only)",
      "Although thenamematches an existing Hardware CI, name alone is alow-priority identifier (300) and isnot sufficientto uniquely identify a Hardware CI unless no higher-priority identifiers existandthe identifier entry criteria are fully satisfied. In practice, Hardware identification relies onserial number - based identifiers, not name-only matching, to avoid false positives. Therefore, CI1cannot be confidently matchedand is inserted as anew record.",
      "CI2 (IP address match)",
      "IP address is not part of any Hardware identification ruleshown. IP address is typically used for discovery correlation or network relationships, not as a primary Hardware identifier. Since no identifier entry includes IP address, CI2does not match any valid identification ruleand is also inserted as anew record.",
      "Becauseneither CI satisfies a valid identifier entry, both records are inserted as new CIs."
    ]
  },
  {
    "id": "cisdf-057",
    "sourceQuestionNumber": 57,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "An organization is updating the CMDB to include new asset types like lo T devices Relevant CI classes need to be added and outdated ones need to be removed from the Principal Class filler to ensure accurate display in ITSM processes. Which roles are needed to add or remove classes?",
    "options": [
      "personalize.dictionary",
      "sn_cmdb_admin",
      "sn_csdm_admin",
      "cmdb_query_ builder"
    ],
    "correctOptions": [
      0,
      1
    ],
    "explanation": [
      "Managing CI classes and Principal Class designation is aschema-level CMDB activitythat directly impacts how CIs appear in ITSM processes such as Incident, Change, and Problem. In ServiceNow, these activities require specific administrative privileges to ensure governance, security, and upgrade safety.",
      "Thesn_cmdb_adminrole is required because it provides administrative access to CMDB structures, including CI class hierarchy management, Principal Class configuration, and overall CMDB governance. Without this role, users cannot add, remove, or govern CI classes effectively.",
      "Thepersonalize_dictionaryrole is also required because adding or removing CI classes involvesdictionary-level changes. CI classes are implemented as tables that extend the CMDB schema, and modifying the Principal Class filter relies on dictionary metadata. This role grants permission to create, modify, or remove class definitions safely.",
      "Thesn_csdm_adminrole focuses on managing CSDM constructs (domains, services, lifecycle alignment) but does not grant dictionary or schema modification rights. Thecmdb_query_builderrole is used only for querying and reporting and does not allow structural changes.",
      "Therefore, the two required roles arepersonalize.dictionaryandsn_cmdb_admin, making Options A and Bcorrect."
    ]
  },
  {
    "id": "cisdf-059",
    "sourceQuestionNumber": 59,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A Configuration Manager is planning the implementation of the CMDB. Which is theprescribed CSDM rollout order?",
    "options": [
      "Initial, Developing, Defined, Managed",
      "Architecture, Business, Technical, Governance",
      "Initiate, Plan, Execute, Deliver, Close",
      "Crawl, Walk, Run, Fly"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "The Common Service Data Model (CSDM) prescribes anincremental, maturity-based rollout approachto reduce risk and ensure sustainable adoption. The recommended order is Crawl, Walk, Run, Fly, which aligns implementation effort with increasing organizational capability and value realization.",
      "Crawlfocuses on foundational data hygiene: core CI classes, identification rules, reconciliation, basic Discovery ingestion, and CMDB Health basics.",
      "Walkintroduces service context, including Business Services, Application Services, and relationships that enable impact analys is for Incident and Change.",
      "Runexpands into operational excellence with Service Mapping, service offerings, advanced governance, and process automation.",
      "Flyrepresents optimization and scale, leveraging analytics, AI/ML, proactive operations, and cross-domain integration (e.g., Sec Ops, APM, CSM).",
      "This progression ensures teams do not over-model early or introduce complexity before data quality and governance are established. The other options describe generic project lifecycles or organizational categorizations, not the CSDM-recommended adoption path.",
      "Therefore, the correct answer is D - Crawl, Walk, Run, Fly."
    ]
  },
  {
    "id": "cisdf-060",
    "sourceQuestionNumber": 60,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "ACMDB Data Managerneeds to access the ServiceNow platform tocreate, publish, and manage policiesthat automate and govern CI lifecycle operations, ensuring the CMDB remains healthy and efficient. Where can the Data Manager do this?",
    "options": [
      "CMDB Workspace - CMDB 360 tab",
      "Service Operations Workspace",
      "CI Class Manager",
      "CMDB Workspace - Management tab"
    ],
    "correctOptions": [
      3
    ],
    "explanation": [
      "The CMDB Data Managerperforms governance activities such ascreating, publishing, and managing lifecycle policies (archival, certification, attestation, cleanup) to ensure long-term CMDB health. These activities are executed within the CMDB Workspace, specifically under the Management tab.",
      "In ServiceNow, the CMDB Workspace - Management tab is the centralized location for CMDB governance operations. From here, Data Managers can define policy logic, assign ownership, schedule execution, monitor outcomes, and manage remediation tasks generated by those policies.",
      "Option A (CMDB 360 tab) focuses onvisibility and analysisof CI data and relationships, not policy authoring. Option B (Service Operations Workspace) is used for operational response and service monitoring, not CMDB governance. Option C (CI Class Manager) is used to define class hierarchy and ownership, but it does not manage lifecycle policies.",
      "Therefore, the correct location for CMDB Data Manager policy management is CMDB Workspace - Management tab, making Option Dcorrect."
    ]
  },
  {
    "id": "cisdf-061",
    "sourceQuestionNumber": 61,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "Configuration Management requires an accurate inventory of devices to be reflected in the CMDB. Which are common use cases for using Agent Client Collector (ACC)?",
    "options": [
      "Servers in the data center",
      "Network devices in the DMZ",
      "Devices in secure environments",
      "Devices that intermittently connect to the network"
    ],
    "correctOptions": [
      2,
      3
    ],
    "explanation": [
      "The Agent Client Collector (ACC) in ServiceNow is designed to collect inventory data fromendpoints that are not consistently reachableby traditional Discovery methods. ACC is especially valuable where credential-based, network-based discovery is impractical or impossible.",
      "Devices in secure environments (Option C), such as isolated networks, restricted zones, or highly regulated environments, often block inbound discovery traffic. ACC runs locally on the device and securely sends inventory data outward, making it ideal for these scenarios.",
      "Devices that intermittently connect to the network (Option D), such as laptops, remote endpoints, or roaming devices, are another core use case. Traditional Discovery requires the device to be reachable during scheduled scans, which is unreliable for mobile or off-network assets. ACC ensures inventory data is collected whenever the device is online.",
      "Option A (data center servers) is better served byagentless Discovery, which provides deeper infrastructure and relationship data. Option B (network devices in the DMZ) are typically discovered using SNMP and network discovery, not ACC.",
      "ACC complements Discovery as part of a layered ingestion strategy, ensuring accurate inventory coverage across diverse environments.",
      "Therefore, the correct answers are C - Devices in secure environmentsand D - Devices that intermittently connect to the network."
    ]
  },
  {
    "id": "cisdf-062",
    "sourceQuestionNumber": 62,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A Configuration Management Governance team is transitioning from utilizinglegacy CMDB status fieldsto CSDM lifecycle status fields. Which table can be modified?",
    "options": [
      "Life Cycle Stages",
      "Life Cycle Mapping",
      "Life Cycle Stage Status",
      "Life Cycle Controls"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "When organizations transition from legacy CMDB status fields (such as custom install status or operational status values) to CSDM-aligned lifecycle status fields, the goal is tomap old values to standardized lifecycle stageswithout disrupting existing processes. In ServiceNow, this is achieved through the Life Cycle Mappingtable.",
      "The Life Cycle Mappingtable is specifically designed to translatelegacy or custom status valuesinto CSDM lifecycle stages and statuses. This allows organizations to preserve historical data and integrations while",
      "progressively adopting CSDM standards. By modifying this table, administrators can define how existing status values correspond to CSDM lifecycle stages such as Plan, Build, Deploy, Operate, and Retire.",
      "The Life Cycle Stagestable (Option A) defines the standard stages themselves and should not be modified, as these are core to CSDM governance.Life Cycle Stage Status (Option C) defines valid statuses within a stage and is also part of the standardized model.Life Cycle Controls (Option D) enforce governance rules but do not perform value translation.",
      "Therefore, to safely transition from legacy status fields to CSDM lifecycle statuses, the correct and supported approach is to modify the Life Cycle Mappingtable, making Option Bthe correct answer."
    ]
  },
  {
    "id": "cisdf-063",
    "sourceQuestionNumber": 63,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A Platform Data Owner wants to improve data quality with reconciliation rules across five discovery sources. The Data Owner knows the best option is to include CMDB 360 / Multisource CMDBto manage and monitor discovery sources. The company currently does not have the ITOM Discovery licenserequired for CMDB 360 / Multisource CMDB. What can the Data Owner do in this case?",
    "options": [
      "ITOM Discovery must be purchased to take advantage of multisource IRE rules",
      "The IRE reconciliation rules can use discovery sources regardless of CMDB 360 being enabled",
      "CMDB 360 / Multisource is a platform product that can be used immediately"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "The Identification and Reconciliation Engine (IRE) is acore platform capabilityin ServiceNowand doesnot require CMDB 360 / Multisource CMDBto function. Even without the ITOM Discovery license, organizations can still define and use IRE reconciliation rulesacross multiple data sources.",
      "IRE rules are source-aware and can evaluate attributes based onsource precedence, regardless of whether CMDB 360 is enabled. CMDB 360 enhances visibility, governance, and monitoring of multiple sources, but it isnot a prerequisitefor reconciliation logic itself.",
      "Option A is incorrect because purchasing ITOM Discovery is not mandatory to use multisource reconciliation. Option C is also incorrect because CMDB 360 / Multisource CMDB is alicensed add-on, not a universally available platform feature.",
      "Therefore, the Data Owner can proceed by configuring IRE reconciliation rules directly, making Option Bthe correct answer."
    ]
  },
  {
    "id": "cisdf-064",
    "sourceQuestionNumber": 64,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "Which default user groups are available when setting up a CMDB Data Manager policy and specifying the task assignment with the Assignment type set to \"User Group Field\"? (Choose 2 options)",
    "options": [
      "Owned by Group",
      "Support Group",
      "Managed By Group",
      "Assignment Group"
    ],
    "correctOptions": [
      2,
      3
    ],
    "explanation": [
      "In ServiceNow Data Foundations, specifically within CMDB Data Manager, policies are used to enforce data quality, completeness, and governance across configuration items (CIs). When defining a Data Manager policy, administrators can configure task creation for non-compliant records and specify how those tasks are assigned. One key configuration is the Assignment type, where \"User Group Field\" allows assignment to a group dynamically based on a group reference field on the CI record.",
      "Out of the box, ServiceNow provides two default and universally available group reference fields for this purpose:",
      "Assignment Group Managed By Group",
      "These two fields are considered core CMDB governance fields and are consistently available across most CI classes. They align directly with ITIL 4 Service Configuration Management and CSDM accountability models, ensuring that remediation tasks are routed to teams responsible for operational ownership or technical management of the CI.",
      "Assignment Group (Correct - D) This is the most commonly used operational field in ServiceNow. It represents the team responsible for working on tasks related to the CI and is fully supported by CMDB Data Manager for automated task assignment.",
      "Managed By Group (Correct - C) This field represents the group accountable for managing the CI throughout its lifecycle. It is a standard CMDB field and is explicitly supported by Data Manager policies for governance-driven task routing.",
      "The other options are not default Data Manager assignment fields:",
      "Owned by Group is often added through extensions or governance customization and is not guaranteed to exist across all CI classes.",
      "Support Group is a CSDM and ITSM operational concept, commonly derived or mapped, but it is not a default group reference field exposed for CMDB Data Manager task assignment.",
      "From a Data Foundations and CSDM governance perspective, using Assignment Group and Managed By Group ensures consistent accountability, scalable automation, and alignment with CMDB best practices."
    ]
  },
  {
    "id": "cisdf-065",
    "sourceQuestionNumber": 65,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is reviewing the CMDB and notices that many Hardware CIs are missing serial numbers. The Administrator is concerned this may causeduplicate CIsand wants to resolve the issue quickly. Whatstructured guidelines provided by ServiceNoware available to troubleshoot and resolve the issue?",
    "options": [
      "CMDB Data Foundations Dashboard Playbooks",
      "CSDM Data Foundations Dashboard Playbooks",
      "CMDB Health Dashboard Playbooks",
      "CSDM Now Create Playbooks"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "When data quality issues such asmissing serial numbersthreaten CMDB integrity and increase the risk of duplicates, ServiceNow providesprescriptive, step-by-step remediation guidancethrough the CMDB Data Foundations Dashboard Playbooks.",
      "These playbooks are specifically designed to help administratorsidentify root causes, assess ingestion and governance gaps, and apply corrective actions using structured remediation plays (Analyze Data, Fix Data, Govern Data). For missing serial numbers, the playbooks guide teams to review Discovery patterns, identification rules, reconciliation sources, and governance controls to ensure authoritative data capture and prevention of future issues.",
      "The CMDB Health Dashboard Playbooksfocus on health scoring and metrics, not guided remediation.CSDM Data Foundations Dashboard Playbooksis not a distinct product naming; the correct construct is CMDB Data Foundations.Now Create Playbooksprovide implementation project guidance, not operational troubleshooting for live data issues.",
      "Therefore, the correct answer is A - CMDB Data Foundations Dashboard Playbooks, which are purpose-built to quickly troubleshoot and remediate CMDB data quality problems while aligning with best practices in ServiceNow."
    ]
  },
  {
    "id": "cisdf-066",
    "sourceQuestionNumber": 66,
    "domain": "Ingest",
    "difficulty": "Skilled",
    "prompt": "The Apache Web Server Identification Ruleis configured with the followingcriterion attributes: Class Configuration file Version Yesterday, an Apache Web Server CIwas discovered as part of Service Mapping. Today, the application ownerupgraded Apache to a different versionand reran discovery of the service. What will happen in the CMDB?",
    "options": [
      "The existing Apache Web Server CI will be reconciled and its version will be updated.",
      "A new Apache Web Server CI is created.",
      "The Apache Web Server CI will be reclassified as a Web Server CI.",
      "A duplication error will occur."
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "This scenario hinges on how the Identification and Reconciliation Engine (IRE) in ServiceNowevaluatesidentification rules.",
      "The identification rule for the Apache Web Serverclass includes Versionas part of theidentifier criteria, along with Class and Configuration file. Identification rules must matchall criterion attributes exactlyfor an incoming record to be identified as an existing CI and reconciled.",
      "Yesterday's discovery created an Apache Web Server CI with a specific version value. When Apache is upgraded and discovery is rerun, the Version attribute changes. Because Version is part of the identifier, the incoming recordno longer matchesthe existing CI's identifier entry. As a result, the IREcannot identify the existing CIas the same configuration item.",
      "When identification fails and no matching identifier entry is found, the IRE proceeds toinsert a new CI recordrather than updating the existing one. This behavior is intentional and protects the CMDB from incorrectly reconciling records that no longer meet identification criteria.",
      "Option A is incorrect because reconciliation only occursafter successful identification. Option C is incorrect because reclassification is unrelated to identification criteria.",
      "Option D is incorrect because this is not an error condition; it is expected IRE behavior.",
      "This example highlights abest practice caution:volatile attributes (such as Version) should generallynot be used as identifier attributes, as they can cause unintended CI duplication during upgrades."
    ]
  },
  {
    "id": "cisdf-067",
    "sourceQuestionNumber": 67,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "Which is a purpose or requirement of CMDB Data Manager in ServiceNow?",
    "options": [
      "Encrypts archived records for enhanced security",
      "Automates the enforcement of relationship rules between CIs in the CMDB",
      "Automates the archival and deletion of records based on retention policies"
    ],
    "correctOptions": [
      2
    ],
    "explanation": [
      "The CMDB Data Managercapability in ServiceNow is designed to support CMDB governance, specifically arounddata lifecycle management. Its primary purpose is to ensure that CI records areretained, archived, and deletedin accordance with definedretention policies, regulatory requirements, and organizational data governance standards.",
      "As CMDBs mature, they naturally accumulate obsolete, retired, or decommissioned CIs. If these records are not properly managed, they negatively impact CMDB health, reporting accuracy, discovery reconciliation, and performance. CMDB Data Manager addresses this byautomating the archival and deletion of recordsonce lifecycle conditions and retention thresholds are met.",
      "Option A is incorrect because encryption of archived records is handled by platform-level security and data protection features, not CMDB Data Manager. Option B is also incorrect becauserelationship rule enforcement is managed through CSDM guidance, CMDB relationship rules, and identification/reconciliation logic - not by CMDB Data Manager.",
      "By automating retention-based archival and cleanup, CMDB Data Manager helps organizations maintain a lean, compliant, and high-quality CMDB, which directly supports CMDB Health metrics such as correctness and compliance.",
      "Therefore, the correct and verified answer is Option C."
    ]
  },
  {
    "id": "cisdf-068",
    "sourceQuestionNumber": 68,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "With CMDB 360 / Multisource CMDB, Dynamic Reconciliation Rules are enabled. Based on management requirements, a CMDB Administrator needs to configure multiple Dynamic Reconciliation Rules. Which are available Dynamic Rule Types within the Create Reconciliation Rule wizard? (Choose 2 options)",
    "options": [
      "Smallest Value",
      "Most Reported",
      "Last Updated",
      "Last Created"
    ],
    "correctOptions": [
      1,
      2
    ],
    "explanation": [
      "CMDB 360 / Multisource CMDBextends the standard IRE by enabling Dynamic Reconciliation Rules, which determine attribute values dynamically based on incoming data patterns rather than fixed source priority.",
      "Within the Create Reconciliation Rule wizard, two supporteddynamic rule types are:",
      "Most Reported (Option B): selects the attribute value that is reported most frequently across all sources. This is useful when multiple sources contribute data and consensus is a strong indicator of correctness.",
      "Last Updated (Option C): selects the most recently updated value, which is useful for rapidly changing attributes such as IP address or operational state.",
      "Option A (Smallest Value) and Option D (Last Created) are not supported dynamic reconciliation rule types in ServiceNow.",
      "Dynamic reconciliation rules are particularly valuable in complex, multisource environments where rigid source precedence is insufficient anddata confidence must be inferred.",
      "Therefore, the correct answers are B - Most Reportedand C - Last Updated."
    ]
  },
  {
    "id": "cisdf-069",
    "sourceQuestionNumber": 69,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator is comparing the Unified Map to the Service Mapping map. What are additional capabilities of the Unified Map? (Choose Two)",
    "options": [
      "Number of levels displayed on a map can be modified",
      "Map can be zoomed in and out",
      "Map nodes can be filtered based on user preferences",
      "Visibility to an application and the host it is installed on"
    ],
    "correctOptions": [
      1,
      2
    ],
    "explanation": [
      "The Unified Map is designed to provide enhanced visual insight and analys is across the CMDB by consolidating configuration item (CI) relationships from multiple sources - such as Discovery, Service Mapping, and manual relationships - into a single, interactive view. While traditional Service Mapping maps are optimized for modeling and understanding application-to-infrastructure dependencies, the Unified Map extends this capability with more flexible visualization and exploration features.",
      "Option B is correct because the Unified Map allows users to zoom in and out, enabling both high-level overviews and detailed inspections of complex CI relationships. This capability is particularly valuable in large enterprise environments where services may span hundreds or thousands of infrastructure components. Zoom functionality supports impact analys is, troubleshooting, and architectural reviews without overwhelming the user with unnecessary detail.",
      "Option C is also correct because the Unified Map supports filtering of map nodes based on user preferences",
      ". Administrators and analysts can filter by CI class, relationship type, lifecycle state, or other attributes, allowing them to focus on what is most relevant to their task - such as identifying only production CIs, security-relevant components, or a specific technology stack. This aligns strongly with Data Foundations principles by improving usability and decision-making without altering underlying data.",
      "Option A is incorrect because modifying the number of levels displayed is a characteristic more closely associated with Service Mapping configuration rather than an added Unified Map capability. Option D is incorrect because visibility into an application and its host is a core Service Mapping function, not an enhancement unique to the Unified Map.",
      "In summary, the Unified Map adds value by improving interactivity, flexibility, and user-driven insight across the CMDB."
    ]
  },
  {
    "id": "cisdf-070",
    "sourceQuestionNumber": 70,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator needs to create a new CI class for an Internet of Things (Io T) Sensorin ServiceNow. What are therecommended practicesfor this activity?",
    "options": [
      "Delete an unused class and replace it with the new one",
      "Install or update the CMDB CI Class Models Store application and verify the class does not already exist",
      "Add a new class under an appropriate parent class",
      "Modify an existing class"
    ],
    "correctOptions": [
      1,
      2
    ],
    "explanation": [
      "Creating new CI classes is ahigh-impact configuration activityand must follow strict Data Foundations and CSDM-aligned best practicesto avoid long-term technical debt and upgrade risk.",
      "Option Bis a recommended first step. Before creating any new CI class, administrators shouldinstall or update the CMDB CI Class Models Store applicationand verify whether an appropriate class already exists.",
      "ServiceNow frequently delivers new CI classes through updates and class model packages, and duplicating an existing or planned class can lead to fragmentation and governance issues.",
      "Option Cis also correct. When a new class is truly required, it should beadded under an appropriate parent classto inherit attributes, behaviors, and discovery patterns. For an Io T Sensor, this might be under a hardw are or device-related parent class, ensuring consistency and minimizing customization.",
      "Option A is incorrect and dangerous - deleting unused classes can break dependencies and historical data. Option D is also discouraged; modifying existing classes to repurpose them violates upgrade-safe design principles and can negatively impact discovery, integrations, and reporting.",
      "By verifying existing models first and extending the class hierarchy correctly, organizations maintain aclean, scalable, and upgrade-safe CMDB.",
      "Therefore, the correct answers are B and C."
    ]
  },
  {
    "id": "cisdf-071",
    "sourceQuestionNumber": 71,
    "domain": "Configuration",
    "difficulty": "Skilled",
    "prompt": "A Data Center Manager is working with the CMDB CI Class Managerto define the relationship between Application Serversand the Applicationsthey host. The company has multiple Application Servers that hostone or more Applications. Which describes the relationship between the Application Servertable and the Applicationtable?",
    "options": [
      "Many-to-many",
      "Many-to-one",
      "One-to-one",
      "One-to-many"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "In CMDB modeling, accurately defining relationships is critical for impact analys is, service mapping, and Change Management. In this scenario, Application Serverscan hostmultiple Applications, and Applications can also run across multiple Application Servers (for example, in clustered, load-balanced, or distributed architectures).",
      "This architectural reality defines amany-to-many relationshipbetween the Application Server table and the Application table.",
      "In ServiceNow, many-to-many relationships are common for application hosting models, especially in modern environments that use horizontal scaling, redundancy, or containerized workloads. Modeling this correctly ensures that incidents, changes, and outages affecting a single server can be accurately traced to all impacted applications - and vice versa.",
      "A one-to-many or many-to-one relationship would incorrectly assume exclusivity in one direction, which does not reflect real-world application deployment patterns. A one-to-one relationship would be even more restrictive and inaccurate.",
      "Therefore, the correct relationship type is A - Many-to-many, which aligns with CMDB best practices and CSDM service modeling principles."
    ]
  },
  {
    "id": "cisdf-072",
    "sourceQuestionNumber": 72,
    "domain": "Insight",
    "difficulty": "Skilled",
    "prompt": "CMDB class owners are receiving tasks under the\"My Work\"tab in the CMDB Workspace. Which CMDB management tool is generating those tasks?",
    "options": [
      "De-duplication templates",
      "CMDB Data Manager",
      "CMDB Health Dashboard"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "The CMDB Data Manageris the ServiceNow capability responsible for generatingactionable governance tasksand assigning them to CI class owners and data stewards. These tasks appear directly in the\"My Work\" tab within the CMDB Workspace, enabling proactive and role-based CMDB governance.",
      "CMDB Data Manager focuses ondata lifecycle management, including archival, retirement, and cleanup of CIs based on defined policies. When lifecycle rules or retention thresholds are met - or when human validation is required - the Data Manager creates tasks to prompt responsible owners to take action. This ensures that CMDB data remainsaccurate, compliant, and leanover time.",
      "The CMDB Health Dashboard (Option C) provides visibility into health metrics such as completeness, correctness, and compliance, but it doesnot generate tasks. Similarly, De-duplication templates (Option A) support duplicate identification and remediation workflows, but they do not create ongoing governance tasks in the CMDB Workspace.",
      "By surfacing tasks in \"My Work,\" CMDB Data Manager operationalizes governance and embeds accountability into daily workflows, which is a key principle of CMDB Data Foundations.",
      "Therefore, the correct answer is Option B - CMDB Data Manager."
    ]
  },
  {
    "id": "cisdf-073",
    "sourceQuestionNumber": 73,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A Configuration Manager has configured multiple data sources that are all authorized to update thesame class and the same set of class attributesin the CMDB. What can the Configuration Manager do to controlwhich data source should be the authoritative source of truthfor a specific class or set of class attributes?",
    "options": [
      "Assign a priority to each data source in reconciliation rules",
      "Manually run the data source updates in the correct order",
      "Configure data refresh rules with a specific time period",
      "Assign a run order to each data source in the identification rules"
    ],
    "correctOptions": [
      0
    ],
    "explanation": [
      "In ServiceNow, controllingsource precedencewhen multiple authorized data sources update the same CI attributes is a core responsibility of Identification and Reconciliation Engine (IRE) governance.",
      "The correct and supported method is toassign priority to each data source in reconciliation rules. Reconciliation rules determinewhich source winswhen multiple sources attempt to update the same attribute on a CI. By defining source precedence, the Configuration Manager ensures that the most authoritative system of record (for example, Discovery over manual imports, or HR systems over spreadsheets) consistently controls specific attributes or classes.",
      "Option B is incorrect because manually sequencing data source runs is unreliable, does not scale, and violates Data Foundations best practices. Option C only controls how often data is refreshed, not which source is authoritative. Option D is incorrect becauseidentification rules are used to uniquely identify CIs - not to control attribute-level precedence.",
      "Using reconciliation rules providesdeterministic, auditable, and automated control, which is essential for maintaining CMDB trust and avoiding data conflicts.",
      "Therefore, the correct answer is A - Assign a priority to each data source in reconciliation rules."
    ]
  },
  {
    "id": "cisdf-074",
    "sourceQuestionNumber": 74,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "The CMDB Configuration Manager is using the CI Class Managerto define group ownership of CI classes and needs to leverage the ownership value specified in the CI Class Manager. When creating a CMDB Data Manager policy, whichgroup reference fieldshould be set?",
    "options": [
      "Approval Group",
      "Managed By Group",
      "Support Group",
      "Change Group"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "In ServiceNow CMDB governance, the CI Class Managerallows administrators to assignownership and accountabilityat the class level. This ownership is used by governance tools - especially CMDB Data Manager - to automatically determinewho receives tasks and actionsrelated to data lifecycle management.",
      "The group reference field that aligns with class ownership and is consumed by CMDB Data Manager policies is the Managed By Group. This field represents the team responsible for thetechnical stewardship and lifecycle managementof CIs within that class.",
      "When CMDB Data Manager executes policies such as retention, archival, or cleanup, it uses the Managed By Groupto assign tasks to the appropriate data owners. This ensures governance actions are routed to the correct accountable team without manual intervention.",
      "Approval Group, Support Group, and Change Group serve different purposes. Approval Group is used for workflow approvals, Support Group is used for operational ticket routing, and Change Group supports Change Management governance. None of these reflectdata ownership at the class level.",
      "Therefore, to leverage CI class ownership defined in the CI Class Manager within CMDB Data Manager policies, the correct field is Managed By Group, making Option Bthe verified answer."
    ]
  },
  {
    "id": "cisdf-075",
    "sourceQuestionNumber": 75,
    "domain": "CSDM Fundamentals",
    "difficulty": "Skilled",
    "prompt": "A Platform Owner is collaborating with stakeholders in the manufacturing industry to align their CIs with the CSDM 5 framework. They need to mapproduction line monitoring systemsto the appropriate CSDM domain. Which CSDM 5 domain does the Platform Owner use?",
    "options": [
      "Build and Integration (Build)",
      "Foundation",
      "Service Consumption (Sell/Consume)",
      "Design and Planning (Design)",
      "Service Delivery (Manage Technical)"
    ],
    "correctOptions": [
      4
    ],
    "explanation": [
      "In CSDM 5, production line monitoring systems (such as SCADA, MES, Io T telemetry platforms, and operational monitoring tools) aretechnical systems responsible for operating, monitoring, and supporting services, not for designing them or consuming them. These systems directly align with the Service Delivery (Manage Technical) domain.",
      "The Service Deliverydomain is used to modelhow services are technically delivered and operated, including the infrastructure, platforms, and operational technologies that ensure availability, performance, and reliability. In a manufacturing context, production line monitoring systems continuously observe equipment health, throughput, alerts, and operational metrics - making them part of thetechnical service delivery layer.",
      "Option A (Build and Integration) applies to CI/CD pipelines and system construction activities. Option B (Foundation) focuses on base CIs such as locations, people, and organizations. Option C (Service Consumption) models how customers or consumers use services, which is not applicable here. Option D (Design and Planning) is used for service architecture and planning artifacts, not live operational systems.",
      "Therefore, production line monitoring systems correctly belong in Service Delivery (Manage Technical), making Option Ethe correct answer."
    ]
  },
  {
    "id": "cisdf-077",
    "sourceQuestionNumber": 77,
    "domain": "Govern",
    "difficulty": "Skilled",
    "prompt": "A CMDB Administrator wants to remove all Linux Servers in the organization that have not been updated in six months. Which recommended action should the Administrator take in Data Foundations?",
    "options": [
      "Create a business rule",
      "Create an archive policy",
      "Create a scheduled job"
    ],
    "correctOptions": [
      1
    ],
    "explanation": [
      "Removing obsolete or inactive CIs from the CMDB must be handled carefully to avoid data loss, audit issues, and unintended operational impact. In ServiceNow, the recommended and governed approach is to use an archive policy.",
      "Archive policies are designed to manage CI lifecycle cleanup based on defined conditions such as class, last updated date, lifecycle status, or operational state. In this scenario, the condition would target Linux Server CIs that have not been updated in six months. Archive policies can either archive or permanently delete records in a controlled, auditable manner, ensuring compliance with data retention and governance standards.",
      "Creating a business rule (Option A) is strongly discouraged for bulk CMDB cleanup because it introduces technical debt, upgrade risk, and unpredictable side effects. A scheduled job (Option C) may automate execution but lacks governance logic and lifecycle awareness on its own.",
      "Archive policies integrate with CMDB Data Manager, provide visibility into actions taken, and support approval and rollback where appropriate. This aligns fully with Data Foundations best practices for maintaining a lean, accurate, and trusted CMDB.",
      "Therefore, the correct and recommended action is B - Create an archive policy.",
      "About Dumps Wrap.com",
      "dumpswrap.com was founded in 2007. We provide latest & high quality IT / Business Certification Training Exam Questions, Study Guides, Practice Tests.",
      "We help you pass any IT / Business Certification Exams with 100% Pass Guaranteed or Full Refund. Especially Cisco, Comp TIA, Citrix, EMC, HP, Oracle, VMware, Juniper, Check Point, LPI, Nortel, EXIN and so on.",
      "View list of all certification exams: All vendors",
      "We prep are state-of-the art practice tests for certification exams. You can reach us at any of the email addresses listed below.",
      "Sales: sales@dumpswrap.com",
      "Feedback: feedback@dumpswrap.com",
      "Support: support@dumpswrap.com",
      "Any problems about IT certification or our products, You can write us back and we will get back to you within 24 hours."
    ]
  }
];

export const unsupportedQuestionNumbers = [
  1,
  8,
  29,
  35,
  40,
  49,
  58,
  76
];

export const examMeta = {
  code: "CIS-DF",
  name: "Certified Implementation Specialist - Data Foundations",
  totalSourceQuestions: 77,
  playableQuestions: questions.length,
  unsupportedQuestionNumbers,
  sourceFormat: "DOCX",
};
