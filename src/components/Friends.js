import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native';



class Friends extends Component {

  render() {
    let self = this

    let friendlist = this.props.friends.data.map(function(friend) {
      return <Text key={friend.id}>
                <Image source={{uri: friend.picture.data.url}}
                  style={{width: 50, height: 50}} />
                {friend.name}
                {console.log(self.props.users.filter(function( obj ) {
                  return obj.fbid == friend.id;}))}
              </Text>
    });

    let users = this.props.users.map(function(user) {
        return <Text key={user.id}>{user.name}{user.address1}</Text>;
      });


    return (

      <View>

          {friendlist}
          {users}

      </View>
    )
  }
}

export default Friends
