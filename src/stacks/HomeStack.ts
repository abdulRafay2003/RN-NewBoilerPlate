import {RouteNames} from '../config';
import {
  ChangePassword,
  EditProfile,
  NavigationScreen,
  NotificationScreen,
  BlogDetails,
  LiveSession,
  CreateService,
  CreateLead,
  Leads,
  ServiceDetail,
  QuestionsAndAnswers,
  WebView,
  CreateQuestion,
} from '../screens';
import {
  ChangePasswordProps,
  EditProfileProps,
  ProfileScreenProps,
  NavigationScreenProps,
} from '../screens/propTypes';
import {DrawerStack} from './DrawerStack';
import {TabStack} from './TabStack';

type HomeScreenStacksTypes = {
  name: string;
  component:
    | React.FC<EditProfileProps>
    | React.FC<ProfileScreenProps>
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
    name: RouteNames.HomeRoutes.NotificationScreen,
    component: NotificationScreen,
    key: RouteNames.HomeRoutes.NotificationScreen,
  },
  {
    name: RouteNames.HomeRoutes.BlogDetails,
    component: BlogDetails,
    key: RouteNames.HomeRoutes.BlogDetails,
  },
  {
    name: RouteNames.HomeRoutes.LiveSession,
    component: LiveSession,
    key: RouteNames.HomeRoutes.LiveSession,
  },
  {
    name: RouteNames.HomeRoutes.CreateService,
    component: CreateService,
    key: RouteNames.HomeRoutes.CreateService,
  },
  {
    name: RouteNames.HomeRoutes.CreateLead,
    component: CreateLead,
    key: RouteNames.HomeRoutes.CreateLead,
  },
  {
    name: RouteNames.HomeRoutes.Leads,
    component: Leads,
    key: RouteNames.HomeRoutes.Leads,
  },
  {
    name: RouteNames.HomeRoutes.ServiceDetail,
    component: ServiceDetail,
    key: RouteNames.HomeRoutes.ServiceDetail,
  },
  {
    name: RouteNames.HomeRoutes.QuestionsAndAnswers,
    component: QuestionsAndAnswers,
    key: RouteNames.HomeRoutes.QuestionsAndAnswers,
  },
  {
    name: RouteNames.HomeRoutes.WebView,
    component: WebView,
    key: RouteNames.HomeRoutes.WebView,
  },
  {
    name: RouteNames.HomeRoutes.CreateQuestion,
    component: CreateQuestion,
    key: RouteNames.HomeRoutes.CreateQuestion,
  },
  {
    name: RouteNames.HomeRoutes.ChangePassword,
    component: ChangePassword,
    key: RouteNames.HomeRoutes.ChangePassword,
  },
];
