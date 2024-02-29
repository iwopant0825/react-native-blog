import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import CreatePostScreen from './components/CreatePostScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{unmountOnBlur: true,}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{unmountOnBlur: true,}}/>
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{unmountOnBlur: true,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
