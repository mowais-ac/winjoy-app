import { Image } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper'; // 0.4.0

const Simple = () => (
  <Onboarding
  onDone={()=>alert("Done")}
  onSkip={()=>alert("Skiped")}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image 
        style={{height:300,width:300}}
        source={require('../../assets/imgs/banner.png')}
         />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../../assets/imgs/game.png')}
        style={{height:300,width:300}}
         />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../../assets/imgs/jeep.png')}
        style={{height:300,width:300}}
         />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default class index extends React.Component {
  render() {
    return (
      <Simple />
    );
  }
}
