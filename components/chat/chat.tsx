"use client"

// Import necessary libraries
import React, { useEffect, useRef } from "react"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import LottieAnimation from "../ui/lottie"

// Define the role to background color map

const roleToBgColorMap: Record<Message["role"], string> = {
  system: "bg-red-50", // Example background colors
  user: "bg-neutral-50",
  function: "bg-green-100",
  assistant: "bg-white",
  data: "bg-blue-100",
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
    <div className=" mx-auto flex w-full max-w-3xl flex-col py-4 pb-64">
      <div className="px-4">
        {/* Error display */}
        {error != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-shadow relative  bg-red-500 px-6 py-4 text-white "
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
          >
            <div
              className={`my-2 mb-3   rounded-sm border  p-12 py-8 shadow-sm  ${
                roleToBgColorMap[m.role]
              }`}
            >
              <h3 className="mb-4 font-bold">{`Assistant: `}</h3>
              {m.role !== "data" ? (
                <Markdown
                  className="markdown"
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, children, ...props }) {
                      return (
                        <div className="pb-10">
                          <code {...props}>{children}</code>
                        </div>
                      )
                    },
                  }}
                >
                  {m.content}
                </Markdown>
              ) : (
                <>
                  {(m.data as any).description}
                  <br />
                  <pre className="mt-6 rounded-md bg-primary p-6 text-sm text-white">
                    {JSON.stringify(m.data, null, 2)}
                  </pre>
                </>
              )}
            </div>
          </motion.div>
        ))}

        {/* Loading indicator */}
        {status === "in_progress" && (
          <motion.div
            className="my-4 flex h-16 w-full max-w-3xl animate-pulse flex-col items-center justify-center rounded-lg p-2 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center">
              <LottieAnimation height={30} width={30} />
            </div>
            <p className="mt-3 text-center">Vibrancy is thinking..</p>
          </motion.div>
        )}
      </div>

      {/* Input form */}
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
          className="custom-shadow w-full rounded-l-md border border-gray-300 p-5 outline-none"
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
