import { NativeModules } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron, { networking } from 'reactotron-react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

// eslint-disable-next-line import/no-mutable-exports
let reactotron;
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  // Dynamically get a physical device's ip address
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];
  reactotron = Reactotron
    .configure({
      host: scriptHostname,
      name: 'Huddle',
    })
    .use(reactotronRedux())
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(networking({
      ignoreUrls: /https:\/\/clients3.google.com\/generate_204/,
    }))
    .connect();
  global.R = Reactotron;
}

export default reactotron;
