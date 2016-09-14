import React, { Component } from 'react';
import Friends from "../components/Friends"
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import jQuery from 'jquery';


class FriendPage extends Component {

constructor(){
  super();

  this.state = {
    loading: true
  };
}

componentDidMount(){


  fetch("http://localhost:3000/users.json", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState( {
        users: responseData,
        loading: false} )
    })

    .done();
}


render() {


    return (
      <View style={styles.container}>
      {this.state.loading ? null :
        <Friends friends={this.props.friends} users={this.state.users}/>}
        <Text></Text>
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

export default FriendPage
