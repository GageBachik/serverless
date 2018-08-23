import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Analytics, Auth} from 'aws-amplify';
import ACAnalytics from 'appcenter-analytics';

type Props = {};
export default class AuthComp extends Component<Props> {
  signUp(){
    Auth.signUp({
      username: 'afuzzyducky',
      password: 'Lolsauce123!',
      attributes:{
        email: 'gbachik@gmail.com'
      }
    }).then(data => {
      console.log(data)
      Auth.signIn('gbachik', 'Lolsauce123!')
      .then(user => console.log(user))
      .catch(err => console.log(err));
    })
      .catch(err => console.log(err));
  }
  signIn(){
    Auth.signIn('gbachik', 'Lolsauce123!')
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Auto Sign Up:</Text>
        <Button title="Sign Up" onPress={() => this.signUp()} />
        <Button title="Sign In" onPress={() => this.signIn()} />
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
