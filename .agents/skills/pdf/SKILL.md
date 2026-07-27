# PDF Analysis Skill

Read and analyze PDF documents for domain reference and textual extraction.

## When to use

- Reading PDF manuals, theses, guides, reports
- Extracting text from domain reference PDFs (ILPF thesis, forage manuals, etc.)
- Extracting tables from PDF layouts
- Analyzing multi-page PDF structures

## How to read (text extraction)

```python
import pdfplumber

with pdfplumber.open('path/to/file.pdf') as pdf:
    print(f"Pages: {len(pdf.pages)}")

    # Full text
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            print(f"\n--- Page {i+1} ---")
            print(text[:2000])

    # Tables
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables()
        for ti, table in enumerate(tables):
            print(f"\nTable {ti+1} on page {i+1}:")
            for row in table:
                print(row)
```

## Alternative: pdftotext (poppler)

```bash
pdftotext -layout file.pdf - | head -200
```

## Rendering pages (for visual inspection)

```bash
# Convert page 1 to PNG
pdftoppm -f 1 -l 1 -r 150 file.pdf output_prefix
```

## Constraints

- pdfplumber covers text + table extraction; poppler-utils (`pdftotext`, `pdftoppm`) available as system tools
- Image-heavy PDFs (CartilhaILPF, 17MB) may yield limited text — use `pdftoppm` for visual inspection
- Structured table extraction from complex layouts may need manual review
- PDF is supplementary reference, not source of truth (spreadsheets are primary)
