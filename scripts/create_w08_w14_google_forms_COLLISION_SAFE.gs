/**
 * DSA261 — Weeks 08–14 student Google Forms automation
 *
 * Creates 7 pre-class quizzes, 7 after-class tasks, and the Final Project
 * submission form. It also generates a COMPLETE `_variables.yml` that
 * preserves the existing W01–W07 links and adds W08–W14.
 *
 * Quarto safety lesson from W06:
 * Google Form IDs can contain two consecutive ASCII hyphens. Pandoc smart
 * punctuation may transform that sequence when inserted into Markdown.
 * Therefore every Form URL written to YAML is passed through
 * `quartoSafeFormUrl_()`, which encodes consecutive hyphens as %2D%2D.
 *
 * Run: createDSA261W08W14Forms()
 */

/**
 * Collision-safe namespace.
 *
 * This file is designed to coexist in the SAME Apps Script project as the
 * W02-W07 automation file. All CONFIG/QUIZZES/TASKS/helper identifiers are
 * scoped inside DSA261_W08_W14 so they cannot collide with earlier scripts.
 */
const DSA261_W08_W14 = (() => {
  const CONFIG = {
    FOLDER_NAME: "DSA261 TRACE Forms",
    RESPONSE_SHEET_NAME: "DSA261_TRACE_Evidence",
    YAML_FILE_NAME: "DSA261_variables_COMPLETE.yml",
    ADMIN_REPORT_NAME: "DSA261_W08_W14_Form_Admin_Report.txt",
    COLLECT_EMAIL: true,
    LIMIT_ONE_RESPONSE: true,
    RESET_FORMS: false
  };

  const BASE_FORMS = {
    "week01": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSd_ghgKuqbOPXc63i8ZScNczl6nByxO1Eiwkc83gALH7rbk-A/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLSfu0YQrs2WRh87Zmi6ktEPnX_UVnS-7HAPVOrTbGE_zjgccag/viewform"
    },
    "week02": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSfior2KGMULvspHHSqP5IsYxXHiotiWyuRCt2GlJNVtfpIukg/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLSfnijRL_rE1D-KjjVFOF0mxDZ2Y3McDWekfpeYjD6pPNn6kZA/viewform"
    },
    "week03": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSfkc_3G9JrBCl0QkOIeRzFqX9B9K1o8cwUYZm1zQQ701zdS7w/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLSc9YUJwhI17TpO_N77DeR457618sUyGGCcFlumhcwKEUQLr9Q/viewform"
    },
    "week04": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSf-awOsiwXA2Bvul4WYswRkXicwVQLE7f9RixQgezq-8MrNTA/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLScVwmVs_vqJfOyLg8qTewe53L05HaXdxOdQMw7JQ1ZfmfTwDQ/viewform"
    },
    "week05": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSerNDajZo7LlKG8RtBA5H7-KvKRlsUN-X3xR4pzjENcske96w/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLSdbwzcvHeErHqbYFKrkFZbe12CPXppWkILRW2nlLrMIp1xQ8A/viewform"
    },
    "week06": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSen1q43s5M43sEPm3mVj--tNf6mL_L7A_He_QeHWRLms5LUdg/viewform",
      "task": "https://docs.google.com/forms/d/e/1FAIpQLSci_f1UmQ5rM9jQrBoYz1e6z_ckipIROCaqs9Hj12lZASOnng/viewform"
    },
    "week07": {
      "quiz": "https://docs.google.com/forms/d/e/1FAIpQLSda1FWVK6e8jUYiP0NKAEUdtqmWZCFPG1cD1RT00pdF97sJ7g/viewform",
      "midterm": "https://docs.google.com/forms/d/e/1FAIpQLSdaBTY4sP8qQaDjM-Crld5HQErNTmHl8z0mkUnXZC0kSZXGOA/viewform"
    }
  };

  const RESOURCE_URLS = {
    "teyit_methodology": "https://teyit.org/metodoloji",
    "ted_choose_news": "https://www.ted.com/talks/damon_brown_how_to_choose_your_news",
    "ted_filter_bubbles": "https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles",
    "ico_cambridge_analytica": "https://ico.org.uk/for-the-public/ico-40/cambridge-analytica-raids/",
    "oii_computational_propaganda": "https://www.oii.ox.ac.uk/research/projects/computational-propaganda/",
    "ira_exposure_study": "https://www.nature.com/articles/s41467-022-35576-9",
    "ai_snake_oil_faq": "https://www.aisnakeoil.com/p/faq-about-the-book-and-our-writing",
    "illustrated_transformer": "https://jalammar.github.io/illustrated-transformer/",
    "illustrated_gpt2": "https://jalammar.github.io/illustrated-gpt2/",
    "metr_time_horizon_blog": "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
    "metr_time_horizons": "https://metr.org/time-horizons/",
    "propublica_machine_bias": "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
    "propublica_compas_response": "https://www.propublica.org/article/propublica-responds-to-companys-critique-of-machine-bias-story",
    "openai_prompting": "https://help.openai.com/en/articles/10032626",
    "google_prompting": "https://ai.google.dev/gemini-api/docs/prompting-strategies",
    "anthropic_prompting": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables",
    "lost_in_middle": "https://aclanthology.org/2024.tacl-1.9/",
    "google_long_context": "https://ai.google.dev/gemini-api/docs/long-context",
    "mata_avianca_order": "https://docs.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/54",
    "aias_site": "https://aiassessmentscale.com/",
    "aias_revised_paper": "https://doi.org/10.53761/rrm4y757",
    "nist_gai_profile": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
    "ap_ai_standards": "https://www.ap.org/standards-around-generative-ai",
    "eu_ai_act_human_oversight": "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14",
    "eu_ai_literacy": "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers"
  };

  const QUIZZES = {
    "week08": {
      "title": "DSA261 — W08 Pre-Class Quiz: Prompt Design Studio",
      "description": "Required preparation: OpenAI, Google, and Anthropic prompting guidance. Focus on provider-independent principles.",
      "confirmation": "Week 8 pre-class quiz submitted.",
      "questions": [
        {
          "title": "Which change most directly improves a weak prompt?",
          "options": [
            "Adding decorative phrases such as 'be brilliant'",
            "Specifying the task, relevant context, constraints, and output criteria",
            "Making every prompt as long as possible",
            "Asking the model to reveal its hidden chain-of-thought"
          ],
          "correct": 1
        },
        {
          "title": "Prompt iteration means:",
          "options": [
            "Keeping the first prompt unchanged",
            "Reviewing an output and revising the prompt based on observed weaknesses",
            "Switching models after every response",
            "Adding random detail until the answer becomes longer"
          ],
          "correct": 1
        },
        {
          "title": "Which request is most appropriate for inspectable reasoning?",
          "options": [
            "Reveal your private chain-of-thought",
            "Provide a concise rationale, assumptions, and a checklist I can inspect",
            "Never explain any assumptions",
            "Guarantee that the answer is correct"
          ],
          "correct": 1
        },
        {
          "title": "Provider-independent prompting principles are:",
          "options": [
            "Only techniques that use one company's special syntax",
            "Principles such as clarity, context, constraints, and iteration that remain useful across systems",
            "Secret commands that always improve every model",
            "Model names embedded in the prompt"
          ],
          "correct": 1
        },
        {
          "title": "A longer prompt is:",
          "options": [
            "Always better",
            "Always worse",
            "Better only when added instructions serve the task",
            "Equivalent to independent verification"
          ],
          "correct": 2
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week09": {
      "title": "DSA261 — W09 Pre-Class Quiz: Context Drift",
      "description": "Required preparation: Liu et al. (2024), Lost in the Middle, plus Google's long-context guide.",
      "confirmation": "Week 9 pre-class quiz submitted.",
      "questions": [
        {
          "title": "A context window describes primarily:",
          "options": [
            "How much input/context a model can accept in an interaction",
            "How many citations are always correct",
            "The model's training-data cutoff",
            "The number of users in a chat"
          ],
          "correct": 0
        },
        {
          "title": "The 'lost in the middle' finding shows that:",
          "options": [
            "Long-context models always ignore the beginning",
            "Relevant-information position can affect performance in long contexts",
            "Models cannot use long context at all",
            "Only short prompts should ever be used"
          ],
          "correct": 1
        },
        {
          "title": "Context capacity and context utilisation are:",
          "options": [
            "Exactly the same concept",
            "Different: accepting information does not guarantee equally reliable use of it",
            "Unrelated to model output",
            "Only relevant to image models"
          ],
          "correct": 1
        },
        {
          "title": "A context brief should primarily preserve:",
          "options": [
            "Every sentence from the old conversation",
            "Goal, known facts, constraints, prior decisions, open questions, and evidence standard",
            "Only the most recent model answer",
            "Only stylistic preferences"
          ],
          "correct": 1
        },
        {
          "title": "One classroom context test can establish:",
          "options": [
            "A universal law for all LLMs",
            "Sensitivity or robustness in the tested task and model",
            "That context position never matters",
            "That more context is always harmful"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week10": {
      "title": "DSA261 — W10 Pre-Class Quiz: Hallucination Hunt",
      "description": "Required preparation: Mata v. Avianca sanctions order. Focus on verification and professional gatekeeping.",
      "confirmation": "Week 10 pre-class quiz submitted.",
      "questions": [
        {
          "title": "In Mata v. Avianca, the central professional failure involved:",
          "options": [
            "Using any AI tool at all",
            "Submitting nonexistent authorities and failing the gatekeeping duty to verify them",
            "Writing a brief on a computer",
            "Using an online legal database"
          ],
          "correct": 1
        },
        {
          "title": "A realistic-looking citation is:",
          "options": [
            "Independent evidence by appearance alone",
            "Verified once a model says it is real",
            "A lead that still requires existence and claim-match checks",
            "Automatically trustworthy if it has a DOI"
          ],
          "correct": 2
        },
        {
          "title": "A real source that does not support the claim attributed to it is best classified as:",
          "options": [
            "Fabrication",
            "Source distortion or claim-source mismatch",
            "Independent verification",
            "Proof of causation"
          ],
          "correct": 1
        },
        {
          "title": "The first step in citation verification is to check:",
          "options": [
            "Whether the citation looks professional",
            "Whether the source actually exists and can be identified",
            "Whether the model is confident",
            "Whether the answer is long"
          ],
          "correct": 1
        },
        {
          "title": "Fluent model output is:",
          "options": [
            "A reliability metric",
            "A useful style feature but not evidence of truth",
            "Equivalent to primary evidence",
            "Proof that citations were checked"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week11": {
      "title": "DSA261 — W11 Pre-Class Quiz: Academic Integrity and AI-Use Judgment",
      "description": "Required preparation: AI Assessment Scale and the DSA261 AI Use Policy.",
      "confirmation": "Week 11 pre-class quiz submitted.",
      "questions": [
        {
          "title": "The AI Assessment Scale is best understood as:",
          "options": [
            "A ranking in which more AI is always better",
            "A framework for aligning AI involvement with assessment purpose",
            "A plagiarism detector",
            "A model-performance benchmark"
          ],
          "correct": 1
        },
        {
          "title": "Which statement best matches DSA261's AI policy?",
          "options": [
            "AI use transfers responsibility to the tool",
            "AI use may be permitted, but verification and responsibility remain with the student",
            "Any disclosed AI output becomes verified evidence",
            "AI is prohibited in all assessed work"
          ],
          "correct": 1
        },
        {
          "title": "If unrestricted AI use would prevent a student from demonstrating the target skill, the best response is to:",
          "options": [
            "Ignore the learning objective",
            "Set a more restrictive AI-use boundary for that assessment",
            "Allow all AI use and grade only prose style",
            "Require hidden chain-of-thought"
          ],
          "correct": 1
        },
        {
          "title": "The action MODIFY means:",
          "options": [
            "Submit AI output unchanged",
            "Use a useful contribution but revise it because it is incomplete, inaccurate, poorly fitted, or insufficiently yours",
            "Hide AI use",
            "Reject all AI tools"
          ],
          "correct": 1
        },
        {
          "title": "AI-use disclosure is most useful when it:",
          "options": [
            "Replaces verification",
            "Makes material AI contribution and process transparent",
            "Guarantees correctness",
            "Lists every technology used on the internet"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week12": {
      "title": "DSA261 — W12 Pre-Class Quiz: Context-Specific AI Guidelines",
      "description": "Required preparation: NIST Generative AI Profile and Associated Press generative AI standards.",
      "confirmation": "Week 12 pre-class quiz submitted.",
      "questions": [
        {
          "title": "NIST's Generative AI Profile is designed as:",
          "options": [
            "A profession-specific journalism code",
            "A cross-sector companion to the AI Risk Management Framework",
            "A university plagiarism policy",
            "A list of prohibited prompts"
          ],
          "correct": 1
        },
        {
          "title": "AP's AI standards are useful in this week because they:",
          "options": [
            "Show how broad principles become profession-specific operating rules",
            "Prove that one policy fits every profession",
            "Remove the need for human judgment",
            "Treat AI output as verified source material"
          ],
          "correct": 0
        },
        {
          "title": "Which factor can legitimately change an AI-use rule?",
          "options": [
            "Confidentiality and consequence of error",
            "Only the model brand",
            "Font size",
            "Whether the output sounds confident"
          ],
          "correct": 0
        },
        {
          "title": "A strong verification threshold should be:",
          "options": [
            "Identical for every task",
            "Matched to stakes, context, and consequence of error",
            "Lower when the answer sounds fluent",
            "Replaced by disclosure"
          ],
          "correct": 1
        },
        {
          "title": "Final Project Gate 1 requires:",
          "options": [
            "One generic essay topic",
            "Three authentic discipline-specific task candidates with risk and verification plans",
            "A finished final project",
            "No AI use"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week13": {
      "title": "DSA261 — W13 Pre-Class Quiz: Professional Accountability",
      "description": "Required preparation: EU AI Act human-oversight material and European Commission AI literacy guidance.",
      "confirmation": "Week 13 pre-class quiz submitted.",
      "questions": [
        {
          "title": "Meaningful human oversight requires more than:",
          "options": [
            "A human being nominally present",
            "Understanding system limits",
            "Authority to override output",
            "Ability to seek more evidence"
          ],
          "correct": 0
        },
        {
          "title": "Automation bias refers to:",
          "options": [
            "Automatic rejection of every AI output",
            "Over-reliance on automated recommendations or outputs",
            "A larger context window",
            "A form of prompt formatting"
          ],
          "correct": 1
        },
        {
          "title": "Article 14's human-oversight logic includes the ability to:",
          "options": [
            "Ignore all system limitations",
            "Disregard, override, or intervene when appropriate",
            "Delegate every decision back to the AI",
            "Treat confidence as evidence"
          ],
          "correct": 1
        },
        {
          "title": "A stop condition should ideally be defined:",
          "options": [
            "Only after a serious failure",
            "Before deployment or use, as part of the workflow",
            "By the AI alone",
            "Only for low-risk tasks"
          ],
          "correct": 1
        },
        {
          "title": "Final Project Gate 2 primarily does what?",
          "options": [
            "Introduces a fourth project task",
            "Freezes the task, AI role, probes, verification, evidence, and responsibility plan",
            "Removes verification requirements",
            "Replaces the final project with a quiz"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    },
    "week14": {
      "title": "DSA261 — W14 Pre-Class Quiz: TRACE Transfer and Final Readiness",
      "description": "No new external reading. Review your frozen Final Project contract and strongest TRACE evidence.",
      "confirmation": "Week 14 pre-class quiz submitted.",
      "questions": [
        {
          "title": "The purpose of Week 14 is primarily to test:",
          "options": [
            "Memorisation of provider documentation",
            "Transfer of TRACE to unfamiliar problems",
            "Typing speed",
            "One specific model interface"
          ],
          "correct": 1
        },
        {
          "title": "Which is a missing-step problem?",
          "options": [
            "A strong prompt followed by independent verification",
            "A strong prompt with no verification for a factual claim",
            "A context brief used after a reset",
            "A rejected result documented with reasons"
          ],
          "correct": 1
        },
        {
          "title": "The Final Project requires how many authentic discipline-specific tasks?",
          "options": [
            "One",
            "Two",
            "Three",
            "Five"
          ],
          "correct": 2
        },
        {
          "title": "The Final Project must preserve at least one:",
          "options": [
            "Perfect AI answer",
            "Genuine failure, limitation, or rejected AI contribution",
            "Hidden chain-of-thought",
            "Unverified citation"
          ],
          "correct": 1
        },
        {
          "title": "The Personal AI/LLM Use Charter should be based primarily on:",
          "options": [
            "Generic slogans",
            "Evidence and lessons from the student's course work",
            "One provider's marketing page",
            "The longest prompt used in class"
          ],
          "correct": 1
        }
      ],
      "confidence": "How confident are you that you can apply this week's core distinction before the lab?"
    }
  };

  const TASKS = {
    "week08": {
      "title": "DSA261 — Task 08: Prompt Reconstruction",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 8 task submitted.",
      "fields": [
        "Target task",
        "Weak baseline prompt",
        "Version 1",
        "Version 2",
        "Version 3",
        "What changed between versions",
        "Output-quality criteria",
        "Evidence showing which version performed better",
        "One instruction that did not help",
        "One independently verified element",
        "AI-use disclosure"
      ]
    },
    "week09": {
      "title": "DSA261 — Task 09: Context Stress Test",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 9 task submitted.",
      "fields": [
        "Target task",
        "Compact relevant context",
        "Mixed/expanded context",
        "Introduced irrelevant or conflicting element",
        "Fresh-session context brief",
        "Output differences",
        "Evidence of context drift or robustness",
        "Preferred context strategy + justification",
        "What the test cannot establish",
        "One independently verified output element",
        "AI-use disclosure"
      ]
    },
    "week10": {
      "title": "DSA261 — Task 10: Verification Dossier",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 10 task submitted.",
      "fields": [
        "Original question/task",
        "Original AI output",
        "Five externally checkable claims",
        "Supplied sources/citations",
        "Existence checks",
        "Source-to-claim match checks",
        "Independent verification",
        "Verdict for each claim",
        "Corrected answer",
        "Most dangerous plausible error",
        "AI-use disclosure"
      ]
    },
    "week11": {
      "title": "DSA261 — Task 11: AI-Use Boundary Audit",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 11 task submitted.",
      "fields": [
        "Task 1 objective + AIAS level + boundary",
        "Task 2 objective + AIAS level + boundary",
        "Task 3 objective + AIAS level + boundary",
        "Verification requirements across the three tasks",
        "Disclosure requirements across the three tasks",
        "Use/Modify/Disclose/Reject example",
        "One transferable principle",
        "One context-specific principle",
        "AI-use disclosure"
      ]
    },
    "week12": {
      "title": "DSA261 — Task 12: Final Project Gate 1",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 12 task submitted.",
      "fields": [
        "Candidate Task A",
        "Task A risk + confidentiality + verification plan",
        "Candidate Task B",
        "Task B risk + confidentiality + verification plan",
        "Candidate Task C",
        "Task C risk + confidentiality + verification plan",
        "Evidence-preservation plan",
        "Expected failure mode for each task",
        "Cross-task comparison question",
        "Initial Personal AI/LLM Use Charter idea",
        "AI-use disclosure"
      ]
    },
    "week13": {
      "title": "DSA261 — Task 13: Final Project Design Freeze",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 13 task submitted.",
      "fields": [
        "Gate 1 feedback summary",
        "Frozen Task A contract",
        "Frozen Task B contract",
        "Frozen Task C contract",
        "TRACE probe for each task",
        "Independent verification source for each task",
        "Evidence-capture method",
        "Expected failure case",
        "Stop/override conditions",
        "Cross-task comparison criteria",
        "Verification-cost recording plan",
        "Provisional Charter structure",
        "Unresolved risks/dependencies",
        "AI-use disclosure"
      ]
    },
    "week14": {
      "title": "DSA261 — Task 14: TRACE Transfer Audit",
      "description": "Submit reconstructable process evidence. LLM output is not independent verification evidence.",
      "confirmation": "Week 14 task submitted.",
      "fields": [
        "Unfamiliar transfer case",
        "TRACE step that most changed your judgment",
        "Recurring weakness in your own process",
        "Correction strategy",
        "Final Project Task A readiness",
        "Final Project Task B readiness",
        "Final Project Task C readiness",
        "Unresolved evidence/verification gap",
        "Strongest portfolio artifact + why",
        "Provisional one-sentence Personal AI/LLM Use Charter",
        "AI-use disclosure"
      ]
    }
  };

  const FINAL_PROJECT = {
    "title": "DSA261 — TRACE Final Project Submission",
    "description": "Final Project — 40% of the course grade. Submit evidence for three authentic discipline-specific tasks, cross-task comparison, one genuine failure case, Personal AI/LLM Use Charter, and complete AI-use disclosure.",
    "confirmation": "Final Project submitted.",
    "fields": [
      "Student ID",
      "Task A evidence packet / link",
      "Task B evidence packet / link",
      "Task C evidence packet / link",
      "Cross-task comparison",
      "Genuine failure case",
      "Personal AI/LLM Use Charter",
      "Complete AI-use disclosure",
      "Final evidence packet / Drive link",
      "Student confirmation: all external claims and citations were independently checked to the standard required by the task"
    ]
  };

  function run_() {
    const folder = ensureFolder_(CONFIG.FOLDER_NAME);
    const responseSheet = ensureResponseSpreadsheet_(folder);
    const generated = {};

    Object.keys(QUIZZES).forEach(function(weekKey) {
      const key = "FORM_" + weekKey.toUpperCase() + "_QUIZ_ID";
      const form = getOrCreateQuiz_(key, QUIZZES[weekKey], folder, responseSheet.getId());
      if (!generated[weekKey]) generated[weekKey] = {};
      generated[weekKey].quiz = form.getPublishedUrl();
      generated[weekKey].quizEdit = form.getEditUrl();
    });

    Object.keys(TASKS).forEach(function(weekKey) {
      const key = "FORM_" + weekKey.toUpperCase() + "_TASK_ID";
      const form = getOrCreateTask_(key, TASKS[weekKey], folder, responseSheet.getId());
      if (!generated[weekKey]) generated[weekKey] = {};
      generated[weekKey].task = form.getPublishedUrl();
      generated[weekKey].taskEdit = form.getEditUrl();
    });

    const finalForm = getOrCreateTask_(
      "FORM_FINAL_PROJECT_ID",
      FINAL_PROJECT,
      folder,
      responseSheet.getId()
    );

    generated.final_project = {
      submit: finalForm.getPublishedUrl(),
      submitEdit: finalForm.getEditUrl()
    };

    const yaml = buildCompleteVariablesYaml_(generated);
    const yamlFile = upsertTextFile_(folder, CONFIG.YAML_FILE_NAME, yaml);
    const admin = buildAdminReport_(generated, responseSheet, yamlFile);
    const adminFile = upsertTextFile_(folder, CONFIG.ADMIN_REPORT_NAME, admin);

    Logger.log("============================================================");
    Logger.log("DSA261 W08–W14 STUDENT FORMS CREATED / REUSED");
    Logger.log("============================================================");
    Logger.log("Response spreadsheet: " + responseSheet.getUrl());
    Logger.log("Complete public YAML: " + yamlFile.getUrl());
    Logger.log("Private admin report: " + adminFile.getUrl());
    Logger.log("");
    Logger.log("REPLACE LOCAL _variables.yml WITH:");
    Logger.log("");
    Logger.log(yaml);
  }

  function getOrCreateQuiz_(propertyKey, spec, folder, spreadsheetId) {
    const props = PropertiesService.getScriptProperties();
    const storedId = props.getProperty(propertyKey);

    if (storedId && !CONFIG.RESET_FORMS) {
      try {
        return FormApp.openById(storedId);
      } catch (err) {
        Logger.log("Stored quiz unavailable; creating new: " + propertyKey);
      }
    }

    const form = FormApp.create(spec.title);
    configureCommonForm_(form, spec.description, spec.confirmation, false);
    form.setIsQuiz(true);

    spec.questions.forEach(function(q) {
      const item = form.addMultipleChoiceItem();
      item.setTitle(q.title);
      item.setRequired(true);
      item.setPoints(1);

      const choices = q.options.map(function(option, index) {
        return item.createChoice(option, index === q.correct);
      });
      item.setChoices(choices);
    });

    form.addScaleItem()
      .setTitle(spec.confidence)
      .setBounds(1, 5)
      .setLabels("Not confident", "Very confident")
      .setRequired(true);

    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
    moveDriveFileToFolder_(form.getId(), folder);
    props.setProperty(propertyKey, form.getId());
    return form;
  }

  function getOrCreateTask_(propertyKey, spec, folder, spreadsheetId) {
    const props = PropertiesService.getScriptProperties();
    const storedId = props.getProperty(propertyKey);

    if (storedId && !CONFIG.RESET_FORMS) {
      try {
        return FormApp.openById(storedId);
      } catch (err) {
        Logger.log("Stored task unavailable; creating new: " + propertyKey);
      }
    }

    const form = FormApp.create(spec.title);
    configureCommonForm_(form, spec.description, spec.confirmation, true);

    spec.fields.forEach(function(field) {
      form.addParagraphTextItem()
        .setTitle(field)
        .setRequired(true);
    });

    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
    moveDriveFileToFolder_(form.getId(), folder);
    props.setProperty(propertyKey, form.getId());
    return form;
  }

  function configureCommonForm_(form, description, confirmation, allowEdits) {
    form.setDescription(description);
    form.setCollectEmail(CONFIG.COLLECT_EMAIL);
    form.setLimitOneResponsePerUser(CONFIG.LIMIT_ONE_RESPONSE);
    form.setProgressBar(true);
    form.setShuffleQuestions(false);
    form.setConfirmationMessage(confirmation);
    form.setAllowResponseEdits(allowEdits);
    form.setShowLinkToRespondAgain(false);
    form.setAcceptingResponses(true);
  }

  function ensureFolder_(folderName) {
    const folders = DriveApp.getFoldersByName(folderName);
    return folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
  }

  function ensureResponseSpreadsheet_(folder) {
    const props = PropertiesService.getScriptProperties();
    const storedId = props.getProperty("DSA261_RESPONSE_SPREADSHEET_ID");

    if (storedId) {
      try {
        return SpreadsheetApp.openById(storedId);
      } catch (err) {
        Logger.log("Stored spreadsheet unavailable; creating new.");
      }
    }

    const ss = SpreadsheetApp.create(CONFIG.RESPONSE_SHEET_NAME);
    moveDriveFileToFolder_(ss.getId(), folder);
    props.setProperty("DSA261_RESPONSE_SPREADSHEET_ID", ss.getId());
    return ss;
  }

  function moveDriveFileToFolder_(fileId, folder) {
    DriveApp.getFileById(fileId).moveTo(folder);
  }

  function upsertTextFile_(folder, fileName, content) {
    const files = folder.getFilesByName(fileName);
    if (files.hasNext()) {
      const file = files.next();
      file.setContent(content);
      return file;
    }
    return folder.createFile(fileName, content, MimeType.PLAIN_TEXT);
  }

  function quartoSafeFormUrl_(url) {
    // Prevent Pandoc/Quarto smart punctuation from changing a Form ID that
    // contains two consecutive ASCII hyphens.
    return String(url).replace(/--/g, "%2D%2D");
  }

  function yamlEscape_(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
  }

  function buildCompleteVariablesYaml_(generated) {
    const lines = [];
    lines.push("forms:");

    Object.keys(BASE_FORMS).forEach(function(weekKey) {
      lines.push("  " + weekKey + ":");
      Object.keys(BASE_FORMS[weekKey]).forEach(function(kind) {
        const safe = quartoSafeFormUrl_(BASE_FORMS[weekKey][kind]);
        lines.push('    ' + kind + ': "' + yamlEscape_(safe) + '"');
      });
      lines.push("");
    });

    ["week08","week09","week10","week11","week12","week13","week14"].forEach(function(weekKey) {
      lines.push("  " + weekKey + ":");
      lines.push('    quiz: "' + yamlEscape_(quartoSafeFormUrl_(generated[weekKey].quiz)) + '"');
      lines.push('    task: "' + yamlEscape_(quartoSafeFormUrl_(generated[weekKey].task)) + '"');
      lines.push("");
    });

    lines.push("  final_project:");
    lines.push('    submit: "' + yamlEscape_(quartoSafeFormUrl_(generated.final_project.submit)) + '"');
    lines.push("");
    lines.push("urls:");

    Object.keys(RESOURCE_URLS).forEach(function(key) {
      lines.push('  ' + key + ': "' + yamlEscape_(RESOURCE_URLS[key]) + '"');
    });

    return lines.join("\n") + "\n";
  }

  function buildAdminReport_(generated, responseSheet, yamlFile) {
    const lines = [];
    lines.push("DSA261 W08–W14 FORM ADMIN REPORT");
    lines.push("PRIVATE — DO NOT COMMIT TO PUBLIC GITHUB.");
    lines.push("");
    lines.push("Response spreadsheet: " + responseSheet.getUrl());
    lines.push("Complete public YAML: " + yamlFile.getUrl());

    ["week08","week09","week10","week11","week12","week13","week14"].forEach(function(weekKey) {
      lines.push("");
      lines.push(weekKey.toUpperCase());
      lines.push("Quiz student: " + generated[weekKey].quiz);
      lines.push("Quiz edit:    " + generated[weekKey].quizEdit);
      lines.push("Task student: " + generated[weekKey].task);
      lines.push("Task edit:    " + generated[weekKey].taskEdit);
    });

    lines.push("");
    lines.push("FINAL PROJECT");
    lines.push("Student: " + generated.final_project.submit);
    lines.push("Edit:    " + generated.final_project.submitEdit);

    return lines.join("\n") + "\n";
  }

  return {
    run: run_
  };
})();

/**
 * Run this function from the Apps Script editor.
 */
function createDSA261W08W14Forms() {
  return DSA261_W08_W14.run();
}
