import {RouteNames} from '../config';
import {
  ChangePassword,
  EditProfile,
  NavigationScreen,
  WebView,
} from '../screens';
import {
  ChangePasswordProps,
  EditProfileProps,
  NavigationScreenProps,
} from '../screens/propTypes';
import {DrawerStack} from './DrawerStack';
import {TabStack} from './TabStack';

type HomeScreenStacksTypes = {
  name: string;
  component:
    | React.FC<EditProfileProps>
    | React.FC<ChangePasswordProps>
    | React.FC<NavigationScreenProps>;
  key: string;
}[];

export const HomeStack: HomeScreenStacksTypes = [
  {
    name: RouteNames.HomeRoutes.DrawerStack,
    component: DrawerStack,
    key: RouteNames.HomeRoutes.DrawerStack,
  },
  // {
  //   name: RouteNames.HomeRoutes.TabStack,
  //   component: TabStack,
  //   key: RouteNames.HomeRoutes.TabStack,
  // },
  {
    name: RouteNames.HomeRoutes.NavigationScreen,
    component: NavigationScreen,
    key: RouteNames.HomeRoutes.NavigationScreen,
  },
  {
    name: RouteNames.HomeRoutes.EditProfileScreen,
    component: EditProfile,
    key: RouteNames.HomeRoutes.EditProfileScreen,
  },
  {
    name: RouteNames.HomeRoutes.WebView,
    component: WebView,
    key: RouteNames.HomeRoutes.WebView,
  },
  {
    name: RouteNames.HomeRoutes.ChangePassword,
    component: ChangePassword,
    key: RouteNames.HomeRoutes.ChangePassword,
  },
];
