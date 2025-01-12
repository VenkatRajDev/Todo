import {View, Text, StyleSheet, StatusBar, FlatList, Image} from 'react-native';
import React, {useContext} from 'react';
import {DataContext} from '../../GlobalDataProvider';
import {width, height} from '../../Themes/dimension';
import {useTheme} from '../../Themes/theme';
import {Icon} from 'react-native-elements';

const Completed = ({navigation}) => {
  const {completed} = useContext(DataContext);

  const theme = useTheme();
  return (
    <>
      {completed.length === 0 ? (
        <View
          style={[styles.emptyTaskContainer, {backgroundColor: theme.bgColor}]}>
          <View style={[styles.emptyImageView]}>
            <Image
              style={[styles.emptyImage]}
              source={require('../../assets/empty.png')}
            />
          </View>
          <StatusBar barStyle={theme.Color} backgroundColor={theme.bgColor} />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: theme.bgColor}}>
          <FlatList
            data={completed}
            renderItem={({item, index}) => {
              return (
                <View style={[styles.eachTaskView]}>
                  <View
                    style={[
                      styles.num,
                      {backgroundColor: theme.buttonBgColor},
                    ]}>
                    <Text
                      style={[styles.numtext, {color: theme.buttonTextColor}]}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={[styles.eachTaskText, {color: theme.Color}]}>
                    {item.completed}
                  </Text>
                </View>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View
                  style={[
                    styles.Heading,
                    {backgroundColor: theme.buttonBgColor},
                  ]}>
                  <Icon
                    name="arrow-left"
                    type="font-awesome"
                    color={theme.buttonTextColor}
                    size={25}
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  />

                  <Text
                    style={[
                      styles.HeadingText,
                      {color: theme.buttonTextColor},
                    ]}>
                    Your Task
                  </Text>
                </View>
              );
            }}
            stickyHeaderIndices={[0]}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          <StatusBar
            barStyle={theme.buttonTextColor}
            backgroundColor={theme.buttonBgColor}
          />
        </View>
      )}
    </>
  );
};

export default Completed;

const styles = StyleSheet.create({
  emptyTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageView: {
    width: width * 0.5,
    height: height * 0.25,
  },
  emptyImage: {
    width: '100%',
    height: '100%',
  },
  Heading: {
    height: height * 0.08,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  HeadingText: {
    fontSize: 25,
    fontWeight: '600',
    flexGrow: 0.6,
  },
  eachTaskView: {
    width: width,
    height: height * 0.08,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  num: {
    width: width * 0.1,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numtext: {
    fontSize: 20,
    fontWeight: '500',
  },
  eachTaskText: {
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 35,
    width: width * 0.75,
  },
});