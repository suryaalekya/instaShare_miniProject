import {Component} from 'react'

import Cookies from 'js-cookie'

/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import './index.css'
import LoaderSpinner from '../LoaderSpinner'
import UserInstaPost from '../UserInstaPost'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SearchContext from '../../context/SearchContext'
import UserPostItem from '../UserPostItem'
import UserPostSearchItem from '../UserPostSearchItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {
    userPosts: [],
    apiStatus: apiStatusConstants.initial,
    postsData: [],
    searchPosts: this.props,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searchPosts !== state.searchPosts) {
      return {
        searchPosts: props.searchPosts,
      }
    }
    return null
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userPostsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userPostsUrl, options)

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.posts.map(eachPost => ({
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: eachPost.post_details,
        comments: eachPost.comments,
        caption: eachPost.caption,
        userId: eachPost.user_id,
        profilePic: eachPost.profile_pic,
        userName: eachPost.user_name,
        postCaption: eachPost.post_details.caption,
        postImage: eachPost.post_details.image_url,
      }))

      this.setState({
        postsData: updatedData,
        apiStatus: apiStatusConstants.success,
        userPosts: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
    // testid="loader"
    >
      <LoaderSpinner />
    <div className="user-story-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getUserPosts()
  }

  renderFailureView = () => (
    <div className="failure-view">
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        className="failure_img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675775097/alert-triangle_cyhzqu.png"
        alt="failure view"
      />
      <p className="failure-view-heading">
        Something went wrong. Please try again.
      </p>
      <p className="failure_heading">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.onClickTryAgainButton}
        className="failure-view-button"
        onClick={() => this.getUserPosts()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  noSearchResults = () => (
    <div className="no-results-container">
      <img
        className="no-results-img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675513323/SearchNotFound_ntqrqa.png"
        alt="search not found"
      />
      <h1 className="no-results-heading">Search Not Found</h1>
      <p className="no-results-para">Try different keyword or search again</p>
    </div>
  )

  initiatePostLikeApi = async (postId, likeStatus) => {
    const {postsData} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const likeDetails = {
      like_status: likeStatus,
    }
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    let userPostsData = postsData
    userPostsData = userPostsData.map(eachObject => {
      if (eachObject.postId === postId && likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === postId && !likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })

    this.setState({postsData: userPostsData})
  }

  renderSuccessView = () => {
    const {userPosts} = this.state
    const {postsData} = this.state
    console.log(postsData)
    return (
      <ul className="posts_list_container">
        {postsData.map(eachPost => (
          <UserPostItem
            initiatePostLikeApi={this.initiatePostLikeApi}
            eachPost={eachPost}
            key={eachPost.postId}
          />
        ))}
      </ul>
    )
  }

  renderSearchPosts = () => {
    const {searchPosts} = this.state
    return (
      <div>
        <ul className="user-posts-view">
          {userPosts.map(post => (
            <UserInstaPost key={post.postId} userPost={post} />
          ))}
        </ul>
      </div>
      <ul className="posts_list_container">
        <h1 className="searchResultsHeading">Search Results</h1>
        {searchPosts.map(eachPost => (
          <UserPostSearchItem
            initiateSearchPostLikeApi={this.initiateSearchPostLikeApi}
            eachPost={eachPost}
            key={eachPost.postId}
          />
        ))}
      </ul>
    )
  }

  renderUserPostsView = () => {
    const {apiStatus} = this.state
  renderConditionForSearchResults = (isFailure, isSearchButtonClicked) => {
    const {searchPosts} = this.state
    if (!isFailure && isSearchButtonClicked) {
      if (searchPosts.length > 0) {
        return this.renderSearchPosts()
      }
      return this.noSearchResults()
    }
    return null
  }

  renderUserPosts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderUserPostsView()}</div>
    return (
      <SearchContext.Consumer>
        {value => {
          const {
            searchText,
            isSearchButtonClicked,
            setLoading,
            isFailure,
          } = value

          return (
            <div className="posts-container">
              {searchText === '' && this.renderUserPosts()}
              {setLoading && this.renderLoadingView()}
              {this.renderConditionForSearchResults(
                isFailure,
                isSearchButtonClicked,
              )}
              {isFailure && this.renderFailureView()}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default UserPosts