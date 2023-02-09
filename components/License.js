import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { getAsyncValue, setAsyncValue } from '../util/asyncHelper';

export default function LicenseCheck({ navigation, route }) {
  console.log('\n--route---', route);
  const [licenseNo, setLicenseNo] = useState('');

  const parkBtnHandler = async () => {
    if (licenseNo) {
      const arr = await getAsyncValue('DATA_ARR');
      if (arr) {
        const parsedArr = JSON.parse(arr);
        const newArr = parsedArr.map((item) => {
          if (item.slotNo == route.params.slotNo) {
            return {
              ...item,
              licenseNo: licenseNo,
              isparked: true,
            };
          }
          return item;
        });
        console.log('\n---newArr----', newArr);
        await setAsyncValue('DATA_ARR', JSON.stringify(newArr));
        navigation.navigate('Slot');
      }
    } else {
      alert('Please enter license number');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={{ width: '100%' }}>
          <Text style={styles.enterLicenseTxt}>{`Enter License Number`}</Text>
          <View style={{ height: 50 }}>
            <TextInput
              onChangeText={(txt) => setLicenseNo(txt)}
              value={licenseNo}
              placeholder="License No"
              keyboardType="number-pad"
              style={styles.txtInputStyle}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={parkBtnHandler} style={styles.btnView}>
              <Text>{`Park`}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    width: 80,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
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
  mainView: {
    flex: 0.2,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  enterLicenseTxt: {
    paddingVertical: 10,
    paddingTop: 30,
  },
});
