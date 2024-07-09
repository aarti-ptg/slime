import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import WelcomeScreen from './WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    
  );
};

export default App;
