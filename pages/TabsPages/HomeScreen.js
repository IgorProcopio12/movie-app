import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useList } from 'react-firebase-hooks/database'
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from '../../services/firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

import { Modalize } from 'react-native-modalize';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function HomeScreen() {

  const carouselRef = React.useRef(null);
  const URL = 'http://localhost:3000';

  const handleFavorite = (color) => {
    if (heart == "#FFF") {
      setOutlineHeart("crimson");
    } else {

      setOutlineHeart("#FFF")
    }
  }

  const db = firebase.getAll();
  const starCountRef = ref(db, '/movies');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();


  });

  const [lista, setLista] = React.useState([
    {
      title: "O Justiceiro",
      text: "Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro",
      release: 2018,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg'
    },
    {
      title: "Bad Boys for life",
      text: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg'
    },
    {
      title: "Viúva Negra",
      text: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg'
    },
    {
      title: "Top Gun: MAVERICK",
      text: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg'
    },
    {
      title: "BloodShot",
      text: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg'
    },
    {
      title: "Free Guy",
      text: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg'
    },
  ]);
  const [background, setBackground] = React.useState(lista[0].img)
  const [heart, setOutlineHeart] = React.useState("#FFF");

  const [activeIndex, setActiveIndex] = React.useState(0);
  const modalizeRef = React.useRef(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  }

  const _renderItem = ({ item, index }) => {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={openModalize}
        >
          <Image
            source={{ uri: item.img }}
            style={styles.carouselImg}
          />
          <Text style={styles.carouselText}>{item.title}</Text>
          <Icon
            name="favorite"
            size={30}
            color={heart}
            style={styles.carouselIcon}
            onPress={() => handleFavorite()} />
        </TouchableOpacity>
      </ScrollView>
    )
  };


  return (
    <ScrollView styles={styles.container} >
      <View style={{ flex: 1, height: screenHeight }}>
        <View style={{ ...StyleSheet.absoluteFill, height: screenHeight }}>
          <ImageBackground
            // source={{ uri: background }}
            style={styles.imgBg}
            blurRadius={8}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('./movie.png')} style={styles.logo} />
              <TextInput
                style={styles.input}
                placeholder="Procurando algo?">
              </TextInput>
            </View>
            <Text style={{ color: '#FFF', fontSize: 25, marginLeft: 10, marginVertical: 10, }}>
              Ação/Aventura
            </Text>
            <View style={styles.slideView}>
              <Carousel
                onPress={() => openModalize}
                style={styles.carousel}
                ref={carouselRef}
                data={lista}
                renderItem={_renderItem}
                sliderWidth={screenWidth}
                itemWidth={200}
                inactiveSlideOpacity={0.5}
                onSnapToItem={(index) => {
                  setBackground(lista[index].img);
                  setActiveIndex(index);

                }}
              />
            </View>
          </ImageBackground>
          <Modalize
            style={{ backgroundColor: "black" }} 
            ref={modalizeRef}
            snapPoint={300}
          >
            <View style={{ flex: 1, height: 180, justifyContent: 'space-around', alignItems: 'center', margin: 10, marginTop: 30 }}>
              <Text>aaaaaaaaaaaaaaa</Text>
            </View>
          </Modalize>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    color: '#FFFFFF',
  },
  imgBg: {
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#222"
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
  carousel: {
    flex: 1,
    overflow: 'visible',

  },
  carouselImg: {
    alignSelf: 'center',
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  carouselText: {
    paddingLeft: 15,
    color: '#FFF',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold',

  },
  carouselIcon: {
    position: 'absolute',
    top: 25,
    right: 15,
  },

})
