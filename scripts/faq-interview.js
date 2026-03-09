/**
 * FAQ interview: asks you each question and saves your answers to api/faq-answers.json.
 * Run from project root:  node scripts/faq-interview.js
 * (Or:  npm run faq  )
 */

import { readFileSync, writeFileSync } from 'fs'
import { createInterface } from 'readline'
import { join } from 'path'

const apiDir = join(process.cwd(), 'api')
const questionsPath = join(apiDir, 'faq-questions.json')
const answersPath = join(apiDir, 'faq-answers.json')

const questions = JSON.parse(readFileSync(questionsPath, 'utf8'))
let answers = []
try {
  answers = JSON.parse(readFileSync(answersPath, 'utf8'))
} catch {
  answers = questions.map(() => '')
}
if (!Array.isArray(answers) || answers.length !== questions.length) {
  answers = questions.map((_, i) => answers[i] || '')
}

const rl = createInterface({ input: process.stdin, output: process.stdout })

function ask (index) {
  if (index >= questions.length) {
    writeFileSync(answersPath, JSON.stringify(answers, null, 2), 'utf8')
    console.log('\nAll answers saved to api/faq-answers.json')
    rl.close()
    process.exit(0)
    return
  }

  const q = questions[index]
  const cur = answers[index] || ''
  const n = index + 1
  const total = questions.length
  console.log('')
  console.log(`--- Question ${n}/${total} ---`)
  console.log(q)
  if (cur) {
    const preview = cur.length > 80 ? cur.slice(0, 80) + '...' : cur
    console.log(`Current: ${preview}`)
  }
  rl.question('Your answer (Enter = keep current, type new to replace): ', (line) => {
    const trimmed = line.trim()
    if (trimmed) answers[index] = trimmed
    ask(index + 1)
  })
}

console.log('FAQ answers will be saved to api/faq-answers.json')
console.log('Press Enter to keep the current answer, or type a new answer and press Enter.')
ask(0)
