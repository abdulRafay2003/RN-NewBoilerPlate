import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SearchProps} from '../../propTypes';
import {
  CustomText,
  EmptyState,
  Loader,
  MainContainer,
} from '../../../components';
import {t} from 'i18next';
import {CustomSearchBar} from '../../../components/SearchBar';
import {Images, Metrix, Utills} from '../../../config';
import {List} from 'react-native-paper';
import {HomeAPIS} from '../../../services/home';
import {RefreshControl} from 'react-native';

const data = [
  {
    id: '1',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '2',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '3',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '4',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '5',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '6',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '7',
    title: 'Frequently asked questions will apear here',
  },
  {
    id: '8',
    title: 'Frequently asked questions will apear here',
  },
];

export const Search: React.FC<SearchProps> = ({}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isOpened, setIsOpened] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [openedItemId, setOpenedItemId] = useState(null);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      questions();
      setRefreshing(false);
    });
  };
  // console.log('data', data);

  const questions = () => {
    setLoading(true);
    HomeAPIS.getQuestions()
      .then(res => {
        setData(res?.data?.data?.questions);
        setLoading(false);
      })
      .catch(error => {
        console.log('Err', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    questions();
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const renderItemm = ({item, index}) => {
    const isOpened = index === openedItemId;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setOpenedItemId(isOpened ? null : index);
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: Metrix.VerticalSize(10),
            marginVertical: Metrix.VerticalSize(10),
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
              source={Images.FAQ}
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
              numberOfLines={isOpened ? 10 : 1}
              customStyle={{width: '100%'}}>
              {item?.question}
            </CustomText.RegularText>
          </View>
          <View
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
          </View>
        </TouchableOpacity>
        {isOpened &&
          item?.answers?.map((answer, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 1,
                  borderColor:
                    Utills.selectedThemeColors().TextInputBorderColor,
                  paddingVertical: Metrix.VerticalSize(10),
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: Utills.selectedThemeColors().Base,
                }}>
                <CustomText.MediumText
                  customStyle={{fontWeight: '700'}}>{`Answer # ${
                  index + 1
                }`}</CustomText.MediumText>
                <CustomText.MediumText
                  customStyle={{
                    paddingLeft: Metrix.HorizontalSize(20),
                    marginTop: Metrix.VerticalSize(5),
                  }}>
                  {answer}
                </CustomText.MediumText>
              </View>
            );
          })}
      </View>
    );
  };

  return (
    <MainContainer isFlatList>
      <CustomText.LargeBoldText>{t('FAQS')}</CustomText.LargeBoldText>
      {/* <CustomSearchBar placeholder="Search for your questions" /> */}
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={renderItemm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Metrix.VerticalSize(50),
            paddingTop: Metrix.VerticalSize(20),
            paddingHorizontal: Metrix.HorizontalSize(5),
          }}
          ListEmptyComponent={<EmptyState title={'FAQS'} />}
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

interface SearchStyles {}
const styles = StyleSheet.create<SearchStyles>({});
