import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from '../../../Themes/dimension';
import {useTheme} from '../../../Themes/theme';

const taskdata = [`All Task`, `Completed`];

const ListHeader = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {taskdata.map((element, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.buttons, {backgroundColor: theme.buttonBgColor}]}
            onPress={() =>
              index === 0
                ? navigation.navigate('AllTask')
                : navigation.navigate('Completed', {message: ``})
            }>
            <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
              {element}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: width * 0.45,
    height: height * 0.1,
    padding: 15,
    margin: 10,
    borderRadius: 100 / 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
  },
});