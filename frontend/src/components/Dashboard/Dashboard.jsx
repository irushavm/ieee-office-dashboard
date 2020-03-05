import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { TileFrame } from '../TileFrame'

import { Tile } from '../Tile'
import tiles from '../tiles'
import { getDataIfNeeded, setDataStale, getConfig } from '../../actions'
import { serverURL } from '../../App.config'
import services from '../../services'

const styles = {
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    banner: {
        position: 'absolute',
        fontSize: '60%',
        color: '#fff',
        display:'flex',
        top: '0.5%',
        textDecoration: 'underline',
        '&:hover': {
            cursor: 'pointer',
            color: '#fff'
        }
    },
    bannerLink: {
        '&:link': {
            color: '#fff'
        },
        '&:visited': {
            color: '#fff'
        },
        '&:active': {
            color: '#fff'
        }
    },
    bannerPaddng: {
        paddingLeft: '10px'
    }
}

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
                error: tileData.error,
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
        this.layoutHasChildren = true
        return (
            <div
                key={`level-${this.layoutLevels}-${index}`} style={{
                    display: 'flex', flex: `${flexAmount * 100}%`, flexDirection: flexDir, margin: this.layoutHasChildren ? '' : '1vh'
                }}
            >
                {element.layout.map(this.createLayout)}
            </div>
        )
    }

    onLogout() {
        window.localStorage.clear()
        window.location.reload()
    }

    render() {
        let { classes, config } = this.props
        this.layoutHasChildren = false
        config = config ? Object.values(config) : []
        return (
            <>
                {
                    config[0] ?
                        <div className={classes.root}>
                            <div className={classes.banner}>
                                <a className={`${classes.bannerLink} ${classes.bannerPaddng}`} href={serverURL}>Go to Admin Site</a>
                                <div className={classes.bannerPaddng} onClick={this.onLogout}>Logout</div>
                            </div>
                            {config.map(this.createLayout)}
                        </div>
                        : <div></div>
                }
            </>
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
    classes: PropTypes.object.isRequired,
    getDataIfNeeded: PropTypes.func.isRequired,
    setDataStale: PropTypes.func.isRequired,
    calendar: PropTypes.object,
    config: PropTypes.object.isRequired,
    getConfig: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
