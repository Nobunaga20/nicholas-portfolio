import { useEffect, useState } from 'react'
import './Intro.css'

const strumTimings = [900, 1700, 2130]
const noteSymbols = ['\u266a', '\u266b', '\u2669', '\u266c', '\u266a']
const strumDuration = 220

function Intro() {
  const [isStrumming, setIsStrumming] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [noteBursts, setNoteBursts] = useState([])

  useEffect(() => {
    const timers = []
    const audio = new Audio('/intro-audio.wav')
    audio.volume = 0.45

    audio.play().catch(() => {
      // Chrome and other browsers may block autoplay; keep the visual intro running.
    })

    strumTimings.forEach((timing, timingIndex) => {
      timers.push(
        window.setTimeout(() => {
          const burstId = `${timing}-${timingIndex}`

          setIsStrumming(true)
          setIsGlowing(true)
          setNoteBursts((currentBursts) => [...currentBursts, burstId])

          timers.push(
            window.setTimeout(() => {
              setIsStrumming(false)
              setIsGlowing(false)
            }, strumDuration),
          )

          timers.push(
            window.setTimeout(() => {
              setNoteBursts((currentBursts) =>
                currentBursts.filter((id) => id !== burstId),
              )
            }, 1200),
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
      }, 2600),
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
        <div className="music-notes" aria-hidden="true">
          {noteBursts.flatMap((burstId) =>
            noteSymbols.map((symbol, noteIndex) => (
              <span
                className={`music-note note-${noteIndex + 1}`}
                key={`${burstId}-${noteIndex}`}
              >
                {symbol}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  )
}

export default Intro
