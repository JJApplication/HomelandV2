import { useEffect, useMemo, useRef, useState } from 'react'

const GRAVITY = 0.72
const MAX_TRAIL_POINTS = 56
const FRAME_INTERVAL = 1000 / 30

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function createInitialSimulation() {
  const angleOffset = (Math.random() - 0.5) * 0.18

  return {
    angle1: -Math.PI / 2.1 + angleOffset,
    angle2: -Math.PI / 2.8 - angleOffset * 1.6,
    velocity1: (Math.random() - 0.5) * 0.02,
    velocity2: (Math.random() - 0.5) * 0.02,
    mass1: 1 + Math.random() * 0.16,
    mass2: 1 + Math.random() * 0.12,
    length1: 126 + Math.random() * 10,
    length2: 118 + Math.random() * 16,
  }
}

function stepDoublePendulum(simulation, delta) {
  const { angle1, angle2, velocity1, velocity2, mass1, mass2, length1, length2 } = simulation
  const angleDelta = angle1 - angle2
  const sinDelta = Math.sin(angleDelta)
  const cosDelta = Math.cos(angleDelta)
  const denominatorBase = 2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2)
  const denominator1 = Math.max(length1 * denominatorBase, 0.0001)
  const denominator2 = Math.max(length2 * denominatorBase, 0.0001)

  const acceleration1 =
    (-GRAVITY * (2 * mass1 + mass2) * Math.sin(angle1) -
      mass2 * GRAVITY * Math.sin(angle1 - 2 * angle2) -
      2 * sinDelta * mass2 * (velocity2 * velocity2 * length2 + velocity1 * velocity1 * length1 * cosDelta)) /
    denominator1

  const acceleration2 =
    (2 *
      sinDelta *
      (velocity1 * velocity1 * length1 * (mass1 + mass2) +
        GRAVITY * (mass1 + mass2) * Math.cos(angle1) +
        velocity2 * velocity2 * length2 * mass2 * cosDelta)) /
    denominator2

  const nextVelocity1 = (velocity1 + acceleration1 * delta) * 0.9992
  const nextVelocity2 = (velocity2 + acceleration2 * delta) * 0.9992

  return {
    ...simulation,
    angle1: angle1 + nextVelocity1 * delta,
    angle2: angle2 + nextVelocity2 * delta,
    velocity1: clamp(nextVelocity1, -0.16, 0.16),
    velocity2: clamp(nextVelocity2, -0.2, 0.2),
  }
}

function calculatePoints(simulation, width, height) {
  const anchorX = width * 0.5
  const anchorY = height * 0.16
  const arm1X = anchorX + simulation.length1 * Math.sin(simulation.angle1)
  const arm1Y = anchorY + simulation.length1 * Math.cos(simulation.angle1)
  const arm2X = arm1X + simulation.length2 * Math.sin(simulation.angle2)
  const arm2Y = arm1Y + simulation.length2 * Math.cos(simulation.angle2)

  return {
    anchorX,
    anchorY,
    arm1X,
    arm1Y,
    arm2X,
    arm2Y,
  }
}

