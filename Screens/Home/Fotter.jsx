import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {height, width} from '../../Themes/dimension';
import {useTheme} from '../../Themes/theme';

const Fotter = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.buttonBgColor}]}
        onPress={() => navigation.navigate('AddTask')}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Add Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fotter;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
  },
});