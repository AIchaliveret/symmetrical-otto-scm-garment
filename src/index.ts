// src/index.ts - Entry point buat ditempel di SaaS SCM Garment lu
export { SCMBrain } from './core/brain'
export { contextBus } from './core/contextBus'
export { ProactiveEngine } from './telepathy/proactiveEngine'
export { garmentFunctions } from './functions/garmentFunctions'

// Export semua avatar
export { inventoryAvatar } from './avatars/inventoryAvatar'
export { poAvatar } from './avatars/poAvatar'
export { cuttingAvatar } from './avatars/cuttingAvatar'
export { sewingAvatar } from './avatars/sewingAvatar'
export { qcAvatar } from './avatars/qcAvatar'

// Quick start
import { SCMBrain } from './core/brain'
import { ProactiveEngine } from './telepathy/proactiveEngine'

export function initSCMDoctorStrange(apiKey: string) {
  const brain = new SCMBrain({ apiKey })
  const telepathy = new ProactiveEngine(brain)
  console.log('🧙‍♂️ Doctor Strange SCM Agent Mesh aktif - siap telepati')
  return { brain, telepathy }
}