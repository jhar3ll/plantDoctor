import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import t from 'tcomb-form-native'

const Form = t.form.Form;
const Plant = t.struct({
  name: t.String,
  waterFrequency: t.Number
});
const AddPlantScreen = () => {
  const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});

  const options = {
    auto: 'placeholders',
    fields: {
      name: {
        placeholder: 'plant name',
        placeholderTextColor: '#808080'
      },
      waterFrequency: {
        placeholder: 'waterings per day',
        placeholderTextColor: '#808080'
      }
    }, 
  };
const handleSubmit = async () => {
    // Saving product details
  };
return (
    <>
      <View style={styles.addPlantView}>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={Plant}
            options={options}
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