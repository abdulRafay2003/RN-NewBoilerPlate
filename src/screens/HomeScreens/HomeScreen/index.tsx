import 'react-native-gesture-handler';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {HomeScreenProps} from '../../propTypes';
import {
  CategoryBtnsList,
  CourseCards,
  CustomText,
  EmptyState,
  Loader,
  MainContainer,
  PrimaryButton,
  RoundImageContainer,
} from '../../../components';
import {VerifyUser} from '../../AuthScreens/VerifyUser';
import {
  Colors,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {HomeAPIS} from '../../../services/home';
import {Modal} from 'react-native-paper';
import {AuthAPIS} from '../../../services/auth';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const {t, i18n} = useTranslation();
  const userData = useSelector((state: RootState) => state.home.userDetails);
  const fcm = useSelector((state: RootState) => state.home.fcmToken);
  console.log('fcm', fcm);

  const [expanded, setExpanded] = React.useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isModale, setIsModale] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      services();
      setRefreshing(false);
    });
  };

  console.log('data', data);

  const services = () => {
    // setLoading(true);
    HomeAPIS.getUserServices()
      .then(res => {
        console.log('Response', res?.data?.data);

        setData(res?.data?.data?.user_services_data);
        // setLoading(false);
      })
      .catch(error => {
        console.log('Err', error);
        // setLoading(false);
      });
  };

  const updateFcm = () => {
    AuthAPIS.updateFcm({
      fcm_token: fcm,
      platform_id: '1',
    })
      .then(res => {
        // console.log('Res for Live sessions', res?.data?.data);
      })
      .catch(error => {
        console.log('Err', error);
      });
  };

  useEffect(() => {
    services();
    // updateFcm();
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const renderItemm = ({item}: any) => {
    const isSelected = item.id === selectedId;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(RouteNames.HomeRoutes.ServiceDetail, {
              detail: item,
            });
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: Metrix.VerticalSize(10),
            marginTop: Metrix.VerticalSize(10),
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
              source={Images.Services}
              resizeMode={'contain'}
              style={{
                width: Metrix.HorizontalSize(28),
                height: Metrix.VerticalSize(28),
                tintColor: Utills.selectedThemeColors().Primary,
              }}
            />
          </View>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <CustomText.RegularText
              numberOfLines={1}
              customStyle={{width: '100%'}}>
              {item?.service}
            </CustomText.RegularText>
          </View>
          {/* <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.ArrowDown}
              resizeMode={'contain'}
              style={{
                width: Metrix.HorizontalSize(18),
                height: Metrix.VerticalSize(18),
                tintColor: Utills.selectedThemeColors().Primary,
              }}
            />
          </View> */}
        </TouchableOpacity>
        {isOpened &&
          item?.categories?.map((item: any, index: number) => {
            return (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor:
                    Utills.selectedThemeColors().TextInputBorderColor,
                  paddingVertical: Metrix.VerticalSize(10),
                  // width: '90%',
                  // alignSelf: 'center',
                  backgroundColor: Utills.selectedThemeColors().Base,
                }}>
                <CustomText.MediumText
                  customStyle={{
                    paddingLeft: Metrix.HorizontalSize(10),
                    marginTop: Metrix.VerticalSize(5),
                  }}>
                  {'\u2022   '}
                  {item?.name}
                </CustomText.MediumText>
              </View>
            );
          })}
      </View>
    );
  };

  return (
    <MainContainer isFlatList>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomText.LargeBoldText>{t('services')}</CustomText.LargeBoldText>
        {/* <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(RouteNames.HomeRoutes.CreateService);
          }}
          style={{
            padding: Metrix.HorizontalSize(8),
            borderRadius: 100,
            backgroundColor: Utills.selectedThemeColors().Primary,
          }}>
          <RoundImageContainer
            source={Images.Add}
            circleWidth={14}
            imageStyle={{
              tintColor: Utills.selectedThemeColors().Base,
              backgroundColor: Utills.selectedThemeColors().Primary,
            }}
          />
        </TouchableOpacity> */}
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItemm}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Utills.selectedThemeColors().Primary}
              colors={[Utills.selectedThemeColors().Primary]}
              enabled={true}
            />
          }
          ListEmptyComponent={<EmptyState title={'Services'} />}
          contentContainerStyle={{
            paddingBottom: Metrix.VerticalSize(50),
            paddingTop: Metrix.VerticalSize(10),
            paddingHorizontal: Metrix.HorizontalSize(5),
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate(RouteNames.HomeRoutes.CreateService);
        }}
        style={{
          padding: Metrix.HorizontalSize(15),
          borderRadius: 100,
          backgroundColor: Utills.selectedThemeColors().Primary,
          position: 'absolute',
          zIndex: 99,
          bottom: '5%',
          right: '8%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RoundImageContainer
          source={Images.Add}
          circleWidth={18}
          imageStyle={{
            tintColor: Utills.selectedThemeColors().Base,
            backgroundColor: Utills.selectedThemeColors().Primary,
            marginRight: 10,
          }}
        />
        <CustomText.RegularText
          customStyle={{
            color: Utills.selectedThemeColors().Base,
            marginLeft: Metrix.HorizontalSize(10),
          }}
          numberOfLines={1}>
          Add Service
        </CustomText.RegularText>
      </TouchableOpacity>
      {/* <Loader isLoading={loading} /> */}
    </MainContainer>
  );
};

interface HomeScreenStyles {}
const styles = StyleSheet.create({
  drawerContent: {
    position: 'absolute',
    zIndex: 999,
    flex: 1,
  },
  userInfoSection: {
    marginTop: 50,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    paddingTop: 25,
    borderTopWidth: 1,
    borderColor: Colors.InActiveTabBar,
    marginTop: 25,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    // borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
