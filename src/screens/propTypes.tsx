import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// params Object
type AuthParamList = {
  ChangePassword: {from?: string; data?: object};
  OtpScreen: {email: string; from?: string};
  VideoScreen: {courseId?: string};
};

type HomeParamList = {};

// Auth Screens Types
export type LoginScreenProps = {};
export type RegisterScreenProps = {};

export type OtpScreenProps = {
  navigation: StackNavigationProp<AuthParamList, 'OtpScreen'>;
  route: RouteProp<AuthParamList, 'OtpScreen'>;
};

export type SignupScreenProps = {};

export type ForgotPasswordProps = {};

export type SelectLanguageProps = {};

export type GoogleSignUpProps = {};

export type VerifyUserProps = {};

export type OnBoardingProps = {};

// Home Screen Types

export type HomeScreenProps = {};

export type NavigationScreenProps = {};

export type CoursesProps = {};

export type SearchProps = {};

export type BlogDetailsProps = {};

export type CreateServiceProps = {};

export type CreateLeadProps = {};

export type WebViewProps = {};

export type LeadsProps = {};

export type CreateQuestionProps = {};

export type ServiceDetailProps = {};

export type QuestionsAndAnswersProps = {};

export type ActivityProps = {};

export type LiveSessionProps = {};

export type NotificationScreenProps = {};

export type EditProfileProps = {};

export type ChangePasswordProps = {};
