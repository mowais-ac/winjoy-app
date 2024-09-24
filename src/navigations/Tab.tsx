import {Home} from '../screens';
import {Image} from 'react-native';
import TabBoxWrapper from '../components/TabBoxWrapper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CustomTabNavigation from '../components/CustomTabNavigation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Screen: TabScreen, Navigator: TabNavigator} = createBottomTabNavigator();

const TabBarScreensArr = [
  {
    name: 'HomeTab',
    title: 'Home',
    component: Home,
    tabBarVisible: [],
    icon: (color: string, isActive: boolean) => (
      <TabBoxWrapper isActive={isActive} title={'Home'}>
        <Image
          source={require('../images/homeMenu.png')}
          style={{
            width: 23,
            height: 23,
            tintColor: isActive ? '#0c0000' : '#aba4e3',
          }}
        />
      </TabBoxWrapper>
    ),
  },
  {
    name: 'ShopTab',
    title: 'Shop',
    tabBarVisible: [],
    component: Home,
    icon: (color: string, isActive: boolean) => (
      <TabBoxWrapper isActive={isActive} title={'Shop'}>
        <Image
          source={require('../images/shoppingBag.png')}
          style={{
            width: 23,
            height: 23,
            tintColor: isActive ? '#0c0000' : '#ffffff',
          }}
        />
      </TabBoxWrapper>
    ),
  },
  {
    name: 'GameTab',
    title: 'Game',
    tabBarVisible: [],
    component: Home,
    icon: (color: string, isActive: boolean) => (
      <TabBoxWrapper isActive={isActive} title={'Game'}>
        <Image
          source={require('../images/football.png')}
          style={{
            width: 23,
            height: 23,
            tintColor: isActive ? '#0c0000' : '#ffffff',
          }}
        />
      </TabBoxWrapper>
    ),
  },
  {
    name: 'AlertsTab',
    title: 'Alerts',
    component: Home,
    tabBarVisible: false,
    icon: (color: string, isActive: boolean) => (
      <TabBoxWrapper isActive={isActive} title={'Alerts'}>
        <Image
          source={require('../images/bellVector.png')}
          style={{
            width: 23,
            height: 23,
            tintColor: isActive ? '#0c0000' : '#ffffff',
          }}
        />
      </TabBoxWrapper>
    ),
  },
];

const getTabBarVisible = (route: any, array: string[]): boolean => {
  const routeName: string | undefined = getFocusedRouteNameFromRoute(route);
  if (!routeName || array.includes(routeName)) {
    return false;
  }
  return true;
};

const TabNavigation = () => {
  return (
    <BottomSheetModalProvider>
      <TabNavigator
        initialRouteName="FeedTab"
        tabBar={(props: any) => <CustomTabNavigation {...props} />}>
        {TabBarScreensArr.map((v, i) => (
          <TabScreen
            key={i}
            name={v.name}
            component={v.component}
            initialParams={{fromTab: true}}
            options={({route}) => ({
              lazy: true,
              unmountOnBlur: false,
              tabBarShowLabel: false,
              tabBarHideOnKeyboard: true,
              tabBarLabel: false,
              tabBarIcon: ({focused, color}) => v?.icon?.(color, focused),
              tabBarVisible:
                typeof v.tabBarVisible === 'boolean'
                  ? v.tabBarVisible
                  : getTabBarVisible(route, v.tabBarVisible),
            })}
          />
        ))}
      </TabNavigator>
    </BottomSheetModalProvider>
  );
};

export default TabNavigation;
