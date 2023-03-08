import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native';
import moment from 'moment';
import AddPlantScreen from '../AddPlant/AddPlantScreen';
import { Auth } from 'aws-amplify';
import Icon  from 'react-native-vector-icons/Ionicons';
import GetPlantsScreen from '../GetPlants/GetPlantsScreen';

const UserHomeScreen = (props) => {
  const dateTime = moment().format('dddd, MMM. D, YYYY');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [addPlantVisible, setaddPlantVisible] = useState(false);
  const [newPlant, setNewPlant] = useState(false);
  const settingIcon = <Icon name="settings" size={25} color='#000' />
  const closeIcon = <Icon name="close-circle" size={30} color='#000' />
  const greeting = `Welcome, ${props.user.attributes.given_name}!`

  const signOut = () => {
    return Alert.alert(
      "Sign out", 
      "Are you sure you want to sign out?",
    [
      {
        text: 'Yes',
        onPress: () => {
          Auth.signOut();
          props.setUser(undefined)
        }
      }, 
      {text: 'No'}
    ])
  }

  const closeForm = () => {
    setaddPlantVisible(false)
    setNewPlant(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeUser}>{greeting}</Text>
      <Text style={styles.dateText}>{dateTime}</Text>
      <Pressable style={styles.options} onPress={() => setOptionsVisible(true)}>{settingIcon}</Pressable>
      <View style={styles.listPlants}>
        <GetPlantsScreen user={props.user} newPlant={newPlant} setNewPlant={setNewPlant} /> 
      </View>
      <Modal animationType="slide" transparent={true} visible={optionsVisible}>
          <View style={styles.optionsView}></View>
            <Text style={styles.signOutText} onPress={signOut}>Sign Out</Text>
            <Pressable style={styles.closeOptions} onPress={() => {setOptionsVisible(false)}}>{closeIcon}</Pressable>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={addPlantVisible}>
        <View style={styles.addPlantView}>
          <View style={styles.addPlantForm}>
            <AddPlantScreen closeForm={closeForm} user={props.user}/>
            <Pressable style={styles.closeButton} onPress={() => {setaddPlantVisible(false)}}>{closeIcon}</Pressable>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.addPlantBackground} onPress={() => setaddPlantVisible(true)}> 
       <Icon name="add" size={55} style={styles.addPlantIcon}/>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFEEE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeUser: {
    position: 'absolute',
    alignItems: 'center',
    top: 50,
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 42,
  },
  dateText: {
    position: 'absolute',
    top: 110,
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 24,
    textDecorationLine: 'underline'
  },
  options: {
    position: 'absolute',
    top: 116,
    right: 20
  },
  listPlants: {
    position: 'absolute',
    top: 300,
    left: 0
  },
  optionsView: {
    position: 'absolute',
    top: 40,
    height: 100,
    width: 120,
    right: 10,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  signOutText: {
    position: 'absolute',
    fontFamily: 'ChalkboardSE-Regular',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: 'red',
    top: 70,
    right: 50,
    padding: 5
  },
  closeOptions: {
    position: 'absolute',
    top: 120,
    right: 75
  },
  addPlantView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  addPlantForm: {
    position: 'absolute',
    height: 500,
    width: 320,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    marginTop: 20
  },
  addPlantBackground: {
    position: 'absolute',
    alignItems: 'center',
    width: 60,
    height: 60,
    bottom: 50,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: '#B3EFA9'
  },
  addPlantIcon: {
    left: 2
  }
});

export default UserHomeScreen;