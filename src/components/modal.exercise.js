/** @jsx jsx */
import {jsx} from '@emotion/core'

import {CircleButton, Dialog} from './lib'
import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

const ModalContext = React.createContext()

function Modal(props) {
  const state = React.useState(false)

  return <ModalContext.Provider value={state} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={() => {
        setIsOpen(false)
      }}
      {...props}
    />
  )
}

function ModalContents({children, title, ...rest}) {
  return (
    <ModalContentsBase {...rest}>
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export {Modal, ModalContents, ModalOpenButton, ModalDismissButton}
