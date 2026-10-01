import os
import urllib.parse
import json

midias_dir = 'public/midias'
files = os.listdir(midias_dir)

excluded = {
    'sb-carimbo-oficial-clean.jpg', 'sb-carimbo-oficial.jpg', 'sb-carimbo-recortado.jpg',
    'dayane-lima-perfil-autoridade.jpg', 'dayane-lima-perfil-studio.jpg', 'dayane-apresentacao-oficial.jpg',
    '_crop_bot.jpg', '_crop_mid.jpg', '_crop_top.jpg', '_thumb_stamp.jpg',
    'baixar_imagens.py', 'links.txt'
}

items = []
count = 0

TITLES = {
    'resultado-megahair-invisivel-raiz.jpg': ('megahair', 'Mega Hair', 'Aplicação de Nanocápsulas na Raiz • Fusão Invisível'),
    'resultado-penteado-mega-hair-morena.jpg': ('megahair', 'Mega Hair', 'Resultado de Mega Hair • Densidade e Balanço Natural'),
    'cabelos-humanos-selecionados.jpg': ('megahair', 'Mega Hair', 'Acervo Exclusivo de Cabelos 100% Humanos Selecionados'),
    'detalhe-penteado-mega-hair.jpg': ('megahair', 'Mega Hair', 'Acabamento de Nuca Limpa e Divisão Geométrica'),
    'resultado-cabelo-brilho-espelhado.jpg': ('megahair', 'Mega Hair', 'Alinhamento Térmico com Reflexo Espelhado e Sedosidade'),
    'video-transformacao-cabelo-ruivo_t26.jpg': ('mechas', 'Mechas & Loiros', 'Transformação em Ruivo Nobre com Brilho Tridimensional'),
    'resultado-cabelo-ruivo-cilios.jpg': ('mechas', 'Mechas & Loiros', 'Coloração Nobre com Harmonização Facial'),
    'resultado-mechas-luxo-morena.jpg': ('mechas', 'Mechas & Loiros', 'Morena Iluminada Avelã sob Luz Natural'),
    'resultado-mechas-morena-iluminada.jpg': ('mechas', 'Mechas & Loiros', 'Micro-mechas sem Marcação com Infusão Lipídica'),
    'resultado-cilios-macro-fioafio.jpg': ('olhar', 'Olhar & Cílios', 'Extensão de Cílios Fio a Fio com Fios de Seda Levíssimos'),
    'resultado-sobrancelhas-simetria.jpg': ('olhar', 'Olhar & Cílios', 'Design de Sobrancelhas com Proporção Áurea Facial'),
    'resultado-cilios-sobrancelhas.jpg': ('olhar', 'Olhar & Cílios', 'Harmonização Integrada de Cílios e Sobrancelhas'),
    'resultado-sobrancelhas-design-henna.jpg': ('olhar', 'Olhar & Cílios', 'Design de Sobrancelhas com Tintura Personalizada'),
    'resultado-procedimento-sobrancelhas.jpg': ('olhar', 'Olhar & Cílios', 'Mapeamento Milimétrico com Paquímetro'),
    'resultado-unhas-francesa-joia.jpg': ('espaco', 'Ateliê & Cuidados', 'Alongamento em Gel com Francesa Joia por Emily Nails'),
    'resultado-unhas-alongamento-babyboomer.jpg': ('espaco', 'Ateliê & Cuidados', 'Alongamento em Fibra com Efeito Babyboomer'),
    'resultado-bronze-marquinha-fita.jpg': ('espaco', 'Ateliê & Cuidados', 'Bronzeamento em Cabine com Marquinha Milimétrica'),
    'resultado-terapia-spa-lavatorio.jpg': ('espaco', 'Espaço Físico', 'Ritual de Lavatório Spa Climatizado com Massagem Craniana'),
    'espaco-clinica-fachada-entrada.jpg': ('espaco', 'Espaço Físico', 'Fachada e Entrada Oficial no Bairro Monte Carmelo'),
    'espaco-recepcao-sb-estetica.jpg': ('espaco', 'Espaço Físico', 'Recepção Clean e Acolhedora da SB Estética'),
    'espaco-salao-atendimento-dayane.jpg': ('espaco', 'Espaço Físico', 'Bancadas de Atendimento com Iluminação Neutra'),
    'espaco-cabine-bronzeamento.jpg': ('espaco', 'Espaço Físico', 'Cabine Tecnológica Privativa de Bronzeamento'),
    'video-cabelo-brilho-movimento.mp4': ('megahair', 'Mega Hair', 'Caimento Fluido e Brilho dos Fios 100% Humanos'),
    'video-aplicacao-megahair-raiz.mp4': ('megahair', 'Mega Hair', 'Aplicação Técnica de Nanocápsulas Mecha a Mecha'),
    'video-megahair-transformacao-real.mp4': ('megahair', 'Mega Hair', 'Transformação Real de Mega Hair no Ateliê'),
    'video-megahair-fita-nanocapsulas.mp4': ('megahair', 'Mega Hair', 'Integração de Fita Invisível e Nanocápsulas'),
    'video-megahair-alinhamento-liso.mp4': ('megahair', 'Mega Hair', 'Alinhamento e Escovação de Mega Hair'),
    'video-manutencao-megahair-invisivel.mp4': ('megahair', 'Mega Hair', 'Manutenção Preventiva com Preservação da Raiz'),
    'video-dayane-apresentando-megahair.mp4': ('megahair', 'Mega Hair', 'Demonstração de Densidade e Pontas Cheias'),
    'video-estoque-cabelos-premium.mp4': ('megahair', 'Mega Hair', 'Seleção de Fios Virgens com Cutícula Intacta'),
    'video-transformacao-antes-depois.mp4': ('megahair', 'Mega Hair', 'Antes e Depois • Transformação Completa de Comprimento'),
    'video-mechas-morena-iluminada-fhd.mp4': ('mechas', 'Mechas & Loiros', 'Morena Iluminada em Alta Definição sob a Luz Solar'),
    'video-mechas-morena-iluminada.mp4': ('mechas', 'Mechas & Loiros', 'Transição Suave de Mechas sem Linha de Demarcação'),
    'video-transformacao-cabelo-ruivo.mp4': ('mechas', 'Mechas & Loiros', 'Coloração Ruivo Nobre com Nutrição Profunda'),
    'video-cilios-espuma-spa.mp4': ('olhar', 'Olhar & Cílios', 'Higienização Spa Preparatória para Extensão de Cílios'),
    'video-cilios-e-sobrancelhas-olhar.mp4': ('olhar', 'Olhar & Cílios', 'Harmonização Ocular Completa por Rayssa Lash'),
    'video-sobrancelhas-visagismo.mp4': ('olhar', 'Olhar & Cílios', 'Visagismo e Desenho de Sobrancelhas por Hillery Thauanne'),
    'video-procedimento-sobrancelhas.mp4': ('olhar', 'Olhar & Cílios', 'Alinhamento e Simetria com Henna Personalizada'),
    'video-unhas-gel-emily-nails.mp4': ('espaco', 'Ateliê & Cuidados', 'Estruturação em Gel e Curvatura C por Emily Lima'),
    'video-bronze-cabine-maquina.mp4': ('espaco', 'Espaço Físico', 'Sessão na Cabine Tecnológica Sol & Bronze'),
    'video-terapia-lavatorio-barbara.mp4': ('espaco', 'Espaço Físico', 'Terapia Capilar no Lavatório Climatizado'),
    'video-dayane-atendimento-salao.mp4': ('espaco', 'Espaço Físico', 'Atendimento Consultivo Personalizado no Ateliê'),
    'video-dayane-recepcao-consultoria.mp4': ('espaco', 'Espaço Físico', 'Recepção e Avaliação Diagnóstica Individualizada'),
    'video-mimos-equipe-dayane-lima.mp4': ('espaco', 'Espaço Físico', 'Cuidado e Boas-Vindas da Equipe SB Estética')
}

