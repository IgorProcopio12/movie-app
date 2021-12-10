import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useList } from 'react-firebase-hooks/database'
import { getDatabase, ref, onValue } from "firebase/database";
import { useListVals } from 'react-firebase-hooks/database'


import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../services/firebase'
import MyCarousel from '../../Components/MyCarousel';
import MyModalize from '../../Components/MyModalize';


export default function Favorties() {
  const db = firebase.getAll();
  const [snapshots, loading, error] = useListVals(ref(db, '/movies'));
  const [favoritos, setState] = React.useState([]);
  const [roda, setRoda] = React.useState(true);
  const carouselRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const modalizeRef = React.useRef(null);
  const [listaAtiva, setListaAtiva] = React.useState(1);
  // const asyncF = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('@fav');
  //     if(user){
  //       setState(JSON.parse(user));
  //     }
  //   }
  //   catch {
  //   }
  // }
  const openModalize = () => {
    modalizeRef.current?.open();
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@fav')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  if (roda) {
    getData().then(result => {
      setState(result)
      setRoda(false)
    })
  }

  const returnListaFilmesFavoritos = () => {
    let lista = [];

    const array = Object.values(favoritos);;
    // console.log(favoritos)
    for (const filme of snapshots) {
      console.log('oi')
      for(let i=0; i<array.length; i++){
        console.log(filme.id +  ' == ' + array[i])
        if (filme.id == array[i]) {
          lista.push(filme)
        }
      }
    }


    console.log(lista)
    
    return lista;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#222" }}>
      {(favoritos && !loading) ?
      <View>
      <MyCarousel carouselRef={carouselRef} snapshots={returnListaFilmesFavoritos()} setActiveIndex={setActiveIndex} openModalize={openModalize} setListaAtiva={setListaAtiva} listaAtiva={1} title="Favoritos" />
      {/* <MyModalize modalizeRef={modalizeRef} snapshots={returnListaFilmesFavoritos()} activeIndex={activeIndex} /> */}
      </View>
      : null}

         
    </View>
  )

}