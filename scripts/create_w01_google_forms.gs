/**
 * DSA261 — Week 01 Google Forms generator
 *
 * Run in script.google.com while signed in to the Google account that should
 * own the forms. The script creates:
 *   1) W01 Pre-Class Quiz
 *   2) W01 Task 01 — Source Trace
 *
 * After running, copy the printed published URLs into _variables.yml.
 */
function createDSA261W01Forms() {
  const quiz = createW01Quiz_();
  const task = createW01Task_();

  Logger.log('W01 QUIZ — student URL: ' + quiz.getPublishedUrl());
  Logger.log('W01 QUIZ — edit URL: ' + quiz.getEditUrl());
  Logger.log('W01 TASK — student URL: ' + task.getPublishedUrl());
  Logger.log('W01 TASK — edit URL: ' + task.getEditUrl());
  Logger.log('\n_variables.yml snippet:\n' +
    'forms:\n' +
    '  week01:\n' +
    '    quiz: "' + quiz.getPublishedUrl() + '"\n' +
    '    task: "' + task.getPublishedUrl() + '"');
}

function addRequiredText_(form, title, helpText) {
  const item = form.addTextItem().setTitle(title).setRequired(true);
  if (helpText) item.setHelpText(helpText);
  return item;
}

function addRequiredParagraph_(form, title, helpText) {
  const item = form.addParagraphTextItem().setTitle(title).setRequired(true);
  if (helpText) item.setHelpText(helpText);
  return item;
}

function addQuizMC_(form, title, options, correctIndex, feedback) {
  const item = form.addMultipleChoiceItem().setTitle(title).setRequired(true).setPoints(1);
  item.setChoices(options.map((opt, i) => item.createChoice(opt, i === correctIndex)));
  if (feedback) {
    const fb = FormApp.createFeedback().setText(feedback).build();
    item.setFeedbackForCorrect(fb).setFeedbackForIncorrect(fb);
  }
  return item;
}

function createW01Quiz_() {
  const form = FormApp.create('DSA261 — W01 Pre-Class Quiz: How Do You Know?');
  form.setDescription(
    'Complete before class. Preparation: Damon Brown, “How to choose your news” and selected sections of Teyit methodology. Estimated time: 5–7 minutes.'
  );
  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage('Submitted. Bring your reasoning—not only your score—to the TRACE Lab.');

  addRequiredText_(form, 'Student ID');

  addQuizMC_(form,
    'Which statement best distinguishes a claim from evidence?',
    [
      'A claim is any statement published by a reliable institution; evidence is any link attached to it.',
      'A claim is what is being asserted; evidence is information that can support, contradict, or qualify that assertion.',
      'Claims are subjective; evidence is always objective.',
      'A claim becomes evidence when many websites repeat it.'
    ], 1,
    'Repetition does not transform a claim into independent evidence.'
  );

  addQuizMC_(form,
    'You find the same statistic on eight news websites. All eight cite the same unnamed “recent study.” What is the strongest next step?',
    [
      'Treat eight websites as eight independent confirmations.',
      'Search for the earliest article and stop there.',
      'Identify and inspect the original study, dataset, report, or institution behind the statistic.',
      'Ask an LLM whether the statistic sounds plausible.'
    ], 2,
    'Multiple pages can reproduce the same unsupported source. Trace the claim toward original evidence.'
  );

  addQuizMC_(form,
    'Which action best represents “leaving the page” when evaluating an unfamiliar source?',
    [
      'Read the site’s About page more carefully.',
      'Open new tabs and search independently for the organisation, author, claim, and external assessments.',
      'Count how many images the page contains.',
      'Ask the site’s chatbot whether the site is reliable.'
    ], 1,
    'Independent investigation reduces reliance on a source’s self-description.'
  );

  addQuizMC_(form,
    'Which claim is most clearly verifiable using public evidence?',
    [
      'The minister secretly dislikes this policy.',
      'Everyone at the meeting felt uncomfortable.',
      'This video was recorded in Ankara on 10 September 2026.',
      'The author wrote the article with bad intentions.'
    ], 2,
    'Date/location/media claims can leave public, inspectable traces; private intentions usually cannot.'
  );

  addQuizMC_(form,
    'An LLM gives you a confident answer and cites three sources. How should those citations be treated before you independently check them?',
    [
      'Verified evidence because the model provided citations.',
      'Potential leads that still require external verification.',
      'Primary sources by definition.',
      'Reliable if the titles look academic.'
    ], 1,
    'LLM citations are leads until externally verified.'
  );

  form.addScaleItem()
    .setTitle('How confident are you that you can verify an unfamiliar online claim?')
    .setBounds(1, 5)
    .setLabels('1 — Not confident', '5 — Very confident')
    .setRequired(true);

  addRequiredParagraph_(form,
    'Think of one claim you encountered recently. In 1–2 sentences, what would your first verification step be?',
    'Diagnostic item; there is no single automatically scored answer.'
  );

  return form;
}

