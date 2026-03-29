import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, Activity, Clock, Zap, 
  Users, AlertTriangle, CheckCircle, RefreshCw 
} from 'lucide-react';

// Real-time analytics component with live updating data
const LiveAnalytics = ({ workers, simulation }) => {
  const [liveData, setLiveData] = useState({
    checkInsLast24h: [],
    alertsOverTime: [],
    responseTimeMetrics: [],
    systemHealth: 98.5
  });
  
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [animatingMetrics, setAnimatingMetrics] = useState(new Set());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        checkInsLast24h: generateCheckInData(),
        alertsOverTime: generateAlertData(), 
        responseTimeMetrics: generateResponseData(),
        systemHealth: 98.2 + Math.random() * 1.6 // 98.2-99.8%
      }));
      setLastUpdate(new Date());
      
      // Animate metrics briefly
      setAnimatingMetrics(new Set(['checkIns', 'alerts', 'responseTime']));
      setTimeout(() => setAnimatingMetrics(new Set()), 1000);
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  // Generate realistic check-in data
  const generateCheckInData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      checkIns: Math.floor(Math.random() * 200) + 150, // 150-350 per hour
      expected: 280
    }));
  };

  // Generate alert frequency data
  const generateAlertData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: new Date(Date.now() - (11 - i) * 2 * 60 * 60 * 1000).getHours() + ':00',
      emergencies: Math.floor(Math.random() * 3),
      overdue: Math.floor(Math.random() * 8) + 2,
      resolved: Math.floor(Math.random() * 10) + 5
    }));
  };

  // Generate response time metrics
  const generateResponseData = () => ({
    average: Math.floor(Math.random() * 30) + 120, // 120-150 seconds
    fastest: Math.floor(Math.random() * 20) + 45,   // 45-65 seconds
    slowest: Math.floor(Math.random() * 60) + 180,  // 180-240 seconds
    slaCompliance: 95.2 + Math.random() * 3.8       // 95.2-99%
  });

  // Real-time statistics
  const currentStats = useMemo(() => {
    const totalWorkers = workers.length;
    const safeWorkers = workers.filter(w => w.status === 'safe').length;
    const emergencies = workers.filter(w => w.status === 'emergency').length;
    const overdueChecks = workers.filter(w => w.status === 'check_overdue').length;
    
    return {
      totalWorkers,
      safeWorkers,
      emergencies: emergencies + (simulation.active && simulation.phase !== 'resolved' ? 1 : 0),
      overdueChecks,
      responseRate: Math.round((safeWorkers / totalWorkers) * 100),
      systemUptime: 99.7
    };
  }, [workers, simulation]);

  // Real-time metrics cards
  const LiveMetricCard = ({ title, value, trend, icon: Icon, color, suffix = '', animate = false }) => (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 transition-all duration-300 ${animate ? 'scale-105 shadow-md' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold transition-all duration-500 ${animate ? 'text-blue-600' : 'text-gray-900'}`}>
              {value}{suffix}
            </p>
            {trend && (
              <div className={`flex items-center text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`h-3 w-3 ${trend < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );

  // Mini bar chart component
  const MiniBarChart = ({ data, label, color = 'bg-blue-500' }) => (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-600">{label}</div>
      <div className="flex items-end gap-1 h-16">
        {data.slice(-10).map((item, index) => {
          const height = Math.max(4, (item.checkIns / 350) * 60);
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-3 ${color} rounded-t transition-all duration-300`}
                style={{ height: `${height}px` }}
              />
              <div className="text-xs text-gray-400 mt-1">{item.hour}h</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Live Analytics</h3>
            <p className="text-sm text-gray-600">Real-time system monitoring and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
          <span>•</span>
          <span>Updated {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Real-time metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <LiveMetricCard
          title="Active Workers"
          value={currentStats.totalWorkers.toLocaleString()}
          icon={Users}
          color="bg-blue-500"
          animate={animatingMetrics.has('workers')}
        />
        <LiveMetricCard
          title="Safe Status"
          value={currentStats.responseRate}
          suffix="%"
          trend={0.3}
          icon={CheckCircle}
          color="bg-green-500"
          animate={animatingMetrics.has('safe')}
        />
        <LiveMetricCard
          title="Active Alerts"
          value={currentStats.emergencies + currentStats.overdueChecks}
          icon={AlertTriangle}
          color="bg-orange-500"
          animate={animatingMetrics.has('alerts')}
        />
        <LiveMetricCard
          title="System Health"
          value={liveData.systemHealth.toFixed(1)}
          suffix="%"
          icon={Activity}
          color="bg-purple-500"
          animate={animatingMetrics.has('health')}
        />
        <LiveMetricCard
          title="Avg Response"
          value={liveData.responseTimeMetrics.average || 127}
          suffix="s"
          trend={-2.1}
          icon={Clock}
          color="bg-cyan-500"
          animate={animatingMetrics.has('responseTime')}
        />
        <LiveMetricCard
          title="Uptime"
          value={currentStats.systemUptime}
          suffix="%"
          icon={Zap}
          color="bg-emerald-500"
          animate={animatingMetrics.has('uptime')}
        />
      </div>

      {/* Live charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-ins chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Check-ins (24h)</h4>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <MiniBarChart data={liveData.checkInsLast24h} label="Hourly Check-ins" color="bg-blue-500" />
        </div>

        {/* Alert trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Alert Trends</h4>
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
          </div>
          <div className="space-y-3">
            {liveData.alertsOverTime.slice(-6).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.time}</span>
                <div className="flex items-center gap-2">
                  {item.emergencies > 0 && (
                    <span className="text-red-600 font-medium">{item.emergencies} emergency</span>
                  )}
                  <span className="text-orange-600">{item.overdue} overdue</span>
                  <span className="text-green-600">{item.resolved} resolved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Response Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Response:</span>
              <span className="font-medium">{liveData.responseTimeMetrics.average || 127}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fastest Response:</span>
              <span className="font-medium text-green-600">{liveData.responseTimeMetrics.fastest || 52}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">SLA Compliance:</span>
              <span className="font-medium text-blue-600">
                {(liveData.responseTimeMetrics.slaCompliance || 97.8).toFixed(1)}%
              </span>
            </div>
            
            {/* Progress bar for SLA compliance */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>SLA Target: 95%</span>
                <span>Current: {(liveData.responseTimeMetrics.slaCompliance || 97.8).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, liveData.responseTimeMetrics.slaCompliance || 97.8)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency simulation impact on analytics */}
      {simulation.active && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-900">Live Emergency Impact</h4>
              <p className="text-sm text-red-700">
                Analytics showing real-time response to {simulation.workerName}'s emergency alert
              </p>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-red-900">{simulation.timeline.length}</div>
              <div className="text-red-600">Protocol Steps</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-900">{simulation.alertsSent.length}</div>
              <div className="text-red-600">Alerts Sent</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-900">
                {Math.floor((new Date() - simulation.startTime) / 1000)}s
              </div>
              <div className="text-red-600">Response Time</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveAnalytics;