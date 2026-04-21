import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, voice = 'arabic', rate = 1.0, pitch = 1.0 } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 })
    }

    // Using OpenRouter's TTS endpoint with Bark model
    const endpoint = 'https://openrouter.ai/api/v1/audio/speech'
    
    const voiceSettings: Record<string, string> = {
      'arabic': 'arabic',
      'english': 'english',
      'male': 'male_speaker',
      'female': 'female_speaker',
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://termin77-app.netlify.app',
        'X-Title': 'AlKing Dashboard'
      },
      body: JSON.stringify({
        model: 'suno/bark',
        input: text,
        voice: voiceSettings[voice] || 'arabic',
        response_format: 'mp3'
      })
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('TTS Error:', error)
      return NextResponse.json({ 
        error: error.error?.message || error.error || `TTS error: ${response.status}` 
      }, { status: response.status })
    }

    const audioBuffer = await response.arrayBuffer()
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    })

  } catch (error: any) {
    console.error('TTS Error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    provider: 'OpenRouter TTS',
    models: [
      { id: 'suno/bark', name: 'Bark', description: 'نص لكلام عالي الجودة - مجاني!' }
    ],
    voices: [
      { id: 'arabic', name: 'Arabic', description: 'صوت عربي' },
      { id: 'english', name: 'English', description: 'صوت إنجليزي' },
      { id: 'male', name: 'Male', description: 'صوت ذكر' },
      { id: 'female', name: 'Female', description: 'صوت أنثى' }
    ],
    status: 'ready'
  })
}
