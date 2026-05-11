import { useEffect, useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import Intro from './Intro'
import './App.css'

const profile = {
  name: 'Nicholas Jason',
  role: 'Computer Science Student | Software Engineering Enthusiast',
  location: 'Indonesia / Odense, Denmark',
  email: 'nicholasjason54@gmail.com',
  intro:
    'Computer Science student building practical web, backend, machine learning, and systems projects.',
  about:
    'I enjoy turning technical ideas into usable software, from Laravel dashboards and research workflows to NLP experiments, computer vision prototypes, and lower-level scheduling simulations. I am looking for software engineering, backend, web development, and general computer science internship opportunities.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Nobunaga20' },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/nicholas-jason-769097309',
    },
    { label: 'Resume', url: '/resume.pdf' },
  ],
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const skills = [
  { name: 'Python', level: 'Programming' },
  { name: 'C / C++', level: 'Programming' },
  { name: 'Laravel', level: 'Web' },
  { name: 'React', level: 'Web' },
  { name: 'MySQL', level: 'Backend' },
  { name: 'Authentication & CRUD', level: 'Backend' },
  { name: 'NLP / DistilBERT', level: 'AI' },
  { name: 'TensorFlow / Keras', level: 'AI' },
  { name: 'Git & GitHub', level: 'Tools' },
  { name: 'Figma / Streamlit', level: 'Tools' },
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'IELTS 7.5' },
]

const categories = ['All', 'Web', 'AI', 'Systems']

const projects = [
  {
    title: 'AndRPaid',
    category: 'Web',
    description:
      'Research management platform for organizing academic projects, collaboration, literature work, and publication workflows.',
    details:
      'Built a centralized Laravel application with separate lecturer and university workflows, verification, dashboards, researcher discovery, collaboration tools, and structured research spaces with formula rendering.',
    stack: ['Laravel 11', 'MySQL', 'Blade', 'KaTeX'],
    link: 'https://github.com/Nobunaga20/andrpaid',
  },
  {
    title: 'Toxic Comment Classifier',
    category: 'AI',
    description:
      'Multi-label NLP classifier comparing a traditional baseline with a transformer model for toxicity detection.',
    details:
      'Implemented TF-IDF with Logistic Regression and fine-tuned DistilBERT, then evaluated the approaches with macro ROC-AUC and macro F1 on the Jigsaw toxic comment dataset.',
    stack: ['Python', 'NLP', 'TF-IDF', 'DistilBERT'],
    link: 'https://github.com/Nobunaga20/TF-IDF-Regression-VS-DistilBERT-on-Toxic-Comment-Classification',
  },
  {
    title: 'Zero-DCE Low-Light Enhancement',
    category: 'AI',
    description:
      'Computer vision project that improves low-light images using a zero-reference deep learning approach.',
    details:
      'Implemented a lightweight CNN, trained with the LOL dataset, evaluated image quality with common metrics, and wrapped the model in a Streamlit app for interactive testing.',
    stack: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
    link: 'https://github.com/Nobunaga20/Zero-DCE-Low-Light-Enhancement',
  },
  {
    title: 'Round-Robin CPU Scheduler',
    category: 'Systems',
    description:
      'Unix-based scheduler simulation that models time-sharing execution across child processes.',
    details:
      'Created a C program that uses process control, POSIX signals, interval timers, configurable time slices, and rotating scheduler logic to simulate preemptive execution.',
    stack: ['C', 'Unix', 'POSIX Signals', 'Timers'],
    link: 'https://github.com/Nobunaga20/round-robin-scheduler',
  },
  {
    title: 'Inventory Management App',
    category: 'Web',
    description:
      'CRUD-based web application for managing item records and inventory tracking workflows.',
    details:
      'Developed a Laravel and MySQL application with create, read, update, and delete flows for inventory records, giving users a straightforward web interface for item management.',
    stack: ['Laravel', 'MySQL', 'Blade'],
    link: '',
  },
]

