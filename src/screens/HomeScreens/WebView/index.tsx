import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {WebViewProps} from '../../propTypes';
import {BackHeader, Loader} from '../../../components';
import {useRoute} from '@react-navigation/native';
import {Metrix} from '../../../config';
import {WebView as Web} from 'react-native-webview';

export const WebView: React.FC<WebViewProps> = ({}) => {
  const route = useRoute<any>();
  const screen = route?.params?.from;
  const url = route?.params?.url;

  console.log('From', screen, url);

  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Metrix.VerticalSize(20),
        paddingBottom: Metrix.VerticalSize(30),
        paddingHorizontal: Metrix.VerticalSize(10),
      }}>
      <View style={{paddingHorizontal: Metrix.HorizontalSize(10)}}>
        <BackHeader heading={screen} />
      </View>
      <Web
        source={{
          uri: url,
        }}
        style={{flex: 1}}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <Loader isLoading={loading} />
    </View>
  );
};

interface WebViewStyles {}
const styles = StyleSheet.create<WebViewStyles>({});
