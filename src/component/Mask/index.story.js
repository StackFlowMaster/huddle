import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import { useDispatch } from 'react-redux';
import Container from 'storybook/Container';
import { createSelector } from 'reselect';
import Mask from './Mask';
import { actions } from '/state/tutorial';

export const activeSelector = (state) => state.tutorial.active;
export const maskCenterSelector = (state) => state.tutorial.mask.center;
export const maskRadiusSelector = (state) => state.tutorial.mask.radius;
export const stepsSelector = (state) => state.tutorial.steps;
export const currentStepsSelector = (state) => state.tutorial.currentStep;
export const unreadSelector = (state) => state.tutorial.unread;

export const maskSelector = createSelector(
  activeSelector,
  maskCenterSelector,
  maskRadiusSelector,
  stepsSelector,
  currentStepsSelector,
  (active, center, radius, steps, currentStep) => ({
    active,
    center,
    radius,
    steps,
    currentStep,
  }),
);

const DefaultMask = () => {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(actions.registerAnchor('Mask 1', {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    }));
  }, 100);
  return (
    <Container>
      <Mask />
    </Container>
  );
};

storiesOf('Mask', module).add('General', () => (<DefaultMask />));
