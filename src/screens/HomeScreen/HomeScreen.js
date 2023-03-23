import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native';
import SignInScreen from '../SignInScreen/SignInScreen';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const HomeScreen = () => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const closeIcon = <Icon name="close-circle" size={40} color='#000' />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Doctor</Text>
      <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')}></Image>

      <View style={styles.buttons}>
        <Pressable style={styles.signUp} underlayColor='#fff' onPress={() => {setSignUpVisible(!signUpVisible)}}>
          <Text style={styles.signUpText}>Create Account</Text>
        </Pressable>
        <Modal animationType='slide' visible={signUpVisible}>
          
        </Modal>
 
        <Modal animationType='slide' transparent={true} visible={loginVisible}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginView}>
              <View style={styles.loginForm}>
                <SignInScreen loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
                <Pressable style={styles.closeButton} onPress={() => {setLoginVisible(!loginVisible)}}>{closeIcon}</Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Pressable style={styles.loginButton} underlayColor='#fff'
          onPress={() => setLoginVisible(!loginVisible)}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#FFEEE1',
  alignItems: 'center',
  justifyContent: 'center',
},
title: {
  position: 'absolute',
    top: 100,
    fontFamily: 'BodoniSvtyTwoITCTT-BookIta',
    fontSize: 60, 
    textAlign: 'center',
},
cactus: {
  position: 'absolute',
  width: 230,
  height: 230,
  top: 280,
  alignItems: 'center',
},
buttons: {
  position: 'absolute',
  bottom: 100,
  alignItems: 'center'
},
signUp:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  position: 'absolute',
  backgroundColor: '#B3EFA9',
  width: 320,
  height: 64,
  bottom: 200,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#000000'
}, 
signUpText: {
  width: 280,
  height: 40,
  fontFamily: 'BodoniSvtyTwoITCTT-Book',
  fontStyle: 'normal',
  fontSize: 30,
  textAlign: 'center',
  letterSpacing: -0.3
},
loginButton:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  position: 'absolute',
  backgroundColor: '#B3EFA9',
  width: 320,
  height: 64,
  bottom: 110,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#000000'
}, 
loginText: {
  width: 169,
  height: 38,
  fontFamily: 'BodoniSvtyTwoITCTT-Book',
  fontStyle: 'normal',
  fontSize: 30,
  textAlign: 'center',
  letterSpacing: -0.3
},
loginView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
loginForm: {
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
closeButton: {
  position: 'absolute',
  marginTop: 20
},
});

export default HomeScreen;