import { useEffect, useState } from 'react'
import './Intro.css'

const INTRO_AUDIO = '/intro-audio.wav'
const STRUM_TIMINGS = [900, 1700, 2130]
const STRUM_DURATION = 220
const NOTE_DURATION = 600
const AUDIO_FADE_START = 2600

function Intro() {
  const [isStrumming, setIsStrumming] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [showNote, setShowNote] = useState(false)

  useEffect(() => {
    const timers = []
    const audio = new Audio(INTRO_AUDIO)
    audio.volume = 0.45

    audio.play().catch(() => {
      // Browser autoplay may be blocked; the visual intro still runs silently.
    })

    STRUM_TIMINGS.forEach((timing) => {
      timers.push(
        window.setTimeout(() => {
          setIsStrumming(true)
          setIsGlowing(true)
          setShowNote(true)

          timers.push(
            window.setTimeout(() => {
              setIsStrumming(false)
              setIsGlowing(false)
            }, STRUM_DURATION),
          )

          timers.push(
            window.setTimeout(() => {
              setShowNote(false)
            }, NOTE_DURATION),
          )
        }, timing),
      )
    })

    timers.push(
      window.setTimeout(() => {
        const fadeSteps = 8
        const startVolume = audio.volume

        for (let step = 1; step <= fadeSteps; step += 1) {
          timers.push(
            window.setTimeout(() => {
              audio.volume = Math.max(0, startVolume * (1 - step / fadeSteps))
            }, step * 45),
          )
        }
      }, AUDIO_FADE_START),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <section className="intro-screen" aria-label="Loading portfolio">
      <div className="guitar-stage">
        <div
          className={`guitar-glow${isGlowing ? ' pulse' : ''}`}
          aria-hidden="true"
        ></div>
        <img
          className={`intro-guitar${isStrumming ? ' strumming' : ''}`}
          src="/guitar.png"
          alt=""
        />
        {showNote && (
          <span className="single-note" aria-hidden="true">
            {'\u266a'}
          </span>
        )}
      </div>
    </section>
  )
}

export default Intro
