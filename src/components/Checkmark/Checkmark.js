import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = (props) => {
    const [checked, setChecked] = useState(props.checked);
    const [editable, setEditable] = useState(props.editable);
    
    const updateCheck = (plant) => {
        setChecked(!checked);
        props.updatePlantCount(plant)
    }

    const render = () => {
        if (checked) {
            return <Icon name="checkmark-circle" color={'green'}  size={props.size} />
        } else if (!checked && editable) {
            return <Icon name="checkmark-circle-outline"  size={props.size} onPress={() => {updateCheck(props.plant)}}/>
        } else if (!checked && !editable) {
            return <Icon name="checkmark-circle-outline"  size={props.size} />
        }
    }

    return (
        <View style={styles.container}>{render()}</View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default Checkmark;
