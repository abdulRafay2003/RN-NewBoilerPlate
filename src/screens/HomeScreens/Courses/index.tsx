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
import {CoursesProps} from '../../propTypes';
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
import axios from 'axios';
import timeHumanize from '../../../config/utills/index';
import moment from 'moment';

// const sample = [
//   {
//     id: '1',
//     title: 'Blog 1',
//     description: 'Taxation related blogs posted on OMC in 2024',
//     feature_image: Images.OnBoard1,
//     status: 'Live Now',
//   },
//   {
//     id: '2',
//     title: 'Blog 2',
//     description: 'Taxation related blogs posted on OMC in 2024',
//     feature_image: Images.OnBoard1,
//     status: 'Upcoming',
//   },
//   {
//     id: '3',
//     title: 'Blog 3',
//     description: 'Taxation related blogs posted on OMC in 2024',
//     feature_image: Images.OnBoard1,
//     status: 'Live Now',
//   },
//   {
//     id: '4',
//     title: 'Blog 4',
//     description: 'Taxation related blogs posted on OMC in 2024',
//     feature_image: Images.OnBoard1,
//     status: 'Upoming',
//   },
//   {
//     id: '5',
//     title: 'Blog 5',
//     description: 'Taxation related blogs posted on OMC in 2024',
//     feature_image: Images.OnBoard1,
//     status: 'Live Now',
//   },
// ];

export const Courses: React.FC<CoursesProps> = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      blogs();
      setRefreshing(false);
    });
  };

  // console.log('data', data);

  const blogs = () => {
    setLoading(true);
    HomeAPIS.getBlogs()
      .then(res => {
        // console.log('Res', res);
        setData(res?.data?.data?.blogs);
        setLoading(false);
      })
      .catch(error => {
        console.log('Err', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    blogs();
  }, []);

  const renderItemm = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate(RouteNames.HomeRoutes.BlogDetails, {
            html: item?.content,
          });
        }}
        style={{
          width: '48%',
          height: Metrix.VerticalSize(140),
          marginHorizontal: 5,
          // flexDirection: 'row',
          // paddingVertical: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
          borderRadius: Metrix.HorizontalSize(5),
          backgroundColor: Utills.selectedThemeColors().Base,
          ...Metrix.createShadow,
        }}>
        <View
          style={{
            width: '100%',
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item?.feature_image}}
            // source={item?.feature_image}
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: Metrix.HorizontalSize(5),
              borderTopRightRadius: Metrix.HorizontalSize(5),
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: Metrix.HorizontalSize(10),
            paddingVertical: Metrix.VerticalSize(5),
          }}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '100%'}}>
              <CustomText.MediumText numberOfLines={1}>
                {item?.title}
              </CustomText.MediumText>
            </View>
          </View>
          <CustomText.SmallText
            customStyle={{marginTop: Metrix.VerticalSize(5), width: '95%'}}
            numberOfLines={1}>
            {moment(item?.updated_at).format('DD-MMM-YYYY')}
          </CustomText.SmallText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer isFlatList>
      <CustomText.LargeBoldText>{t('blogs')}</CustomText.LargeBoldText>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItemm}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: Metrix.VerticalSize(50),
            paddingHorizontal: Metrix.HorizontalSize(10),
          }}
          ListEmptyComponent={<EmptyState title={'Blogs'} />}
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

interface CoursesStyles {}
const styles = StyleSheet.create<CoursesStyles>({});
