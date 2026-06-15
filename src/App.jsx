import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProjectModal from './components/ProjectModal'
import SectionHeading from './components/SectionHeading'
import {
  categories,
  education,
  experience,
  profile,
  projects,
  skills,
} from './data/portfolioData'
import portoPhoto from './assets/porto-photo.jpeg'
import Intro from './Intro'
import './App.css'

const INTRO_DURATION = 3000

function StackList({ items }) {
  return (
    <div className="stack-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false)
    }, INTRO_DURATION)

    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [selectedProject])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  if (showIntro) {
    return <Intro />
  }

  return (
    <>
      <Navbar />

      <main className="portfolio portfolio-enter">
        <section id="hero" className="hero-section reveal">
          <div className="hero-copy">
            <p className="eyebrow">{profile.role}</p>
            <h1>{profile.name}</h1>
            <p className="hero-text">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View Projects
              </a>
              <a className="button secondary" href="#contact">
                Contact Me
              </a>
              <a className="button secondary" href="/resume.pdf" download>
                Download Resume
              </a>
            </div>
          </div>
          <div className="hero-photo-card">
            <img
              src={portoPhoto}
              alt="Nicholas Jason portrait"
              className="hero-photo"
            />
          </div>
        </section>

        <section id="about" className="section split-section reveal">
          <div>
            <p className="section-kicker">About Me</p>
            <h2>Developer focused on useful, polished products.</h2>
          </div>
          <div className="about-copy">
            <p>{profile.about}</p>
            <p>Based in {profile.location}.</p>
          </div>
        </section>

        <section id="skills" className="section reveal">
          <SectionHeading kicker="Skills" />
          <div className="skill-list">
            {skills.map((skill) => (
              <article className="skill-pill" key={skill.name}>
                <span>{skill.name}</span>
                <small>{skill.level}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-heading project-heading">
            <div>
              <p className="section-kicker">Projects</p>
            </div>
            <div className="filter-group" aria-label="Project filters">
              {categories.map((category) => (
                <button
                  className={category === activeCategory ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <button
                className="project-card"
                type="button"
                onClick={() => setSelectedProject(project)}
                key={project.title}
              >
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-meta">
                  <StackList items={project.stack} />
                  <span className="card-action">Open details</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal">
          <SectionHeading kicker="Experience" />
          <div className="experience-list">
            {experience.map((item) => (
              <article
                className="experience-card"
                key={`${item.company}-${item.period}`}
              >
                <div className="experience-topline">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.period}</span>
                </div>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal">
          <SectionHeading kicker="Education" title="Learning path" />
          <div className="timeline">
            {education.map((item) => (
              <article className="timeline-item" key={`${item.school}-${item.year}`}>
                <div>
                  <small className="timeline-tag">Learning milestone</small>
                  <h3>{item.school}</h3>
                  <p>{item.program}</p>
                </div>
                <span>{item.year}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section reveal">
          <p className="section-kicker">Contact</p>
          <h2>Have a project or opportunity in mind?</h2>
          <p>
            Reach out at <a href={`mailto:${profile.email}`}>{profile.email}</a> or
            connect through the links below.
          </p>

          <div className="contact-links">
            {profile.socials.map((item) => (
              <a href={item.url} key={item.label}>
                {item.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

export default App
