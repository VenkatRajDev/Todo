import 'react-native-gesture-handler';
import {StatusBar, useColorScheme, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from './Themes/theme';
import GlobalDataProvider from './GlobalDataProvider';
import {getUserData} from './AsyncStorage';
import {Bounce} from 'react-native-animated-spinkit'

//create a stack navigaor
const Stack = createStackNavigator();

//import screens
import WelcomeMain from './Screens/Welcome/WelcomeMain';
import HomeMain from './Screens/Home/HomeMain';
import AddTask from './Screens/ADDTask/AddTask';
import AllTask from './Screens/AllTask/AllTask';
import Completed from './Screens/Completed/Completed';

const App = () => {
  const theme = useColorScheme();
  const [isVisited, setIsVisited] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLogInInfo = async () => {
      try {
        setLoading(true);
        const data = await getUserData('logedIn');
        if (data === 'true') {
          setIsVisited(true);
        } else {
          setIsVisited(false);
        }
      } catch (Error) {
        console.log(`Error => ${Error} while retriving userLogIn`);
      } finally {
        setLoading(false);
      }
    };
    getLogInInfo();
  }, []);

  return (
    <>
      {loading || isVisited === null ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Bounce size={35} color= {theme === 'dark' ? 'lightslategrey' : '#242124'} />
        </View>
      ) : (
        <GlobalDataProvider>
          <ThemeProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {isVisited ? (
                  <Stack.Screen name="Home" component={HomeMain} />
                ) : (
                  <Stack.Screen name="welcomeMain" component={WelcomeMain} />
                )}
                <Stack.Screen
                  name="AddTask"
                  component={AddTask}
                  options={{animation: 'fade_from_bottom'}}
                />
                <Stack.Screen
                  name="AllTask"
                  component={AllTask}
                  options={{animation: 'scale_from_center'}}
                />
                <Stack.Screen
                  name="Completed"
                  component={Completed}
                  options={{animation: 'scale_from_center'}}
                />
              </Stack.Navigator>
              <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={theme === 'light' ? 'snow' : '#242124'}
              />
            </NavigationContainer>
          </ThemeProvider>
        </GlobalDataProvider>
      )}
    </>
  );
};

export default App;