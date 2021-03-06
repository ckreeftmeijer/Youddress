import React, { Component } from 'react';
import FriendPage from "./FriendPage.ios"
import SignUpPage from "./SignUpPage.ios"

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ActivityIndicator,
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
      loading: true,
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
        {data == null ?
          this.setState( {
               loading: false,
             } )
             : this.getData()}
    }
  )
}


  getData(){
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          let accessToken = data.accessToken
          const infoRequest = new GraphRequest(
          '/me',{
                        accessToken: accessToken.toString(),
                        parameters: {
                          fields: {
                            string: 'name,first_name,middle_name,last_name,friends{name,picture}'
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

      fetch("https://peaceful-stream-54894.herokuapp.com/users.json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
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
        <Image source={{uri: 'https://res.cloudinary.com/ckreeftmeijer/image/upload/v1473930385/textlogo_rgcpia.png'}}
          style={styles.logo}/>

        {this.state.loading?
          <ActivityIndicator
              animating={true}
              style={[styles.centering, {height: 80}]}
              size="large"/>  :
          <TouchableHighlight
              onPress={() => this.loginButton()}
              underlayColor="#617db5"
              style={styles.button}>
            <Text style={styles.fbtext}>Login with Facebook</Text>
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
    backgroundColor: '#1EC5E3',
    flexDirection: 'column',
  },
  button: {
    width: 180,
    height: 45,
    backgroundColor: '#3b5998',
    alignItems: 'center',
   justifyContent: 'center',
  },
  fbtext: {
    color: '#fff',
    fontWeight: 'bold'
  },
  logo: {
    height: 30,
    width: 200,
    marginBottom: 100
  }
});

export default LoginPageNav
