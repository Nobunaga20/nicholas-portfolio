import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
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
const MOTION_EASE = [0.22, 1, 0.36, 1]
const VIEWPORT_ONCE = { once: true, amount: 0.18 }

function createMotionSettings(reduceMotion) {
  const duration = reduceMotion ? 0.01 : 0.64
  const shortDuration = reduceMotion ? 0.01 : 0.22

  return {
    fadeUp: {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: MOTION_EASE },
      },
    },
    heroItem: {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: MOTION_EASE },
      },
    },
    heroPhoto: {
      hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: reduceMotion ? 0.01 : 0.72, ease: MOTION_EASE },
      },
    },
    stagger: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.1,
          delayChildren: reduceMotion ? 0 : 0.08,
        },
      },
    },
    heroStagger: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.12,
          delayChildren: reduceMotion ? 0 : 0.12,
        },
      },
    },
    hoverLift: reduceMotion
      ? undefined
      : { y: -4, scale: 1.02, transition: { duration: shortDuration, ease: MOTION_EASE } },
    hoverButton: reduceMotion
      ? undefined
      : { y: -2, scale: 1.02, transition: { duration: shortDuration, ease: MOTION_EASE } },
    tapSoft: reduceMotion ? undefined : { scale: 0.98 },
  }
}

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
  const reduceMotion = useReducedMotion()

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

  const motionSettings = createMotionSettings(reduceMotion)

  if (showIntro) {
    return <Intro />
  }

  return (
    <>
      <Navbar />

      <main className="portfolio">
        <section id="hero" className="hero-section">
          <motion.div
            className="hero-copy"
            variants={motionSettings.heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="eyebrow" variants={motionSettings.heroItem}>
              {profile.role}
            </motion.p>
            <motion.h1 variants={motionSettings.heroItem}>{profile.name}</motion.h1>
            <motion.p className="hero-text" variants={motionSettings.heroItem}>
              {profile.intro}
            </motion.p>
            <motion.div className="hero-actions" variants={motionSettings.heroItem}>
              <motion.a
                className="button primary"
                href="#projects"
                whileHover={motionSettings.hoverButton}
                whileTap={motionSettings.tapSoft}
              >
                View Projects
              </motion.a>
              <motion.a
                className="button secondary"
                href="#contact"
                whileHover={motionSettings.hoverButton}
                whileTap={motionSettings.tapSoft}
              >
                Contact Me
              </motion.a>
              <motion.a
                className="button secondary"
                href="/resume.pdf"
                download
                whileHover={motionSettings.hoverButton}
                whileTap={motionSettings.tapSoft}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-photo-card"
            variants={motionSettings.heroPhoto}
            initial="hidden"
            animate="visible"
            whileHover={motionSettings.hoverLift}
          >
            <img
              src={portoPhoto}
              alt="Nicholas Jason portrait"
              className="hero-photo"
            />
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="section split-section"
          variants={motionSettings.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.div variants={motionSettings.fadeUp}>
            <p className="section-kicker">About Me</p>
            <h2>Developer focused on useful, polished products.</h2>
          </motion.div>
          <motion.div className="about-copy" variants={motionSettings.fadeUp}>
            <p>{profile.about}</p>
            <p>Based in {profile.location}.</p>
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          className="section"
          variants={motionSettings.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <SectionHeading kicker="Skills" />
          <motion.div
            className="skill-list"
            variants={motionSettings.stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {skills.map((skill) => (
              <motion.article
                className="skill-pill"
                key={skill.name}
                variants={motionSettings.fadeUp}
                whileHover={motionSettings.hoverLift}
                whileTap={motionSettings.tapSoft}
              >
                <span>{skill.name}</span>
                <small>{skill.level}</small>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="section"
          variants={motionSettings.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className="section-heading project-heading">
            <div>
              <p className="section-kicker">Projects</p>
            </div>
            <div className="filter-group" aria-label="Project filters">
              {categories.map((category) => (
                <motion.button
                  className={category === activeCategory ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  key={category}
                  whileHover={motionSettings.hoverButton}
                  whileTap={motionSettings.tapSoft}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div
            className="project-grid"
            variants={motionSettings.stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {filteredProjects.map((project) => (
              <motion.button
                className="project-card"
                type="button"
                onClick={() => setSelectedProject(project)}
                key={project.title}
                variants={motionSettings.fadeUp}
                whileHover={motionSettings.hoverLift}
                whileTap={motionSettings.tapSoft}
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
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="experience"
          className="section"
          variants={motionSettings.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <SectionHeading kicker="Experience" />
          <motion.div
            className="experience-list"
            variants={motionSettings.stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {experience.map((item) => (
              <motion.article
                className="experience-card"
                key={`${item.company}-${item.period}`}
                variants={motionSettings.fadeUp}
                whileHover={motionSettings.hoverLift}
                whileTap={motionSettings.tapSoft}
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
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="education"
          className="section"
          variants={motionSettings.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <SectionHeading kicker="Education" title="Learning path" />
          <motion.div
            className="timeline"
            variants={motionSettings.stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {education.map((item) => (
              <motion.article
                className="timeline-item"
                key={`${item.school}-${item.year}`}
                variants={motionSettings.fadeUp}
                whileHover={motionSettings.hoverLift}
                whileTap={motionSettings.tapSoft}
              >
                <div>
                  <small className="timeline-tag">Learning milestone</small>
                  <h3>{item.school}</h3>
                  <p>{item.program}</p>
                </div>
                <span>{item.year}</span>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="contact"
          className="section contact-section"
          variants={motionSettings.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <p className="section-kicker">Contact</p>
          <h2>Have a project or opportunity in mind?</h2>
          <p>
            Reach out at <a href={`mailto:${profile.email}`}>{profile.email}</a> or
            connect through the links below.
          </p>

          <div className="contact-links">
            {profile.socials.map((item) => (
              <motion.a
                href={item.url}
                key={item.label}
                whileHover={motionSettings.hoverButton}
                whileTap={motionSettings.tapSoft}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
