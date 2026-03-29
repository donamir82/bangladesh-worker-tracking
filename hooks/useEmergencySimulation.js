import { useState, useCallback } from 'react';

// Emergency Alert Simulation Hook
export function useEmergencySimulation() {
  const [simulation, setSimulation] = useState({
    active: false,
    workerId: null,
    workerName: null,
    startTime: null,
    phase: 'idle', // idle, triggered, notifying, responding, resolved
    timeline: [],
    alertsSent: [],
    responseTime: 0
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
          icon: '🚨'
        }
      ],
      alertsSent: [],
      responseTime: 0
    });

    // Simulate emergency response timeline
    simulateEmergencyResponse();
  }, []);

  const simulateEmergencyResponse = useCallback(() => {
    const phases = [
      {
        delay: 1000,
        phase: 'notifying',
        event: 'Emergency Detected',
        description: 'System initiated emergency protocol',
        status: 'warning',
        icon: '⚡',
        alerts: ['Government Dashboard', 'Embassy System']
      },
      {
        delay: 2500,
        phase: 'notifying',
        event: 'Family Notified',
        description: 'SMS sent to emergency contacts',
        status: 'info',
        icon: '📱',
        alerts: ['Family SMS', 'WhatsApp Message']
      },
      {
        delay: 4000,
        phase: 'notifying',
        event: 'Embassy Contacted',
        description: 'Local embassy emergency desk alerted',
        status: 'info',
        icon: '🏢',
        alerts: ['Embassy Email', 'Emergency Hotline']
      },
      {
        delay: 6000,
        phase: 'responding',
        event: 'Response Team Activated',
        description: 'Welfare officer dispatched to location',
        status: 'success',
        icon: '🚑',
        alerts: ['Field Officer', 'Local Authorities']
      },
      {
        delay: 8000,
        phase: 'responding',
        event: 'Location Confirmed',
        description: 'GPS coordinates shared with response team',
        status: 'success',
        icon: '📍',
        alerts: ['GPS Tracker', 'Maps Integration']
      },
      {
        delay: 10000,
        phase: 'resolved',
        event: 'Contact Established',
        description: 'Worker safety confirmed, situation under control',
        status: 'success',
        icon: '✅',
        alerts: ['All Clear Signal']
      }
    ];

    phases.forEach((phaseData, index) => {
      setTimeout(() => {
        setSimulation(prev => ({
          ...prev,
          phase: phaseData.phase,
          timeline: [...prev.timeline, {
            time: new Date(prev.startTime.getTime() + phaseData.delay),
            event: phaseData.event,
            description: phaseData.description,
            status: phaseData.status,
            icon: phaseData.icon
          }],
          alertsSent: phaseData.alerts ? [...prev.alertsSent, ...phaseData.alerts] : prev.alertsSent,
          responseTime: Math.floor(phaseData.delay / 1000)
        }));
      }, phaseData.delay);
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
      responseTime: 0
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
    startEmergencySimulation,
    resetSimulation,
    getSimulationStats,
    isSimulationActive: simulation.active
  };
}

export default useEmergencySimulation;