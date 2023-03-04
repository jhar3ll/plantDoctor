import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import { ListItem } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

const GetPlantsScreen = (props) => {
  const user = props.user.username
  const [userPlants, setUserPlants] = useState([])
 
  const getPlants = async () => {
    try {
      const models = await DataStore.query(Plant, p => p.owner.eq(user));
      models.map(m => setUserPlants(m));
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

  const renderPlants = () => {
    userPlants.map((plant, index) => (
      <ListItem
      key={index}
      name={plant.name}
      waterFrequency={plant.waterFrequency}
      />
    ))
  }

  useEffect(() => {
    getPlants();
  }, [])

  if (userPlants === undefined){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }
  

  console.log(userPlants);
return (   
      <View style={styles.root}>
        
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