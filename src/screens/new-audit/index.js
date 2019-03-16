import { bindActionCreators } from 'redux';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

import auditActions from '../../state/actions/audit';

class NewAuditScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      locationPermissionGranted: false,
      locationServicesEnabled: false,
    };
  }

  componentWillMount() {
    this.getLocationPermission();
    this.getLocationStatus();
  }

  async getLocationPermission() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      this.setState({
        locationPermissionGranted: true,
      });
    }
  }

  async getLocationStatus() {
    const locationServicesEnabled = await Location.hasServicesEnabledAsync();
    this.setState({
      locationServicesEnabled,
    });
  }

  render() {
    const { actions, auditIsRunning } = this.props;
    const { locationPermissionGranted, locationServicesEnabled } = this.state;

    return (
      <View>
        <Text>Audit screen boom!</Text>
        {!locationPermissionGranted && <Text>This function requires permission to access your location.</Text>}
        {locationPermissionGranted && !locationServicesEnabled && (
          <Text>Location services need to be enabled for this function to work.</Text>
        )}
        {auditIsRunning ? (
          <Fragment>
            <Button disabled={!locationPermissionGranted} title="Stop" onPress={() => actions.audit.stopAudit()} />
          </Fragment>
        ) : (
          <Button title="Start" onPress={() => actions.audit.startAudit()} />
        )}
      </View>
    );
  }
}

NewAuditScreen.propTypes = {
  actions: PropTypes.shape({
    audit: PropTypes.shape({
      startAudit: PropTypes.func.isRequired,
      stopAudit: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  auditIsRunning: PropTypes.bool.isRequired,
};

NewAuditScreen.navigationOptions = {
  title: 'New audit',
};

const mapStateToProps = state => ({
  auditIsRunning: state.audit.isRunning,
  pingEndpoint: state.settings.pingEndpoint,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    audit: bindActionCreators(auditActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAuditScreen);
