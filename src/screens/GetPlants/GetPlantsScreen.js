import React, { useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark/Checkmark';
import { Overlay } from '@rneui/themed';
import ViewPlantScreen from '../ViewPlant/ViewPlantScreen';
import AddPlantScreen from '../AddPlant/AddPlantScreen';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
  const [userPlant, setUserPlant] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const getAllPlants = async () => {
    try {
      const plants = (await DataStore.query(Plant, p => p.waterFrequency.gt(0))
      ).filter(p => p.owner === user)
      .sort((a,b) => a.name > b.name ? 1 : -1);
      setUserPlants(plants);
    } catch (error){
      console.log('getAllPlants', error)
    }
  }

  const getPlant = (plant) => {
    setUserPlant(plant);
  }

  const updatePlantCount = async (plant) => {
    try{
      await DataStore.save(Plant.copyOf(plant, updated => {
        updated.name = plant.name;
        updated.waterFrequency = Number(plant.waterFrequency);
        updated.waterDate = props.today;
        updated.waterCount = (plant.waterCount + 1);
        })
      );
      setReload(!reload);
      console.log('updatePlant', 'success')
    } catch (error) {
      console.log('updatePlant', error)
    } 
  }

  const renderChecks = (plant) => {
    const checks = [];
    for (let i=0; i<(plant.waterFrequency - plant.waterCount); i++){
      const check = <Checkmark plant={plant} updatePlantCount={updatePlantCount} checked={false}/>
      checks.push(check);
    }

    for (let i=0; i<plant.waterCount; i++){
      const check = <Checkmark plant={plant} updatePlantCount={updatePlantCount} checked={true}/>
      checks.push(check);
    }
    return checks;
  }

  const reloadAfterAdd = () => {
    <AddPlantScreen reload={reload} setReload={setReload} />
  }

  useEffect(() => {
    getAllPlants();
  }, [reload])

return (   
    <View style={styles.container}>
      <Overlay overlayStyle={styles.viewPlantView} animationType="slide" visible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
        <ViewPlantScreen userPlant={userPlant} setOverlayVisible={setOverlayVisible} reload={reload} setReload={setReload}/>
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
              <Icon style={styles.plantWatering}>{renderChecks(plant)}</Icon>
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