// FloralFrame — persistent floral overlay on every page
// pointer-events: none so nothing is blocked

// ── Primitives ────────────────────────────────────────────────────────────────

function Fl({ cx, cy, r, p1 = '#F4B0C8', p2 = '#ED8AAE', c = '#FFF0F5' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.52} rx={r * 0.36} ry={r * 0.54}
          fill={a < 180 ? p1 : p2} transform={`rotate(${a})`} opacity={0.88} />
      ))}
      <circle cx={0} cy={0} r={r * 0.3} fill={c} />
      <circle cx={0} cy={0} r={r * 0.13} fill="#FFE08A" opacity={0.8} />
    </g>
  )
}

function Lf({ cx, cy, w, h, angle, color = '#9CC48A' }) {
  const hw = w / 2, hh = h / 2
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
      <path d={`M0,${-hh} C${hw},${-hh * 0.25} ${hw},${hh * 0.25} 0,${hh} C${-hw},${hh * 0.25} ${-hw},${-hh * 0.25} 0,${-hh}Z`}
        fill={color} opacity={0.78} />
      <line x1={0} y1={-hh * 0.65} x2={0} y2={hh * 0.65} stroke="#5E8A60" strokeWidth={0.7} opacity={0.45} />
    </g>
  )
}

function Br({ d, w = 1.2 }) {
  return <path d={d} stroke="#7A9E7E" strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
}

// ── Top Arch (pintu gerbang) ──────────────────────────────────────────────────

function TopArch() {
  return (
    <svg
      viewBox="0 0 430 240"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}
    >
      {/* Main arch */}
      <Br d="M 0,240 C 0,130 65,25 215,12 C 365,25 430,130 430,240" w={2} />

      {/* Inner arch */}
      <Br d="M 18,240 C 18,140 72,42 215,28 C 358,42 412,140 412,240" w={1} />

      {/* Sub branches */}
      <Br d="M 215,12 C 212,45 208,80 213,110" w={1.2} />
      <Br d="M 65,70 C 48,58 28,52 8,48" w={1} />
      <Br d="M 365,70 C 382,58 402,52 422,48" w={1} />
      <Br d="M 118,36 C 100,28 76,26 50,30" w={0.9} />
      <Br d="M 312,36 C 330,28 354,26 380,30" w={0.9} />
      <Br d="M 158,20 C 150,35 145,52 150,72" w={0.85} />
      <Br d="M 272,20 C 280,35 285,52 280,72" w={0.85} />
      <Br d="M 90,52 C 78,42 62,38 42,40" w={0.8} />
      <Br d="M 340,52 C 352,42 368,38 388,40" w={0.8} />

      {/* Leaves */}
      <Lf cx={62} cy={68} w={12} h={22} angle={-60} />
      <Lf cx={30} cy={52} w={10} h={18} angle={-78} color="#8BBB78" />
      <Lf cx={8} cy={46} w={9} h={16} angle={-88} />
      <Lf cx={368} cy={68} w={12} h={22} angle={60} />
      <Lf cx={400} cy={52} w={10} h={18} angle={78} color="#8BBB78" />
      <Lf cx={422} cy={46} w={9} h={16} angle={88} />
      <Lf cx={116} cy={34} w={11} h={19} angle={-38} />
      <Lf cx={52} cy={28} w={9} h={17} angle={-52} color="#8BBB78" />
      <Lf cx={314} cy={34} w={11} h={19} angle={38} />
      <Lf cx={378} cy={28} w={9} h={17} angle={52} color="#8BBB78" />
      <Lf cx={152} cy={20} w={9} h={16} angle={-22} />
      <Lf cx={278} cy={20} w={9} h={16} angle={22} />
      <Lf cx={200} cy={65} w={8} h={14} angle={-14} color="#8BBB78" />
      <Lf cx={230} cy={65} w={8} h={14} angle={14} />
      <Lf cx={43} cy={38} w={8} h={14} angle={-65} />
      <Lf cx={387} cy={38} w={8} h={14} angle={65} color="#8BBB78" />

      {/* Flowers – back to front */}
      <Fl cx={8} cy={44} r={8} p1="#F9C8DC" p2="#F0A0C0" />
      <Fl cx={422} cy={44} r={8} p1="#F9C8DC" p2="#F0A0C0" />
      <Fl cx={32} cy={50} r={10} />
      <Fl cx={398} cy={50} r={10} />
      <Fl cx={50} cy={27} r={9} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={380} cy={27} r={9} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={64} cy={65} r={14} />
      <Fl cx={366} cy={65} r={14} />
      <Fl cx={90} cy={48} r={11} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={340} cy={48} r={11} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={118} cy={32} r={13} />
      <Fl cx={312} cy={32} r={13} />
      <Fl cx={152} cy={72} r={12} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={278} cy={72} r={12} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={150} cy={18} r={17} p1="#F4A8C4" p2="#E87099" c="#FFF5F8" />
      <Fl cx={280} cy={18} r={17} p1="#F4A8C4" p2="#E87099" c="#FFF5F8" />
      {/* Center focal */}
      <Fl cx={215} cy={10} r={24} p1="#F4A8C4" p2="#E87099" c="#FFF5F8" />
    </svg>
  )
}

