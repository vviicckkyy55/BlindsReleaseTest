import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class VideosPage extends React.Component {

  constructor(props) {
    super(props);

    let shouldRedirect = false;
    if (localStorage.getItem('userInfo')) {
      // Check if user holds the token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userInfo'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userInfo');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('userInfo')) {
      axios.get('http://localhost:3333/api/videoList', {

      }).then(res => {
        this.setState({
          videoList: res.data
        });
      });
    }
  }

  render = () => {
    const videos = this.state.videoList.map(video => {
      return (
        <div className="card card-body">
          <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
            <Link to={'/video/' + video.upload_title}>
              <div className="video-thumbnail">
                <img className="medium" src={video.thumbnail_path} alt="video thumbnail" />
              </div>
            </Link>
            <span className="username">
              <Link to={'/api/videos/' + video.upload_title}>
                {video.uploader_name}
              </Link>
            </span>
            <div className="title">
              <span className="video-title">{video.upload_title}</span>
            </div>
          </div>
        </div>
        
      );
    });

    return (
      <div className="page">
        <div className="main-page">
          <h1>Ah... Here you are!!!</h1>
          <hr />
          <div className="row center">
            {videos}
          </div>
        </div>
      </div>
    );
  }
}

export default VideosPage;