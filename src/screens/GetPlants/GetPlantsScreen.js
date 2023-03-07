import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
 

  const getPlants = async () => {
    try {
      const plants = await DataStore.query(Plant, p => p.owner.eq(user))
      let sortedArr = plants.sort((a,b) => a.waterFrequency < b.waterFrequency)
      setUserPlants(sortedArr);
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

  const renderCheck = (waterFrequency) => {
    const checks = [];
    for (let i=0; i<waterFrequency; i++){
      checks.push(<Checkmark />)
    }
    return checks;
  }

  useEffect(() => {
    getPlants();
  }, [props.newPlant])

return (   
      <View style={styles.container}>
        {
          userPlants.map((plant, index) => (
            key=index,
            <>
            {/* <FlatList key={index}></FlatList> */}
            
            <View style={styles.plant}>
            <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')}></Image>
            <Text style={styles.plantText}>{plant.name}</Text>
            <Icon style={styles.plantWatering}>{renderCheck(plant.waterFrequency)}</Icon>
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
    marginBottom: 60
  },
  cactus: {
    position: 'absolute',
    height: 35,
    width: 35
  },
  plantText: {
    position: 'absolute',
    marginLeft: 50,
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 24,
  },
  plantWatering: {
    position: 'absolute',
    textAlign: 'right',
    right: -420
  },
});

export default GetPlantsScreen;