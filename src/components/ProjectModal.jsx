import { motion, useReducedMotion } from 'motion/react'

const MODAL_EASE = [0.22, 1, 0.36, 1]

function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion()

  if (!project) {
    return null
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0.01 : 0.18, ease: MODAL_EASE },
    },
    exit: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.16, ease: MODAL_EASE },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.24, ease: MODAL_EASE },
    },
    exit: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.96,
      y: reduceMotion ? 0 : 10,
      transition: { duration: reduceMotion ? 0.01 : 0.16, ease: MODAL_EASE },
    },
  }

  return (
    <motion.div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        variants={modalVariants}
      >
        <motion.button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          x
        </motion.button>
        <span className="project-category">{project.category}</span>
        <h2 id="project-modal-title">{project.title}</h2>
        <p>{project.details}</p>
        <div className="stack-list">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {project.link && (
          <motion.a
            className="button secondary"
            href={project.link}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Visit Project
          </motion.a>
        )}
      </motion.section>
    </motion.div>
  )
}

export default ProjectModal
