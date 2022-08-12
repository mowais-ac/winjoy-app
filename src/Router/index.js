import React, {useEffect, useState} from 'react';
import {View, Text, Linking, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Splash from '../screens/Splash';
import {AuthContext} from '../../src/Components/context';
import BottomTabStack from './BottomTabStack';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../redux/store';
import {Provider} from 'react-redux';
import MenuStack from '../Router/MenuStack';
import GameStack from './GameStack';
import Cart from '../screens/Cart';
import NotificationBellList from '../screens/NotificationBellList';
import WebView from '../screens/WebView';
import '../i18n/index';
import OneSignal from 'react-native-onesignal';
import {useSelector, useDispatch} from 'react-redux';
//import linking from '../Components/linking';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {getLiveShowPlans, getLandingScreen} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';
import LeaderBoard from '../screens/LeaderBoard';
import LiveStack from './LiveStack';
import Webmodal from '../screens/WebModal/Webmodal';
import BuyLife from '../screens/BuyLife';
import Landing from '../screens/Landing';
import Webmodallive from '../screens/Webmodallive/Webmodallive';
const Stack = createNativeStackNavigator();

function index(props) {
  // const navigation = useNavigation();
  const [isLogedin, setIsLogedin] = useState(false);
  const livePlans = useSelector(state => state.app.livePlans);
  const mytoken = EncryptedStorage.getItem('Token').then(data => {
    if (data != null) setIsLogedin(true);
    else setIsLogedin(false);
  });

  const dispatch2 = useDispatch();
  useEffect(() => {
    dispatch2(getLiveShowPlans());
  }, []);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    OneSignal.init('f38f3a1b-7188-444f-9180-6db72c75dc4d', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);

    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await EncryptedStorage.getItem('Token');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log('signin', data);
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
        EncryptedStorage.clear('root');
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),

    [],
  );
  /*   React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]); */
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTabStack"
          screenOptions={{
            headerShown: false,
          }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={Splash} />
          ) : state.userToken == null ? (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          ) : (
            <>
              <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
              <Stack.Screen name="MenuStack" component={MenuStack} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen
                name="NotificationBellList"
                component={NotificationBellList}
              />
              <Stack.Screen name="LiveStack" component={LiveStack} />
              <Stack.Screen name="GameStack" component={GameStack} />
              <Stack.Screen name="WebView" component={WebView} />
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Webmodal" component={Webmodal} />
              <Stack.Screen name="Webmodallive" component={Webmodallive} />
              <Stack.Screen name="BuyLife" component={BuyLife} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default index;
