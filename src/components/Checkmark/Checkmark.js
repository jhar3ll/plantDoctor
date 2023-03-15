import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = (props) => {
    const [checked, setChecked] = useState(false);

    const updateCheck = (plant) => {
        setChecked(!checked);
        props.updateWatering(plant, checked)
    }

    return (
        <View style={styles.container}>
            {
                checked ? 
                <Icon name="checkmark-circle" color={'green'}  size={40} onPress={() => {updateCheck(props.plant)}}/>
                :
                <Icon name="checkmark-circle-outline"  size={40} onPress={() => {updateCheck(props.plant)}}/> 
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
