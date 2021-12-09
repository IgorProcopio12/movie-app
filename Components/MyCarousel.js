import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')



const MyCarousel = ({ carouselRef, snapshots, setActiveIndex, openModalize, setListaAtiva, listaAtiva, title }) => {

  const _renderItem = ({ item, index }) => {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => { openModalize(); setActiveIndex(index); setListaAtiva(listaAtiva); }}
        >
          <Image
            source={{ uri: item.img }}
            style={styles.carouselImg}
          />
          <Text style={styles.carouselText}>{item.title}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  };

  const _onSnapToItem = index => {
    setActiveIndex(index);
    setListaAtiva(listaAtiva);
  };

  return (
    <View>
      <Text style={{ color: '#FFF', fontSize: 25, marginLeft: 10, marginVertical: 10, textShadowColor: 'rgba(0, 0, 0, 0.75)',  textShadowOffset: {width: -2, height: 2},  textShadowRadius: 10 }}>
        {title}
      </Text>
      <View style={styles.slideView}>
        <Carousel
          onSnapToItem={_onSnapToItem}
          keyExtractor={item => item.id}
          style={styles.carousel}
          ref={carouselRef}
          data={snapshots}
          renderItem={_renderItem}
          sliderWidth={screenWidth}
          itemWidth={200}
          inactiveSlideOpacity={0.5}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
})

export default MyCarousel;
