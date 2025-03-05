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
import {CreateQuestionProps} from '../../propTypes';
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

export const CreateQuestion: React.FC<CreateQuestionProps> = ({}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [question, setquestion] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log('Params', question);

  const create = () => {
    if (question?.length == 0) {
      Utills.showToast('Question is required');
    } else {
      const body = {
        question: question,
      };
      setLoading(true);
      HomeAPIS.createUserQuestions(body)
        .then(res => {
          Utills.showToast('Question has been created successfully');
          NavigationService.goBack();
          // setData(res?.data?.data?.live_sessions);
          setLoading(false);
        })
        .catch(error => {
          // Utills.showToast('Question has been created successfully');
          console.log('Err', error?.response?.data?.data?.errors);
          setLoading(false);
        });
    }
  };

  return (
    <MainContainer>
      <BackHeader backArrow={true} heading="Add Question" />

      <View style={{marginTop: Metrix.VerticalSize(10), flex: 1}}>
        <CustomInput
          heading={t('Question')}
          placeholder={t('Enter your question')}
          onChangeText={(text: string) => {
            setquestion(text);
          }}
          mainContainerStyle={{
            height: Metrix.VerticalSize(120),
            paddingVertical: Metrix.VerticalSize(10),
            borderRadius: Metrix.HorizontalSize(10),
          }}
          value={question}
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="default"
          multiline={true}
        />
      </View>
      <PrimaryButton title="Create" onPress={create} />
      <Loader isLoading={loading} />
    </MainContainer>
  );
};

interface CreateQuestionStyles {}
const styles = StyleSheet.create<CreateQuestionStyles>({});
