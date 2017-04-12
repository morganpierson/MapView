/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, AppRegistry } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

export default class mapsPractice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }

    this.withinRadius = this.withinRadius.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        }
      ]
    })
  }

  withinRadius(point, interest, kms) {
    let R = 6371;
    let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };

    let dLat = deg2rad(interest.latitude - point.latitude );
    let dLon = deg2rad( interest.longitude - point.longitude );

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(point.latitude)) * Math.cos(deg2rad(interest.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let d = R * c;

    return (d <= kms);
}

  componentDidMount() {
    setInterval(() => {
      //Possibly change to .watchPosition in production version of app 
      navigator.geolocation.getCurrentPosition((position) => {
        this.state.markers.forEach((marker) => {
          if(this.withinRadius(position.coords, marker.coordinate, 50/1000)) {
            console.log('Gotcha!!!')
          } else {
            console.log('Nope!!!')
          }
        })
      })
    }, 5000)
  }

  render() {
    return (
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          onLongPress={this.handlePress}
          style={styles.container}
          initialRegion={{
          latitude: 45.5209087,
          longitude: -122.6705107,
          latitudeDelta: 0.0722,
          longitudeDelta: 0.0421
          }}
        >
        {this.state.markers.map((marker, index) => {
          return <MapView.Circle 
            {...marker} 
            key={index} 
            center={marker.coordinate}
            radius={50}
            fillColor='rgba(10,2,2,0.5)'
          />
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
