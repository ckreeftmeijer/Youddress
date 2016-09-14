
import React, { Component } from 'react';
import LoginPageNav from "./src/pages/LoginPage.ios"
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';


class Youddress extends Component {


  render() {

    return (
      <NavigatorIOS
             style={styles.container}
             navigationBarHidden={true}
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
