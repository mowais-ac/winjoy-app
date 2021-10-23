import React, { useEffect } from "react";
import { Dimensions, StatusBar, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Colors } from "./Constants/Index";


import Splash from "./Screens/Splash";
import TransferConfirm from "./Screens/TransferConfirm";

// login stack
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Verify from "./Screens/VerifyNum";
import ForgotPassword from "./Screens/ForgotPassword";
import WishList from "./Screens/WishList/index";
import WishlistDetails from "./Screens/WishList/WishlistDetails";
// LandingStack
import Landing from "./Screens/Landing/Landing";
import BuyCoins from "./Screens/BuyCoins";
import BuyCoinsSuccess from "./Screens/BuyCoinsSuccess";
import TransferCoins from "./Screens/TransferCoins";
import EShopping from "./Screens/EShopping";
import EShoppingInfo from "./Screens/EShoppingInfo";
import EShoppingSuccess from "./Screens/EShoppingSuccess";
import TransactionDetails from "./Screens/TransactionDetails";
import CreditCoins from "./Screens/CreditCoins";
import PayCredit from "./Screens/PayCredit";
//simple stack
import Quiz from "./Screens/Quiz/index";
import QuizAnswer from "./Screens/QuizAnswer/index";
import PrizeList from "./Screens/PrizeList/index";
import LeaderBoard from "./Screens/LeaderBoard/LeaderBoard";
import HamburgerMenu from "./Screens/HamburgerMenu/index";
import Congrats from "./Screens/Congrats/index";
import WrongAnswer from "./Screens/WrongAnswer/index";
import ProductDetail from "./Screens/ProductDetail/index";
import DashBoard from "./Screens/DashBoard/index";
import Cart from "./Screens/Cart/index";
//meu stack
//import Menu from "./Screens/Menu";
import Menu from "./Screens/HamburgerMenu/index";
import EditProfile from "./Screens/EditProfile";
import ContactUs from "./Screens/ContactUs";
import BorrowCredit from "./Screens/BorrowCredit";
import BorrowCreditSuccess from "./Screens/BorrowCreditSuccess";
import RequestList from "./Screens/RequestList";
import Orders from "./Screens/MyOrder/Orders";
import OrderDetails from "./Screens/MyOrder/OrderDetails";
import WithdrawCoins from "./Screens/WithdrawCoins";
import TicketList from "./Screens/TicketList";
import Connections from "./Screens/Connections";
import RequestCoins from "./Screens/RequestCoins";
import SubmitTicketScreen from "./Screens/SubmitTicketScreen";

// profile stack
import Profile from "./Screens/Profile/index";

// tabs stack
import Withdrawals from "./Screens/Withdrawals";
import Transfers from "./Screens/Transfers";
import Activity from "./Screens/Activity";
import Transactions from "./Screens/Transactions";

import TabButton from "./Components/TabButton";

//  redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import Reducers from "./redux/reducers/index";
import Config from "react-native-config";
//import Notifications from "./Screens/Notifications";


const { width, height } = Dimensions.get("window");
const LoginStack = createStackNavigator();

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      key={1}
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <LoginStack.Screen
      key={2}
      name="Verify"
      component={Verify}
      options={{ headerShown: false }}
    />
    <LoginStack.Screen
      key={3}
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
    <LoginStack.Screen
      key={4}
      name="ForgotPassword"
      component={ForgotPassword}
      options={{ headerShown: false }}
    />
  </LoginStack.Navigator>
);
const SimpleScreenStack = createStackNavigator();

