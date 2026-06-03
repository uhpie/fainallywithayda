export default function Overlay() {
  return (
    <img
      src="/overlay.png"
      alt=""
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        pointerEvents: 'none',
        zIndex: 5,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
