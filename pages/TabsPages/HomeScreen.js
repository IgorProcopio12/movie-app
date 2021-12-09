import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useListVals } from 'react-firebase-hooks/database'
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from '../../services/firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MyModalize from '../../Components/MyModalize';
import MyCarousel from '../../Components/MyCarousel';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function HomeScreen() {

  const carouselRef = React.useRef(null);
  const URL = 'http://localhost:3000';
  const [listaAtiva, setListaAtiva] = React.useState(1);

  const handleFavorite = (color) => {
    if (heart == "#FFF") {
      setOutlineHeart("crimson");
    } else {

      setOutlineHeart("#FFF")
    }
  }

  const handleFirebase = (data) => {
    setCards(data);
  }


  
  const [cards, setCards] = React.useState({});
  
  const db = firebase.getAll();
  const [snapshots, loading, error] = useListVals(ref(db, '/movies'));
  
  const geraLista = (idGenre) => {
    const lista = [];
    for (const value of snapshots) {
      if (value.genre == idGenre) {
        lista.push(value);
      }
    
  }
    return lista;
  }
  
  const [heart, setOutlineHeart] = React.useState("#FFF");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const modalizeRef = React.useRef(null);
  const modalizeRef2 = React.useRef(null);
  const openModalize = () => {
    modalizeRef.current?.open();
  }
  const openModalize2 = () => {
    modalizeRef2.current?.open();
  }

  return (
    <ImageBackground
      source={{ uri: (!loading) ? geraLista(listaAtiva)[activeIndex].img :null }}
      style={styles.imgBg}
      blurRadius={4}
    >
      <ScrollView style={styles.container} >
        <View style={{ flex: 1, height: screenHeight }}>
          <View style={{ ...StyleSheet.absoluteFill, height: screenHeight }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('./movie.png')} style={styles.logo} />
              <TextInput
                style={styles.input}
                placeholder="Procurando algo?">
              </TextInput>
            </View>

            <MyCarousel carouselRef={carouselRef} snapshots={geraLista(1)} setActiveIndex={setActiveIndex} openModalize={openModalize} setListaAtiva={setListaAtiva} listaAtiva={1} title="Ação/Aventura" />
            <MyCarousel carouselRef={carouselRef} snapshots={geraLista(2)} setActiveIndex={setActiveIndex} openModalize={openModalize2} setListaAtiva={setListaAtiva} listaAtiva={2} title="Terror" />


            {(!loading) ?
              <MyModalize modalizeRef={modalizeRef} snapshots={geraLista(1)} activeIndex={activeIndex} />

              : null}
            {(!loading) ?
            <MyModalize modalizeRef={modalizeRef2} snapshots={geraLista(2)} activeIndex={activeIndex} />

            : null}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#FFFFFF',
  },
  imgBg: {
    flex: 1,
    opacity: 1,
    backgroundColor: "#191919",
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 45,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#CFCFCF',
    width: '75%',
    height: '40%',
    borderRadius: 7,
    fontSize: 16,
    fontStyle: 'italic',
    padding: 10,
    marginTop: 55,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  slideView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselIcon: {
    position: 'absolute',
    top: 25,
    right: 15,
  },

})
