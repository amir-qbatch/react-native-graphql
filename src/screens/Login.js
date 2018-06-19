import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import AuthFields from '../components/Auth';
import AppHOC from '../hoc/AppHOC';

class Login extends Component {
  render() {
    console.log("login", this.props.user, this.props.token);
    return(
      <LinearGradient
        colors={['#2cb5e8', '#1fc8db', '#0fb8ad']}
        style={styles.container}
      >
        <AuthFields login={true} Register={false} {...this.props}/>
      </LinearGradient>
    )
  }
}

export default connect(
  state => ({
    user: state.AuthReducers && state.AuthReducers.loginUser && state.AuthReducers.loginUser.user ? state.AuthReducers.loginUser.user : {},
    token: state.AuthReducers && state.AuthReducers.loginUser && state.AuthReducers.loginUser.token ? state.AuthReducers.loginUser.token : undefined,
  })
)(AppHOC(Login));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  }
})