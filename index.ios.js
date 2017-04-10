/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, AppRegistry } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class mapsPractice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    console.log(e)
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        }
      ]
    })
  }

  render() {
    return (
        <MapView
          onPress={this.handlePress}
          style={styles.container}
          initialRegion={{
          latitude: 45.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0722,
          longitudeDelta: 0.0421
          }}
       >
        {this.state.markers.map((marker) => {
          return <MapView.Marker {...marker} />
        })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mapsPractice', () => mapsPractice);
