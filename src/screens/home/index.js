import { Button, StyleSheet, Text, View } from 'react-native';
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
  </View>
);

export default HomeScreen;
