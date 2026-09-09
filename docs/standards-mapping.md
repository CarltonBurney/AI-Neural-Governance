# Standards Mapping

**Purpose:** Show where this framework's controls satisfy recognized external requirements, so that a single control set serves regulatory, certification, and assurance needs rather than three parallel programs.

> **Scope note.** This is an indicative crosswalk prepared as a portfolio artifact, not a certified conformity assessment or legal advice. Applicability depends on jurisdiction, role (provider vs. deployer), and the specific system. Formal conformity assessment requires qualified counsel and, where applicable, a notified body.

---

## 1. Why crosswalk at all

Three frameworks dominate enterprise AI assurance, and they answer different questions:

| Framework | Nature | Question it answers |
|---|---|---|
| **EU AI Act** | Binding regulation | *Are we permitted to deploy this, and under what obligations?* |
| **ISO/IEC 42001:2023** | Certifiable management system | *Can we demonstrate a functioning management system to a third party?* |
| **NIST AI RMF 1.0** | Voluntary framework | *Are we managing the risk competently?* |

Built separately they produce three control sets, three evidence trails, and three audits over the same systems. Built as one, the crosswalk below shows a single control satisfying obligations across all three.

---

## 2. Tier alignment to EU AI Act risk categories

| This framework | EU AI Act category | Basis |
|---|---|---|
| **T0 Prohibited** | Unacceptable risk — Article 5 | Prohibited practices, applied as a pre-decided intake rejection list |
| **T1 High** | High risk — Article 6 and Annex III | Annex III domains: employment, credit and essential services, education, biometrics, critical infrastructure, law enforcement, migration, justice |
| **T2 Limited** | Limited risk — Article 50 transparency obligations | Chatbots, synthetic media, emotion recognition disclosure |
| **T3 Minimal** | Minimal risk | No specific obligations; voluntary practice |

The tier override rules in [Classification §4](classification-framework.md) are drawn directly from the Annex III high-risk domains, which is why employment, credit, essential services, education, and safety-critical contexts force T1 regardless of dimensional score.

---

## 3. Control crosswalk

| This framework | EU AI Act | ISO/IEC 42001 | NIST AI RMF |
|---|---|---|---|
| T0 prohibited list ([Class. §2](classification-framework.md)) | Art. 5 | A.5 impact assessment | MAP 1 |
| Tier classification ([Class. §3–4](classification-framework.md)) | Art. 6, Annex III | Cl. 6.1 risk and opportunity; A.5 | MAP 1, MAP 2 |
| Gate 1 intake and inventory | Art. 49 registration | Cl. 8.1; A.6 lifecycle | GOVERN 1, MAP 1 |
| Gate 2 design review | Art. 9 risk management system | A.6.2 AI system lifecycle | MAP 2, MAP 3 |
| Gate 3 data governance | Art. 10 data and data governance | A.7 data for AI systems | MAP 2, MEASURE 2 |
| Gate 4 build validation and evaluation | Art. 15 accuracy, robustness, cybersecurity | Cl. 9.1 monitoring and evaluation | MEASURE 1, MEASURE 2 |
| Fairness / disparate impact testing | Art. 10(2)(f) bias examination | A.5 impact assessment | MEASURE 2 |
| Adversarial and red-team testing | Art. 15(5) cybersecurity | A.6.2 verification and validation | MEASURE 2, MANAGE 2 |
| Model / system card | Art. 11, Annex IV technical documentation; Art. 13 | A.6.2; A.8 information to interested parties | GOVERN 4, MAP 5 |
| Gate 5 approval with named signatory | Art. 17 quality management system | Cl. 5.3 roles and authorities | GOVERN 2, GOVERN 3 |
| Human oversight design ([HITL §2–4](human-in-the-loop.md)) | **Art. 14 human oversight** | A.9 responsible use of AI systems | MANAGE 1, MANAGE 2 |
| Rubber-stamp detection ([HITL §5](human-in-the-loop.md)) | Art. 14(4) automation bias | Cl. 9.1 | MEASURE 3, MANAGE 4 |
| Decision logging and retention | Art. 12 record-keeping; Art. 19 logs | A.6.2; Cl. 7.5 documented information | MEASURE 1, MANAGE 4 |
| AI disclosure to users | Art. 50 transparency | A.8 | GOVERN 4, MAP 5 |
| Contestation and appeal ([HITL §7](human-in-the-loop.md)) | Art. 86 right to explanation | A.9 | MANAGE 4 |
| Continuous monitoring ([Gov. §6](governance-model.md)) | Art. 72 post-market monitoring | Cl. 9.1; A.6.2 | MEASURE 4, MANAGE 4 |
| Incident response ([Gov. §7](governance-model.md)) | Art. 73 serious incident reporting | Cl. 10.2 nonconformity and corrective action | MANAGE 4 |
| Recertification | Art. 17; Art. 72 | Cl. 9.3 management review | GOVERN 1, MANAGE 4 |
| Third-party and embedded AI ([Gov. §8](governance-model.md)) | Art. 25 responsibilities along the value chain | A.10 third-party relationships | GOVERN 6, MAP 4 |
| Council and decision rights ([Gov. §2–3](governance-model.md)) | Art. 17, Art. 26 deployer obligations | Cl. 5 leadership; A.3 internal organization | GOVERN 1, GOVERN 2 |
| Exception process ([Class. §6](classification-framework.md)) | Art. 9 residual risk | Cl. 6.1.3; Cl. 8.1 | GOVERN 1, MANAGE 1 |
| Risk register | Art. 9 | Cl. 6.1; Cl. 8.2 | MAP 1, MANAGE 1 |
| Internal Audit third line | Art. 17 QMS audit | **Cl. 9.2 internal audit** | GOVERN 3 |

