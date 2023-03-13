import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = (props) => {
    const [checked, setChecked] = useState(false);
    const [check, setCheck] = useState({'id': props.id, 'date': props.dateTime, 'checked': checked}); 
    const updateCheck = () => {setCheck({...check, checked: !check.checked})};
    
    useEffect(() => {
        
      }, [checked])
    
    return (
        <View style={styles.container}>
            {
                check.checked ? 
                <Icon name="checkmark-circle" color={'green'} onPress={() => [updateCheck(), setChecked(!checked)]} size={40}/>
                :
                <Icon name="checkmark-circle-outline" onPress={() => [updateCheck(), setChecked(!checked)]} size={40} /> 
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
