import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

const Logo = () => {
  const { resolvedTheme } = useTheme()

  // Determine which logo to display based on the resolved theme
  const logoSrc =
    resolvedTheme === "dark"
      ? "/images/logo-light.svg"
      : "/images/logo-dark.svg"

  return (
    <div className="ml-4 mr-4">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src={logoSrc}
          width={150}
          height={30}
          alt="Theme based logo"
          className="fill-white"
        />
      </Link>
    </div>
  )
}

export default Logo
