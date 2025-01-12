import {View, StatusBar} from 'react-native';
import React from 'react';
import {useTheme} from '../../Themes/theme';

import Heading from './Heading';
import Fotter from './Fotter';
import MIddleContent from './MIddleContent';

const HomeMain = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <Heading />
      <MIddleContent navigation={navigation} />
      <Fotter navigation={navigation} />
      <StatusBar
        barStyle={theme.buttonTextColor}
        backgroundColor={theme.buttonBgColor}
      />
    </View>
  );
};

export default HomeMain;