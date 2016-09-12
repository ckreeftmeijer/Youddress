import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native';



class Friends extends Component {

  render() {
    let friendlist = this.props.friends.data.map(function(friend) {
      return <Text key={friend.id}>
                <Image source={{uri: friend.picture.data.url}}
                  style={{width: 50, height: 50}} />
                {friend.name}
              </Text>
    });


    return (

      <View>

          {friendlist}
          {console.log(this.props.friends.data[0].picture.data.url)}


      </View>
    )
  }
}

export default Friends
