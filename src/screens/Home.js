import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Platform } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { LinearGradient } from 'expo';
import AppHOC from '../hoc/AppHOC';
import { connect } from 'react-redux';
import getProducts from '../amazonInventory-middleware/actions/GetProducts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 0,
      offset: 10
    }
  }

  componentDidMount() {
    const { dispatch, client } = this.props;
    const { first, offset } = this.state; 
    dispatch(getProducts(client, first, offset));
  }
  render() {
    const { products } = this.props;
    return (
      <LinearGradient
        colors={['#2cb5e8', '#1fc8db', '#0fb8ad']}
        style={styles.container}
      >
        <View>
          <Text style={styles.heading}>PRODUCTS</Text>
        </View>
        <List 
          containerStyle={ Platform.OS === 'ios' 
          ? 
            { width: 360, opacity: 0.8 } 
          : 
            { marginBottom: 10, width: 400, opacity: 0.8 } }
          
          chevronColor={'#bdc6cf'}
        >
        {
          products.map((l, i) => (
            <TouchableOpacity key={i}>
              <ListItem
                roundAvatar
                avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                title={l.listPrice}
              />
            </TouchableOpacity>
          ))
        }
        </List>
      </LinearGradient>
    )
  }
}
export default connect(
  state => ({
    products: state.AmazonInventoryReducers && state.AmazonInventoryReducers.getProducts ? state.AmazonInventoryReducers.getProducts.product: [],
    total: state.getProductsCount ? state.getProductsCount.count : 0
  })
)(AppHOC(Home));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 18
  }
})
