// Elaborate floral frame — pink roses + matcha leaves, all 4 corners + side vines

// ── Primitives ────────────────────────────────────────────────────────────────

// Layered rose (3 layers of petals)
function Rose({ cx, cy, r, c1 = '#F4A8C4', c2 = '#E07098', c3 = '#B83870', ctr = '#FFE8F0' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <ellipse key={`o${a}`} cx={0} cy={-r * .54} rx={r * .32} ry={r * .54}
          fill={c1} transform={`rotate(${a})`} opacity={.80} />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(a => (
        <ellipse key={`m${a}`} cx={0} cy={-r * .34} rx={r * .25} ry={r * .36}
          fill={c2} transform={`rotate(${a})`} opacity={.87} />
      ))}
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={`i${a}`} cx={0} cy={-r * .16} rx={r * .15} ry={r * .21}
          fill={c3} transform={`rotate(${a})`} opacity={.92} />
      ))}
      <circle cx={0} cy={0} r={r * .16} fill={ctr} />
      <circle cx={0} cy={0} r={r * .08} fill="#FFD060" opacity={.82} />
    </g>
  )
}

// Simple 5-petal flower
function F5({ cx, cy, r, c1 = '#F9C0D4', c2 = '#F09AB8', ctr = '#FFF0F8' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx={0} cy={-r * .52} rx={r * .36} ry={r * .54}
          fill={a < 180 ? c1 : c2} transform={`rotate(${a})`} opacity={.88} />
      ))}
      <circle cx={0} cy={0} r={r * .3} fill={ctr} />
      <circle cx={0} cy={0} r={r * .13} fill="#FFD060" opacity={.82} />
    </g>
  )
}

// Small bud with sepal
function Bud({ cx, cy, r = 6, c = '#F4B0C8' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={0} cy={0} rx={r * .5} ry={r * .82} fill={c} opacity={.85} />
      <ellipse cx={0} cy={0} rx={r * .5} ry={r * .82} fill={c} opacity={.75} transform="rotate(55)" />
      <ellipse cx={0} cy={0} rx={r * .5} ry={r * .82} fill={c} opacity={.75} transform="rotate(-55)" />
      <ellipse cx={0} cy={r * .55} rx={r * .32} ry={r * .38} fill="#6A9068" opacity={.75} />
    </g>
  )
}

// Realistic leaf with veins
function Lf({ cx, cy, w, h, angle, fill = '#8BAD78', vein = '#3A6040' }) {
  const hw = w / 2, hh = h / 2
  const d = `M0,${-hh} C${hw * .52},${-hh * .63} ${hw * .9},${-hh * .18} ${hw * .86},${hh * .22} C${hw * .7},${hh * .62} ${hw * .3},${hh * .86} 0,${hh} C${-hw * .3},${hh * .86} ${-hw * .7},${hh * .62} ${-hw * .86},${hh * .22} C${-hw * .9},${-hh * .18} ${-hw * .52},${-hh * .63} 0,${-hh}Z`
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
      <path d={d} fill={fill} opacity={.85} />
      <line x1={0} y1={-hh * .75} x2={0} y2={hh * .78} stroke={vein} strokeWidth={.9} opacity={.38} />
      <line x1={0} y1={-hh * .44} x2={hw * .52} y2={hh * .08} stroke={vein} strokeWidth={.5} opacity={.28} />
      <line x1={0} y1={-hh * .44} x2={-hw * .52} y2={hh * .08} stroke={vein} strokeWidth={.5} opacity={.28} />
      <line x1={0} y1={hh * .12} x2={hw * .46} y2={hh * .58} stroke={vein} strokeWidth={.5} opacity={.28} />
      <line x1={0} y1={hh * .12} x2={-hw * .46} y2={hh * .58} stroke={vein} strokeWidth={.5} opacity={.28} />
    </g>
  )
}

function Br({ d, w = 1.3 }) {
  return <path d={d} stroke="#6A9068" strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={.8} />
}

