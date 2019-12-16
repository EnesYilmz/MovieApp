import React, {Component} from 'react';
import {Body, Header, Title} from "native-base";

import SigninForm from './SigninForm';

export default class Signin extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Body>
                        <Title>The Movie DB Sign-in</Title>
                    </Body>
                </Header>
                <SigninForm />
            </React.Fragment>
        );
    }
}
