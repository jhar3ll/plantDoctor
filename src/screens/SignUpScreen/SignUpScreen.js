import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { Authenticator } from 'aws-amplify-react-native';
import { StyleSheet, View, Text } from 'react-native';
import config from '../../aws-exports'
import { Amplify } from 'aws-amplify';

Amplify.configure(config); 
const SignUpScreen = () => {
    return (
      <View style={styles.root}>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center'
    },
  });

  const signUpConfig = {
    header: "Sign up for Plant Doctor!",
    hideAllDefaults: true,
    signUpFields: [
      {
        label: "First name",
        key: "given_name",
        required: true,
        displayOrder: 1,
        type: "string",
      },
      {
        label: "Email",
        key: "email",
        required: true,
        displayOrder: 2,
        type: "string",
      },
      {
        label: "Username",
        key: "preferred_username",
        required: true,
        displayOrder: 3,
        type: "string",
      },
      {
        label: "Password",
        key: "password",
        required: true,
        displayOrder: 4,
        type: "password",
      },
    ],
  };

export default withAuthenticator(SignUpScreen, {signUpConfig});