// ── Corner cluster — radiates from top-left (0,0) ─────────────────────────────
function CornerCluster() {
  return (
    <>
      {/* Main stems */}
      <Br d="M0,0 C12,22 30,50 50,80 C60,96 68,112 70,138" w={1.8} />
      <Br d="M0,0 C15,10 40,15 78,13 C106,12 136,18 160,34" w={1.8} />
      <Br d="M0,0 C6,13 14,27 20,52 C25,68 26,88 23,112" w={1.3} />
      <Br d="M30,52 C44,40 64,34 90,36 C110,38 128,46 146,54" w={1.2} />
      <Br d="M50,80 C64,68 84,62 106,59 C124,57 142,60 158,70" w={1.1} />
      <Br d="M20,52 C33,42 48,36 66,34 C80,32 94,36 106,44" w={1.0} />
      <Br d="M23,112 C34,102 48,96 64,96 C78,96 92,104 104,116" w={.95} />
      <Br d="M70,138 C80,126 94,120 110,118 C124,116 138,122 152,136" w={.95} />
      <Br d="M90,36 C95,26 104,18 114,12 C124,7 134,6 144,10" w={.85} />
      <Br d="M106,44 C114,35 123,28 136,24 C146,21 156,22 164,28" w={.85} />
      <Br d="M104,116 C112,106 124,100 136,98 C148,96 158,100 165,110" w={.8} />

      {/* Dense leaves */}
      <Lf cx={12} cy={24} w={13} h={23} angle={-52} />
      <Lf cx={4} cy={44} w={12} h={21} angle={-72} fill="#7AAA7A" />
      <Lf cx={36} cy={50} w={14} h={25} angle={-33} />
      <Lf cx={56} cy={34} w={13} h={22} angle={-17} fill="#7AAA7A" />
      <Lf cx={76} cy={14} w={12} h={20} angle={3} />
      <Lf cx={104} cy={10} w={11} h={19} angle={8} fill="#7AAA7A" />
      <Lf cx={130} cy={20} w={12} h={20} angle={17} />
      <Lf cx={150} cy={36} w={11} h={18} angle={27} fill="#9CC48A" />
      <Lf cx={162} cy={52} w={10} h={17} angle={34} />
      <Lf cx={60} cy={70} w={15} h={25} angle={-27} fill="#7AAA7A" />
      <Lf cx={84} cy={52} w={13} h={22} angle={-13} />
      <Lf cx={110} cy={48} w={12} h={20} angle={3} fill="#7AAA7A" />
      <Lf cx={134} cy={56} w={11} h={18} angle={13} />
      <Lf cx={154} cy={68} w={10} h={17} angle={23} fill="#9CC48A" />
      <Lf cx={22} cy={84} w={13} h={22} angle={-63} />
      <Lf cx={12} cy={103} w={12} h={20} angle={-75} fill="#7AAA7A" />
      <Lf cx={44} cy={89} w={14} h={23} angle={-43} />
      <Lf cx={70} cy={89} w={13} h={21} angle={-25} fill="#7AAA7A" />
      <Lf cx={94} cy={105} w={12} h={20} angle={-11} />
      <Lf cx={116} cy={117} w={11} h={18} angle={3} fill="#7AAA7A" />
      <Lf cx={22} cy={115} w={11} h={19} angle={-68} />
      <Lf cx={80} cy={127} w={12} h={20} angle={-17} fill="#7AAA7A" />
      <Lf cx={106} cy={121} w={11} h={18} angle={-3} />
      <Lf cx={130} cy={129} w={10} h={17} angle={9} fill="#9CC48A" />
      <Lf cx={146} cy={121} w={10} h={16} angle={17} />
      <Lf cx={162} cy={109} w={9} h={15} angle={27} fill="#7AAA7A" />
      <Lf cx={138} cy={95} w={10} h={17} angle={21} />

      {/* Buds at branch tips */}
      <Bud cx={164} cy={30} r={8} c="#FFD4E8" />
      <Bud cx={146} cy={12} r={7} c="#F9C0D4" />
      <Bud cx={104} cy={118} r={7} c="#FFD4E8" />
      <Bud cx={152} cy={138} r={6} c="#F9C0D4" />
      <Bud cx={162} cy={72} r={6} c="#FFD4E8" />
      <Bud cx={165} cy={112} r={5} c="#F4B0C8" />
      <Bud cx={23} cy={114} r={5} c="#FFD4E8" />

      {/* Flowers — small to large, back to front */}
      <F5 cx={140} cy={24} r={9} c1="#FFD4E8" c2="#F4B0C4" />
      <F5 cx={88} cy={22} r={10} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={156} cy={60} r={8} c1="#FFD4E8" c2="#F4B0C4" />
      <F5 cx={114} cy={42} r={11} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={142} cy={56} r={10} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={140} cy={100} r={10} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={152} cy={140} r={9} c1="#FFD4E8" c2="#F4B0C4" />
      <F5 cx={68} cy={45} r={13} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={42} cy={26} r={12} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={104} cy={118} r={13} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={134} cy={127} r={11} c1="#FFD4E8" c2="#F4A8C4" />
      <Rose cx={32} cy={65} r={22} c1="#F4A8C4" c2="#E07098" c3="#C44878" />
      <Rose cx={73} cy={106} r={20} c1="#FFCCE4" c2="#F4A8C4" c3="#E07098" />
      <Rose cx={114} cy={77} r={18} c1="#F4A8C4" c2="#E07098" c3="#B83870" />
    </>
  )
}

