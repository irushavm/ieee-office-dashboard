import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { TileFrame } from '../TileFrame'

import { Tile } from '../Tile'
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
        ${props.flexBasis ? `flex: ${props.flexBasis}%;` : ``}
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

    createLayout(element, layoutDir, key) {
        const flexAmount = element.ratio
        if (element.tile) {
            const tileName = element.tile
            // Relay information from calendar to the info tile
            const tileConfig = this.props.config.tile.find(e => e.tile === tileName)
            const tileData = this.props[tileConfig.service]
            if (tileName !== 'info') {
                const serviceConfig = this.props.config.service.find(e=>e.service === element.tile)
                const serviceTimeout = services.user.convertConfigTimeoutToMS(serviceConfig.config.refreshTimeout)
                if(!this.serviceInit.includes(tileName)) {
                    this.fetchDatasource(tileName, serviceConfig.config)
                    this.serviceIntervals.push(setInterval(() => this.fetchDatasource(tileName, serviceConfig.config), serviceTimeout))
                    this.serviceInit.push(tileName)
                }
            }
            const tileFrameProps = {
                key: `${key}-frame`,
                loading: tileData && tileData.isFetching,
                provider: tileName,
                error: tileData && tileData.error,
                style: {
                    flex: `${flexAmount * 100}%`,
                    margin: '1vh'
                }
            }

            return <TileFrame {...tileFrameProps}>
                <Tile name={tileName} config={this.props.config.tile.find(e => e.tile === tileName)} data={tileData} />
            </TileFrame>
        }

        // Create layout and call function recursively
        return (
            <LayoutContainer key={`${key}`}
                style={{height: `${element.ratio? '' : '100%'}`} }
                flexBasis={(flexAmount * 100)}
                flexDir={layoutDir}
            >
                {element.layout.map((layout, index)=> this.createLayout(layout, layout.layoutDir, `${key}-${index}`))}
            </LayoutContainer>
        )
    }

    onLogout() {
        window.localStorage.clear()
        window.location.reload()
    }

    render() {
        let { layout } = this.props.config || {}

        return ( layout ?
            <Container>
                <Banner>
                    <BannerLink href={serverURL}>Go to Admin Site</BannerLink>
                    <BannerLink onClick={this.onLogout}>Logout</BannerLink>
                </Banner>
                {this.createLayout(layout,layout.layoutDir, 'layout')}
            </Container>
            : null
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
    config: PropTypes.object,
    getConfig: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
