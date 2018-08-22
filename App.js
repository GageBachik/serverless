/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import ACAnalytics from 'appcenter-analytics';
import CodePush from 'react-native-code-push';

import { Query } from "react-apollo";
import gql from 'graphql-tag';

const getTodos = gql`
  query list {
    listTodos {
      items {
        id
        name
        completed
      }
    }
  }
`

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  // state = { todos: [] }
  codePushSync(){
    Analytics.record("CodePush Sync Pressed Amazon");
    ACAnalytics.trackEvent("Codpush Sync Pressed");
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Todos:</Text>
        <Query query={getTodos}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;

            return data.listTodos.items.map((todo, index) => (
              <Text key={index}>{todo.name}</Text>
            ));
          }}
        </Query>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Code Push Sync" onPress={() => this.codePushSync()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
