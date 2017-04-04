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
  componentDidMount() {
    const {dispatch} = this.props;
    $
      .get('/api/me')
      .done((user) => {
        // console.log(user);
        if (user.twitter) {
          dispatch(actions.setUser(user));
        }
      })
      .catch(console.error);
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
