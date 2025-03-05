import {
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CreateServiceProps} from '../../propTypes';
import {
  BackHeader,
  CustomText,
  Loader,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {
  Fonts,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {HomeAPIS} from '../../../services/home';
import {Dropdown} from 'react-native-element-dropdown';

export const CreateService: React.FC<CreateServiceProps> = ({}) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [serviceVal, setServiceVal] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [serviceFocus, setServiceFocus] = useState(false);

  const [catVal, setCatVal] = useState(null);
  const [catId, setCatId] = useState(null);
  const [catFocus, setCatFocus] = useState(false);

  const [subcatVal, setSubcatVal] = useState(null);
  const [subCatId, setSubCatId] = useState(null);
  const [subcatFocus, setSubcatFocus] = useState(false);

  console.log('data', serviceId, catId, subCatId);

  const filterCat = () => {
    const result = services.filter(item => item.name === serviceVal);
    const newCategories = result?.[0]?.categories || [];
    setCategories(prevCategories => {
      if (JSON.stringify(prevCategories) !== JSON.stringify(newCategories)) {
        return newCategories;
      }
      return prevCategories;
    });
  };

  const filterSubCat = () => {
    const result = categories.filter(item => item.name === catVal);
    const newCategories = result?.[0]?.subcategories || [];
    setsubCategories(prevCategories => {
      if (JSON.stringify(prevCategories) !== JSON.stringify(newCategories)) {
        return newCategories;
      }
      return prevCategories;
    });
  };

  const getServices = () => {
    HomeAPIS.getServices()
      .then(res => {
        console.log('Response', res?.data?.data?.services);
        setServices(res?.data?.data?.services);
      })
      .catch(error => {
        console.log('Err', error);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      filterCat();
    }
  }, [serviceVal, services]);

  useEffect(() => {
    if (services?.length > 0) {
      filterSubCat();
    }
  }, [catVal, services]);

  const create = () => {
    const body = {
      service_id: serviceId,
      category_id: catId,
    };
    setLoading(true);
    HomeAPIS.createUserServices(body)
      .then(res => {
        console.log('Res for create service', res?.data?.data);
        Utills.showToast('Service has been created successfully');
        NavigationService.goBack();
        // setData(res?.data?.data?.live_sessions);
        setLoading(false);
      })
      .catch(error => {
        console.log('Err', error?.response?.data?.data?.errors?.service_id);
        Utills.showToast(error?.response?.data?.data?.errors?.service_id);
        setLoading(false);
      });
  };

  return (
    <MainContainer isFlatList>
      <BackHeader heading="Create Service" />
      <View style={{marginTop: Metrix.VerticalSize(10), flex: 1}}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{
            color: Utills.selectedThemeColors().PrimaryTextColor,
          }}
          containerStyle={{
            borderWidth: 1,
            width: '85%',
            borderRadius: 10,
            marginLeft: Metrix.HorizontalSize(10),
          }}
          data={services}
          labelField="name"
          valueField="name"
          placeholder={'Select Service'}
          value={serviceVal}
          onFocus={() => setServiceFocus(true)}
          onBlur={() => setServiceFocus(false)}
          onChange={item => {
            console.log('SER', item);
            setServiceId(item?.id);
            setServiceVal(item?.name);
            setServiceFocus(false);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{
            color: Utills.selectedThemeColors().PrimaryTextColor,
          }}
          containerStyle={{
            borderWidth: 1,
            width: '85%',
            borderRadius: 10,
            marginLeft: Metrix.HorizontalSize(10),
          }}
          data={categories}
          labelField="name"
          valueField="name"
          placeholder={'Select Category'}
          value={catVal}
          onFocus={() => setCatFocus(true)}
          onBlur={() => setCatFocus(false)}
          onChange={item => {
            console.log('CAT', item);
            setCatId(item?.id);
            setCatVal(item?.name);
            setCatFocus(false);
          }}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{
            color: Utills.selectedThemeColors().PrimaryTextColor,
          }}
          containerStyle={{
            borderWidth: 1,
            width: '85%',
            borderRadius: 10,
            marginLeft: Metrix.HorizontalSize(10),
          }}
          data={subCategories}
          labelField="name"
          valueField="name"
          placeholder={'Select Subcategory'}
          value={subcatVal}
          onFocus={() => setSubcatFocus(true)}
          onBlur={() => setSubcatFocus(false)}
          onChange={item => {
            console.log('SUBCAT', item);
            setSubCatId(item?.id);
            setSubcatVal(item?.name);
            setSubcatFocus(false);
          }}
        />
      </View>
      <PrimaryButton title="Create" onPress={create} />
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface CreateServiceStyles {}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 20,
    marginVertical: Metrix.VerticalSize(10),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Utills.selectedThemeColors().TextInputPlaceholserColor,
  },
  selectedTextStyle: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: Fonts['Regular'],
    color: Utills.selectedThemeColors().PrimaryTextColor,
  },
});
