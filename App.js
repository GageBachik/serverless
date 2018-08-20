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
import { Analytics } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'

const query = `
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
  state = { todos: [] }
  async componentDidMount() {
    const todos = await API.graphql(graphqlOperation(query))
    this.setState({ todos: todos.data.listTodos.items })
  }
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
        <Text style={styles.welcome}>Todos</Text>
        {
          this.state.todos.map((todo, index) => (
            <Text key={index}>{todo.name}</Text>
          ))
        }
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
