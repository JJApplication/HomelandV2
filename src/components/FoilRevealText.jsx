import { useState, useRef, useCallback, useEffect } from 'react'

export default function FoilRevealText({
  originalText,
  transformedText,
  className = '',
  charInterval = 30,
  /** When provided, reveal is driven by this flag instead of local hover. */
  active,
}) {
  const [revealIndex, setRevealIndex] = useState(0)
  const timerRef = useRef(null)
  const controlled = active !== undefined

  const maxLen = Math.max(originalText.length, transformedText.length, 1)
  const progress = revealIndex / maxLen
  const spacerText =
    transformedText.length >= originalText.length
      ? transformedText
      : originalText

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  const animateTo = useCallback(
    (direction) => {
      clearTimer()
      timerRef.current = setInterval(() => {
        setRevealIndex((prev) => {
          if (direction > 0) {
            if (prev >= maxLen) {
              clearTimer()
              return maxLen
            }
            return prev + 1
          }
          if (prev <= 0) {
            clearTimer()
            return 0
          }
          return prev - 1
        })
      }, charInterval)
    },
    [maxLen, charInterval, clearTimer],
  )

  useEffect(() => {
    if (!controlled) return
    animateTo(active ? 1 : -1)
  }, [active, controlled, animateTo])

  const handleMouseEnter = useCallback(() => {
    if (controlled) return
    animateTo(1)
  }, [controlled, animateTo])

  const handleMouseLeave = useCallback(() => {
    if (controlled) return
    animateTo(-1)
  }, [controlled, animateTo])

  return (
    <div
      onMouseEnter={controlled ? undefined : handleMouseEnter}
      onMouseLeave={controlled ? undefined : handleMouseLeave}
      className={`relative select-none ${controlled ? '' : 'cursor-pointer'} ${className}`}
    >
      {/* Spacer: taller of the two strings so layout height is stable */}
      <span className="invisible" aria-hidden="true">
        {spacerText}
      </span>

      {/* Original — wiped away left-to-right */}
      <span
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${progress * 100}%)` }}
      >
        {originalText}
      </span>

      {/* Transformed — revealed left-to-right with warm gradient */}
      <span
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
          backgroundImage:
            'linear-gradient(45deg,rgb(14, 131, 102) 0%,rgb(201, 139, 16) 30%, #FF8A3A 65%, #FF6A1A 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {transformedText}
      </span>
    </div>
  )
}
