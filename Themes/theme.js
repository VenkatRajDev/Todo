import {useColorScheme} from 'react-native';
import {createContext, useContext} from 'react';

const ThemeContext = createContext();

const lightTheme = {
  bgColor: 'azure',
  Color: '#242124',
  buttonBgColor: '#242124',
  buttonTextColor: 'azure',
  placeholderColor: 'lightgrey',
};

const darkTheme = {
  bgColor: '#242124',
  Color: 'seashell',
  buttonBgColor: 'lightslategrey',
  buttonTextColor: '#242124',
  placeholderColor: 'white',
};

export const ThemeProvider = ({children}) => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);