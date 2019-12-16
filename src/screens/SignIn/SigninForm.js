import React, {Component} from 'react';

import {Button, Content, Input, Item, Spinner, Text} from 'native-base';
import {Formik} from 'formik';

import validations from './validations';

import axios from 'axios';

import {inject} from 'mobx-react';
import {API_BASE, API_KEY} from '../../constants';
import {Image, View} from 'react-native';

@inject('AuthStore')
export default class SigninForm extends Component {
    _handleSubmit = async ({username, password}, bag) => {
        try {
            const {data} = await axios.get(`${API_BASE}/3/authentication/token/new?api_key=${API_KEY}`);
            const requestToken = data.request_token;
            await axios.post(`${API_BASE}/3/authentication/token/validate_with_login?api_key=${API_KEY}`, {
                username: username,
                password: password,
                request_token: requestToken
            });
            const session = await axios.post(`${API_BASE}/3/authentication/session/new?api_key=${API_KEY}`, {request_token: requestToken});
            bag.setSubmitting(false);
            await this.props.AuthStore.saveToken(session.data.session_id);
        } catch (e) {
            alert("Sign-in failed!\n" + e);
            bag.setSubmitting(false);
            bag.setErrors(e);
        }
    };

    render() {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={this._handleSubmit}
                validationSchema={validations}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      setFieldTouched,
                      isValid,
                      isSubmitting,
                  }) => (
                    <Content style={{padding: 10}}>
                        <Item error={errors.username && touched.username}>
                            <Input
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordRef._root.focus()}
                                onChangeText={handleChange('username')}
                                value={values.username}
                                placeholder='username'
                                onBlur={() => setFieldTouched('username')}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                            />

                            {(errors.username && touched.username) &&
                            <Text style={{color: 'red'}}>{errors.username}</Text>}
                        </Item>

                        <Item error={errors.password && touched.password}>
                            <Input
                                ref={ref => this.passwordRef = ref}
                                returnKeyType={'go'}
                                onChangeText={handleChange('password')}
                                value={values.password}
                                placeholder='password'
                                onBlur={() => setFieldTouched('password')}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />

                            {(errors.password && touched.password) &&
                            <Text style={{color: 'red'}}>{errors.password}</Text>}
                        </Item>

                        <Button
                            block
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            style={{marginTop: 10}}>

                            {isSubmitting && <Spinner size={'small'} color={'white'}/>}
                            <Text>Login</Text>
                        </Button>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                resizeMode={'contain'}
                                style={{width: '50%'}}
                                source={require('../../assets/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png')}/>
                        </View>
                    </Content>
                )}
            </Formik>
        );
    }
}
