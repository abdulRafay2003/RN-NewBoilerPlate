import React, {FC, ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Metrix, Colors, Fonts, Images, FontType, Utills} from '../../config';
import {CustomText} from '..';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  width?: number | string;
  color?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color = Utills.selectedThemeColors().Primary,
  textColor = Utills.selectedThemeColors().Secondary,
  customStyles,
  ...rest
}) => {
  // console.log('curreennntntntntnt', Utills.selectedThemeColors());
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: disabled
            ? Utills.selectedThemeColors().TextInputPlaceholserColor
            : color,
          width: width,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <CustomText.LargeSemiBoldText
          customStyle={{
            color: textColor,
            fontSize: FontType.FontMedium,
            fontWeight: '700',
          }}>
          {title}
        </CustomText.LargeSemiBoldText>
        // <Text style={{ color: textColor }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// console.log('dadadadadada', );
const styles = StyleSheet.create({
  buttonContainer: {
    height: Metrix.VerticalSize(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrix.VerticalSize(8),
    marginVertical: Metrix.VerticalSize(10),
    // backgroundColor: selectedTheme(Utills.currentThemeColors()).Primary,
    // backgroundColor: Utills.selectedThemeColors().Primary,
    // ...Metrix.createShadow(),
  },
  // titleText:{
  //   fontFamily: Fonts['Futura-Medium'],
  //   fontSize: Metrix.customFontSize(16),
  //   color: Utills.selectedThemeColors().Primary,
  // }
});
