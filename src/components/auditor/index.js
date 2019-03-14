/* eslint-disable no-await-in-loop */
import _ from 'lodash';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Auditor extends Component {
  static propTypes = {
    pingEndpoint: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // @TODO: Async find location (start location updates??)
    this.isRunning = true;
    this.ping();
  }

  componentWillUnmount() {
    this.isRunning = false;
  }

  // @NOTE: This is obviously not a true ping, but in order to achieve that we'd need to eject from expo.
  async ping() {
    const { pingEndpoint } = this.props;

    if (!this.isRunning) {
      return;
    }

    try {
      const start = new Date();
      const pingResult = await global.fetch(pingEndpoint, { method: 'HEAD' });

      // Ignore the last ping if the audit was cancelled
      if (!this.isRunning) {
        return;
      }

      const end = new Date();
      console.log(
        `Result: ${_.get(pingResult, 'ok')}`,
        `Status: ${_.get(pingResult, 'statusCode')}`,
        `Time: ${start - end}ms.`,
      );
      // @TODO: Store the result somewhere

      // Recursively call this function
      this.ping();
    } catch (error) {
      console.error(error);
    }
  }
}

Auditor.prototype.render = _.constant(null);

export default Auditor;
