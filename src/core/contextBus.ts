// src/core/contextBus.ts - Jalur telepati
import { EventEmitter } from 'events'

type ContextEvent = 
  | 'po:opened' | 'po:created'
  | 'inventory:viewed' | 'inventory:low'
  | 'cutting:marker_created' | 'cutting:ratio_changed'
  | 'sewing:bottleneck' | 'qc:defect_found'
  | 'user:idle' | 'user:stuck'

class ContextBus extends EventEmitter {
  private memory: Map<string, any[]> = new Map()

  emit(event: ContextEvent, payload: any) {
    // Simpen memory buat telepati
    const key = payload.userId || 'global'
    if (!this.memory.has(key)) this.memory.set(key, [])
    this.memory.get(key)!.push({ event, payload, ts: Date.now() })
    
    // Keep last 100 events aja biar nggak bengkak
    if (this.memory.get(key)!.length > 100) {
      this.memory.get(key)!.shift()
    }
    
    console.log(`[TELEPATHY] ${event}`, payload)
    return super.emit(event, payload)
  }

  getRecentContext(userId: string, lastN = 10) {
    return (this.memory.get(userId) || []).slice(-lastN)
  }

  // Deteksi user lagi bingung (idle 2 menit di halaman yang sama)
  detectStuck(userId: string) {
    const recent = this.getRecentContext(userId, 5)
    const isStuck = recent.length >= 3 && recent.every(r => r.event === recent[0].event)
    if (isStuck) this.emit('user:stuck', { userId, context: recent })
  }
}

export const contextBus = new ContextBus()