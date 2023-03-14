import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = (props) => {
    const checked = props.checked;

    return (
        <View style={styles.container}>
            {
                checked ? 
                <Icon name="checkmark-circle" color={'green'}  size={40}/>
                :
                <Icon name="checkmark-circle-outline"  size={40} /> 
            }     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default Checkmark;
