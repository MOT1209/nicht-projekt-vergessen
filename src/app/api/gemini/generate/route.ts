import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt, type = 'script' } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    const systemPrompt = type === 'script' 
      ? "You are a viral content creator. Generate a high-energy video script based on the following topic. Include visual cues in [brackets]." 
      : "You are an expert SEO blogger. Create a long-form, engaging blog post based on the following topic."

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nTopic: ${prompt}` }]
        }]
      })
    })

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    return NextResponse.json({ content })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
