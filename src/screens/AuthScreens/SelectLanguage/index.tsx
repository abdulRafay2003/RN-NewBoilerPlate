import React, {useEffect, useState} from 'react';
import {View, I18nManager} from 'react-native';
import {
  AuthHeader,
  CustomText,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {SelectLanguageProps} from '../../propTypes';
import {Images, NavigationService, RouteNames, Utills} from '../../../config';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {ISO_8601} from 'moment';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../../redux/actions';

export const SelectLanguage: React.FC<SelectLanguageProps> = ({}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    i18n.language || null,
  );

  const isContinueButtonDisabled = !selectedLanguage;

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  console.log('Log===>>>2222', selectedLanguage, i18n.language);

  const handleContinue = () => {
    if (selectedLanguage) {
      console.log('Log===>>>', i18n.language, selectedLanguage);
      if (selectedLanguage != i18n.language) {
        i18n.changeLanguage(selectedLanguage).then(() => {
          console.log(
            'res------',
            selectedLanguage != i18n.language,
            i18n.language,
            selectedLanguage,
          );
          I18nManager.forceRTL(selectedLanguage == 'ar');
          dispatch(AuthActions.changeRouteOnLang(true));
          setTimeout(() => RNRestart.Restart(), 300);
        });
      }
      NavigationService.navigate(RouteNames.AuthRoutes.OnBoardingScreen);
    }
  };

  const languageOptions = [
    {name: t('english'), icon: Images.user1, lang: 'en'},
    {name: t('arabic'), icon: Images.user2, lang: 'ar'},
  ];

  return (
    <AuthHeader
      heading={t('select_language')}
      isBtn
      title={t('Continue')}
      onPress={() => {
        handleContinue();
      }}
      disabled={isContinueButtonDisabled}>
      {languageOptions.map((option, index) => (
        <SecondaryButton
          key={index}
          circleWidth={35}
          title={option.name}
          source={option.icon}
          isIcon
          onPress={() => {
            handleLanguageSelect(option.lang);
          }}
          customStyles={{
            borderColor:
              selectedLanguage === option.lang
                ? Utills.selectedThemeColors().Primary
                : Utills.selectedThemeColors().LightGreyText,
          }}
        />
      ))}
    </AuthHeader>
  );
};
