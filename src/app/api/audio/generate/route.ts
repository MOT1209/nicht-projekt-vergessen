import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM', stability = 0.5, similarity = 0.75 } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 })
    }

    // Default to multi-lingual model v2 for better Arabic support!
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2', // Best for Arabic + English
        voice_settings: {
          stability: Number(stability),
          similarity_boost: Number(similarity),
          style: 0.0,
          use_speaker_boost: true
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error }, { status: response.status })
    }

    const audioBuffer = await response.arrayBuffer()
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
