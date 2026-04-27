import { useEffect, useMemo, useState } from 'react'

const ENGLISH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const TRADITIONAL_CHARS =
  '天地玄黃宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結為霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥薑海鹹河淡麟鳳龜龍神遊太虛清風明月山川錦繡松濤疏影長歌未央'
const KATAKANA_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッーヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'
const PUNCTUATION_REGEX = /[\s.,!?;:，。！？；：、]/u
const EMPTY_RANGES = []
const EMPTY_INDEXES = []

/**
 * 随机扰动区间。
 * @typedef {Object} ScrambleRange
 * @property {number} start 起始字符索引，包含当前位置。
 * @property {number} end 结束字符索引，不包含当前位置。
 */

/**
 * 文字扰动组件属性。
 * @typedef {Object} ScrambleTextProps
 * @property {string} text 最终展示文本。
 * @property {ScrambleRange[]} [scrambleRanges] 需要执行扰动的字符区间。
 * @property {number[]} [scrambleIndexes] 需要执行扰动的字符索引。
 * @property {number} [duration] 单次动画总时长，单位毫秒。
 * @property {'fade' | 'pulse' | 'none'} [animation] 字符过渡动画类型。
 * @property {string} [locale] 随机字库的语言标识，如 `en`、`zh`、`ja`。
 * @property {'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3'} [as] 外层标签名称。
 * @property {string} [className] 外层样式类名。
 * @property {number} [stepMs] 字符刷新间隔，单位毫秒。
 */

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

function resolveLocale(locale = 'en') {
  const normalized = locale.toLowerCase()

  if (normalized.startsWith('zh')) {
    return 'zh'
  }

  if (normalized.startsWith('ja')) {
    return 'ja'
  }

  return 'en'
}

function pickRandomChar(finalChar, locale) {
  if (PUNCTUATION_REGEX.test(finalChar)) {
    return finalChar
  }

  const language = resolveLocale(locale)
  const source =
    language === 'zh'
      ? TRADITIONAL_CHARS
      : language === 'ja'
        ? KATAKANA_CHARS
        : ENGLISH_CHARS

  return source[Math.floor(Math.random() * source.length)]
}

function normalizeTargetIndexes(characters, scrambleRanges = [], scrambleIndexes = []) {
  const indexes = new Set()

  scrambleIndexes.forEach((index) => {
    if (index >= 0 && index < characters.length && !PUNCTUATION_REGEX.test(characters[index])) {
      indexes.add(index)
    }
  })

  scrambleRanges.forEach(({ start, end }) => {
    for (let index = Math.max(0, start); index < Math.min(characters.length, end); index += 1) {
      if (!PUNCTUATION_REGEX.test(characters[index])) {
        indexes.add(index)
      }
    }
  })

  return Array.from(indexes).sort((left, right) => left - right)
}

function buildFrame(characters, targetIndexes, elapsed, duration, locale) {
  if (duration <= 0) {
    return characters.map((character) => ({
      value: character,
      scrambling: false,
      settled: true,
      progress: 1,
    }))
  }

  const orderMap = new Map(targetIndexes.map((index, order) => [index, order]))
  const lastOrder = Math.max(targetIndexes.length - 1, 1)

  return characters.map((character, index) => {
    if (!orderMap.has(index)) {
      return {
        value: character,
        scrambling: false,
        settled: true,
        progress: 1,
      }
    }

    const order = orderMap.get(index)
    const revealDelay = (order / lastOrder) * duration * 0.42
    const revealDuration = Math.max(duration - revealDelay, duration * 0.34)
    const rawProgress = clamp((elapsed - revealDelay) / revealDuration, 0, 1)
    const progress = easeOutCubic(rawProgress)
    const settled = rawProgress >= 1
    const lockChance = progress * progress

    if (settled || Math.random() < lockChance) {
      return {
        value: character,
        scrambling: false,
        settled: true,
        progress: 1,
      }
    }

    return {
      value: pickRandomChar(character, locale),
      scrambling: true,
      settled: false,
      progress,
    }
  })
}

function getAnimatedStyle(animation, item, index, elapsed) {
  if (!item.scrambling || animation === 'none') {
    return undefined
  }

  const wave = Math.sin(elapsed / 70 + index)
  const sharedStyle = {
    transition: 'opacity 140ms linear, transform 140ms ease-out, filter 180ms ease-out',
  }

  if (animation === 'pulse') {
    return {
      ...sharedStyle,
      opacity: 0.72 + Math.abs(wave) * 0.22,
      transform: `translateY(${wave * -1.8}px) scale(${1 + Math.abs(wave) * 0.03})`,
      filter: `blur(${(1 - item.progress) * 0.9}px)`,
    }
  }

  return {
    ...sharedStyle,
    opacity: 0.4 + Math.abs(wave) * 0.32,
    transform: `translateY(${wave * -1.4}px)`,
    filter: `blur(${(1 - item.progress) * 1.1}px)`,
  }
}

/**
 * 通用文字扰动组件，用随机字符短暂替换目标字符后再平滑锁定为最终文本。
 * @param {ScrambleTextProps} props 组件配置。
 */
export default function ScrambleText({
  text,
  scrambleRanges = EMPTY_RANGES,
  scrambleIndexes = EMPTY_INDEXES,
  duration = 3000,
  animation = 'fade',
  locale = 'en',
  as = 'span',
  className = '',
  stepMs = 45,
}) {
  const Component = as
  const characters = useMemo(() => Array.from(text), [text])
  const safeDuration = Math.max(duration, 0)
  const safeStepMs = Math.max(stepMs, 16)
  const targetIndexes = useMemo(
    () => normalizeTargetIndexes(characters, scrambleRanges, scrambleIndexes),
    [characters, scrambleIndexes, scrambleRanges],
  )
  const [elapsed, setElapsed] = useState(0)
  const targetIndexesKey = useMemo(() => targetIndexes.join(','), [targetIndexes])
  const items = useMemo(
    () => buildFrame(characters, targetIndexes, elapsed, safeDuration, locale),
    [characters, elapsed, locale, safeDuration, targetIndexes],
  )

  useEffect(() => {
    setElapsed(0)

    if (targetIndexes.length === 0) {
      setElapsed(safeDuration)
      return undefined
    }

    const start = performance.now()
    let timerId = 0

    const update = () => {
      const nextElapsed = clamp(performance.now() - start, 0, safeDuration)
      setElapsed(nextElapsed)

      if (nextElapsed >= safeDuration) {
        window.clearInterval(timerId)
      }
    }

    update()
    timerId = window.setInterval(update, safeStepMs)

    return () => {
      window.clearInterval(timerId)
    }
  }, [locale, safeDuration, safeStepMs, targetIndexesKey, text])

  return (
    <Component className={className} aria-label={text}>
      {items.map((item, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          style={getAnimatedStyle(animation, item, index, elapsed)}
        >
          {item.value}
        </span>
      ))}
    </Component>
  )
}
