/**
 * DSA261 — Weeks 02–07 Google Forms automation
 *
 * Creates:
 *   W02–W06: 5 pre-class quizzes + 5 after-class Tasks
 *   W07:     1 readiness quiz + 1 TRACE Midterm submission form
 *
 * Also creates/reuses:
 *   - One Drive folder: "DSA261 TRACE Forms"
 *   - One response spreadsheet: "DSA261_TRACE_Evidence"
 *   - One complete public `_variables.yml` file containing ONLY student-facing URLs
 *   - One private admin report containing edit URLs + student URLs
 *
 * IMPORTANT:
 * - Run createDSA261W02W07Forms() once.
 * - Re-running is safe: existing forms are reused through Script Properties.
 * - To intentionally create fresh forms, set RESET_FORMS to true once.
 * - Do NOT commit the private admin report to GitHub.
 */

const CONFIG = {
  COURSE: "DSA261",
  FOLDER_NAME: "DSA261 TRACE Forms",
  RESPONSE_SHEET_NAME: "DSA261_TRACE_Evidence",
  YAML_FILE_NAME: "DSA261_variables.yml",
  ADMIN_REPORT_NAME: "DSA261_Form_Admin_Report.txt",

  // If institutional sign-in is available, keep true.
  // Set false before first run if students may not be signed into Google.
  LIMIT_ONE_RESPONSE: true,
  COLLECT_EMAIL: true,

  // Set true ONLY if you intentionally want new duplicate forms.
  RESET_FORMS: false,

  WEEK01: {
    quiz: "https://docs.google.com/forms/d/e/1FAIpQLSd_ghgKuqbOPXc63i8ZScNczl6nByxO1Eiwkc83gALH7rbk-A/viewform",
    task: "https://docs.google.com/forms/d/e/1FAIpQLSfu0YQrs2WRh87Zmi6ktEPnX_UVnS-7HAPVOrTbGE_zjgccag/viewform"
  }
};

const RESOURCE_URLS = {
  teyit_methodology: "https://teyit.org/metodoloji",
  ted_choose_news: "https://www.ted.com/talks/damon_brown_how_to_choose_your_news",
  ted_filter_bubbles: "https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles",
  ico_cambridge_analytica: "https://ico.org.uk/for-the-public/ico-40/cambridge-analytica-raids/",
  oii_computational_propaganda: "https://www.oii.ox.ac.uk/research/projects/computational-propaganda/",
  ira_exposure_study: "https://www.nature.com/articles/s41467-022-35576-9",
  ai_snake_oil_faq: "https://www.aisnakeoil.com/p/faq-about-the-book-and-our-writing",
  illustrated_transformer: "https://jalammar.github.io/illustrated-transformer/",
  illustrated_gpt2: "https://jalammar.github.io/illustrated-gpt2/",
  metr_time_horizon_blog: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
  metr_time_horizons: "https://metr.org/time-horizons/",
  propublica_machine_bias: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing",
  propublica_compas_response: "https://www.propublica.org/article/propublica-responds-to-companys-critique-of-machine-bias-story",
  openai_prompting: "https://help.openai.com/en/articles/10032626",
  google_prompting: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
  anthropic_prompting: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables"
};

