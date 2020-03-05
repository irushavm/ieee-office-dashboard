import styled, { css } from 'styled-components'

export const TextXS = styled.div`
font-size: 0.5rem;
font-weight: bold;
`
export const TextS = styled.div`
font-size: 1.0rem;
font-weight: bold;
`
export const TextM = styled.div`
font-size: 1.5rem;
font-weight: bold;
`
export const TextL = styled.div`
font-size: 2.0rem;
font-weight: bold;
`
export const TextXL = styled.div`
font-size: 2.8rem;
font-weight: bold;
`
export const TextXXL = styled.div`
font-size: 4.0rem;
font-weight: bold;
`
export const Img = styled.div`
width: 100%;
height: 100%;
font-weight: bold;
margin: auto;
${({ src }: any) => css`
    background-image: url(${src});
`}
background-size: contain;
background-repeat: no-repeat;
background-position: center;
`
