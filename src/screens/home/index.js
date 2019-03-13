import { Constants, Location, Permissions } from 'expo';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = 'Waiting..';
    const { errorMessage, location } = this.state;
    if (errorMessage) {
      text = errorMessage;
    } else if (location) {
      text = JSON.stringify(location);
    }

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <Button title="Start new audit" onPress={() => navigate('NewAudit')} />
      </View>
    );
  }
}
