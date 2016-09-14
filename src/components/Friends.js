import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native';
import AddressPage from "../pages/AddressPage.ios"



class Friends extends Component {


  goToAddress(id) {
      this.props.navigator.push({
                 title: 'Address',
                 component: AddressPage,
                 navigationBarHidden: false,
                 passProps: {userId: id,
                            users: this.props.users}
      });

  }

  render() {
    let self = this

    let friendlist = this.props.friends.data.map(function(friend) {
      return <Text onPress={_ => self.goToAddress(friend.id)} key={friend.id}>
                <Image source={{uri: friend.picture.data.url}}
                  style={{width: 50, height: 50}} />
                {friend.name}

              </Text>
    });


    return (

      <View>

          {friendlist}


      </View>
    )
  }
}

export default Friends
