# W01 Google Forms — Setup Checklist

## Current status

The Week 1 Quiz and Task forms have already been created and their **student-facing URLs are configured in `_variables.yml`**.

Keep the Google Forms **edit URLs private**.

## If you need to recreate the forms

### Option A — Generate automatically

1. Open `https://script.google.com/` in the Google account that should own the forms.
2. Create a blank Apps Script project.
3. Paste the contents of `scripts/create_w01_google_forms.gs`.
4. Run `createDSA261W01Forms`.
5. Approve the requested Google Forms permissions.
6. Open **Execution log** and copy the two student URLs.
7. Paste them into `_variables.yml` under `forms.week01.quiz` and `forms.week01.task`.

### Option B — Build manually

Use:

- `W01_Quiz_Schema.md`
- `W01_Task_Schema.md`

The schema files include item type, required status, scoring, options, feedback, and recommended Form settings.

## Recommended manual checks

### Pre-Class Quiz

- Limit to 1 response if institutional accounts permit.
- Release grade immediately after submission.
- Do not expose the response summary to students.
- Keep question order fixed.

### Task 01

- Allow editing until the deadline if desired.
- Send a response copy to students.
- Link responses to a Sheet named `DSA261_TRACE_Evidence`.
- If your Workspace permits File Upload items and you want them, manually replace the screenshot Drive-link question with a File Upload item.

## Response Sheet feedback columns

Add instructor-only columns to the linked Sheet:

- `STATUS` — COMPLETE / REVISE / MISSING
- `FEEDBACK`
- `SEEK`
- `VERIFY`
- `JUDGMENT`
