/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import config from './aws-exports';
import {Analytics} from 'aws-amplify';
import AppSyncConfig from './AppSync';
Amplify.configure({...config, ...AppSyncConfig});

AppRegistry.registerComponent(appName, () => App);
