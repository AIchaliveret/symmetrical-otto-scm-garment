// src/avatars/cuttingAvatar.ts - Avatar Doctor Strange yang nempel di modul cuttingAvatar
import { contextBus } from '../core/contextBus'

export const cuttingAvatar = {
  id: 'cuttingAvatar',
  role: 'Tukang Marker',
  personality: 'Matematis, irit kain',
  
  // Sapaan khas avatar ini
  greet(context: any) {
    const greetings: any = {
      inventoryAvatar: `Ko, stok ${context.fabric || 'kain'} lot ${context.lot || ''} sisa tipis nih, mau gue bikinin PR sekalian?`,
      poAvatar: `Bro, PO ${context.poNumber || 'ini'} customer ${context.customer || ''} resiko telat, mau gue cek kainnya dulu?`,
      cuttingAvatar: `Bos, marker ini boros ${context.waste || '4%'}, gue rebalance ya biar hemat?`,
      sewingAvatar: `Line ${context.lineId || '3'} numpuk di ${context.process || 'obras'}, mau gue split?`,
      qcAvatar: `Defect ${context.defect || 'bolong'} naik di size M, mau gue tahan dulu lotnya?`
    }
    return greetings['cuttingAvatar'] || `Siap bro, gue cuttingAvatar standby di modul Tukang Marker`
  },

  listen() {
    // Avatar ini dengerin event yang relevan
    contextBus.on('inventory:low', (payload) => {
      if ('cuttingAvatar' === 'inventoryAvatar') console.log(this.greet(payload))
    })
  }
}