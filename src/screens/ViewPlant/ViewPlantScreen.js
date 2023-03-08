import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Plant } from '../../models'
import '@azure/core-asynciterator-polyfill'

const ViewPlantScreen = () => {

return (
    <>
      <View style={styles.addPlantView}>
        <Text>HELLO!</Text>
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
  }
});

export default ViewPlantScreen;