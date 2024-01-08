import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ChatHistory } from "@/components/chat/chat-history"
import { Sidebar } from "@/components/chat/sidebar"

export async function SidebarDesktop() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  if (!user?.id) {
    return null
  }

  return (
    <Sidebar className="peer inset-y-0 right-0 z-30 hidden translate-x-full border-l duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={user.id} />
    </Sidebar>
  )
}
