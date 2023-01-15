import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import ProjectItem from '../ProjectItem'
import './index.css'

class Projects extends Component {
  state = {
    projectsList: [],
    loadingStatus: 'LOADING',
    category: 'ALL',
  }

  loadingState = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const {category} = this.state
    const projectsApiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const options = {method: 'GET'}
    const response = await fetch(projectsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const categories = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({
        categoriesList: categories,
        loadingStatus: this.loadingState.success,
      })
    } else {
      this.setState({
        loadingStatus: this.loadingState.failed,
      })
    }
  }

  changeCategory = event => {
    this.setState(
      {
        category: event.target.value,
      },
      this.getApiData,
    )
  }

  renderingLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderingSuccessView = () => {
    const {categoriesList} = this.state

    return (
      <div className="success-container">
        <ul className="projects-list">
          {categoriesList.map(each => (
            <ProjectItem project={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderingFailedView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for .
      </p>
      <button type="button" className="retry-button" onClick={this.getApiData}>
        Retry
      </button>
    </div>
  )

  renderingOptions = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case this.loadingState.loading:
        return this.renderingLoadingView()
      case this.loadingState.success:
        return this.renderingSuccessView()
      case this.loadingState.failed:
        return this.renderingFailedView()

      default:
        return ''
    }
  }

  render() {
    const {categoriesList} = this.props
    const {projectsList, category} = this.state

    return (
      <div className="container">
        <NavBar />
        <div className="projects-container">
          <select
            className="category"
            value={category}
            onChange={this.changeCategory}
          >
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {this.renderingOptions()}
        </div>
      </div>
    )
  }
}

export default Projects
