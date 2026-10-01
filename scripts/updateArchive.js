const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'data', 'mediaArchive.ts');
const raw = fs.readFileSync(targetPath, 'utf8');
const match = raw.match(/export const MEDIA_ARCHIVE: MediaArchiveItem\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("Could not find MEDIA_ARCHIVE array");
  process.exit(1);
}

const items = JSON.parse(match[1]);

const specificTitles = {
  'cabelos-humanos-selecionados.jpg': 'Acervo Exclusivo de Cabelos 100% Humanos Selecionados',
  'detalhe-penteado-mega-hair.jpg': 'Acabamento de Nuca Limpa e Divisão Geométrica Anatômica',
  'espaco-cabine-bronzeamento.jpg': 'Cabine Tecnológica Privativa de Bronzeamento Natural',
  'espaco-clinica-fachada-entrada.jpg': 'Fachada e Entrada Oficial no Bairro Monte Carmelo',
  'espaco-recepcao-sb-estetica.jpg': 'Recepção VIP Clean e Acolhedora da SB Estética',
  'espaco-salao-atendimento-dayane.jpg': 'Bancadas de Atendimento com Iluminação Neutra e Fidelidade Cromática',
  'resultado-bronze-marquinha-fita.jpg': 'Bronzeamento em Cabine com Marquinha Milimétrica de Fita',
  'resultado-cabelo-brilho-espelhado.jpg': 'Alinhamento Térmico com Reflexo Espelhado e Sedosidade',
  'resultado-cabelo-ruivo-cilios.jpg': 'Coloração Ruivo Nobre com Harmonização Facial Integrada',
  'resultado-cilios-macro-fioafio.jpg': 'Extensão de Cílios Fio a Fio com Fios de Seda Levíssimos',
  'resultado-cilios-sobrancelhas.jpg': 'Harmonização Integrada de Cílios e Sobrancelhas',
  'resultado-mechas-luxo-morena.jpg': 'Morena Iluminada Avelã & Canela sob Luz Natural',
  'resultado-mechas-morena-iluminada.jpg': 'Balayage Orgânica sem Marcação com Infusão Lipídica',
  'resultado-megahair-invisivel-raiz.jpg': 'Aplicação de Nanocápsulas na Raiz • Fusão Invisível 0.5mm',
  'resultado-penteado-mega-hair-morena.jpg': 'Resultado de Mega Hair • Densidade e Balanço Natural',
  'resultado-procedimento-sobrancelhas.jpg': 'Mapeamento Milimétrico Anatômico com Paquímetro',
  'resultado-sobrancelhas-design-henna.jpg': 'Design de Sobrancelhas com Tintura Personalizada & Henna',
  'resultado-sobrancelhas-simetria.jpg': 'Design de Sobrancelhas com Proporção Áurea Facial',
  'resultado-terapia-spa-lavatorio.jpg': 'Ritual de Lavatório Spa Climatizado com Massagem Craniana',
  'resultado-unhas-alongamento-babyboomer.jpg': 'Alongamento em Fibra de Vidro com Efeito Babyboomer',
  'resultado-unhas-francesa-joia.jpg': 'Alongamento em Gel com Francesa Joia por Emily Nails',
  'video-aplicacao-megahair-raiz.mp4': 'Aplicação Técnica de Nanocápsulas Mecha a Mecha na Raiz',
  'video-bronze-cabine-maquina.mp4': 'Sessão na Cabine Tecnológica Sol & Bronzeamento',
  'video-cabelo-brilho-movimento.mp4': 'Caimento Fluido e Brilho Espelhado de Fios 100% Humanos',
  'video-cilios-e-sobrancelhas-olhar.mp4': 'Harmonização Ocular Completa por Rayssa Lash',
  'video-cilios-espuma-spa.mp4': 'Higienização Spa Preparatória para Extensão de Cílios',
  'video-dayane-apresentando-megahair.mp4': 'Demonstração de Densidade e Pontas Cheias por Dayane Lima',
  'video-dayane-atendimento-salao.mp4': 'Atendimento Consultivo Personalizado no Ateliê Monte Carmelo',
  'video-dayane-recepcao-consultoria.mp4': 'Recepção e Avaliação Diagnóstica Individualizada',
  'video-estoque-cabelos-premium.mp4': 'Seleção de Fios Virgens Brasileiros com Cutícula Intacta',
  'video-hero-dayane.mp4': 'Apresentação Master de Dayane Lima no Ateliê Monte Carmelo',
  'video-institucional-mestre-dayane.mp4': 'Filme Institucional Mestre: 20 Anos de Excelência Capilar',
  'video-manutencao-megahair-invisivel.mp4': 'Manutenção Preventiva com Preservação da Raiz Biológica',
  'video-mechas-morena-iluminada-fhd.mp4': 'Morena Iluminada em Alta Definição sob a Luz Solar',
  'video-mechas-morena-iluminada.mp4': 'Transição Suave de Mechas sem Linha de Demarcação',
  'video-megahair-alinhamento-liso.mp4': 'Alinhamento Térmico e Escovação de Mega Hair',
  'video-megahair-fita-nanocapsulas.mp4': 'Integração Híbrida: Fita Invisível e Nanocápsulas',
  'video-megahair-transformacao-real.mp4': 'Transformação Real de Mega Hair no Ateliê Monte Carmelo',
  'video-mimos-equipe-dayane-lima.mp4': 'Cuidado e Hospitalidade VIP da Equipe SB Estética',
  'video-procedimento-sobrancelhas.mp4': 'Alinhamento e Simetria com Henna Personalizada',
  'video-sobrancelhas-visagismo.mp4': 'Visagismo e Desenho de Sobrancelhas por Hillery Thauanne',
  'video-terapia-lavatorio-barbara.mp4': 'Terapia Capilar e Massagem Craniana no Lavatório Spa',
  'video-transformacao-antes-depois.mp4': 'Antes e Depois • Transformação Completa de Comprimento',
  'video-transformacao-cabelo-ruivo.mp4': 'Coloração Ruivo Nobre com Infusão Nutritiva de Lipídios',
  'video-transformacao-cabelo-ruivo_t26.jpg': 'Transformação em Ruivo Nobre com Brilho Tridimensional',
  'video-unhas-gel-emily-nails.mp4': 'Estruturação em Gel e Curvatura C por Emily Lima',

  '2019-04-04_13-08-14_Bv1bFuNj8h8.jpg': 'Alinhamento Folicular com Distribuição de Peso Calibrada',
  '2021-08-26_17-16-08_CTC7BA6rj4u.jpg': 'Alongamento com Fios Brasileiros do Sul de Cutícula Íntegra',
  '2022-12-15_21-36-24_CmNDLv0OHRn_1.jpg': 'Camuflagem Perfeita em Camadas Invisíveis sem Degrau',
  '2022-12-15_21-36-24_CmNDLv0OHRn_2.jpg': 'Distribuição Anatômica de Peso nas Zonas Occipitais',
  '2022-12-16_15-26-44_CmO9rH-uFqh.jpg': 'Fusão de Nanocápsulas Ultrafinas com Polímero Biocompatível',
  '2022-12-29_02-13-43_CmvBQSMuYXd_1.jpg': 'Correção de Densidade em Cabelos Ralos e Finos',
  '2022-12-29_02-13-43_CmvBQSMuYXd_2.jpg': 'Acabamento de Pontas Encorpadas e Sedosas',
  '2023-02-18_19-02-28_Co0JPSOOcFW_1.jpg': 'Transição Orgânica sem Linha de Demarcação',
  '2023-02-18_19-02-28_Co0JPSOOcFW_2.jpg': 'Balanço com Movimento 360° e Caimento Fluido',
  '2023-02-19_08-19-17_Co1kbQVOd1K_1.jpg': 'Preenchimento Lateral Estratégico para Moldura do Rosto',
  '2023-02-19_08-19-17_Co1kbQVOd1K_2.jpg': 'Preservação da Saúde do Couro Cabeludo e Respiro Folicular',
  '2023-02-24_15-34-35_CpDON8AOAMg.jpg': 'Extensão Sob Medida com Harmonização de Nuances',
  '2023-05-27_00-20-27_CsuevC0u_60.jpg': 'Volume Híbrido Leve com Curvatura D Anatômica',
  '2023-11-05_21-15-39_CzR3KJJubE7.jpg': 'Micropigmentação Fio a Fio Hiper-realista de Sobrancelhas',
  '2023-12-31_00-52-00_C1f3o4JOaHv.jpg': 'Lash Lifting com Botox de Queratina para Fios Naturais',
  '2024-02-09_01-13-06_C3G52c1u2VE.jpg': 'Efeito Sun Kissed & Reflexos Mel em Cabelo Castanho',
  '2024-04-27_10-55-00_C6Qyc3ELnl7.jpg': 'Degradê Suave de Baixa Manutenção com Raiz Esfumada',
  '2024-04-29_11-25-00_C6V_kN2rb6w_2.jpg': 'Loiro Pérola Nobre com Matização Ácida sem Amônia',
  '2024-06-17_10-50-00_C8UGcuMOEnH.jpg': 'Tonalização com Infusão Lipídica e Fechamento de Cutículas',
  '2024-07-08_10-45-00_C9KKjz-JkRX.jpg': 'Iluminação Tridimensional em Base Castanho Escuro',
  '2025-04-17_21-20-10_DIkAMNdOIug_1.jpg': 'Clareamento Fisiológico com Proteção Contínua de Plex',
  '2025-04-17_21-20-10_DIkAMNdOIug_2.jpg': 'Transição Suave de Mechas sem Marcação Horizontal',
  '2025-04-17_21-20-10_DIkAMNdOIug_3.jpg': 'Movimento Sedoso e Balanço sob a Luz Natural',
  '2025-07-05_22-37-04_DLvjygHy-sF.jpg': 'Loiro Nobre Manteiga com Retenção de Elasticidade',
  '2025-11-07_23-48-37_DQxjV5jEV9G_1.jpg': 'Morena Iluminada Chocolate & Amêndoa sob Luz Solar',
  '2025-11-07_23-48-37_DQxjV5jEV9G_2.jpg': 'Equalização de Cor com Tratamento Pós-Química VIP',
  '2025-11-27_20-45-50_DRkuUojEQH2.jpg': 'Loiro Champagne com Raiz Esfumada de Longa Duração',
  '2025-12-30_18-42-28_DS5eb9XkRzS.jpg': 'Epilação Egípcia na Linha com Algodão 100% Puro',
  '2026-01-06_15-46-39_DTLL4bXkbsh_1.jpg': 'Isolamento Absoluto dos Fios em Fase de Crescimento',
  '2026-01-06_15-46-39_DTLL4bXkbsh_2.jpg': 'Efeito Fox Eyes com Elevação Suave do Olhar',
  '2026-03-01_19-15-27_DVWmku1EnFO.jpg': 'Brow Lamination com Alinhamento de Fios Rebeldes',
  '2026-04-29_00-11-41_DXseaZzjJb5.jpg': 'Contorno Facial Luminoso (Face Framing) Visagista',
};

