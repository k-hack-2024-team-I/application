import axios from 'axios'

const baseUrl = 'https://suno-api-drab-eta.vercel.app'

async function generateAudioByPrompt(payload: {
  prompt: string
  make_instrumental: boolean
  wait_audio: boolean
}) {
  const url = `${baseUrl}/api/generate`
  const { data } = await axios.post<{ audio_url: string }[]>(url, payload)
  return data
}

export async function generateMusic(mood: string) {
  const [data] = await generateAudioByPrompt({
    prompt: `일기장에 들어갈 음악을 만들어주되, ${mood} 라는 감정에 맞는 분위기의 배경음악을 만들어주세요.`,
    make_instrumental: true,
    wait_audio: true,
  })

  return data
}
