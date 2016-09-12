import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native';



class Friends extends Component {


  render() {

    const myFriends = this.props.friends.data

    return (

      <View>
        <Text>
          {console.log(this.props.friends.data)}
          lala
        </Text>
      </View>
    )
  }
}

export default Friends
