import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';

import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';

import {useSelector, useDispatch} from 'react-redux';
import {
  setCheckBox,
  deleteAddedItem,
  addNdeletePdf,
  setList,
} from '../redux/actions';
import {allColors} from '../assets/styleForEachOption';
import {BarOption} from '../assets/components/baroption';
import {RightOfHeader} from '../assets/components/rightOfHeader.js';
import AddFileModal from '../assets/components/addFilesModal';
import {folderToFileData} from '../assets/longData';

export default function FolderToPdfs({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector(theState => theState.theReducer);

  const folderTitle = route.params.folderTitle;
  let baniaList = Object.keys(route.params.list);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: allColors[state.darkMode].mainBackgroundColor,
      height: '100%',
    },
  });

  if (folderTitle === 'Added PDFs')
    return (
      <ForAddedPdfsScreen
        state={state}
        dispatch={dispatch}
        navigation={navigation}
        styles={styles}
      />
    );
  else if (folderTitle === 'ਪਾਠ Hajari')
    baniaList = Object.entries(state.allPdfs)
      .filter(bani => {
        return bani[1].currentAng !== 1 && bani[1].checked === false;
      })
      .map(bani => {
        return {title: bani[0]};
      });

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      title: folderTitle,
      headerTintColor: state.darkMode ? 'white' : 'black',
      headerTitleStyle: {
        color: state.darkMode ? 'white' : 'black',
      },
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'shuffle-outline',
              action: () => {
                const items = baniaList;
                const randItem =
                  items[Math.floor(Math.random() * items.length)];
                navigation.navigate('OpenPdf', {
                  pdfTitle: randItem.title,
                });
              },
            },
            {
              name: 'settings-outline',
              action: () => {
                navigation.navigate('Settings Page');
              },
            },
          ]}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          //item={"title": "11) Jaitsri Ki Vaar Mahala 5.pdf"}
          return (
            <BarOption
              state={state}
              left={
                <Icon
                  name="document-outline"
                  type="ionicon"
                  color={state.darkMode ? 'white' : 'black'}
                />
              }
              text={item}
              right={
                <CheckBox
                  //checked={state.allPdfs[item.title].checked}
                  checked={folderToFileData[folderTitle][item].checked}
                  checkedColor="#0F0"
                  checkedTitle="ਸੰਪੂਰਨ"
                  containerStyle={{
                    borderRadius: 10,
                    //padding: 10,
                    backgroundColor: 'black',
                  }}
                  onPress={() => {
                    dispatch(setCheckBox(item.title));
                  }}
                  //size={20}
                  textStyle={{
                    fontSize: 10,
                    height: 20,
                    color: 'white',
                  }}
                  title="Not Done"
                  titleProps={{}}
                  uncheckedColor="#F00"
                />
              }
              onClick={() => {
                navigation.navigate('OpenPdf', {
                  folderTitle:folderTitle,
                  pdfTitle: item,
                });
              }}
            />
          );
        }}
        data={baniaList}
      />
    </View>
  );
}

function ForAddedPdfsScreen({state, dispatch, navigation, styles}) {
  const [modalOn, setModal] = React.useState(false);
  const [data, setData] = React.useState(state.addedPdfs.list);

  console.log(data);

  React.useEffect(() => {
    //setData(state.addedPdfs.list);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: allColors[state.darkMode].headerColor,
      },
      title: 'Added PDFs',
      headerTintColor: state.darkMode ? 'white' : 'black',
      headerTitleStyle: {
        color: state.darkMode ? 'white' : 'black',
      },
      headerRight: () => (
        <RightOfHeader
          state={state}
          icons={[
            {
              name: 'add-outline',
              action: () => setModal(true),
            },
            {
              name: 'shuffle-outline',
              action: () => {},
            },
            {
              name: 'settings-outline',
              action: () => {
                navigation.navigate('Settings Page');
              },
            },
          ]}
        />
      ),
    });
  });

  const renderItem = ({item, drag}) => {
    const isFolder = item.list ? true : false;

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <Animated.View>
              <BarOption
                state={state}
                onLongPress={drag}
                left={
                  <Icon
                    name={isFolder ? 'folder-outline' : 'document-outline'}
                    type="ionicon"
                    color={state.darkMode ? 'white' : 'black'}
                  />
                }
                text={item.title}
                right={
                  <Icon
                    color={state.darkMode ? 'white' : 'black'}
                    name="trash-outline"
                    type="ionicon"
                    onPress={() => {
                      dispatch(deleteAddedItem(item.title));
                      dispatch(addNdeletePdf(item.title, '_', false));
                      setData(state.addedPdfs.list);
                      // const lstInFld = item.list;
                      if (item.list)
                        item.list.map(i => {
                          dispatch(deleteAddedItem(i.title));
                          dispatch(addNdeletePdf(i.title, '_', false));
                        });
                    }}
                  />
                }
                onClick={() => {
                  if (!isFolder)
                    navigation.navigate('OpenPdf', {
                      pdfTitle: item.title,
                    });
                  else
                    navigation.navigate('BanisList2', {
                      list: item.list,
                      folderTitle: item.title, //name of the bar clicked on
                    });
                }}
              />
            </Animated.View>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={data}
        onDragEnd={i => {
          dispatch(setList('Added PDFs', i.data));
          setData(i.data);
        }}
        keyExtractor={item => item.title}
        renderItem={renderItem}
      />
      <AddFileModal
        state={state}
        visible={modalOn}
        setVisibility={setModal}
        dispatch={dispatch}
        folderTitle={'Added PDFs'}
        onlyFiles={false}></AddFileModal>
    </View>
  );
}
