
import React, { Component } from 'react';
import LoginPageNav from "./src/pages/LoginPage.ios"
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NavigatorIOS,
} from 'react-native';



class Youddress extends Component {


  render() {

    return (
      <NavigatorIOS
             style={styles.container}
             initialRoute={{
               title: 'Login Page',
               component: LoginPageNav,
             }}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});





AppRegistry.registerComponent('Youddress', () => Youddress);
