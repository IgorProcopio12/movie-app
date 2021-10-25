import * as React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard
} from "react-native";

export default function Login({ navigation }) {
  const [offSet] = React.useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = React.useState(new Animated.Value(0));
  const [logo] = React.useState(new Animated.ValueXY({ x: 130, y: 155 }));
  const [font] = React.useState(new Animated.Value(22));

  const entrar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };


  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offSet.y, {
        toValue: 0,
        speed: 1,
        bounciness: 15,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  }, []);


  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 85,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 95,
        duration: 300,
      }),
      Animated.timing(font, {
        toValue: 14,
        duration: 300,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 300,
      }),
      Animated.timing(font, {
        toValue: 22,
        duration: 300,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image style={{
          width: logo.x,
          height: logo.y,
        }} source={require('../src/images/movie.png')} />
        <Animated.Text style={[styles.title,
        {
          fontSize: font,
        },
        ]}>
          My Movie List
        </Animated.Text>
      </View>


      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offSet.y }],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          type="Email"
          keyboardType="email-address"
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          maxLength={16}
          secureTextEntry={true}
          style={styles.input}
          type="password"
          placeholder="Password"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Crie Sua Conta</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",

  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",

  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontStyle: 'italic',
    justifyContent: 'center',
    fontWeight: "600",

  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "90%",
  },

  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#CD2F0D",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: "#FFF",
  },
});
