/*----------Modules----------*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';

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
        console.log(user);
        if (user) {
          dispatch(actions.setUser(user));
        }
      })
      .catch(console.error);
  }
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <h1>Pics</h1>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func
};

export default connect((state) => state)(Index);
