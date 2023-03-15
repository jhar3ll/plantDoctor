import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = (props) => {
    const [checked, setChecked] = useState(false);
    
    return (
        <View style={styles.container}>
            {
                checked ? 
                <Icon name="checkmark-circle" color={'green'}  size={40} onPress={() => {[console.log(props.plant), setChecked(!checked)]}}/>
                :
                <Icon name="checkmark-circle-outline"  size={40} onPress={() => {[console.log(props.plant), setChecked(!checked)]}}/> 
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