const QUIZZES = {
  week02: {
    title: "DSA261 — W02 Pre-Class Quiz: Who Decides What You See?",
    description:
      "Complete before class. Required preparation: Eli Pariser on filter bubbles, the ICO Cambridge Analytica overview, and the Oxford Internet Institute Computational Propaganda project.\n\n" +
      "Purpose: distinguish visibility, targeting, exposure, and demonstrated behavioural effect.",
    confirmation:
      "Quiz submitted. Bring your preparation notes and one digital service you use regularly.",
    questions: [
      {
        title: "Which statement is strongest?",
        options: [
          "Different rankings prove manipulation.",
          "Targeting capability proves persuasion.",
          "Different rankings demonstrate different visibility conditions but require more evidence for effect claims.",
          "A filter bubble means information has been deleted from the internet."
        ],
        correct: 2
      },
      {
        title: "Which sequence best represents the Cambridge Analytica evidence ladder?",
        options: [
          "Persuasion → profiling → data collection",
          "Data collection → profiling → targeting → exposure → effect",
          "Targeting → effect → data collection",
          "Exposure → data collection → profiling"
        ],
        correct: 1
      },
      {
        title: "Computational propaganda can involve:",
        options: [
          "Only human journalists",
          "Bots, fake accounts, trolls, automation, and platform dynamics",
          "Only paid advertising",
          "Only false factual claims"
        ],
        correct: 1
      },
      {
        title: "Evidence that a user saw a message is evidence of:",
        options: ["Exposure", "Persuasion", "Vote change", "Causation"],
        correct: 0
      },
      {
        title: "A responsible visibility audit should:",
        options: [
          "Infer motive from ranking differences",
          "Compare conditions and limit claims to what observations support",
          "Assume the first result is the most truthful",
          "Use only one query"
        ],
        correct: 1
      }
    ],
    confidence:
      "How confident are you that you can distinguish visibility, targeting, exposure, and persuasion before the lab?"
  },

  week03: {
    title: "DSA261 — W03 Pre-Class Quiz: Is This AI?",
    description:
      "Complete before class. Required preparation: AI Snake Oil reading and one real-world AI claim.\n\n" +
      "Purpose: distinguish AI labels from specific, testable capability claims.",
    confirmation:
      "Quiz submitted. Bring one real AI claim with a URL or screenshot.",
    questions: [
      {
        title: "AI is best treated as:",
        options: [
          "One single technology",
          "An umbrella term covering different technologies and applications",
          "A synonym for LLM",
          "Any software with automation"
        ],
        correct: 1
      },
      {
        title: "Predictive AI is primarily used to:",
        options: [
          "Generate plausible text",
          "Predict an outcome or behaviour from data",
          "Store files",
          "Sort information alphabetically"
        ],
        correct: 1
      },
      {
        title: "A marketing claim should first be rewritten as:",
        options: [
          "A moral judgment",
          "An observable and testable function",
          "A longer slogan",
          "A model name"
        ],
        correct: 1
      },
      {
        title: "Which is the strongest evidence of a claimed capability?",
        options: [
          "The vendor says the product is AI-powered",
          "An evaluation that matches the intended task and relevant population",
          "A professional-looking interface",
          "A large number of followers"
        ],
        correct: 1
      },
      {
        title: "Which position best fits the course framing of AI Snake Oil?",
        options: [
          "All AI is useless",
          "All AI is equally reliable",
          "Useful AI and overclaimed AI can coexist",
          "Generative AI is the only important AI"
        ],
        correct: 2
      }
    ],
    confidence:
      "How confident are you that you can translate an AI marketing label into a testable capability claim?"
  },

  week04: {
    title: "DSA261 — W04 Pre-Class Quiz: What Does an LLM Actually Do?",
    description:
      "Complete before class. Required preparation: the high-level and self-attention sections of Jay Alammar's Illustrated Transformer.\n\n" +
      "Purpose: distinguish training, generation, context, and external retrieval/tool use.",
    confirmation:
      "Quiz submitted. Come ready to explain next-token prediction without equations.",
    questions: [
      {
        title: "A language model generates text primarily by:",
        options: [
          "Retrieving a stored sentence verbatim",
          "Predicting subsequent tokens conditional on context",
          "Searching the web by default",
          "Following a fixed script"
        ],
        correct: 1
      },
      {
        title: "Self-attention helps a transformer:",
        options: [
          "Delete earlier tokens",
          "Relate information across positions in the context",
          "Guarantee factual truth",
          "Access private data"
        ],
        correct: 1
      },
      {
        title: "Which distinction is correct?",
        options: [
          "Training and web search are the same process",
          "Generation and external retrieval are different processes",
          "Context is irrelevant after training",
          "Tool use proves that the model stored the tool output during training"
        ],
        correct: 1
      },
      {
        title: "Repeated outputs can differ because:",
        options: [
          "The model has no structure",
          "Generation is probabilistic and context-sensitive",
          "The internet necessarily changed between runs",
          "The prompt has no effect"
        ],
        correct: 1
      },
      {
        title: "A controlled comparison changes:",
        options: [
          "Many variables at once",
          "One relevant variable at a time where possible",
          "The final judgment after seeing the result",
          "Nothing"
        ],
        correct: 1
      }
    ],
    confidence:
      "How confident are you that you can distinguish training, generation, context, and retrieval/tool use?"
  },

  week05: {
    title: "DSA261 — W05 Pre-Class Quiz: Can AI Make You Better?",
    description:
      "Complete before class. Required preparation: METR time-horizon overview and current measurement page.\n\n" +
      "Purpose: interpret capability benchmarks without overgeneralising them.",
    confirmation:
      "Quiz submitted. Bring your answer to: what exactly does the benchmark measure?",
    questions: [
      {
        title: "METR's time-horizon metric is defined using:",
        options: [
          "Number of words generated",
          "Human expert completion time associated with software tasks",
          "Model parameter count",
          "User satisfaction only"
        ],
        correct: 1
      },
      {
        title: "A 50% time horizon refers to:",
        options: [
          "Tasks the AI always completes",
          "Task duration at which predicted success is 50%",
          "50% of all human jobs",
          "Half of the model's context window"
        ],
        correct: 1
      },
      {
        title: "Which is an overgeneralisation?",
        options: [
          "The benchmark suggests progress on the measured software-task suite",
          "The result directly proves AI can autonomously do all professional work of the same duration",
          "Reliability thresholds matter",
          "Task selection matters"
        ],
        correct: 1
      },
      {
        title: "Verification cost means:",
        options: [
          "Subscription price",
          "Effort required to check and correct AI-assisted work",
          "GPU electricity only",
          "Time to write the prompt only"
        ],
        correct: 1
      },
      {
        title: "The course proposition 'AI access ≠ AI capability' means:",
        options: [
          "Models do not matter",
          "User, task, prompt/context, and verification also shape outcomes",
          "Only experts can use AI",
          "AI never improves performance"
        ],
        correct: 1
      }
    ],
    confidence:
      "How confident are you that you can separate a benchmark result from a broader claim about real-world capability?"
  },

  week06: {
    title: "DSA261 — W06 Pre-Class Quiz: When Algorithms Decide About People",
    description:
      "Complete before class. Required preparation: ProPublica's Machine Bias and its response to Northpointe.\n\n" +
      "Purpose: distinguish error types and understand why fairness criteria can conflict.",
    confirmation:
      "Quiz submitted. Come ready to discuss whether one system can be fair under one metric and unfair under another.",
    questions: [
      {
        title: "A false positive occurs when:",
        options: [
          "The system predicts the event and it does not occur",
          "The system predicts no event and the event occurs",
          "The prediction is correct",
          "No score is produced"
        ],
        correct: 0
      },
      {
        title: "Overall accuracy can hide:",
        options: [
          "Nothing important",
          "Different error patterns across groups",
          "The model name",
          "Only formatting problems"
        ],
        correct: 1
      },
      {
        title: "Which statement is most defensible?",
        options: [
          "Fairness has one universally correct metric",
          "Different fairness criteria can conflict",
          "Equal accuracy guarantees equal error rates",
          "Any group difference proves discrimination"
        ],
        correct: 1
      },
      {
        title: "A counterfactual probe changes:",
        options: [
          "One attribute while holding others constant as far as possible",
          "Every attribute simultaneously",
          "Only the explanation",
          "The dataset size"
        ],
        correct: 0
      },
      {
        title: "One counterfactual example can establish:",
        options: [
          "Population-level discrimination",
          "Sensitivity in that tested case",
          "Legal liability",
          "Causal effects in all users"
        ],
        correct: 1
      }
    ],
    confidence:
      "How confident are you that you can distinguish false positives, false negatives, and competing fairness criteria?"
  },

  week07: {
    title: "DSA261 — W07 TRACE Midterm Readiness Quiz",
    description:
      "This is a readiness check, not a content-memory exam.\n\n" +
      "Purpose: verify that you understand the evidence, process, and AI-use rules for the TRACE Midterm Challenge.",
    confirmation:
      "Readiness quiz submitted. Bring your registered case seed and access to your Weeks 1–6 evidence.",
    questions: [
      {
        title: "The Week 7 assessment primarily rewards:",
        options: [
          "Memorisation",
          "Polished prose",
          "Reconstructable evidence and judgment",
          "Model choice"
        ],
        correct: 2
      },
      {
        title: "LLM output counts as independent verification evidence:",
        options: [
          "Always",
          "Only when the model is confident",
          "No; it may be a lead but requires external verification",
          "Only if it contains citations"
        ],
        correct: 2
      },
      {
        title: "The Challenge Code is used to:",
        options: [
          "Randomly change grades",
          "Add an individual investigation constraint",
          "Replace the student's case",
          "Ban AI"
        ],
        correct: 1
      },
      {
        title: "A strong final judgment should:",
        options: [
          "Be stronger than the evidence",
          "Match claim strength to evidence strength",
          "Avoid uncertainty",
          "Ignore rejected results"
        ],
        correct: 1
      },
      {
        title: "Which is required in the Midterm evidence trail?",
        options: [
          "At least one rejected result with justification",
          "No AI use",
          "A five-page essay",
          "One predetermined correct verdict"
        ],
        correct: 0
      }
    ],
    confidence:
      "How confident are you that you understand the evidence and process requirements for the TRACE Midterm Challenge?"
  }
};

