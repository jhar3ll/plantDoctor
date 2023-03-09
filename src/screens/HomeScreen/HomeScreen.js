import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {

const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Doctor</Text>
      <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')}></Image>
      <Pressable style={styles.signUp} underlayColor='#fff'
      onPress={() => {navigation.navigate('SignUp')}}>
        <Text style={styles.signUpText}>Create Account</Text>
      </Pressable>
      <Pressable 
        style={styles.signIn}
        underlayColor='#fff'
        onPress={() => {navigation.navigate('SignIn')}}>
        <Text style={styles.signInText}>Login</Text>
      </Pressable>
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
signUp:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  position: 'absolute',
  backgroundColor: '#B3EFA9',
  width: 280,
  height: 64,
  bottom: 200,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#000000'
}, 
signUpText: {
  width: 185,
  height: 32,
  fontFamily: 'BodoniSvtyTwoITCTT-Book',
  fontStyle: 'normal',
  fontSize: 30,
  textAlign: 'center',
  letterSpacing: -0.3
},
signIn:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  position: 'absolute',
  backgroundColor: '#B3EFA9',
  width: 280,
  height: 64,
  bottom: 100,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#000000'
}, 
signInText: {
  width: 169,
  height: 38,
  fontFamily: 'BodoniSvtyTwoITCTT-Book',
  fontStyle: 'normal',
  fontSize: 30,
  textAlign: 'center',
  letterSpacing: -0.3
}
});

export default HomeScreen;