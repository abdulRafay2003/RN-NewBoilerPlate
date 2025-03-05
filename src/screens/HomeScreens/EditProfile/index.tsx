import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  CustomInput,
  Loader,
  MainContainer,
  PrimaryButton,
  ProfileHeader,
} from '../../../components';
import {Images, Metrix, NavigationService, Utills} from '../../../config';
import {EditProfileProps} from '../../propTypes';
import ImagePicker from 'react-native-image-crop-picker';
import _ from 'lodash';
import {RootState} from '../../../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions, HomeActions} from '../../../redux/actions';
import {HomeAPIS} from '../../../services/home';

export const EditProfile: React.FC<EditProfileProps> = ({}) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootState) => state.home.userDetails);
  const userData = userDetails?.user;
  console.log('UderData', userDetails);

  const [updatedData, setUpdatedData] = useState('');
  const [firstName, setFirstName] = useState(userData?.first_name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [selectedImage, setSelectedImage] = useState('');
  const [iconVisible, setIconVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateProfile = () => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: userData?.user_details?.mobile_number,
      nic: userData?.user_details?.nic,
    };
    setLoading(true);
    HomeAPIS.editProfile(body)
      .then(res => {
        console.log('Responseeeeeeeee', res?.data?.data);

        setLoading(false);
        dispatch(
          HomeActions.setUserDetails({
            ...userDetails,
            user: res?.data?.data?.user,
          }),
        );
        Utills.showToast(res?.data?.message);
        NavigationService.goBack();
      })
      .catch(error => {
        console.log('Err edit', error);
        setLoading(false);
      });
  };

  const imagePicker = async () => {
    try {
      const image = await ImagePicker?.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      if (_.isEmpty(image?.path)) {
        Utills.showToast('Upload image field required.');
        return;
      } else {
        setSelectedImage(image?.path);
        setIconVisible(true);
        // refRBSheet.current.open();
      }
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        console.error('erro upload image', error);
        // this.setState({loading: false});
      }
    }
  };

  const onCancel = () => {
    setSelectedImage('');
    setIconVisible(false);
  };
  const onSelect = () => {
    setIconVisible(false);
  };

  return (
    <MainContainer>
      <BackHeader heading="Edit Profile" />
      <View style={{flex: 1}}>
        {/* <ProfileHeader
            // source={{
            //   uri: 'https://e1.pxfuel.com/desktop-wallpaper/62/769/desktop-wallpaper-ssgss-vegeta-vegeta-rage-thumbnail.jpg',
            // }}
            source={
              (Object.keys(selectedImage).length != 0 && {
                uri: selectedImage,
              }) ||
              (userData?.userMedia?.[0]?.path && {
                uri: userData?.userMedia?.[0]?.path,
              })
            }
            btnText="Change Photo"
            onTextPress={() => imagePicker()}
            customMainContainerStyle={{
              // borderWidth: 1,
              // borderColor: '#fff',
              marginBottom: Metrix.VerticalSize(40),
            }}
            uploadPhotoIcons={iconVisible}
            onPressCancel={onCancel}
            onPressCheck={onSelect}
          /> */}
        <CustomInput
          heading="First Name"
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={name => setFirstName(name)}
        />
        <CustomInput
          heading="Last Name"
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={name => setLastName(name)}
        />
        <CustomInput
          heading="Email"
          placeholder={userData?.email || ''}
          value={userData?.email || ''}
          editable={false}
        />
        <CustomInput
          heading="Phone number"
          placeholder={userData?.user_details?.mobile_number || ''}
          value={userData?.user_details?.mobile_number || ''}
          editable={false}
        />
        <CustomInput
          heading="Nic Number"
          placeholder={userData?.user_details?.nic || ''}
          value={userData?.user_details?.nic || ''}
          editable={false}
        />
      </View>
      <PrimaryButton title="Save Changes" onPress={updateProfile} />
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface EditProfileStyles {}
const styles = StyleSheet.create<EditProfileStyles>({});
