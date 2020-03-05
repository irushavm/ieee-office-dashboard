import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

const TileItemContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin: 1vh;
padding: 1vh;
background: #fff;
box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
`

export const TileSliderItem = (props : any) => {
    return <CSSTransition
    in={props.show}
    timeout={500}
    classNames='TileSlider'
    unmountOnExit
    mountOnEnter
    >
        <TileItemContainer style={props.style}>
            {props.children}
        </TileItemContainer>
    </CSSTransition>
}