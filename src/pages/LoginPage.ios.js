import React, { Component } from 'react';
import Login from "../components/Login.js"
import FriendPage from "./FriendPage.ios"

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

class LoginPageNav extends Component {

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

componentWillMount(){
  AccessToken.getCurrentAccessToken().then(
    (data) => {
      let accessToken = data.accessToken
      // console.log(accessToken.toString())

  const infoRequest = new GraphRequest(
  '/me',{
                accessToken: accessToken.toString(),
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name,friends{name,picture}'
                  }
                }
              },
  this._responseInfoCallback.bind(this),
);

new GraphRequestManager().addRequest(infoRequest).start();
})
}

_responseInfoCallback(error: ?Object, result: ?Object) {
if (error) {
  alert('Error fetching data: ' + error.toString());
} else {
  // console.log(result);
  // console.log(result.friends);
  // console.log(result.friends.data[0]);
  // this.setState( { graphData: result } )
    this.setState( {
       fbID: result.id,
       fullName: `${result.first_name} ${result.last_name}`,
       firstName: result.first_name,
       lastName: result.last_name,
       friends: result.friends,
     } )
    //  console.log(result.friends.data[0].name)
     this.goDerper()
  }
}


goDerper() {
    this.props.navigator.push({
               title: 'Friends',
               component: FriendPage,
               passProps: {friends: this.state.friends}
           });
  }

  render() {

    return (
      <View style={styles.container}>
        <Login />
          {/* <Text>{ this.state.friendz } </Text> */}
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
    flexDirection: 'row',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});

export default LoginPageNav
