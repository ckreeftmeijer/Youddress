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
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';



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
    fetch('http://localhost:3000/users.json', {
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

      <ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10, height:200}}>
        <Form
          ref='registrationForm'
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">

          <Separator />

          <InputField ref='address1' placeholder='Address line 1'/>
          <InputField ref='address2' placeholder='Address line 2 (optional)'/>
          <InputField ref='city' placeholder='City'/>
          <InputField ref='postal' placeholder='Postal Code'/>
          <PickerField ref='country'
            label='Country'
            options={{
              "": '',
              NL: 'The Netherlands',
              US: 'The United States of America'
            }}/>
        </Form>

          <TouchableHighlight onPress={() => this.submitForm()}>
            <Text>Submit</Text>
          </TouchableHighlight>

      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});
export default SignUp
