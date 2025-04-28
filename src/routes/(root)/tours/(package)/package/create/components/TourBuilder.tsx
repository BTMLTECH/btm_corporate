import React, { useState, useEffect } from 'react';
import { useTourForm } from '../context/TourFormContext';
import StepProgress from './StepProgress';
import PersonalInfoStep from './steps/PersonalInfoStep';
import DestinationStep from './steps/DestinationStep';
import AccommodationStep from './steps/AccommodationStep';
import ActivitiesStep from './steps/ActivitiesStep';
import PaymentStep from './steps/PaymentStep';
import Summary from './Summary';
import { validateCurrentStep } from '../utils/validation';
import { generateCsrfToken } from '../utils/formUtils';
import { Globe, MapPin, Plane, Compass, Hotel, Tag } from 'lucide-react';

const TourBuilder: React.FC = () => {
  const { formData, dispatch, nextStep, prevStep, goToStep } = useTourForm();
  const [csrfToken, setCsrfToken] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize CSRF token on component mount
  useEffect(() => {
    setCsrfToken(generateCsrfToken());
  }, []);

  const handleNext = () => {
    const errors = validateCurrentStep(formData, formData.currentStep);
    
    if (Object.keys(errors).length === 0) {
      if (formData.currentStep === 5) {
        handleSubmit();
      } else {
        nextStep();
      }
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    }
  };

  const handleGoToStep = (step: number) => {
    // Only allow navigation to steps that have been completed or the next step
    if (step <= formData.currentStep || step === formData.currentStep + 1) {
      goToStep(step);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // Generate confirmation number
      const confirmationNumber = 'TRB-' + Date.now().toString().substring(5);
      
      // Clear form data from localStorage after successful submission
      localStorage.removeItem('tourFormData');
      
      // Reset form state but keep the current user's info for potential future bookings
      dispatch({ type: 'RESET_FORM' });
      
      // Show success message
      alert(`Booking confirmed! Your confirmation number is ${confirmationNumber}. A confirmation email has been sent to your inbox.`);
    }, 2000);
  };

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Globe className="w-5 h-5" />;
      case 2: return <MapPin className="w-5 h-5" />;
      case 3: return <Hotel className="w-5 h-5" />;
      case 4: return <Compass className="w-5 h-5" />;
      case 5: return <Tag className="w-5 h-5" />;
      default: return <Plane className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Tour</span> Package Builder
          </h1>
          <p className="mt-3 text-gray-600">
            Create your perfect travel experience in 5 simple steps
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <StepProgress 
              currentStep={formData.currentStep}
              onStepClick={handleGoToStep}
              getStepIcon={getStepIcon}
            />
            
            <div className="mt-8">
              {formData.currentStep === 1 && <PersonalInfoStep />}
              {formData.currentStep === 2 && <DestinationStep />}
              {formData.currentStep === 3 && <AccommodationStep />}
              {formData.currentStep === 4 && <ActivitiesStep />}
              {formData.currentStep === 5 && <PaymentStep csrfToken={csrfToken} />}
              
              <input type="hidden" name="csrf_token" value={csrfToken} />
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {formData.currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={toggleSummary}
                  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                >
                  {showSummary ? 'Hide Summary' : 'Show Summary'}
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                    isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : formData.currentStep === 5 ? (
                    'Complete Booking'
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {showSummary && <Summary />}
        </div>
      </div>
    </div>
  );
};

export default TourBuilder;