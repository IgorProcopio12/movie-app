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
  Keyboard,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [offSet] = React.useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = React.useState(new Animated.Value(0));
  const [logo] = React.useState(new Animated.ValueXY({ x: 130, y: 155 }));
  const [font] = React.useState(new Animated.Value(22));
  const [passwordInput, setPasswordInput] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);
  const [disable, setDisable] = React.useState(true);
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
          styles.containerEmail,
          {
            opacity: opacity,
            transform: [{ translateY: offSet.y }],
          },
        ]}
      >

        <TextInput
          style={styles.inputEmail}
          type="Email"
          keyboardType="email-address"
          placeholder="Email"
          autoCorrect={false}

        />
        <Animated.View style={styles.inputArea}>
          <TextInput
            maxLength={16}
            secureTextEntry={hidePass}
            style={styles.inputSenha}
            type="password"
            placeholder="Password"
            autoCorrect={false}
            value={passwordInput}
            onChangeText={(texto) => setPasswordInput(texto)}

          />
          <TouchableOpacity disabled={disable} style={styles.icon}>
            {hidePass ?

              <Ionicons name="eye" color="black" size={20} onPress={() => setHidePass(!hidePass)} />
              :
              <Ionicons name="eye-off" color="black" size={20} onPress={() => setHidePass(!hidePass)} />

            }
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Crie Sua Conta</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView >
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
  containerEmail: {
    flex: 1,
    alignItems: "center",
    width: "90%",
  },
  containerSenha: {
    flexDirection: 'row',
    alignItems: "center",
    width: "90%",
  },
  inputEmail: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  inputSenha: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    marginTop: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    height: 45,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputArea: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginBottom: 15,

  },
  icon: {
    width: '10%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerButtons: {
    flex: 1,
    alignItems: "center",
    width: "90%",
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
