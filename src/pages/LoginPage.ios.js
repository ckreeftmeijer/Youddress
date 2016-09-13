import React, { Component } from 'react';
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
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager,
} = FBSDK;

class LoginPageNav extends Component {

// constructor(){
//   super();
//   const shareLinkContent = {
//     contentType: 'link',
//     contentUrl: "https://www.facebook.com/",
//   };
//
//   this.state = {
//
//   };
// }


  loginButton() {
    var self = this
   LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        self.getData()
      }
    },
    function(error) {
      alert('Login fail with error: ' + error);
    }
   )
  }



  componentDidMount(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        let accessToken = data.accessToken
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
    this.setState( {
       fbID: result.id,
       fullName: `${result.first_name} ${result.last_name}`,
       firstName: result.first_name,
       lastName: result.last_name,
       friends: result.friends,
     } )

       this.gotoFriends()

    }
  }


  gotoFriends() {
      this.props.navigator.push({
                 title: 'Friends',
                 component: FriendPage,
                 passProps: {friends: this.state.friends}
             });
  }

  render() {

    return (

      <View style={styles.container}>
        <TouchableHighlight onPress={this.loginButton} underlayColor="blue">
          <Text>Login</Text>
        </TouchableHighlight>
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
});

export default LoginPageNav
