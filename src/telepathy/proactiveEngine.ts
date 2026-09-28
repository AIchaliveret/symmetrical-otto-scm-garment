// src/telepathy/proactiveEngine.ts - Mesin telepati, nyaut sebelum ditanya
import { contextBus } from '../core/contextBus'
import { SCMBrain } from '../core/brain'

export class ProactiveEngine {
  constructor(private brain: SCMBrain) {
    this.attachListeners()
  }

  attachListeners() {
    // Kalo user buka PO, langsung cek stok tanpa disuruh
    contextBus.on('po:opened', async (payload) => {
      const ctx = { module: 'po' as const, userId: payload.userId, action: 'po:opened', payload }
      const thought = await this.brain.think(ctx)
      
      // Trigger avatar inventory buat cek
      if (payload.fabric) {
        contextBus.emit('inventory:low', { 
          userId: payload.userId, 
          fabric: payload.fabric,
          message: `Auto-check: PO ${payload.poNumber} butuh ${payload.fabric}` 
        })
      }
    })

    // Kalo user stuck 2 menit, samperin
    contextBus.on('user:stuck', async (payload) => {
      const ctx = { module: payload.context[0]?.payload?.module || 'po' as const, userId: payload.userId, action: 'user:stuck', payload, history: payload.context }
      await this.brain.think(ctx)
      console.log(`[PROACTIVE] User ${payload.userId} stuck, samperin dengan bantuan`)
    })
  }

  // Fungsi yang dipanggil tiap 30 detik di SaaS lu buat cek apakah perlu nyaut
  async pulse(userId: string) {
    const recent = contextBus.getRecentContext(userId, 5)
    if (recent.length === 0) return null
    
    // Kalo 3 aksi terakhir di modul yang sama dan ada pattern waste, kasih saran
    const modules = recent.map(r => r.payload?.module || r.event.split(':')[0])
    const sameModule = modules.every(m => m === modules[0])
    
    if (sameModule && recent.length >= 3) {
      return {
        type: 'suggestion',
        message: `Bro, lu udah 3x bolak-balik di ${modules[0]}, mau gue beresin sekalian auto-systemnya?`,
        actions: ['auto_form_system', 'show_summary']
      }
    }
    return null
  }
}