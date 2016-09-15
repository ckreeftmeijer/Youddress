import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
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
      return <View
                  key={friend.id}
                  style={styles.frienditem}>
                <Image source={{uri: friend.picture.data.url}}
                  style={styles.friendimg}/>
                <Text
                  style={styles.friendname}
                  onPress={_ => self.goToAddress(friend.id)}>{friend.name}
                </Text>
            </View>
    });


    return (

      <View style={styles.friendwrapper}>
          {friendlist}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  friendwrapper: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 50,
    marginTop: 20,
    width: 300,
    borderWidth: 4,
    borderColor: '#d6d7da'
  },
  frienditem: {
    marginLeft: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 5,
  },
  friendname: {
    marginLeft: 15,
    marginTop: 20,
  },
  friendimg: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
});

export default Friends
