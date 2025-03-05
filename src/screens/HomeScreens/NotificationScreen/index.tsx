import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  BackHeader,
  CustomText,
  MainContainer,
  NormalCardComponent,
  PrimaryButton,
} from '../../../components';
import {NotificationScreenProps} from '../../propTypes';
import {useDispatch} from 'react-redux';
import {Colors, Images, Metrix, Utills} from '../../../config';
import {t} from 'i18next';

const data = [
  {
    id: '1',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '2',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '3',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '4',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '5',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '6',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
  {
    id: '7',
    title: 'New upcoming live session will start in 30 minutes. Stay tuned',
  },
];

export const NotificationScreen: React.FC<NotificationScreenProps> = ({}) => {
  const dispatch = useDispatch();

  const renderItemm = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
          borderRadius: Metrix.HorizontalSize(5),
          backgroundColor: Utills.selectedThemeColors().Base,
          ...Metrix.createShadow,
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.BellActive}
            resizeMode={'contain'}
            style={{
              width: Metrix.HorizontalSize(22),
              height: Metrix.VerticalSize(22),
              tintColor: Utills.selectedThemeColors().Primary,
            }}
          />
        </View>
        <View style={{width: '85%', justifyContent: 'center'}}>
          <CustomText.SmallText numberOfLines={1} customStyle={{width: '95%'}}>
            {item?.title}
          </CustomText.SmallText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer isFlatList>
      <BackHeader backArrow={true} heading="Notifications" />
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItemm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Metrix.VerticalSize(50),
            paddingHorizontal: Metrix.HorizontalSize(5),
          }}
        />
      </View>
    </MainContainer>
  );
};

interface NotificationScreenStyles {}
const styles = StyleSheet.create<NotificationScreenStyles>({});
