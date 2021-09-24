import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  setShabadListModal,
  setShabad,
  setShabadModal,
  deleteShabad,
} from '../../redux/actions';

// import {barStyle} from '../assets/styleForEachOption';

export default function ShabadListModal({heading}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  return (
    <Modal
      visible={state.shabadShabadListModalShown}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(setShabadListModal())}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            dispatch(setShabadListModal());
          }}>
          <Icon name="arrow-back-outline" type="ionicon" />
        </TouchableOpacity>
        <Text>{heading}</Text>
        <View style={styles.scroll}>
          <FlatList
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setShabad(
                        // item.shabad.text, //the shabad test
                        // item.shabad.date,
                        // item.shabad.time,
                        // false, //'no add to list',
                        // item.shabad.id, //the shabad id
                        // item.shabad.saved,
                        item.text, //the shabad test
                        item.date,
                        item.time,
                        false, //'no add to list',
                        item.id, //the shabad id
                        item.pinned,
                        index,
                      ),
                    );
                    dispatch(setShabadModal());
                  }}>
                  <ShabarBar item={item} index={index} dispatch={dispatch} />
                </TouchableOpacity>
              );
            }}
            data={state.shabadList}
          />
        </View>
      </View>
    </Modal>
  );
}

function ShabarBar({item, index, dispatch}) {
  return (
    <View
      style={
        index % 2 === 0
          ? shabadBar.container
          : {...shabadBar.container, backgroundColor: '#7CB9E8'}
      }>
      <Text style={shabadBar.item}>
        {item.text.split('\n')[0] + item.text.split('\n')[1]}
      </Text>
      <Text style={shabadBar.item}>
        time: {item.time}
        {'\n'}
        date : {item.date}
      </Text>

      <Icon
        name="close-circle-outline"
        type="ionicon"
        color="#002D62"
        onPress={() => {
          dispatch(deleteShabad(item.id));
        }}
        // size={25}
        // onLongPress={() => console.log("LON")}
      />
    </View>
  );
}
const shabadBar = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
  },
  item: {
    flex: 1,
    padding: 5,
    // left: 10,
    // backgroundColor: "yellow",
  },
  text: {
    fontSize: 14,
    fontFamily: 'sans-serif-condensed',
  },
});

const styles = StyleSheet.create({
  //   ...barStyle,
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007FFF',
    height: '70%',
    width: '90%',
    top: '15%',
    left: '5%',
    borderRadius: 40,
  },
  goBack: {
    // backgroundColor: 'red',
    right: '40%',
  },
  scroll: {
    padding: 10,
    height: '80%',
    width: '95%',
  },
  gurbaniScroll: {
    borderRadius: 20,
    padding: 30,
    backgroundColor: 'rgba(114,160,193,1)',
  },
  newShabad: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#00FFFF',
  },
});
