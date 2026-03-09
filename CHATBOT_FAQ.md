# Chatbot FAQ – answer questions and save for the bot

The portfolio chatbot uses your **saved answers** for common questions. You fill them in once by running an interview script; your answers are stored and used by the bot.

## How to answer and save

1. **Run the FAQ interview** (from the project root):
   ```bash
   npm run faq
   ```
2. The script will **ask you each question** one by one.
3. For each question you can:
   - **Type your answer** and press Enter → that answer is saved.
   - **Press Enter without typing** → keep the current answer (if any).
4. When you finish, answers are written to **`api/faq-answers.json`**.
5. **Commit and push** so the next deployment uses your answers:
   ```bash
   git add api/faq-answers.json
   git commit -m "Update chatbot FAQ answers"
   git push
   ```

No need to edit code by hand. The chat API loads `api/faq-questions.json` and `api/faq-answers.json` at runtime, so after you run `npm run faq` and deploy, the bot uses your wording.

## Files

| File | Purpose |
|------|--------|
| `api/faq-questions.json` | List of questions (do not edit unless adding new questions). |
| `api/faq-answers.json` | Your answers, in the same order. Created/updated by `npm run faq`. |
| `scripts/faq-interview.js` | Script that asks each question and saves answers. |

## Adding more questions later

1. Add a new line to `api/faq-questions.json` (same JSON array format).
2. Add a matching placeholder line to `api/faq-answers.json` (e.g. `""` or a default).
3. Run `npm run faq` again and answer the new question when it appears.
