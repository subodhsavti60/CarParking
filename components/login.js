import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { setAsyncValue, clearAsyncStorage } from '../util/asyncHelper';
import { dataArr } from '../util/Apputils';

export default function Login({ navigation }) {
  const [inputFields, setInputFields] = useState({ username: '', pwd: '' });

  const loginHandler = () => {
    if (inputFields.username && inputFields.pwd) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        userName: inputFields.username,
        password: inputFields.pwd,
        verified: true,
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://myfakeapi.com/api/login', requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          console.log('\n--login api result------', result);
          if (result && result.userDetails) {
            await clearAsyncStorage();
            await setAsyncValue('DATA_ARR', JSON.stringify(dataArr));
            navigation.navigate('Slot');
          }
        })
        .catch((error) => console.log('error', error));
    } else {
      alert('Please enter username & password');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.headerTxtStyle}>{`Car Parking`}</Text>
      </View>
      <View style={{ width: '50%' }}>
        <TextInput
          onChangeText={(txt) =>
            setInputFields({ ...inputFields, username: txt })
          }
          placeholder="Username"
          value={inputFields.username}
          style={styles.txtInputStyle}
        />
        <TextInput
          onChangeText={(txt) => setInputFields({ ...inputFields, pwd: txt })}
          placeholder="Password"
          value={inputFields.pwd}
          secureTextEntry={true}
          style={styles.txtInputStyle}
        />
      </View>
      <View style={{ height: 140, marginTop: 20 }}>
        <TouchableOpacity
          onPress={loginHandler}
          style={[styles.btnView, { backgroundColor: '#111879' }]}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              paddingHorizontal: 10,
            }}>{`Login`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInputStyle: {
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    width: '100%',
    marginVertical: 10,
    paddingLeft: 10,
  },
  btnView: {
    backgroundColor: 'lightgrey',
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 0.3,
  },
  headerTxtStyle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
