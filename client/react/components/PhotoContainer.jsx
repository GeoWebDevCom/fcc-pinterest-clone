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
      }, user} = this.props;
    return list.map((photo) => {
      return user
        ? (
          <div className='pinned-photo'>
            <img src={photo.url} />
          </div>
        )
        : (<div />);
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
  user: PropTypes.bool
};

export default connect((state) => state)(PhotoContainer);
