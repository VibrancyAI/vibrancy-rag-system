"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import Markdown from "react-markdown"
import ReactTypingEffect from "react-typing-effect"
import remarkGfm from "remark-gfm"

import LottieAnimation from "../ui/lottie"

interface MessageData {
  description?: string
  // ... other properties of MessageData ...
}

const roleToBgColorMap = {
  system: "bg-red-50",
  user: "bg-muted",
  function: "bg-green-100",
  assistant: "bg-card",
  data: "dark:bg-blue-950 bg-white",
  tool: "",
}

const Chat = () => {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
    })

  const inputRef = useRef<HTMLInputElement>(null) // Corrected type for useRef
  const lastMessageRef = useCallback(
    (node) => {
      if (node !== null) {
        node.scrollIntoView({ behavior: "smooth" })
      }
    },
    [messages]
  )

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus()
    }
  }, [status])

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col py-4 pb-64">
      <div className="px-4">
        {error != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-shadow relative bg-red-500 px-6 py-4 text-white"
          >
            <span>Error: {error.toString()}</span>
          </motion.div>
        )}

        {messages.map((m, index) => (
          <motion.div
            key={m.id}
            ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`my-2 mb-3 rounded-sm border p-12 py-8 shadow-sm ${
              roleToBgColorMap[m.role]
            }`}
          >
            <h3 className="mb-4 font-bold">Assistant: </h3>
            {m.role !== "data" ? (
              <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
                {m.content}
              </Markdown>
            ) : (
              <>
                {typeof m.data === "object" &&
                m.data !== null &&
                "description" in m.data
                  ? (m.data as MessageData).description
                  : null}
                <br />
                <pre className="mt-6 rounded-md bg-primary p-6 text-sm text-white">
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
          </motion.div>
        ))}

        {status === "in_progress" && (
          <motion.div
            className="my-4 flex h-16 w-full max-w-3xl animate-pulse flex-col items-center justify-center rounded-lg p-2 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // Corrected line
            exit={{ opacity: 0 }}
          >
            <div className="mt-8 flex items-center justify-center">
              <LottieAnimation height={30} width={30} />
            </div>
            {/* <p className="mt-3 text-center">vibrancy is thinking..</p> */}
            <ReactTypingEffect
              className="mt-4"
              speed={20}
              eraseDelay={8000}
              typingDelay={0}
              eraseSpeed={0}
              text={[
                "vibrancy is thinking..",
                "Starting a deep search..",
                "Now analysing data...",
                "Gathering results...",
                "Almost there...",
              ]}
            />
          </motion.div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitMessage()
        }}
        className="fixed bottom-4 mb-8 flex w-full max-w-3xl px-4"
      >
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className=" w-full rounded-l-md border border-border bg-card p-5 shadow-sm outline-none"
          value={input}
          placeholder="Enter your requirements here"
          onChange={handleInputChange}
        />
        <button type="submit" className="rounded-r-md bg-primary px-6 py-4">
          <Send className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Chat
