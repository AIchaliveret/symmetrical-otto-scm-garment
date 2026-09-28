// src/core/brain.ts - Otak utama Doctor Strange
export type GarmentContext = {
  module: 'po' | 'inventory' | 'cutting' | 'sewing' | 'qc' | 'shipment';
  userId: string;
  action: string;
  payload: any;
  history?: any[];
}

export class SCMBrain {
  constructor(private config: { apiKey: string; model?: string }) {}
  
  // Ini core telepati - dia tau konteks dari semua modul
  async think(context: GarmentContext) {
    const systemPrompt = `
    Kamu adalah AI inti untuk SaaS SCM Garment.
    Kamu seperti Doctor Strange - bisa berubah bentuk sesuai modul.
    Tugasmu: bukan cuma jawab, tapi BENTUK SYSTEM.
    Kalo user di modul PO, kamu mikir kayak merchandiser.
    Kalo di inventory, kamu mikir kayak kepala gudang kain.
    Kalo di cutting, kamu mikir kayak tukang marker yang hemat kain.
    Selalu jawab dengan aksi yang bisa dieksekusi via function calling.
    Bahasa: campur Indo santai, tapi data garment presisi.
    `;

    // Di sini lu ganti dengan call ke OpenAI / Claude / Meta AI API
    // Untuk MVP bisa pake fetch ke LLM
    return {
      thought: `Analyzing ${context.module} - ${context.action}`,
      suggestedAvatars: this.pickAvatars(context.module),
      proactive: true,
      systemPrompt
    }
  }

  private pickAvatars(module: string) {
    const map: any = {
      po: ['poAvatar', 'inventoryAvatar'],
      inventory: ['inventoryAvatar', 'poAvatar'],
      cutting: ['cuttingAvatar', 'inventoryAvatar'],
      sewing: ['sewingAvatar', 'qcAvatar'],
      qc: ['qcAvatar', 'shipmentAvatar']
    }
    return map[module] || ['poAvatar']
  }

  // Fungsi sakti: membentuk system langsung
  async formSystem(intent: string, context: GarmentContext) {
    // Contoh: user bilang "bikin style baru kemeja batik"
    // AI akan generate BOM, routing, dll
    return {
      intent,
      actions: [
        { tool: 'createBOM', params: { style: intent, context } },
        { tool: 'checkStock', params: { fabricType: 'auto-detect' } },
        { tool: 'createRouting', params: { processes: ['cutting','sewing','qc'] } }
      ]
    }
  }
}