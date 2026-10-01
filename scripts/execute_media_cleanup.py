import os
import shutil

source_dir = 'public/midias'
staging_dir = 'temp_staging_midias'
os.makedirs(staging_dir, exist_ok=True)

# Define exact mapping from existing files to new semantic filenames
mapping = {
    # Brand & General
    'sb-carimbo-oficial-clean.jpg': 'sb-carimbo-oficial.jpg',
    'dayane-lima-perfil-studio.jpg': 'dayane-lima-perfil.jpg',
    'video-hero-dayane.mp4': 'hero-dayane-master.mp4',
    'links.txt': 'links.txt',
    
    # Mega Hair
    'Video by dayanelimaestetica_C7RGXNfNSFJ.mp4': 'megahair-resultado-original.mp4',
    'Video by dayanelimaestetica_DHybqSox_VJ.mp4': 'megahair-nanocapsulas-fusao.mp4',
    'Video by dayanelimaestetica_DIBdXRpR6Q-.mp4': 'megahair-manutencao-invisivel.mp4',
    '2025-07-05_22-37-04_DLvjygHy-sF.jpg': 'megahair-volume-morena.jpg',
    '2019-04-04_13-08-14_Bv1bFuNj8h8.jpg': 'megahair-aplicacao-artesanal.jpg',
    
    # Mechas & Balayage
    'Video by dayanelimaestetica_DJVbQxJM8rK.mp4': 'mechas-morena-iluminada.mp4',
    'Video by dayanelimaestetica_DJZfCP5xv63.mp4': 'mechas-ondas-luxo.mp4',
    'Video by dayanelimaestetica_DMOqcrSpe0y.mp4': 'mechas-iluminacao-sofisticada.mp4',
    '2026-04-29_00-11-41_DXseaZzjJb5.jpg': 'mechas-balayage-luxo.jpg',
    '2021-08-26_17-16-08_CTC7BA6rj4u.jpg': 'mechas-loiro-perolado.jpg',
    
    # Olhar & Expressividade (Cílios - Rayssa Lash)
    'Video by rayssa.lash_CzlyrYdORS0.mp4': 'cilios-spa-micelar.mp4',
    'Video by rayssa.lash_CnXp9YbhN2o.mp4': 'cilios-acoplagem-fioafio.mp4',
    'Video by rayssa.lash_Cpn7nTsgLFh.mp4': 'cilios-volume-finalizacao.mp4',
    'Video by _eu__rayssa_DLd6UIAO4ws.mp4': 'cilios-expressividade-olhar.mp4',
    'Video by rayssa.lash_CmXJ882AjZk.mp4': 'cilios-resultado-olhos.mp4',
    'Video by rayssa.lash [CxyNdMXOx-E].mp4': 'cilios-lash-lifting.mp4',
    '2025-04-17_21-20-10_DIkAMNdOIug_1.jpg': 'cilios-fioafio-macro.jpg',
    '2025-04-17_21-20-10_DIkAMNdOIug_2.jpg': 'cilios-volume-brasileiro.jpg',
    '2025-04-17_21-20-10_DIkAMNdOIug_3.jpg': 'cilios-alongamento-luxo.jpg',
    '2024-02-09_01-13-06_C3G52c1u2VE.jpg': 'cilios-efeito-natural.jpg',
    '2023-12-31_00-52-00_C1f3o4JOaHv.jpg': 'cilios-festa-glamour.jpg',
    '2023-05-27_00-20-27_CsuevC0u_60.jpg': 'cilios-curvatura-perfeita.jpg',
    '2023-02-24_15-34-35_CpDON8AOAMg.jpg': 'cilios-isolamento-tecnico.jpg',
    '2023-02-19_08-19-17_Co1kbQVOd1K_1.jpg': 'cilios-volume-russo-denso.jpg',
    '2023-02-19_08-19-17_Co1kbQVOd1K_2.jpg': 'cilios-acabamento-perfeito.jpg',
    '2022-12-29_02-13-43_CmvBQSMuYXd_1.jpg': 'cilios-classico-alinhado.jpg',
    '2022-12-15_21-36-24_CmNDLv0OHRn_1.jpg': 'cilios-olhar-aberto.jpg',

    # Sobrancelhas (Hillery Thauanne)
    'Video by hillerythauanne_DRDhXIXEcJH.mp4': 'sobrancelhas-visagismo-procedimento.mp4',
    '2025-11-27_20-45-50_DRkuUojEQH2.jpg': 'sobrancelhas-simetria-aurea.jpg',
    '2025-11-07_23-48-37_DQxjV5jEV9G_1.jpg': 'sobrancelhas-design-henna.jpg',
    '2025-11-07_23-48-37_DQxjV5jEV9G_2.jpg': 'sobrancelhas-alinhamento-visagismo.jpg',
    '2025-12-30_18-42-28_DS5eb9XkRzS.jpg': 'sobrancelhas-micropigmentacao.jpg',
    '2026-01-06_15-46-39_DTLL4bXkbsh_1.jpg': 'sobrancelhas-visagismo-antes.jpg',
    '2026-01-06_15-46-39_DTLL4bXkbsh_2.jpg': 'sobrancelhas-visagismo-depois.jpg',

    # Unhas (Emily Lima Nails)
    'Video by emil.lylimanails_Cn193CcrmLh.mp4': 'unhas-gel-francesa.mp4',
    'Video by emil.lylimanails_DB_fM3vOMzI.mp4': 'unhas-gel-estruturacao.mp4',
    'Video by emil.lylimanails_DCWyuVLOVru.mp4': 'unhas-blindagem-resistencia.mp4',
    'Video by emil.lylimanails_CpC2xHGpacV.mp4': 'unhas-fibra-vidro.mp4',
    'Video by emil.lylimanails_CmcwlyBp_Eq.mp4': 'unhas-esmaltacao-durabilidade.mp4',
    '2023-02-18_19-02-28_Co0JPSOOcFW_1.jpg': 'unhas-alongamento-babyboomer.jpg',
    '2023-02-18_19-02-28_Co0JPSOOcFW_2.jpg': 'unhas-francesa-joia.jpg',

    # Bronzeamento (Sol & Bronze)
    'Video by dayanelimaestetica_CS28lSrj3af.mp4': 'bronze-cabine-sessao.mp4',
    '2026-03-01_19-15-27_DVWmku1EnFO.jpg': 'bronze-marquinha-fita.jpg',

    # Laser & Estética Corporal (Depilação Hakon 4D)
    'video-depilacao-laser-hakon.mp4': 'laser-depilacao-hakon.mp4',
    '2024-04-27_10-55-00_C6Qyc3ELnl7.jpg': 'laser-hakon-clinico.jpg',

    # Espaço SB Estética & Ateliê Dayane Lima
    'Video by dayanelimaestetica_C6NQ2_UrHZP.mp4': 'espaco-fachada-tour.mp4',
    'Video by barbaravelloso0_C7rwH1wONYq.mp4': 'espaco-terapia-lavatorio.mp4',
    'Video by dayanelimaestetica_DJnTnhzJHjB.mp4': 'dayane-institucional-atelie.mp4',
    '2024-06-17_10-50-00_C8UGcuMOEnH.jpg': 'espaco-fachada-entrada.jpg',
    '2024-07-08_10-45-00_C9KKjz-JkRX.jpg': 'espaco-lavatorio-spa.jpg',
}

