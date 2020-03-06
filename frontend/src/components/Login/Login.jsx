import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { body, borderRadius } from '../../styles'
import { appName ,serverURL } from '../../App.config'

const Frame = styled.div`
    background: #fff;
    width: 60%;
    max-width: 500px;
    padding: 5%;
    margin: 25vh auto;
    text-align: center;
    border-radius: ${borderRadius};
`

const Input = styled.input`
    width: 100%;
    padding: 1vh;
    margin: 1vh 0;
    box-sizing: border-box;
    border: 2px solid ${body.background};
    border-radius,
    font-size: 1em;
    font-weight: bold;
    color: ${body.background};
`

const LoginButton = styled.button`
    background-color: ${body.background};
    color: #fff;
    width: 50%;
    margin-top: 1vh;
    padding: 1vh;
    font-size: 1.5vh;
    font-weight: bold;
    margin-bottom: 7%;
    cursor: pointer;
    border-radius: ${borderRadius};
`

const Message = styled.div`
    display: inline-block;
`

const Title = styled.h2`
`

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }

      handleChange = (event) => {
          this.setState({
              [event.target.id]: event.target.value
          })
      }

      handleSubmit = (event) => {
          event.preventDefault()
          const { username, password } = this.state
          this.props.onSubmit({ username, password })
      }

      render() {
          const { message } = this.props
          const { username, password } = this.state
          return (
              <Frame>
                  <form onSubmit={this.handleSubmit}>
                      <Title>{ appName || 'App' }</Title>
                      <Input type="text" id="username" placeholder="Username" value={username} onChange={this.handleChange} />
                      <br />
                      <Input type="password" id="password" placeholder="Password" value={password} onChange={this.handleChange} />
                      <LoginButton type="submit">Login</LoginButton>
                  </form>
                  <Message><a href={serverURL}>Go to Admin Site</a></Message>
                  <Message>{message || '' }</Message>
              </Frame>
          )
      }
}


Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}
