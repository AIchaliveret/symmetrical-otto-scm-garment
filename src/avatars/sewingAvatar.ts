// src/avatars/sewingAvatar.ts - Avatar Doctor Strange yang nempel di modul sewingAvatar
import { contextBus } from '../core/contextBus'

export const sewingAvatar = {
  id: 'sewingAvatar',
  role: 'Mandor Line',
  personality: 'Praktis, liat bottleneck',
  
  // Sapaan khas avatar ini
  greet(context: any) {
    const greetings: any = {
      inventoryAvatar: `Ko, stok ${context.fabric || 'kain'} lot ${context.lot || ''} sisa tipis nih, mau gue bikinin PR sekalian?`,
      poAvatar: `Bro, PO ${context.poNumber || 'ini'} customer ${context.customer || ''} resiko telat, mau gue cek kainnya dulu?`,
      cuttingAvatar: `Bos, marker ini boros ${context.waste || '4%'}, gue rebalance ya biar hemat?`,
      sewingAvatar: `Line ${context.lineId || '3'} numpuk di ${context.process || 'obras'}, mau gue split?`,
      qcAvatar: `Defect ${context.defect || 'bolong'} naik di size M, mau gue tahan dulu lotnya?`
    }
    return greetings['sewingAvatar'] || `Siap bro, gue sewingAvatar standby di modul Mandor Line`
  },

  listen() {
    // Avatar ini dengerin event yang relevan
    contextBus.on('inventory:low', (payload) => {
      if ('sewingAvatar' === 'inventoryAvatar') console.log(this.greet(payload))
    })
  }
}