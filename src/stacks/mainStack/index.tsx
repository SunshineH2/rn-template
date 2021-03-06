import React from 'react';
import { Provider } from '@ant-design/react-native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, DrawerActions } from '@react-navigation/native';
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN';
import Iconfont from '../../components/Iconfont';
import { Size, Color } from '../../config';
import { commonStackOptions, linearGradientStackOptions } from '../../common';
import { RootParamList, State } from '../../interfaces/root';
import { TouchableOpacity } from 'react-native';

import DrawerStack from '../drawer';
import TabStack from '../tab';
import SearchPage from '../../screens/formDemo/searchPage';

const Stack = createStackNavigator();
export const MainStack = () => {
  // eslint-disable-next-line complexity
  function getDrawerHeaderTitle({
    route,
    navigation
  }: {
    route: RouteProp<RootParamList, 'Drawer'> & { state?: State };
    navigation: StackNavigationProp<RootParamList>;
  }): StackNavigationOptions {
    const routeName = route.state ? route.state.routeNames[route.state.index] : 'HomePage';
    const headerLeft = () => (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginLeft: Size.px(5), padding: Size.px(10) }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Iconfont name="navMenu" size={Size.px(20)} color={Color.primary} />
      </TouchableOpacity>
    );

    switch (routeName) {
      case 'HomePage':
      default:
        return {
          headerTitle: '首页',
          headerLeft
        };

      case 'Team':
        return {
          headerTitle: '球队',
          headerLeft
        };

      case 'League':
        return {
          ...linearGradientStackOptions,
          headerTitle: '联赛',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginLeft: Size.px(5), padding: Size.px(10) }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Iconfont name="navMenu" size={Size.px(20)} color={Color.white} />
            </TouchableOpacity>
          )
        };

      case 'form':
        return {
          headerTitle: '表单',
          headerLeft
        };

      case 'Show':
        return {
          header: () => null,
          headerLeft
        };
      case 'Mine':
        return {
          header: () => null
        };
    }
  }

  function getTabHeaderTitle({
    route
  }: {
    route: RouteProp<RootParamList, 'Tab'> & { state?: State };
  }): StackNavigationOptions {
    const routeName = route.state ? route.state.routeNames[route.state.index] : 'Test1';
    switch (routeName) {
      case 'Test1':
      default:
        return {
          headerTitle: 'Test1'
        };

      case 'Test2':
        return {
          headerTitle: 'Test2'
        };
    }
  }

  return (
    <Provider
      locale={zhCN}
      theme={{
        brand_primary: Color.primary,
        brand_warning: Color.fail,
        activeTextColor: Color.primary,
        tabs_color: Color.primary,
        color_text_placeholder: Color.helpTextColor,
        border_color_base: Color.borderColor,
        font_size_heading: Size.px(14),
        list_item_height: Size.px(54),
        tabs_height: Size.px(36)
      }}>
      <Stack.Navigator
        initialRouteName="Drawer"
        // Stack下每个screen都会共享的配置
        screenOptions={commonStackOptions}
        headerMode="screen">
        <Stack.Screen name="Drawer" component={DrawerStack} options={props => getDrawerHeaderTitle(props)} />
        <Stack.Screen name="Tab" component={TabStack} options={props => getTabHeaderTitle(props)} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerTitle: '搜索页面' }} />
      </Stack.Navigator>
    </Provider>
  );
};
