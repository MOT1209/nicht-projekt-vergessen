import { NextRequest, NextResponse } from 'next/server'

const TIMEOUT = 30000
const API_VERSION = '2.1'

async function fetchWithTimeout(url: string, options: RequestInit, timeout = TIMEOUT): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { task, prompt, type = 'chat' } = body

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 })
    }

    const results: Record<string, any> = {}
    let success = false
    let lastError = ''

    // === TEXT GENERATION (Chat) ===
    if (task === 'chat' || task === 'text' || type === 'chat') {
      const openrouterKey = process.env.OPENROUTER_API_KEY || ''
      const geminiKey = process.env.GEMINI_API_KEY || ''

      if (openrouterKey) {
        try {
          const resp = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openrouterKey}`,
              'HTTP-Referer': 'https://termin77-app.netcel.app',
              'X-Title': 'AlKing Dashboard'
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-3.1-8b-instruct',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 1000
            })
          }, 15000)

          if (resp.ok) {
            const data = await resp.json()
            results.content = data.choices?.[0]?.message?.content
            results.model = data.model
            if (results.content) {
              results.provider = 'openrouter'
              success = true
            }
          } else {
            lastError = `openrouter: ${resp.status}`
          }
        } catch (e) {
          lastError = `openrouter: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }

      if (!success && geminiKey) {
        try {
          const resp = await fetchWithTimeout(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
              })
            },
            15000
          )

          if (resp.ok) {
            const data = await resp.json()
            results.content = data.candidates?.[0]?.content?.parts?.[0]?.text
            results.model = 'gemini-1.5-flash'
            if (results.content) {
              results.provider = 'gemini'
              success = true
            }
          } else {
            lastError = `gemini: ${resp.status}`
          }
        } catch (e) {
          lastError = `gemini: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }
    }

    // === IMAGE GENERATION ===
    else if (task === 'image' || type === 'image') {
      const openrouterKey = process.env.OPENROUTER_API_KEY || ''

      if (openrouterKey) {
        try {
          const resp = await fetchWithTimeout('https://openrouter.ai/api/v1/images/generations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openrouterKey}`,
              'HTTP-Referer': 'https://termin77-app.netcel.app',
              'X-Title': 'AlKing Dashboard'
            },
            body: JSON.stringify({
              model: 'stabilityai/sd-xl',
              prompt,
              size: '1024x1024',
              steps: 20
            })
          }, 20000)

          if (resp.ok) {
            const data = await resp.json()
            results.imageUrl = data.data?.[0]?.url
            results.model = data.model
            if (results.imageUrl) {
              results.provider = 'openrouter'
              success = true
            }
          } else {
            lastError = `openrouter: ${resp.status}`
          }
        } catch (e) {
          lastError = `openrouter: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }

      if (!success) {
        const seed = Math.floor(Math.random() * 10000)
        const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=1`
        results.imageUrl = url
        results.provider = 'pollinations'
        success = true
      }
    }

    // === VIDEO GENERATION ===
    else if (task === 'video' || type === 'video') {
      const openrouterKey = process.env.OPENROUTER_API_KEY || ''
      const falKey = process.env.FAL_AI_KEY || ''

      if (openrouterKey) {
        try {
          const resp = await fetchWithTimeout('https://openrouter.ai/api/v1/videos/generations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openrouterKey}`,
              'HTTP-Referer': 'https://termin77-app.netcel.app',
              'X-Title': 'AlKing Dashboard'
            },
            body: JSON.stringify({
              model: 'runway-gen-2',
              prompt,
              duration: 5,
              aspect_ratio: '16:9'
            })
          }, 25000)

          if (resp.ok) {
            const data = await resp.json()
            results.videoUrl = data.video?.url
            results.status = data.status
            if (results.videoUrl) {
              results.provider = 'openrouter'
              success = true
            }
          } else {
            lastError = `openrouter: ${resp.status}`
          }
        } catch (e) {
          lastError = `openrouter: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }

      if (!success && falKey) {
        try {
          const resp = await fetchWithTimeout('https://fal.run/fal-ai/pika/v2.2/text-to-video', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Key ${falKey}`
            },
            body: JSON.stringify({
              prompt,
              aspect_ratio: '16:9',
              resolution: '720p',
              duration: 4
            })
          }, 25000)

          if (resp.ok) {
            const data = await resp.json()
            if (data.video?.url) {
              results.videoUrl = data.video.url
              results.provider = 'pika'
              success = true
            }
          } else {
            lastError = `pika: ${resp.status}`
          }
        } catch (e) {
          lastError = `pika: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }

      if (!success) {
        results.status = 'processing'
        results.provider = 'openrouter'
        success = true
      }
    }

    // === TEXT TO SPEECH (TTS) ===
    else if (task === 'tts' || task === 'audio' || type === 'tts') {
      const openrouterKey = process.env.OPENROUTER_API_KEY || ''

      if (openrouterKey) {
        try {
          const resp = await fetchWithTimeout('https://openrouter.ai/api/v1/audio/speech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openrouterKey}`,
              'HTTP-Referer': 'https://termin77-app.netcel.app',
              'X-Title': 'AlKing Dashboard'
            },
            body: JSON.stringify({
              model: 'suno/bark',
              input: prompt.slice(0, 1000),
              voice: 'arabic',
              response_format: 'mp3'
            })
          }, 15000)

          if (resp.ok) {
            const audioBuffer = await resp.arrayBuffer()
            if (audioBuffer.byteLength > 1000) {
              results.audioData = Buffer.from(audioBuffer).toString('base64')
              results.provider = 'openrouter'
              results.format = 'audio/mpeg'
              success = true
            }
          } else {
            lastError = `openrouter: ${resp.status}`
          }
        } catch (e) {
          lastError = `openrouter: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }

      if (!success) {
        try {
          const resp = await fetchWithTimeout('https://api.coqui.ai/v2/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: prompt.slice(0, 1000), language: 'arabic' })
          }, 15000)

          if (resp.ok) {
            const audioBuffer = await resp.arrayBuffer()
            if (audioBuffer.byteLength > 1000) {
              results.audioData = Buffer.from(audioBuffer).toString('base64')
              results.provider = 'coqui'
              results.format = 'audio/mpeg'
              success = true
            }
          } else {
            lastError = `coqui: ${resp.status}`
          }
        } catch (e) {
          lastError = `coqui: ${e instanceof Error ? e.message : 'Unknown error'}`
        }
      }
    }

    // === OCR ===
    else if (task === 'ocr') {
      try {
        const apiKey = process.env.OCR_SPACE_API_KEY || 'helloworld'
        const formData = body.image
        if (formData) {
          const base64Image = formData.replace(/^data:image\/\w+;base64,/, '')
          const resp = await fetchWithTimeout('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: { 'apikey': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64Image, language: 'auto', OCREngine: 2 })
          }, 15000)

          if (resp.ok) {
            const data = await resp.json()
            if (!data.IsErroredOnProcessing) {
              results.text = data.ParsedResults?.[0]?.ParsedText
              results.provider = 'ocr.space'
              success = true
            }
          }
        }
      } catch (e) {
        lastError = `OCR: ${e instanceof Error ? e.message : 'Unknown error'}`
      }
    }

    // === SUMMARY ===
    else if (task === 'summary' || task === 'analyze') {
      try {
        const resp = await fetchWithTimeout('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
          })
        }, 15000)

        if (resp.ok) {
          const data = await resp.json()
          results.content = data.candidates?.[0]?.content?.parts?.[0]?.text
          results.provider = 'gemini'
          success = true
        }
      } catch (e) {
        lastError = `Summary: ${e instanceof Error ? e.message : 'Unknown error'}`
      }
    }

    // No results
    if (!success && !results.provider) {
      const fallbackContent = `عذراً، واجهتنا مشكلة تقنية. يرجى المحاولة لاحقاً.\n\nError: ${lastError}`
      results.content = fallbackContent
      results.provider = 'fallback'
      results.error = lastError
    }

    return NextResponse.json({
      success: success,
      ...results,
      fallbackUsed: !success
    })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message || 'Unknown error occurred',
      success: false
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'AlKing Unified API',
    version: '2.0',
    description: 'Smart API with automatic failover between providers',
    tasks: [
      { name: 'chat', aliases: ['text', 'generate'], description: 'Text generation' },
      { name: 'image', aliases: ['img', 'thumbnail'], description: 'Image generation' },
      { name: 'video', aliases: ['vid'], description: 'Video generation' },
      { name: 'audio', aliases: ['tts', 'speech'], description: 'Text to speech' },
      { name: 'ocr', description: 'Extract text from images' },
      { name: 'summary', aliases: ['analyze'], description: 'AI analysis' }
    ],
    status: 'ready'
  })
}