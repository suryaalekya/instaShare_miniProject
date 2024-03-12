import {Component} from 'react'

/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'

import Slider from 'react-slick'

import LoaderSpinner from '../LoaderSpinner'

import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userStories: [],
  }
  state = {apiStatus: apiStatusConstants.initial, storiesList: []}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userStoriesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const apiUrl = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userStoriesApiUrl, options)
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = await fetchedData.users_stories.map(userStory => ({
        storyUrl: userStory.story_url,
        userId: userStory.user_id,
        userName: userStory.user_name,
      const data = await response.json()
      const updatedData = data.users_stories.map(eachStory => ({
        userName: eachStory.user_name,
        userId: eachStory.user_id,
        storyUrl: eachStory.story_url,
      }))

      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstants.success,
        storiesList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
      className="main-container"
      // testid="loader"
    >
      <LoaderSpinner />
    <div className="user-story-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state
  renderSuccessView = () => {
    const {storiesList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slick-container">
      <ul className="slider-container">
        <Slider {...settings}>
          {userStories.map(eachLogo => {
            const {userId, storyUrl, userName} = eachLogo
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="user story" />
                <p className="user-story-name">{userName}</p>
              </div>
            )
          })}
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story_container">
              <img
                className="storyImg"
                alt="user story"
                src={eachStory.storyUrl}
              />
              <p className="userName">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </div>
      </ul>
    )
  }

  renderSuccessView = () => (
    <div className="main-container">{this.renderSlider()}</div>
  )

  onClickTryAgainButton = () => this.getUserStories()

  renderFailureView = () => (
    <div className="main-container">
      <h1>Failure View</h1>
      <p>Something went wrong. Please try again</p>
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="failure-view-image"
        className="user_story_failure_img"
      />
      <button type="button" onClick={this.onClickTryAgainButton}>
        Try again
      <h1 className="failure_heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={() => this.getUserStories()}
        type="submit"
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  render() {
  renderUserStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user_stories_container">{this.renderUserStories()}</div>
    )
  }
}

export default UserStories