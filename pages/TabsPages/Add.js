import * as React from 'react';
import { Text, TouchableOpacity, Animated, StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';


export default function Add() {
  const [opacity] = React.useState(new Animated.Value(0));

  const modalizeRef = React.useRef(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  }

  React.useEffect(() => {

    Animated.parallel([
      Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,

      }),
  ]).start();
}, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#222" }}>
      <TouchableOpacity style={styles.btnSubmit} onPress={openModalize}>
        <Text style={styles.submitText}>Adicionar +</Text>
      </TouchableOpacity>
      <Modalize
        ref={modalizeRef}
        snapPoint={600}
        modalHeight={700}
      >
        <Animated.View style={{ flex: 1, opacity: opacity, width:'100%', height: '100%', justifyContent: 'center',  alignItems: 'center', margin: 10, marginTop: 30 }}>
          <Text style={{ fontStyle: 'italic', fontSize: 20, marginTop: 20 }}>Adicione seu filme favorito!</Text>

          <TextInput style={styles.input} placeholder="Título">
          </TextInput>
          <TextInput style={styles.input} placeholder="Descrição">

          </TextInput>
          <TextInput style={styles.input} placeholder="Gênero">

          </TextInput>
          <TextInput style={styles.input} placeholder="Ano de lançamento">

          </TextInput>
          <TextInput style={styles.input} placeholder="URL da imagem">

          </TextInput >
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Confirmar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modalize>
    </View>


  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#CFCFCF',
    width: '75%',
    height: '10%',
    borderRadius: 7,
    fontSize: 16,
    fontStyle: 'italic',
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnSubmit: {
    backgroundColor: "#CD2F0D",
    width: "60%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 25,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
})