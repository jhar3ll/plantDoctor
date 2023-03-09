import React, {useState} from 'react';
import { Amplify } from 'aws-amplify'
import { StyleSheet, View, Text, Pressable, Alert,} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import config from '../../aws-exports'

Amplify.configure(config)

const SignInScreen = () => {
  
    return (
      <View style={styles.root}>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
      width: 250,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formFields: {
      height: 20,
      width: 500
    },
    addPlantButton: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#B3EFA9',
      marginTop: 10,
      top: 100,
      width: 300,
      height: 70,
      padding: 10,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#000',
      marginTop: 35
    },
    addPlantButtonText: {
      position: 'absolute',
      justifyContent: 'center',
      padding: 5,
      marginLeft: 40
    }
  });

export default withAuthenticator(SignInScreen);