for f in sorted(files):
    if f in excluded:
        continue
    is_video = f.lower().endswith('.mp4')
    is_image = f.lower().endswith(('.jpg', '.jpeg', '.png'))
    if not (is_video or is_image):
        continue
    
    encoded_name = urllib.parse.quote(f)
    src = f'/midias/{encoded_name}'
    
    if f in TITLES:
        cat, cat_label, title = TITLES[f]
    else:
        lower_f = f.lower()
        if any(k in lower_f for k in ['cilios', 'lash', 'sobrancelha', 'hillery', 'olhar']):
            cat = 'olhar'
            cat_label = 'Olhar & Cílios'
            title = 'Harmonização do Olhar • Procedimento Real'
        elif any(k in lower_f for k in ['mechas', 'loiro', 'morena', 'ruivo', 'color']):
            cat = 'mechas'
            cat_label = 'Mechas & Loiros'
            title = 'Mechas & Iluminação • Resultado no Ateliê'
        elif any(k in lower_f for k in ['unhas', 'emily', 'nails', 'bronze', 'spa', 'lavatorio', 'salao', 'espaco', 'fachada', 'recepcao', 'barbara']):
            cat = 'espaco'
            cat_label = 'Ateliê & Espaço'
            title = 'Estrutura & Cuidado no Ateliê Monte Carmelo'
        else:
            cat = 'megahair'
            cat_label = 'Mega Hair'
            title = 'Aplicação e Caimento de Mega Hair • Registro Real'

    items.append({
        'id': f'media-{count:03d}',
        'src': src,
        'fileName': f,
        'type': 'video' if is_video else 'image',
        'category': cat,
        'categoryLabel': cat_label,
        'title': title
    })
    count += 1

ts_code = """// Acervo Real de Bastidores e Transformações - Dayane Lima • SB Estética e Beleza
// Registros autênticos auditados, sem logotipos ou fotografias institucionais nos resultados.
export interface MediaArchiveItem {
  id: string;
  src: string;
  fileName: string;
  type: "video" | "image";
  category: "megahair" | "mechas" | "olhar" | "espaco";
  categoryLabel: string;
  title: string;
}

export const MEDIA_ARCHIVE: MediaArchiveItem[] = """ + json.dumps(items, indent=2, ensure_ascii=False) + """;
"""

with open('src/data/mediaArchive.ts', 'w', encoding='utf-8') as out:
    out.write(ts_code)

print(f"Generated mediaArchive.ts with {len(items)} pristine authentic items.")
