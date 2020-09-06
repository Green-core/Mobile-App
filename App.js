import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
//import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';

//     screens

import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';
import RequestEmailScreen from './screens/ResetPassword/RequestEmail';
import VerifyTokenScreen from './screens/ResetPassword/VerifyToken';
import ResetPasswordScreen from './screens/ResetPassword/ResetPassword';
import VerifyEmailScreen from './screens/VerifyEmail';

import AuthHomeScreen from './screens/AuthHome';
import {Loading} from './components/Loading';

import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings';
import AccountSettingsScreen from './screens/accountSettings';

import AllMessagesScreen from './screens/AllMessages';
import SingleMessageScreen from './screens/SingleMessage';
import ReplyMessageScreen from './screens/ReplyMessage';
import SendMessageScreen from './screens/SendMessage';

import NotificationScreen from './screens/notifications';

import LinkUnitsScreen from './screens/linkUnit';

import ViewAllUnitsScreen from './screens/viewAllUnits';
import UnitDetailsScreen from './screens/unitDetails';
import ActionsScreen from './screens/Actions';

import TipsByPlantScreen from './screens/tipsByPlantScreen';
import TipsScreen from './screens/tipsScreen';

// React context provider
import {AppProvider} from './services/AppProvider';

// Asyncstorage methods
import deviceStorage from './services/deviceStorage';

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

const HeaderOptions = {
  headerStyle: {
    backgroundColor: '#3b7548', //'#16a085'
  },
  headerTintColor: '#FFFF',
  headerTitleStyle: {
    color: '#FFFF',
  },
};

// login flow
const Auth = createStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false,
    }}
    headerMode="none">
    <Auth.Screen name="Login" component={LoginScreen} />
    <Auth.Screen name="Signup" component={SignupScreen} />
    <Auth.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    <Auth.Screen name="RequestEmail" component={RequestEmailScreen} />
    <Auth.Screen name="VerifyToken" component={VerifyTokenScreen} />
    <Auth.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Auth.Navigator>
);

// All authenticated testing screen stack
// - Home
//    - profile settings

const Home = createStackNavigator();
const HomeStack = () => (
  <Home.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {backgroundColor: 'white'},
      animationEnabled: false,
    }}>
    <Home.Screen name="Profile settings" component={ProfileSettingsScreen} />
    <Home.Screen
      name="Home"
      component={AuthHomeScreen}
      options={({navigation}) => ({
        headerLeft: () => (
          <Icon
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            containerStyle={{color: 'black', marginLeft: 10}}
            name={'menu'}
            type="MaterialIcons"
          />
        ),

        headerRight: () => (
          <Icon
            onPress={() => navigation.navigate('Notification')}
            containerStyle={{color: 'black', marginRight: 10}}
            name={'notifications-none'}
            type="MaterialIcons"
          />
        ),
      })}
    />
  </Home.Navigator>
);

// profile
//    - Account Settings
//    - Profile Settings

const Profile = createStackNavigator();
const ProfileStack = () => (
  <Profile.Navigator
    headerMode="none"
    initialRouteName="Profile"
    screenOptions={{
      animationEnabled: false,
    }}>
    <Profile.Screen name="Profile" component={ProfileScreen} />
    <Profile.Screen name="Profile Settings" component={ProfileSettingsScreen} />
    <Profile.Screen name="Account Settings" component={AccountSettingsScreen} />
  </Profile.Navigator>
);

//  -View All units
//       - Unit Details
//       - Actions

const LinkUnits = createStackNavigator();
const LinkUnitsStack = () => (
  <LinkUnits.Navigator
    headerMode="none"
    initialRouteName="View All Units"
    screenOptions={{
      animationEnabled: false,
    }}>
    <LinkUnits.Screen name="View All Units" component={ViewAllUnitsScreen} />
    <LinkUnits.Screen name="Unit Details" component={UnitDetailsScreen} />
    <LinkUnits.Screen name="Actions" component={ActionsScreen} />
  </LinkUnits.Navigator>
);

//  - All Messages
//       - single message
//       - send message
//       - reply message

