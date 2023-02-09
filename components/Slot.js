import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { getAsyncValue, setAsyncValue } from '../util/asyncHelper';

export default function Slot({ navigation }) {
  const [parkedArr, setParkedArr] = useState([]);
  const [unparkedArr, setunParkedArr] = useState([]);
  const [searchSlotNo, setSearchSlotNo] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const arr = await getAsyncValue('DATA_ARR');
      console.log('\n--arr------', arr);
      if (arr) {
        const parkedArr = JSON.parse(arr).filter((item) => item.isparked);
        const unparkedArr = JSON.parse(arr).filter((item) => !item.isparked);
        console.log('\n--parkedArr------', parkedArr);
        console.log('\n--unparkedArr------', unparkedArr);
        setParkedArr(parkedArr);
        setTimeout(() => {
          setunParkedArr(unparkedArr);
        }, 200);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const unparkYesHandler = async (slotNo) => {
    const arr = await getAsyncValue('DATA_ARR');
    if (arr) {
      const parsedArr = JSON.parse(arr);
      const newArr = parsedArr.map((item) => {
        if (item.slotNo == slotNo) {
          return {
            ...item,
            licenseNo: '',
            isparked: false,
          };
        }
        return item;
      });
      await setAsyncValue('DATA_ARR', JSON.stringify(newArr));
      setParkedArr(newArr.filter((item) => item.isparked));
      setTimeout(() => {
        setunParkedArr(newArr.filter((item) => !item.isparked));
      }, 200);
    }
  };

  const unparkBtnHandler = (slotNo) => {
    Alert.alert('Are you sure you want to unpark?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'YES', onPress: () => unparkYesHandler(slotNo) },
    ]);
  };

  const parkBtnHandler = () => {
    const checkunparkedSlot = unparkedArr.find(
      (item) => item.slotNo == searchSlotNo
    );
    console.log('\n---checkunparkedSlot---', checkunparkedSlot);
    if (checkunparkedSlot) {
      navigation.navigate('License', { slotNo: searchSlotNo });
    } else {
      alert('Sorry, this slot is not available.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSlotView}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 0.7, height: 50 }}>
            <TextInput
              onChangeText={(txt) => setSearchSlotNo(txt)}
              value={searchSlotNo}
              placeholder="Search Slot"
              keyboardType="number-pad"
              style={styles.txtInputStyle}
            />
          </View>
          <TouchableOpacity onPress={parkBtnHandler} style={styles.btnView}>
            <Text>{`Park`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.8, width: '100%' }}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {parkedArr.map((item, index) => {
            const { slotNo, licenseNo } = item;
            return (
              <View key={index} style={styles.parkedView}>
                <View style={{ flex: 0.7 }}>
                  <Text numberOfLines={1}>Slot: {slotNo}</Text>
                  <Text numberOfLines={1}>License: {licenseNo}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => unparkBtnHandler(slotNo)}
                  style={styles.btnView}>
                  <Text>{`Unpark`}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  btnView: {
    height: 30,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    flex: 0.3,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInputStyle: {
    borderWidth: 1,
    height: 30,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 5,
  },
  searchSlotView: {
    flex: 0.2,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  parkedView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
