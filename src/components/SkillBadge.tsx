/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'react';

interface SkillBadgeProps {
  key?: string;
  name: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  variant?: 'dark' | 'light';
}

export default function SkillBadge({ 
  name, 
  isSelected = false, 
  isHighlighted = false, 
  onClick,
  variant = 'light' 
}: SkillBadgeProps) {
  
  const getStyles = () => {
    if (variant === 'dark') {
      return `px-3 py-1 bg-surface/10 hover:bg-surface/15 text-on-secondary-container text-xs font-mono border border-white/5 cursor-pointer rounded transition-all ${
        isSelected || isHighlighted 
          ? 'ring-2 ring-secondary ring-offset-2 ring-offset-primary bg-secondary/35 text-white border-secondary' 
          : 'opacity-90 hover:opacity-100'
      }`;
    } else {
      return `px-2.5 py-1 bg-surface-container-low hover:bg-surface-container-high text-primary font-mono text-xs border border-outline-variant/30 cursor-pointer rounded transition-all ${
        isSelected || isHighlighted 
          ? 'ring-2 ring-secondary ring-offset-1 bg-secondary-container/15 text-secondary border-secondary font-bold shadow-xs' 
          : 'text-on-surface-variant hover:text-on-surface'
      }`;
    }
  };

  return (
    <button 
      id={`skill-badge-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      onClick={onClick}
      className={getStyles()}
      title={`Click to filter projects/experiences using ${name}`}
    >
      {name}
    </button>
  );
}
