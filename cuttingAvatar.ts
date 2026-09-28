// cuttingAvatar.ts - AVATAR yang bisa berubah bentuk kayak Doctor Strange
// 1 file ini bisa jadi inventory, po, cutting, sewing, qc

import { contextBus, garmentTools, brain } from './brain.ts'

type AvatarRole = 'inventory' | 'po' | 'cutting' | 'sewing' | 'qc'

class MorphingAvatar {
  currentRole: AvatarRole = 'cutting'

  morph(role: AvatarRole) {
    this.currentRole = role
    console.log(`[MORPH] Avatar berubah jadi ${role}`)
    return this
  }

  speak(payload: any = {}) {
    const lines: any = {
      inventory: `Ko, stok ${payload.fabric || 'kain'} sisa ${payload.available || 120}kg, kurang ${payload.shortage || 30}kg nih. Mau gue bikinin PR?`,
      po: `Bro, PO ${payload.poNumber || 'ini'} resiko telat gara2 ${payload.fabric || 'kain'} tipis. Gue tahan dulu?`,
      cutting: `Bos, marker ini boros ${payload.waste || '4%'}, gue rebalance jadi hemat ${garmentTools.rebalanceMarker({}).saved} ya?`,
      sewing: `Line ${payload.lineId || '3'} numpuk di ${payload.bottleneck || 'obras'} WIP ${payload.wip || 200}, mau gue split lot?`,
      qc: `Defect ${payload.defect || 'bolong'} naik di size M, mau gue hold lotnya dulu?`
    }
    const msg = lines[this.currentRole]
    console.log(`[${this.currentRole.toUpperCase()} AVATAR]: ${msg}`)
    return msg
  }

  // Fungsi auto-bentuk system sesuai role
  act(action: string, data: any = {}) {
    if (this.currentRole === 'inventory') return garmentTools.checkStock(data.fabric)
    if (this.currentRole === 'cutting') return garmentTools.rebalanceMarker(data.ratio)
    if (this.currentRole === 'sewing') return garmentTools.detectBottleneck(data.lineId)
    if (this.currentRole === 'po') return garmentTools.createBOM(data.style)
    return brain.formSystem(action)
  }
}

export const avatar = new MorphingAvatar()

// Contoh telepati listening
contextBus.memory // biar kebaca

// Test
// avatar.morph('inventory').speak({ fabric: 'combed30s', shortage: 30 })
// avatar.morph('cutting').speak({ waste: '5%' })
