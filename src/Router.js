import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// native base
import {Icon} from 'native-base';

// auth loading
import AuthLoading from './screens/AuthLoading';

// app stack
import Home from './screens/Home';
import Genres from './screens/Home/Genres';
import Detail from './screens/Detail';
import TopRated from './screens/TopRated';
import Search from './screens/Search';
import PopularMoviesWithGenre from './screens/Home/PopularMoviesWithGenre';
import Watchlist from './screens/Watchlist';

// auth stack
import SignIn from './screens/SignIn';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail',
        },
    },
    Genres:{
        screen: Genres,
        navigationOptions: {
            title: 'Genres',
        },
    },
    PopularMoviesWithGenre:{
        screen: PopularMoviesWithGenre
    }
}, {
    headerLayoutPreset: 'center',
});

const TopRatedStack = createStackNavigator({
    TopRated: {
        screen: TopRated,
        navigationOptions: {
            title: 'Top Rated',
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail',
        },
    },
}, {
    headerLayoutPreset: 'center',
});

const SearchStack = createStackNavigator({
    TopRated: {
        screen: Search,
        navigationOptions: {
            title: 'Search',
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail',
        },
    },
}, {
    headerLayoutPreset: 'center',
});

const WatchlistStack = createStackNavigator({
    TopRated: {
        screen: Watchlist,
        navigationOptions: {
            title: 'Watchlist',
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Detail',
        },
    },
}, {
    headerLayoutPreset: 'center',
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
        Search: {
            screen: SearchStack,
            navigationOptions: {
                title: 'Search',
                tabBarIcon: ({tintColor}) => <Icon name="search" style={{color: tintColor}}/>,
            },
        },
        Watchlist: {
            screen: WatchlistStack,
            navigationOptions: {
                title: 'Watchlist',
                tabBarIcon: ({tintColor}) => <Icon name="list-box" style={{color: tintColor}}/>,
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

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: {
            screen: AuthLoading,
        },
        App: MovieTabNavigator,
        Auth: SignIn,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

export default createAppContainer(SwitchNavigator);
