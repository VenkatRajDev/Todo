import {View, StyleSheet, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {useTheme} from '../../Themes/theme';
import {DataContext} from '../../GlobalDataProvider';
import RenderItems from './ListConponents/RenderItems';
import ListHeader from './ListConponents/ListHeader';

const MIddleContent = ({navigation}) => {
  const theme = useTheme();

  const {list} = useContext(DataContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      <FlatList
        data={list}
        renderItem={({index, item}) => (
          <RenderItems item={item} index={index} />
        )}
        ListHeaderComponent={() => <ListHeader navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
export default MIddleContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableViewStyle: {},
});