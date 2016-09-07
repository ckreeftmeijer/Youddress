
import React, { Component } from 'react';
import Login from "./Login.js"
import Friends from "./components/Friends.js"
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
      friends: [],
    };
  }

  componentDidMount(){
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
    // this.setState( { graphData: result } )
    this.setState( {
       fbID: result.id,
       fullName: `${result.first_name} ${result.last_name}`,
       firstName: result.first_name,
       lastName: result.last_name,
       friends: result.friends,
  } )
}
}

  render() {

    return (
      <View style={styles.container}>
        <Login />
        {/* <Text>{ this.state.fullName } </Text> */}
        <Friends friends={this.state.friends}/>
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
