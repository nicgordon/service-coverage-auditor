import { Text, View } from 'react-native';
import React from 'react';

const NewAuditScreen = () => (
  <View>
    <Text>Audit screen boom!</Text>
  </View>
);

NewAuditScreen.navigationOptions = {
  title: 'Start new audit',
};

export default NewAuditScreen;
