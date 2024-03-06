import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthContentProvider, { AuthContext } from './store/auth-context';
import HomeScreen from './screens/HomeScreen';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();

function NormalStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: '#6f804a'
        },
        headerTintColor:'white',
        contentStyle:{
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          headerTitle:'Kullanıcı Giriş'
        }}
        />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          headerTitle:'Kullanıcı Kayıt'
        }}
      />
    </Stack.Navigator>
  )
}

function AfterAuthenticatedStack () {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: '#6f804a'
        },
        headerTintColor:'white',
        contentStyle:{
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerTitle:'Anasayfa',
          headerRight:({tintColor}) => (
            <Pressable 
              style={({pressed}) => pressed && styles.pressed}
              onPress={authContext.logout}
            >
              <MaterialCommunityIcons name="exit-run" size={27} color={tintColor} />
            </Pressable>
          )
        }}
        />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
      <NavigationContainer>
        {!authContext.isAuthenticated && <NormalStack />}
        {authContext.isAuthenticated && <AfterAuthenticatedStack />}
      </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthContentProvider>
      <Navigation />
    </AuthContentProvider>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
