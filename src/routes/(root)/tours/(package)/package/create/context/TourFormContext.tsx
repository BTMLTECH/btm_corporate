import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { TourFormData, FormErrors } from '../types';
import { getInitialFormState } from '../utils/formUtils';

type TourFormAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<TourFormData['personalInfo']> }
  | { type: 'SET_DESTINATION'; payload: TourFormData['selectedDestination'] }
  | { type: 'UPDATE_ACCOMMODATION'; payload: Partial<TourFormData['accommodation']> }
  | { type: 'ADD_ACTIVITY'; payload: TourFormData['selectedActivities'][0] }
  | { type: 'REMOVE_ACTIVITY'; payload: string }
  | { type: 'UPDATE_ACTIVITY_TIME'; payload: { id: string; timeSlot: string } }
  | { type: 'UPDATE_PAYMENT'; payload: Partial<TourFormData['payment']> }
  | { type: 'SET_ERRORS'; payload: FormErrors }
  | { type: 'RESET_FORM' };

interface TourFormContextType {
  formData: TourFormData;
  errors: FormErrors;
  dispatch: React.Dispatch<TourFormAction>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  getTotalPrice: () => number;
}

const TourFormContext = createContext<TourFormContextType | undefined>(undefined);

const formReducer = (state: { formData: TourFormData; errors: FormErrors }, action: TourFormAction) => {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        formData: {
          ...state.formData,
          currentStep: action.payload
        }
      };
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        formData: {
          ...state.formData,
          personalInfo: {
            ...state.formData.personalInfo,
            ...action.payload
          }
        },
        errors: {
          ...state.errors,
          personalInfo: {}
        }
      };
    case 'SET_DESTINATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          selectedDestination: action.payload
        },
        errors: {
          ...state.errors,
          destination: undefined
        }
      };
    case 'UPDATE_ACCOMMODATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          accommodation: {
            ...state.formData.accommodation,
            ...action.payload
          }
        },
        errors: {
          ...state.errors,
          accommodation: {}
        }
      };
    case 'ADD_ACTIVITY':
      return {
        ...state,
        formData: {
          ...state.formData,
          selectedActivities: [...state.formData.selectedActivities, action.payload]
        }
      };
    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        formData: {
          ...state.formData,
          selectedActivities: state.formData.selectedActivities.filter(
            activity => activity.id !== action.payload
          )
        }
      };
    case 'UPDATE_ACTIVITY_TIME':
      return {
        ...state,
        formData: {
          ...state.formData,
          selectedActivities: state.formData.selectedActivities.map(activity => 
            activity.id === action.payload.id 
              ? { ...activity, selectedTimeSlot: action.payload.timeSlot } 
              : activity
          )
        }
      };
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        formData: {
          ...state.formData,
          payment: {
            ...state.formData.payment,
            ...action.payload
          }
        },
        errors: {
          ...state.errors,
          payment: {}
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'RESET_FORM':
      return {
        formData: getInitialFormState(),
        errors: {}
      };
    default:
      return state;
  }
};

export const TourFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {
    formData: getInitialFormState(),
    errors: {}
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tourFormData', JSON.stringify(state.formData));
  }, [state.formData]);

  const nextStep = () => {
    if (state.formData.currentStep < 5) {
      dispatch({ type: 'SET_STEP', payload: state.formData.currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (state.formData.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: state.formData.currentStep - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      dispatch({ type: 'SET_STEP', payload: step });
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    let total = 0;
    
    // Add accommodation price
    if (state.formData.accommodation.checkIn && state.formData.accommodation.checkOut) {
      const checkIn = new Date(state.formData.accommodation.checkIn);
      const checkOut = new Date(state.formData.accommodation.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      total += nights * state.formData.accommodation.pricePerNight;
    }
    
    // Add activities price
    state.formData.selectedActivities.forEach(activity => {
      total += activity.price;
    });
    
    // Add destination average cost as base price if selected
    if (state.formData.selectedDestination) {
      total += state.formData.selectedDestination.averageCost;
    }
    
    return total;
  };

  return (
    <TourFormContext.Provider 
      value={{ 
        formData: state.formData, 
        errors: state.errors, 
        dispatch,
        nextStep,
        prevStep,
        goToStep,
        getTotalPrice
      }}
    >
      {children}
    </TourFormContext.Provider>
  );
};

export const useTourForm = () => {
  const context = useContext(TourFormContext);
  if (context === undefined) {
    throw new Error('useTourForm must be used within a TourFormProvider');
  }
  return context;
};