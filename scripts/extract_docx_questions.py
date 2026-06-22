import json
import re
import sys
from pathlib import Path

from docx import Document


LETTER_TO_INDEX = {letter: index for index, letter in enumerate("ABCDEF")}


def clean_text(value: str) -> str:
    value = value.replace("ServiceNow", "SERVICE_NOW_TOKEN")
    value = value.replace("\t", " ")
    value = value.replace("\u2019", "'")
    value = value.replace("\u2018", "'")
    value = value.replace("\u201c", '"')
    value = value.replace("\u201d", '"')
    value = value.replace("\u2014", " - ")
    value = value.replace("\u2013", " - ")
    value = re.sub(r"(?<=[a-z0-9)])(?=[A-Z])", " ", value)
    value = re.sub(r"(?<=\))(?=[a-z])", " ", value)
    value = re.sub(r"(?<=[a-z])(?=\()", " ", value)
    value = re.sub(r"(?<=\))(?=[A-Z])", " ", value)
    value = value.replace("SERVICE_NOW_TOKEN", "ServiceNow")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def polish_text(value: str) -> str:
    replacements = {
        "aresynced": "are synced",
        "aretrue": "are true",
        "areshown": "are shown",
        "areshown": "are shown",
        "areincluded": "are included",
        "offeringthat": "offering that",
        "Ruleswere": "Rules were",
        "SCCMfor": "SCCM for",
        "Altiriscan": "Altiris can",
        "SCCMinto": "SCCM into",
        "ServiceNowcan": "ServiceNow can",
        "SCCMcan": "SCCM can",
        "ofreconciliation": "of reconciliation",
        "priorityin": "priority in",
        "rules,lower": "rules, lower",
        "hashigher": "has higher",
        "can update": "can update",
        "can insert": "can insert",
        "lowest priority": "lowest priority",
        "anauthorized": "an authorized",
        "Itcan": "It can",
        "recordsinto": "records into",
        "affectsupdates": "affects updates",
        "doesnothave": "does not have",
        "Ahigher": "A higher",
        "tosynchronize": "to synchronize",
        "attributesto": "attributes to",
        "influenceoperational": "influence operational",
        "Groupand": "Group and",
        "Remediatorto": "Remediator to",
        "Remediatoris": "Remediator is",
        "datafrom": "data from",
        "thatautomated": "that automated",
        "containvaluable": "contain valuable",
        "Unified Mapto": "Unified Map to",
        "tofilter": "to filter",
        "thefilter": "the filter",
        "Rulesare": "Rules are",
        "Typeswithin": "Types within",
        "Rulewizard": "Rule wizard",
        "actionshould": "action should",
        "anarchive": "an archive",
        "based on Dynamic CI Groupsto": "based on Dynamic CI Groups to",
        "Foundation sc apability": "Foundations capability",
        "Foundationscapability": "Foundations capability",
        "synchronizeoperational": "synchronize operational",
        "attributes to": "attributes to",
        "operationalownership": "operational ownership",
        "The Support Groupdefines": "The Support Group defines",
        "The Managed by Grouprepresents": "The Managed by Group represents",
        "B (Managed by Group)and": "B (Managed by Group) and",
        "Data Certificationand": "Data Certification and",
        "Attestationpolicies": "Attestation policies",
        "The Duplicate CI Remediatorto": "The Duplicate CI Remediator to",
        "thefirst": "the first",
        "the Main CIis": "the Main CI is",
        "Whichattributes": "Which attributes",
        "themost": "the most",
        "alonger": "a longer",
        "themost relationships": "the most relationships",
        "abusiness": "a business",
        "Oldest Createdand": "Oldest Created and",
        "Whichscorecard": "Which scorecard",
        "Duplicate CI,Orphan CI,": "Duplicate CI, Orphan CI,",
        "Stale CImetrics": "Stale CI metrics",
        "Health Dashboardin": "Health Dashboard in",
        "Duplicate CIs,Orphan CIs,": "Duplicate CIs, Orphan CIs,",
        "data quality for CIsare": "data quality for CIs are",
        "InServiceNow": "In ServiceNow",
        "inServiceNow": "in ServiceNow",
        "ServiceNowis": "ServiceNow is",
        "CMDB Data Managerin": "CMDB Data Manager in",
        "Linux Serversin": "Linux Servers in",
        "havenot": "have not",
        "Whichrecommended": "Which recommended",
        "Archive policiesare": "Archive policies are",
        "CI lifecycle cleanupbased": "CI lifecycle cleanup based",
        "Linux Server CIsthat": "Linux Server CIs that",
        "Creating abusiness": "Creating a business",
        "Ascheduled": "A scheduled",
        "alean": "a lean",
        "Option Dcorrectly": "Option D correctly",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)

    value = re.sub(r"\b([A-Z][A-Za-z]+)\(Option", r"\1 (Option", value)
    value = value.replace("?(Choose", "? (Choose")
    value = re.sub(r"\b([a-z]{3,})(requires|tracks|validates|confirms|represents|defines|supports|allows|indicates|signal|signals|lack|lacks|have|has|can|cannot|does|do|is|are)\b", r"\1 \2", value)
    value = re.sub(r"\b(to|for|from|with|into|against|during|while|because|where|when|what|which|that|than|and|or|but|not)([A-Z][a-z])", r"\1 \2", value)
    value = re.sub(r",(?=[A-Za-z])", ", ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def split_segments(lines: list[str]) -> list[tuple[int, list[str]]]:
    starts = [index for index, text in enumerate(lines) if text.startswith("Question #:")]
    segments: list[tuple[int, list[str]]] = []

    first_question_index = next(
        (
            index
            for index, text in enumerate(lines)
            if text.startswith("Some steps need to be taken")
        ),
        None,
    )
    if first_question_index is not None and starts:
        segments.append((1, lines[first_question_index : starts[0]]))

    for position, start in enumerate(starts):
        end = starts[position + 1] if position + 1 < len(starts) else len(lines)
        match = re.search(r"Question #:(\d+)", lines[start])
        if match:
            segments.append((int(match.group(1)), lines[start:end]))

    return segments


def parse_header(header: str) -> tuple[str, str]:
    category = "General"
    category_match = re.search(r"\[([^\]]+)\]", header)
    if category_match:
      category = clean_text(category_match.group(1))

    remainder = re.sub(r"^Question #:\d+\s*-\s*", "", header)
    remainder = re.sub(r"\[[^\]]+\]", "", remainder)
    remainder = re.sub(r"\(Choose\s+\d+\s+options?\)", "", remainder, flags=re.I)
    return category, clean_text(remainder)


def parse_segment(question_number: int, segment: list[str]) -> dict | None:
    answer_index = next(
        (index for index, text in enumerate(segment) if text.startswith("Answer:")),
        None,
    )
    if answer_index is None:
        return None

    answer_text = segment[answer_index]
    answer_letters = re.findall(r"\b[A-F]\b", answer_text.replace("Answer:", ""))
    if not answer_letters:
        return None

    explanation_marker = next(
        (index for index, text in enumerate(segment) if text == "Explanation"),
        None,
    )
    explanation_lines = segment[explanation_marker + 1 :] if explanation_marker is not None else []

    header = segment[0] if segment[0].startswith("Question #:") else ""
    category, header_prompt = parse_header(header) if header else ("CSDM Fundamentals", "")

    before_answer = segment[1:answer_index] if header else segment[:answer_index]
    before_answer = [
        polish_text(clean_text(text))
        for text in before_answer
        if clean_text(text) and not re.fullmatch(r"\(Choose\s+(two|\d+)\s*(options?)?\)", clean_text(text), re.I)
    ]

    has_three_option_question_line = (
        len(before_answer) >= 4
        and max(LETTER_TO_INDEX[letter] for letter in answer_letters) <= 2
        and before_answer[-4].endswith("?")
    )
    minimum_option_count = 3 if len(before_answer) < 4 or has_three_option_question_line else 4
    option_count = max(minimum_option_count, max(LETTER_TO_INDEX[letter] for letter in answer_letters) + 1)
    if len(before_answer) < option_count:
        return None

    options = before_answer[-option_count:]
    prompt_lines = before_answer[:-option_count]
    if header_prompt:
        prompt_lines.insert(0, header_prompt)

    prompt = polish_text(clean_text(" ".join(prompt_lines)))
    explanation = [
        polish_text(clean_text(line))
        for line in explanation_lines
        if polish_text(clean_text(line))
    ]

    if not prompt or not explanation or any(not option for option in options):
        return None

    return {
        "id": f"cisdf-{question_number:03d}",
        "sourceQuestionNumber": question_number,
        "domain": category,
        "difficulty": "Skilled",
        "prompt": prompt,
        "options": options,
        "correctOptions": [LETTER_TO_INDEX[letter] for letter in answer_letters],
        "explanation": explanation,
    }


def to_ts(question_bank: list[dict], unsupported: list[int]) -> str:
    payload = json.dumps(question_bank, indent=2, ensure_ascii=True)
    unsupported_payload = json.dumps(unsupported, indent=2)
    return f"""export type Question = {{
  id: string;
  sourceQuestionNumber: number;
  domain: string;
  difficulty: "Novice" | "Skilled" | "Expert";
  prompt: string;
  options: string[];
  correctOptions: number[];
  explanation: string[];
}};

export const questions: Question[] = {payload};

export const unsupportedQuestionNumbers = {unsupported_payload};

export const examMeta = {{
  code: "CIS-DF",
  name: "Certified Implementation Specialist - Data Foundations",
  totalSourceQuestions: 77,
  playableQuestions: questions.length,
  unsupportedQuestionNumbers,
  sourceFormat: "DOCX",
}};
"""


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract_docx_questions.py input.docx output.ts")

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    lines = [clean_text(paragraph.text) for paragraph in Document(source).paragraphs]
    lines = [line for line in lines if line]

    question_bank: list[dict] = []
    unsupported: list[int] = []

    for question_number, segment in split_segments(lines):
        parsed = parse_segment(question_number, segment)
        if parsed:
            question_bank.append(parsed)
        else:
            unsupported.append(question_number)

    destination.write_text(to_ts(question_bank, unsupported), encoding="utf-8")
    print(
        json.dumps(
            {
                "playableQuestions": len(question_bank),
                "unsupportedQuestionNumbers": unsupported,
                "output": str(destination),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