NIST references are given at function and category level. ISO clause references follow ISO/IEC 42001:2023 structure — Clauses 4–10 for the management system, Annex A for controls.

---

## 4. Provider vs. deployer

The EU AI Act assigns different obligations depending on role, and the same organization is frequently both across its portfolio.

| Role | When it applies | Principal obligations | Where handled here |
|---|---|---|---|
| **Provider** | System built in-house, or a third-party system placed on the market under your name or materially modified | Art. 9 risk management, Art. 10 data governance, Art. 11 technical documentation, Art. 15 accuracy and robustness, Art. 17 QMS, conformity assessment, registration | Gates 2–5, model card, evidence pack |
| **Deployer** | Using a third-party high-risk system as intended | Art. 26 use per instructions, Art. 14 human oversight, input data relevance, monitoring, log retention, notify affected persons | Gates 1, 6, 7; [HITL](human-in-the-loop.md); [Gov. §8](governance-model.md) |

**Substantial modification flips the role.** Fine-tuning a vendor model, materially changing its intended purpose, or deploying it under your own brand can convert a deployer into a provider — with the full provider obligation set attached. Gate 8 change classification exists partly to catch this transition before it happens silently.

---

## 5. Gap posture

Honest self-assessment of what this framework does and does not cover:

| Area | Status |
|---|---|
| Governance structure, decision rights, lifecycle gates | Covered |
| Classification and tiering | Covered |
| Human oversight design and effectiveness testing | Covered |
| Documentation and evidence model | Covered |
| Conformity assessment procedure, notified body engagement | **Not covered** — requires qualified counsel |
| CE marking and EU declaration of conformity | **Not covered** |
| Sector overlays (HIPAA, GLBA, FCRA, PCI DSS, SOX) | **Not covered** — would be added as domain annexes |
| Jurisdictions beyond EU (US state AI laws, UK, Canada AIDA, China) | **Not covered** in this version |
| Technical security controls for model infrastructure | Deferred to existing enterprise security program |

Listing gaps explicitly is itself a governance practice: an assurance framework that claims complete coverage is the least trustworthy kind.

---

*Illustrative crosswalk prepared as a portfolio artifact. Not legal advice.*
