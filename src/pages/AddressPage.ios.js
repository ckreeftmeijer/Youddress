import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import jQuery from 'jquery';


class AddressPage extends Component {

render() {
  let self = this

  let address = this.props.users.filter(function( user ) {
    return user.fbid == self.props.userId;})
    console.log(address)
    return (
      <View style={styles.container}>

        <Text>{address[0].name}</Text>
        <Text>{address[0].address1}</Text>
        <Text>{address[0].address2}</Text>
        <Text>{address[0].postal}</Text>
        <Text>{address[0].city}</Text>
        <Text>{address[0].country}</Text>
      </View>
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
});

export default AddressPage
