import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import auditActions from '../../state/actions/audit';

const NewAuditScreen = ({ actions, auditIsRunning }) => (
  <View>
    <Text>Audit screen boom!</Text>
    {auditIsRunning ? (
      <Button title="Stop" onPress={() => actions.audit.stopAudit()} />
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
};

NewAuditScreen.navigationOptions = {
  title: 'New audit',
};

const mapStateToProps = state => ({
  auditIsRunning: state.audit.isRunning,
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
