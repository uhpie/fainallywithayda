import { useState, useEffect, useRef } from 'react'

export default function useInView() {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // In the tab layout the content container scrolls independently of the
    // viewport, so standard IntersectionObserver (root=viewport) fires
    // immediately for all elements. Trigger on a short rAF delay so each
    // section still gets its slide-up entrance.
    const frame = requestAnimationFrame(() => {
      setTimeout(() => setIsInView(true), 80)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return [ref, isInView]
}
