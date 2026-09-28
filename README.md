# SCM Garment Agent Mesh - Doctor Strange Mode
> 1 Otak, banyak Avatar, telepati sama user.

Konsep yang lu mau: AI yang bisa berubah bentuk dan ditempatkan di setiap SaaS SCM garment.

## Struktur
- `src/core/brain.ts` -> Otak utama (LLM + RAG)
- `src/core/contextBus.ts` -> Telepati bus, nangkep semua aksi user di SaaS
- `src/avatars/*.ts` -> Avatar yang nempel di tiap modul
- `src/telepathy/proactiveEngine.ts` -> Yang bikin AI nyaut duluan sebelum ditanya
- `src/functions/garmentFunctions.ts` -> Tools yang bisa dieksekusi AI (bikin BOM, cek stok, rebalance marker)

## Cara Kerja
1. User buka modul PO -> contextBus emit `po:opened`
2. proactiveEngine cek: customer ini ada history komplain size? stok kain tipis?
3. Avatar yang sesuai (poAvatar) langsung muncul: "Ko, PO ini resiko..."
4. Kalo user bilang "oke gas", brain langsung panggil function `createBOM`, `checkStock`, dll dan nge-bentuk system di modul lain.

## Cara Push ke GitHub
```bash
git init
git add .
git commit -m "feat: initial agent mesh for scm garment"
gh repo create scm-garment-agent-mesh --public --source=. --push
```

## Cara Pakai di SaaS lu
```ts
import { SCMBrain } from './src/core/brain'
import { contextBus } from './src/core/contextBus'

const brain = new SCMBrain({ apiKey: process.env.OPENAI_KEY })

// Di setiap halaman SaaS lu
contextBus.emit('inventory:viewed', { fabric: 'combed30s', lot: 'A', userId: 'even' })
```

Build for production, ini siap tempel di Next.js / React SaaS lu.
