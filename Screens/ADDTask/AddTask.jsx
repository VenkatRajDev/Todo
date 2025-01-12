import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {useTheme} from '../../Themes/theme';
import {StatusBar} from 'react-native';
import {height, width} from '../../Themes/dimension';
import {DataContext} from '../../GlobalDataProvider';

const AddTask = ({navigation}) => {
  const theme = useTheme();

  const {task, setTask, list, setList} = useContext(DataContext);

  const DarkTheme = useColorScheme() === 'dark' ? true : false;

  const [alretMsg, setAlretMsg] = useState(``);
  const notifyValue = useRef(new Animated.Value(0)).current;

  const HandleAnimation = () => {
    Animated.sequence([
      Animated.spring(notifyValue, {
        toValue: 1,
        friction: 5,
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.delay(1000),

      Animated.spring(notifyValue, {
        toValue: 0,
        friction: 5,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const setNotificationMsg = () => {
    if (task === '') {
      setAlretMsg(`Enter The Task First`);
    } else if (list.some(ele => ele.task === task)) {
      setAlretMsg(`${task} Task is Already In Process`);
    } else {
      setAlretMsg(`Task Added Sucessfully`);
    }
  };

  const Add = useCallback(() => {
    if (task === '') {
      HandleAnimation();
    } else if (list.some(ele => ele.task === task)) {
      HandleAnimation();
    } else {
      setList(listArray => {
        const newArray = [...listArray, {task: task, id: listArray.length + 1}];
        return newArray;
      });
      HandleAnimation();
    }
  }, [task, list]);

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      {/* Heaing View */}
      <View style={[styles.Heading, {backgroundColor: theme.buttonBgColor}]}>
        <Text style={[styles.HeadingText, {color: theme.buttonTextColor}]}>
          Add Task
        </Text>
      </View>

      {/* Middle Task Input View */}
      <View style={styles.MiddleView}>
        <Text
          style={[
            styles.HeadingText,
            {color: theme.Color},
            styles.taskHeadingText,
          ]}>
          Enter Your New Task
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.buttonBgColor,
              color: theme.buttonTextColor,
            },
            styles.buttonText,
          ]}
          placeholder="Add Your New Task"
          placeholderTextColor={theme.placeholderColor}
          value={task}
          onChangeText={text => setTask(text)}
          multiline={false}
          returnKeyType="done"
          autoFocus={true}
        />
      </View>

      {/* Fotter Two Buttons View */}
      <View style={[styles.fotterView]}>
        {/* this View for Notification */}
        <Animated.View
          style={[
            styles.notification,
            {
              backgroundColor: DarkTheme ? '#637283' : theme.buttonBgColor,
              opacity: notifyValue,
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  alretMsg === `Task Added Sucessfully`
                    ? '#1ad91a'
                    : '#ff1818eb',
              },
            ]}>
            {alretMsg}
          </Text>
        </Animated.View>

        <TouchableOpacity
          style={[styles.buttons, {backgroundColor: theme.buttonBgColor}]}
          onPressIn={setNotificationMsg}
          onPressOut={Add}>
          <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
            ADD
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttons, {backgroundColor: theme.buttonBgColor}]}
          onPress={() => {
            setTask(``);
            navigation.goBack();
          }}>
          <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
            DISCARD
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar
        barStyle={theme.buttonTextColor}
        backgroundColor={theme.buttonBgColor}
      />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Heading: {
    flex: 0.15,
    padding: 10,
    justifyContent: 'center',
  },
  HeadingText: {
    fontSize: 30,
    fontWeight: '500',
  },
  MiddleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskHeadingText: {
    padding: 10,
  },
  input: {
    width: width * 0.7,
    height: height * 0.08,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  fotterView: {
    flex: 0.5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'flex-end',
  },
  buttons: {
    width: width * 0.4,
    height: height * 0.08,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  notification: {
    width: width * 0.7,
    height: 60,
    position: 'absolute',
    top: 0,
    right: 53,
    borderRadius: 100 / 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});