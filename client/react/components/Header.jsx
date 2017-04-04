/*----------Modules----------*/
import React from 'react';
import {Link} from 'react-router';

/*----------Components----------*/


export class Header extends React.Component {
  constructor() {
    super();
  }
  render() {
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
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/auth/twitter'><i className='fa fa-twitter blue' /> Login</a>
              </li>
            </ul>
            {/* {this.navbarRight(userSession)} */}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
