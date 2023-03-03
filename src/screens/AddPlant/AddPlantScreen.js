import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import t from 'tcomb-form-native'
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import '@azure/core-asynciterator-polyfill'

const Form = t.form.Form;
const createPlant = t.struct({
  name: t.String,
  waterFrequency: t.Number
});

const AddPlantScreen = () => {
  const [form, setForm] = useState(null); 
  const [formValues, setFormValues] = useState({});
  const [formError, setFormError] = useState('')
  
  const options = {
    auto: 'placeholders',
    fields: {
      name: {
        placeholder: 'plant name',
        placeholderTextColor: '#808080',
      },
      waterFrequency: {
        placeholder: 'waterings per day',
        placeholderTextColor: '#808080',
      }
    }, 
  };
const handleSubmit = async () => {
  try {
    await DataStore.save(
      new Plant({
      "name": formValues.name,
      "waterFrequency": Number(formValues.waterFrequency)
    })
  );
    console.log("success!")
  } catch (error) {
    setFormError(error.toString())
  }
}

useEffect(() => {
  setFormError(undefined)
}, [formValues]);

return (
    <>
      <View style={styles.addPlantView}>
          <Form
            ref={(c) => setForm(c)}
            value={formValues}
            type={createPlant}
            options={options}
            onChange={setFormValues}
          />
          <Pressable style={styles.addPlantButton} underlayColor='#fff' onPress={handleSubmit}>
          <Text style={styles.addPlantButtonText}>Add Plant</Text>
          </Pressable>
      </View>
      <Text style={{color:'red'}}>{formError}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  addPlantView: {
    position: 'absolute',
    marginTop: 80,
    height: 'auto',
    marginBottom: 20
  },
  addPlantButton: {
    position: 'absolute',
    backgroundColor: '#B3EFA9',
    marginTop: 10,
    top: 100,
    width: 152,
    height: 30,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 35
  },
  addPlantButtonText: {
    position: 'absolute',
    padding: 5,
    marginLeft: 40
  }
});
export default AddPlantScreen;