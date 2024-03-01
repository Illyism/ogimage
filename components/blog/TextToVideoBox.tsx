"use client"

import { useState } from "react"

export default function TextToVideoBox({
    title,
    }: {
    title?: string
}) {
  const [text, setText] = useState('')

  // redirect to https://www.typeframes.com/tools/text-to-video?input=hi
  const baseUrl = 'https://www.typeframes.com/tools/text-to-video?input='
  const encodeText = encodeURIComponent(text)
    const url = `${baseUrl}${encodeText}`

    
  return (
    <div
      className="not-prose mx-4 rounded-xl border border-yellow-500 bg-black/10 p-6 shadow-sm sm:text-center text-base relative"
    >
        <div className="absolute -left-2 -top-2 bg-yellow-500 text-black font-black text-sm px-2 py-1 rounded-tr-lg rounded-bl-lg uppercase">
            🎁 Free Tool
        </div>
        <b className="font-bold text-2xl mb-2">
            {title ?? 'AI Video Generator'}
        </b>
        <p className="text-sm">
            Try TypeFrames for free, create a video from your text in seconds with AI.
        </p>
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-black/20 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-sm"
            placeholder="Enter your product description, blog post, or any text here to create a video."
        ></textarea>
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-green text-center block rounded-lg w-full border-2 border-white/10 px-3 py-2 font-bold text-black hover:border-white/50"
        >
            Create video
        </a>
        <p className="mt-2 text-yellow-200 text-center">
            Start for free. No signup needed
        </p>
    </div>
  )
}