// ── 4 Corners ─────────────────────────────────────────────────────────────────

const CS = 200  // corner SVG size

function TLCorner() {
  return (
    <svg viewBox={`0 0 ${CS} ${CS}`} style={{ position: 'absolute', top: 0, left: 0, width: CS, height: CS, pointerEvents: 'none' }}>
      <CornerCluster />
    </svg>
  )
}
function TRCorner() {
  return (
    <svg viewBox={`0 0 ${CS} ${CS}`} style={{ position: 'absolute', top: 0, right: 0, width: CS, height: CS, pointerEvents: 'none', transform: 'scaleX(-1)' }}>
      <CornerCluster />
    </svg>
  )
}
function BLCorner({ bottom }) {
  return (
    <svg viewBox={`0 0 ${CS} ${CS}`} style={{ position: 'absolute', bottom, left: 0, width: CS, height: CS, pointerEvents: 'none', transform: 'scaleY(-1)' }}>
      <CornerCluster />
    </svg>
  )
}
function BRCorner({ bottom }) {
  return (
    <svg viewBox={`0 0 ${CS} ${CS}`} style={{ position: 'absolute', bottom, right: 0, width: CS, height: CS, pointerEvents: 'none', transform: 'scale(-1,-1)' }}>
      <CornerCluster />
    </svg>
  )
}

// ── Side Vines ────────────────────────────────────────────────────────────────

function LeftVine() {
  return (
    <svg style={{ position: 'absolute', top: 195, left: 0, width: 50, height: 420, pointerEvents: 'none' }}>
      <Br d="M25,0 C22,55 19,110 23,165 C19,215 15,270 21,390" w={1.4} />
      <Br d="M23,50 C13,44 5,40 0,38" w={.9} />
      <Br d="M21,112 C11,106 4,102 0,100" w={.9} />
      <Br d="M22,178 C12,172 5,168 0,166" w={.85} />
      <Br d="M20,244 C11,238 4,234 0,232" w={.85} />
      <Br d="M21,315 C11,309 4,305 0,303" w={.8} />
      <Lf cx={11} cy={40} w={10} h={17} angle={-63} fill="#7AAA7A" />
      <Lf cx={3} cy={54} w={9} h={15} angle={-79} />
      <Lf cx={3} cy={102} w={9} h={16} angle={-81} fill="#7AAA7A" />
      <Lf cx={2} cy={116} w={8} h={14} angle={-86} />
      <Lf cx={3} cy={168} w={9} h={15} angle={-83} fill="#7AAA7A" />
      <Lf cx={2} cy={234} w={8} h={14} angle={-81} />
      <Lf cx={2} cy={305} w={8} h={13} angle={-79} fill="#7AAA7A" />
      <F5 cx={4} cy={38} r={10} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={2} cy={100} r={9} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={2} cy={166} r={9} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={1} cy={232} r={8} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={2} cy={303} r={8} c1="#FFD4E8" c2="#F4A8C4" />
    </svg>
  )
}

