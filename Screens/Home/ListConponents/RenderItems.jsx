import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {height, width} from '../../../Themes/dimension';
import {useTheme} from '../../../Themes/theme';
import {CheckBox} from 'react-native-elements';
import {DataContext} from '../../../GlobalDataProvider';

const RenderItems = ({item, index}) => {
  const [deletedValue, setDeleteValue] = useState();
  const [clicked, setClicked] = useState(false);

  const animatedValue = useRef(new Animated.Value(1)).current;

  const theme = useTheme();

  // set global state
  const {setList} = useContext(DataContext);
  const {setCompleted} = useContext(DataContext);

  const taskDeleteMethod = useCallback(() => {
    Animated.spring(animatedValue, {
      toValue: 0,
      speed: 15,
      bounciness: 7.5,
      useNativeDriver: true,
    }).start(() => console.log(`animation is started`));

    setList(taskArray => {
      const newArray = taskArray.filter(
        elements => elements.id != deletedValue,
      );
      return newArray;
    });
    console.log(`task is deleted sucessfully`);
  }, [deletedValue]);

  const toStoreCompletedTask = useCallback(() => {
    setCompleted(Array => {
      if (Array.some(elements => elements.completed === item.task)) {
        const newArray = Array.filter(elements => {
          return elements.completed != item.task;
        });
        return newArray;
      } else {
        const newarray = [
          ...Array,
          {completed: item.task, id: Array.length + 1},
        ];
        console.log(`data is stored sucessfully`);
        return newarray;
      }
    });
  }, [item.task]);

  return (
    <Animated.View
      style={[styles.container, {transform: [{scale: animatedValue}]}]}>
      <View style={styles.listTextView}>
        <CheckBox
          checked={clicked}
          onPressIn={() => setClicked(!clicked)}
          onPressOut={toStoreCompletedTask}
          checkedColor={theme.Color}
        />
        <Text style={[styles.listText, {color: theme.Color}]}>
          {item?.task}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.buttonBgColor}]}
        onPressIn={() => {
          setDeleteValue(item.id);
          console.log(`id ${item.id} is Added sucessfully`);
        }}
        onPressOut={taskDeleteMethod}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Delete
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RenderItems;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 5,
  },
  listTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  listText: {
    fontSize: 16,
    fontWeight: '800',
    width: width * 0.5,
  },
  button: {
    width: width * 0.25,
    height: height * 0.045,
    borderRadius: 100 / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});