// ── Left Vine ─────────────────────────────────────────────────────────────────

function LeftVine() {
  return (
    <svg style={{ position: 'absolute', top: 210, left: 0, width: 55, height: 320, pointerEvents: 'none' }}>
      <Br d="M 28,0 C 24,50 20,100 24,150 C 20,200 16,250 22,310" w={1.3} />
      <Br d="M 24,45 C 14,40 5,37 0,35" w={0.9} />
      <Br d="M 22,100 C 12,95 4,92 0,90" w={0.9} />
      <Br d="M 23,158 C 13,153 5,150 0,148" w={0.85} />
      <Br d="M 21,215 C 11,210 4,207 0,205" w={0.85} />
      <Br d="M 22,270 C 12,265 4,262 0,260" w={0.8} />
      <Lf cx={12} cy={37} w={9} h={16} angle={-62} color="#8BBB78" />
      <Lf cx={4} cy={50} w={8} h={14} angle={-80} />
      <Lf cx={4} cy={92} w={8} h={15} angle={-78} color="#8BBB78" />
      <Lf cx={3} cy={108} w={7} h={13} angle={-85} />
      <Lf cx={3} cy={150} w={8} h={14} angle={-82} color="#8BBB78" />
      <Lf cx={3} cy={207} w={7} h={13} angle={-80} />
      <Lf cx={3} cy={262} w={7} h={12} angle={-78} color="#8BBB78" />
      <Fl cx={6} cy={35} r={9} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={3} cy={90} r={8} />
      <Fl cx={2} cy={148} r={8} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={2} cy={205} r={7} />
      <Fl cx={2} cy={260} r={7} p1="#F9C0D4" p2="#F09AB8" />
    </svg>
  )
}

// ── Right Vine ────────────────────────────────────────────────────────────────

function RightVine() {
  return (
    <svg style={{ position: 'absolute', top: 210, right: 0, width: 55, height: 320, pointerEvents: 'none' }}>
      <Br d="M 27,0 C 31,50 35,100 31,150 C 35,200 39,250 33,310" w={1.3} />
      <Br d="M 31,45 C 41,40 50,37 55,35" w={0.9} />
      <Br d="M 33,100 C 43,95 51,92 55,90" w={0.9} />
      <Br d="M 32,158 C 42,153 50,150 55,148" w={0.85} />
      <Br d="M 34,215 C 44,210 51,207 55,205" w={0.85} />
      <Br d="M 33,270 C 43,265 51,262 55,260" w={0.8} />
      <Lf cx={43} cy={37} w={9} h={16} angle={62} color="#8BBB78" />
      <Lf cx={51} cy={50} w={8} h={14} angle={80} />
      <Lf cx={51} cy={92} w={8} h={15} angle={78} color="#8BBB78" />
      <Lf cx={52} cy={108} w={7} h={13} angle={85} />
      <Lf cx={52} cy={150} w={8} h={14} angle={82} color="#8BBB78" />
      <Lf cx={52} cy={207} w={7} h={13} angle={80} />
      <Lf cx={52} cy={262} w={7} h={12} angle={78} color="#8BBB78" />
      <Fl cx={49} cy={35} r={9} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={52} cy={90} r={8} />
      <Fl cx={53} cy={148} r={8} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={53} cy={205} r={7} />
      <Fl cx={53} cy={260} r={7} p1="#F9C0D4" p2="#F09AB8" />
    </svg>
  )
}

// ── Bottom Garland ────────────────────────────────────────────────────────────

