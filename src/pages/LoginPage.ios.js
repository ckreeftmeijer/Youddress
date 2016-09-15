import React, { Component } from 'react';
import FriendPage from "./FriendPage.ios"
import SignUpPage from "./SignUpPage.ios"

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

  constructor(props){
    super(props);
    this.state = {
      navigationBarHidden: true,
      loading: false,
    }
  }


  loginButton() {
   let self = this
   LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        self.setState( {
           loading: true,
         } )
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
        {accessToken.length > 0 ? this.getData() : console.log(false)}
    }
  )
}


  getData(){
    console.log("test")
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
      this.newUser()
    }
  }

  newUser(){
      let self = this

      fetch("http://localhost:3000/users.json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          self.setState( {
             loading: false,
           } )
          let userCheck = responseData.filter(function( user ) {
            return user.fbid == self.state.fbID;})
            {userCheck.length > 0 ? self.gotoFriends() : self.gotoSignUp()}
        })
        .done();
  }


  gotoFriends() {
      this.props.navigator.push({
                 title: 'Friends',
                 component: FriendPage,
                 passProps: {friends: this.state.friends,
                             navigator: this.props.navigator}
             });
  }

  gotoSignUp() {
    this.props.navigator.push({
               title: 'SignUp',
               component: SignUpPage,
               passProps: {friends: this.state.friends,
                           fbID: this.state.fbID,
                           fullName: this.state.fullName,
                           navigator: this.props.navigator}
           });
  }

  render() {

    return (

      <View style={styles.container}>
        {this.state.loading? null :
          <TouchableHighlight onPress={() => this.loginButton()} underlayColor="blue">
            <Text>Login</Text>
          </TouchableHighlight>}
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
