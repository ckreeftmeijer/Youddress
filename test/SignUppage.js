import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignUpPage from "../src/pages/SignUpPage.ios"
import { Form,InputField, PickerField } from 'react-native-form-generator';


describe('<SignUpPage />', () => {
  it('it should render 4 InputField components', () => {
    const wrapper = shallow(<SignUpPage/>);
    expect(wrapper.find(InputField)).to.have.length(4);
  });

  it('it should render 1 PickerField component', () => {
    const wrapper = shallow(<SignUpPage/>);
    expect(wrapper.find(PickerField)).to.have.length(1);
  });

  it('should have props for friends and navigator', function () {
    const wrapper = shallow(<SignUpPage/>);
    expect(wrapper.props().friends).to.be.defined;
    expect(wrapper.props().navigator).to.be.defined;
  });

});
