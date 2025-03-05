import {
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CreateLeadProps} from '../../propTypes';
import {
  BackHeader,
  CustomInput,
  CustomText,
  Loader,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {t} from 'i18next';
import {
  Fonts,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {HomeAPIS} from '../../../services/home';
import {Dropdown} from 'react-native-element-dropdown';
import {Formik} from 'formik';

export const CreateLead: React.FC<CreateLeadProps> = ({}) => {
  let lNameRef = useRef<TextInput>(null!);
  let phoneRef = useRef<TextInput>(null!);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const create = (body: object) => {
    setLoading(true);
    HomeAPIS.createLeads(body)
      .then(res => {
        console.log('Res for create service', res?.data?.data);
        Utills.showToast('Lead has been created successfully');
        NavigationService.goBack();
        // setData(res?.data?.data?.live_sessions);
        setLoading(false);
      })
      .catch(error => {
        console.log('Err', error?.response?.data?.data?.errors);
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        fName: '',
        lName: '',
        phone: '',
      }}
      onSubmit={values => {
        if (values?.fName?.length == 0) {
          Utills.showToast('First name is required');
        } else if (values?.lName?.length == 0) {
          Utills.showToast('Last name is required');
        } else if (values?.phone?.length == 0) {
          Utills.showToast('Phone number is required');
        } else {
          const body = {
            first_name: values?.fName,
            last_name: values?.lName,
            mobile_number: values?.phone,
          };
          create(body);
        }
      }}
      // validationSchema={Schema.LoginSchema}
    >
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
          <MainContainer isFlatList>
            <BackHeader heading="Create Lead" />
            <View style={{marginTop: Metrix.VerticalSize(10), flex: 1}}>
              <CustomInput
                heading={t('first_name')}
                placeholder={t('enter_first_name')}
                onChangeText={handleChange('fName')}
                onBlur={() => setFieldTouched('fName')}
                value={values?.fName}
                error={errors?.fName}
                touched={touched?.fName}
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="default"
                onSubmitEditing={() => lNameRef.current.focus()}
              />
              <CustomInput
                heading={t('last_name')}
                placeholder={t('enter_last_name')}
                onChangeText={handleChange('lName')}
                onBlur={() => setFieldTouched('lName')}
                value={values?.lName}
                error={errors?.lName}
                touched={touched?.lName}
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="default"
                onSubmitEditing={() => phoneRef.current.focus()}
                inputRef={lNameRef}
              />

              <CustomInput
                heading={t('phone_number')}
                placeholder={t('enter_phone_number')}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                value={values?.phone}
                error={errors?.phone}
                touched={touched?.phone}
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="phone-pad"
                inputRef={phoneRef}
              />
            </View>
            <PrimaryButton title="Create" onPress={() => handleSubmit()} />
            <Loader isLoading={loading} />
          </MainContainer>

          <Loader isLoading={loading} />
        </>
      )}
    </Formik>
  );
};

interface CreateLeadStyles {}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 20,
    marginVertical: Metrix.VerticalSize(10),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Utills.selectedThemeColors().TextInputPlaceholserColor,
  },
  selectedTextStyle: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: Fonts['Regular'],
  },
});
