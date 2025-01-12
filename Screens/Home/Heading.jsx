import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../Themes/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../../Themes/dimension';
import {Wave} from 'react-native-animated-spinkit';
import {getUserData} from '../../AsyncStorage';

const Heading = () => {
  const theme = useTheme();
  const currentTheme = useColorScheme();

  const [userName, setUserName] = useState(``);
  const [loading, setLoading] = useState(false);

  // fetch user Name
  useEffect(() => {
    const getUserName = async () => {
      try {
        setLoading(true);
        const name = await getUserData('name');
        setUserName(name || `guest`);
      } catch (Error) {
        console.log(`Error => ${Error} occurs while getuserName`);
      } finally {
        setLoading(false);
      }
    };
    getUserName();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.buttonBgColor}]}>
      <View style={[styles.NameContent]}>
        <Text style={[styles.HeaderText, {color: theme.buttonTextColor}]}>
          Todo
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.bgColor}]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: currentTheme === 'light' ? 'black' : theme.Color,
              width: '80%',
            },
          ]}>
          <Text style={{fontSize: 25, fontWeight: '450'}}>Heyy </Text>
          {loading ? (
            <Wave
              size={22}
              color={currentTheme === 'light' ? 'black' : theme.Color}
            />
          ) : (
            userName
          )}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    padding: 10,
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 30,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  NameContent: {
    width: width,
    paddingHorizontal: 10,
    height: height * 0.065,
    justifyContent: 'center',
  },
  button: {
    width: width * 0.8,
    height: height * 0.075,
    borderRadius: 100 / 2,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
});
