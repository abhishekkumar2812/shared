import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

// import * as firebase from 'firebase';
import firebase from 'firebase/app'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdiLIIUKXQqV1iwKkTbBvQBLqVEgyBQQ4",
  authDomain: "bokaro-9ee44.firebaseapp.com",
  databaseURL: "https://bokaro-9ee44.firebaseio.com",
  projectId: "bokaro-9ee44",
  storageBucket: "bokaro-9ee44.appspot.com",
  messagingSenderId: "969552652569",
  appId: "1:969552652569:web:1ba48df3803995ec66bd88",
  measurementId: "G-1XNLMS4RG2"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Main from './components/Main'
import Login from './components/auth/Login';
import AddScreen from './components/main/Add';

const Stack = createStackNavigator(); 

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {

    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName ="Landing">
            <Stack.Screen name = "Landing" component = {Landing} options = {{headerShown: false}}  />
            <Stack.Screen name = "Register" component = {Register}  />
            <Stack.Screen name = "Login" component = {Login}  />
        </Stack.Navigator>
      </NavigationContainer>  
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Add" component={AddScreen} />
            {/* <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
