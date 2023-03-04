import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import { useNavigation } from '@react-navigation/native';

const GetPlantsScreen = () => {
  const navigation = useNavigation();
  
  const getPlants = async () => {
    try {
      const models = await DataStore.query(Plant, p => p.waterFrequency.gt(0))
      console.log(models)
      console.log('success')
    } catch (error){
      console.log(error)
    }
  }

  const deletePlant = async () => {
    try {
      await DataStore.delete(Plant, (plant) => plant.waterFrequency.gt(0))
      console.log('success')
    } catch (error){
      console.log(error)
    }
  }

return (   
      <View style={styles.root}>
        <Text style={styles.getPlants} onPress={getPlants}>Get Plants</Text>
        <Text style={styles.deletePlant} onPress={deletePlant}>Delete Plant</Text>
        <Text onPress={() => navigation.navigate('User', { screen: 'GetPlantsScreen'}) }>User Home</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  getPlants: {
    position: 'absolute'
  },
  deletePlant: {
    position: 'absolute',
    bottom: 500
  }
});

export default GetPlantsScreen;