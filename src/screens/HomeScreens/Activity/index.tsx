import {
  FlatList,
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityProps} from '../../propTypes';
import {
  CustomText,
  EmptyState,
  Loader,
  MainContainer,
} from '../../../components';
import {t} from 'i18next';
import {
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {HomeAPIS} from '../../../services/home';

const sample = [];

export const Activity: React.FC<ActivityProps> = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      getSessions();
      setRefreshing(false);
    });
  };
  // console.log('data', data);

  const getSessions = () => {
    setLoading(true);
    HomeAPIS.liveSessions()
      .then(res => {
        // console.log('Res for Live sessions', res?.data?.data);
        setData(res?.data?.data?.live_sessions);
        setLoading(false);
      })
      .catch(error => {
        console.log('Err', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSessions();
  }, []);

  const renderItemm = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item?.embed_url != null &&
            NavigationService.navigate(RouteNames.HomeRoutes.LiveSession, {
              url: item?.embed_url,
            });
        }}
        key={item?.id}
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: Metrix.VerticalSize(15),
          // marginTop: Metrix.VerticalSize(20),
          borderRadius: Metrix.HorizontalSize(5),
          backgroundColor: Utills.selectedThemeColors().Base,
          borderBottomWidth: 1,
          borderColor: Utills.selectedThemeColors().TextInputBorderColor,
          // ...Metrix.createShadow,
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.Youtube}
            resizeMode={'contain'}
            style={{
              width: Metrix.HorizontalSize(27),
              height: Metrix.VerticalSize(27),
            }}
          />
        </View>
        <View style={{width: '85%'}}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '70%'}}>
              <CustomText.MediumText numberOfLines={1}>
                {item?.event_name}
              </CustomText.MediumText>
            </View>
            <View style={{width: '30%', alignItems: 'center'}}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 7,
                    width: 7,
                    marginRight: Metrix.HorizontalSize(5),
                    borderRadius: Metrix.HorizontalSize(100),
                    backgroundColor:
                      item?.status == 'Live Now'
                        ? Utills.selectedThemeColors().Danger
                        : Utills.selectedThemeColors().Success,
                  }}></View>
                <CustomText.SmallText
                  customStyle={{
                    fontWeight: '600',
                    color:
                      item?.status == 'Live Now'
                        ? Utills.selectedThemeColors().Danger
                        : Utills.selectedThemeColors().Success,
                  }}
                  numberOfLines={1}>
                  {item?.status}
                  {item?.embed_url != null ? 'Live' : 'Upcoming'}
                </CustomText.SmallText>
              </View>
            </View>
          </View>
          <CustomText.SmallText
            customStyle={{marginTop: Metrix.VerticalSize(5), width: '95%'}}
            numberOfLines={1}>
            {item?.content}
          </CustomText.SmallText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <MainContainer isFlatList>
      <CustomText.LargeBoldText>{t('live_sessions')}</CustomText.LargeBoldText>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItemm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: Metrix.VerticalSize(20),
            paddingBottom: Metrix.VerticalSize(50),
            paddingHorizontal: Metrix.HorizontalSize(5),
          }}
          ListEmptyComponent={<EmptyState title={'Live Sessions'} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Utills.selectedThemeColors().Primary}
              colors={[Utills.selectedThemeColors().Primary]}
              enabled={true}
            />
          }
        />
      </View>
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface ActivityStyles {}
const styles = StyleSheet.create<ActivityStyles>({});
