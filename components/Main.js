import React, { Component } from 'react'
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import {fetchUser} from '../redux/actions/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import AddScreen from './main/Add';

const Tab = createMaterialBottomTabNavigator();

//as we need to pass a screen we pass an empty scren
const EmptyScreen = () => {
    return (null);
}



export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        const {currentUser} = this.props;
        console.log(currentUser);
        if(currentUser == undefined){
            return(
                <View><Text>nothing</Text></View>
            )
        }
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component = {FeedScreen} 
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name = "home" color={color} size ={26} />
                        )
                    }}
                />
{/* listeners are listening for user interactions with buttons */}
                <Tab.Screen name="AddContainer" component = {EmptyScreen} 
                    listeners = {({navigation}) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name = "plus-box" color={color} size ={26} />
                        )
                    }}
                />

                <Tab.Screen name="Profile" component = {ProfileScreen} 
                    options = {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name = "account-circle" color={color} size ={26} />
                        )
                    }}
                />
                
            </Tab.Navigator>
        )
    }
}

const mapStateToProps  = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
