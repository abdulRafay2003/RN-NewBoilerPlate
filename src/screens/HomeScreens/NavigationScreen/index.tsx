import 'react-native-gesture-handler';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HomeScreenProps} from '../../propTypes';
import {
  AuthHeader,
  BackHeader,
  CustomText,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {NavigationScreenProps} from '../../propTypes';
import {Text} from 'react-native';
import {Images, Metrix} from '../../../config';
import metrix from '../../../config/metrix';

const data = {
  heading: 'About us',
  paragraphs: [
    'In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design  ',
    'In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design ',
  ],
};

type NavigationDataComponentProps = {
  heading?: string;
  paragraphs?: string[];
};

export const NavigationDataComponent: React.FC<
  NavigationDataComponentProps
> = ({heading, paragraphs}) => {
  return (
    <View
      key={heading}
      style={{
        marginTop: Metrix.VerticalSize(25),
      }}>
      <CustomText.LargeBoldText>{heading || ''}</CustomText.LargeBoldText>
      <View
        >
        {paragraphs?.map((item, index) => (
          <CustomText.RegularText
            key={index}
            customStyle={{
              marginTop: Metrix.VerticalSize(15),
            }}>
            {item}
          </CustomText.RegularText>
        ))}
      </View>
    </View>
  );
};

export const NavigationScreen: React.FC<NavigationScreenProps> = ({}) => {
  return (
    <View>
      <BackHeader
        heading="About us"
        backArrow={true}
        customeStyle={{
          backgroundColor: '#339966',
          paddingHorizontal: Metrix.HorizontalSize(25),
          height: Metrix.VerticalSize(80),
          paddingTop: Metrix.VerticalSize(45),
        }}
      />
      <ScrollView
        style={{
          paddingHorizontal: Metrix.HorizontalSize(14),
          paddingTop: Metrix.VerticalSize(25),
        }}>
        <Image
          source={Images.NMO}
          style={{
            width: 50,
            height: 25,
          }}
        />
        <NavigationDataComponent
          heading={data?.heading}
          paragraphs={data?.paragraphs}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
