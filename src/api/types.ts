export interface GetKanjiResponse {
  kanji: string
  radicals: string[]
  sentences: string[]
  explanation: string
  examples: string[]
}

/* export interface GetKanjiResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: {
      role: string
      tool_calls: null | unknown
      content: `{
        kanji: string
        radicals: string[]
        sentences: string[]
        explanation: string
        examples: string[]
      }`
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    total_tokens: number
    completion_tokens: number
  }
}
 */
