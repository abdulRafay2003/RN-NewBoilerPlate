import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  BackHeader,
  CustomInput,
  CustomText,
  Loader,
  MainContainer,
  NormalCardComponent,
  PrimaryButton,
} from '../../../components';
import {ServiceDetailProps} from '../../propTypes';
import {useDispatch} from 'react-redux';
import {
  Colors,
  Images,
  Metrix,
  NavigationService,
  Utills,
} from '../../../config';
import {t} from 'i18next';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {HomeAPIS} from '../../../services/home';
import {pick} from 'react-native-document-picker';

export const ServiceDetail: React.FC<ServiceDetailProps> = ({}) => {
  let descriptionRef = useRef<TextInput>(null!);
  let emailref = useRef<TextInput>(null!);

  const dispatch = useDispatch();
  const route = useRoute();
  const docs = route?.params?.detail?.details?.doucuments;
  const serviceId = route?.params?.detail?.id;
  const invoiceData = route?.params?.detail?.details?.invoices;
  const docData = [
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
    {
      amount: '100',
      due_date: '2024-07-20',
      filename: 'example.pdf',
      status: '0',
      created_at: '2024-07-15',
    },
  ];
  const [serviceDocuments, setServiceDocs] = useState(docs);
  const [servicePurpose, setServicePurpose] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceDoc, setServiceDoc] = useState({});
  const [loading, setLoading] = useState(false);
  console.log('Params', docs);

  const pickDoc = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
      });
      console.log(result);
      setServiceDoc(result);
    } catch (err) {
      // see error handling
    }
  };

  const postDocument = () => {
    const doc = new FormData();
    if (servicePurpose?.length == 0) {
      Utills.showToast('Enter purpose');
    } else if (serviceDescription?.length == 0) {
      Utills.showToast('Enter description');
    } else if (serviceDoc?.length == 0) {
      Utills.showToast('Select document');
    } else {
      // user_service_id: serviceId,
      // purpose: servicePurpose,
      // description: serviceDescription,
      doc.append('user_service_id', serviceId);
      doc.append('purpose', servicePurpose);
      doc.append('description', serviceDescription);
      doc?.append('file_document', {
        uri: serviceDoc?.uri,
        name: serviceDoc?.name || 'doc',
        type: serviceDoc?.name || 'image/jpeg',
      }),
        setLoading(true);
      console.log('Bodyy==>>', doc);

      HomeAPIS.userServiceDoc(doc)
        .then(res => {
          console.log('Res', res?.data);
          setLoading(false);
          Utills.showToast('Document Uploaded successfully');
          setTimeout(() => {
            NavigationService.goBack();
          }, 700);
          // Alert.alert(res?.data?.data?.message);
        })
        .catch(err => {
          console.log('Err', err.response?.data?.data?.document?.[0]);
          Alert.alert('Alert', err.response?.data?.data?.document?.[0]);
          setLoading(false);
        });
    }
  };

  const headerComponent = () => {
    return (
      <View>
        <View
          style={{
            height: Metrix.VerticalSize(40),
            width: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={[styles.headerView, {width: '15%', borderRightWidth: 0}]}>
            <CustomText.RegularText>No#</CustomText.RegularText>
          </View>
          <View
            style={[styles.headerView, {width: '27%', borderRightWidth: 0}]}>
            <CustomText.RegularText>Due Date</CustomText.RegularText>
          </View>
          <View
            style={[styles.headerView, {width: '27%', borderRightWidth: 0}]}>
            <CustomText.RegularText>Status</CustomText.RegularText>
          </View>
          <View
            style={[styles.headerView, {width: '30%', borderRightWidth: 0}]}>
            <CustomText.RegularText>Amount</CustomText.RegularText>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: Metrix.VerticalSize(50),
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={[
            styles.headerView,
            {width: '15%', backgroundColor: Utills.selectedThemeColors().Base},
          ]}>
          <CustomText.SmallText>{index + 1}</CustomText.SmallText>
        </View>
        <View
          style={[
            styles.headerView,
            {width: '27%', backgroundColor: Utills.selectedThemeColors().Base},
          ]}>
          <CustomText.SmallText>{item?.due_date}</CustomText.SmallText>
        </View>
        <View
          style={[
            styles.headerView,
            {width: '27%', backgroundColor: Utills.selectedThemeColors().Base},
          ]}>
          <CustomText.SmallText>
            {item?.status == 0 ? 'Pending' : 'Paid'}
          </CustomText.SmallText>
        </View>
        <View
          style={[
            styles.headerView,
            {
              width: '30%',
              backgroundColor: 'white',
              flexDirection: 'row',
              // alignItems: 'flex-end',
            },
          ]}>
          <CustomText.SmallText>Rs: {item?.amount}</CustomText.SmallText>
        </View>
      </View>
    );
  };

  const renderDocItem = ({item, index}: any) => {
    return (
      <View
      key={item?.id}
        style={{
          paddingHorizontal: Metrix.HorizontalSize(5),
          paddingVertical: Metrix.HorizontalSize(5),
          marginHorizontal: Metrix.HorizontalSize(5),
          // borderWidth: 1,
          borderRadius: Metrix.HorizontalSize(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.Document}
          style={{
            width: Metrix.HorizontalSize(40),
            height: Metrix.VerticalSize(40),
          }}
          resizeMode="contain"
        />
        <CustomText.ExtraSmallText
          customStyle={{
            textAlign: 'center',
            marginTop: Metrix.VerticalSize(5),
          }}>
          {item?.description}
        </CustomText.ExtraSmallText>
      </View>
    );
  };

  return (
    <MainContainer isFlatList>
      <BackHeader backArrow={true} heading="Service Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: Metrix.VerticalSize(10)}}>
        <View>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Service Name
          </CustomText.MediumText>
          <CustomText.RegularText
            customStyle={{paddingVertical: Metrix.VerticalSize(5)}}>
            {route?.params?.detail?.service}
          </CustomText.RegularText>
        </View>
        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Service Category
          </CustomText.MediumText>
          <CustomText.RegularText
            customStyle={{paddingVertical: Metrix.VerticalSize(5)}}>
            {route?.params?.detail?.category}
          </CustomText.RegularText>
        </View>
        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Date of service creation
          </CustomText.MediumText>
          <CustomText.RegularText
            customStyle={{paddingVertical: Metrix.VerticalSize(5)}}>
            {moment(route?.params?.detail?.created_at).format('DD-MMM-YYYY')}
          </CustomText.RegularText>
        </View>

        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Document Purpose
          </CustomText.MediumText>
          <CustomInput
            placeholder={t('Enter purpose')}
            onChangeText={(text: string) => {
              setServicePurpose(text);
            }}
            value={servicePurpose}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="default"
            onSubmitEditing={() => descriptionRef.current.focus()}
          />
        </View>

        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Document Description
          </CustomText.MediumText>
          <CustomInput
            placeholder={t('Enter description')}
            onChangeText={(text: string) => {
              setServiceDescription(text);
            }}
            value={serviceDescription}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="default"
            inputRef={descriptionRef}
          />
        </View>
        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.MediumText customStyle={{fontWeight: '700'}}>
            Service Document
          </CustomText.MediumText>
          <View style={{paddingVertical: Metrix.HorizontalSize(15)}}>
            <TouchableOpacity
              onPress={pickDoc}
              style={{
                borderRadius: Metrix.HorizontalSize(5),
                height: Metrix.VerticalSize(140),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00000010',
                borderWidth: 1,
                borderStyle: 'dashed',
              }}>
              <Image
                source={Images.Upload}
                style={{
                  width: Metrix.HorizontalSize(25),
                  height: Metrix.VerticalSize(25),
                }}
              />
              <CustomText.RegularText
                customStyle={{
                  fontWeight: '500',
                  marginTop: Metrix.VerticalSize(10),
                }}>
                Upload Your Service Document
              </CustomText.RegularText>
            </TouchableOpacity>
            <View>
              <CustomText.MediumText
                customStyle={{
                  paddingVertical: Metrix.VerticalSize(10),
                  fontWeight: '700',
                }}>
                Uploaded Document
              </CustomText.MediumText>
              <View>
                <FlatList
                  data={serviceDocuments}
                  renderItem={renderDocItem}
                  horizontal
                  keyExtractor={item => item.id?.toString()}
                  contentContainerStyle={{
                    paddingVertical: Metrix.VerticalSize(10),
                    // width:"100%"
                  }}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
        </View>
        {invoiceData?.length > 0 && (
          <>
            <CustomText.MediumText
              customStyle={{
                fontWeight: '700',
                paddingBottom: Metrix.VerticalSize(10),
              }}>
              Invoice Details
            </CustomText.MediumText>

            <View>
              {headerComponent()}
              <FlatList
                data={invoiceData}
                // ListEmptyComponent={
                //   isLoading ? (
                //     <></>
                //   ) : (
                //     <EmptyContainer content={'No history found...!'} />
                //   )
                // }
                renderItem={renderItem}
                keyExtractor={item => item.id?.toString()}
                contentContainerStyle={{paddingBottom: Metrix.VerticalSize(10)}}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )}
        <PrimaryButton title={'Post Document'} onPress={postDocument} />
      </ScrollView>
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface ServiceDetailStyles {}
const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  headerView: {
    borderRightWidth: StyleSheet.hairlineWidth,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Utills.selectedThemeColors().Grey,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});
