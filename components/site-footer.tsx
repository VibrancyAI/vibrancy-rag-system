import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              vibrancy
            </a>
            . Powered by Next14, Microsoft Azure and OpenAI . Find out more at{" "}
            <a
              href="https://www.vibrancy.ai/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              vibrancy.ai
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
