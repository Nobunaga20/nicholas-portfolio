import { useEffect } from 'react'
import './Intro.css'

const INTRO_AUDIO = '/intro-audio.mp3'
const AUDIO_FADE_START = 2600
const AUDIO_VOLUME = 0.45

function Intro() {
  useEffect(() => {
    const timers = []
    const audio = new Audio(INTRO_AUDIO)
    audio.volume = AUDIO_VOLUME

    audio.play().catch(() => {})

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
      <div className="campfire-scene">
        <div className="campfire-glow" aria-hidden="true"></div>
        <div className="ember-field" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index}></span>
          ))}
        </div>
        <div className="smoke-field" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="campfire" aria-hidden="true">
          <div className="flame flame-back"></div>
          <div className="flame flame-mid"></div>
          <div className="flame flame-front"></div>
          <div className="log log-left"></div>
          <div className="log log-right"></div>
          <div className="coal-bed"></div>
        </div>
        <p className="intro-status">Loading...</p>
      </div>
    </section>
  )
}

export default Intro
