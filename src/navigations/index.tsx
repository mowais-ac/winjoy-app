import React from 'react';
import {LogBox} from 'react-native';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DEFAULT_NAV_OPTIONS} from '../Constants/Functions';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Verify from '../screens/Verify';
import ForgotPassword from '../screens/ForgotPassword';
import Googleregister from '../screens/Googleregister';
import NotificationBellList from '../screens/NotificationBellList';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from '../screens/Cart';
import Quiz from '../screens/Quiz';
import TriviaJoy from '../screens/TriviaJoy';
import Landing from '../screens/Landing';
import CreatorsPage from '../screens/CreatorsPage';
import DealsJoy from '../screens/DealsJoy';
import CreatorExperience from '../screens/CreatorExperience';
import SimpleProductDetailInExperience from '../screens/SimpleProductDetailInExperience';
import GoldenTulip from '../screens/Fanjoy/GoldenTulip';
import Prizes from '../screens/Fanjoy/Prizes';
import Fanjoy from '../screens/Fanjoy/Fanjoy';
import ProductDetail from '../screens/ExperienceProductDetail';
import Orders from '../screens/MyOrders/Orders';
import ExperienceProductDetail from '../screens/ExperienceProductDetail';
import Noon from '../screens/Noon';
import CreatorsGallery from '../screens/CreatorsGallery';
import AllCreatorsPage from '../screens/AllCreatorsPage';
import Contactsuccess from '../screens/Contactus/Contactsuccess';
import Contactus from '../screens/Contactus/Contactus';
import HamburgerMenu from '../screens/HamburgerMenu';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import BuyLife from '../screens/BuyLife';
import Entries from '../screens/MyEntries/Entries';
import LeaderBoard from '../screens/LeaderBoard';
import RefferAndEarn from '../screens/RefferAndEarn';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import UserAgreement from '../screens/UserAgreement';
import TermsAndConditions from '../screens/TermsAndConditions';
import FAQS from '../screens/FAQS';
import GamesRules from '../screens/GamesRules';
import Gsignin from '../screens/Gsignin';
import PrizeList from '../screens/PrizeList';
import Winners from '../screens/Winners';
import Webmodallive from '../screens/Webmodallive/Webmodallive';
import LiveProducts from '../screens/LiveProducts.js';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthContext} from '../Components/context.js';
import AllCreatorsList from '../screens/AllCreatorsList';


const Stack = createStackNavigator();
const Navigation = () => {
  LogBox.ignoreAllLogs();
  const city_dispatch = useDispatch();
  const home_dispatch = useDispatch();
  const deal_dispatch = useDispatch();
  const product_dispatch = useDispatch();
  const experience_dispatch = useDispatch();
  const competiton_dispatch = useDispatch();
  const [laoding, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [initialRouteName, setInitialRouteName] = useState<any>(null);
  console.log("🚀 ~ Navigation ~ initialRouteName:", initialRouteName)

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
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


  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        console.log('signin', data);
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
        EncryptedStorage.clear();
      },
      signUp: async (data: any) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),

    [],
  );

  useEffect(() => {
    initAuthenticatedUser()
     _setInitialRouteName();
   }, [state]);

   const _setInitialRouteName = () => {
     if (!!state.userToken) {
       setInitialRouteName('Landing');
       return
     } else {
       setInitialRouteName('Login');
     }
   };

   const initAuthenticatedUser = async () => {
    const authenticatedUser = await EncryptedStorage.getItem('Token');
    dispatch({type: 'RESTORE_TOKEN', token: authenticatedUser ? JSON.parse(authenticatedUser) : null});
   // setUser(() => (authenticatedUser ? JSON.parse(authenticatedUser) : null));
  };


  if (!initialRouteName) {
    return null;
  }

  if (initialRouteName) {
    return (
      // @ts-ignore
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
              name="Login"
              component={Login}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Googleregister"
              component={Googleregister}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="NotificationBellList"
              component={NotificationBellList}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="TriviaJoy"
              component={TriviaJoy}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={DEFAULT_NAV_OPTIONS}
            />
             <Stack.Screen
              name="CreatorsPage"
              component={CreatorsPage}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="DealsJoy"
              component={DealsJoy}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="AllCreatorsPage"
              component={AllCreatorsPage}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="CreatorsGallery"
              component={CreatorsGallery}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Noon"
              component={Noon}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="ExperienceProductDetail"
              component={ExperienceProductDetail}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="PrizeList"
              component={PrizeList}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="AllCreatorsList"
              component={AllCreatorsList}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Fanjoy"
              component={Fanjoy}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen name="Prizes" component={Prizes} />
            <Stack.Screen
              name="GoldenTulip"
              component={GoldenTulip}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="SimpleProductDetailInExperience"
              component={SimpleProductDetailInExperience}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="CreatorExperience"
              component={CreatorExperience}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Contactsuccess"
              component={Contactsuccess}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Contactus"
              component={Contactus}
              options={DEFAULT_NAV_OPTIONS}
            /> 
             <Stack.Screen
              name="HamburgerMenu"
              component={HamburgerMenu}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="BuyLife"
              component={BuyLife}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Entries"
              component={Entries}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="LeaderBoard"
              component={LeaderBoard}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="RefferAndEarn"
              component={RefferAndEarn}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="UserAgreement"
              component={UserAgreement}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="FAQS"
              component={FAQS}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="GamesRules"
              component={GamesRules}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Gsignin"
              component={Gsignin}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Winners"
              component={Winners}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="LiveProducts"
              component={LiveProducts}
              options={DEFAULT_NAV_OPTIONS}
            />
            <Stack.Screen
              name="Webmodallive"
              component={Webmodallive}
              options={DEFAULT_NAV_OPTIONS}
            /> 
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default Navigation;
