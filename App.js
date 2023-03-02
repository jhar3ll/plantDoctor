import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from './src/models';
import config from './src/aws-exports'
import { myTheme } from './src/signUpConfig';
import '@azure/core-asynciterator-polyfill'

const signUpConfig = myTheme
Amplify.configure(config)
const App = () => {

  const addPlant = async () => {
    try {
      await DataStore.save(
        new Plant({
        "name": "THIS IS A PLANT ADDED FROM SERVER",
        "waterFrequency": 4
      })
    );
      console.log("success!")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="addPlant" onPress={addPlant}>Add plant</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App, {signUpConfig});