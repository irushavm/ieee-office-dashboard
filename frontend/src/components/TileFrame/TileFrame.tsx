import React, { ReactChildren, CSSProperties } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { card } from '../../styles'

const Border = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 3px;
    background-color: ${card.background};
    box-shadow: ${card.boxShadow};
    max-width: 100%;
    max-height: 100%;
`

const LoadingTile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #eff7ff;
    color: #87b9ed;
    font-weight: bold;
    width: 100%;
    height: 100%;
`

const ErrorTileProvider = styled.div`
`

const ErrorTile = styled.div`
    font-size: 30px;
    color: #7f0000;
    background-color: #ffeaea;
    padding: 2vh;
    margin: 1vh;
    text-align: center;
    border-radius: 5px;
`

const ErrorTileType = styled.div`
    font-size: 25px;
`

const ErrorTileDetails = styled.div`
    padding-top: 1vh;
    font-size: 18px;
`

type TileFrameProps = {
  loading: boolean
  children: ReactChildren
  style: CSSProperties,
  provider: string,
  error: {
      type: string,
      error: string,
  }
}

export const TileFrame = ({ loading, children, style, provider, error}: TileFrameProps) => {
    if(error) {
        return (
            <ErrorTile>
                <ErrorTileProvider>
                    Unable to get information from {provider}
                </ErrorTileProvider>
                <ErrorTileType>
                    Error Type: {error.type}
                </ErrorTileType>
                <ErrorTileDetails>
                    Details: {error.error}
                </ErrorTileDetails>
            </ErrorTile>
        )
    }

    return (
        <Border loading={loading ? 1 : 0} style={style}>
        {!loading ? children : <LoadingTile>Refreshing</LoadingTile>}
        </Border>
    )
}

TileFrame.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  provider: PropTypes.string,
  error: PropTypes.object
}