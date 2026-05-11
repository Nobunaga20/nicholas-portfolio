import './Intro.css'

function Intro() {
  return (
    <section className="intro-screen" aria-label="Loading portfolio">
      <div className="intro-shell">
        <div className="intro-mark" aria-hidden="true">
          NJ
        </div>
        <div className="intro-copy">
          <p>Portfolio</p>
          <h1>Nicholas Jason</h1>
          <span>Computer Science Student | Web Development | AI | Backend</span>
        </div>
        <div className="intro-loader" aria-hidden="true">
          <span></span>
        </div>
      </div>
    </section>
  )
}

export default Intro
