import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, CameraRoll, Platform } from 'react-native';
import { LinearGradient, ImagePicker, Permissions } from 'expo';


class Settings extends Component {
  state = {
    image: null,
  };

  _pickImage = async () => {
    let permissions = permissions = Permissions.CAMERA;
    if (Platform.OS === 'ios') {
      permissions = Permissions.CAMERA_ROLL;
    }
    const { status }  = await Permissions.askAsync(permissions);
    
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: true,
      exif: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    let { image } = this.state;

    return (
      <LinearGradient
        colors={['#2cb5e8', '#1fc8db', '#0fb8ad']}
        style={styles.container}
      >
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </LinearGradient>
    )
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});
