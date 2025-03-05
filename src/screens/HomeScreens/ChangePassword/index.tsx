import {
  Animated,
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  BackHeader,
  CustomInput,
  CustomText,
  FadeContainer,
  Loader,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
} from '../../../components';
import {Formik} from 'formik';
import Schema from '../../../formik';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {ChangePasswordProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {AuthActions, HomeActions} from '../../../redux/actions';
import {t} from 'i18next';
import {AuthAPIS} from '../../../services/auth';
import {HomeAPIS} from '../../../services/home';

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
  // const {from, data} = route?.params;
  const dispatch = useDispatch();
  // to check onBoaring response
  const userDetail = useSelector((state: RootState) => state.home.userDetails);

  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  let passwordRef = useRef<TextInput>(null!);
  let confirmPasswordRef = useRef<TextInput>(null!);

  const changePassword = (body: object) => {
    setLoading(true);
    HomeAPIS.setChangePassword(body)
      .then(res => {
        console.log('Res', res?.data);
        Utills.showToast(res?.data?.message);
        setTimeout(() => {
          NavigationService.goBack();
        }, 1000);
        setLoading(false);
      })
      .catch(err => {
        console.log('Err', err?.response?.data);

        if (err?.response?.data) {
          Utills.showToast(err?.response?.data);
        } else if (err?.response?.data?.data?.errors?.password) {
        }
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={value => {
        if (value?.password?.length == 0) {
          Utills.showToast('Enter password');
        } else if (value?.confirmPassword?.length == 0) {
          Utills.showToast('Enter confirm password');
        } else if (value?.password != value?.confirmPassword) {
          Utills.showToast('Password does not match');
        } else {
          changePassword({password: value?.password});
        }
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <>
          <BackHeader
            customeStyle={{
              paddingTop: Metrix.VerticalSize(60),
              paddingHorizontal: Metrix.HorizontalSize(20),
            }}
          />
          <AuthHeader
            heading={'Change Password'}
            paragraph={'Change password to update your account security'}
            showBackHeader={true}
            title={'Confirm'}
            customStyles={{marginTop: Metrix.VerticalSize(20)}}
            disabled={!isValid}
            onPress={handleSubmit}>
            <CustomInput
              placeholder="Enter Password"
              value={values?.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={errors?.password}
              touched={touched?.password}
              secureTextEntry={hidePassword}
              hidepswdState={hidePassword}
              eye
              onEyePress={() => {
                setHidePassword(prev => !prev);
              }}
              inputRef={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <CustomInput
              placeholder="Enter Confirm Password"
              value={values?.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              error={errors?.confirmPassword}
              touched={touched?.confirmPassword}
              secureTextEntry={hideConfirmPassword}
              hidepswdState={hideConfirmPassword}
              eye
              onEyePress={() => {
                setHideConfirmPassword(prev => !prev);
              }}
              returnKeyType="done"
              inputRef={confirmPasswordRef}
            />
            <PrimaryButton
              title={t('confirm')}
              customStyles={{marginTop: Metrix.VerticalSize(20)}}
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </AuthHeader>
          <Loader isLoading={loading} />
        </>
      )}
    </Formik>
  );
};

interface ChangePasswordStyles {
  imageStyle: ImageStyle;
  container: ViewStyle;
  textStyle: TextStyle;
}
const styles = StyleSheet.create<ChangePasswordStyles>({
  imageStyle: {
    width: '80%',
    height: Metrix.VerticalSize(200),
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(100),
  },
  textStyle: {
    fontSize: FontType.FontLarge,
    textAlign: 'center',
    lineHeight: Metrix.VerticalSize(20),
    marginTop: Metrix.VerticalSize(20),
  },
});