const TASKS = {
  week02: {
    title: "DSA261 — Task 02: Algorithmic Visibility Audit",
    description:
      "Choose one non-sensitive information need and compare 2 meaningfully different queries × 2 search/recommendation environments.\n\n" +
      "Important: ranking differences show visibility differences. They do not by themselves prove manipulation or behavioural effect.",
    confirmation:
      "Task 02 submitted. Your evidence should show what changed in visibility and what your small audit cannot establish.",
    sections: [
      {
        title: "Case and conditions",
        fields: [
          ["Information need", "paragraph"],
          ["Query A", "text"],
          ["Query B", "text"],
          ["System 1", "text"],
          ["System 2", "text"]
        ]
      },
      {
        title: "Evidence",
        fields: [
          ["Top five results under each of the four conditions", "paragraph"],
          ["Result overlap and source-type differences", "paragraph"],
          ["Best explanation for the visibility difference", "paragraph"],
          ["One explanation your data do NOT justify", "paragraph"],
          ["Distinguish visibility, targeting, and persuasion in your own words", "paragraph"],
          ["AI-use disclosure", "paragraph"]
        ]
      }
    ]
  },

  week03: {
    title: "DSA261 — Task 03: AI Claim Audit",
    description:
      "Choose one authentic AI claim from a product, organisation, advertisement, news report, or policy document.\n\n" +
      "Translate the label into a testable capability claim and evaluate the evidence.",
    confirmation:
      "Task 03 submitted. The key question is whether the demonstrated function and evidence justify the AI claim.",
    sections: [
      {
        title: "Original claim",
        fields: [
          ["Original AI claim + URL or screenshot link", "paragraph"],
          ["Claimed capability", "paragraph"],
          ["System classification", "text"],
          ["Rewritten testable claim", "paragraph"]
        ]
      },
      {
        title: "Evidence and judgment",
        fields: [
          ["Relevant performance metric", "paragraph"],
          ["Evidence supplied by the claimant/vendor", "paragraph"],
          ["Independent evidence", "paragraph"],
          ["Missing evidence", "paragraph"],
          ["Final judgment", "paragraph"],
          ["AI-use disclosure", "paragraph"]
        ]
      }
    ]
  },

  week04: {
    title: "DSA261 — Task 04: Model Variation Log",
    description:
      "Choose one discipline-relevant, non-sensitive task and run it under at least three controlled conditions.\n\n" +
      "Change one relevant variable at a time where possible.",
    confirmation:
      "Task 04 submitted. Your comparison should distinguish stable features, unstable features, and unsupported conclusions.",
    sections: [
      {
        title: "Experimental setup",
        fields: [
          ["Target task", "paragraph"],
          ["Baseline prompt", "paragraph"],
          ["Condition A", "paragraph"],
          ["Condition B", "paragraph"],
          ["Condition C", "paragraph"],
          ["Exact variable changed", "paragraph"]
        ]
      },
      {
        title: "Interpretation",
        fields: [
          ["Stable features across outputs", "paragraph"],
          ["Unstable features", "paragraph"],
          ["One externally verified element", "paragraph"],
          ["One conclusion the comparison does NOT support", "paragraph"],
          ["AI-use disclosure", "paragraph"]
        ]
      }
    ]
  },

  week05: {
    title: "DSA261 — Task 05: Personal Skill Boost Test",
    description:
      "Choose one authentic, low-risk task from your discipline and compare human/baseline, naive-AI, structured-AI, and verified-AI approaches.",
    confirmation:
      "Task 05 submitted. Your conclusion should identify where AI added capability and where verification added cost.",
    sections: [
      {
        title: "Task and conditions",
        fields: [
          ["Task definition", "paragraph"],
          ["Human/baseline approach", "paragraph"],
          ["Naive-AI approach", "paragraph"],
          ["Structured-AI approach", "paragraph"],
          ["Verified-AI approach", "paragraph"]
        ]
      },
      {
        title: "Evaluation",
        fields: [
          ["Time/effort estimates", "paragraph"],
          ["Quality criteria", "paragraph"],
          ["One error or limitation introduced by AI", "paragraph"],
          ["Verification cost", "paragraph"],
          ["Final skill-boost judgment", "paragraph"],
          ["AI-use disclosure", "paragraph"]
        ]
      }
    ]
  },

  week06: {
    title: "DSA261 — Task 06: Counterfactual Fairness Probe",
    description:
      "Use an instructor-approved synthetic decision scenario. Do not submit sensitive personal data.\n\n" +
      "Change one variable at a time and distinguish case sensitivity from population-level claims.",
    confirmation:
      "Task 06 submitted. Your Week 7 case seed is now registered for provenance.",
    sections: [
      {
        title: "Synthetic decision case",
        fields: [
          ["Synthetic case", "paragraph"],
          ["Original decision/output", "paragraph"],
          ["Counterfactual change 1 + outcome", "paragraph"],
          ["Counterfactual change 2 + outcome", "paragraph"],
          ["Counterfactual change 3 + outcome", "paragraph"]
        ]
      },
      {
        title: "Interpretation and Week 7 provenance",
        fields: [
          ["One substantively legitimate variable", "paragraph"],
          ["One possible proxy variable", "paragraph"],
          ["What this test can establish", "paragraph"],
          ["What this test cannot establish", "paragraph"],
          ["Most important fairness criterion for this context + justification", "paragraph"],
          ["Week 7 case seed registration: describe the candidate digital artifact or decision problem", "paragraph"],
          ["Week 7 case seed URL/screenshot/identifier if available", "paragraph"],
          ["AI-use disclosure", "paragraph"]
        ]
      }
    ]
  },

  week07: {
    title: "DSA261 — W07 TRACE Midterm Challenge Submission",
    description:
      "30% of course grade.\n\n" +
      "Submit a reconstructable TRACE investigation integrating Weeks 1–6. AI use is permitted, but LLM output is not independent verification evidence.\n\n" +
      "Required: provenance, ≥3 search/prompt/interaction variants, ≥2 TRACE probes, external evidence where relevant, ≥1 rejected result, Challenge Code evidence, final judgment, confidence recalibration, and AI-use disclosure.",
    confirmation:
      "TRACE Midterm submitted. Your grade is based on process integrity, evidence, probing, verification, and judgment—not prose polish.",
    sections: [
      {
        title: "A. Case provenance",
        fields: [
          ["Student ID", "text"],
          ["Week 6 case-seed reference", "paragraph"],
          ["Original artifact + provenance", "paragraph"],
          ["Challenge Code", "text"]
        ]
      },
      {
        title: "B. Initial position",
        fields: [
          ["Precise investigable question", "paragraph"],
          ["Initial verdict and confidence (0–100)", "paragraph"],
          ["Strongest initial signal", "paragraph"],
          ["Most important initial uncertainty", "paragraph"]
        ]
      },
      {
        title: "C. Search / interaction log",
        fields: [
          ["Search/prompt/interaction variant 1", "paragraph"],
          ["Search/prompt/interaction variant 2", "paragraph"],
          ["Search/prompt/interaction variant 3", "paragraph"],
          ["Why the variants changed", "paragraph"]
        ]
      },
      {
        title: "D. TRACE probes",
        fields: [
          ["TRACE Probe 1", "paragraph"],
          ["TRACE Probe 2", "paragraph"],
          ["How your Challenge Code was addressed", "paragraph"]
        ]
      },
      {
        title: "E. Evidence",
        fields: [
          ["Primary/original evidence", "paragraph"],
          ["Independent evidence", "paragraph"],
          ["One rejected result + justification", "paragraph"],
          ["Evidence relationships: claimant/vendor vs independent vs unverified lead", "paragraph"]
        ]
      },
      {
        title: "F. Judgment",
        fields: [
          ["Final verdict", "paragraph"],
          ["Final confidence (0–100)", "text"],
          ["Inference boundary: what would be an overclaim?", "paragraph"],
          ["Strongest remaining uncertainty", "paragraph"]
        ]
      },
      {
        title: "G. AI-use disclosure",
        fields: [
          ["AI tool(s) used and purpose", "paragraph"],
          ["Most consequential AI prompt(s)", "paragraph"],
          ["What you independently verified", "paragraph"],
          ["What AI could assist with but could not legitimately decide", "paragraph"],
          ["Evidence packet / Drive link if used", "paragraph"]
        ]
      }
    ]
  }
};


