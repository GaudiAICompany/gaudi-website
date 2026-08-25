"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Square } from "lucide-react"

/**
 * Dictation for the project-notes box, so a GC standing on a site can talk
 * instead of type. Pure progressive enhancement: the Web Speech API is Chrome
 * and Safari only, so the button renders only where it will actually work and
 * the textarea is never worse off without it.
 */
export function VoiceDictation({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  // Read through a ref so restarting recognition never rebinds a stale handler.
  const onTranscriptRef = useRef(onTranscript)
  onTranscriptRef.current = onTranscript

  useEffect(() => {
    const Recognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!Recognition) return

    const recognition = new Recognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = document.documentElement.lang || "en-US"

    recognition.onresult = (event: any) => {
      let text = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) text += event.results[i][0].transcript
      }
      if (text.trim()) onTranscriptRef.current(text.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    setSupported(true)
    return () => {
      recognition.onresult = null
      recognition.onend = null
      recognition.onerror = null
      recognition.stop()
    }
  }, [])

  if (!supported) return null

  const toggle = () => {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      setListening(false)
      return
    }
    try {
      recognition.start()
      setListening(true)
    } catch {
      // start() throws if it is already running; the onend handler resets state.
      setListening(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      aria-label={listening ? "Stop dictating" : "Dictate your notes"}
      title={listening ? "Stop dictating" : "Dictate your notes"}
      className={`inline-flex size-10 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        listening
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {listening ? <Square className="size-4 fill-current" /> : <Mic className="size-4" />}
      {listening && (
        <span className="sr-only" role="status">
          Listening
        </span>
      )}
    </button>
  )
}
