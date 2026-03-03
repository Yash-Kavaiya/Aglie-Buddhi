import { clsx } from 'clsx';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Button } from './Button';

interface AIInsight {
  id: string;
  type: 'recommendation' | 'prediction' | 'alert' | 'tip';
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

interface AIInsightCardProps {
  insight: AIInsight;
  onDismiss?: (id: string) => void;
  className?: string;
}

const typeConfig = {
  recommendation: { icon: '🎯', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  prediction: { icon: '📊', color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  alert: { icon: '⚠️', color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
  tip: { icon: '💡', color: 'text-nvidia-green', bg: 'bg-nvidia-green/10' },
};

export function AIInsightCard({ insight, onDismiss, className }: AIInsightCardProps) {
  const config = typeConfig[insight.type];

  return (
    <div className={clsx('card-ai p-4 rounded-xl border border-accent-purple/30 relative overflow-hidden', className)}>
      <div className="absolute top-0 left-0 w-full h-0.5 animate-ai-processing" />
      
      <div className="flex items-start gap-3">
        <div className={clsx('p-2 rounded-lg', config.bg)}>
          <Sparkles className={clsx('w-4 h-4', config.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent-purple text-xs font-semibold uppercase tracking-wide">AI Insight</span>
            <span className={clsx('text-xs', config.color)}>{config.icon}</span>
          </div>
          
          <h4 className="text-white font-semibold text-sm mb-1">{insight.title}</h4>
          <p className="text-gray-400 text-xs">{insight.description}</p>
          
          {insight.action && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 -ml-2 text-accent-purple hover:text-accent-blue"
            >
              {insight.action.label}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
        
        {onDismiss && (
          <button 
            onClick={() => onDismiss(insight.id)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function AIChatPanel({ isOpen, onClose, className }: AIChatPanelProps) {
  if (!isOpen) return null;

  return (
    <div className={clsx('fixed right-0 top-0 h-full w-96 bg-surface-carbon border-l border-surface-gunmetal shadow-2xl z-50 transform transition-transform duration-300', className)}>
      <div className="flex items-center justify-between p-4 border-b border-surface-gunmetal">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </div>
          <span className="font-display font-semibold text-white">AI Assistant</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 h-[calc(100%-140px)] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 bg-surface-graphite rounded-lg p-3 text-sm text-gray-300">
              <p>Hello! I'm your AI assistant. I can help you with:</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Analyzing your business data</li>
                <li>• Generating reports and insights</li>
                <li>• Automating tasks</li>
                <li>• Answering questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-gunmetal">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask AI anything..."
            className="input-field w-full pr-10"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent-purple rounded-md hover:bg-accent-purple/80 transition-colors">
            <Sparkles className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
