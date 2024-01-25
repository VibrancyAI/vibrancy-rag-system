"use client"

// Import necessary libraries
import React, { useEffect, useRef } from "react"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import ReactMarkdown from "react-markdown"

// Define the role to background color map

const roleToBgColorMap: Record<Message["role"], string> = {
  system: "bg-red-100", // Example background colors
  user: "bg-blue-100",
  function: "bg-green-100",
  assistant: "bg-violet-100",
  data: "bg-orange-100",
  tool: "",
}

// Chat component
const Chat: React.FC = () => {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
    })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus()
    }
  }, [status])

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col py-8 pb-64">
      <div className="px-4">
        {/* Error display */}
        {error != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-shadow relative rounded-2xl bg-red-500 px-6 py-4 text-white"
          >
            <span className="block sm:inline">
              Error: {(error as any).toString()}
            </span>
          </motion.div>
        )}

        {/* Messages display */}
        {messages.map((m: Message) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`custom-shadow my-2 rounded-2xl p-12 py-8 ${
              roleToBgColorMap[m.role]
            }`}
          >
            <h3 className="mb-4">{`${m.role}: `}</h3>
            {m.role !== "data" ? (
              <ReactMarkdown className="prose">{m.content}</ReactMarkdown>
            ) : (
              <>
                {(m.data as any).description}
                <br />
                <pre className="bg-gray-200">
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
          </motion.div>
        ))}

        {/* Loading indicator */}
        {status === "in_progress" && (
          <motion.div
            className="my-4 h-16 w-full max-w-4xl animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitMessage()
        }}
        className="fixed bottom-0 mb-8 flex w-full max-w-4xl px-4"
      >
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="custom-shadow rounded-l-4xl w-full border border-gray-300 p-5 outline-none"
          value={input}
          placeholder="Enter your requirements here"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-r-4xl bg-neutral-500 px-6 py-4"
        >
          <Send className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Chat