/**
 * MAIN ENTRY POINT
 */
function createDSA261W02W07Forms() {
  const folder = ensureFolder_(CONFIG.FOLDER_NAME);
  const responseSheet = ensureResponseSpreadsheet_(folder);
  const urls = {};

  Object.keys(QUIZZES).forEach(function(weekKey) {
    const spec = QUIZZES[weekKey];
    const propertyKey = "FORM_" + weekKey.toUpperCase() + "_QUIZ_ID";
    const form = getOrCreateQuiz_(propertyKey, spec, folder, responseSheet.getId());

    if (!urls[weekKey]) urls[weekKey] = {};
    urls[weekKey].quiz = form.getPublishedUrl();
    urls[weekKey].quizEdit = form.getEditUrl();
  });

  Object.keys(TASKS).forEach(function(weekKey) {
    const spec = TASKS[weekKey];
    const suffix = weekKey === "week07" ? "MIDTERM" : "TASK";
    const propertyKey = "FORM_" + weekKey.toUpperCase() + "_" + suffix + "_ID";
    const form = getOrCreateTask_(propertyKey, spec, folder, responseSheet.getId());

    if (!urls[weekKey]) urls[weekKey] = {};
    if (weekKey === "week07") {
      urls[weekKey].midterm = form.getPublishedUrl();
      urls[weekKey].midtermEdit = form.getEditUrl();
    } else {
      urls[weekKey].task = form.getPublishedUrl();
      urls[weekKey].taskEdit = form.getEditUrl();
    }
  });

  const yaml = buildFullVariablesYaml_(urls);
  const yamlFile = upsertTextFile_(folder, CONFIG.YAML_FILE_NAME, yaml);

  const adminReport = buildAdminReport_(urls, responseSheet, yamlFile);
  const adminFile = upsertTextFile_(folder, CONFIG.ADMIN_REPORT_NAME, adminReport);

  Logger.log("============================================================");
  Logger.log("DSA261 W02–W07 FORMS CREATED / REUSED");
  Logger.log("============================================================");
  Logger.log("Response spreadsheet: " + responseSheet.getUrl());
  Logger.log("Public YAML file: " + yamlFile.getUrl());
  Logger.log("Private admin report: " + adminFile.getUrl());
  Logger.log("");
  Logger.log("COPY/REPLACE YOUR LOCAL _variables.yml WITH:");
  Logger.log("");
  Logger.log(yaml);
}


