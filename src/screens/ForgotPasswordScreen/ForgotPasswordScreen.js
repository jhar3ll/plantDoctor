import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { Auth } from 'aws-amplify'

const ForgotPasswordScreen = () => {
  const [formError, setFormError] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    Auth.forgotPassword(username)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }
  Auth.forgotPasswordSubmit

  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>{formError}</Text>
      <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          onChangeText={setUsername}
          value={username}
          placeholder="please enter your username"
          placeholderTextColor={"#808080"}
          returnKeyType='next'
          onSubmitEditing={handleSubmit}
          />

      <Pressable style={styles.reset} underlayColor='#fff' onPress={handleSubmit}>
        <Text style={styles.resetText}>Reset password</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
input: {
  height: 60,
  width: 280,
  margin: 15,
  borderWidth: 1,
  padding: 5,
  borderRadius: 30
},
reset:{
  backgroundColor: '#B3EFA9',
  alignItems: 'center',
  justifyContent: 'center',
  top: 8,
  width: 200,
  height: 40,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#000000'
}, 
resetText: {
  fontFamily: 'BodoniSvtyTwoITCTT-Book',
  fontStyle: 'normal',
  fontSize: 20,
},
forgotPassword: {
}
});

export default ForgotPasswordScreen;