import React, { useState } from 'react'; 
import {StyleSheet, View, Text, Pressable, TextInput, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import '@azure/core-asynciterator-polyfill'

const ViewPlantScreen = (props) => {
  const userPlant = props.userPlant;
  const [updatedPlant, setUpdatedPlant] = useState({name: '', waterFrequency: ''});
  const [formError, setFormError] = useState('');
  let times = userPlant.waterFrequency === 1 ? 'time' : 'times';

  const updatePlant = async () => {
    if (updatedPlant.name === ''){
     
      setFormError(`Field 'name' cannot be blank.`);
      return;
    } else if (updatedPlant.waterFrequency === ''){
      setFormError(`Field 'water' cannot be blank.`);
      return;
    }

    try{
      await DataStore.save(Plant.copyOf(userPlant, updated => {
        updated.name = updatedPlant.name;
        updated.waterFrequency = Number(updatedPlant.waterFrequency);
        })
      );
      props.setOverlayVisible(false);
      props.setNewPlant(!props.newPlant);
    } catch (error) {
      console.log('updatePlant', error)
    } 
  }

  const deletePlant = async () => {
    try {
      await DataStore.delete(userPlant);
      props.setOverlayVisible(false);
      props.setNewPlant(!props.newPlant);
    } catch (error){
      console.log('deletePlant', error);
    }
  }

  const confirmDelete = () => {
    return Alert.alert(
      `Delete ${userPlant.name}?`, 
      `Are you sure you want to delete your plant, ${userPlant.name}?`,
    [{
        text: 'Yes',
        onPress: () => {
          deletePlant();
        }
      }, 
      {text: 'No'}
    ])
  }

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.viewPlant}> 
      <Image style={styles.viewPlantCactus} source={require('../../../assets/icons/cactus.png')} />
      <Text style={styles.viewPlantName}>{userPlant.name}</Text>
      <Text style={styles.viewPlantWater}> Needs water {userPlant.waterFrequency} {times} per day.</Text>

      <View style={styles.updatePlantView} >
        <Text style={styles.formError}>{formError}</Text>
        <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          clearButtonMode='always'
          value={updatedPlant.name}
          onChangeText={newName => {
            setUpdatedPlant({
              ...updatedPlant,
              name: newName
            });
          }}
          placeholder="plant name"
          placeholderTextColor={"#808080"}
          returnKeyType='done'
          defaultValue={userPlant.name}
          />
          
        <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          clearButtonMode='always'
          value={updatedPlant.waterFrequency}
          onChangeText={newWaterFrequency => {
            setUpdatedPlant({
              ...updatedPlant,
              waterFrequency: newWaterFrequency
            });
          }}
          placeholder="waterings per day"
          placeholderTextColor={"#808080"}
          keyboardType="number-pad"
          defaultValue={userPlant.waterFrequency.toString()}
          />
      </View>

      <Pressable style={styles.updatePlantButton} underlayColor='#fff' onPress={updatePlant}>
        <Text style={styles.updatePlantButtonText}>Update Plant</Text>
      </Pressable>
      <Pressable style={styles.deletePlantButton} underlayColor='#fff' onPress={confirmDelete}>
        <Text style={styles.deletePlantButtonText}>Delete Plant</Text>
      </Pressable>
    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  },
  updatePlantView: {
    position: 'absolute',
    alignItems: 'center',
    top: 380
  },
  formError: {
    position: 'absolute',
    marginTop: 20,
    color: 'red'
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
  inputHelp: {
    position: 'absolute'
  }
});

export default ViewPlantScreen;