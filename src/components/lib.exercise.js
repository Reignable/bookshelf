import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

const buttonVariants = {
  primary: {
    backgroundColor: colors.indigo,
    color: colors.base,
    '&:hover': {
      backgroundColor: colors.indigoDarken10,
    },
  },
  secondary: {
    backgroundColor: colors.gray,
    color: colors.text,
    '&:hover': {
      backgroundColor: colors.gray20,
    },
  },
}
const Button = styled.button(
  {
    fontSize: '1.25rem',
    padding: '0.5em 1em',
    lineHeight: '1',
    borderRadius: '0.1875em',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-in-out',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const Input = styled.input({
  borderRadius: '3px',
  border: `1px solid ${colors.gray10}`,
  background: colors.gray,
  padding: '8px 12px',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

export {Button, CircleButton, Dialog, FormGroup, Input}
