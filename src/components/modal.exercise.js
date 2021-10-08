import {Dialog} from './lib'
import * as React from 'react'

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

function ModalContents(props) {
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

export {Modal, ModalContents, ModalOpenButton, ModalDismissButton}