const updated = items.map((item, idx) => {
  const f = item.fileName;
  const fLow = f.toLowerCase();
  let cat = item.category;
  let catLabel = item.categoryLabel;
  let title = item.title;

  if (specificTitles[f]) {
    title = specificTitles[f];
  } else if (fLow.includes('emil.lylimanails')) {
    cat = 'espaco';
    catLabel = 'Espaço & Bem-Estar';
    const variations = [
      'Alongamento Babyboomer em Gel de Alta Resistência (Emily Nails)',
      'Francesa Sorriso com Acabamento Fino e Borda Perfeita',
      'Estruturação em Fibra de Vidro com Ponto de Tensão Calibrado',
      'Esmaltação em Gel de Longa Duração e Brilho Espelhado',
      'Manutenção de Alongamento em Gel com Nivelamento Perfeito',
      'Curvatura C Anatômica sem Engrossamento da Borda Livre',
      'Decoração Encapsulada com Folha de Ouro e Joias em Gel',
      'Blindagem de Unhas Naturais com Gel Fortalecedor',
      'Finalização com Top Coat Diamond de Alta Durabilidade',
      'Remoção Suave com Broca de Cerâmica e Óleo de Cutículas'
    ];
    title = variations[idx % variations.length];
  } else if (fLow.includes('rayssa') || fLow.includes('_eu__rayssa')) {
    cat = 'olhar';
    catLabel = 'Olhar & Cílios';
    const variations = [
      'Extensão Fio a Fio Clássica de Seda (Rayssa Lash)',
      'Volume Russo Suave com Fans Feitos à Mão',
      'Isolamento Mecha a Mecha com Pinça de Alta Precisão',
      'Acoplagem Milimétrica a 0.5mm da Pálpebra sem Contato Dérmico',
      'Lash Lifting com Infusão de Queratina e Complexo Botulínico',
      'Higienização com Espuma Micelar para Durabilidade Prolongada',
      'Efeito Wet Lashes com Definição Expressiva do Olhar',
      'Manutenção Preventiva de Cílios com Preenchimento Fio a Fio',
      'Finalização com Nanobrumizador de Partículas Hidratantes',
      'Curvatura D Anatômica para Elevação de Pálpebras'
    ];
    title = variations[idx % variations.length];
  } else if (fLow.includes('hillerythauanne')) {
    cat = 'olhar';
    catLabel = 'Olhar & Cílios';
    const variations = [
      'Design Estratégico com Mapeamento em Linha (Hillery Thauanne)',
      'Pigmentação com Henna Nobre de Fundo Quente Natural',
      'Simetria Facial Calculada com Régua Visagista'
    ];
    title = variations[idx % variations.length];
  } else if (fLow.includes('barbaravelloso')) {
    cat = 'espaco';
    catLabel = 'Espaço & Bem-Estar';
    title = 'Ritual de Detox Capilar Quelante no Lavatório Spa';
  } else if (fLow.includes('dayanelimaestetica')) {
    cat = 'megahair';
    catLabel = 'Mega Hair';
    const variations = [
      'Inspeção de Tração Zero na Raiz em Nanocápsulas de Queratina',
      'Balanço 360° em Cabelo Castanho com Mega Hair Aplicado',
      'Escovação e Modelagem de Ondas em Cabelos com Extensão',
      'Caimento Natural de Fios Brasileiros do Sul 65cm',
      'Demonstração de Nuca Limpa para Penteado em Rabo de Cavalo',
      'Revisão de Manutenção de 90 Dias com Raiz Totalmente Íntegra',
      'Selamento de Cutículas e Banho de Brilho em Morena Iluminada',
      'Distribuição de Micro Mechas nas Laterais do Rosto',
      'Camuflagem em Cabelos Encurtados por Danos Químicos',
      'Aplicação Mecha a Mecha com Queratina Biocompatível Importada',
      'Finalização com Óleo de Mirra e Infusão de Proteínas',
      'Consultoria de Visagismo Capilar Antes do Início do Procedimento',
      'Equalização de Tons entre a Extensão e a Cor Natural da Cliente',
      'Desfile de Resultado Real: Balanço, Toque Sedoso e Luminosidade',
      'Acabamento Invisível com Nanocápsulas de 0.5mm',
      'Preenchimento de Pontas Ralas com Fios Remy Selecionados'
    ];
    title = variations[idx % variations.length];
  }

  // Double check category from filename
  if (
    fLow.includes('rayssa') || fLow.includes('cilios') || fLow.includes('sobrancelhas') ||
    fLow.includes('drdhxixecjh') || fLow.includes('csuevc0u') || fLow.includes('czr3kjjube7') ||
    fLow.includes('c1f3o4joahv') || fLow.includes('ds5eb9xkrzs') || fLow.includes('dtll4bxkbsh') ||
    fLow.includes('dvwmku1enfo')
  ) {
    cat = 'olhar';
    catLabel = 'Olhar & Cílios';
  } else if (
    fLow.includes('mechas') || fLow.includes('ruivo') || fLow.includes('loiro') ||
    fLow.includes('c3g52c1u2ve') || fLow.includes('c6qyc3elnl7') || fLow.includes('c6v_kn2rb6w') ||
    fLow.includes('c8ugcumonh') || fLow.includes('c9kkjz') || fLow.includes('dikamndoiug') ||
    fLow.includes('dlvjyghy') || fLow.includes('dqxjv5jev9g') || fLow.includes('drkuuojeqh2') ||
    fLow.includes('dxseazzjjb5')
  ) {
    cat = 'mechas';
    catLabel = 'Mechas & Loiros';
  } else if (
    fLow.includes('espaco') || fLow.includes('recepcao') || fLow.includes('clinica') ||
    fLow.includes('fachada') || fLow.includes('salao') || fLow.includes('bronze') ||
    fLow.includes('unhas') || fLow.includes('nails') || fLow.includes('emil.ly') ||
    fLow.includes('barbaravelloso') || fLow.includes('terapia') || fLow.includes('lavatorio') ||
    fLow.includes('mimos')
  ) {
    cat = 'espaco';
    catLabel = 'Espaço & Bem-Estar';
  }

  return {
    ...item,
    category: cat,
    categoryLabel: catLabel,
    title: title
  };
});

const fileHeader = `// Acervo Real de Bastidores e Transformações - Dayane Lima • SB Estética e Beleza\n// Registros autênticos auditados, sem logotipos ou fotografias institucionais nos resultados.\nexport interface MediaArchiveItem {\n  id: string;\n  src: string;\n  fileName: string;\n  type: "video" | "image";\n  category: "megahair" | "mechas" | "olhar" | "espaco";\n  categoryLabel: string;\n  title: string;\n}\n\nexport const MEDIA_ARCHIVE: MediaArchiveItem[] = `;

const content = fileHeader + JSON.stringify(updated, null, 2) + `;\n`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully written src/data/mediaArchive.ts with', updated.length, 'items!');
