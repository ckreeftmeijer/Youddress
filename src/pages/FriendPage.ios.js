import React, { Component } from 'react';
import Friends from "../components/Friends"
import AddressPage from "./AddressPage.ios"
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';


class FriendPage extends Component {

constructor(){
  super();

  this.state = {
    loading: true,
  };
}

componentDidMount(){


  fetch("https://peaceful-stream-54894.herokuapp.com/users.json", {method: "GET"})
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
      {this.state.loading ?
        <ActivityIndicator
            animating={true}
            style={[styles.centering, {height: 80}]}
            size="large"/> :
        <View style={styles.frienddiv}>
            <Image source={{uri: 'https://res.cloudinary.com/ckreeftmeijer/image/upload/v1473930385/textlogo_rgcpia.png'}}
              style={styles.logo}/>
            <Friends
                friends={this.props.friends}
                users={this.state.users}
                navigator={this.props.navigator}/>
          </View>}

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EC5E3',
  },
  logo: {
    height: 30,
    width: 200,
  },
  frienddiv: {
    alignItems: 'center',
  }
});

export default FriendPage
