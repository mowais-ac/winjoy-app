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
import {getLiveShowPlans} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';
import LeaderBoard from '../screens/LeaderBoard';
const Stack = createNativeStackNavigator();

function index(props) {
  //const navigation = useNavigation();
  const [isLogedin, setIsLogedin] = useState(false);
  const livePlans = useSelector(state => state.app.livePlans);
  EncryptedStorage.getItem('Token').then(data => {
    if (data != null) setIsLogedin(true);
    else setIsLogedin(false);
  });

  const dispatch2 = useDispatch();
  useEffect(() => {
    dispatch2(getLiveShowPlans());
  }, []);
  /*  const handleDynamicLink = link => {
    if (`${link.url}`) {
      navigation.navigate('Register', {
        referral_code: link,
      });
    } else {
      alert(`${link.url}`);
    }
  };
  useEffect(async () => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if ('https://winjoy.ae' === `${link.url}`) {
          navigation.navigate('Register', {
            referral_code: link,
          });
        } else {
          alert(`${link.url}`);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []); */
  /* useEffect(() => {
    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl !== null) {
        return;
      }
      if (initialUrl.includes('view_profile')) {
        Alert.alert(initialUrl);
        RootNavigation.navigate('view_profile');
      }
    };
    getUrl();
  }); */
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
  /* const config = {
    screens: {
      Landing: {
        path: 'Landing/:id',
        params: {
          id: null,
        },
      },
    },
  };
  // Deep links
  const linking = {
    prefixes: ['https://winjoy.ae', 'winjoy://'],
    config,
  }; */

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
        EncryptedStorage.clear();
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),

    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
      //linking={linking}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          //initialRouteName='BottomTabStack'
        >
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
              <Stack.Screen name="GameStack" component={GameStack} />
              <Stack.Screen name="WebView" component={WebView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default index;
