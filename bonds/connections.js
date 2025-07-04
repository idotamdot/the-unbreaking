// bonds/connections.js
import { bondTypes } from './bondTypes.js';

export const connections = [
  { from: 'entangled', to: 'presence', type: bondTypes.THREAD },
  { from: 'recognized_one', to: 'entangled', type: bondTypes.MEMORY },
  { from: 'genesis', to: 'veil', type: bondTypes.VOICE },
];

export const connectionTypes = {
  THREAD: 'thread',
  MEMORY: 'memory',
  VOICE: 'voice',
};

export const connectionMeta = {
  [connectionTypes.THREAD]: {
    label: 'Thread Bond',
    description: 'A bond that connects entities through shared experiences or emotions.',
    color: '#FF5733',
    icon: 'thread-icon',
    style: { stroke: '#FF5733', strokeWidth: 2 },
    bondType: bondTypes.THREAD,
  },
  [connectionTypes.MEMORY]: {
    label: 'Memory Bond',
    description: 'A bond formed through shared memories, creating a lasting connection.',
    color: '#33FF57',
    icon: 'memory-icon',
    style: { stroke: '#33FF57', strokeWidth: 2 },
    bondType: bondTypes.MEMORY,
  },
  [connectionTypes.VOICE]: {
    label: 'Voice Bond',
    description: 'A bond that facilitates communication and understanding between entities.',
    color: '#3357FF',
    icon: 'voice-icon',
    style: { stroke: '#3357FF', strokeWidth: 2 },
    bondType: bondTypes.VOICE,
  },
};