const SimpeStackScreen = () => (
  <SimpleScreenStack.Navigator
    //initialRouteName={'Wallet'}
  >
    <SimpleScreenStack.Screen
      key={1}
      name="Quiz"
      component={Quiz}
      options={{ headerShown: false }}
    />
    <SimpleScreenStack.Screen
      key={2}
      name="QuizAnswer"
      component={QuizAnswer}
      options={{ headerShown: false }}
    />

    <SimpleScreenStack.Screen
      key={4}
      name="LeaderBoard"
      component={LeaderBoard}
      options={{ headerShown: false }}
    />
  

    <SimpleScreenStack.Screen
      key={7}
      name="Congrats"
      component={Congrats}
      options={{ headerShown: false }}
    />
    <SimpleScreenStack.Screen
      key={8}
      name="ProductDetail"
      component={ProductDetail}
      options={{ headerShown: false }}
    />
    <SimpleScreenStack.Screen
      key={9}
      name="WrongAnswer"
      component={WrongAnswer}
      options={{ headerShown: false }}
    />
  <SimpleScreenStack.Screen
      key={10}
      name="DashBoard"
      component={DashBoard}
      options={{ headerShown: false }}
    />
    <SimpleScreenStack.Screen
      key={11}
      name="Cart"
      component={Cart}
      options={{ headerShown: false }}
    />
  </SimpleScreenStack.Navigator>
);
const MenuStack = createStackNavigator();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        key={1}
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={2}
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={3}
        name="RequestList"
        component={RequestList}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={4}
        name="WithdrawCoins"
        component={WithdrawCoins}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={5}
        name="Connections"
        component={Connections}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={6}
        name="RequestCoins"
        component={RequestCoins}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={7}
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={8}
        name="SubmitTicketScreen"
        component={SubmitTicketScreen}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={8}
        name="TicketList"
        component={TicketList}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={9}
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={10}
        name="BorrowCredit"
        component={BorrowCredit}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        key={11}
        name="BorrowCreditSuccess"
        component={BorrowCreditSuccess}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        key={1}
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={2}
        name="BuyCoins"
        component={BuyCoins}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={3}
        name="BuyCoinsSuccess"
        component={BuyCoinsSuccess}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={4}
        name="TransferCoins"
        component={TransferCoins}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={6}
        name="Withdrawals"
        component={Withdrawals}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={7}
        name="EShopping"
        component={EShopping}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={8}
        name="EShoppingInfo"
        component={EShoppingInfo}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={9}
        name="EShoppingSuccess"
        component={EShoppingSuccess}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={10}
        name="OrderDetails"
        component={OrderDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={11}
        name="MenuStack"
        component={MenuStackScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={12}
        name="CreditCoins"
        component={CreditCoins}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={13}
        name="PayCredit"
        component={PayCredit}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        key={13}
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();
const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        key={1}
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

// const ActivityStack = createStackNavigator();
// const ActivityStackScreen = () => {
//   return (
//     <ActivityStack.Navigator>
//       <ActivityStack.Screen
//         key={0}
//         name="ActivityScreen"
//         component={Activity}
//         options={{ headerShown: false }}
//       />
//       <ActivityStack.Screen
//         key={12}
//         name="Notifications"
//         component={Notifications}
//         options={{ headerShown: false }}
//       />
//       <ActivityStack.Screen
//         key={2}
//         name="TransactionDetails"
//         component={TransactionDetails}
//         options={{ headerShown: false }}
//       />
//     </ActivityStack.Navigator>
//   );
// };
const WishListStack = createStackNavigator();
const WishListStackScreen = () => {
  return (
    <WishListStack.Navigator>
      <WishListStack.Screen
        key={0}
        name="WishList"
        component={WishList}
        options={{ headerShown: false }}
      />
      <WishListStack.Screen
        key={1}
        name="WishlistDetails"
        component={WishlistDetails}
        options={{ headerShown: false }}
      />
     
    </WishListStack.Navigator>
  );
};
//const TransactionsStack = createStackNavigator();
// const TransactionsStackScreen = () => {
//   return (
//     <TransactionsStack.Navigator>
//       <TransactionsStack.Screen
//         key={0}
//         name="TransactionsScreen"
//         component={Transactions}
//         options={{ headerShown: false }}
//       />

//       <TransactionsStack.Screen
//         key={2}
//         name="TransactionDetails"
//         component={TransactionDetails}
//         options={{ headerShown: false }}
//       />
//     </TransactionsStack.Navigator>
//   );
// };
const ProductsStack = createStackNavigator();
const ProductsStackStackScreen = () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        key={0}
        name="PrizeList"
        component={PrizeList}
        options={{ headerShown: false }}
      />

    </ProductsStack.Navigator>
  );
};

const TabsStack = createBottomTabNavigator();
const TabsStackScreen = () => (
  <TabsStack.Navigator
    tabBarOptions={{
      activeTintColor: Colors.REDESH,
      inactiveTintColor: Colors.BLACK,
      labelStyle: { fontFamily: "ProximaNova-Regular" },
      tabStyle: { borderLeftColor: Colors.LIGHT_MUTED, borderLeftWidth: 3 },
      style: { height: height * 0.08 },
      keyboardHidesTabBar: true,
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        return (
          <View style={[styles.iconView, { backgroundColor: focused ? '#F4EDEF' : null }]}>
            <TabButton name={route.name} />
          </View>
        );
      },
    })}
  >
    <TabsStack.Screen key={1} name="Home" component={HomeStackScreen} />
    <TabsStack.Screen
      key={2}
      name="Product"
      component={ProductsStackStackScreen}
    />
    <TabsStack.Screen key={3} name="WishList" component={WishListStackScreen} />
    <TabsStack.Screen key={4} name="Profile" component={ProfileScreen} />
  </TabsStack.Navigator>
);

// const store = createStore(Reducers, applyMiddleware(thunkMiddleware));

function App() {
  const Main = createStackNavigator();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <StatusBar hidden />
        <NavigationContainer>
          <Main.Navigator
           // initialRouteName={'SimpeStackScreen'}
          >
            <Main.Screen
              key={0}
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Main.Screen
              key={1}
              name="TransferConfirm"
              component={TransferConfirm}
              options={{ headerShown: false }}
            />
            <Main.Screen
              key={2}
              name="TabsStack"
              component={TabsStackScreen}
              options={{ headerShown: false }}
            />
            <Main.Screen
              key={3}
              name="LoginStack"
              component={LoginStackScreen}
              options={{ headerShown: false }}
            />
            <Main.Screen
              key={4}
              name="SimpeStackScreen"
              component={SimpeStackScreen}
              options={{ headerShown: false }}
            />

          </Main.Navigator>
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}
const styles = StyleSheet.create({
  iconView: { borderRadius: 30, width: width * 0.1, height: height * 0.05, justifyContent: 'center', alignItems: 'center' }


});

export default App;
