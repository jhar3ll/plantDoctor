import React, { useState } from 'react'; 
import {StyleSheet, View, Text, Pressable, TextInput, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import moment from 'moment/moment';
import '@azure/core-asynciterator-polyfill'

const ViewPlantScreen = (props) => {
  const today = moment().format('dddd, MMM. D, YYYY');
  const userPlant = props.userPlant;
  const [updatedPlant, setUpdatedPlant] = useState({name: userPlant.name, waterFrequency: userPlant.waterFrequency.toString()});
  const [formError, setFormError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  let waterHistories = [];
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
      props.setSynced(false);
      props.setUserPlants([]);
      console.log('updatePlant', 'success')
    } catch (error) {
      console.log('updatePlant', error)
    } 
  }

  const deletePlant = async () => {
    try {
      await DataStore.delete(userPlant);
      props.setOverlayVisible(false);
      props.setSynced(false);
      props.setUserPlants([]);
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
  
  const getHistory = () => {
    let dates = [];
    for (let i=0; i<userPlant.waterings.length; i++){
      if (userPlant.waterings[i].waterDate != today){
        dates.push({"waterCount": (userPlant.waterings[i].waterCount), "waterDate": userPlant.waterings[i].waterDate })
      }
    }

    const difference = (a,b) => {
      let date1 = moment(a.waterDate, 'dddd, MMM. D, YYYY');
      let date2 = moment(b.waterDate, 'dddd, MMM. D, YYYY');
      return date2.diff(date1, 'days')
    }
    
    const sorted = dates.sort((a,b) => difference(a,b))
    const histories = [{"day": "Yesterday: ", "count": sorted[0].waterCount}];
    if (sorted.length === 2){
      histories.push({"day": "2 days ago: ", "count": sorted[1].waterCount});
    } else if (sorted.length === 3){
      histories.push({"day": "2 days ago: ", "count": sorted[1].waterCount, "day": "3 days ago: ", "count": sorted[2].waterCount});
    }
    waterHistories = histories;
  }


 getHistory();
 
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.viewPlant}> 
      <Image style={styles.viewPlantCactus} source={require('../../../assets/icons/cactus.png')} />
      <Text style={styles.viewPlantName}>{userPlant.name}</Text>
      <Text style={styles.viewPlantWater}> Needs water {userPlant.waterFrequency} {times} per day.</Text>
      {showUpdateForm ? (
      <View style={styles.updatePlantView} >
        <Text style={styles.formError}>{formError}</Text>
        <TextInput
          style={styles.input}
          clearButtonMode='always'
          onFocus={() => setFormError('')}
          defaultValue={updatedPlant.name}
          onChangeText={newName => {
            setUpdatedPlant({
              ...updatedPlant,
              name: newName
            });
          }}
          placeholder="new plant name"
          placeholderTextColor={"#808080"}
          returnKeyType='done'
          
          />
          
        <TextInput
          style={styles.input}
          onFocus={() => setFormError('')}
          clearButtonMode='always'
          defaultValue={updatedPlant.waterFrequency}
          onChangeText={newWaterFrequency => {
            setUpdatedPlant({
              ...updatedPlant,
              waterFrequency: newWaterFrequency
            });
          }}
          placeholder="new waterings per day"
          placeholderTextColor={"#808080"}
          keyboardType="number-pad"
          />
      </View>
      ):( 
        <View style={styles.plantHistoryView}>
          <Text style={styles.plantHistoryText}>Plant History:</Text>
          {waterHistories.map((history, index) => {
          return (
            <View key={index} style={styles.histories} >
              <Text style={styles.historyDay}>{history.day}</Text>
              <Text style={styles.historyCount}>{history.count}</Text>
            </View>
          )
          
          })
          }
        </View>
      )}
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
  plantHistoryView: {
    position: 'relative',
    top: 385,
    left: 0
  },
  plantHistoryText: {
    position: 'absolute',
    fontFamily: 'ChalkboardSE-Regular',
    top: -25,
    alignSelf: 'center',
    width: 125,
    fontSize: 20
  },
  histories: {
    position: 'relative',
    marginLeft: 0
  },
  historyDay: {
    position: 'relative',
    textAlign: 'left',
    marginTop: 50,
    left: -135
  },
  historyCount: {
    position: 'relative',
    right: -200
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