function RightVine() {
  return (
    <svg style={{ position: 'absolute', top: 195, right: 0, width: 50, height: 420, pointerEvents: 'none' }}>
      <Br d="M25,0 C28,55 31,110 27,165 C31,215 35,270 29,390" w={1.4} />
      <Br d="M27,50 C37,44 45,40 50,38" w={.9} />
      <Br d="M29,112 C39,106 46,102 50,100" w={.9} />
      <Br d="M28,178 C38,172 45,168 50,166" w={.85} />
      <Br d="M30,244 C39,238 46,234 50,232" w={.85} />
      <Br d="M29,315 C39,309 46,305 50,303" w={.8} />
      <Lf cx={39} cy={40} w={10} h={17} angle={63} fill="#7AAA7A" />
      <Lf cx={47} cy={54} w={9} h={15} angle={79} />
      <Lf cx={47} cy={102} w={9} h={16} angle={81} fill="#7AAA7A" />
      <Lf cx={48} cy={116} w={8} h={14} angle={86} />
      <Lf cx={47} cy={168} w={9} h={15} angle={83} fill="#7AAA7A" />
      <Lf cx={48} cy={234} w={8} h={14} angle={81} />
      <Lf cx={48} cy={305} w={8} h={13} angle={79} fill="#7AAA7A" />
      <F5 cx={46} cy={38} r={10} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={48} cy={100} r={9} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={48} cy={166} r={9} c1="#FFD4E8" c2="#F4A8C4" />
      <F5 cx={49} cy={232} r={8} c1="#F9C0D4" c2="#F098B8" />
      <F5 cx={48} cy={303} r={8} c1="#FFD4E8" c2="#F4A8C4" />
    </svg>
  )
}

// ── Scattered floating flowers ────────────────────────────────────────────────

const FLOATERS = [
  { x: '16%', y: '28%', r: 10, d: '0s',   o: 0.18 },
  { x: '76%', y: '24%', r: 8,  d: '1.4s', o: 0.16 },
  { x: '80%', y: '54%', r: 9,  d: '2.2s', o: 0.17 },
  { x: '12%', y: '57%', r: 7,  d: '0.8s', o: 0.15 },
  { x: '72%', y: '70%', r: 8,  d: '1.9s', o: 0.16 },
  { x: '20%', y: '76%', r: 6,  d: '3.0s', o: 0.14 },
  { x: '48%', y: '12%', r: 7,  d: '1.6s', o: 0.13 },
  { x: '36%', y: '84%', r: 5,  d: '0.5s', o: 0.13 },
  { x: '84%', y: '40%', r: 6,  d: '3.4s', o: 0.14 },
  { x: '9%',  y: '44%', r: 7,  d: '2.5s', o: 0.14 },
  { x: '60%', y: '32%', r: 8,  d: '1.1s', o: 0.15 },
  { x: '28%', y: '38%', r: 5,  d: '3.6s', o: 0.12 },
  { x: '68%', y: '78%', r: 7,  d: '2.1s', o: 0.14 },
  { x: '44%', y: '65%', r: 5,  d: '1.4s', o: 0.12 },
  { x: '54%', y: '78%', r: 6,  d: '3.1s', o: 0.13 },
  { x: '84%', y: '16%', r: 7,  d: '3.9s', o: 0.14 },
  { x: '24%', y: '20%', r: 9,  d: '1.0s', o: 0.16 },
  { x: '40%', y: '46%', r: 5,  d: '2.8s', o: 0.11 },
  { x: '64%', y: '46%', r: 6,  d: '0.3s', o: 0.13 },
  { x: '52%', y: '32%', r: 5,  d: '4.2s', o: 0.11 },
]

function FloatFlower({ x, y, r, d, o }) {
  const sz = r * 2.8
  return (
    <svg viewBox={`0 0 ${sz} ${sz}`} style={{ position: 'absolute', left: x, top: y, width: sz, height: sz, opacity: o, animation: 'float 5s ease-in-out infinite', animationDelay: d, pointerEvents: 'none' }}>
      <g transform={`translate(${sz / 2},${sz / 2})`}>
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse key={a} cx={0} cy={-r * .52} rx={r * .36} ry={r * .54}
            fill={a < 180 ? '#F4B0C8' : '#ED8AAE'} transform={`rotate(${a})`} opacity={.88} />
        ))}
        <circle cx={0} cy={0} r={r * .3} fill="#FFF0F5" />
        <circle cx={0} cy={0} r={r * .13} fill="#FFD060" opacity={.8} />
      </g>
    </svg>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function FloralFrame({ opened }) {
  const navH = opened ? 56 : 0
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      <TLCorner />
      <TRCorner />
      <BLCorner bottom={navH} />
      <BRCorner bottom={navH} />
      <LeftVine />
      <RightVine />
      {FLOATERS.map((f, i) => <FloatFlower key={i} {...f} />)}
    </div>
  )
}
