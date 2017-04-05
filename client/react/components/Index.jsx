/*----------Modules----------*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';
import PhotoContainer from 'PhotoContainer';

/*----------Redux----------*/
import * as actions from 'actions';

export class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <PhotoContainer />
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func
};

export default connect((state) => state)(Index);
