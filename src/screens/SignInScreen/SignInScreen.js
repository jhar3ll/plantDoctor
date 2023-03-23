import React, { useRef, useState } from 'react';
import { Auth } from 'aws-amplify'
import { StyleSheet, View, Text, Pressable, Alert, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';

const SignInScreen = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const passwordRef = useRef();

  const signIn = async () => {
    try{
      const user = await Auth.signIn(username, password);
      await DataStore.clear();
      props.setLoginVisible(false);
      navigation.navigate('User');
    } catch (error) {
      setFormError('Wrong username/password. Please try again.');
      console.log('signIn', error)
    }
  }

  const handleSubmit = () => {
    if (username === ''){
      setFormError(`Field 'username' cannot be blank.`);
      return;
    } else if (password === ''){
      setFormError(`Field 'password' cannot be blank.`);
      return;
    } else {
      signIn();
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.loginView}>
        <Text style={{color: 'red'}}>{formError}</Text>
        <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          onChangeText={setUsername}
          value={username}
          placeholder="username"
          placeholderTextColor={"#808080"}
          returnKeyType='next'
          onSubmitEditing={() => {passwordRef.current.focus();}}
          />

        <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          onChangeText={setPassword}
          value={password}
          ref={passwordRef}
          placeholder="password"
          keyboardType='visible-password'
          placeholderTextColor={"#808080"}
          secureTextEntry={true}
          returnKeyType='go'
          onSubmitEditing={signIn}
          />

        <Pressable style={styles.loginButton} underlayColor='#fff' onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>      
      </View>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 175,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginView: {
      position: 'absolute',
      alignItems: 'center',
    },
    input: {
      height: 60,
      width: 280,
      margin: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 30
    },
    loginButton: {
      flex: 1,
      position: 'absolute',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: '#B3EFA9',
      marginTop: 10,
      top: 100,
      width: 150,
      height: 60,
      padding: 10,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#000',
      marginTop: 100
    },
    loginButtonText: {
      position: 'relative',
      fontFamily: 'ChalkboardSE-Regular',
      fontSize: 24,
    }, 
  });

export default SignInScreen;