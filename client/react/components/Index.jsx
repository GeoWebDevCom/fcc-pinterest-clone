/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';

export class Index extends React.Component {
  constructor() {
    super();
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

export default Index;
