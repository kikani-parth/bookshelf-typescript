/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { Dialog, CircleButton } from './lib';

// Define a type for an array of functions
type FunctionArray = ((...args: any[]) => any)[];

// Utility function that calls all functions passed to it with the given arguments
const callAll =
  (...fns: FunctionArray) =>
  (...args: any[]) =>
    fns.forEach((fn) => fn && fn(...args));

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

type ModalProps = React.PropsWithChildren<{}>;

function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

interface ModalDismissButtonProps {
  children: React.ReactElement;
}

function ModalDismissButton({ children: child }: ModalDismissButtonProps) {
  const modalContext = React.useContext(ModalContext);

  if (!modalContext) {
    throw new Error('ModalDismissButton must be used within a ModalProvider');
  }

  const { setIsOpen } = modalContext;

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

interface ModalOpenButtonProps {
  children: React.ReactElement;
}

function ModalOpenButton({ children: child }: ModalOpenButtonProps) {
  const modalContext = React.useContext(ModalContext);

  if (!modalContext) {
    throw new Error('ModalDismissButton must be used within a ModalProvider');
  }

  const { setIsOpen } = modalContext;

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

type ModalContentsBaseProps = React.PropsWithChildren<{}>;

function ModalContentsBase({ children }: ModalContentsBaseProps) {
  const modalContext = React.useContext(ModalContext);

  if (!modalContext) {
    throw new Error('ModalDismissButton must be used within a ModalProvider');
  }

  const { isOpen, setIsOpen } = modalContext;

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
      {children}
    </Dialog>
  );
}

interface ModalContentsProps {
  title: string;
  children?: React.ReactNode; // The children to render inside the modal
  [key: string]: any; // Allow additional props
}

function ModalContents({ title, children, ...props }: ModalContentsProps) {
  return (
    <ModalContentsBase {...props}>
      <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