function createW01Task_() {
  const form = FormApp.create('DSA261 — Task 01: Source Trace');
  form.setDescription(
    'Choose one verifiable digital claim that you personally encountered during the last seven days. Reconstruct how you moved from first impression to a defensible judgment. AI use is permitted for planning/query generation, but AI output is not independent verification evidence.'
  );
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setConfirmationMessage('Task 01 submitted. Keep your original evidence until feedback is complete.');

  form.addPageBreakItem().setTitle('Identity and provenance');
  addRequiredText_(form, 'Student ID');

  const encountered = form.addMultipleChoiceItem().setTitle('Where did you personally encounter the claim?').setRequired(true);
  encountered.setChoiceValues([
    'Social media feed', 'Messaging group / direct message', 'News website',
    'Search result', 'Video platform', 'LLM / AI tool', 'Other'
  ]);

  addRequiredText_(form, 'Original claim URL or NO URL', 'If there is no stable URL, write NO URL and provide a Drive link/screenshot in the next item.');
  addRequiredText_(form, 'Original artifact / screenshot Drive link', 'Paste a viewable Drive link or write NOT NEEDED when the stable original URL is sufficient.');

  form.addPageBreakItem().setTitle('Predict');
  addRequiredParagraph_(form, 'State the claim in one precise sentence.', 'Separate the testable claim from commentary or opinion.');

  const confidence = form.addListItem().setTitle('Initial confidence (0–100)').setRequired(true);
  confidence.setChoiceValues(['0','10','20','30','40','50','60','70','80','90','100']);

  const signal = form.addMultipleChoiceItem().setTitle('What was the strongest signal behind your initial judgment?').setRequired(true);
  signal.setChoiceValues([
    'Source/reputation','Number of shares/likes','Familiarity with the topic','Photo/video',
    'Statistic','Citation/link','Agreement with prior belief','Professional language/tone',
    'Recommendation from someone I trust','Other'
  ]);

  form.addPageBreakItem().setTitle('Probe — search trail');
  addRequiredText_(form, 'Query A — exact phrase or wording search');
  addRequiredText_(form, 'Query B — source-oriented search');
  addRequiredText_(form, 'Query C — evidence-oriented search');
  addRequiredParagraph_(form, 'Which query changed the investigation most, and why?');
  addRequiredText_(form, 'Best candidate for the original/primary source — URL');
  addRequiredParagraph_(form, 'Why do you treat this as closer to the original evidence?');
  addRequiredText_(form, 'Independent evidence source — URL');
  addRequiredParagraph_(form, 'What does the independent evidence support, contradict, or qualify?');
  addRequiredText_(form, 'One search result you rejected — URL or short description');
  addRequiredParagraph_(form, 'Why did you reject it?');

  form.addPageBreakItem().setTitle('Decide and verify');
  const verdict = form.addMultipleChoiceItem().setTitle('Final verdict').setRequired(true);
  verdict.setChoiceValues(['SUPPORTED','CONTRADICTED','UNSUPPORTED','MISSING CONTEXT','UNRESOLVED']);

  const finalConfidence = form.addListItem().setTitle('Final confidence (0–100)').setRequired(true);
  finalConfidence.setChoiceValues(['0','10','20','30','40','50','60','70','80','90','100']);

  addRequiredParagraph_(form, 'What evidence changed—or failed to change—your initial judgment?');
  addRequiredParagraph_(form, 'What remains uncertain?');

  form.addPageBreakItem().setTitle('AI-use disclosure and reflection');
  const aiUsed = form.addMultipleChoiceItem().setTitle('Did you use an AI/LLM tool during this Task?').setRequired(true);
  aiUsed.setChoiceValues(['Yes','No']);
  addRequiredParagraph_(form, 'If yes, what did AI help you do? If no, write NO AI.', 'AI output itself does not count as verification evidence.');
  addRequiredParagraph_(form, 'What decision or judgment remained yours?');
  addRequiredParagraph_(form, 'In no more than 100 words: what did this Task change about how you verify online information?');

  return form;
}
