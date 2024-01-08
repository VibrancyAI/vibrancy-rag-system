import { notFound, redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { Chat } from "@/components/chat/chat"
import { getChat } from "@/app/actions"

export interface ChatPageProps {
  params: { id: string }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
    return
  }

  const chat = await getChat(params.id, user.id)
  if (!chat || chat.userId !== user.id) {
    notFound()
    return
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
