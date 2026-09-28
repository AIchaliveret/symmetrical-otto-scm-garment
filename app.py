import streamlit as st

st.set_page_config(page_title="SCM Garment - Doctor Strange", page_icon="🧙‍♂️", layout="wide")

st.title("🧙‍♂️ SCM Garment Agent Mesh - Doctor Strange Mode")
st.caption("1 Otak, banyak Avatar, telepati | Repo: Alchaliveret/symmetrical-otto-scm-garment - FIXED")

if "logs" not in st.session_state:
    st.session_state.logs = []

def telepathy(event, payload):
    from datetime import datetime
    ts = datetime.now().strftime("%H:%M:%S")
    st.session_state.logs.insert(0, f"[{ts}] {event} -> {payload}")

# Sidebar
st.sidebar.title("Divisi Business Utama")
division = st.sidebar.selectbox("Pilih Divisi", 
    ["PO & Merchandising", "Inventory Kain", "Cutting & Marker", "Sewing Line", "QC & Defect", "Shipment"])

avatars = {
    "PO & Merchandising": {"name": "poAvatar", "role": "Merchandiser", "msg": "Bro, PO PO-001 customer Zara resiko telat, stok combed30s tipis. Mau gue cek?"},
    "Inventory Kain": {"name": "inventoryAvatar", "role": "Kepala Gudang", "msg": "Ko, stok combed 30s lot A sisa 120kg, butuh 150kg, kurang 30kg. Bikin PR?"},
    "Cutting & Marker": {"name": "cuttingAvatar", "role": "Tukang Marker", "msg": "Bos, marker boros 4.2%, gue rebalance jadi 87.5% hemat ya?"},
    "Sewing Line": {"name": "sewingAvatar", "role": "Mandor Line", "msg": "Line 3 numpuk di obras WIP 200 pcs, split lot?"},
    "QC & Defect": {"name": "qcAvatar", "role": "QC Head", "msg": "Defect bolong naik di size M, hold lot?"},
    "Shipment": {"name": "shipmentAvatar", "role": "Logistik", "msg": "Shipment PO-001 siap 98%, sisa QC 2%. Gas packing?"}
}

av = avatars[division]

col1, col2 = st.columns([2,1])

with col1:
    st.subheader(f"Divisi: {division}")
    st.info(f"**{av['name']} ({av['role']})**: \"{av['msg']}\"")
    
    if st.button(f"🔮 Morph jadi {av['name']}"):
        telepathy(f"{division}:opened", {"avatar": av['name']})
        if division == "PO & Merchandising":
            telepathy("inventory:low", {"fabric": "combed30s", "shortage": 30})
        st.success(f"System dibentuk oleh {av['name']} - PROVE-ABLE")
        st.json({"intent": f"Form system {division}", "actions": ["createBOM", "checkStock", "createRouting"], "status": "deployed - Doctor Strange Mode"})

    st.markdown("### Garment Functions (Full Business)")
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        if st.button("createBOM()"):
            telepathy("createBOM", {"style": "Kemeja Batik"})
            st.code('{"bomId": "BOM-123", "style": "Kemeja Batik"}')
    with c2:
        if st.button("checkStock()"):
            telepathy("checkStock", {"fabric": "combed30s"})
            st.code('{"available": 120, "need": 150, "shortage": 30}')
    with c3:
        if st.button("rebalanceMarker()"):
            telepathy("rebalanceMarker", {})
            st.code('{"efficiency": "87.5%", "saved": "4.2%"}')
    with c4:
        if st.button("detectBottleneck()"):
            telepathy("detectBottleneck", {"line": "3"})
            st.code('{"lineId": "3", "bottleneck": "obras"}')

with col2:
    st.subheader("🧠 Brain Memory - Telepathy Bus")
    if st.session_state.logs:
        for log in st.session_state.logs[:10]:
            st.text(log)
    else:
        st.text("Belum ada event. Klik Morph...")

st.markdown("---")
st.success("✅ FIXED: requirements.txt sekarang cuma 'streamlit' - proven deployable di share.streamlit.io")
