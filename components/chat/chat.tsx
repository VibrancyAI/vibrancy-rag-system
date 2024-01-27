"use client"

// Import necessary libraries
import React, { useEffect, useRef } from "react"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import LottieAnimation from "../ui/lottie"

// Define the role to background color map

const roleToBgColorMap: Record<Message["role"], string> = {
  system: "bg-red-50", // Example background colors
  user: "bg-yellow-400/10",
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
            className="custom-shadow relative rounded-2xl bg-red-500 px-6 py-4 text-white "
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
            className="rounded-2xl bg-white"
          >
            <div
              className={`my-2 mb-3  rounded-2xl border bg-white p-12 py-8 shadow-sm  ${
                roleToBgColorMap[m.role]
              }`}
            >
              <h3 className="mb-4 font-bold">{`FreeBee: `}</h3>
              {m.role !== "data" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="markdown"
                  rehypePlugins={[rehypeRaw]}
                >
                  {m.content}
                </ReactMarkdown>
              ) : (
                <>
                  {(m.data as any).description}
                  <br />
                  <pre className="bg-gray-200">
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
            className=" my-4 h-16 w-full max-w-3xl animate-pulse rounded-lg p-2 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="ml-[35%] flex pt-8">
              <p className="mt-3">FreeBee is going deep..</p>
              <LottieAnimation height={50} width={50} />
            </div>
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
