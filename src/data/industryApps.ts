import { App } from '@/components/ui/app-card';
import healthcareDiagnosis from '@/assets/healthcare-diagnosis.jpg';
import medicalImaging from '@/assets/medical-imaging.jpg';
import medicationChecker from '@/assets/medication-checker.jpg';
import clinicalNotes from '@/assets/clinical-notes.jpg';
import investmentPortfolio from '@/assets/investment-portfolio.jpg';
import fraudDetection from '@/assets/fraud-detection.jpg';
import creditRisk from '@/assets/credit-risk.jpg';
import tradingBot from '@/assets/trading-bot.jpg';
import meetingMinutes from '@/assets/meeting-minutes.jpg';
import formEmailAutomator from '@/assets/form-email-automator.jpg';
import documentClassifier from '@/assets/document-classifier.jpg';
import calendarScheduler from '@/assets/calendar-scheduler.jpg';

export const healthcareApps: App[] = [
  {
    id: '1',
    slug: 'patient-diagnosis-assistant',
    name: 'Patient Diagnosis Assistant',
    tagline: 'AI-powered preliminary diagnosis from symptoms',
    description: 'Upload symptoms and patient history to get preliminary diagnosis suggestions',
    category: 'Healthcare',
    thumbnailUrl: healthcareDiagnosis,
    createdAt: '2024-01-15',
    customizationCount: 1247
  },
  {
    id: '2',
    slug: 'medical-imaging-analyzer',
    name: 'Medical Imaging Analyzer',
    tagline: 'Analyze X-rays, MRIs, and CT scans instantly',
    description: 'AI analysis of medical images for radiologists',
    category: 'Healthcare',
    thumbnailUrl: medicalImaging,
    createdAt: '2024-01-10',
    customizationCount: 892
  },
  {
    id: '3',
    slug: 'medication-interaction-checker',
    name: 'Medication Interaction Checker',
    tagline: 'Check drug interactions and side effects',
    description: 'Prevent harmful drug interactions with AI analysis',
    category: 'Healthcare',
    thumbnailUrl: medicationChecker,
    createdAt: '2024-01-08',
    customizationCount: 634
  },
  {
    id: '4',
    slug: 'clinical-note-generator',
    name: 'Clinical Note Generator',
    tagline: 'Auto-generate clinical notes from consultations',
    description: 'Transform consultation recordings into structured clinical notes',
    category: 'Healthcare',
    thumbnailUrl: clinicalNotes,
    createdAt: '2024-01-05',
    customizationCount: 1089
  },
  {
    id: '5',
    slug: 'symptom-tracker',
    name: 'Patient Symptom Tracker',
    tagline: 'Track and analyze patient symptoms over time',
    description: 'Monitor patient progress and symptom patterns',
    category: 'Healthcare',
    thumbnailUrl: healthcareDiagnosis,
    createdAt: '2024-01-03',
    customizationCount: 743
  },
  {
    id: '6',
    slug: 'treatment-plan-optimizer',
    name: 'Treatment Plan Optimizer',
    tagline: 'Optimize treatment plans based on patient data',
    description: 'AI-driven treatment recommendations',
    category: 'Healthcare',
    thumbnailUrl: medicalImaging,
    createdAt: '2024-01-01',
    customizationCount: 567
  },
  {
    id: '7',
    slug: 'health-risk-assessor',
    name: 'Health Risk Assessor',
    tagline: 'Assess patient health risks and prevention strategies',
    description: 'Analyze lifestyle and medical history for risk assessment',
    category: 'Healthcare',
    thumbnailUrl: medicationChecker,
    createdAt: '2023-12-28',
    customizationCount: 456
  },
  {
    id: '8',
    slug: 'pharmacy-inventory-manager',
    name: 'Pharmacy Inventory Manager',
    tagline: 'Smart inventory management for pharmacies',
    description: 'Predict demand and optimize pharmacy stock levels',
    category: 'Healthcare',
    thumbnailUrl: clinicalNotes,
    createdAt: '2023-12-25',
    customizationCount: 328
  },
  {
    id: '9',
    slug: 'telemedicine-assistant',
    name: 'Telemedicine Assistant',
    tagline: 'Virtual consultation support and triage',
    description: 'AI assistant for remote patient consultations',
    category: 'Healthcare',
    thumbnailUrl: healthcareDiagnosis,
    createdAt: '2023-12-20',
    customizationCount: 912
  },
  {
    id: '10',
    slug: 'medical-research-analyzer',
    name: 'Medical Research Analyzer',
    tagline: 'Analyze medical literature and research papers',
    description: 'Extract insights from medical research and publications',
    category: 'Healthcare',
    thumbnailUrl: medicalImaging,
    createdAt: '2023-12-18',
    customizationCount: 245
  },
  {
    id: '11',
    slug: 'lab-result-interpreter',
    name: 'Lab Result Interpreter',
    tagline: 'Interpret and explain laboratory test results',
    description: 'AI interpretation of blood tests and lab results',
    category: 'Healthcare',
    thumbnailUrl: medicationChecker,
    createdAt: '2023-12-15',
    customizationCount: 678
  },
  {
    id: '12',
    slug: 'patient-discharge-planner',
    name: 'Patient Discharge Planner',
    tagline: 'Plan comprehensive patient discharge procedures',
    description: 'Create detailed discharge plans and follow-up schedules',
    category: 'Healthcare',
    thumbnailUrl: clinicalNotes,
    createdAt: '2023-12-12',
    customizationCount: 423
  }
];

