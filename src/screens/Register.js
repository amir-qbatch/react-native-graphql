import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import AuthFields from '../components/Auth';
import { connect } from 'react-redux';
import AppHOC from '../hoc/AppHOC';

class Register extends Component {
  render() {
    console.log("register", this.props);
    return (
      <LinearGradient
        colors={['#2cb5e8', '#1fc8db', '#0fb8ad']}
        style={styles.container}
      >
        <AuthFields register={true} login={false} {...this.props}/>
      </LinearGradient>
    )
  }
}

export default connect(
  state => ({
    user: state.AuthReducers && state.AuthReducers.registerUser && state.AuthReducers.registerUser.user ? state.AuthReducers.registerUser.user : {},
  })
)(AppHOC(Register));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  }
});
