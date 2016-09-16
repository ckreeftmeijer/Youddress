import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import AddressPage from "../pages/AddressPage.ios"



class Friends extends Component {

  goToAddress(id, imgurl) {
      this.props.navigator.push({
                 title: 'Address',
                 component: AddressPage,
                 navigationBarHidden: false,
                 passProps: {userId: id,
                            users: this.props.users,
                            image: imgurl}
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
                  onPress={_ => self.goToAddress(friend.id, friend.picture.data.url)}>{friend.name}
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
    flex: 1,
    paddingTop: 50,
    marginTop: 20,
    width: 300,
  },
  frienditem: {
    marginLeft: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  friendname: {
    marginLeft: 15,
    marginTop: 20,
  },
  friendimg: {
    width: 50,
    height: 50,
  },
});

export default Friends