export const financeApps: App[] = [
  {
    id: '13',
    slug: 'investment-portfolio-analyzer',
    name: 'Investment Portfolio Analyzer',
    tagline: 'Analyze and optimize investment portfolios',
    description: 'AI-powered portfolio analysis and risk assessment',
    category: 'Finance',
    thumbnailUrl: investmentPortfolio,
    createdAt: '2024-01-15',
    customizationCount: 1534
  },
  {
    id: '14',
    slug: 'fraud-detection-system',
    name: 'Fraud Detection System',
    tagline: 'Detect fraudulent transactions in real-time',
    description: 'Machine learning fraud detection for financial institutions',
    category: 'Finance',
    thumbnailUrl: fraudDetection,
    createdAt: '2024-01-12',
    customizationCount: 967
  },
  {
    id: '15',
    slug: 'credit-risk-assessor',
    name: 'Credit Risk Assessor',
    tagline: 'Assess credit risk and loan default probability',
    description: 'Evaluate borrower creditworthiness using AI',
    category: 'Finance',
    thumbnailUrl: creditRisk,
    createdAt: '2024-01-08',
    customizationCount: 1289
  },
  {
    id: '16',
    slug: 'algorithmic-trading-bot',
    name: 'Algorithmic Trading Bot',
    tagline: 'Automated trading strategies and execution',
    description: 'AI-driven trading algorithms for market analysis',
    category: 'Finance',
    thumbnailUrl: tradingBot,
    createdAt: '2024-01-05',
    customizationCount: 823
  },
  {
    id: '17',
    slug: 'expense-categorizer',
    name: 'Smart Expense Categorizer',
    tagline: 'Automatically categorize and track expenses',
    description: 'AI categorization of financial transactions',
    category: 'Finance',
    thumbnailUrl: investmentPortfolio,
    createdAt: '2024-01-03',
    customizationCount: 1156
  },
  {
    id: '18',
    slug: 'financial-report-generator',
    name: 'Financial Report Generator',
    tagline: 'Generate comprehensive financial reports',
    description: 'Automated financial reporting and analysis',
    category: 'Finance',
    thumbnailUrl: fraudDetection,
    createdAt: '2024-01-01',
    customizationCount: 745
  },
  {
    id: '19',
    slug: 'insurance-claim-processor',
    name: 'Insurance Claim Processor',
    tagline: 'Automate insurance claim processing and validation',
    description: 'AI-powered insurance claim analysis and approval',
    category: 'Finance',
    thumbnailUrl: creditRisk,
    createdAt: '2023-12-28',
    customizationCount: 634
  },
  {
    id: '20',
    slug: 'tax-optimization-advisor',
    name: 'Tax Optimization Advisor',
    tagline: 'Optimize tax strategies and deductions',
    description: 'AI tax planning and optimization recommendations',
    category: 'Finance',
    thumbnailUrl: tradingBot,
    createdAt: '2023-12-25',
    customizationCount: 892
  },
  {
    id: '21',
    slug: 'budget-planner-ai',
    name: 'AI Budget Planner',
    tagline: 'Create and manage personalized budgets',
    description: 'Smart budgeting with AI-powered insights',
    category: 'Finance',
    thumbnailUrl: investmentPortfolio,
    createdAt: '2023-12-22',
    customizationCount: 1078
  },
  {
    id: '22',
    slug: 'market-sentiment-analyzer',
    name: 'Market Sentiment Analyzer',
    tagline: 'Analyze market sentiment from news and social media',
    description: 'AI analysis of market sentiment and trends',
    category: 'Finance',
    thumbnailUrl: fraudDetection,
    createdAt: '2023-12-20',
    customizationCount: 567
  },
  {
    id: '23',
    slug: 'financial-chatbot',
    name: 'Financial Advisory Chatbot',
    tagline: 'AI financial advisor for investment guidance',
    description: 'Conversational AI for financial advice and planning',
    category: 'Finance',
    thumbnailUrl: creditRisk,
    createdAt: '2023-12-18',
    customizationCount: 1345
  },
  {
    id: '24',
    slug: 'compliance-monitor',
    name: 'Regulatory Compliance Monitor',
    tagline: 'Monitor and ensure regulatory compliance',
    description: 'AI-powered compliance monitoring and reporting',
    category: 'Finance',
    thumbnailUrl: tradingBot,
    createdAt: '2023-12-15',
    customizationCount: 456
  }
];

