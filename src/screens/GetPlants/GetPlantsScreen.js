import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark';
import { Overlay } from '@rneui/themed';
import ViewPlantScreen from '../ViewPlant/ViewPlantScreen';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
  const [userPlant, setUserPlant] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);
 
  const getAllPlants = async () => {
    try {
      let plants = (await DataStore.query(Plant, p => p.waterFrequency.gt(0))
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

  const renderCheck = (waterFrequency) => {
    const checks = [];
    for (let i=0; i<waterFrequency; i++){
      checks.push(<Checkmark />)
    }
    return checks;
  }

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  }

  useEffect(() => {
    getAllPlants();
  }, [props.newPlant])

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
              <Icon style={styles.plantWatering}>{renderCheck(plant.waterFrequency)}</Icon>
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