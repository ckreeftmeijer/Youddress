import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native';
import AddressPage from "../pages/AddressPage.ios"



class Friends extends Component {

  constructor(){
    super();
  }


  goToAddress(id) {
      this.props.navigator.push({
                 title: 'Address',
                 component: AddressPage,
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

    // let users = this.props.users.map(function(user) {
    //     return <Text key={user.id}>{user.name}{user.address1}</Text>;
    //   });


    return (

      <View>

          {friendlist}
          {/* {users} */}

      </View>
    )
  }
}

export default Friends
