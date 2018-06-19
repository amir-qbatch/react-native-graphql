import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';

import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import { navigationPropConstructor } from '../utils/redux';

export  const AppNavigator =  createBottomTabNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if(routeName === 'Login') {
          iconName = `ios-checkmark${focused ? '' : '-outline'}`;
        } else if(routeName === 'Register') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = navigationPropConstructor(dispatch, nav);
    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
