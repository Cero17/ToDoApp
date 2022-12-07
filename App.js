import { StyleSheet, StatusBar} from 'react-native';
import HomeScreen from './components/HomeScreen';
import InputItem from './components/InputItem';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditItem from './components/EditItem';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar/>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: { backgroundColor: "#3F0071" },
        headerTintColor: "white",
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 25}
      }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Task' component={InputItem} />
        <Stack.Screen name='Update' component={EditItem}/>  
      </Stack.Navigator>
   </NavigationContainer>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#810CA8',
  },
});