export const administrationApps: App[] = [
  {
    id: '25',
    slug: 'meeting-minutes-generator',
    name: 'Meeting Minutes + Action Items',
    tagline: 'Transform meeting transcripts into structured minutes',
    description: 'Paste a meeting transcript or notes; get concise minutes with owners, due dates, and decisions.',
    category: 'Administration',
    thumbnailUrl: meetingMinutes,
    createdAt: '2024-01-15',
    customizationCount: 1876
  },
  {
    id: '26',
    slug: 'form-to-email-automator',
    name: 'Form-to-Email / Ticket Automator',
    tagline: 'Extract data from PDFs and generate standardized emails',
    description: 'Upload a filled PDF form or email thread; extract key fields; generate a standardized email or help-desk ticket.',
    category: 'Administration',
    thumbnailUrl: formEmailAutomator,
    createdAt: '2024-01-12',
    customizationCount: 1234
  },
  {
    id: '27',
    slug: 'document-classifier',
    name: 'Smart Document Classifier',
    tagline: 'Automatically categorize and organize documents',
    description: 'AI-powered document classification and filing system',
    category: 'Administration',
    thumbnailUrl: documentClassifier,
    createdAt: '2024-01-10',
    customizationCount: 987
  },
  {
    id: '28',
    slug: 'calendar-scheduler',
    name: 'AI Calendar Scheduler',
    tagline: 'Intelligent meeting scheduling and calendar management',
    description: 'Automatically schedule meetings and manage calendars',
    category: 'Administration',
    thumbnailUrl: calendarScheduler,
    createdAt: '2024-01-08',
    customizationCount: 1567
  },
  {
    id: '29',
    slug: 'expense-report-processor',
    name: 'Expense Report Processor',
    tagline: 'Process and validate expense reports automatically',
    description: 'Extract data from receipts and generate expense reports',
    category: 'Administration',
    thumbnailUrl: formEmailAutomator,
    createdAt: '2024-01-05',
    customizationCount: 823
  },
  {
    id: '30',
    slug: 'contract-analyzer',
    name: 'Contract Analyzer',
    tagline: 'Analyze contracts and identify key terms',
    description: 'AI-powered contract review and risk assessment',
    category: 'Administration',
    thumbnailUrl: documentClassifier,
    createdAt: '2024-01-03',
    customizationCount: 645
  },
  {
    id: '31',
    slug: 'email-response-generator',
    name: 'Email Response Generator',
    tagline: 'Generate professional email responses automatically',
    description: 'AI-powered email drafting and response suggestions',
    category: 'Administration',
    thumbnailUrl: meetingMinutes,
    createdAt: '2024-01-01',
    customizationCount: 1298
  },
  {
    id: '32',
    slug: 'office-supply-tracker',
    name: 'Office Supply Tracker',
    tagline: 'Track and manage office inventory efficiently',
    description: 'Smart inventory management for office supplies',
    category: 'Administration',
    thumbnailUrl: formEmailAutomator,
    createdAt: '2023-12-28',
    customizationCount: 456
  },
  {
    id: '33',
    slug: 'employee-onboarding-assistant',
    name: 'Employee Onboarding Assistant',
    tagline: 'Streamline new employee onboarding process',
    description: 'Automated onboarding workflows and documentation',
    category: 'Administration',
    thumbnailUrl: documentClassifier,
    createdAt: '2023-12-25',
    customizationCount: 734
  },
  {
    id: '34',
    slug: 'policy-document-generator',
    name: 'Policy Document Generator',
    tagline: 'Generate and customize company policy documents',
    description: 'AI-assisted policy creation and compliance checking',
    category: 'Administration',
    thumbnailUrl: meetingMinutes,
    createdAt: '2023-12-22',
    customizationCount: 567
  },
  {
    id: '35',
    slug: 'performance-review-assistant',
    name: 'Performance Review Assistant',
    tagline: 'Assist in creating comprehensive performance reviews',
    description: 'AI-powered performance evaluation and feedback generation',
    category: 'Administration',
    thumbnailUrl: calendarScheduler,
    createdAt: '2023-12-20',
    customizationCount: 892
  },
  {
    id: '36',
    slug: 'workflow-optimizer',
    name: 'Workflow Optimizer',
    tagline: 'Analyze and optimize business workflows',
    description: 'Identify bottlenecks and improve process efficiency',
    category: 'Administration',
    thumbnailUrl: documentClassifier,
    createdAt: '2023-12-18',
    customizationCount: 678
  }
];