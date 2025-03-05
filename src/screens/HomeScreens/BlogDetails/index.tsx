import 'react-native-gesture-handler';
import {Dimensions, Platform, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BlogDetailsProps} from '../../propTypes';
import {BackHeader, MainContainer} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import RenderHtml from 'react-native-render-html';
import {Metrix, Utills} from '../../../config';

const {width, height} = Dimensions.get('window');

const mixedStyle = {
  body: {
    whiteSpace: 'normal',
    color: Utills.selectedThemeColors().PrimaryTextColor,
  },
  p: {
    color: Utills.selectedThemeColors().PrimaryTextColor,
  },
};

export const BlogDetails: React.FC<BlogDetailsProps> = ({route}: any) => {
  const params = route;
  const html = params?.params?.html;
  // console.log('Params', html);

  const source = {
    html: html,
  };

  const {t, i18n} = useTranslation();
  const userData = useSelector((state: RootState) => state.home.userDetails);
  console.log('UserData', userData);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Platform.select({
          android: Metrix.VerticalSize(50),
          ios: Metrix.VerticalSize(70),
        }),
      }}>
      <BackHeader heading="Blog Details" />
      <RenderHtml
        contentWidth={width}
        source={source}
        tagsStyles={mixedStyle}
      />
    </ScrollView>
  );
};

interface BlogDetailsStyles {}
const styles = StyleSheet.create({});