const experience = [
  {
    company: 'Rasmus Rask Baren',
    role: 'Bartender',
    period: 'Mar 2026 - Present',
    summary:
      'Developing customer-facing communication, prioritization, and composure in a fast-paced service environment while studying abroad.',
    highlights: [
      'Handled multiple service tasks under pressure while maintaining quality.',
      'Communicated clearly with customers and teammates during busy shifts.',
      'Built habits around reliability, speed, and attention to detail.',
    ],
  },
  {
    company: 'HIMTI',
    role: 'Student Organization Contributor',
    period: 'Apr 2024 - Sep 2025',
    summary:
      'Supported student organization events through publication, promotion, marketing, and team communication.',
    highlights: [
      'Collaborated with committee members to coordinate event visibility.',
      'Helped communicate event information across student channels.',
      'Strengthened teamwork, planning, and audience-focused communication.',
    ],
  },
]

const education = [
  {
    school: 'University of Southern Denmark',
    program: 'Exchange Student, Computer Science',
    year: 'Feb 2026 - Jul 2026',
  },
  {
    school: 'Bina Nusantara University',
    program: 'Computer Science',
    year: '2023 - Present',
  },
]

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function validateForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.'
  }

  return errors
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formValues, setFormValues] = useState(initialForm)
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false)
    }, 2500)

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

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateForm(formValues)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      setFormStatus('')
      return
    }

    setFormValues(initialForm)
    setFormStatus('Thanks! Your message placeholder was validated successfully.')
  }

  if (showIntro) {
    return <Intro />
  }

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#hero" className="brand">
          {profile.name}
        </a>
        <div className="nav-actions">
          <div className="nav-links">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

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
        <div className="hero-visual" aria-hidden="true">
          <img src={heroImg} alt="" />
          <div className="intro-badges">
            <span>Web</span>
            <span>Backend</span>
            <span>AI</span>
            <span>Systems</span>
          </div>
        </div>
      </section>

      <section id="about" className="section split-section reveal">
        <div>
          <p className="section-kicker">About Me</p>
          <h2>Developer focused on useful, polished products.</h2>
        </div>
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>
            Based in {profile.location}. Edit the profile object to make this
            feel fully yours.
          </p>
        </div>
      </section>

      <section id="skills" className="section reveal">
        <div className="section-heading">
          <p className="section-kicker">Skills</p>
          <h2>Tools and technologies</h2>
        </div>
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
            <h2>Selected work</h2>
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
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <span className="card-action">Open details</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="experience" className="section reveal">
        <div className="section-heading">
          <p className="section-kicker">Experience</p>
          <h2>Professional background</h2>
        </div>
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
        <div className="section-heading">
          <p className="section-kicker">Education</p>
          <h2>Learning path</h2>
        </div>
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
          send a message with the form below.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleFieldChange}
              aria-invalid={Boolean(formErrors.name)}
            />
            {formErrors.name && <span className="field-error">{formErrors.name}</span>}
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleFieldChange}
              aria-invalid={Boolean(formErrors.email)}
            />
            {formErrors.email && (
              <span className="field-error">{formErrors.email}</span>
            )}
          </label>

          <label className="message-field">
            Message
            <textarea
              name="message"
              rows="5"
              value={formValues.message}
              onChange={handleFieldChange}
              aria-invalid={Boolean(formErrors.message)}
            />
            {formErrors.message && (
              <span className="field-error">{formErrors.message}</span>
            )}
          </label>

          <button className="button primary" type="submit">
            Send Message
          </button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>

        <div className="contact-links">
          {profile.socials.map((item) => (
            <a href={item.url} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
      </section>

      </main>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              x
            </button>
            <span className="project-category">{selectedProject.category}</span>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
            <div className="stack-list">
              {selectedProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {selectedProject.link && (
              <a className="button secondary" href={selectedProject.link}>
                Visit Project
              </a>
            )}
          </section>
        </div>
      )}
    </>
  )
}

export default App
