/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/

/*----------Redux----------*/
import * as actions from 'actions';

/*eslint-disable require-jsdoc*/
export class PhotoContainer extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    $('.photo-photo')
      .on('error', function(img) {
        console.log(img, this);
        $(img).attr('src', './images/nopicture.png');
      });
  }
  delete = (id) => {
    const {dispatch} = this.props;
    return () => {
      let request = {
        url: '/photos',
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify({_id: id}),
        dataType: 'json'
      };
      $
        .ajax(request)
        .done((success) => {
          dispatch(actions.deletePhoto(id));
        })
        .fail((error) => console.error(error));
    };
  }
  imgError(_id) {
    return () => {
      $(`#${_id}-img`).attr('src', 'http://combiboilersleeds.com/images/default/default-5.jpg');
    };
  }
  photoSet = (col) => {
    const {photos: {
        list
      }, myPics, userSession: {
        user
      }} = this.props;
    return list.filter((photo) => {
      return myPics
        ? photo.creator._id == user._id
        : true;
    }).map((photo) => {
      return (
        <div key={photo._id} className='pinned-photo'>
          <img
            id={photo._id + '-img'}
            onError={this.imgError(photo._id)}
            src={photo.url} />
          <div className='photo-desc'>
            <p>{photo.desc}</p>
          </div>
          <div className='photo-user'>
            <img
              className='photo-photo'
              src={photo.creator.profile_pic}
              title={'@' + photo.creator.displayName}
              alt={'@' + photo.creator.displayName} />
            {((display) => {
              if (display)
              return (
                <a href='#' className='photo-delete' onClick={this.delete(photo._id)}><i className='fa fa-times' /></a>
              );
            }
            )(myPics)}
            <button><i className='fa fa-star' />{photo.likes.length}</button>
          </div>
        </div>
      );
    }).filter((el, i) => i % 5 === col);
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='photo-column col-xs-12 col-sm-4 col-md-2 col-md-push-1'>
            {this.photoSet(3)}
          </div>
          <div className='photo-column col-xs-12 col-sm-4 col-md-2 col-md-push-1'>
            {this.photoSet(2)}
          </div>
          <div className='photo-column col-xs-12 col-sm-4 col-md-2 col-md-push-1'>
            {this.photoSet(0)}
          </div>
          <div className='photo-column col-xs-12 col-sm-4 col-md-2 col-md-push-1'>
            {this.photoSet(1)}
          </div>
          <div className='photo-column col-xs-12 col-sm-4 col-md-2 col-md-push-1'>
            {this.photoSet(4)}
          </div>
        </div>
      </div>
    );
  }
}

PhotoContainer.propTypes = {
  dispatch: PropTypes.func,
  photos: PropTypes.object,
  myPics: PropTypes.bool,
  userSession: PropTypes.object
};

export default connect((state) => state)(PhotoContainer);
