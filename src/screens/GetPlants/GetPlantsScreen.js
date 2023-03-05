import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
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
      props.setNewPlant(false)
    } catch (error){
      console.log(error)
    }
  }

  const deletePlant = async () => {
    try {
      await DataStore.delete(Plant, (plant) => plant.waterFrequency.gt(0))
      props.setNewPlant(true)
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getPlants();
  }, [props.newPlant])

return (   
      <View style={styles.container}>
        {
          userPlants.map((plant, index) => (
            <>
            {/* <FlatList key={index}></FlatList> */}
            <View style={styles.plant}>
            <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')}></Image>
            <Text style={styles.plantText}>{plant.name} Plant, waterFrequency: {plant.waterFrequency}</Text>
            </View>
            </>
          ))
        }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  plant: {
    marginBottom: 50
  },
  cactus: {
    position: 'absolute',
    height: 35,
    width: 35
  },
  plantText: {
    position: 'absolute',
    marginLeft: 40,
    marginTop: 10,
  },
});

export default GetPlantsScreen;