import React from 'react';

import styled from 'styled-components';
import {Board} from './Board';
import {Route} from 'react-router-dom';

export const Home = () => {
     const pathPrefix = '/home/'

    return (

        <Route path={pathPrefix + 'board/'}>
            <Board></Board>
        </Route>

    )



}



const StyledHome = styled.section `

    height:100%;
    width:100%;
    border:1px solid red;



`