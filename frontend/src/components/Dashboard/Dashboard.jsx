import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { TileFrame } from '../TileFrame'

import { Tile } from '../Tile'
import tiles from '../tiles'
import { getDataIfNeeded, setDataStale, getConfig } from '../../actions'
import { serverURL } from '../../App.config'
import services from '../../services'


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Banner = styled.div`
    position: absolute;
    font-size: 60%;
    color: #fff;
    display: flex;
    top: 0.5%;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
        color: #fff;
    }
`

const BannerLink = styled.a`
    padding-left: 10px;
    &:link {
        color: #fff;
    }
    &:visited {
        color: #fff;
    },
    &:active: {
        color: #fff;
    }
`

const LayoutContainer = styled.div`
    display: flex;
    ${(props) => css`
        flex: ${props.flexBasis}%;
        flex-direction: ${props.flexDir};
    `}
`

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.layoutLevels = 0
        this.serviceIntervals = []
        this.serviceInit = []
        this.fetchDatasource = this.fetchDatasource.bind(this)
        this.createLayout = this.createLayout.bind(this)
        this.onLogout = this.onLogout.bind(this)
    }
    async componentDidMount() {
        await this.onDashboardLoad()
    }


    componentWillUnmount() {
        this.serviceIntervals.forEach(i => clearInterval(i))
    }

    async onDashboardLoad() {
        await this.props.getConfig()
    }

    fetchDatasource(name, serviceConfig) {
        this.props.setDataStale(name)
        this.props.getDataIfNeeded(name, serviceConfig)
    }

    createLayout(element, index) {
        const flexAmount = (element.h === 1) ? element.w : element.h
        this.layoutLevels++
        if (element.tile) {
            const tileName = element.tile.name
            const tileType = tileName[0].toUpperCase() + tileName.slice(1)
            const TileElement = tiles[`${tileType}Tile`]
            // Relay information from calendar to the info tile
            let tileData
            if (tileType === 'Info') {
                tileData = this.props.calendar
            } else {
                tileData = this.props[tileName]
                const serviceConfig = element.tile.config
                const serviceTimeout = services.user.convertConfigTimeoutToMS(serviceConfig.timeout)
                if(!this.serviceInit.includes(tileName)) {
                    this.fetchDatasource(tileName, serviceConfig)
                    this.serviceIntervals.push(setInterval(() => this.fetchDatasource(tileName, serviceConfig), serviceTimeout))
                    this.serviceInit.push(tileName)
                }
            }

            const tileFrameProps = {
                key: `level-${this.layoutLevels}-${index}`,
                loading: tileData && tileData.isFetching,
                provider: tileType,
                error: tileData && tileData.error,
                style: {
                    flex: `${flexAmount * 100}%`,
                    margin: '1vh'
                }
            }

            if (['info'].includes(tileName)) {
                return (
                    <TileFrame {...tileFrameProps}>
                        <TileElement card={tileData} />
                    </TileFrame>
                )
            }
            return <TileFrame {...tileFrameProps}>
                <Tile name={tileName} config={tiles.config[tileName]} data={tileData} />
            </TileFrame>
        }

        // Create layout and call function recursively
        const flexDir = element.layout[0].h === 1 ? 'row' : 'column'
        return (
            <LayoutContainer key={`level-${this.layoutLevels}-${index}`}
                flexBasis={flexAmount * 100}
                flexDir={flexDir}
            >
                {element.layout.map(this.createLayout)}
            </LayoutContainer>
        )
    }

    onLogout() {
        window.localStorage.clear()
        window.location.reload()
    }

    render() {
        let { config } = this.props
        config = config ? Object.values(config) : []
        return ( config[0] ?
            <Container>
                <Banner>
                    <BannerLink href={serverURL}>Go to Admin Site</BannerLink>
                    <BannerLink onClick={this.onLogout}>Logout</BannerLink>
                </Banner>
                {config.map(this.createLayout)}
            </Container>
            : <div></div>
        )
    }
}

const mapStateToProps = state => ({ config: state.account.config, ...state.cards })

const mapDispatchToProps = dispatch => ({
    getDataIfNeeded: (name, serviceConfig) => dispatch(getDataIfNeeded(name, serviceConfig)),
    setDataStale: name => dispatch(setDataStale(name)),
    getConfig: () => dispatch(getConfig())
})

Dashboard.propTypes = {
    getDataIfNeeded: PropTypes.func.isRequired,
    setDataStale: PropTypes.func.isRequired,
    calendar: PropTypes.object,
    config: PropTypes.object.isRequired,
    getConfig: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
