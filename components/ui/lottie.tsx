"use client"

import Image from "next/image"
import Lottie from "react-lottie-player"

import lottieJson from "../../public/animations/bee.json"

export default function LottieAnimation({ width, height }) {
  return (
    <>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width, height, opacity: 1 }}
        speed={0.5}
      />
    </>
  )
}
