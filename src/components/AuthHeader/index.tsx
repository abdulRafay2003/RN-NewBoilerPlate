import React, {ReactNode} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackHeader} from '../BackHeader';
import {CustomText, MainContainer, PrimaryButton, SecondaryButton} from '..';
import {Colors, Images, Metrix, Utills} from '../../config';
import {I18nManager} from 'react-native';
import {PrimaryButtonProps} from '../PrimaryButton';
import {useThemeHook} from '../../hooks';
import {t} from 'i18next';

const TouchableText: React.FC<{text: string}> = ({text}) => {
  // const {Colors} = useThemeHook();
  return (
    <Pressable
      // activeOpacity={0.8}
      style={{justifyContent: 'flex-end'}}
      onPress={() => {}}>
      <CustomText.MediumText
        customStyle={{
          color: Utills.selectedThemeColors().Primary,
          // borderWidth:1,
          // paddingBottom:
          // verticalAlign:'bottom'
        }}>
        {text}
      </CustomText.MediumText>
    </Pressable>
  );
};

type AuthHeaderProps = PrimaryButtonProps & {
  heading: string;
  paragraph?: string;
  showBackHeader?: boolean;
  onBottomTextPress?: () => void;
  isbottomText?: boolean;
  isBtn?: boolean;
  title?: string;
  isSecondaryBtn?: boolean;
  isupperText?: boolean;
  children: ReactNode;
};

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  heading,
  paragraph,
  showBackHeader = true,
  children,
  disabled,
  title,
  onPress,
  onBottomTextPress,
  isbottomText,
  isBtn,
  customStyles,
  isSecondaryBtn,
  isupperText,
}) => {
  // const {Colors} = useThemeHook();

  return (
    <MainContainer
      customeStyle={{
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingTop: 0,
        paddingBottom: Metrix.VerticalSize(40),
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <Image
            source={Images.Logo}
            style={{
              width: Metrix.HorizontalSize(120),
              height: Metrix.VerticalSize(120),
            }}
            resizeMode="contain"
          />
          <CustomText.ExtraLargeBoldText>
            {heading}
          </CustomText.ExtraLargeBoldText>
        </View>

        <View style={styles.childrenView}>
          <View
            style={
              {
                // borderWidth:1,
              }
            }>
            {children}
          </View>
          <View
            style={[
              styles.bottomContainer,
              !isBtn && {justifyContent: 'flex-end'},
            ]}>
            {isupperText && (
              <View>
                <CustomText.MediumText
                  customStyle={{
                    textAlign: 'center',
                  }}
                  isSecondaryColor>
                  {t('text')} <TouchableText text={t('terms')} /> {t('and')}{' '}
                  <TouchableText text={t('conditions')} />
                </CustomText.MediumText>
              </View>
            )}
            {isBtn && (
              <PrimaryButton
                title={title}
                customStyles={customStyles}
                disabled={disabled}
                onPress={onPress}
              />
            )}
            {isSecondaryBtn && (
              <View style={{marginBottom: Metrix.VerticalSize(50)}}>
                {/* <CustomText.SmallText
                customStyle={{
                  textAlign: 'center',
                  lineHeight: 30,
                }}>
                {t('signup_text')}
              </CustomText.SmallText> */}

                <SecondaryButton
                  onPress={onPress}
                  title={t('signup')}
                  source={Images.GoogleLogo}
                />
              </View>
            )}
            {isbottomText && (
              <TouchableOpacity
                style={styles.bottomText}
                onPress={onBottomTextPress}>
                <CustomText.MediumText isSecondaryColor>
                  {t('skip_now')}
                </CustomText.MediumText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: Metrix.VerticalSize(40),
  },
  bottomText: {
    // marginBottom: Metrix.VerticalSize(20),
    // borderWidth: 1,
    alignItems: 'center',
  },
  bottomContainer: {justifyContent: 'space-between'},
  childrenView: {
    marginVertical: Metrix.VerticalSize(20),
    flex: 4,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    // borderWidth: 1,
    // flex: 1.7,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
