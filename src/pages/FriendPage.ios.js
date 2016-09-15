import React, { Component } from 'react';
import Friends from "../components/Friends"
import AddressPage from "./AddressPage.ios"
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';


class FriendPage extends Component {

constructor(){
  super();

  this.state = {
    loading: true,
  };
}

componentDidMount(){


  fetch("http://localhost:3000/users.json", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState( {
        users: responseData,
        loading: false} )
    })

    .done();
}


render() {


    return (
      <View style={styles.container}>
      <Image source={{uri: 'https://res.cloudinary.com/ckreeftmeijer/image/upload/v1473930385/textlogo_rgcpia.png'}}
        style={styles.logo}/>
        {console.log(this.props.friends)}
      {this.state.loading ? null :
        <Friends friends={this.props.friends} users={this.state.users} navigator={this.props.navigator}/>}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EC5E3',
  },
  logo: {
    marginTop: 30,
    height: 30,
    width: 200,
  }
});

export default FriendPage
