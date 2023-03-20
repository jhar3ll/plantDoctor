import React, { useEffect,useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import Icon  from 'react-native-vector-icons/Ionicons';
import Checkmark from '../../components/Checkmark/Checkmark';
import { Overlay } from '@rneui/themed';
import ViewPlantScreen from '../ViewPlant/ViewPlantScreen';

const GetPlantsScreen = (props) => {
  const user = props.user.username;
  const [userPlant, setUserPlant] = useState(undefined);
  const [userPlants, setUserPlants] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [synced, setSynced] = useState(false);
  
  useEffect(() => {
    setUserPlants([]);
    const subscription =  DataStore.observeQuery(
      Plant, 
      p => p.and(p => [p.owner.eq(user)]), {
      sort: s => s.name(SortDirection.ASCENDING)
      }).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
      //console.log(snapshot)
        setUserPlants(items);
        setSynced(isSynced);
     
    })
      return () => {
        subscription.unsubscribe();
    }
  }, [synced])

  const updateDays = async (plant, waterings) => {
    try{
      DataStore.save(Plant.copyOf(plant, updated => {
       updated.waterings = waterings;
       })
     );
     setSynced(false);
     setUserPlants([]);
     console.log('updatePlant', 'success')
   } catch (error) {
     console.log('updatePlant', error)
   }
  }

  const newDays =  () => {
    userPlants.map(p => {
      let waterings = p.waterings;
      let isToday = false;
      
      for (let i=0; i<p.waterings.length; i++){
        if (p.waterings[i].waterDate === props.today){
          isToday = true;
        }
      }
     
      if (!isToday) {
        updateDays(p, [...waterings, {"waterDate": props.today, "waterCount": 0}]);
      }     
    }
  )}
    
  const getPlant = (plant) => {
    setUserPlant(plant);
  }
 
  const updatePlantCount = async (plant) => {
    const waterings = [];
    
    for (let i=0; i<plant.waterings.length; i++){
      if (plant.waterings[i].waterDate != props.today){
        waterings.push(plant.waterings[i]);
      } else {
        waterings.push({"waterCount": (plant.waterings[i].waterCount + 1), "waterDate": props.today});
      }
    }

    try{
      await DataStore.save(Plant.copyOf(plant, updated => {
        updated.waterings = waterings;
        })
      );
      setSynced(false);
      setUserPlants([]);
      console.log('updatePlant', 'success')
    } catch (error) {
      console.log('updatePlant', error)
    } 
  }

  const renderChecks = (plant) => {
    if (synced) {
      const checks = [];
      let waterCount = 0;
      
        for (let i=0; i<plant.waterings.length; i++){
          if (plant.waterings[i].waterDate === props.today){
            waterCount = plant.waterings[i].waterCount;
          }
        }
        
        for (let j=0; j<(plant.waterFrequency - waterCount); j++){
          const check = <Checkmark plant={plant} updatePlantCount={updatePlantCount} checked={false}/>
          checks.push(check);
        }

        for (let k=0; k<waterCount; k++){
          const check = <Checkmark plant={plant} updatePlantCount={updatePlantCount} checked={true}/>
          checks.push(check);
        }
        return checks;
      }
    }

  if (!synced){ return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>)}
  
return (   
    <View style={styles.container}>
      <Overlay overlayStyle={styles.viewPlantView} animationType="slide" visible={overlayVisible} onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
        <ViewPlantScreen userPlant={userPlant} setOverlayVisible={setOverlayVisible} setUserPlants={setUserPlants} setSynced={setSynced} />
        <Pressable style={styles.closeOverlay} onPress={() => {setOverlayVisible(!overlayVisible)}}>{props.closeIcon}</Pressable>
      </Overlay>

      {userPlants.map((plant, index) => {
        return(
          <View key={index} style={styles.plant} >
            <Pressable onPress={() => [setOverlayVisible(!overlayVisible), getPlant(plant)]}>
              <Image style={styles.cactus} source={require('../../../assets/icons/cactus.png')} />
            </Pressable>
            <Text style={styles.plantText}>{plant.name}</Text>
            <Icon style={styles.plantWatering}>{renderChecks(plant)}</Icon>
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