const Chat = createStackNavigator();
const ChatStack = () => (
  <Chat.Navigator
    initialRouteName="AllMessages"
    screenOptions={{
      animationEnabled: false,
    }}>
    <Chat.Screen name="AllMessage" component={AllMessagesScreen} />
    <Chat.Screen name="SingleMessage" component={SingleMessageScreen} />
    <Chat.Screen name="SendMessage" component={SendMessageScreen} />
    <Chat.Screen name="ReplyMessages" component={ReplyMessageScreen} />
  </Chat.Navigator>
);

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{flexDirection: 'column', marginTop: 20, alignItems: 'center'}}>
        <Avatar
          rounded
          // icon={{name: 'home',type:'MaterialIcons'}}
          source={{
            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
          }}
          size="small"
        />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 15,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 15,
            flexDirection: 'column',
          }}>
          kavishka@gmail.com
        </Text>
      </View>
      {/* <DrawerItemList {...props} activeTintColor="green" /> */}

      <DrawerItem
        label="Home"
        activeTintColor="green"
        icon={() => <Icon color="black" name="home" type="MaterialIcons" />} // activeBackgroundColor="green"
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      />
      <DrawerItem
        label="Link Units"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="add-circle-outline" type="MaterialIcons" />
        )} 
        onPress={() => {
          props.navigation.navigate('Link Units');
        }}
      />
      <DrawerItem
        label="Profile"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="person-outline" type="MaterialIcons" />
        )} 
        onPress={() => {
          props.navigation.navigate('Profile');
        }}
      />
      {/* <DrawerItem 
          label="Profile Settings" 
          activeTintColor="green"
          icon= {() =><Icon  color="black" name='settings' type='MaterialIcons'/>  }    // activeBackgroundColor="green"
          onPress={() => {props.navigation.navigate('Profile Settings')}}
      /> */}
      <DrawerItem
        label="View All Units"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="border-all" type="MaterialIcons" />
        )} 
        onPress={() => {
          props.navigation.navigate('View All Units');
        }}
      />
      <DrawerItem
        label="Chat"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="chat-bubble-outline" type="MaterialIcons" />
        )} 
        onPress={() => {
          props.navigation.navigate('Chat');
        }}
      />
      <DrawerItem
        label="Notifications"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="notifications-none" type="MaterialIcons" />
        )} 
        onPress={() => {
          props.navigation.navigate('Notification');
        }}
      />    
    <DrawerItem
        label="Tips"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="error-outline" type="MaterialIcons" />
        )}
        onPress={() => {
          props.navigation.navigate('Tips');
        }}
      />

      <DrawerItem
        label="Log Out"
        activeTintColor="green"
        icon={() => (
          <Icon color="black" name="power-settings-new" type="MaterialIcons" />
        )} 
        onPress={() =>
          Alert.alert(
            'Log Out',
            'Do you want to logout?',
            [
              {
                text: 'Yes',
                onPress: async () => {
                  await AsyncStorage.clear();
                  props.navigation.reset({
                    key: null,
                    index: 0,
                    routes: [{name: 'Auth'}],
                  });
                },
              },
              {
                text: 'No',
                onPress: () => {
                  props.navigation.closeDrawer();
                },
              },
            ],
            {cancelable: false},
          )
        }
      />
    </DrawerContentScrollView>
  );
}

// drawer represent all the authenticated screens

const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    initialRouteName="Link Units"
    activeTintColor="green"
    // backBehavior="history"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    // drawerStyle={{
    //     backgroundColor:'green'
    // }}
  >
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Link Units" component={LinkUnitsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStack} />
    {/* <Drawer.Screen name="Profile Settings" component={ProfileSettingsScreen} /> */}
    {/* <Drawer.Screen name="Account Settings" component={AccountSettingsScreen} /> */}
    <Drawer.Screen name="View All Units" component={LinkUnitsStack} />
    <Drawer.Screen name="Chat" component={ChatStack} />
    <Drawer.Screen name="Notification" component={NotificationScreen} />
    <Drawer.Screen name="Tips" component={TipsByPlantScreen} />
  </Drawer.Navigator>
);
const RootStack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    // this.loadItem = deviceStorage.loadItem.bind(this);
    // this.loadItem();
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

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return <Loading />;
    } else {
      return (
        // <AppearanceProvider>
        //theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
        <AppProvider>
          <NavigationContainer>
            <RootStack.Navigator
              headerMode="none"
              initialRouteName="Splash"
              screenOptions={{
                animationEnabled: false,
              }}>
              <RootStack.Screen name="Splash" component={WelcomeScreen} />
              <RootStack.Screen name="Auth" component={AuthStack} />
              <RootStack.Screen name="App" component={DrawerStack} /> 
              <RootStack.Screen name="TipsScreen" component={TipsScreen} />
              <RootStack.Screen
                name="TipsByPlant"
                component={TipsByPlantScreen}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </AppProvider>
        // </AppearanceProvider>
      );
    }
  }
}

export default App;
