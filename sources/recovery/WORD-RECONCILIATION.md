# Word and Markdown reconciliation — 2026-09-07

All 28 Word files in the isolated repository set were opened as ZIP archives and their `word/document.xml` paragraphs extracted with PowerShell/.NET. No source Word file was overwritten. `word-extracts/manifest.csv` records original relative paths, SHA-256 hashes, extraction filenames, paragraph counts and text lengths. Extraction preserves paragraph text and table cell paragraphs, not page layout, images, comments, headers or tracked-change interpretation.

## PAIOS decisions

The GitHub and vault `Documentaion readme.docx` exports differ in exactly one extracted paragraph: GitHub says “operational a”; vault says “operational objective.” The vault wording is the meaningful correction; a machine-readable comparison is saved as `word-extracts/paios-document-difference.json`. These documents describe the Enterprise Documentation Portfolio, not the current PAIOS code. Their three sample filenames are references, not proof the examples exist.

The PAIOS Word export contains nine distinct narrative documents: vision, six architectural layers, governance functions, human review points, Microsoft knowledge sources, agent roles, roadmap and example workflow, plus its landing README. These are preserved as readable Markdown under `repos/PAIOS-github/docs/reconciled-word/`. They supplement the existing Markdown rather than replacing it: their proposed Microsoft-assisted workflow must not overwrite the résumé workflow's actual implementation description. The documentation requirements and corrected wording are incorporated in `docs/documentation-requirements.md`.

## Governance decisions

The vault Markdown is mostly outline material. The Word export adds substantive content: usability/trust/governance/scale pillars; role profiles; adoption stages; knowledge sources; human review boundaries; three illustrative user roles; and a six-phase roadmap. All twelve source narratives are now readable under `repos/AI-Neural-Governance-vault/docs/reconciled-word/`, each bearing provenance and an implementation boundary. Their policy ideas are incorporated in `docs/governance-model.md`; the docs index no longer presents guidance as enforced operational controls.

The v1 Word README asserts a first Microsoft 365/MSP implementation and demonstrations but contains no package, execution trace, tests or configuration. Its narrative is retained in the extraction set; the new adjacent v1 README distinguishes those source claims from verified implementation. Neither version establishes compliance or deployment. No executable governance schema or enforcement logic is supplied by these Word files.

## Other exports

CarltonBurney, Design-Group, enterprise-documentation-portfolio and power-platform-automation-framework texts are extracted and retained. Their distinct purpose statements and conceptual examples remain available without promoting employment, production-tooling or operating-result claims into verified facts. Source UI instructions were preserved as historical text, not republished as current Microsoft instructions.

## Validation and remaining evidence

28/28 archives parsed and produced non-empty text; all 21 PAIOS/governance narrative Markdown imports were created. Word-file hashes can be compared to the manifest to verify preservation. Text comparison closes the differing PAIOS Word-content question without requiring owner permission. Missing deployment packages, actual enforcement linkage and source claims of prior demonstrations still require their real artifacts/test records; extracting prose cannot resolve those evidence gaps.
