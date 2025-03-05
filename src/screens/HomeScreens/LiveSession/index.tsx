import 'react-native-gesture-handler';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LiveSessionProps} from '../../propTypes';
import {
  BackHeader,
  CategoryBtnsList,
  CourseCards,
  CustomText,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {VerifyUser} from '../../AuthScreens/VerifyUser';
import {
  Colors,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
} from '../../../config';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import Video from 'react-native-video';
import {WebView} from 'react-native-webview';

const {width, height} = Dimensions.get('window');

export const LiveSession: React.FC<LiveSessionProps> = ({route}: any) => {
  const params = route;
  const session_url = params?.params?.url;
  console.log('Live', session_url);
  const background = require('../../../assets/video.mp4');
  const {t, i18n} = useTranslation();
  const userData = useSelector((state: RootState) => state.home.userDetails);
  console.log('UserData', session_url);

  return (
    <View style={{flex: 1, paddingTop: Metrix.VerticalSize(60)}}>
      <View style={{paddingHorizontal: Metrix.HorizontalSize(10)}}>
        <BackHeader heading="Live Session" />
      </View>
      {/* <Video
        source={{
          uri: 'https://www.youtube.com/watch?v=l5sgIqzlPXc&list=RDl5sgIqzlPXc&start_radio=1',
        }}
        onBuffer={() => {
          console.log('Buffering');
        }}
        onError={err => {
          console.log('Error', err);
        }}
        fullscreenAutorotate
        style={styles.backgroundVideo}
      /> */}
      <WebView
        source={{
          uri: session_url,
        }}
        style={{flex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    flex: 1,
    width: width,
    height: height,
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // borderWidth: 2,
  },
});
