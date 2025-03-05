import {useState} from 'react';
import {
  AuthHeader,
  CustomInput,
  CustomText,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {SelectLanguageProps, VerifyUserProps} from '../../propTypes';
import PhoneNumberInput from 'react-native-phone-number-input';
import {NavigationService, RouteNames, Metrix} from '../../../config';
import {I18nManager, View} from 'react-native';
import {Formik} from 'formik';
import {Schema} from 'yup';
import {t} from 'i18next';

export const VerifyUser: React.FC<VerifyUserProps> = ({}) => {
  // const [value, setValue] = useState()
  return (
    <AuthHeader
      heading={t('Lets_sign_in')}
      isBtn
      onPress={() =>
        NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen)
      }
      title={t('send_verification_code')}
      isbottomText
      onBottomTextPress={() =>
        NavigationService.navigate(RouteNames.AuthRoutes.SignUpScreen)
      }>
      <View>
        <CustomText.RegularText
          customStyle={{
            textAlign: I18nManager.forceRTL ? 'left' : 'right',
            marginBottom: Metrix.VerticalSize(10),
            marginLeft: Metrix.HorizontalSize(10),
            fontSize: Metrix.customFontSize(15),
          }}>
          {t('enter_your_phone_number')}
        </CustomText.RegularText>

        <PhoneNumberInput
          containerStyle={{
            borderRadius: 50,
            borderWidth: 2,
            borderColor: '#9292927D',
          }}
          textContainerStyle={{
            backgroundColor: '#FFF',
            borderRadius: 50,
          }}
          defaultCode="US"
          onChangeText={text => console.log(text)}
        />
      </View>
    </AuthHeader>
  );
};
