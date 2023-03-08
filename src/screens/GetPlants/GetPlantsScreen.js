import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Modal } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark';
import { useNavigation } from '@react-navigation/native';

const GetPlantsScreen = (props) => {
  const navigation = useNavigation();
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
  const [userPlant, setUserPlant] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);
 
  const getAllPlants = async () => {
    try {
      let plants = (await DataStore.query(Plant, p => p.owner.eq(user))
      ).sort((a,b) => a.name > b.name ? 1 : -1);
      setUserPlants(plants);
      props.setNewPlant(false)
    } catch (error){
      console.log(error)
    }
  }

  const getPlant = async (plantId) => {
    try {
      let plant = await DataStore.query(Plant, p => p.id.eq(plantId));
      setUserPlant(plant);
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

  const toggleOverlay = (plantId) => {
    setOverlayVisible(!overlayVisible);
  }
  useEffect(() => {
    getAllPlants();
  }, [props.newPlant])

return (   
      <View style={styles.container}>
         <Modal animationType="slide" transparent={true} visible={overlayVisible}>
          <View style={styles.viewPlant}></View>
            <Text style={styles.signOutText}>Edit Plant here</Text>
          </Modal>
        {
          userPlants.map((plant) => {
            return(
            <View key={plant.id} style={styles.plant} >
              <Pressable onPress={() => setOverlayVisible(!overlayVisible)}>
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
  },
});

export default GetPlantsScreen;