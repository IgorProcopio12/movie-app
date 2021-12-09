import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useList } from 'react-firebase-hooks/database'
import { getDatabase, ref, onValue } from "firebase/database";
import { useListVals } from 'react-firebase-hooks/database'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../services/firebase'
import { render } from 'react-dom';

export default function Favorties() {
  const db = firebase.getAll();
  const [snapshots, loading, error] = useListVals(ref(db, '/movies'));
  const [favoritos, setState] = React.useState([]);
  
  const asyncF = async () => {
    try {
      let user = await AsyncStorage.getItem('@fav');
      setState(JSON.parse(user));
      
    }
    catch {
    }
  }
  
  const getFavoritos = () => {
    asyncF();
    let lista = []
      for(const filme of snapshots){
        console.log(filme.id)
        for(const fav of favoritos){
            if(filme.id == fav){
              lista.push(filme);
            }
          }    
          }
          return lista;
      }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#222" }}>
      <Text>{}</Text>
    </View>
  )

}