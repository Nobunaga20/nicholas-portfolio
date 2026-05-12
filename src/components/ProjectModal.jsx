function ProjectModal({ project, onClose }) {
  if (!project) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
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
          onClick={onClose}
          aria-label="Close project details"
        >
          x
        </button>
        <span className="project-category">{project.category}</span>
        <h2 id="project-modal-title">{project.title}</h2>
        <p>{project.details}</p>
        <div className="stack-list">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {project.link && (
          <a className="button secondary" href={project.link}>
            Visit Project
          </a>
        )}
      </section>
    </div>
  )
}

export default ProjectModal
