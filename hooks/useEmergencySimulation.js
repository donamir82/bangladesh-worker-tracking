import { useState, useCallback } from 'react';

// Emergency Alert Simulation Hook
export function useEmergencySimulation() {
  const [simulation, setSimulation] = useState({
    active: false,
    workerId: null,
    workerName: null,
    startTime: null,
    phase: 'idle', // idle, triggered, contact, notifying, responding, resolved, closed
    timeline: [],
    alertsSent: [],
    responseTime: 0,
    currentStep: 0,
    mode: 'auto', // auto, manual
    closureReason: null,
    contactAttempts: 0
  });

  const startEmergencySimulation = useCallback((worker) => {
    const startTime = new Date();
    
    setSimulation({
      active: true,
      workerId: worker.id,
      workerName: worker.name,
      startTime,
      phase: 'triggered',
      timeline: [
        {
          time: startTime,
          event: 'SOS Button Pressed',
          description: `${worker.name} activated emergency alert`,
          status: 'critical',
          icon: '🚨',
          stepIndex: 0,
          stepStatus: 'complete'
        }
      ],
      alertsSent: [],
      responseTime: 0,
      currentStep: 0,
      mode: 'manual', // Start in manual mode for demo control
      closureReason: null,
      contactAttempts: 0
    });
  }, []);

  // Define emergency protocol steps
  const emergencySteps = [
    {
      id: 0,
      event: 'SOS Button Pressed',
      description: 'Emergency alert activated by worker',
      icon: '🚨',
      phase: 'triggered',
      alerts: ['System Alert']
    },
    {
      id: 1,
      event: 'Try to Establish Contact',
      description: 'Attempting direct communication with worker',
      icon: '📞',
      phase: 'contact',
      alerts: ['Voice Call', 'SMS Message']
    },
    {
      id: 2,
      event: 'Family Notified',
      description: 'Emergency contacts informed of situation',
      icon: '👨‍👩‍👧‍👦',
      phase: 'notifying',
      alerts: ['Family SMS', 'WhatsApp Message']
    },
    {
      id: 3,
      event: 'Embassy Contacted',
      description: 'Local embassy emergency desk alerted',
      icon: '🏢',
      phase: 'notifying',
      alerts: ['Embassy Email', 'Emergency Hotline']
    },
    {
      id: 4,
      event: 'Response Team Activated',
      description: 'Welfare officer dispatched to location',
      icon: '🚑',
      phase: 'responding',
      alerts: ['Field Officer', 'Local Authorities']
    },
    {
      id: 5,
      event: 'Location Confirmed',
      description: 'GPS coordinates shared with response team',
      icon: '📍',
      phase: 'responding',
      alerts: ['GPS Tracker', 'Maps Integration']
    },
    {
      id: 6,
      event: 'Safety Verified',
      description: 'Worker contact established and safety confirmed',
      icon: '✅',
      phase: 'resolved',
      alerts: ['All Clear Signal']
    }
  ];

  // Manual step control functions
  const advanceStep = useCallback(() => {
    setSimulation(prev => {
      if (prev.currentStep >= emergencySteps.length - 1) return prev;
      
      const nextStep = emergencySteps[prev.currentStep + 1];
      const now = new Date();
      
      return {
        ...prev,
        currentStep: prev.currentStep + 1,
        phase: nextStep.phase,
        timeline: [...prev.timeline, {
          time: now,
          event: nextStep.event,
          description: nextStep.description,
          status: prev.currentStep + 1 === emergencySteps.length - 1 ? 'success' : 'info',
          icon: nextStep.icon,
          stepIndex: nextStep.id,
          stepStatus: 'complete'
        }],
        alertsSent: [...prev.alertsSent, ...nextStep.alerts],
        responseTime: Math.floor((now - prev.startTime) / 1000),
        contactAttempts: nextStep.id === 1 ? prev.contactAttempts + 1 : prev.contactAttempts
      };
    });
  }, []);

  const markStepComplete = useCallback((stepIndex) => {
    setSimulation(prev => {
      if (stepIndex > prev.currentStep + 1) return prev; // Can't skip ahead
      
      const step = emergencySteps[stepIndex];
      const now = new Date();
      
      return {
        ...prev,
        currentStep: Math.max(prev.currentStep, stepIndex),
        phase: step.phase,
        timeline: prev.timeline.some(t => t.stepIndex === stepIndex) 
          ? prev.timeline.map(t => 
              t.stepIndex === stepIndex 
                ? {...t, stepStatus: 'complete', time: now}
                : t
            )
          : [...prev.timeline, {
              time: now,
              event: step.event,
              description: step.description,
              status: stepIndex === emergencySteps.length - 1 ? 'success' : 'info',
              icon: step.icon,
              stepIndex: stepIndex,
              stepStatus: 'complete'
            }],
        alertsSent: prev.alertsSent.includes(step.alerts[0]) 
          ? prev.alertsSent 
          : [...prev.alertsSent, ...step.alerts],
        responseTime: Math.floor((now - prev.startTime) / 1000)
      };
    });
  }, []);

  const markStepInProgress = useCallback((stepIndex) => {
    setSimulation(prev => {
      const step = emergencySteps[stepIndex];
      const now = new Date();
      
      return {
        ...prev,
        currentStep: Math.max(prev.currentStep, stepIndex - 1),
        phase: step.phase,
        timeline: prev.timeline.some(t => t.stepIndex === stepIndex)
          ? prev.timeline.map(t => 
              t.stepIndex === stepIndex 
                ? {...t, stepStatus: 'in-progress', time: now}
                : t
            )
          : [...prev.timeline, {
              time: now,
              event: step.event,
              description: step.description + ' (In Progress)',
              status: 'warning',
              icon: step.icon,
              stepIndex: stepIndex,
              stepStatus: 'in-progress'
            }]
      };
    });
  }, []);

  const skipStep = useCallback((stepIndex) => {
    setSimulation(prev => {
      const step = emergencySteps[stepIndex];
      const now = new Date();
      
      return {
        ...prev,
        currentStep: Math.max(prev.currentStep, stepIndex),
        timeline: [...prev.timeline, {
          time: now,
          event: step.event + ' (Skipped)',
          description: 'Step skipped for demonstration purposes',
          status: 'info',
          icon: '⏭️',
          stepIndex: stepIndex,
          stepStatus: 'skipped'
        }]
      };
    });
  }, []);

  const closeIssue = useCallback((reason) => {
    setSimulation(prev => {
      const now = new Date();
      
      return {
        ...prev,
        phase: 'closed',
        closureReason: reason,
        timeline: [...prev.timeline, {
          time: now,
          event: 'Issue Closed',
          description: `Emergency closed: ${reason}`,
          status: reason === 'False Alarm' ? 'info' : 'success',
          icon: reason === 'False Alarm' ? '❌' : '✅',
          stepIndex: -1,
          stepStatus: 'closed'
        }],
        responseTime: Math.floor((now - prev.startTime) / 1000)
      };
    });
  }, []);

  const resetSimulation = useCallback(() => {
    setSimulation({
      active: false,
      workerId: null,
      workerName: null,
      startTime: null,
      phase: 'idle',
      timeline: [],
      alertsSent: [],
      responseTime: 0,
      currentStep: 0,
      mode: 'auto',
      closureReason: null,
      contactAttempts: 0
    });
  }, []);

  const getSimulationStats = useCallback(() => {
    if (!simulation.active) return null;
    
    return {
      duration: simulation.startTime ? Math.floor((new Date() - simulation.startTime) / 1000) : 0,
      alertsSent: simulation.alertsSent.length,
      timelineEvents: simulation.timeline.length,
      currentPhase: simulation.phase,
      isResolved: simulation.phase === 'resolved'
    };
  }, [simulation]);

  return {
    simulation,
    emergencySteps,
    startEmergencySimulation,
    advanceStep,
    markStepComplete,
    markStepInProgress,
    skipStep,
    closeIssue,
    resetSimulation,
    getSimulationStats,
    isSimulationActive: simulation.active
  };
}

export default useEmergencySimulation;