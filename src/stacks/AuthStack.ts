import {RouteNames} from '../config';
import {
  ForgotPassword,
  LoginScreen,
  OnBoarding,
  OtpScreen,
  SelectLanguage,
  SignupScreen,
  GoogleSignUp,
  VerifyUser,
  RegisterScreen,
} from '../screens';
import {
  ChangePasswordProps,
  ForgotPasswordProps,
  GoogleSignUpProps,
  LoginScreenProps,
  OnBoardingProps,
  OtpScreenProps,
  SelectLanguageProps,
  SignupScreenProps,
  VerifyUserProps,
  RegisterScreenProps,
} from '../screens/propTypes';

type AuthScreenStacksTypes = {
  name: string;
  component:
    | React.FC<SignupScreenProps>
    | React.FC<LoginScreenProps>
    | React.FC<OnBoardingProps>
    | React.FC<ForgotPasswordProps>
    | React.FC<OtpScreenProps>
    | React.FC<SelectLanguageProps>
    | React.FC<ChangePasswordProps>
    | React.FC<GoogleSignUpProps>
    | React.FC<VerifyUserProps>
    | React.FC<RegisterScreenProps>;

  key: string;
}[];

export const AuthStack: AuthScreenStacksTypes = [
  // {
  //   name: RouteNames.AuthRoutes.SelectLanguage,
  //   component: SelectLanguage,
  //   key: RouteNames.AuthRoutes.SelectLanguage,
  // },
  {
    name: RouteNames.AuthRoutes.OnBoardingScreen,
    component: OnBoarding,
    key: RouteNames.AuthRoutes.OnBoardingScreen,
  },
  {
    name: RouteNames.AuthRoutes.SignUpScreen,
    component: SignupScreen,
    key: RouteNames.AuthRoutes.SignUpScreen,
  },
  {
    name: RouteNames.AuthRoutes.GoogleSignUp,
    component: GoogleSignUp,
    key: RouteNames.AuthRoutes.GoogleSignUp,
  },

  {
    name: RouteNames.AuthRoutes.LoginScreen,
    component: LoginScreen,
    key: RouteNames.AuthRoutes.LoginScreen,
  },
  {
    name: RouteNames.AuthRoutes.RegisterScreen,
    component: RegisterScreen,
    key: RouteNames.AuthRoutes.RegisterScreen,
  },
  {
    name: RouteNames.AuthRoutes.VerifyUser,
    component: VerifyUser,
    key: RouteNames.AuthRoutes.VerifyUser,
  },
  {
    name: RouteNames.AuthRoutes.ForgotPasswordScreen,
    component: ForgotPassword,
    key: RouteNames.AuthRoutes.ForgotPasswordScreen,
  },
  {
    name: RouteNames.AuthRoutes.OtpScreen,
    component: OtpScreen,
    key: RouteNames.AuthRoutes.OtpScreen,
  },
];
