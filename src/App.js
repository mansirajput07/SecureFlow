// App.js
import React, { useState } from 'react';
import { 
  Shield, Search, FileText, BarChart3, AlertTriangle, CheckCircle, Users, Lock, 
  Eye, EyeOff, Mail, LogOut, Settings, Bell, X, Download, ArrowRight, ArrowLeft, 
  Terminal, TrendingUp, Package, Zap, Bug 
} from 'lucide-react';

export default function SecureFlow() {
  const [page, setPage] = useState('landing');
  const [tab, setTab] = useState('dashboard');
  const [showPass, setShowPass] = useState(false);
  const [notif, setNotif] = useState({ show: false, msg: '' });
  const [settings, setSettings] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [profile, setProfile] = useState({ 
    name: 'John Doe', 
    email: 'john@secureflow.com', 
    role: 'Security Analyst', 
    avatar: 'JD' 
  });

  // SQUARE Tool State — UPDATED FOR 9 STEPS
  const [squareStep, setSquareStep] = useState(0);
  const [squareData, setSquareData] = useState({
    projectName: '',
    projectDescription: '', // now = Security Goals
    definitions: '',        // NEW
    systemScope: '',        // NEW
    stakeholders: [],
    requirements: [],
    threats: [],
    risks: [],
    // Form states
    newStakeholder: { name: '', role: '', concern: '' },
    newRequirement: { title: '', category: 'confidentiality', description: '' },
    newThreat: { name: '', type: 'spoofing', target: '', description: '', requirementId: null },
    selectedThreat: '',
    likelihood: 3,
    impact: 3
  });

  // Scanner State
  const [code, setCode] = useState('');
  const [scan, setScan] = useState(null);

  const notify = (msg) => {
    setNotif({ show: true, msg });
    setTimeout(() => setNotif({ show: false, msg: '' }), 3000);
  };

  // Vulnerability patterns for scanner
  const vulnPatterns = [
    { pattern: /eval\s*\(/gi, name: 'Code Injection', severity: 'Critical', fix: 'Use JSON.parse()', cwe: 'CWE-94' },
    { pattern: /innerHTML\s*=/gi, name: 'XSS Vulnerability', severity: 'High', fix: 'Use textContent or DOMPurify', cwe: 'CWE-79' },
    { pattern: /SELECT.*FROM.*WHERE.*=.*\+/gi, name: 'SQL Injection', severity: 'Critical', fix: 'Use parameterized queries', cwe: 'CWE-89' },
    { pattern: /password\s*=\s*['"]/gi, name: 'Hardcoded Credentials', severity: 'Critical', fix: 'Use environment variables', cwe: 'CWE-798' }
  ];

  const scanCode = () => {
    if (!code.trim()) return notify('Enter code to scan');
    const findings = vulnPatterns.filter(p => p.pattern.test(code)).map(p => ({
      ...p,
      lines: code.split('\n').map((line, i) => p.pattern.test(line) ? i + 1 : null).filter(Boolean)
    }));
    setScan({ 
      total: findings.length, 
      critical: findings.filter(f => f.severity === 'Critical').length, 
      high: findings.filter(f => f.severity === 'High').length, 
      findings 
    });
    notify(`Found ${findings.length} issues`);
  };

  // SQUARE Steps — 9 Professional Steps
  const squareSteps = [
    { name: 'Agree on Definitions', icon: Shield },
    { name: 'Identify Security Goals', icon: TrendingUp },
    { name: 'Identify Stakeholders', icon: Users },
    { name: 'Define System Scope', icon: FileText },
    { name: 'Elicit Requirements', icon: Lock },
    { name: 'Model Threats', icon: AlertTriangle },
    { name: 'Categorize Requirements', icon: Package },
    { name: 'Assess & Prioritize Risks', icon: BarChart3 },
    { name: 'Review & Export', icon: CheckCircle }
  ];

  // Testing Tab State
  const [testResults, setTestResults] = useState({});
  const [expandedTest, setExpandedTest] = useState(null);

  // Landing Page
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-blue-400" />
            <span className="text-2xl font-bold">SecureFlow</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setPage('login')} className="px-6 py-2 border border-blue-400 rounded-lg hover:bg-blue-400/10">Sign In</button>
            <button onClick={() => setPage('login')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Get Started</button>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6">
            Secure Your Software
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Throughout SDLC</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Complete security platform with AI scanning, SQUARE requirements, and comprehensive testing</p>
          <button onClick={() => setPage('login')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-lg font-semibold">Start Free Trial</button>
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: Search, title: 'AI Scanner', desc: 'Real-time vulnerability detection' },
              { icon: FileText, title: 'SQUARE Model', desc: 'Security requirements engineering' },
              { icon: BarChart3, title: 'Testing Portal', desc: 'Comprehensive security testing' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500 transition">
                <item.icon className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Login Page
  if (page === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Welcome Back</h2>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={login.email} 
                    onChange={(e) => setLogin({...login, email: e.target.value})} 
                    onKeyPress={(e) => e.key === 'Enter' && setPage('dashboard')} 
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    value={login.password} 
                    onChange={(e) => setLogin({...login, password: e.target.value})} 
                    onKeyPress={(e) => e.key === 'Enter' && setPage('dashboard')} 
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-12 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="••••••••" 
                  />
                  <button 
                    onClick={() => setShowPass(!showPass)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button 
                onClick={() => { 
                  setPage('dashboard'); 
                  notify('Welcome!'); 
                }} 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
          <button 
            onClick={() => setPage('landing')} 
            className="mt-4 text-gray-400 hover:text-white mx-auto flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Notification */}
      {notif.show && (
        <div className="fixed top-4 right-4 bg-green-600 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {notif.msg}
        </div>
      )}
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">SecureFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 cursor-pointer" />
            <Settings className="w-5 h-5 cursor-pointer" onClick={() => setSettings(true)} />
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              {profile.avatar}
            </div>
            <LogOut 
              className="w-5 h-5 cursor-pointer" 
              onClick={() => { 
                setPage('landing'); 
                notify('Logged out'); 
              }} 
            />
          </div>
        </div>
      </nav>
      {/* Tab Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-6 flex gap-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'scanner', label: 'Scanner', icon: Search },
            { id: 'square', label: 'SQUARE', icon: FileText },
            { id: 'testing', label: 'Testing', icon: Terminal }
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setTab(item.id)} 
              className={`flex items-center gap-2 py-4 border-b-2 transition ${tab === item.id ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Security Dashboard</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Vulnerabilities', value: scan?.total || '0', icon: AlertTriangle, color: 'yellow' },
                { label: 'Critical', value: scan?.critical || '0', icon: AlertTriangle, color: 'red' },
                { label: 'Projects', value: '1', icon: Package, color: 'blue' },
                { label: 'Requirements', value: squareData.requirements.length, icon: CheckCircle, color: 'green' }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[
                  'Code scan completed - 5 issues found',
                  'New critical vulnerability detected',
                  'Security requirement updated'
                ].map((msg, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="flex-1">{msg}</span>
                    <span className="text-sm text-gray-400">{i + 1}h ago</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Vulnerability Distribution</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Critical', value: scan?.critical || 0, color: 'red', total: scan?.total || 1 },
                    { label: 'High', value: scan?.high || 0, color: 'orange', total: scan?.total || 1 },
                    { label: 'Medium', value: Math.max(0, (scan?.total || 0) - (scan?.critical || 0) - (scan?.high || 0)), color: 'yellow', total: scan?.total || 1 },
                    { label: 'Low', value: 0, color: 'green', total: scan?.total || 1 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`bg-${item.color}-500 h-2 rounded-full`} 
                          style={{ width: `${(item.value / item.total) * 100}%` }} 
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span>Total Scans</span>
                    <span className="font-bold text-blue-400">{scan ? '1' : '0'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span>Fixed Issues</span>
                    <span className="font-bold text-green-400">0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span>Active Threats</span>
                    <span className="font-bold text-orange-400">{squareData.threats.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scanner Tab */}
        {tab === 'scanner' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">AI Code Scanner</h2>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <textarea 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Paste your code here for security analysis..." 
                className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button 
                onClick={scanCode} 
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Scan Code
              </button>
            </div>
            {scan && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Scan Results</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-red-400">{scan.critical}</div>
                    <div className="text-gray-400 mt-1">Critical Issues</div>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-900/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-orange-400">{scan.high}</div>
                    <div className="text-gray-400 mt-1">High Severity</div>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400">{scan.total}</div>
                    <div className="text-gray-400 mt-1">Total Issues</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Detected Vulnerabilities</h4>
                  {scan.findings.length > 0 ? (
                    scan.findings.map((f, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-900/50 border border-slate-700 rounded-lg p-5"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{f.name}</div>
                            <div className="text-sm text-gray-400 mt-1">{f.cwe}</div>
                          </div>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${f.severity === 'Critical' ? 'bg-red-900/50 text-red-400' : 'bg-orange-900/50 text-orange-400'}`}>
                            {f.severity}
                          </span>
                        </div>
                        <p className="text-cyan-400 text-sm mb-2">
                          <span className="font-medium">Fix:</span> {f.fix}
                        </p>
                        <p className="text-xs text-gray-500">Found on lines: {f.lines.join(', ')}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No vulnerabilities detected in your code
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SQUARE Tab — FULLY UPDATED TO 9 STEPS */}
        {tab === 'square' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">SQUARE Requirements Engineering</h2>
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {squareSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <div 
                    onClick={() => setSquareStep(i)} 
                    className={`flex items-center gap-2 cursor-pointer transition ${squareStep === i ? 'text-blue-400' : squareStep > i ? 'text-green-400' : 'text-gray-500'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition ${squareStep === i ? 'bg-blue-600' : squareStep > i ? 'bg-green-600' : 'bg-slate-700'}`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium hidden lg:block">{step.name}</span>
                  </div>
                  {i < squareSteps.length - 1 && (
                    <div className={`flex-1 h-1 mx-3 transition ${squareStep > i ? 'bg-green-600' : 'bg-slate-700'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 min-h-96">
              {/* Step 0: Agree on Definitions */}
              {squareStep === 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Agree on Definitions</h3>
                  <textarea
                    value={squareData.definitions}
                    onChange={(e) => setSquareData({...squareData, definitions: e.target.value})}
                    placeholder="Define key terms: e.g., 'Confidentiality means only authorized users can access data.'"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                    rows="5"
                  />
                  <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 text-sm">
                    <p>Example definitions: <br/>
                      • <b>Threat</b>: A potential cause of an unwanted impact.<br/>
                      • <b>Vulnerability</b>: A weakness that can be exploited.<br/>
                      • <b>Risk</b>: Likelihood × Impact of a threat exploiting a vulnerability.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1: Identify Security Goals */}
              {squareStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Identify Security Goals</h3>
                  <textarea
                    value={squareData.projectDescription}
                    onChange={(e) => setSquareData({...squareData, projectDescription: e.target.value})}
                    placeholder="What are your top security objectives? (e.g., Prevent data breaches, Ensure auditability)"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                    rows="5"
                  />
                </div>
              )}

              {/* Step 2: Identify Stakeholders */}
              {squareStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Identify Stakeholders</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Stakeholder Name"
                      className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newStakeholder?.name || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newStakeholder: {
                          ...squareData.newStakeholder,
                          name: e.target.value
                        }
                      })}
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g., Product Owner)"
                      className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newStakeholder?.role || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newStakeholder: {
                          ...squareData.newStakeholder,
                          role: e.target.value
                        }
                      })}
                    />
                    <input
                      type="text"
                      placeholder="Primary Security Concern"
                      className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newStakeholder?.concern || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newStakeholder: {
                          ...squareData.newStakeholder,
                          concern: e.target.value
                        }
                      })}
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (squareData.newStakeholder?.name && squareData.newStakeholder?.role) {
                        setSquareData({
                          ...squareData,
                          stakeholders: [
                            ...squareData.stakeholders, 
                            {...squareData.newStakeholder, id: Date.now()}
                          ],
                          newStakeholder: { name: '', role: '', concern: '' }
                        });
                        notify('Stakeholder added');
                      } else {
                        notify('Please fill all fields');
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Stakeholder
                  </button>
                  <div className="space-y-3">
                    {squareData.stakeholders.map((sh) => (
                      <div 
                        key={sh.id} 
                        className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{sh.name}</p>
                          <p className="text-sm text-gray-400">{sh.role} • {sh.concern}</p>
                        </div>
                        <button
                          onClick={() => setSquareData({
                            ...squareData,
                            stakeholders: squareData.stakeholders.filter(s => s.id !== sh.id)
                          })}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Define System Scope */}
              {squareStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Define System Scope</h3>
                  <textarea
                    value={squareData.systemScope}
                    onChange={(e) => setSquareData({...squareData, systemScope: e.target.value})}
                    placeholder="Describe system boundaries, components, data flows, and external interfaces..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                    rows="5"
                  />
                  <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4 text-sm">
                    <p>Include: APIs, databases, user roles, third-party integrations, and trust boundaries.</p>
                  </div>
                </div>
              )}

              {/* Step 4: Elicit Requirements */}
              {squareStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Elicit Requirements</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Requirement Title"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newRequirement?.title || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newRequirement: {
                          ...squareData.newRequirement,
                          title: e.target.value
                        }
                      })}
                    />
                    <select
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newRequirement?.category || 'confidentiality'}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newRequirement: {
                          ...squareData.newRequirement,
                          category: e.target.value
                        }
                      })}
                    >
                      {['confidentiality', 'integrity', 'availability', 'authentication', 'authorization'].map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Describe the security requirement..."
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      rows="3"
                      value={squareData.newRequirement?.description || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newRequirement: {
                          ...squareData.newRequirement,
                          description: e.target.value
                        }
                      })}
                    />
                    <button
                      onClick={() => {
                        if (squareData.newRequirement?.title && squareData.newRequirement?.description) {
                          setSquareData({
                            ...squareData,
                            requirements: [
                              ...squareData.requirements, 
                              {...squareData.newRequirement, id: Date.now()}
                            ],
                            newRequirement: { title: '', category: 'confidentiality', description: '' }
                          });
                          notify('Requirement added');
                        } else {
                          notify('Please fill all fields');
                        }
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add Requirement
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {squareData.requirements.map((req) => (
                      <div 
                        key={req.id} 
                        className="p-4 border border-slate-700 rounded-lg hover:shadow-lg transition"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Lock className="w-4 h-4 text-blue-400" />
                              <h4 className="font-semibold">{req.title}</h4>
                              <span className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full">
                                {req.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">{req.description}</p>
                          </div>
                          <button
                            onClick={() => setSquareData({
                              ...squareData,
                              requirements: squareData.requirements.filter(r => r.id !== req.id)
                            })}
                            className="text-red-400 hover:text-red-300 ml-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Model Threats */}
              {squareStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2">STRIDE Threat Model</h4>
                    <p className="text-gray-300">
                      Identify potential threats using the STRIDE framework: Spoofing, Tampering, Repudiation, 
                      Information Disclosure, Denial of Service, and Elevation of Privilege.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Threat Name"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newThreat?.name || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newThreat: {
                          ...squareData.newThreat,
                          name: e.target.value
                        }
                      })}
                    />
                    <select
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newThreat?.type || 'spoofing'}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newThreat: {
                          ...squareData.newThreat,
                          type: e.target.value
                        }
                      })}
                    >
                      {['spoofing', 'tampering', 'repudiation', 'information disclosure', 'denial of service', 'elevation of privilege'].map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Target Component"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newThreat?.target || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newThreat: {
                          ...squareData.newThreat,
                          target: e.target.value
                        }
                      })}
                    />
                    <select
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.newThreat?.requirementId || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newThreat: {
                          ...squareData.newThreat,
                          requirementId: e.target.value || null
                        }
                      })}
                    >
                      <option value="">Link to a security requirement (optional)</option>
                      {squareData.requirements.map(req => (
                        <option key={req.id} value={req.id}>{req.title}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Describe the threat scenario..."
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      rows="3"
                      value={squareData.newThreat?.description || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        newThreat: {
                          ...squareData.newThreat,
                          description: e.target.value
                        }
                      })}
                    />
                    <button
                      onClick={() => {
                        if (squareData.newThreat?.name && squareData.newThreat?.description) {
                          setSquareData({
                            ...squareData,
                            threats: [
                              ...squareData.threats, 
                              {...squareData.newThreat, id: Date.now()}
                            ],
                            newThreat: { name: '', type: 'spoofing', target: '', description: '', requirementId: null }
                          });
                          notify('Threat added');
                        } else {
                          notify('Please fill all fields');
                        }
                      }}
                      className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Add Threat
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {squareData.threats.map((threat) => (
                      <div 
                        key={threat.id} 
                        className="p-4 border-l-4 border-orange-500 bg-orange-900/10 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-orange-400" />
                              <h4 className="font-semibold">{threat.name}</h4>
                              <span className="px-2 py-1 text-xs bg-orange-900/30 text-orange-300 rounded-full">
                                {threat.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">Target: {threat.target}</p>
                            {threat.requirementId && (
                              <p className="text-sm text-cyan-400 mb-1">
                                Linked to: {squareData.requirements.find(r => r.id === threat.requirementId)?.title}
                              </p>
                            )}
                            <p className="text-sm text-gray-400">{threat.description}</p>
                          </div>
                          <button
                            onClick={() => setSquareData({
                              ...squareData,
                              threats: squareData.threats.filter(t => t.id !== threat.id)
                            })}
                            className="text-red-400 hover:text-red-300 ml-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Categorize Requirements */}
              {squareStep === 6 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Categorize Requirements</h3>
                  <p className="text-gray-400">Review and confirm categories for each requirement:</p>
                  <div className="space-y-4">
                    {squareData.requirements.map(req => (
                      <div key={req.id} className="p-4 bg-slate-900/50 rounded-lg">
                        <div className="font-medium">{req.title}</div>
                        <div className="text-sm text-gray-400 mb-2">{req.description}</div>
                        <select
                          value={req.category}
                          onChange={(e) => {
                            const updated = squareData.requirements.map(r =>
                              r.id === req.id ? {...r, category: e.target.value} : r
                            );
                            setSquareData({...squareData, requirements: updated});
                          }}
                          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
                        >
                          {['confidentiality', 'integrity', 'availability', 'authentication', 'authorization'].map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                    {squareData.requirements.length === 0 && (
                      <p className="text-gray-500">No requirements yet. Go to Step 4 to add some.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 7: Assess & Prioritize Risks */}
              {squareStep === 7 && (
                <div className="space-y-6">
                  <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2">Risk Assessment</h4>
                    <p className="text-gray-300">
                      Evaluate each threat by its likelihood (1-5) and potential impact (1-5). 
                      Risk Score = Likelihood × Impact
                    </p>
                  </div>
                  <div className="space-y-4">
                    <select
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
                      value={squareData.selectedThreat || ''}
                      onChange={(e) => setSquareData({
                        ...squareData,
                        selectedThreat: e.target.value
                      })}
                    >
                      <option value="">Select a threat to assess</option>
                      {squareData.threats.map(threat => (
                        <option key={threat.id} value={threat.id}>
                          {threat.name}
                        </option>
                      ))}
                    </select>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Likelihood (1-5): {squareData.likelihood || 3}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={squareData.likelihood || 3}
                          onChange={(e) => setSquareData({
                            ...squareData,
                            likelihood: parseInt(e.target.value)
                          })}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Rare</span>
                          <span>Certain</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Impact (1-5): {squareData.impact || 3}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={squareData.impact || 3}
                          onChange={(e) => setSquareData({
                            ...squareData,
                            impact: parseInt(e.target.value)
                          })}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Minor</span>
                          <span>Catastrophic</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const threatId = squareData.selectedThreat;
                        if (!threatId) {
                          notify('Please select a threat');
                          return;
                        }
                        const likelihood = squareData.likelihood || 3;
                        const impact = squareData.impact || 3;
                        const riskScore = likelihood * impact;
                        const severity = riskScore <= 6 ? 'Low' : riskScore <= 12 ? 'Medium' : riskScore <= 20 ? 'High' : 'Critical';
                        setSquareData({
                          ...squareData,
                          risks: [
                            ...squareData.risks,
                            {
                              id: Date.now(),
                              threatId: parseInt(threatId),
                              threatName: squareData.threats.find(t => t.id === parseInt(threatId))?.name,
                              likelihood,
                              impact,
                              riskScore,
                              severity
                            }
                          ],
                          selectedThreat: '',
                          likelihood: 3,
                          impact: 3
                        });
                        notify('Risk assessment added');
                      }}
                      disabled={!squareData.selectedThreat}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      Add Risk Assessment
                    </button>
                  </div>
                  <div className="space-y-3">
                    {squareData.risks.map((risk) => (
                      <div 
                        key={risk.id} 
                        className={`p-4 border-2 rounded-lg ${
                          risk.severity === 'Critical' ? 'border-red-500 bg-red-900/10' :
                          risk.severity === 'High' ? 'border-orange-500 bg-orange-900/10' :
                          risk.severity === 'Medium' ? 'border-yellow-500 bg-yellow-900/10' :
                          'border-green-500 bg-green-900/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{risk.threatName}</h4>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span>Likelihood: {risk.likelihood}/5</span>
                              <span>Impact: {risk.impact}/5</span>
                              <span className="font-semibold">Risk Score: {risk.riskScore}</span>
                              <span className={`font-bold ${
                                risk.severity === 'Critical' ? 'text-red-400' :
                                risk.severity === 'High' ? 'text-orange-400' :
                                risk.severity === 'Medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }`}>
                                {risk.severity}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSquareData({
                              ...squareData,
                              risks: squareData.risks.filter(r => r.id !== risk.id)
                            })}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Review & Export */}
              {squareStep === 8 && (
                <div className="space-y-6">
                  <div className="bg-green-900/20 border border-green-900/50 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-2">Requirements Prioritization</h4>
                    <p className="text-gray-300">
                      Requirements are prioritized based on **linked threat risks**. Higher risk = higher priority.
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Prioritized Requirements</h3>
                    <button
                      onClick={() => {
                        const report = {
                          project: squareData.projectName,
                          description: squareData.projectDescription,
                          definitions: squareData.definitions,
                          systemScope: squareData.systemScope,
                          generatedAt: new Date().toISOString(),
                          stakeholders: squareData.stakeholders.length,
                          requirements: squareData.requirements.length,
                          threats: squareData.threats.length,
                          risks: squareData.risks.length,
                          prioritizedRequirements: squareData.requirements.map(req => {
                            const relatedRisks = squareData.risks.filter(risk => {
                              const threat = squareData.threats.find(t => t.id === risk.threatId);
                              return threat && threat.requirementId === req.id;
                            });
                            const maxRisk = relatedRisks.length > 0 
                              ? Math.max(...relatedRisks.map(r => r.riskScore))
                              : 0;
                            return { ...req, priorityScore: maxRisk, relatedRisks: relatedRisks.length };
                          }).sort((a, b) => b.priorityScore - a.priorityScore)
                        };
                        const dataStr = JSON.stringify(report, null, 2);
                        const dataBlob = new Blob([dataStr], {type: 'application/json'});
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${squareData.projectName || 'project'}_square_report.json`;
                        link.click();
                        URL.revokeObjectURL(url);
                        notify('Report downloaded');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                  <div className="space-y-3">
                    {squareData.requirements.map(req => {
                      const relatedRisks = squareData.risks.filter(risk => {
                        const threat = squareData.threats.find(t => t.id === risk.threatId);
                        return threat && threat.requirementId === req.id;
                      });
                      const maxRisk = relatedRisks.length > 0 
                        ? Math.max(...relatedRisks.map(r => r.riskScore))
                        : 0;
                      return { ...req, priorityScore: maxRisk, relatedRisks: relatedRisks.length };
                    }).sort((a, b) => b.priorityScore - a.priorityScore).map((req, index) => (
                      <div key={req.id} className="p-4 border border-slate-700 rounded-lg hover:shadow-lg transition">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{req.title}</h4>
                              <span className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full">
                                {req.category}
                              </span>
                              {req.priorityScore > 0 && (
                                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                  req.priorityScore >= 15 ? 'bg-red-900/30 text-red-300' :
                                  req.priorityScore >= 9 ? 'bg-orange-900/30 text-orange-300' :
                                  'bg-yellow-900/30 text-yellow-300'
                                }`}>
                                  Priority Score: {req.priorityScore}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{req.description}</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span>Related Risks: {req.relatedRisks}</span>
                              <span>Category: {req.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-400">Total Stakeholders</p>
                      <p className="text-2xl font-bold text-blue-400">{squareData.stakeholders.length}</p>
                    </div>
                    <div className="p-4 bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-400">Requirements</p>
                      <p className="text-2xl font-bold text-green-400">{squareData.requirements.length}</p>
                    </div>
                    <div className="p-4 bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-gray-400">Threats Identified</p>
                      <p className="text-2xl font-bold text-orange-400">{squareData.threats.length}</p>
                    </div>
                    <div className="p-4 bg-red-900/20 rounded-lg">
                      <p className="text-sm text-gray-400">Risks Assessed</p>
                      <p className="text-2xl font-bold text-red-400">{squareData.risks.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons — Updated max step to 8 */}
            <div className="flex justify-between">
              <button 
                onClick={() => setSquareStep(Math.max(0, squareStep - 1))} 
                disabled={squareStep === 0} 
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              <button 
                onClick={() => setSquareStep(Math.min(8, squareStep + 1))} 
                disabled={squareStep === 8} 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Testing Tab */}
        {tab === 'testing' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Security Testing Portal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'vuln-scan',
                  name: 'Vulnerability Scan',
                  icon: Bug,
                  desc: 'Scan code for known vulnerabilities',
                  color: 'bg-red-900/20 border-red-900/50 text-red-400',
                  run: () => {
                    if (!code.trim()) {
                      notify('Paste code in Scanner tab first');
                      return;
                    }
                    setTestResults(prev => ({ ...prev, 'vuln-scan': { status: 'running' } }));
                    setTimeout(() => {
                      const findings = vulnPatterns.filter(p => p.pattern.test(code)).map(p => ({
                        ...p,
                        lines: code.split('\n').map((line, i) => p.pattern.test(line) ? i + 1 : null).filter(Boolean)
                      }));
                      setTestResults(prev => ({
                        ...prev,
                        'vuln-scan': {
                          status: 'complete',
                          result: {
                            total: findings.length,
                            critical: findings.filter(f => f.severity === 'Critical').length,
                            high: findings.filter(f => f.severity === 'High').length,
                            findings
                          }
                        }
                      }));
                      notify('Vulnerability scan complete');
                    }, 1200);
                  }
                },
                {
                  id: 'pen-test',
                  name: 'Automated Pen Testing',
                  icon: Zap,
                  desc: 'Simulate real-world attacks',
                  color: 'bg-orange-900/20 border-orange-900/50 text-orange-400',
                  run: () => {
                    setTestResults(prev => ({ ...prev, 'pen-test': { status: 'running' } }));
                    setTimeout(() => {
                      setTestResults(prev => ({
                        ...prev,
                        'pen-test': {
                          status: 'complete',
                          result: {
                            issues: [
                              { name: 'Open Redirect', severity: 'Medium', endpoint: '/callback?url=evil.com' },
                              { name: 'Missing CSP Header', severity: 'High', endpoint: 'https://api.secureflow.com' },
                              { name: 'Rate Limit Bypass', severity: 'Critical', endpoint: '/login' }
                            ]
                          }
                        }
                      }));
                      notify('Penetration test complete');
                    }, 1800);
                  }
                },
                {
                  id: 'compliance',
                  name: 'Compliance Checks',
                  icon: TrendingUp,
                  desc: 'GDPR, HIPAA, PCI-DSS validation',
                  color: 'bg-blue-900/20 border-blue-900/50 text-blue-400',
                  run: () => {
                    setTestResults(prev => ({ ...prev, 'compliance': { status: 'running' } }));
                    setTimeout(() => {
                      setTestResults(prev => ({
                        ...prev,
                        'compliance': {
                          status: 'complete',
                          result: {
                            standards: [
                              { name: 'GDPR', status: 'Pass', issues: 0 },
                              { name: 'HIPAA', status: 'Fail', issues: 2, details: ['Missing audit logs', 'Unencrypted PHI storage'] },
                              { name: 'PCI-DSS', status: 'Warning', issues: 1, details: ['TLS 1.1 detected'] }
                            ]
                          }
                        }
                      }));
                      notify('Compliance check complete');
                    }, 1500);
                  }
                }
              ].map((test) => (
                <div key={test.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <div className={`w-12 h-12 ${test.color.split(' ')[0]} rounded-lg flex items-center justify-center mb-4`}>
                    <test.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{test.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{test.desc}</p>
                  <button
                    onClick={test.run}
                    disabled={testResults[test.id]?.status === 'running'}
                    className={`w-full py-2 rounded-lg font-medium ${
                      testResults[test.id]?.status === 'running'
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {testResults[test.id]?.status === 'running' ? 'Running...' : 'Run Test'}
                  </button>
                  {testResults[test.id]?.status === 'complete' && (
                    <button
                      onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                      className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      View Results {expandedTest === test.id ? '▲' : '▼'}
                    </button>
                  )}
                  {expandedTest === test.id && testResults[test.id]?.result && (
                    <div className="mt-3 p-3 bg-slate-900/50 rounded text-sm max-h-40 overflow-y-auto">
                      {test.id === 'vuln-scan' && (
                        <div>
                          <p>Total: {testResults[test.id].result.total} issues</p>
                          {testResults[test.id].result.findings.map((f, i) => (
                            <div key={i} className="mt-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                f.severity === 'Critical' ? 'bg-red-900/50 text-red-300' : 'bg-orange-900/50 text-orange-300'
                              }`}>
                                {f.severity}
                              </span>{' '}
                              {f.name} on lines {f.lines.join(', ')}
                            </div>
                          ))}
                        </div>
                      )}
                      {test.id === 'pen-test' && (
                        <div>
                          {testResults[test.id].result.issues.map((issue, i) => (
                            <div key={i} className="mt-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                issue.severity === 'Critical' ? 'bg-red-900/50 text-red-300' :
                                issue.severity === 'High' ? 'bg-orange-900/50 text-orange-300' :
                                'bg-yellow-900/50 text-yellow-300'
                              }`}>
                                {issue.severity}
                              </span>{' '}
                              {issue.name} → {issue.endpoint}
                            </div>
                          ))}
                        </div>
                      )}
                      {test.id === 'compliance' && (
                        <div>
                          {testResults[test.id].result.standards.map((std, i) => (
                            <div key={i} className="mt-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                std.status === 'Pass' ? 'bg-green-900/50 text-green-300' :
                                std.status === 'Fail' ? 'bg-red-900/50 text-red-300' :
                                'bg-yellow-900/50 text-yellow-300'
                              }`}>
                                {std.status}
                              </span>{' '}
                              {std.name}
                              {std.details && <div className="text-xs text-gray-400 mt-1">• {std.details.join(', ')}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Test Summary</h3>
                <button
                  onClick={() => {
                    const summary = {
                      generatedAt: new Date().toISOString(),
                      tests: Object.entries(testResults)
                        .filter(([, res]) => res?.status === 'complete')
                        .map(([id, res]) => ({ id, result: res.result }))
                    };
                    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'secureflow_test_report.json';
                    a.click();
                    URL.revokeObjectURL(url);
                    notify('Test report downloaded');
                  }}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                >
                  <Download className="w-4 h-4" /> Export All Results
                </button>
              </div>
              <div className="text-gray-400">
                {Object.values(testResults).some(res => res?.status === 'complete') ? (
                  <p>✅ {Object.keys(testResults).filter(k => testResults[k]?.status === 'complete').length} tests completed.</p>
                ) : (
                  <p>No tests run yet. Click "Run Test" above to begin.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {settings && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Settings</h3>
                <button onClick={() => setSettings(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <button 
                  onClick={() => { 
                    setSettings(false); 
                    notify('Settings saved'); 
                  }} 
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}