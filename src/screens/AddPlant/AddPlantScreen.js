import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableWithoutFeedback } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import moment from 'moment';
import '@azure/core-asynciterator-polyfill'

const AddPlantScreen = (props) => {
  const [plantName, setPlantName] = useState(undefined);
  const [waterFrequency, setWaterFrequency] = useState(undefined);
  const [formError, setFormError] = useState('');
  
const handleSubmit = async () => {  
  const today = moment().format('dddd, MMM. D, YYYY');
  try {
    await DataStore.save(
      new Plant({
      "name": plantName,
      "waterFrequency": Number(waterFrequency),
      "owner": String(props.user.username),
      "waterDate": today,
      "waterCount": 0
    })
  );
    props.closeForm();
    props.setReload(!props.reload);
    console.log("success!");
  } catch (error) {
    console.log(error);
    setFormError(error.toString());
  }
}

return (
  <>
    <View style={styles.addPlantView}>
      <Text style={{color: 'red'}}>{formError}</Text>
      <TextInput
        style={styles.input}
        onFocus={() => setFormError('')}
        clearButtonMode='while-editing'
        onChangeText={setPlantName}
        value={plantName}
        placeholder="plant name"
        placeholderTextColor={"#808080"}
        />

      <TextInput
        style={styles.input}
        onFocus={() => setFormError('')}
        clearButtonMode='while-editing'
        onChangeText={setWaterFrequency}
        value={waterFrequency}
        placeholder="waterings per day"
        keyboardType="numeric"
        placeholderTextColor={"#808080"}
        />

        <Pressable style={styles.addPlantButton} underlayColor='#fff' onPress={handleSubmit}>
          <Text style={styles.addPlantButtonText}>Add Plant</Text>
        </Pressable>
        
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  addPlantView: {
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    height: 'auto',
    marginBottom: 20
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
  addPlantButton: {
    flex: 1,
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3EFA9',
    marginTop: 10,
    top: 100,
    width: 150,
    height: 60,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 100
  },
  addPlantButtonText: {
    position: 'relative',
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 24,
  }, 
});

export default AddPlantScreen;