import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'


const UPDATE_RATE_HALF_MINUTE = 5000
const TIME_FORMAT = 'ddd. MMM Do, hh:mm A'

const Container = styled.div`
    font-weight: bold;
    text-align: center;
    padding: 1vh;
`
const Time = styled.div`
    font-size: 3em;
`
const NextEvent = styled.div`
    font-size: 2.7em;
    padding-top: 2vh;
    color: #2A5A8C;
`
const Summary = styled.div`
    font-size: 3em;
    color:'#222;
`
const Duration = styled.div`
font-size: 2em;
    color:'#333;
`
const FrontDeskMessage = styled.div`
    color:'#222;
    font-size: 3em;
`

export class InfoTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateTime: moment().format(TIME_FORMAT),
            dateInterval: setInterval(this.refreshDate.bind(this), UPDATE_RATE_HALF_MINUTE)
        }
    }

    refreshDate() {
        const dateTime = moment().format(TIME_FORMAT)
        if (this.state.dateTime !== dateTime) this.setState({ dateTime })
    }

    componentWillUnmount() {
        clearInterval(this.state.dateInterval)
        this.setState({
            dateInterval: undefined
        })
    }

    render() {
        const { card } = this.props

        const cardData = card ? card.data : {}
        return (
            <Container>
                <Time>{this.state.dateTime}</Time>
                <NextEvent>Next Event</NextEvent>
                {cardData[0]
                    ? (
                        <div>
                            <Summary>{cardData[0].summary}</Summary>
                            <Duration>{cardData[0].duration}</Duration>
                        </div>
                    )
                    : <FrontDeskMessage>Ask the Front Desk for More Info!</FrontDeskMessage>
                }
            </Container>
        )
    }
}

InfoTile.propTypes = {
    card: PropTypes.object
}