print(f"Staging {len(mapping)} curated authentic files...")
for orig, dest in mapping.items():
    src_p = os.path.join(source_dir, orig)
    dest_p = os.path.join(staging_dir, dest)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dest_p)
        print(f"  [OK] {orig} -> {dest}")
    else:
        print(f"  [MISSING] {orig}")

print("\nExecuting FAXINA TOTAL on public/midias...")
# Delete everything in public/midias
for item in os.listdir(source_dir):
    item_p = os.path.join(source_dir, item)
    if os.path.isdir(item_p):
        shutil.rmtree(item_p)
    else:
        os.remove(item_p)

print("Restoring curated, semantically renamed authentic files to public/midias...")
for f in os.listdir(staging_dir):
    shutil.copy2(os.path.join(staging_dir, f), os.path.join(source_dir, f))

# Clean staging dir
shutil.rmtree(staging_dir)

# Remove any root scratch frames/tools
root_cleanups = ['extract_test_frames.js', 'frame_0.jpg', 'scratch_extract_frames.py', 'scratch_thumbs.py', 'scratch_tour_frames.py']
for rf in root_cleanups:
    if os.path.exists(rf):
        os.remove(rf)
        print(f"Removed root junk: {rf}")

print(f"\nFinal content of public/midias: {len(os.listdir(source_dir))} files.")
for f in sorted(os.listdir(source_dir)):
    sz = os.path.getsize(os.path.join(source_dir, f))
    print(f"  {f:40} | {sz:10} bytes")