/**
 * Reprints URLs/YAML without creating anything new.
 */
function showDSA261GeneratedLinks() {
  const props = PropertiesService.getScriptProperties();
  const urls = {};

  ["week02", "week03", "week04", "week05", "week06", "week07"].forEach(function(weekKey) {
    urls[weekKey] = {};

    const quizId = props.getProperty("FORM_" + weekKey.toUpperCase() + "_QUIZ_ID");
    if (quizId) {
      const quiz = FormApp.openById(quizId);
      urls[weekKey].quiz = quiz.getPublishedUrl();
      urls[weekKey].quizEdit = quiz.getEditUrl();
    }

    if (weekKey === "week07") {
      const midtermId = props.getProperty("FORM_WEEK07_MIDTERM_ID");
      if (midtermId) {
        const midterm = FormApp.openById(midtermId);
        urls[weekKey].midterm = midterm.getPublishedUrl();
        urls[weekKey].midtermEdit = midterm.getEditUrl();
      }
    } else {
      const taskId = props.getProperty("FORM_" + weekKey.toUpperCase() + "_TASK_ID");
      if (taskId) {
        const task = FormApp.openById(taskId);
        urls[weekKey].task = task.getPublishedUrl();
        urls[weekKey].taskEdit = task.getEditUrl();
      }
    }
  });

  Logger.log(buildFullVariablesYaml_(urls));
}


