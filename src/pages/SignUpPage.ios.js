import React, { Component } from 'react';
import FriendPage from "./FriendPage.ios"
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Form,InputField, PickerField } from 'react-native-form-generator';



class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }

  handleFormChange(formData){
    this.setState({formData:formData})
}

submitForm(){
  const { address1, address2, city, postal, country } = this.state.formData
    fetch('https://peaceful-stream-54894.herokuapp.com/users.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                  fbid: this.props.fbID,
                  name: this.props.fullName,
                  address1: address1,
                  address2: address2,
                  city: city,
                  postal: postal,
                  country: country,
        })
    })
    this.gotoFriends()
}

gotoFriends() {
    this.props.navigator.push({
               title: 'Friends',
               component: FriendPage,
               passProps: {friends: this.props.friends,
                           navigator: this.props.navigator}
           });
}

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.header}>SIGN UP</Text>
        <ScrollView keyboardShouldPersistTaps={true} style={styles.view}>
          <Form
            ref='registrationForm'
            onChange={this.handleFormChange.bind(this)}
            label="Personal Information"
            style={styles.form}>

            <InputField ref='address1' placeholder='Address line 1'/>
            <InputField ref='address2' placeholder='Address line 2 (optional)'/>
            <InputField ref='city' placeholder='City'/>
            <InputField ref='postal' placeholder='Postal Code'/>
            <PickerField ref='country'
              label='Country'
              options={{
                "": '',
                NL: 'The Netherlands',
                DE: 'Germany',
                SP: 'Spain',
                CA: 'Canada',
                BE: 'Belgium',
                US: 'The United States of America'
              }}/>
          </Form>
        </ScrollView>
        <TouchableHighlight style={styles.button} onPress={() => this.submitForm()}>
          <Text>Submit</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: 350,
    paddingLeft:10,
    paddingRight:10,
  },
  form: {
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#d6d7da',
  },
  button: {
    width: 330,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1EC5E3',
    marginBottom: 200,
  },
  header: {
    color: '#1EC5E3',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50
  }
});
export default SignUp
