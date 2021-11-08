import React from 'react';
import Logo from '../../images/logo.png'

import { Link } from 'react-router-dom';

import { Wrapper, Content, LogoImg } from './Header.styles';

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <LogoImg src={Logo} alt='react-logo' />
            </Link>
        </Content>
    </Wrapper>
);

export default Header;