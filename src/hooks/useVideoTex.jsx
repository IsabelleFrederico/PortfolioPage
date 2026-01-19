import { useEffect, useState } from "react"
import * as THREE from "three"

export function useVideoTex(url, options = {}) {
  const {
    loop = true,
    muted = true,
    autoplay = true,
    playsInline = true,
    preload = "auto",
    crossOrigin = "anonymous",
    flipY = false,
    colorSpace = THREE.SRGBColorSpace,
    minFilter = THREE.LinearFilter,
    magFilter = THREE.LinearFilter,
  } = options

  const [state, setState] = useState({ tex: null, video: null, ready: false })

  useEffect(() => {
    if (!url) {
      setState({ tex: null, video: null, ready: false })
      return
    }

    const video = document.createElement("video")

    video.setAttribute("muted", "")
    video.setAttribute("playsinline", "")
    video.setAttribute("preload", preload)
    video.setAttribute("crossorigin", crossOrigin)

    video.muted = muted
    video.playsInline = playsInline
    video.loop = loop
    video.autoplay = autoplay
    video.preload = preload
    video.crossOrigin = crossOrigin

    video.src = new URL(url, window.location.href).toString()

    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = colorSpace
    texture.flipY = flipY
    texture.minFilter = minFilter
    texture.magFilter = magFilter

    setState({ tex: texture, video, ready: false })

    const markReady = () => {
      if (video.readyState >= 2 && video.videoWidth > 0) {
        texture.needsUpdate = true
        setState({ tex: texture, video, ready: true })
      }
    }

    const onError = () => {
      console.warn("Video error", url, video.error)
    }

    video.addEventListener("loadeddata", markReady)
    video.addEventListener("canplay", markReady)
    video.addEventListener("canplaythrough", markReady)
    video.addEventListener("error", onError)

    video.load()
    video.play().catch(() => { })

    const t = setTimeout(() => {
      video.play().catch(() => { })
      markReady()
    }, 300)

    return () => {
      clearTimeout(t)

      video.removeEventListener("loadeddata", markReady)
      video.removeEventListener("canplay", markReady)
      video.removeEventListener("canplaythrough", markReady)
      video.removeEventListener("error", onError)

      video.pause()
      video.removeAttribute("src")
      video.load()

      texture.dispose()
    }
  }, [url])

  return state
}