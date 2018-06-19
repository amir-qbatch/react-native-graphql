import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import AmazonInventoryReducers from '../amazonInventory-middleware/reducers/ProductsApp';
import AuthReducers from '../amazonInventory-middleware/reducers/Auth';
import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Settings');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'DELETE_PRODUCTS' : 
      return {
        ...state,
        fetching: true
      }
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

const AppReducer = combineReducers({
  nav,
  AmazonInventoryReducers,
  AuthReducers
});

export default AppReducer;
