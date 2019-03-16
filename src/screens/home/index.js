import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import getDeviceInfo from '../../utils/get-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.paragraph}>{getDeviceInfo()}</Text>
    <Button title="Start new audit" onPress={() => navigation.navigate('NewAudit')} />
    <Button title="View Audit History" onPress={() => navigation.navigate('AuditHistory')} />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
