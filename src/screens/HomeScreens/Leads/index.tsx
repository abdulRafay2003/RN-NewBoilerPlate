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
import {LeadsProps} from '../../propTypes';
import {
  CustomText,
  EmptyState,
  Loader,
  MainContainer,
  RoundImageContainer,
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

const data = [
  {
    id: '1',
    title: 'Live Sessions 1',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Live Now',
  },
  {
    id: '2',
    title: 'Live Sessions 2',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Upcoming',
  },
  {
    id: '3',
    title: 'Live Sessions 3',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Live Now',
  },
  {
    id: '4',
    title: 'Live Sessions 4',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Upoming',
  },
  {
    id: '5',
    title: 'Live Sessions 5',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Live Now',
  },
  {
    id: '6',
    title: 'Live Sessions 6',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Upcoming',
  },
  {
    id: '7',
    title: 'Live Sessions 7',
    description:
      'We are live to discuss the taxation policies related queries of 2024',
    status: 'Live Now',
  },
];

export const Leads: React.FC<LeadsProps> = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      leads();
      setRefreshing(false);
    });
  };
  // console.log('data', data);

  const leads = () => {
    // setLoading(true);
    HomeAPIS.getLeads()
      .then(res => {
        console.log('Res for Leads', res?.data?.data);
        setData(res?.data?.data?.leads);
        // setLoading(false);
      })
      .catch(error => {
        console.log('Err', error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    leads();
  }, []);

  const renderItemm = ({item}: any) => {
    return (
      <View>
        <TouchableOpacity
          // onPress={() => {
          //   setIsOpened(prev => !prev);
          //   setSelectedId(item?.id)
          // }}
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
              source={Images.Lead}
              resizeMode={'contain'}
              style={{
                width: Metrix.HorizontalSize(28),
                height: Metrix.VerticalSize(28),
                tintColor: Utills.selectedThemeColors().Primary,
              }}
            />
          </View>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <CustomText.MediumText
              numberOfLines={1}
              customStyle={{width: '100%'}}>
              {item?.first_name + ' ' + item?.last_name}
            </CustomText.MediumText>
            <CustomText.RegularText
              numberOfLines={1}
              customStyle={{width: '100%'}}>
              {item?.mobile_number}
            </CustomText.RegularText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <MainContainer isFlatList>
      <CustomText.LargeBoldText>{t('Leads')}</CustomText.LargeBoldText>
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
          ListEmptyComponent={<EmptyState title={'Leads'} />}
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
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate(RouteNames.HomeRoutes.CreateLead);
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
          Create Lead
        </CustomText.RegularText>
      </TouchableOpacity>
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface LeadsStyles {}
const styles = StyleSheet.create<LeadsStyles>({});
