import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Alert} from 'react-native';
import { NavigationContainer,DefaultTheme,DarkTheme,DrawerActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem, } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
//import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';
import deviceStorage from './services/deviceStorage';
//     screens
import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings';

import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';

import AuthHomeScreen from './screens/AuthHome';
import {Loading} from './components/Loading';

import AllMessagesScreen from './screens/AllMessages'
import SingleMessageScreen from './screens/SingleMessage'
import ReplyMessageScreen from './screens/ReplyMessage'
import SendMessageScreen from './screens/SendMessage'

import NotificationScreen from './screens/notifications'  // add in the drawer stack

import LinkUnitsScreen from './screens/linkUnit';
//import ViewAllUnits from './screens/viewAllUnits';
import AccountSettingsScreen from './screens/accountSettings';
import ViewAllUnitsScreen from './screens/viewAllUnits';
import UnitDetailsScreen from './screens/unitDetails';

import { AppProvider } from  './services/AppProvider'
import ActionsScreen from './screens/Actions'

         //---- theme
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
         // --header style in each screen
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

//{headerMode:'none'}


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
        <Home.Screen name="Profile settings" component={ProfileSettingsScreen}/>
        <Home.Screen name="Home" component={AuthHomeScreen} />
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

 function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Logout" 
        onPress={() => 
          Alert.alert(
            'Log out',
            'Do you want to logout?',
              [
                {text: 'Yes', onPress: 
                  async () => {
                    await AsyncStorage.clear();
                    props.navigation.reset({
                      key:null,
                      index: 0,
                      routes: [{ name: 'Auth' }],
                    });
                }},
                {text: 'No', onPress: () => {props.navigation.closeDrawer() }},
              ],
              { cancelable: false }
          )} />
                        
   </DrawerContentScrollView>
  );
}

const Chat = createStackNavigator();
const ChatStack = () => (
  <Chat.Navigator
      initialRouteName="AllMessages"
  >
    <Chat.Screen
      name="AllMessage"
      component={AllMessagesScreen}
    />
    <Chat.Screen
      name="SingleMessage"
      component={SingleMessageScreen}
    />
    <Chat.Screen
      name="SendMessage"
      component={SendMessageScreen}
    />
    <Chat.Screen
      name="ReplyMessages"
      component={ReplyMessageScreen}
    />
  </Chat.Navigator>

)


// drawer use only in authenticated screens
const Drawer = createDrawerNavigator();
const DrawerStack = () => (
    
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            // drawerStyle={{
            //     backgroundColor:'green'       
            // }}
        >
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Link Units" component={LinkUnitsScreen} />
            <Drawer.Screen name="Unit Deatails" component={UnitDetailsScreen} />
            <Drawer.Screen name="Profiel Settings" component={ProfileSettingsScreen} />
            <Drawer.Screen name="View All Units" component={ViewAllUnitsScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Account settings" component={AccountSettingsScreen} />
            <Drawer.Screen name="Chat" component={ChatStack}/>
            <Drawer.Screen name="Notification" component={NotificationScreen}/>
            <Drawer.Screen name="Actions" component={ActionsScreen}/>

        </Drawer.Navigator>
)
const RootStack = createStackNavigator();
 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      id:'',
    //  loading: true,
      hasToken:false,
    };
    this.deleteItem = deviceStorage.deleteItem.bind(this);
    this.loadItem = deviceStorage.loadItem.bind(this);
    this.loadItem();
  }

 
  // async getData() {
  //   try {
  //     const token = await AsyncStorage.getItem('jwtToken');
  //     if (token !== null) {
  //       console.log("Session token",token );
  //       this.setState({hasToken:true})
  //       return token;
  //     }
  //    } catch (error) {
  //      console.log("Error while storing the token");
  //    }
  // }
  

 componentDidMount(){
       this.setState({loading:false})
      // console.log('app js mounted')
  }

  
  render() {
    const {loading} = this.state;
    if (loading) {
      return <Loading/>
    } else  {
      return (
        // <AppearanceProvider>
        //theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
        <AppProvider>
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
        </AppProvider>
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