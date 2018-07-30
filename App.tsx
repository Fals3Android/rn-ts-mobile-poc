import React from 'react';
import { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NetInfo
} from 'react-native';
import Camera from 'react-native-camera';

export default class App extends Component<any, any> {
  private camera: Camera;
  constructor(props: any) {
    super(props);
    this.camera = React.createRef();
    this.state = {
      isConnected: null,
    };
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        isConnected: isConnected ? 'true' : 'false'
      });
    });
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data: any) => console.log(data))
      .catch((err: any) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam: any) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
        <Text style={styles.welcome}>React POC for Mobile features</Text>
        <Text>Is this device connected to the internet: {this.state.isConnected}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});