/*----------Modules----------*/
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

/*----------Components----------*/

/*----------Redux----------*/
import * as actions from 'actions';

export class Header extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const {dispatch} = this.props;
    $
      .get('/api/me')
      .done((user) => {
        if (user.twitter) {
          dispatch(actions.setUser(user));
        }
      })
      .catch(console.error);
    $
      .get('/photos')
      .done((res) => {
        let {photos} = res;
        // console.log('GET /photos', photos);
        if (photos.length) {
          dispatch(actions.setAllPhotos(photos));
        }
      });
  }
  addPic(e) {
    e.preventDefault();
  }
  render() {
    const {_id} = this.props.userSession.user;
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
              aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'>picBazaar</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li
                className={window.location.pathname == '/'
                  ? 'active'
                : ''}>
                <Link to='/'>
                  All Pics
                </Link>
              </li>
              <li
                className={window.location.pathname == '/profile'
                  ? 'active'
                : ''}>
                <Link to='/profile'>
                  My Pics
                </Link>
              </li>
              <li className='dropdown'>
                <a
                  href='#'
                  className='dropdown-toggle'
                  data-toggle='dropdown'
                  role='button'
                  aria-haspopup='true'
                  aria-expanded='false'>Add Pic
                  <span className='caret' /></a>
                <ul className='dropdown-menu'>
                  <form onSubmit={this.addPic} className='dropdown-form'>
                    <input className='form-control' ref='picURL' type='text' placeholder='Url' />
                    <input
                      className='form-control'
                      ref='desc'
                      type='text'
                      placeholder='Description' />
                    <button className='btn btn-primary form-control' type='submit'>
                      Add Pic
                    </button>
                  </form>
                </ul>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/auth/twitter'>
                  <button className='btn btn-default'>
                    <i className='fa fa-twitter blue' />
                    {_id
                      ? 'Logout'
                      : 'Login'}
                  </button>
                </a>
              </li>
            </ul>
            {/* {this.navbarRight(userSession)} */}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  userSession: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect((state) => state)(Header);