function BottomGarland({ navHeight }) {
  return (
    <svg
      viewBox="0 0 430 80"
      style={{ position: 'absolute', bottom: navHeight, left: 0, width: '100%', pointerEvents: 'none' }}
    >
      <Br d="M 0,78 C 40,52 85,42 130,55 C 170,65 188,42 215,36 C 242,42 260,65 300,55 C 345,42 390,52 430,78" w={1.4} />
      <Br d="M 215,36 C 213,50 211,62 213,75" w={1} />
      <Br d="M 130,55 C 118,48 105,44 88,46" w={0.85} />
      <Br d="M 300,55 C 312,48 325,44 342,46" w={0.85} />
      <Lf cx={58} cy={58} w={10} h={18} angle={-28} />
      <Lf cx={90} cy={44} w={9} h={16} angle={-45} color="#8BBB78" />
      <Lf cx={172} cy={46} w={8} h={15} angle={18} />
      <Lf cx={258} cy={46} w={8} h={15} angle={-18} color="#8BBB78" />
      <Lf cx={340} cy={44} w={9} h={16} angle={45} />
      <Lf cx={372} cy={58} w={10} h={18} angle={28} color="#8BBB78" />
      <Fl cx={62} cy={52} r={9} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={108} cy={50} r={10} />
      <Fl cx={148} cy={54} r={11} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={215} cy={34} r={15} p1="#F4A8C4" p2="#E87099" c="#FFF5F8" />
      <Fl cx={282} cy={54} r={11} p1="#F9C0D4" p2="#F09AB8" />
      <Fl cx={322} cy={50} r={10} />
      <Fl cx={368} cy={52} r={9} p1="#F9C0D4" p2="#F09AB8" />
    </svg>
  )
}

// ── Scattered floating flowers ────────────────────────────────────────────────

const FLOATERS = [
  { x: '7%',  y: '28%', r: 11, d: '0s',    o: 0.22 },
  { x: '83%', y: '23%', r: 8,  d: '1.2s',  o: 0.18 },
  { x: '87%', y: '52%', r: 10, d: '2.1s',  o: 0.20 },
  { x: '4%',  y: '56%', r: 7,  d: '0.7s',  o: 0.17 },
  { x: '79%', y: '68%', r: 9,  d: '1.8s',  o: 0.19 },
  { x: '11%', y: '74%', r: 6,  d: '2.8s',  o: 0.15 },
  { x: '51%', y: '9%',  r: 7,  d: '1.5s',  o: 0.14 },
  { x: '32%', y: '86%', r: 5,  d: '0.4s',  o: 0.14 },
  { x: '91%', y: '38%', r: 6,  d: '3.2s',  o: 0.15 },
  { x: '2%',  y: '43%', r: 7,  d: '2.4s',  o: 0.15 },
  { x: '64%', y: '30%', r: 8,  d: '1.0s',  o: 0.17 },
  { x: '17%', y: '37%', r: 6,  d: '3.5s',  o: 0.14 },
  { x: '73%', y: '80%', r: 7,  d: '2.0s',  o: 0.16 },
  { x: '41%', y: '67%', r: 5,  d: '1.3s',  o: 0.13 },
  { x: '24%', y: '17%', r: 9,  d: '0.9s',  o: 0.18 },
  { x: '59%', y: '54%', r: 6,  d: '2.7s',  o: 0.14 },
  { x: '47%', y: '41%', r: 5,  d: '1.6s',  o: 0.12 },
  { x: '89%', y: '13%', r: 7,  d: '3.8s',  o: 0.15 },
  { x: '14%', y: '61%', r: 6,  d: '2.2s',  o: 0.14 },
  { x: '37%', y: '29%', r: 7,  d: '0.6s',  o: 0.16 },
  { x: '70%', y: '44%', r: 5,  d: '4.1s',  o: 0.13 },
  { x: '28%', y: '50%', r: 6,  d: '1.9s',  o: 0.13 },
  { x: '55%', y: '75%', r: 7,  d: '3.0s',  o: 0.15 },
  { x: '20%', y: '88%', r: 5,  d: '2.5s',  o: 0.12 },
  { x: '76%', y: '60%', r: 6,  d: '0.3s',  o: 0.14 },
]

function FloatFlower({ x, y, r, d, o }) {
  const sz = r * 2.6
  return (
    <svg viewBox={`0 0 ${sz} ${sz}`} style={{
      position: 'absolute', left: x, top: y,
      width: sz, height: sz, opacity: o,
      animation: 'float 4.5s ease-in-out infinite',
      animationDelay: d, pointerEvents: 'none',
    }}>
      <g transform={`translate(${sz / 2},${sz / 2})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-r * 0.52} rx={r * 0.36} ry={r * 0.54}
            fill={a < 180 ? '#F4B0C8' : '#ED8AAE'} transform={`rotate(${a})`} opacity={0.88} />
        ))}
        <circle cx={0} cy={0} r={r * 0.3} fill="#FFF0F5" />
        <circle cx={0} cy={0} r={r * 0.13} fill="#FFE08A" opacity={0.8} />
      </g>
    </svg>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function FloralFrame({ opened }) {
  const navHeight = opened ? 58 : 0
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      <TopArch />
      <LeftVine />
      <RightVine />
      <BottomGarland navHeight={navHeight} />
      {FLOATERS.map((f, i) => <FloatFlower key={i} {...f} />)}
    </div>
  )
}
