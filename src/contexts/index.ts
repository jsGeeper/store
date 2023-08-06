/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { createContext } from 'react';

// app wrapper layout context
export const AppWrapperContext = createContext({
  isOpen: false,
  toggle: () => {
    false;
  }
});

// personal information context
export const PersonalDetailsContext = createContext({
  onNextStep: () => {
    false;
  },
  activeStep: 0,
  onCancel: (): void => {
    false;
  }
});

// expert verification  context
export const UserVerificationContext = createContext({
  onNextStep: () => {
    false;
  },
  onCancel: () => {
    false;
  },
  activeStep: 0
});

// expert experience  context
export const ExpertExperienceContext = createContext({
  onCancel: () => {
    false;
  },
  onNextStep: () => {
    false;
  },
  activeStep: 0
});

export const authContext = createContext({});
export const viewportContext = createContext({});
export const SnackbarContext = createContext({});
