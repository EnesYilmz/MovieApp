import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

// native base
import {Icon} from 'native-base';

// auth loading
import AuthLoading from './screens/AuthLoading';

// app stack
import Home from './screens/Home';
import Detail from './screens/Detail';
import TopRated from './screens/TopRated';

// auth stack
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Popular'
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail'
        },
    }
},{
    headerLayoutPreset: "center"
});

const TopRatedStack = createStackNavigator({
    TopRated: {
        screen: TopRated,
        navigationOptions: {
            title: 'Top Rated'
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail'
        },
    }
},{
    headerLayoutPreset: "center"
});

const MovieTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                title: 'Popular',
                tabBarIcon: ({tintColor}) => <Icon name="film" style={{color: tintColor}}/>,
            },
        },
        Detail: {
            screen: TopRatedStack,
            navigationOptions: {
                title: 'Top Rated',
                tabBarIcon: ({tintColor}) => <Icon name="star" style={{color: tintColor}}/>,
            },
        },
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#586589',
            style: {
                backgroundColor: '#171f33',
            },
        },
    },
);

const AuthStack = createBottomTabNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                title: 'Sign In',
                tabBarIcon: ({tintColor}) => <Icon name="log-in" style={{color: tintColor}}/>,
            },
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                title: 'Sign Up',
                tabBarIcon: ({tintColor}) => <Icon name="person-add" style={{color: tintColor}}/>,
            },
        },
    },
    {
        initialRouteName: 'SignIn',
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#586589',
            style: {
                backgroundColor: '#171f33',
            },
        },
    },
);

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: {
            screen: AuthLoading
        },
        App: HomeStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(MovieTabNavigator);
