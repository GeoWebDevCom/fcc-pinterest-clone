/*----------Modules----------*/
import React, {PropTypes} from 'react';

/*----------Components----------*/


export class RouteContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
  );
  }
}

RouteContainer.propTypes = {
  children: PropTypes.object,
};

export default RouteContainer;
