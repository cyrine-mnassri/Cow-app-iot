import { Image, View,Button,StyleSheet } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
export default class OnboardingScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor(props) {
        super(props);
   
    }


    

    render() {
        return (
    <Onboarding
    onSkip={()=> this.props.navigation.navigate("Login")}
    onDone={()=> this.props.navigation.navigate("Login")}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/Picture_SPLASH1.png')} />,
        title: 'Controlling your Cattles health',
        subtitle: 'Done with React Native Onboarding Swiper',
        titleStyles: { color: 'red' }, // overwrite default color
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../assets/Picture_SPLASH2.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../assets/Picture_SPLASH3.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);


}}

const styles = StyleSheet.create({
    container: {
        flex: 1


    }
});
