import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { performLogin, clearLoginMessage } from '../../actions'


import Dashboard from '../Dashboard'
import { Login } from '../Login'
import { body } from '../../styles'


const Container = styled.div`
    background: ${body.background};
    font-family: ${body.fontFamily};
    padding: ${body.padding};
    height: ${body.height};
    overflow: ${body.overflow};
`

class Window extends Component {
    componentDidMount() {
        this.props.clearLoginMessage()
    }

    userLogin({ username, password }) {
        this.props.performLogin({ username, password })
    }

    render() {
        const { accountSuccess, accountError } = this.props
        return (
            <Container>
                {
                    !accountSuccess
                        ? <Login onSubmit={this.userLogin.bind(this)} message={accountError ? accountError.message : ''} />
                        : <Dashboard />
                }
            </Container>
        )
    }
}


Window.propTypes = {
    performLogin: PropTypes.func.isRequired,
    clearLoginMessage: PropTypes.func.isRequired,
    accountError: PropTypes.object,
    accountSuccess: PropTypes.bool
}

const mapStateToProps = state => ({
    accountSuccess: state.account.success,
    accountError: state.account.error
})

const mapDispatchToProps = dispatch => ({
    performLogin: ({ username, password }) => dispatch(performLogin({ username, password })),
    clearLoginMessage: () => dispatch(clearLoginMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Window)