function buildTrailPath(points) {
  if (points.length < 2) {
    return ''
  }

  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function buildSparseTrailPath(points, step) {
  if (points.length < 2) {
    return ''
  }

  const sampledPoints = points.filter((_, index) => index % step === 0)

  if (sampledPoints.length < 2) {
    return ''
  }

  return buildTrailPath(sampledPoints)
}

/**
 * 混沌摆组件，使用简约线条和双摆模拟生成持续摆动的背景动画。
 * @param {{
 *   className?: string,
 *   width?: number,
 *   height?: number,
 * }} props 组件配置。
 */
export default function ChaosPendulum({
  className = '',
  width = 420,
  height = 420,
}) {
  const simulationRef = useRef(createInitialSimulation())
  const trailRef = useRef([])
  const lastRenderTimeRef = useRef(0)
  const animationFrameRef = useRef(0)
  const [frame, setFrame] = useState(() =>
    calculatePoints(simulationRef.current, width, height),
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      setFrame(calculatePoints(simulationRef.current, width, height))
      return undefined
    }

    let lastTime = performance.now()

    const animate = (now) => {
      const delta = Math.min((now - lastTime) / 16.6667, 1.4)
      lastTime = now
      simulationRef.current = stepDoublePendulum(simulationRef.current, delta)
      const points = calculatePoints(simulationRef.current, width, height)

      trailRef.current = [
        ...trailRef.current.slice(-MAX_TRAIL_POINTS + 1),
        { x: points.arm2X, y: points.arm2Y },
      ]

      if (now - lastRenderTimeRef.current >= FRAME_INTERVAL) {
        lastRenderTimeRef.current = now
        setFrame(points)
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    animationFrameRef.current = window.requestAnimationFrame((now) => {
      lastRenderTimeRef.current = now
      animate(now)
    })

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
    }
  }, [height, width])

  const trailPath = useMemo(() => buildTrailPath(trailRef.current), [frame])
  const softTrailPath = useMemo(() => buildSparseTrailPath(trailRef.current, 2), [frame])
  const glowTrailPath = useMemo(() => buildSparseTrailPath(trailRef.current, 3), [frame])

  return (
    <div
      className={`absolute inset-x-0 top-0 bottom-[132px] flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[72%] w-[72%] max-h-[420px] max-w-[420px] overflow-visible"
        fill="none"
      >
        <defs>
          <radialGradient id="chaos-pendulum-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,106,26,0.18)" />
            <stop offset="65%" stopColor="rgba(216,240,92,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="chaos-pendulum-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(38,34,29,0.95)" />
            <stop offset="100%" stopColor="rgba(38,34,29,0.54)" />
          </linearGradient>
          <linearGradient id="chaos-pendulum-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,106,26,0.14)" />
            <stop offset="100%" stopColor="rgba(216,240,92,0.28)" />
          </linearGradient>
        </defs>
        <circle
          cx={width * 0.5}
          cy={height * 0.54}
          r={width * 0.28}
          fill="url(#chaos-pendulum-glow)"
        />
        <path
          d={`M ${frame.anchorX - 92} ${frame.anchorY} H ${frame.anchorX + 92}`}
          stroke="rgba(38,34,29,0.16)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {glowTrailPath && (
          <path
            d={glowTrailPath}
            stroke="rgba(255,106,26,0.1)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {softTrailPath && (
          <path
            d={softTrailPath}
            stroke="url(#chaos-pendulum-accent)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {trailPath && (
          <path
            d={trailPath}
            stroke="rgba(255,106,26,0.26)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <circle
          cx={frame.anchorX}
          cy={frame.anchorY}
          r="22"
          fill="rgba(255,255,255,0.28)"
          stroke="rgba(38,34,29,0.08)"
          strokeWidth="1"
        />
        <line
          x1={frame.anchorX}
          y1={frame.anchorY}
          x2={frame.arm1X}
          y2={frame.arm1Y}
          stroke="url(#chaos-pendulum-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1={frame.arm1X}
          y1={frame.arm1Y}
          x2={frame.arm2X}
          y2={frame.arm2Y}
          stroke="rgba(38,34,29,0.68)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx={frame.anchorX} cy={frame.anchorY} r="4.5" fill="#111111" />
        <circle
          cx={frame.arm1X}
          cy={frame.arm1Y}
          r="10"
          fill="rgba(252,251,248,0.96)"
          stroke="rgba(38,34,29,0.55)"
          strokeWidth="1.8"
        />
        <circle
          cx={frame.arm2X}
          cy={frame.arm2Y}
          r="23"
          fill="rgba(216,240,92,0.12)"
        />
        <circle
          cx={frame.arm2X}
          cy={frame.arm2Y}
          r="12"
          fill="rgba(216,240,92,0.88)"
          stroke="rgba(38,34,29,0.32)"
          strokeWidth="1.8"
        />
      </svg>
    </div>
  )
}
