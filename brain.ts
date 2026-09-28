// brain.ts - OTAK UTAMA Doctor Strange MINI
// 1 file ini = contextBus + brain + semua function garment

type EventType = 'po:opened' | 'inventory:low' | 'cutting:marker' | 'sewing:bottleneck' | 'qc:defect' | 'user:stuck'

class ContextBus {
  memory: any[] = []
  emit(event: EventType, payload: any) {
    this.memory.push({ event, payload, ts: Date.now() })
    if (this.memory.length > 50) this.memory.shift()
    console.log(`[TELEPATHY] ${event}`, payload)
    // Auto-trigger otak
    this.think(event, payload)
  }
  think(event: EventType, payload: any) {
    // Logika telepati simpel
    if (event === 'po:opened') {
      console.log(`> Brain: PO ${payload.poNumber} butuh ${payload.fabric}, cek stok...`)
      if (payload.fabric) this.emit('inventory:low', { ...payload, shortage: 30 })
    }
    if (event === 'inventory:low') {
      console.log(`> Brain: Stok ${payload.fabric} kurang ${payload.shortage}kg, auto bikin PR`)
    }
  }
  getRecent(n=5){ return this.memory.slice(-n) }
}

export const contextBus = new ContextBus()

// Fungsi sakti yang ngebentuk system
export const garmentTools = {
  createBOM: (style: string) => ({ bomId: `BOM-${Date.now()}`, style, status: 'created' }),
  checkStock: (fabric: string) => ({ fabric, available: 120, need: 150, shortage: 30, action: 'PR' }),
  rebalanceMarker: (ratio: any) => ({ newRatio: { S:1, M:2, L:2, XL:1 }, efficiency: 87.5, saved: '4.2%' }),
  detectBottleneck: (lineId: string) => ({ lineId, bottleneck: 'obras', wip: 200, fix: 'tambah 1 operator' })
}

export const brain = {
  telepathy: (event: EventType, payload: any) => contextBus.emit(event, payload),
  formSystem: (intent: string) => {
    console.log(`[FORM SYSTEM] ${intent}`)
    return {
      intent,
      actions: [
        garmentTools.createBOM(intent),
        garmentTools.checkStock('auto'),
        garmentTools.rebalanceMarker({})
      ]
    }
  },
  memory: () => contextBus.getRecent()
}

// Test lokal
if (typeof window === 'undefined') {
  console.log('🧙‍♂️ Doctor Strange MINI aktif')
  // brain.telepathy('po:opened', { userId: 'even', poNumber: 'PO-001', fabric: 'combed30s' })
}
