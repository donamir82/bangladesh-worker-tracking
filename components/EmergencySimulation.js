import React from 'react';
import { 
  AlertTriangle, Shield, Clock, Users, CheckCircle, 
  X, Zap, Phone, Mail, MapPin, Radio 
} from 'lucide-react';

// Emergency Alert Banner
export function EmergencyBanner({ simulation, onReset }) {
  if (!simulation.active) return null;

  const phaseConfig = {
    triggered: { bg: 'bg-red-600', text: 'Emergency Alert Triggered', pulse: true },
    notifying: { bg: 'bg-orange-500', text: 'Notifying Authorities', pulse: true },
    responding: { bg: 'bg-blue-600', text: 'Response Team Active', pulse: false },
    resolved: { bg: 'bg-green-600', text: 'Situation Resolved', pulse: false }
  };

  const config = phaseConfig[simulation.phase] || phaseConfig.triggered;

  return (
    <div className={`${config.bg} text-white shadow-lg border-l-4 border-white sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex-shrink-0 ${config.pulse ? 'animate-pulse' : ''}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{config.text}</h3>
              <p className="text-sm opacity-90">
                Worker: {simulation.workerName} | Duration: {Math.floor((new Date() - simulation.startTime) / 1000)}s
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <div className="font-medium">Alerts Sent: {simulation.alertsSent.length}</div>
              <div className="opacity-80">Timeline: {simulation.timeline.length} events</div>
            </div>
            <button 
              onClick={onReset}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              title="Reset Simulation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Emergency Protocol Control Panel
export function EmergencyControls({ 
  simulation, 
  emergencySteps, 
  onAdvanceStep, 
  onMarkStepComplete, 
  onMarkStepInProgress, 
  onSkipStep, 
  onCloseIssue 
}) {
  if (!simulation.active) return null;

  const getStepStatus = (stepIndex) => {
    const timelineItem = simulation.timeline.find(t => t.stepIndex === stepIndex);
    if (timelineItem) {
      return timelineItem.stepStatus;
    }
    if (stepIndex <= simulation.currentStep) return 'complete';
    if (stepIndex === simulation.currentStep + 1) return 'next';
    return 'pending';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'complete') return '✅';
    if (status === 'in-progress') return '🔄';
    if (status === 'skipped') return '⏭️';
    if (status === 'next') return '▶️';
    return '⏳';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        Emergency Protocol Control
      </h4>

      {/* Protocol Steps with Individual Controls */}
      <div className="space-y-3 mb-6">
        {emergencySteps.map((step, index) => {
          const status = getStepStatus(index);
          const icon = getStepIcon(index, status);
          
          return (
            <div key={step.id} className={`flex items-center justify-between p-3 rounded-lg border ${
              status === 'complete' ? 'bg-green-50 border-green-200' :
              status === 'in-progress' ? 'bg-yellow-50 border-yellow-200' :
              status === 'next' ? 'bg-blue-50 border-blue-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-lg">{step.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {index + 1}. {step.event}
                  </div>
                  <div className="text-xs text-gray-600">{step.description}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  status === 'complete' ? 'bg-green-100 text-green-700' :
                  status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                  status === 'next' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {status.replace('-', ' ').toUpperCase()}
                </span>
                
                {/* Individual Step Controls - Allow any step to be updated */}
                {simulation.phase !== 'closed' && status !== 'complete' && (
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => onMarkStepComplete(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                      title="Mark Complete"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => onMarkStepInProgress(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                      title="Mark In Progress"
                    >
                      🔄
                    </button>
                  </div>
                )}
                
                {/* Show quick reset button for completed steps */}
                {status === 'complete' && (
                  <button
                    onClick={() => onMarkStepInProgress(index)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                    title="Reset to In Progress"
                  >
                    ↻
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Controls */}
      {simulation.phase !== 'closed' && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700 mb-2">Global Actions:</div>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="relative">
              <select 
                onChange={(e) => e.target.value && onCloseIssue(e.target.value)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="">❌ Close Emergency Issue</option>
                <option value="False Alarm">False Alarm - Accidental SOS</option>
                <option value="Resolved Safely">Resolved Safely - Worker Contacted</option>
                <option value="Worker Called Back">Worker Called Back - All Clear</option>
                <option value="No Response Needed">No Response Needed</option>
              </select>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded border border-blue-200">
              💡 <strong>Independent Step Control:</strong> Click ✅ or 🔄 on any step above to update its status. 
              Steps can be completed in any order to handle real emergency situations.
            </div>
          </div>
        </div>
      )}

      {/* Issue Status */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {simulation.phase === 'closed' 
              ? `Closed: ${simulation.closureReason}`
              : `Active • Step ${simulation.currentStep + 1} of ${emergencySteps.length}`
            }
          </span>
          <span className="text-gray-600">
            Duration: {Math.floor((new Date() - simulation.startTime) / 1000)}s
          </span>
        </div>
        {simulation.contactAttempts > 0 && (
          <div className="text-xs text-blue-600 mt-1">
            Contact attempts: {simulation.contactAttempts}
          </div>
        )}
      </div>
    </div>
  );
}

// Emergency Timeline Component
export function EmergencyTimeline({ simulation }) {
  if (!simulation.active || simulation.timeline.length === 0) return null;

  const getStatusStyle = (status) => {
    const styles = {
      critical: 'bg-red-100 text-red-700 border-red-200',
      warning: 'bg-orange-100 text-orange-700 border-orange-200',
      info: 'bg-blue-100 text-blue-700 border-blue-200',
      success: 'bg-green-100 text-green-700 border-green-200'
    };
    return styles[status] || styles.info;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          Emergency Response Timeline
        </h3>
        <div className="text-sm text-gray-500">
          Live Updates • {simulation.timeline.length} events
        </div>
      </div>

      <div className="space-y-4">
        {simulation.timeline.map((event, index) => (
          <div key={index} className={`border rounded-lg p-4 ${getStatusStyle(event.status)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0 mt-0.5">
                  {event.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm">{event.event}</h4>
                  <p className="text-sm mt-1 opacity-90">{event.description}</p>
                </div>
              </div>
              <div className="text-xs font-medium opacity-75">
                {event.time.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {simulation.phase === 'resolved' && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Emergency Resolved - Response Time: {simulation.responseTime}s
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Removed duplicate function - see EmergencyStartControls below

// Emergency Statistics Component
export function EmergencyStats({ simulation }) {
  if (!simulation.active) return null;

  const stats = [
    {
      label: 'Response Time',
      value: `${Math.floor((new Date() - simulation.startTime) / 1000)}s`,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      label: 'Alerts Sent',
      value: simulation.alertsSent.length,
      icon: Mail,
      color: 'text-orange-600'
    },
    {
      label: 'Timeline Events',
      value: simulation.timeline.length,
      icon: Radio,
      color: 'text-purple-600'
    },
    {
      label: 'Current Phase',
      value: simulation.phase.charAt(0).toUpperCase() + simulation.phase.slice(1),
      icon: Shield,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 bg-gray-50 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Old Emergency Controls (for starting simulation)
export function EmergencyStartControls({ workers, onSimulate, isActive, onReset }) {
  const [selectedWorker, setSelectedWorker] = React.useState('');
  const [showWorkerSelect, setShowWorkerSelect] = React.useState(false);

  // Get some workers that could be used for emergency simulation
  const simulationWorkers = workers?.slice(0, 10) || [];

  const handleSimulate = () => {
    if (selectedWorker) {
      const worker = workers.find(w => w.id === selectedWorker);
      if (worker) {
        onSimulate(worker);
        setShowWorkerSelect(false);
        setSelectedWorker('');
      }
    } else {
      setShowWorkerSelect(true);
    }
  };

  if (isActive) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-red-600">
          <Radio className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">Emergency Simulation Active</span>
        </div>
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reset Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {showWorkerSelect ? (
        <div className="flex items-center space-x-3">
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
          >
            <option value="">Select Worker for Emergency Simulation</option>
            {simulationWorkers.map(worker => (
              <option key={worker.id} value={worker.id}>
                {worker.name} - {worker.destination}
              </option>
            ))}
          </select>
          <button
            onClick={handleSimulate}
            disabled={!selectedWorker}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Simulate Emergency
          </button>
          <button
            onClick={() => setShowWorkerSelect(false)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleSimulate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Simulate Emergency Alert</span>
        </button>
      )}
    </div>
  );
}

export default {
  EmergencyBanner,
  EmergencyTimeline,
  EmergencyControls,
  EmergencyStartControls,
  EmergencyStats
};