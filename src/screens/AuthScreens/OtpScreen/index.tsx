import {
  Image,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AuthHeader,
  CustomModal,
  CustomText,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
} from '../../../components';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {OtpScreenProps} from '../../propTypes';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../../redux/actions';
import { t } from 'i18next';

export const OtpScreen: React.FC<OtpScreenProps> = ({route}) => {
  // const {email, from} = route?.params;
  const dispatch = useDispatch();
  // console.log('-----------===email', email, from);

  const [code, setCode] = useState('');
  const [modalPostVisible, setModalPostVisible] = useState(false);

  // const handleOtp = () => {
  //   if (!code && !code.length) {
  //     Utills.showToast('Code is required.');
  //   } else if (code.length < 4) {
  //     Utills.showToast('Please enter valid code.');
  //   } else {
  //     dispatch(
  //       AuthActions.setOTP({
  //         token: Number(code),
  //         email: email,
  //         ...(from && {from}),
  //       }),
  //     );
  //   }
  // };

  const handleOnClosePost = () => {
    setModalPostVisible(false);
    setTimeout(() => {
      dispatch(AuthActions.loginSuccess(true));
    },200);
  };

  return (
    <>
      <AuthHeader
        heading={t("enter_otp_code")}
        title={t("confirm")}
        customStyles={{marginTop: Metrix.VerticalSize(20)}}
        isBtn
        onPress={() => setModalPostVisible(true)}
        // onTextPress={() => {
        //   const body = {
        //     email,
        //     purpose:
        //       from == 'forgotPswd' ? 'FORGOT_PASSWORD' : 'EMAIL_VERIFICATION',
        //   };

        //   dispatch(AuthActions.setResendPassword(body));
        //   setTextDisable(true);
        //   setTimeout(() => setTextDisable(false), 5000);
        // }}
      >
        <View style={styles.container}>
          <CustomText.SmallText>
            6 digit code sent to your mobile. Please check and confirm the code
            to continue
          </CustomText.SmallText>
          <OTPInputView
            style={{
              // width: '80%',
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(40),
            }}
            pinCount={6}
            code={code}
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            selectionColor={Utills.selectedThemeColors().Primary}
          />

          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText.SmallText>{t("didnt_get_otp")}</CustomText.SmallText>

            <TouchableOpacity>
              <CustomText.SmallText
                customStyle={{
                  color: Utills.selectedThemeColors().Primary,
                }}>
                {t("_resend")}
              </CustomText.SmallText>
            </TouchableOpacity>
          </View>
        </View>
      </AuthHeader>
      <CustomModal onClose={handleOnClosePost} visible={modalPostVisible}>
        <PlaceholderComponent
          heading={t("congratulations")}
          image={Images.Wow}
          subHeading={t(`conversation_champion`)}
          
          title={t("go_to_courses")}
          onPress={() => {
            handleOnClosePost();
          }}
          // onBottombtnPress={() => {}}
          // bottomBtnText="Skip now"
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
  },
  imageStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(90),
  },
  textStyle: {
    textAlign: 'center',
    lineHeight: Metrix.VerticalSize(20),
  },
  underlineStyleBase: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.VerticalSize(45),
    borderWidth: 0,
    borderBottomWidth: Metrix.HorizontalSize(2),
    borderColor: '#DFDFDF',
    fontSize: FontType.FontExtraLarge,
    color: Utills.selectedThemeColors().Primary,
    padding: 0,
  },
  underlineStyleHighLighted: {
    borderColor: Utills.selectedThemeColors().Primary,
  },
});
