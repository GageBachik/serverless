/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Main from './Main'

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from 'react-apollo';
import * as AWS from 'aws-sdk';

import Amplify, {Auth} from 'aws-amplify';
import config from './aws-exports';
import AppSync from './AppSync';
Amplify.configure(config);

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: AppSync.apiKey,

      //type: AUTH_TYPE.AWS_IAM,
      //Note - Testing purposes only
      /*credentials: new AWS.Credentials({
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
      })*/

      //IAM Cognito Identity using AWS Amplify
      //credentials: () => Auth.currentCredentials(),

      //Cognito User Pools using AWS Amplify
      // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});




const WithProvider = () => (
  <ApolloProvider client={client}>
      <Rehydrated>
          <Main />
      </Rehydrated>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => WithProvider);
