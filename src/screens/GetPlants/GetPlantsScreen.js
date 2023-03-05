import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
 
  const getPlants = async () => {
    try {
      const models = []
      const plants = await DataStore.query(Plant, p => p.owner.eq(user));
      plants.map(p => models.push(p))
      setUserPlants(models)
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

  useEffect(() => {
    getPlants();
  }, [])

return (   
      <View style={styles.container}>
        {
          userPlants.map((plant) => (
            <>
            <Text>.
            <Text>Plant name: {plant.name}, waterFrequency: {plant.waterFrequency}</Text>
            </Text>
            </>
          ))
        }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
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