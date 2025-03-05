import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AuthStack} from './AuthStack';
import {HomeStack} from './HomeStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers'; // Replace with the actual file where RootState is defined
import {RouteNames} from '../config';

export const MainStack = () => {
  const MainStack = createStackNavigator();
  const authorize = useSelector((state: RootState) => state?.user?.authorize);
  const isChangeRoute = useSelector(
    (state: RootState) => state?.user?.checkingLoader,
  );

  console.log('authorize ', authorize);

  const AuthScreens = AuthStack.map(stack => (
    <MainStack.Screen
      key={stack.key}
      name={stack.name}
      component={stack.component}
    />
  ));
  const HomeScreens = HomeStack.map(stack => (
    <MainStack.Screen
      key={stack.key}
      name={stack.name}
      component={stack.component}
    />
  ));

  return (
    <>
      <MainStack.Navigator
        initialRouteName={
          !authorize && isChangeRoute
            ? RouteNames.AuthRoutes.OnBoardingScreen
            : authorize && isChangeRoute
            ? RouteNames.AuthRoutes.SelectLanguage
            : RouteNames.HomeRoutes.TabStack
        }
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}>
        {authorize ? HomeScreens : AuthScreens}
      </MainStack.Navigator>
    </>
  );
};
