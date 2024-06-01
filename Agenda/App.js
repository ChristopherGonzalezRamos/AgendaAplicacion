import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native'; // Importación de ScrollView
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AgendaScreen from './screens/AgendaScreen';
import EditarAgendaScreen from './screens/EditarAgendaScreen';
import RecordatoriosScreen from './screens/RecordatoriosScreen';
import BuscarNotasScreen from './screens/BuscarNotasScreen';
import NotaDetallesScreen from './screens/NotaDetallesScreen';
import EstadisticasScreen from './screens/EstadisticasScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Agenda') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'EditarAgenda') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Recordatorios') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Estadísticas') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'lightblue',
          borderTopWidth: 2,
          borderTopColor: 'blue',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="EditarAgenda" component={EditarAgendaScreen} />
      <Tab.Screen name="Recordatorios" component={RecordatoriosScreen} />
      <Tab.Screen name="Estadísticas" component={EstadisticasScreen} />
      <Tab.Screen name="Buscar" component={BuscarNotasScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={route?.params}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="NotaDetalles" component={NotaDetallesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
