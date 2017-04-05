/*----------Modules----------*/
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';
import PhotoContainer from 'PhotoContainer';

export class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div>
          <Header />
          <PhotoContainer user />
        </div>
      </div>
  );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func,
};

export default connect((state) => state)(Profile);