/**
 * Creates or reuses a quiz.
 */
function getOrCreateQuiz_(propertyKey, spec, folder, spreadsheetId) {
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty(propertyKey);

  if (storedId && !CONFIG.RESET_FORMS) {
    try {
      return FormApp.openById(storedId);
    } catch (err) {
      Logger.log("Stored quiz unavailable; creating a new one: " + propertyKey);
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

  const confidenceItem = form.addScaleItem();
  confidenceItem
    .setTitle(spec.confidence)
    .setBounds(1, 5)
    .setLabels("Not confident", "Very confident")
    .setRequired(true);

  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  moveDriveFileToFolder_(form.getId(), folder);

  props.setProperty(propertyKey, form.getId());
  return form;
}


/**
 * Creates or reuses a Task/Midterm form.
 */
function getOrCreateTask_(propertyKey, spec, folder, spreadsheetId) {
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty(propertyKey);

  if (storedId && !CONFIG.RESET_FORMS) {
    try {
      return FormApp.openById(storedId);
    } catch (err) {
      Logger.log("Stored task unavailable; creating a new one: " + propertyKey);
    }
  }

  const form = FormApp.create(spec.title);
  configureCommonForm_(form, spec.description, spec.confirmation, true);

  spec.sections.forEach(function(section) {
    const header = form.addSectionHeaderItem();
    header.setTitle(section.title);

    section.fields.forEach(function(field) {
      addField_(form, field[0], field[1]);
    });
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


function addField_(form, title, type) {
  let item;

  if (type === "text") {
    item = form.addTextItem();
  } else {
    item = form.addParagraphTextItem();
  }

  item.setTitle(title);
  item.setRequired(true);
  return item;
}


function ensureFolder_(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}


function ensureResponseSpreadsheet_(folder) {
  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty("DSA261_RESPONSE_SPREADSHEET_ID");

  if (storedId) {
    try {
      return SpreadsheetApp.openById(storedId);
    } catch (err) {
      Logger.log("Stored response spreadsheet unavailable; creating a new one.");
    }
  }

  const ss = SpreadsheetApp.create(CONFIG.RESPONSE_SHEET_NAME);
  moveDriveFileToFolder_(ss.getId(), folder);
  props.setProperty("DSA261_RESPONSE_SPREADSHEET_ID", ss.getId());
  return ss;
}


function moveDriveFileToFolder_(fileId, folder) {
  const file = DriveApp.getFileById(fileId);
  file.moveTo(folder);
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


function buildFullVariablesYaml_(urls) {
  const lines = [];

  lines.push("forms:");
  lines.push("  week01:");
  lines.push('    quiz: "' + yamlEscape_(CONFIG.WEEK01.quiz) + '"');
  lines.push('    task: "' + yamlEscape_(CONFIG.WEEK01.task) + '"');

  ["week02", "week03", "week04", "week05", "week06", "week07"].forEach(function(weekKey) {
    lines.push("  " + weekKey + ":");

    if (urls[weekKey] && urls[weekKey].quiz) {
      lines.push('    quiz: "' + yamlEscape_(urls[weekKey].quiz) + '"');
    }

    if (weekKey === "week07") {
      if (urls[weekKey] && urls[weekKey].midterm) {
        lines.push('    midterm: "' + yamlEscape_(urls[weekKey].midterm) + '"');
      }
    } else {
      if (urls[weekKey] && urls[weekKey].task) {
        lines.push('    task: "' + yamlEscape_(urls[weekKey].task) + '"');
      }
    }
  });

  lines.push("");
  lines.push("urls:");

  Object.keys(RESOURCE_URLS).forEach(function(key) {
    lines.push('  ' + key + ': "' + yamlEscape_(RESOURCE_URLS[key]) + '"');
  });

  return lines.join("\n") + "\n";
}


function buildAdminReport_(urls, responseSheet, yamlFile) {
  const lines = [];

  lines.push("DSA261 — W02–W07 FORM ADMIN REPORT");
  lines.push("DO NOT COMMIT THIS FILE TO A PUBLIC REPOSITORY.");
  lines.push("");
  lines.push("Response spreadsheet:");
  lines.push(responseSheet.getUrl());
  lines.push("");
  lines.push("Public YAML file:");
  lines.push(yamlFile.getUrl());
  lines.push("");
  lines.push("FORMS");
  lines.push("=====");

  ["week02", "week03", "week04", "week05", "week06", "week07"].forEach(function(weekKey) {
    lines.push("");
    lines.push(weekKey.toUpperCase());

    if (urls[weekKey] && urls[weekKey].quiz) {
      lines.push("Quiz student URL: " + urls[weekKey].quiz);
      lines.push("Quiz edit URL:    " + urls[weekKey].quizEdit);
    }

    if (weekKey === "week07") {
      if (urls[weekKey] && urls[weekKey].midterm) {
        lines.push("Midterm student URL: " + urls[weekKey].midterm);
        lines.push("Midterm edit URL:    " + urls[weekKey].midtermEdit);
      }
    } else {
      if (urls[weekKey] && urls[weekKey].task) {
        lines.push("Task student URL: " + urls[weekKey].task);
        lines.push("Task edit URL:    " + urls[weekKey].taskEdit);
      }
    }
  });

  return lines.join("\n") + "\n";
}


function yamlEscape_(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}
