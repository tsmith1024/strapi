import React, { useEffect, useState } from 'react';
import at from 'lodash/at';
import { useGuidedTour } from '@strapi/helper-plugin';
import layout from '../layout';
import Modal from './Modal';
import StepperModal from '../Stepper/Modal/StepperModal'

const GuidedTourModal = () => {
  const { currentStep, guidedTourState, setCurrentStep, setStepState } = useGuidedTour();
  const [stepContent, setStepContent] = useState();
  const [isVisible, setIsVisible] = useState(currentStep);

  useEffect(() => {
    if (!currentStep) {
      setIsVisible(false);

      return;
    }

    const [isStepDone] = at(guidedTourState, currentStep);

    setIsVisible(!isStepDone);
  }, [currentStep, guidedTourState]);

  useEffect(() => {
    if (currentStep) {
      const [content] = at(layout, currentStep);
      setStepContent(content);
    }
  }, [currentStep]);

  const handleCTA = () => {
    setStepState(currentStep, true);

    setCurrentStep(null);
  };

  if (isVisible && stepContent) {
    return (
      <Modal onClose={handleCTA} title="3 simple steps">
        <StepperModal onCTA={handleCTA} {...stepContent} />
      </Modal>
    );
  }

  return null;
};

export default GuidedTourModal;
