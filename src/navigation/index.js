import React, {useEffect, useState}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/';
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import UserHomeScreen from '../screens/UserHomeScreen/UserHomeScreen'
import { Auth, Hub } from 'aws-amplify';
import { ActivityIndicator, View } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import AddPlantScreen from '../screens/AddPlant/AddPlantScreen';
import ViewPlantScreen from '../screens/ViewPlant/ViewPlantScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (error) {
      setUser(null);
      console.log('checkUser', error)
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut'){
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }
 
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'  screenOptions={{headerShown: false}}>
        <Stack.Screen name='User'>{(props) => <UserHomeScreen {...props} user={user} setUser={setUser}/>}</Stack.Screen>
        <Stack.Screen name='AddPlants'>{(props) => <AddPlantScreen {...props} user={user}/>}</Stack.Screen>
        <Stack.Screen name='ViewPlant'>{(props) => <ViewPlantScreen {...props} user={user}/>}</Stack.Screen>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
 )
}

export default Navigation;