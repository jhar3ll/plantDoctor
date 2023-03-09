import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark';
import { Overlay } from '@rneui/themed';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlants, setUserPlants] = useState([]);
  const [userPlant, setUserPlant] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [updatedPlant, setUpdatedPlant] = useState({})
 
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

  const getPlant = (plant) => {
    let times = ''
    plant.waterFrequency === 1 ? times = 'time' : times = 'times' 
     setUserPlant(
      <View style={styles.viewPlant}> 
        <Image style={styles.viewPlantCactus} source={require('../../../assets/icons/cactus.png')} />
        <Text style={styles.viewPlantName}>{plant.name}</Text>
        <Text style={styles.viewPlantWater}> Needs water {plant.waterFrequency} {times} per day.</Text>

        <View style={styles.updatePlantView}>
          <TextInput
            style={styles.input}
            //onChangeText={setUpdatedPlant}
            //value={plantName}
            placeholder="plant name"
            placeholderTextColor={"#808080"}
            defaultValue={plant.name}
            />

          <TextInput
            style={styles.input}
            // onChangeText={setWaterFrequency}
            // value={waterFrequency}
            placeholder="waterings per day"
            keyboardType="numeric"
            placeholderTextColor={"#808080"}
            defaultValue={plant.waterFrequency.toString()}
            />
        </View>

        <Pressable style={styles.updatePlantButton} underlayColor='#fff' onPress={() => updatePlant(plant)}>
          <Text style={styles.updatePlantButtonText}>Update Plant</Text>
        </Pressable>
        <Pressable style={styles.deletePlantButton} underlayColor='#fff' onPress={() => deletePlant(plant)}>
          <Text style={styles.deletePlantButtonText}>Delete Plant</Text>
        </Pressable>
      </View>
    )
  }
  
  const updatePlant = async (plant) => {

  }

  const deletePlant = async (plant) => {
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

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  }

  useEffect(() => {
    getAllPlants();
  }, [props.newPlant])

return (   
      <View style={styles.container}>
         <Overlay overlayStyle={styles.viewPlantView} animationType="slide" visible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
           <View>{userPlant}</View> 
            
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
  },
  
  viewPlant: {
    flex: 1,
    alignItems: 'center'
  },
  viewPlantCactus: {
    position: 'absolute',
    height: 250,
    width: 250,
    alignSelf: 'center'
  }, 
  viewPlantName:{
    position: 'absolute',
    marginTop: 270,
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 48,
  },
  viewPlantWater: {
    fontFamily: 'ChalkboardSE-Regular',
    top: 350,
    fontSize: 24,
    fontStyle: 'italic'
  },
  updatePlantButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    backgroundColor: '#B3EFA9',
    bottom: 100,
    width: 150,
    height: 60,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  updatePlantButtonText: {
    position: 'absolute',
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 20,
  }, 
  deletePlantButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    backgroundColor: '#B3EFA9',
    bottom: 100,
    width: 150,
    height: 60,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  deletePlantButtonText: {
    position: 'absolute',
    fontFamily: 'ChalkboardSE-Regular',
    color: 'red',
    fontSize: 20,
  }, 
  input: {
    top: 30,
    height: 40,
    width: 280,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30
  },
});

export default GetPlantsScreen;