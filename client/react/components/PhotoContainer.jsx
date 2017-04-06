/*----------Modules----------*/
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

/*----------Components----------*/

/*eslint-disable require-jsdoc*/
export class PhotoContainer extends React.Component {
  constructor() {
    super();
  }
  photoSet = (col) => {
    const {photos: {
        list
      }, myPics, userSession: {user}} = this.props;
    return list.filter((photo) => {
      return myPics ? photo.creator._id == user._id : true;
    }).map((photo) => {
      return (
        <div key={photo._id} className='pinned-photo'>
          <img src={photo.url} />
          <div className='photo-desc'>
            <p>{photo.desc}</p>
          </div>
          <div className='photo-user'>
            <img src='' />
            <button><i className='fa fa-star' />{photo.likes.length}</button>
          </div>
        </div>
      );
    }).filter((el, i) => i % 5 === col);
  }
  render() {
    return (
      <div className='container well'>
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
  userSession: PropTypes.object,
};

export default connect((state) => state)(PhotoContainer);
