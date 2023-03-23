import React, { useRef, useState } from 'react';
import { Auth } from 'aws-amplify'
import { StyleSheet, View, Text, Pressable, TextInput, TouchableHighlight, ActivityIndicator, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import ForgotPasswordScreen from '../ForgotPasswordScreen/ForgotPasswordScreen'

const SignInScreen = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const passwordRef = useRef();

  const getActivityIndicator = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }

  const signIn = async () => {
    try{
      props.setLoginVisible(false);
      getActivityIndicator();
      const user = await Auth.signIn(username, password);
      await DataStore.clear();
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
      
      <Modal animationType='slide' transparent={true} visible={newPasswordVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.forgotPasswordView}>
            <View style={styles.forgotPasswordForm}>
              <ForgotPasswordScreen />
              <Pressable style={styles.closeButton} onPress={() => {[
                setNewPasswordVisible(!newPasswordVisible), props.setLoginVisible(false)]}}>{props.closeIcon}</Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

        <TouchableHighlight style={styles.forgotPasswordButton} underlayColor='#FFEEE1' onPress={() => 
          [setNewPasswordVisible(true)]}>
          <Text style={styles.forgotPasswordText}>forgot password</Text>
        </TouchableHighlight>  
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
    forgotPasswordView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgotPasswordForm: {
      position: 'absolute',
      height: 460,
      width: 320,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0.5,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
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
    forgotPasswordButton: {
      position: 'relative',
      bottom: -220
    },
    forgotPasswordText: {
      color: 'red',
      textDecorationLine: 'underline'
    }
  });

export default SignInScreen;