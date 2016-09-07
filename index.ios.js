
import React, { Component } from 'react';
import Login from "./Login.js"
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} = FBSDK;




class Youddress extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://www.facebook.com/",
    };

    this.state = {
      shareLinkContent: shareLinkContent,
      isLoading: false,
      message: '',
    };
  }
//
//   _handleResponse(response) {
//   this.setState({ isLoading: false , message: '' });
//   if (response.application_response_code.substr(0, 1) === '1') {
//     console.log('Properties found: ' + response.listings.length);
//   } else {
//     this.setState({ message: 'Location not recognized; please try again.'});
//   }
// }
//
//   componentDidMount(){
//     AccessToken.getCurrentAccessToken().then(
//       (data) => {
//         let accessToken = data.accessToken
//         console.log(accessToken.toString())
//
//         fetch('https://graph.facebook.com/me?access_token=' + accessToken.toString())
//         .then(response => response.json())
//         .then(json => this._handleResponse(json.response))
//         .catch(error =>
//            this.setState({
//             isLoading: false,
//             message: 'Something bad happened ' + error
//          }));
//       }
//     )
//
//   }

_responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    console.log(result);
    // this.setState({ message: 'Location not recognized; please try again.'});
  }
}

  render() {

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        let accessToken = data.accessToken
        console.log(accessToken.toString())

    const infoRequest = new GraphRequest(
    '/me',{
                  accessToken: accessToken.toString(),
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name,friends{name,picture}'
                    }
                  }
                },
    this._responseInfoCallback,
  );

  new GraphRequestManager().addRequest(infoRequest).start();
})
    return (
      <View style={styles.container}>
        <Login />
        <Text>{this.state.message}</Text>
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
  shareText: {
    fontSize: 20,
    margin: 10,
  }
});





AppRegistry.registerComponent('Youddress', () => Youddress);
