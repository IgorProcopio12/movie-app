import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../services/firebase';
import { push, ref, set } from 'firebase/database';


const MyModalize = ({ modalizeRef, snapshots, activeIndex }) => {
const [id, setId] = React.useState(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@id')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  getData().then(result => {
    setId(result);
    console.log(id)
  })

  const addFavorito = (idFav) =>{
    console.log('id:' + id);
    const db = firebase.getAll();
    const randID =  Math.floor(Math.random() * 10000);
    set((ref(db, 'users/' + id + '/favoritos/')), {
      [randID] : idFav
    });
  }
    return (
        <Modalize
              style={{ backgroundColor: "black" }}
              ref={modalizeRef}
              snapPoint={400}
            >
              <View style={{ width:'100%', height: '100%', justifyContent: 'center',  alignItems: 'center', margin: 10, marginTop: 30 }}>
                <Text style={{fontSize: 20, padding: 5 }}>{snapshots[activeIndex].title}</Text>
                <Image
                    source={{ uri: snapshots[activeIndex].img }}
                    style={styles.carouselImg}
                />
                <Text style={{fontSize: 12, padding: 5, marginTop: 10 }}>Ano de lançamento: {snapshots[activeIndex].release}</Text>
                <Text style={{fontSize: 17, padding: 15, marginTop: 10 }}>{snapshots[activeIndex].text}</Text>
                <TouchableOpacity style={styles.btnSubmit} onPress={addFavorito(snapshots[activeIndex].id)}>
                  <Text style={styles.submitText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
        </Modalize>
    )
}

const styles = StyleSheet.create({
  btnSubmit: {
    backgroundColor: "#CD2F0D",
    height:60,
    borderRadius:10,
      alignItems: "center",
      padding: 10
 
  },
    carouselImg: {
        alignSelf: 'center',
      width: 200,
      height: 300,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.5)',
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
})

export default MyModalize;
