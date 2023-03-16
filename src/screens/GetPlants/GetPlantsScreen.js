import React, { useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Waterings, Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark/Checkmark';
import { Overlay } from '@rneui/themed';
import ViewPlantScreen from '../ViewPlant/ViewPlantScreen';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
  const [userPlant, setUserPlant] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const getAllPlants = async () => {
    try {
      const plants = (await DataStore.query(Plant, p => p.waterFrequency.gt(0))
      ).filter(p => p.owner === user)
      .sort((a,b) => a.name > b.name ? 1 : -1);
      setUserPlants(plants);
      props.setNewPlant(!props.newPlant);
    } catch (error){
      console.log('getAllPlants', error)
    }
  }

  const getPlant = (plant) => {
    setUserPlant(plant);
  }

  const updatePlant = async (plant, waterings) => {
      
      try{
        await DataStore.save(Plant.copyOf(plant, updated => {
          updated.name = plant.name;
          updated.waterFrequency = Number(plant.waterFrequency);
          updated.waterings = waterings;
          })
        );
        console.log('updatePlant', 'success')
        getAllPlants();
    } catch (error) {
      console.log('updatePlant', error)
    } 
  }

  const updateWatering = (plant) => {
    const today = props.getDate();
    let waterings = [];
    
    for (let i = 0; i < plant.waterings.length; i++){
      let watering = JSON.parse(plant.waterings[i]);
      if (watering.wateringDate === today){
        let result = `{"wateringDate": "${today}", "wateringCount": "${watering.wateringCount = Number(watering.wateringCount) + 1}"}`
        waterings.push(result);
      } else {
        waterings.push(`{"wateringDate": "${watering.wateringDate}", "wateringCount": "${Number(watering.wateringCount)}"}`);
      }
    }
    updatePlant(plant, waterings);
  }
  

  const renderCheck = (plant) => {
    const checks = [];
    for (let i=0; i<plant.waterFrequency; i++){
      const check = <Checkmark plant={plant} updateWatering={updateWatering}/>
      checks.push(check);
    }
    return checks;
  }

  useEffect(() => {
    getAllPlants();
  }, [])
 
return (   
    <View style={styles.container}>
      <Overlay overlayStyle={styles.viewPlantView} animationType="slide" visible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
        <ViewPlantScreen userPlant={userPlant} setOverlayVisible={setOverlayVisible} newPlant={props.newPlant} setNewPlant={props.setNewPlant}/>
        <Pressable style={styles.closeOverlay} onPress={() => {setOverlayVisible(!overlayVisible)}}>{props.closeIcon}</Pressable>
      </Overlay>

      {
        userPlants.map((plant) => {
          return(
            <View key={plant.id} style={styles.plant} >
              <Pressable onPress={() => [setOverlayVisible(!overlayVisible), getPlant(plant)]}>
                <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')} />
              </Pressable>
              <Text style={styles.plantText}>{plant.name}</Text>
              <Icon style={styles.plantWatering}>{renderCheck(plant)}</Icon>
            </View>
          )
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  }, 
  viewPlantView: {
    height: '85%',
    width: '85%',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  closeOverlay: {
    position: 'absolute',
    bottom: 20
  },
  plant: {
    marginBottom: 60
  },
  cactus: {
    position: 'absolute',
    height: 50,
    width: 50,
    marginTop: -8
  },
  plantText: {
    position: 'absolute',
    marginLeft: 58,
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 24,
  },
  plantWatering: {
    position: 'absolute',
    textAlign: 'right',
    right: -420
  }
});

export default GetPlantsScreen;