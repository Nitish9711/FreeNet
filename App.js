import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  PermissionsAndroid,
  Image,
} from 'react-native';
import wifi from 'react-native-android-wifi';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, Button, Text} from '@ui-kitten/components';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getLocation = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Wifi networks',
            message: 'We need your permission in order to find wifi networks',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('hello');
          wifi.loadWifiList(
            wifiStringList => {
              var wifiArray = JSON.parse(wifiStringList);
              console.log(wifiArray);
            },
            error => {
              console.log(error);
            },
          );
        } else {
          console.log(
            'You will not able to retrieve wifi available networks list',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getLocation();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Video
              source={require('./assets/ad.mp4')} // Can be a URL or a local file.
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Image
              source={require('./assets/load.gif')}
              style={{width: 400, height: 400}}
            />
            <Button style={styles.button} status="primary">
              Connect
            </Button>
          </View>
        )}
      </View>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
