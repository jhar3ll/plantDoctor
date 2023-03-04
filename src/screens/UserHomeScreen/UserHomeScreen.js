import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Modal, Pressable, Alert } from 'react-native';
import moment from 'moment';
import AddPlantScreen from '../AddPlant/AddPlantScreen';
import { Auth } from 'aws-amplify';
import Icon  from 'react-native-vector-icons/Ionicons';
import GetPlantsScreen from '../GetPlants/GetPlantsScreen';


const UserHomeScreen = (props) => {
  const dateTime = moment().format('dddd, MMM. D, YYYY');
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [addPlantVisible, setaddPlantVisible] = useState(false)
  const settingIcon = <Icon name="settings" size={20} color='#000' />
  const closeIcon = <Icon name="close-circle" size={30} color='#000' />
  const greeting = `Welcome, ${props.user.attributes.given_name}!`

  const signOut = () => {
    return Alert.alert(
      "Sign out", 
      "Are you sure you want to sign out?",
    [
      {
        text: 'Yes',
        onPress: () => {Auth.signOut();}
      }, 
      {text: 'No'}
    ])
  }

  const closeForm = () => {
    setaddPlantVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeUser}>{greeting}</Text>
      <Text style={styles.dateText}>{dateTime}</Text>
      <View style={styles.listPlants}>
        <GetPlantsScreen user={props.user}/>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionsVisible}
        onRequestClose={() => {setOptionsVisible(!optionsVisible)}}>
          <View style={styles.optionsView}></View>
            <Text style={styles.signOutText} onPress={signOut}>Sign Out</Text>
            <Pressable
              style={styles.closeOptions}
              onPress={() => {setOptionsVisible(!optionsVisible)}} >
              <Text style={styles.closeOptionsText}>{closeIcon}</Text>
            </Pressable>
      </Modal>
      <Pressable style={styles.options} 
      onPress={() => setOptionsVisible(true)}>{settingIcon}</Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addPlantVisible}
        onRequestClose={() => {setaddPlantVisible(!addPlantVisible)}}>
        <View style={styles.addPlantView}>
          <View style={styles.addPlantForm}>
            <AddPlantScreen closeForm={closeForm} user={props.user}/>
            <Pressable
              style={styles.closeButton}
              onPress={() => {setaddPlantVisible(!addPlantVisible)}} >
              <Text style={styles.closeOptionsText}>{closeIcon}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.addPlant}
        onPress={() => setaddPlantVisible(true)}>
        <Text style={styles.addPlantText}>+</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    position: 'absolute',
    top: 120,
    right: 30
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
  welcomeUser: {
    position: 'absolute',
    justifyContent: 'center',
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
  addPlant: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 50,
    borderRadius: 52,
    backgroundColor: '#B3EFA9'
  },
  addPlantText: {
    position: 'absolute',
    right: 14,
    fontSize: 50,
    width: 32,
    bottom: 5
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    marginTop: 20
  },
  closeModal: {
    position: 'relative',
    color: '#6495ED',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#6495ED',
    fontSize: 16
  },
});

export default UserHomeScreen;