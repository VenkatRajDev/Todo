import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  DevSettings,
} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {width} from '../../Themes/dimension';
import {useTheme} from '../../Themes/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StoreUserData} from '../../AsyncStorage';
import {DataContext} from '../../GlobalDataProvider';

const NameField = ({navigation}) => {
  const theme = useTheme();

  const {userName, setUserName} = useContext(DataContext);

  // save user name
  useEffect(() => {
    const storingData = async () => {
      try {
        await StoreUserData(`name`, userName);
      } catch (Error) {
        console.log(`Error => ${Error} occurs while storing userName`);
      }
    };
    storingData();
  }, [userName]);

  const userVisited = useCallback(async () => {
    try {
      await StoreUserData('logedIn', `true`);
      console.log(`loged in is true`);
    } catch (Error) {
      console.log(`Error => ${Error} occurs while storing userLogIn`);
    }
    console.log(`exit fucntion when sucessfully exicuted`);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      <Text style={[styles.namefieldText, {color: theme.Color}]}>
        Enter Your Name Below
      </Text>

      <TextInput
        style={[
          styles.inputfield,
          {backgroundColor: theme.buttonBgColor, color: theme.buttonTextColor},
        ]}
        placeholder="Enter Your Name"
        textAlign="center"
        placeholderTextColor={theme.placeholderColor}
        multiline={false}
        value={userName}
        onChangeText={cuName => setUserName(cuName)}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.buttonBgColor}]}
        onPressIn={userVisited}
        onPressOut={() => {
          DevSettings.reload();
        }}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Lets go
        </Text>
        <Icon name="navigate-next" size={30} color={theme.buttonTextColor} />
      </TouchableOpacity>
    </View>
  );
};

export default NameField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242124',
  },
  namefieldText: {
    fontSize: 35,
    bottom: 50,
    color: 'snow',
  },
  inputfield: {
    width: width * 0.8,
    height: 40,
    backgroundColor: 'snow',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    width: width * 0.9,
    height: 45,
    backgroundColor: 'snow',
    borderRadius: 100 / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
