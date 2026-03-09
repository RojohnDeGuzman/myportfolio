/**
 * FAQ for the portfolio chatbot (RAG knowledge).
 * Questions live in api/faq-questions.json. Answers are saved in api/faq-answers.json
 * when you run:  npm run faq
 * (The script asks you each question and saves your answers.)
 */

import questions from './faq-questions.json'
import answers from './faq-answers.json'

export type FaqEntry = { question: string; answer: string }

const answersList = answers as string[]
const defaultAnswer = "[Your answer – run 'npm run faq' to fill in]"

export const FAQ: FaqEntry[] = (questions as string[]).map((question, i) => ({
  question,
  answer: answersList[i]?.trim() || defaultAnswer,
}))

/**
 * Turns FAQ into RAG chunks. Each chunk is "Q: ... A: ..." so retrieval and model both see the exact Q&A.
 */
export function faqToChunks(): { id: string; section: string; text: string }[] {
  return FAQ.map((entry, i) => ({
    id: `faq-${i + 1}`,
    section: 'faq',
    text: `Common question: ${entry.question} Answer: ${entry.answer}`,
  }))
}
