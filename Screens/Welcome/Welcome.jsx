import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {width} from '../../Themes/dimension';
import {useTheme} from '../../Themes/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import required screen
import NameField from './NameField';

const Welcome = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      <Text style={[styles.welcomeText, {color: theme.Color}]}>
        Improve Your Productivity with us
      </Text>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.buttonBgColor}]}
        onPress={() => {
          navigation.push('NameField');
        }}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Continue
        </Text>

        <Icon name="navigate-next" size={30} color={theme.buttonTextColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: '500',
  },
  button: {
    width: width * 0.9,
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    borderRadius: 100 / 2,
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});