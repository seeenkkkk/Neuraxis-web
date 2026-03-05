"use client";

import { motion } from "framer-motion";
import Step1Problem from "./steps/Step1Problem";
import Step2Solutions from "./steps/Step2Solutions";
import Step3Niche from "./steps/Step3Niche";
import Step4Pricing from "./steps/Step4Pricing";
import Step5Landing from "./steps/Step5Landing";
import Step6Agent from "./steps/Step6Agent";

// Tipo compartido del proyecto (campos usados por algún paso)
type AgentProject = {
  id: string;
  current_step: number;
  problem_statement?: string | null;
  pain_tags?: string[] | null;
  ai_approach?: string | null;
  ai_suggestions?: unknown;
  niche_sector?: string | null;
  company_size?: string | null;
  buyer_persona?: string | null;
  pricing_tiers?: unknown;
  landing_platform?: string | null;
  agent_type?: string | null;
  generated_prompt?: string | null;
  n8n_json?: unknown;
};

interface WizardStepClientProps {
  step: number;
  project: AgentProject;
  hasStep6Access: boolean;
}

export default function WizardStepClient({ step, project, hasStep6Access }: WizardStepClientProps) {
  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Problem project={project} />;
      case 2: return <Step2Solutions project={project} />;
      case 3: return <Step3Niche project={project} />;
      case 4: return <Step4Pricing project={project} />;
      case 5: return <Step5Landing project={project} />;
      case 6: return <Step6Agent project={project} hasAccess={hasStep6Access} />;
      default: return null;
    }
  };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {renderStep()}
    </motion.div>
  );
}
