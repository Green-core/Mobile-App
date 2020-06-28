import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer,DefaultTheme,DarkTheme,DrawerActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
//import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';
import deviceStorage from './services/deviceStorage';
//     screens
import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings';

import LoginScreen from './screens/Login';
import LogoutScreen from './screens/Logout';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';

import AuthHomeScreen from './screens/AuthHome';
import {Loading} from './components/Loading';


import LinkUnitsScreen from './screens/linkUnit';
import ViewAllUnits from './screens/viewAllUnits';

import AccountSettingsScreen from './screens/accountSettings';
import ViewAllUnitsScreen from './screens/viewAllUnits';
import UnitDetailsScreen from './screens/unitDetails';

// const colorScheme = useColorScheme();
// const MyTheme = {
//   dark: false,
//   colors: {
//     primary: 'white',
//     background: 'white',
//     card: '#65509f',
//     text: 'white',
//     border: 'green',
//   },
// }

import AllMessagesScreen from './screens/AllMessages'
import SingleMessageScreen from './screens/SingleMessage'
import ReplyMessageScreen from './screens/ReplyMessage'
import SendMessageScreen from './screens/SendMessage'


// options={{
//   title: 'My home',
//   headerStyle: {
//     backgroundColor: '#f4511e',
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// }}

const HeaderOptions = {
  headerStyle: {
      backgroundColor: "#3b7548"//'#16a085'
  },
  headerTintColor: "#FFFF",
  headerTitleStyle: {
      color: "#FFFF"            
  }
};

// login flow
const Auth = createStackNavigator();
 const AuthStack =()=> (
    <Auth.Navigator 
        initialRouteName="Login"
        screenOptions={{
          animationEnabled: false
        }}
        headerMode='none'
           //TODO forgot password token screen and email screen
    >
        <Auth.Screen name="Login" component={LoginScreen} /> 
        <Auth.Screen name="Signup" component={SignupScreen} />
        {/* <Auth.Screen name="Home" component={AuthHomeScreen} /> */}
    </Auth.Navigator>
 )

// All authenticated screen stack
const Home = createStackNavigator();
  const  HomeStack = () =>(
  
    <Home.Navigator 
        initialRouteName="Home"
        drawerStyle={{
            backgroundColor:'#3b7548'
        }}
         screenOptions={{ headerStyle: { backgroundColor: '#E4E4E4' },animationEnabled: false }}
    >
        <Home.Screen name="Profile settings" component={ProfileSettingsScreen} />
        <Home.Screen name="Home" component={AuthHomeScreen} />
        {/* <Home.Screen name="Login" options={{headerMode:'none'}} component={LoginScreen} /> */}
    </Home.Navigator>
  )

 const LinkUnits = createStackNavigator();
 const  LinkUnitsStack = () => (
      <LinkUnits.Navigator
          initialRouteName='LinkUnits'
         // screenOptions={HeaderOptions}
      >
          <LinkUnits.Screen
              name="LinkUnits"
              component={LinkUnitsScreen}
          />
           <LinkUnits.Screen
              name="ViewAllUnits"
              component={ViewAllUnitsScreen}
          />
           <LinkUnits.Screen
              name="UnitsDerails"
              component={UnitDetailsScreen}
          />
      </LinkUnits.Navigator>
 )

// drawer use only in authenticated screens
const Drawer = createDrawerNavigator();
const DrawerStack = () => (
    
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#FFFF'       
            }}
        >
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Link" component={LinkUnitsStack} />
            <Drawer.Screen name="View All Units" component={ViewAllUnitsScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Account settings" component={AccountSettingsScreen} />
            <Drawer.Screen name="Logout" component={LogoutScreen}/>

        </Drawer.Navigator>
)
const RootStack = createStackNavigator();
 class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      id:'',
      loading: true,
      timePassed:false,
      hasToken:false,
    };
    this.deleteItem = deviceStorage.deleteItem.bind(this);
    this.loadItem = deviceStorage.loadItem.bind(this);
    this.loadItem();
  }

 
 componentDidMount(){

   // take both id and jwt
    AsyncStorage.getItem('jwtToken').then((token) => {
      console.log('token '+token);
      this.setState({ hasToken: token !== null, loading: false})
    })
  //  this.loadItem();
    console.log(this.state.hasToken)
  }

  
  render() {
    const {loading} = this.state;
    
    if (loading) {
      return <Loading/>
    } else  {
      return (
        // <AppearanceProvider>
        //theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
          <NavigationContainer>
            <RootStack.Navigator 
              headerMode="none" 
              initialRouteName='Splash'
              screenOptions={{
                animationEnabled: false
              }}>
              <RootStack.Screen name='Splash' component={WelcomeScreen} />
              <RootStack.Screen name='Auth' component={AuthStack}/>
              <RootStack.Screen name='App' component={DrawerStack}/>
            </RootStack.Navigator>
          </NavigationContainer>
        // </AppearanceProvider>
        
      );
    }
  }
}

{
  /* <ProfileSettingsScreen /> //<ProfileScreen /> <AccountSettingsScreen/>);<Demo /> <Demo /> 
    //<  */
}

export default App;