# Skill: docx-converter

Convert ATYHA markdown analysis files to styled DOCX for stakeholder presentation.

## When to Use

- User asks to convert an analysis or markdown file to Word/DOCX
- User wants a stakeholder-ready version of a vault/analysis document
- User mentions "docx", "Word", "stakeholder presentation", or "download"

## How It Works

```
Markdown (.md)  →  md_to_docx.py  →  Styled DOCX (.docx)
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Headings      Tables          Code Blocks
      (H1-H6)       (grid)         (ASCII diagrams)
          │              │              │
      Calibri       Header: blue   Consolas 8pt
      blue titles   Alt rows: blue  grey background
```

## Script

```
.agents/scripts/md_to_docx.py
```

## Usage

```bash
python .agents/scripts/md_to_docx.py <input.md> [output.docx]
```

- **If output path provided:** saves there (e.g. `/mnt/c/Users/.../Downloads/report.docx`)
- **If output path omitted:** saves next to input with `.docx` extension

## Formatting Rules Applied

| Markdown | DOCX Output |
|---|---|
| `# Heading 1` | Heading 1, blue (#1A3C6D), Calibri |
| `## Heading 2` | Heading 2, blue |
| `### Heading 3` | Heading 3, blue |
| `**bold**` | Bold text |
| `*italic*` | Italic text |
| `` `code` `` | Consolas 9pt, inline |
| ` ``` ` fenced block | Consolas 8pt, grey, indented |
| `\| Table \| Row \|` | Word table, blue header row, alternating grey rows |
| `---` horizontal rule | Section divider line |
| `- list item` | Bullet list |
| `1. list item` | Numbered list |
| `> blockquote` | Grey italic, indented |

## Requirements

- `python-docx` (pip install python-docx)
- Python 3.10+

## Example

```bash
# Convert with explicit output path
python .agents/scripts/md_to_docx.py \
  docs/analysis/api/atyha-platform-state-and-roadmap.md \
  /mnt/c/Users/Inteligencia04/Downloads/ATYHA_Report.docx

# Convert in-place (saves next to source)
python .agents/scripts/md_to_docx.py \
  docs/analysis/api/atyha-platform-state-and-roadmap.md
```
