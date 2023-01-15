import './index.css'

const ProjectItem = props => {
  const {project} = props
  return (
    <li className="project-item">
      <img
        src={project.imageUrl}
        alt={project.name}
        className="project-image"
      />
      <p className="project-name">{project.name}</p>
    </li>
  )
}

export default ProjectItem
