import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer({ playing, showButton = true }) {
  const [isMuted, setIsMuted] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current) return
    const message = playing && !isMuted
      ? '{"event":"command","func":"playVideo","args":""}'
      : '{"event":"command","func":"pauseVideo","args":""}'
    
    // Post message to the YouTube iframe
    iframeRef.current.contentWindow.postMessage(message, '*')
  }, [playing, isMuted])

  // Handle direct clicks on mobile where autoplay might be blocked
  const toggleMusic = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <iframe
        id="youtube-player"
        ref={iframeRef}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        src="https://www.youtube.com/embed/iZpZDivj6SU?autoplay=1&enablejsapi=1&loop=1&playlist=iZpZDivj6SU"
        allow="autoplay"
      />
      {playing && showButton && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-[80px] right-4 z-50 w-10 h-10 rounded-full bg-cream shadow-md border border-pink flex items-center justify-center transition-all ${
            !isMuted ? 'animate-[spin_4s_linear_infinite] opacity-80' : 'opacity-100 scale-110'
          }`}
        >
          {isMuted ? (
            <svg className="w-4 h-4 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          ) : (
            <svg className="w-4 h-4 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          )}
        </button>
      )}
    </>
  )
}
