import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import registerUser from '../amazonInventory-middleware/actions/RegisterUser';
import loginUser from '../amazonInventory-middleware/actions/LoginUser';
import AppHOC from '../hoc/AppHOC';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleClick = (type) => {
    const { client, dispatch } = this.props;
    if(type === 'register')
      dispatch(registerUser(client, this.state))
    else 
      dispatch(loginUser(client, this.state))
  }

  render() {
    const { login, register } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>
            AMAZON INVENTORY
          </Text>
        </View>
        <View style={styles.fieldsContainer}>
          <TextInput
            style={Platform.OS === 'ios' ? { height: 40, width: 200, color: '#fff', borderBottomWidth: 1, borderColor: '#fff' } : { height: 40, width: 200, color: '#fff' }}
            onChangeText={(email) => this.setState({email})}
            placeholder= {'Email'}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'#fff'}
          />
          <TextInput
            style={Platform.OS === 'ios' ? { height: 40, width: 200, marginTop: 5, color: '#fff', borderBottomWidth: 1, borderColor: '#fff' } : { height: 40, width: 200, marginTop: 5, color: '#fff' } }
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
            placeholder= {'Password'}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'#fff'}
          />
          {
            login &&
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleClick('login')}
              >
                <Text
                  style={{fontWeight: 'bold'}}
                > 
                  LOGIN 
                </Text>
              </TouchableOpacity>
          }
          {
            register && 
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleClick('register')}
              >
                <Text
                  style={{fontWeight: 'bold'}}
                > 
                  REGISTER 
                </Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  fieldsContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 60
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    padding: 10
  },
})
