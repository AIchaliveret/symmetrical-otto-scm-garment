// src/functions/garmentFunctions.ts - Tools yang bisa dipanggil AI buat ngebentuk system

export const garmentFunctions = [
  {
    name: 'createBOM',
    description: 'Bikin Bill of Materials untuk style baru garment',
    parameters: {
      type: 'object',
      properties: {
        styleName: { type: 'string' },
        fabric: { type: 'string', description: 'Jenis kain, ex: combed 30s, twill' },
        sizes: { type: 'array', items: { type: 'string' } },
        colors: { type: 'array', items: { type: 'string' } }
      },
      required: ['styleName']
    },
    execute: async (args: any) => {
      // Logic asli lu taro sini, connect ke DB SCM lu
      return { bomId: `BOM-${Date.now()}`, ...args, status: 'created', consumption: 'auto-calculated' }
    }
  },
  {
    name: 'checkStock',
    description: 'Cek stok kain di gudang, kasih warning kalo tipis',
    parameters: {
      type: 'object',
      properties: {
        fabricType: { type: 'string' },
        lot: { type: 'string' }
      }
    },
    execute: async (args: any) => {
      // Mock - ganti dengan query ke inventory DB lu
      return { fabric: args.fabricType, available: 120, unit: 'kg', need: 150, shortage: 30, action: 'createPR' }
    }
  },
  {
    name: 'rebalanceMarker',
    description: 'Rebalance ratio size di marker cutting biar hemat kain',
    parameters: {
      type: 'object',
      properties: {
        currentRatio: { type: 'object' },
        targetEfficiency: { type: 'number' }
      }
    },
    execute: async (args: any) => {
      return { newRatio: { S: 1, M: 2, L: 2, XL: 1 }, efficiency: 87.5, fabricSaved: '4.2%' }
    }
  },
  {
    name: 'detectBottleneck',
    description: 'Deteksi bottleneck di line sewing',
    parameters: {
      type: 'object',
      properties: {
        lineId: { type: 'string' }
      }
    },
    execute: async (args: any) => {
      return { lineId: args.lineId, bottleneck: 'obras', wip: 200, suggestion: 'tambah 1 operator obras / split lot' }
    }
  }
]