import React from 'react';
import {View, StyleSheet} from 'react-native';
import Navigation from './src/navigation/';


const App = () => {
  return (
   <View style={styles.root}>
    <Navigation />
   </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;