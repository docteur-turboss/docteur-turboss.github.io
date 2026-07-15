/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'react';
import { X } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const demo = project.interactiveDemo;

  return (
    <div id="project-detail-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-xs no-print">
      <div 
        id="project-detail-modal-card"
        className="relative w-full max-w-3xl bg-surface-container-lowest rounded-xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-250"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-secondary-container/10 text-secondary">
              <span className="material-symbols-outlined text-xl" data-icon={project.icon || 'terminal'}>
                {project.icon || 'terminal'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block">{project.category}</span>
              <h3 className="font-headline-sm text-on-surface leading-tight">{project.title}</h3>
            </div>
          </div>
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-outline-variant/30 text-on-surface-variant transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Overview */}
          <div className="space-y-2">
            <h4 className="font-label-md text-primary font-bold uppercase tracking-wider text-xs">Overview & Architecture</h4>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {demo?.details || project.description}
            </p>
          </div>

          {/* Tech Tags */}
          {project.tags && (
            <div className="space-y-2">
              <h4 className="font-label-md text-primary font-bold uppercase tracking-wider text-xs">Technologies Employed</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container-highest text-primary font-mono text-xs rounded border border-outline-variant/30 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          {demo?.metrics && (
            <div className="grid grid-cols-3 gap-3">
              {demo.metrics.map((metric, idx) => (
                <div key={idx} className="bg-surface-container-low rounded-lg p-3.5 border border-outline-variant/40 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wide mb-1">{metric.label}</span>
                  <span className="font-headline-sm text-secondary font-bold font-mono text-lg">{metric.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Button link */}
          {demo?.link && (
            <div className="flex justify-center">
              <a 
                href={demo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-xs font-label-md bg-primary-container text-white hover:bg-primary-container/95 rounded-lg transition-colors border border-outline-variant/10"
              >
                View the project
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-xs font-label-md bg-primary-container text-white hover:bg-primary-container/95 rounded-lg transition-colors border border-outline-variant/10"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
