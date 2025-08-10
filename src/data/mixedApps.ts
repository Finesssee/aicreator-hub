import { App } from '@/components/ui/app-card';
import { healthcareApps, financeApps, administrationApps } from './industryApps';

// Create a mixed array with applications from all industries
export const mixedApps: App[] = [
  healthcareApps[0], // Patient Diagnosis Assistant
  financeApps[0],    // Investment Portfolio Analyzer  
  administrationApps[0], // Meeting Minutes + Action Items
  healthcareApps[1], // Medical Imaging Analyzer
  financeApps[1],    // Fraud Detection System
  administrationApps[1], // Form-to-Email Automator
  healthcareApps[2], // Medication Interaction Checker
  financeApps[2],    // Credit Risk Assessor
  administrationApps[2], // Smart Document Classifier
  healthcareApps[3], // Clinical Note Generator
  financeApps[3],    // Algorithmic Trading Bot
  administrationApps[3], // AI Calendar Scheduler
];