import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, BarChart3, Users, Lock, ArrowRight, ArrowLeft, Download } from 'lucide-react';

const SquareTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState({
    projectName: '',
    stakeholders: [],
    requirements: [],
    threats: [],
    risks: [],
    priorities: []
  });

  const steps = [
    { id: 0, name: 'Project Setup', icon: Shield },
    { id: 1, name: 'Stakeholder Input', icon: Users },
    { id: 2, name: 'Requirements', icon: FileText },
    { id: 3, name: 'Threat Modeling', icon: AlertTriangle },
    { id: 4, name: 'Risk Analysis', icon: BarChart3 },
    { id: 5, name: 'Prioritization', icon: CheckCircle }
  ];

  // Step 0: Project Setup
  const ProjectSetup = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
        <input
          type="text"
          value={projectData.projectName}
          onChange={(e) => setProjectData({...projectData, projectName: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your project name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          placeholder="Describe your project and its security context..."
        />
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">SQUARE Methodology Overview</h4>
        <p className="text-sm text-blue-800">
          The SQUARE (Security Quality Requirements Engineering) process helps identify and prioritize 
          security requirements early in the software development lifecycle, reducing vulnerabilities and costs.
        </p>
      </div>
    </div>
  );

  // Step 1: Stakeholder Input
  const StakeholderInput = () => {
    const [newStakeholder, setNewStakeholder] = useState({ name: '', role: '', concern: '' });

    const addStakeholder = () => {
      if (newStakeholder.name && newStakeholder.role) {
        setProjectData({
          ...projectData,
          stakeholders: [...projectData.stakeholders, {...newStakeholder, id: Date.now()}]
        });
        setNewStakeholder({ name: '', role: '', concern: '' });
      }
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newStakeholder.name}
            onChange={(e) => setNewStakeholder({...newStakeholder, name: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Stakeholder Name"
          />
          <input
            type="text"
            value={newStakeholder.role}
            onChange={(e) => setNewStakeholder({...newStakeholder, role: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Role (e.g., Product Owner)"
          />
          <input
            type="text"
            value={newStakeholder.concern}
            onChange={(e) => setNewStakeholder({...newStakeholder, concern: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Primary Security Concern"
          />
        </div>
        <button
          onClick={addStakeholder}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Stakeholder
        </button>

        <div className="space-y-3">
          {projectData.stakeholders.map((sh) => (
            <div key={sh.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{sh.name}</p>
                <p className="text-sm text-gray-600">{sh.role} • {sh.concern}</p>
              </div>
              <button
                onClick={() => setProjectData({
                  ...projectData,
                  stakeholders: projectData.stakeholders.filter(s => s.id !== sh.id)
                })}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 2: Requirements Elicitation
  const RequirementsElicitation = () => {
    const [newReq, setNewReq] = useState({ title: '', category: 'confidentiality', description: '' });

    const addRequirement = () => {
      if (newReq.title && newReq.description) {
        setProjectData({
          ...projectData,
          requirements: [...projectData.requirements, {...newReq, id: Date.now()}]
        });
        setNewReq({ title: '', category: 'confidentiality', description: '' });
      }
    };

    const categories = ['confidentiality', 'integrity', 'availability', 'authentication', 'authorization'];

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            value={newReq.title}
            onChange={(e) => setNewReq({...newReq, title: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Requirement Title"
          />
          <select
            value={newReq.category}
            onChange={(e) => setNewReq({...newReq, category: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <textarea
            value={newReq.description}
            onChange={(e) => setNewReq({...newReq, description: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Describe the security requirement..."
          />
          <button
            onClick={addRequirement}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Requirement
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projectData.requirements.map((req) => (
            <div key={req.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold">{req.title}</h4>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {req.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.description}</p>
                </div>
                <button
                  onClick={() => setProjectData({
                    ...projectData,
                    requirements: projectData.requirements.filter(r => r.id !== req.id)
                  })}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Threat Modeling
  const ThreatModeling = () => {
    const [newThreat, setNewThreat] = useState({ 
      name: '', 
      type: 'spoofing', 
      target: '',
      description: ''
    });

    const addThreat = () => {
      if (newThreat.name && newThreat.description) {
        setProjectData({
          ...projectData,
          threats: [...projectData.threats, {...newThreat, id: Date.now()}]
        });
        setNewThreat({ name: '', type: 'spoofing', target: '', description: '' });
      }
    };

    const strideTypes = ['spoofing', 'tampering', 'repudiation', 'information disclosure', 'denial of service', 'elevation of privilege'];

    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">STRIDE Threat Model</h4>
          <p className="text-sm text-yellow-800">
            Identify potential threats using the STRIDE framework: Spoofing, Tampering, Repudiation, 
            Information Disclosure, Denial of Service, and Elevation of Privilege.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={newThreat.name}
            onChange={(e) => setNewThreat({...newThreat, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Threat Name"
          />
          <select
            value={newThreat.type}
            onChange={(e) => setNewThreat({...newThreat, type: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            {strideTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newThreat.target}
            onChange={(e) => setNewThreat({...newThreat, target: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Target Component"
          />
          <textarea
            value={newThreat.description}
            onChange={(e) => setNewThreat({...newThreat, description: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Describe the threat scenario..."
          />
          <button
            onClick={addThreat}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Add Threat
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projectData.threats.map((threat) => (
            <div key={threat.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <h4 className="font-semibold">{threat.name}</h4>
                    <span className="px-2 py-1 text-xs bg-orange-200 text-orange-900 rounded-full">
                      {threat.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">Target: {threat.target}</p>
                  <p className="text-sm text-gray-600">{threat.description}</p>
                </div>
                <button
                  onClick={() => setProjectData({
                    ...projectData,
                    threats: projectData.threats.filter(t => t.id !== threat.id)
                  })}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 4: Risk Analysis
  const RiskAnalysis = () => {
    const [selectedThreat, setSelectedThreat] = useState('');
    const [likelihood, setLikelihood] = useState(3);
    const [impact, setImpact] = useState(3);

    const addRisk = () => {
      const threat = projectData.threats.find(t => t.id.toString() === selectedThreat);
      if (threat) {
        const riskScore = likelihood * impact;
        const severity = riskScore <= 6 ? 'Low' : riskScore <= 12 ? 'Medium' : riskScore <= 20 ? 'High' : 'Critical';
        
        setProjectData({
          ...projectData,
          risks: [...projectData.risks, {
            id: Date.now(),
            threatId: threat.id,
            threatName: threat.name,
            likelihood,
            impact,
            riskScore,
            severity
          }]
        });
        setSelectedThreat('');
        setLikelihood(3);
        setImpact(3);
      }
    };

    const getSeverityColor = (severity) => {
      const colors = {
        'Low': 'bg-green-100 text-green-800 border-green-300',
        'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'High': 'bg-orange-100 text-orange-800 border-orange-300',
        'Critical': 'bg-red-100 text-red-800 border-red-300'
      };
      return colors[severity] || colors['Low'];
    };

    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">Risk Assessment</h4>
          <p className="text-sm text-red-800">
            Evaluate each threat by its likelihood (1-5) and potential impact (1-5). 
            Risk Score = Likelihood × Impact
          </p>
        </div>

        <div className="space-y-4">
          <select
            value={selectedThreat}
            onChange={(e) => setSelectedThreat(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a threat to assess</option>
            {projectData.threats.map(threat => (
              <option key={threat.id} value={threat.id}>
                {threat.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Likelihood (1-5): {likelihood}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={likelihood}
                onChange={(e) => setLikelihood(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Rare</span>
                <span>Certain</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Impact (1-5): {impact}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={impact}
                onChange={(e) => setImpact(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Minor</span>
                <span>Catastrophic</span>
              </div>
            </div>
          </div>

          <button
            onClick={addRisk}
            disabled={!selectedThreat}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Add Risk Assessment
          </button>
        </div>

        <div className="space-y-3">
          {projectData.risks.map((risk) => (
            <div key={risk.id} className={`p-4 border-2 rounded-lg ${getSeverityColor(risk.severity)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{risk.threatName}</h4>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Likelihood: {risk.likelihood}/5</span>
                    <span>Impact: {risk.impact}/5</span>
                    <span className="font-semibold">Risk Score: {risk.riskScore}</span>
                    <span className="font-bold">{risk.severity}</span>
                  </div>
                </div>
                <button
                  onClick={() => setProjectData({
                    ...projectData,
                    risks: projectData.risks.filter(r => r.id !== risk.id)
                  })}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 5: Prioritization
  const Prioritization = () => {
    const prioritizedRequirements = projectData.requirements.map(req => {
      const relatedRisks = projectData.risks.filter(risk => {
        const threat = projectData.threats.find(t => t.id === risk.threatId);
        return threat && threat.type.includes(req.category);
      });
      
      const maxRisk = relatedRisks.length > 0 
        ? Math.max(...relatedRisks.map(r => r.riskScore))
        : 0;
      
      return { ...req, priorityScore: maxRisk, relatedRisks: relatedRisks.length };
    }).sort((a, b) => b.priorityScore - a.priorityScore);

    const downloadReport = () => {
      const report = {
        project: projectData.projectName,
        generatedAt: new Date().toISOString(),
        stakeholders: projectData.stakeholders.length,
        requirements: projectData.requirements.length,
        threats: projectData.threats.length,
        risks: projectData.risks.length,
        prioritizedRequirements: prioritizedRequirements
      };
      
      const dataStr = JSON.stringify(report, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectData.projectName || 'project'}_square_report.json`;
      link.click();
    };

    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Requirements Prioritization</h4>
          <p className="text-sm text-green-800">
            Requirements are automatically prioritized based on associated risk scores. 
            Implement high-priority requirements first to maximize security ROI.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Prioritized Requirements</h3>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        <div className="space-y-3">
          {prioritizedRequirements.map((req, index) => (
            <div key={req.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{req.title}</h4>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {req.category}
                    </span>
                    {req.priorityScore > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        req.priorityScore >= 15 ? 'bg-red-200 text-red-900' :
                        req.priorityScore >= 9 ? 'bg-orange-200 text-orange-900' :
                        'bg-yellow-200 text-yellow-900'
                      }`}>
                        Priority Score: {req.priorityScore}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{req.description}</p>
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
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Stakeholders</p>
            <p className="text-2xl font-bold text-blue-600">{projectData.stakeholders.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Requirements</p>
            <p className="text-2xl font-bold text-green-600">{projectData.requirements.length}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Threats Identified</p>
            <p className="text-2xl font-bold text-orange-600">{projectData.threats.length}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Risks Assessed</p>
            <p className="text-2xl font-bold text-red-600">{projectData.risks.length}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0: return <ProjectSetup />;
      case 1: return <StakeholderInput />;
      case 2: return <RequirementsElicitation />;
      case 3: return <ThreatModeling />;
      case 4: return <RiskAnalysis />;
      case 5: return <Prioritization />;
      default: return <ProjectSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">SQUARE Security Tool</h1>
          </div>
          <p className="text-gray-600">Security Quality Requirements Engineering Platform</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${
                      currentStep === index ? 'text-blue-600' : 
                      currentStep > index ? 'text-green-600' : 'text-gray-400'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === index ? 'bg-blue-600 text-white' :
                      currentStep > index ? 'bg-green-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > index ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {steps[currentStep].name}
          </h2>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SquareTool;