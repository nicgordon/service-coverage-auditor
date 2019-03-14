import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import auditActions from '../../state/actions/audit';
import Auditor from '../../components/auditor';

const NewAuditScreen = ({ actions, auditIsRunning, pingEndpoint }) => (
  <View>
    <Text>Audit screen boom!</Text>
    {auditIsRunning ? (
      <Fragment>
        <Auditor pingEndpoint={pingEndpoint} />
        <Button title="Stop" onPress={() => actions.audit.stopAudit()} />
      </Fragment>
    ) : (
      <Button title="Start" onPress={() => actions.audit.startAudit()} />
    )}
  </View>
);

NewAuditScreen.propTypes = {
  actions: PropTypes.shape({
    audit: PropTypes.shape({
      startAudit: PropTypes.func.isRequired,
      stopAudit: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  auditIsRunning: PropTypes.bool.isRequired,
  pingEndpoint: PropTypes.string.isRequired,
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
