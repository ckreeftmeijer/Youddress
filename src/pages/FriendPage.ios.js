import React, { Component } from 'react';
import Friends from "../components/Friends"
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} = FBSDK;

class FriendPage extends Component {

constructor(){
  super();
  const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://www.facebook.com/",
  };

  this.state = {
    shareLinkContent: shareLinkContent,
    friends: [],
  };
}


render() {
    return (
      <View style={styles.container}>
        <Friends friends={this.props.friends}/>
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
