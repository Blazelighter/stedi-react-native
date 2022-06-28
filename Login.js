import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const sendText = async (phoneNumber) => {
  console.log("phoneNumber: ",phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber, {
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
}



const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin', 
    {
      method: 'POST',
      body:JSON.stringify({oneTimePassword, phoneNumber}),
      headers: {'content-type':'application/json'}
    });

  const responseCode = tokenResponse.status;
  console.log("Respone Status Code", responseCode);
  if (responseCode==200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await tokenResponse.text();
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="123-456-7890"
        placeholderTextColor='#4251f5'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send One Time Password</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='#4251f5'
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn})}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100
  },
  button:{
    alignItems:"center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;