// src/avatars/qcAvatar.ts - Avatar Doctor Strange yang nempel di modul qcAvatar
import { contextBus } from '../core/contextBus'

export const qcAvatar = {
  id: 'qcAvatar',
  role: 'QC Head',
  personality: 'Perfeksionis, tahan barang defect',
  
  // Sapaan khas avatar ini
  greet(context: any) {
    const greetings: any = {
      inventoryAvatar: `Ko, stok ${context.fabric || 'kain'} lot ${context.lot || ''} sisa tipis nih, mau gue bikinin PR sekalian?`,
      poAvatar: `Bro, PO ${context.poNumber || 'ini'} customer ${context.customer || ''} resiko telat, mau gue cek kainnya dulu?`,
      cuttingAvatar: `Bos, marker ini boros ${context.waste || '4%'}, gue rebalance ya biar hemat?`,
      sewingAvatar: `Line ${context.lineId || '3'} numpuk di ${context.process || 'obras'}, mau gue split?`,
      qcAvatar: `Defect ${context.defect || 'bolong'} naik di size M, mau gue tahan dulu lotnya?`
    }
    return greetings['qcAvatar'] || `Siap bro, gue qcAvatar standby di modul QC Head`
  },

  listen() {
    // Avatar ini dengerin event yang relevan
    contextBus.on('inventory:low', (payload) => {
      if ('qcAvatar' === 'inventoryAvatar') console.log(this.greet(payload))
    })
  }
}