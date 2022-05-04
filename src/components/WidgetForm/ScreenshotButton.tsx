import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";

type ScreenshotButtonProps = {
  screenshot: string | null
  onScreenshotTook: (value: string | null) => void
}

export function ScreenshotButton({ onScreenshotTook, screenshot }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')
    onScreenshotTook(base64image)

    setIsTakingScreenshot(false)
  }

  const buttonTrashBackground = {
    backgroundImage: `url(${screenshot})`,
    backgroundPosition: 'right bottom',
    backgroundSize: 180
  }

  if(screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={buttonTrashBackground}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-600 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenshot ? (
        <Loading />
      ): (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  )
}