// Reusable SVG floral decoration components
// Pink petals + matcha green leaves

// ─── Primitives ──────────────────────────────────────────────────────────────

function Flower({ cx, cy, r, petal1 = '#F4B0C8', petal2 = '#ED8AAE', center = '#FFF0F5', petals = 5 }) {
  const step = 360 / petals
  return (
    <g transform={`translate(${cx},${cy})`}>
      {Array.from({ length: petals }, (_, i) => i * step).map((a) => (
        <ellipse
          key={a}
          cx={0} cy={-r * 0.52}
          rx={r * 0.36} ry={r * 0.54}
          fill={a < 180 ? petal1 : petal2}
          transform={`rotate(${a})`}
          opacity={0.88}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.3} fill={center} />
      <circle cx={0} cy={0} r={r * 0.14} fill="#FFE08A" opacity={0.8} />
    </g>
  )
}

function Bud({ cx, cy, r = 7, color = '#F4B0C8' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={0} cy={-r * 0.5} rx={r * 0.5} ry={r * 0.7} fill={color} opacity={0.75} />
      <ellipse cx={0} cy={-r * 0.5} rx={r * 0.5} ry={r * 0.7} fill={color} transform="rotate(72)" opacity={0.7} />
      <ellipse cx={0} cy={-r * 0.5} rx={r * 0.5} ry={r * 0.7} fill={color} transform="rotate(-72)" opacity={0.7} />
      <circle cx={0} cy={0} r={r * 0.3} fill="#FFF0F5" opacity={0.9} />
    </g>
  )
}

function Leaf({ cx, cy, w = 12, h = 22, angle = 0, color = '#9CC48A', vein = '#5E8A60' }) {
  const hw = w / 2, hh = h / 2
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
      <path
        d={`M0,${-hh} C${hw},${-hh * 0.25} ${hw},${hh * 0.25} 0,${hh} C${-hw},${hh * 0.25} ${-hw},${-hh * 0.25} 0,${-hh}Z`}
        fill={color} opacity={0.85}
      />
      <line x1={0} y1={-hh * 0.65} x2={0} y2={hh * 0.65} stroke={vein} strokeWidth={0.7} opacity={0.5} />
    </g>
  )
}

function Branch({ d, w = 1.5 }) {
  return <path d={d} stroke="#7A9E7E" strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
}

// ─── FloralTop ────────────────────────────────────────────────────────────────
// Large floral garland for the top of the Cover (420 × 185 viewBox)

export function FloralTop() {
  return (
    <svg viewBox="0 0 420 185" xmlns="http://www.w3.org/2000/svg" className="w-full block">
      {/* ── Branches ─────────────────────── */}
      <Branch d="M210,185 C207,162 204,138 208,105" />
      <Branch d="M208,148 C190,134 158,118 118,95" />
      <Branch d="M208,148 C226,134 258,118 302,95" />
      <Branch d="M118,95 C94,80 62,72 30,62" w={1.2} />
      <Branch d="M302,95 C326,80 358,72 390,62" w={1.2} />
      <Branch d="M165,122 C148,108 130,96 110,78" w={1} />
      <Branch d="M253,122 C270,108 288,96 310,78" w={1} />
      <Branch d="M208,120 C198,105 195,92 200,72" w={0.9} />

      {/* ── Leaves ───────────────────────── */}
      {/* left main */}
      <Leaf cx={155} cy={120} w={13} h={23} angle={-48} />
      <Leaf cx={120} cy={100} w={12} h={21} angle={-62} color="#8BBB78" />
      <Leaf cx={80} cy={82} w={11} h={19} angle={-72} />
      <Leaf cx={32} cy={64} w={10} h={17} angle={-88} color="#8BBB78" />
      <Leaf cx={55} cy={68} w={9} h={16} angle={-80} />
      {/* right main */}
      <Leaf cx={265} cy={120} w={13} h={23} angle={48} />
      <Leaf cx={300} cy={100} w={12} h={21} angle={62} color="#8BBB78" />
      <Leaf cx={340} cy={82} w={11} h={19} angle={72} />
      <Leaf cx={388} cy={64} w={10} h={17} angle={88} color="#8BBB78" />
      <Leaf cx={365} cy={68} w={9} h={16} angle={80} />
      {/* center */}
      <Leaf cx={198} cy={130} w={9} h={17} angle={-18} />
      <Leaf cx={220} cy={130} w={9} h={17} angle={18} />
      <Leaf cx={203} cy={108} w={8} h={14} angle={-5} color="#8BBB78" />
      {/* sub-branch left */}
      <Leaf cx={138} cy={96} w={9} h={16} angle={-58} />
      <Leaf cx={112} cy={80} w={8} h={14} angle={-68} color="#8BBB78" />
      {/* sub-branch right */}
      <Leaf cx={282} cy={96} w={9} h={16} angle={58} />
      <Leaf cx={308} cy={80} w={8} h={14} angle={68} color="#8BBB78" />

      {/* ── Flowers (back → front) ─────── */}
      {/* far edge small */}
      <Bud cx={28} cy={57} r={7} color="#F9C8D8" />
      <Bud cx={392} cy={57} r={7} color="#F9C8D8" />
      {/* small */}
      <Flower cx={55} cy={62} r={10} petal1="#F9C0D4" petal2="#F09AB8" />
      <Flower cx={365} cy={62} r={10} petal1="#F9C0D4" petal2="#F09AB8" />
      <Flower cx={112} cy={72} r={11} petal1="#F4B0C8" petal2="#E888A8" />
      <Flower cx={308} cy={72} r={11} petal1="#F4B0C8" petal2="#E888A8" />
      {/* medium */}
      <Flower cx={155} cy={90} r={15} />
      <Flower cx={265} cy={90} r={15} />
      <Flower cx={80} cy={76} r={13} petal1="#F9C0D4" petal2="#EFA0BE" />
      <Flower cx={340} cy={76} r={13} petal1="#F9C0D4" petal2="#EFA0BE" />
      {/* large */}
      <Flower cx={118} cy={90} r={18} />
      <Flower cx={302} cy={90} r={18} />
      {/* center focal */}
      <Flower cx={210} cy={75} r={24} petal1="#F4A8C4" petal2="#E87099" center="#FFF5F8" />
    </svg>
  )
}

// ─── FloralBottom ─────────────────────────────────────────────────────────────
// Smaller mirrored garland for the bottom of the Cover (420 × 100 viewBox)

export function FloralBottom() {
  return (
    <svg viewBox="0 0 420 100" xmlns="http://www.w3.org/2000/svg" className="w-full block">
      <Branch d="M210,0 C207,18 204,42 208,65" />
      <Branch d="M208,38 C190,52 158,62 118,75" w={1.2} />
      <Branch d="M208,38 C226,52 258,62 302,75" w={1.2} />
      <Branch d="M118,75 C94,82 62,88 30,92" w={1} />
      <Branch d="M302,75 C326,82 358,88 390,92" w={1} />

      <Leaf cx={155} cy={60} w={12} h={21} angle={45} />
      <Leaf cx={265} cy={60} w={12} h={21} angle={-45} />
      <Leaf cx={118} cy={78} w={11} h={19} angle={65} color="#8BBB78" />
      <Leaf cx={302} cy={78} w={11} h={19} angle={-65} color="#8BBB78" />
      <Leaf cx={60} cy={88} w={9} h={16} angle={80} />
      <Leaf cx={360} cy={88} w={9} h={16} angle={-80} />
      <Leaf cx={198} cy={48} w={9} h={16} angle={18} />
      <Leaf cx={220} cy={48} w={9} h={16} angle={-18} />

      <Bud cx={28} cy={93} r={7} color="#F9C8D8" />
      <Bud cx={392} cy={93} r={7} color="#F9C8D8" />
      <Flower cx={55} cy={87} r={10} petal1="#F9C0D4" petal2="#F09AB8" />
      <Flower cx={365} cy={87} r={10} petal1="#F9C0D4" petal2="#F09AB8" />
      <Flower cx={118} cy={72} r={13} />
      <Flower cx={302} cy={72} r={13} />
      <Flower cx={155} cy={58} r={15} />
      <Flower cx={265} cy={58} r={15} />
      <Flower cx={210} cy={48} r={20} petal1="#F4A8C4" petal2="#E87099" center="#FFF5F8" />
    </svg>
  )
}

// ─── FloralDivider ────────────────────────────────────────────────────────────
// Thin divider with a small flower cluster (300 × 50 viewBox)

export function FloralDivider() {
  return (
    <div className="flex justify-center my-2">
      <svg viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg" className="w-64 h-12">
        <line x1={0} y1={25} x2={118} y2={25} stroke="#F4B0C8" strokeWidth={0.8} opacity={0.6} />
        <line x1={182} y1={25} x2={300} y2={25} stroke="#F4B0C8" strokeWidth={0.8} opacity={0.6} />
        <Branch d="M150,42 C148,36 146,30 150,22" w={0.9} />
        <Branch d="M150,34 C144,30 136,28 126,24" w={0.8} />
        <Branch d="M150,34 C156,30 164,28 174,24" w={0.8} />
        <Leaf cx={134} cy={27} w={7} h={13} angle={-55} />
        <Leaf cx={166} cy={27} w={7} h={13} angle={55} />
        <Flower cx={126} cy={21} r={9} petal1="#F9C0D4" petal2="#F09AB8" />
        <Flower cx={174} cy={21} r={9} petal1="#F9C0D4" petal2="#F09AB8" />
        <Flower cx={150} cy={18} r={12} petal1="#F4A8C4" petal2="#E87099" center="#FFF5F8" />
      </svg>
    </div>
  )
}

// ─── FloralCorner ─────────────────────────────────────────────────────────────
// Small corner spray — pass className for positioning & flip transforms

export function FloralCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className={`w-20 h-20 ${className}`}>
      <Branch d="M5,75 C8,55 20,38 42,18" w={1} />
      <Branch d="M5,75 C28,68 50,55 68,35" w={1} />
      <Leaf cx={28} cy={50} w={9} h={16} angle={-60} />
      <Leaf cx={50} cy={38} w={8} h={14} angle={-40} color="#8BBB78" />
      <Leaf cx={62} cy={45} w={8} h={14} angle={55} />
      <Flower cx={42} cy={18} r={10} petal1="#F9C0D4" petal2="#F09AB8" />
      <Flower cx={68} cy={35} r={10} petal1="#F4B0C8" petal2="#E888A8" />
      <Flower cx={52} cy={28} r={13} petal1="#F4A8C4" petal2="#E87099" center="#FFF5F8" />
    </svg>
  )
}
