import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

const Checkmark = () => {
    const [check, setCheck] = useState(false); 

    const updateCheck = () => {
        check===false ? setCheck(true) : setCheck(false)
    }

    return (
        <View style={styles.container}>
            {
                check === false ? 
                <Icon name="checkmark-circle-outline" onPress={updateCheck} size={40} />
                :
                <Icon name="checkmark-circle" color={'green'} onPress={updateCheck} size={40} />
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
