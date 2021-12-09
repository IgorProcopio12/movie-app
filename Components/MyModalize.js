import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';


const MyModalize = ({ modalizeRef, snapshots, activeIndex }) => {
    return (
        <Modalize
              style={{ backgroundColor: "black" }}
              ref={modalizeRef}
              snapPoint={300}
            >
              <View style={{ width:'100%', height: '100%', justifyContent: 'center',  alignItems: 'center', margin: 10, marginTop: 30 }}>
                <Text style={{fontSize: 20, padding: 5 }}>{snapshots[activeIndex].title}</Text>
                <Image
                    source={{ uri: snapshots[activeIndex].img }}
                    style={styles.carouselImg}
                />
                <Text style={{fontSize: 12, padding: 5, marginTop: 10 }}>Ano de lançamento: {snapshots[activeIndex].release}</Text>
                <Text style={{fontSize: 17, padding: 15, marginTop: 10 }}>{snapshots[activeIndex].text}</Text>
                
              </View>
        </Modalize>
    )
}

const styles = StyleSheet.create({
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
})

export default MyModalize;
