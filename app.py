import streamlit as st
import datetime
import json

st.set_page_config(page_title="SCM Garment - Doctor Strange Mode", page_icon="🧙‍♂️", layout="wide")

# Custom CSS
st.markdown("""
<style>
.main { background: #0f1115; }
.card { background: #1a1d23; border: 1px solid #2a2f3a; border-radius: 12px; padding: 20px; margin-bottom: 15px; }
.avatar-tag { background: #ff6b35; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
</style>
""", unsafe_allow_html=True)

st.title("🧙‍♂️ SCM Garment Agent Mesh - Doctor Strange Mode")
st.caption("1 Otak, banyak Avatar, telepati sama user | Repo: Alchaliveret/symmetrical-otto-scm-garment")

# Sidebar - Business Divisions
st.sidebar.title("Divisi Business Utama")
division = st.sidebar.selectbox("Pilih Divisi", 
    ["PO & Merchandising", "Inventory Kain", "Cutting & Marker", "Sewing Line", "QC & Defect", "Shipment"])

avatars = {
    "PO & Merchandising": {"name": "poAvatar", "role": "Merchandiser", "speak": "Bro, PO PO-001 customer Zara resiko telat, stok combed30s tipis. Mau gue cek kain dulu?"},
    "Inventory Kain": {"name": "inventoryAvatar", "role": "Kepala Gudang", "speak": "Ko, stok combed 30s lot A sisa 120kg, PO ini butuh 150kg, kurang 30kg nih. Mau gue bikinin PR?"},
    "Cutting & Marker": {"name": "cuttingAvatar", "role": "Tukang Marker", "speak": "Bos, marker ini boros 4.2%, gue rebalance jadi hemat 87.5% ya?"},
    "Sewing Line": {"name": "sewingAvatar", "role": "Mandor Line", "speak": "Line 3 numpuk di obras WIP 200 pcs, mau gue split lot?"},
    "QC & Defect": {"name": "qcAvatar", "role": "QC Head", "speak": "Defect bolong naik di size M, mau gue hold lotnya dulu?"},
    "Shipment": {"name": "shipmentAvatar", "role": "Logistik", "speak": "Shipment PO-001 siap 98%, sisa QC 2%. Gas packing?"}
}

st.sidebar.markdown("---")
st.sidebar.subheader("🌀 Telepathy Bus (Live)")
if "logs" not in st.session_state:
    st.session_state.logs = []

def telepathy(event, payload):
    ts = datetime.datetime.now().strftime("%H:%M:%S")
    log = f"[{ts}] {event} -> {payload}"
    st.session_state.logs.insert(0, log)
    if len(st.session_state.logs) > 10:
        st.session_state.logs.pop()

# Main content
col1, col2 = st.columns([2,1])

with col1:
    st.subheader(f"📦 Divisi: {division}")
    av = avatars[division]
    st.markdown(f"""
    <div class="card">
        <span class="avatar-tag">{av['name']}</span> <b>{av['role']}</b><br><br>
        <i>"{av['speak']}"</i>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button(f"🔮 Morph jadi {av['name']} & Bentuk System"):
        telepathy(f"{division}:opened", {"user": "even", "avatar": av['name']})
        if division == "PO & Merchandising":
            telepathy("inventory:low", {"fabric": "combed30s", "shortage": 30})
        st.success(f"System terbentuk oleh {av['name']}!")
        st.json({
            "intent": f"Auto-form system untuk {division}",
            "actions": ["createBOM", "checkStock", "createRouting"],
            "status": "deployed"
        })

    st.markdown("### 🧵 Garment Functions")
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        if st.button("createBOM()"):
            telepathy("function:createBOM", {"style": "Kemeja Batik"})
            st.code(json.dumps({"bomId": "BOM-12345", "style": "Kemeja Batik", "consumption": "1.2m/pcs"}, indent=2))
    with c2:
        if st.button("checkStock()"):
            telepathy("function:checkStock", {"fabric": "combed30s"})
            st.code(json.dumps({"fabric": "combed30s", "available": 120, "need": 150, "shortage": 30, "action": "PR"}, indent=2))
    with c3:
        if st.button("rebalanceMarker()"):
            telepathy("function:rebalanceMarker", {"efficiency": "87.5%"})
            st.code(json.dumps({"newRatio": {"S":1,"M":2,"L":2,"XL":1}, "saved": "4.2%"}, indent=2))
    with c4:
        if st.button("detectBottleneck()"):
            telepathy("function:detectBottleneck", {"line": "3"})
            st.code(json.dumps({"lineId": "3", "bottleneck": "obras", "wip": 200}, indent=2))

with col2:
    st.subheader("🧠 Brain Memory")
    st.info("Doctor Strange Mode aktif - 1 otak mengawasi semua divisi")
    if st.session_state.logs:
        for log in st.session_state.logs[:8]:
            st.text(log)
    else:
        st.text("Belum ada event telepati. Klik tombol Morph...")
    
    st.markdown("---")
    st.subheader("📋 Informasi Website App")
    st.markdown("""
    **Repo:** `Alchaliveret/symmetrical-otto-scm-garment`  
    **Main file:** `streamlit_app.py` (file ini)  
    **Stack:** Python Streamlit + Agent Mesh Logic  
    **Divisi lengkap:** 6 divisi business utama + 5 avatar + garment functions
    
    Tanpa semua file ini, SCM tidak lengkap. Dengan file ini, website app bisa berfungsi seluruhnya sebagai SaaS SCM garment.
    """)

st.markdown("---")
st.caption("Deploy via share.streamlit.io -> Repository: Alchaliveret/symmetrical-otto-scm-garment | Branch: main | Main file path: streamlit_app.py")
