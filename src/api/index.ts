import { prompt } from '../constants'
import type { GetKanjiResponse } from './types'

const token = import.meta.env.VITE_API_BEARER_TOKEN

export async function getAssistantResponse(
  message: string
): Promise<GetKanjiResponse> {
  const url = 'https://api.mistral.ai/v1/chat/completions'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const body = {
    model: 'mistral-large-latest',
    n: 2,
    response_format: {
      type: 'json_object'
    },
    messages: [
      {
        role: 'system',
        content: prompt
      },
      {
        role: 'user',
        content: message
      }
    ]
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { choices } = await response.json()
    return JSON.parse(choices[0].message.content)
  } catch (error) {
    console.error('Error fetching assistant response:', error)
    throw error
  }
}
