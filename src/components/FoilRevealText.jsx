import { useState, useRef, useCallback, useEffect } from 'react'

export default function FoilRevealText({
  originalText,
  transformedText,
  className = '',
  charInterval = 30,
}) {
  const [revealIndex, setRevealIndex] = useState(0)
  const timerRef = useRef(null)

  const maxLen = Math.max(originalText.length, transformedText.length)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  const handleMouseEnter = useCallback(() => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setRevealIndex((prev) => {
        if (prev >= maxLen) {
          clearTimer()
          return maxLen
        }
        return prev + 1
      })
    }, charInterval)
  }, [maxLen, charInterval, clearTimer])

  const handleMouseLeave = useCallback(() => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setRevealIndex((prev) => {
        if (prev <= 0) {
          clearTimer()
          return 0
        }
        return prev - 1
      })
    }, charInterval)
  }, [charInterval, clearTimer])

  const originalChars = Array.from(originalText)
  const transformedChars = Array.from(transformedText)

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none cursor-pointer ${className}`}
    >
      {/* Invisible spacer so container has the right height */}
      <span className="invisible">{transformedText}</span>

      {/* Original text — characters hide left-to-right as revealIndex advances */}
      <span className="absolute inset-0 whitespace-nowrap">
        {originalChars.map((char, i) => (
          <span
            key={`o-${i}`}
            className="inline"
            style={{
              opacity: i >= revealIndex ? 1 : 0,
              transition: 'opacity 0.15s ease-out',
            }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Transformed text — characters appear left-to-right with a warm gradient */}
      <span
        className="absolute inset-0 whitespace-nowrap"
        style={{
          backgroundImage: 'linear-gradient(45deg,rgb(14, 131, 102) 0%,rgb(201, 139, 16) 30%, #FF8A3A 65%, #FF6A1A 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {transformedChars.map((char, i) => (
          <span
            key={`t-${i}`}
            className="inline"
            style={{
              opacity: i < revealIndex ? 1 : 0,
              transition: 'opacity 0.15s ease-out',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  )
}
