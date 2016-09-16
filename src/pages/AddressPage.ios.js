import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import jQuery from 'jquery';


class AddressPage extends Component {


render() {
  let self = this

  let address = this.props.users.filter(function( user ) {
    return user.fbid == self.props.userId;})
    
    return (
      <View style={styles.container}>
      <Image source={{uri: this.props.image}}
        style={styles.userimage}/>
        <Text style={styles.addressitem}>Name: {address[0].name}</Text>
        <Text style={styles.addressitem}>Address:{address[0].address1}</Text>
        <Text style={styles.addressitem}>Address:{address[0].address2}</Text>
        <Text style={styles.addressitem}>Zip Code: {address[0].postal}</Text>
        <Text style={styles.addressitem}>City: {address[0].city}</Text>
        <Text style={styles.addressitem}>Country: {address[0].country}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#1EC5E3',
  },
  addressitem: {
    marginTop: 10,
    paddingTop: 20,
    paddingLeft: 20,
    marginLeft: 40,
    height: 50,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  userimage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 165,
  }
});

export default AddressPage
