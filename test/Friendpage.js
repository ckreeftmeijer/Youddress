import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FriendPage from "../src/pages/FriendPage.ios"
import Friends from "../src/components/Friends"
import { ActivityIndicator } from 'react-native';


describe('<FriendPage />', () => {
  it('it should render 1 view component', () => {
    const wrapper = shallow(<FriendPage/>);
    expect(wrapper.find(View)).to.have.length(1);
  });


  it('should render Friends component when state.loading === false', () => {
     const wrapper = shallow(<FriendPage />);
     wrapper.setState({loading: false});
    expect(wrapper.find(Friends)).to.have.length(1);
   });

   it('should render ActivityIndicator by default', () => {
      const wrapper = shallow(<FriendPage />);
     expect(wrapper.find(ActivityIndicator)).to.have.length(1);
    });


  it('should have props for friends and navigator', function () {
    const wrapper = shallow(<FriendPage/>);
    expect(wrapper.props().friends).to.be.defined;
    expect(wrapper.props().navigator).to.be.defined;
  });

});
