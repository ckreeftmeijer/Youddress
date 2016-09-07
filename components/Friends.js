import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native';



class Friends extends Component {


  render() {
  const myFriends = this.props.friends.data

for (var key in myFriends) {
  console.log(Object.values(myFriends[key]))
}


    return (

      <View>
    <Text>{console.log(myFriends)}</Text>
      </View>
    )
  }
}

export default Friends
