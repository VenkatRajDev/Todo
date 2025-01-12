import {View, Text, StyleSheet, FlatList, StatusBar, Image} from 'react-native';
import React, {useContext} from 'react';
import {useTheme} from '../../Themes/theme';
import {DataContext} from '../../GlobalDataProvider';
import {Icon} from 'react-native-elements';
import {height, width} from '../../Themes/dimension';

const AllTask = ({navigation}) => {
  const theme = useTheme();

  const {list} = useContext(DataContext);

  return (
    <>
      {list.length === 0 ? (
        <View
          style={[styles.emptyTaskContainer, {backgroundColor: theme.bgColor}]}>
          <View style={[styles.emptyImageView]}>
            <Image
              style={[styles.emptyImage]}
              source={require('../../assets/empty.png')}
            />
          </View>
          <StatusBar barStyle={theme.Color} backroundColor={theme.bgColor} />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: theme.bgColor}}>
          <FlatList
            data={list}
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
                    {item.task}
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
            keyExtractor={(_, index) => index.toString()}
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

export default AllTask;

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