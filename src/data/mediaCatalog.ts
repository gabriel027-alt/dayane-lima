// Acervo Oficial Auditado: SB Estética e Beleza • Dayane Lima
// Mapeamento estrito baseado exclusivamente nos ficheiros existentes em public/midias/

export type MediaCategory = 
  | "megahair" 
  | "mechas" 
  | "olhar" 
  | "unhas" 
  | "bronze" 
  | "laser" 
  | "espaco";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt: string;
  label: string;
}

export interface MediaCatalogItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  category: MediaCategory;
  categoryLabel: string;
  sourceUrl?: string;
  author: string;
}

// =========================================================================
// 1. MEGA HAIR DE NANOCÁPSULAS (3 vídeos exclusivos de nanocápsulas e alongamento)
// =========================================================================
export const MEGAHAIR_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/video-megahair-dayane1.mp4",
    alt: "Aplicação técnica de Mega Hair de Nanocápsulas por Dayane Lima",
    label: "Mega Hair de Nanocápsulas • Aplicação Artesanal",
  },
  {
    type: "video",
    src: "/midias/video-megahair-dayane2.mp4",
    alt: "Balanço e caimento indetectável do mega hair sob a luz do dia",
    label: "Movimento Fluido & Balanço Indetectável",
  },
  {
    type: "video",
    src: "/midias/video-megahair-dayane3.mp4",
    alt: "Finalização com densidade nobre e preservação da raiz folicular",
    label: "Densidade Nobre & Preservação da Raiz",
  },
];

// =========================================================================
// 2. MECHAS, LOIROS NOBRES & BALAYAGE DE LUXO (9 mídias exclusivas)
// =========================================================================
export const MECHAS_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "image",
    src: "/midias/cabelo3-dayane.jpg",
    alt: "Balayage de luxo e cabelos iluminados com mechas douradas por Dayane Lima",
    label: "Mechas, Loiros Nobres & Balayage de Luxo",
  },
  {
    type: "video",
    src: "/midias/cabelo2-dayane.mp4",
    alt: "Morena iluminada com reflexos avelã e caramelo sob luz natural",
    label: "Morena Iluminada sob a Luz Natural",
  },
  {
    type: "video",
    src: "/midias/cabelo4-dayane.mp4",
    alt: "Ondas sofisticadas e reflexo vitrificado pós-mechas",
    label: "Ondas Nobres & Brilho Acetinado",
  },
  {
    type: "video",
    src: "/midias/cabelo5-dayane.mp4",
    alt: "Loiro perolado nobre com integridade elástica da fibra capilar",
    label: "Loiro Nobre com Preservação da Fibra",
  },
  {
    type: "video",
    src: "/midias/cabelo6-dayane.mp4",
    alt: "Degradê orgânico com transição milimétrica e suave",
    label: "Degradê Orgânico & Balayage a Mão Livre",
  },
  {
    type: "video",
    src: "/midias/cabelo7-dayane.mp4",
    alt: "Transformação capilar de alto impacto com comprimento e volume",
    label: "Transformação Completa & Densidade Folicular",
  },
  {
    type: "video",
    src: "/midias/cabelo8-dayane.mp4",
    alt: "Balanço sedoso e distribuição anatômica de mechas",
    label: "Movimento Natural & Reflexos Dourados",
  },
  {
    type: "video",
    src: "/midias/cabelo9-dayane.mp4",
    alt: "Cutículas seladas e textura suave ao toque",
    label: "Cutículas Seladas & Toque Sedoso",
  },
  {
    type: "video",
    src: "/midias/video-cabelo-hidratação-lavagem-dayane1.mp4",
    alt: "Terapia capilar e lavatório spa com hidratação profunda",
    label: "Spa Capilar & Hidratação Profunda",
  },
];

export const CABELO_GALLERY_ITEMS: GalleryItem[] = [
  ...MEGAHAIR_GALLERY_ITEMS,
  ...MECHAS_GALLERY_ITEMS,
];

// =========================================================================
// 2. HARMONIZAÇÃO DO OLHAR: CÍLIOS & SOBRANCELHAS (17 mídias exclusivas)
// =========================================================================
export const OLHAR_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/cilios-sobrancelha3-dayane.mp4",
    alt: "Acoplagem milimétrica fio a fio com fios de seda ultraleves",
    label: "Isolamento Fio a Fio & Leveza Extrema",
  },
  {
    type: "video",
    src: "/midias/cilios-sobrancelha8-dayane.mp4",
    alt: "Curvatura harmônica personalizada de acordo com a fisionomia",
    label: "Harmonização Facial & Curvatura Harmônica",
  },
  {
    type: "video",
    src: "/midias/cilios-sobrancelha10-dayane.mp4",
    alt: "Mapeamento das sobrancelhas com visagismo em proporção áurea",
    label: "Design Visagista & Proporção Áurea",
  },
  {
    type: "video",
    src: "/midias/cilios-sobrancelha12-dayane.mp4",
    alt: "Spa micelar oftálmico preparatório com espuma nutritiva",
    label: "Higienização Oftálmica & Spa do Olhar",
  },
  {
    type: "video",
    src: "/midias/cilios-sobrancelha13-dayane.mp4",
    alt: "Volume brasileiro delicado com retenção prolongada",
    label: "Volume Brasileiro com Fios Leves",
  },
  {
    type: "video",
    src: "/midias/cilios-sobrancelha15-dayane.mp4",
    alt: "Expressividade e abertura do olhar sem peso nas pálpebras",
    label: "Expressividade Natural do Olhar",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha1-dayane.jpg",
    alt: "Extensão de cílios clássica com efeito natural",
    label: "Acoplagem de Precisão Fio a Fio",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha2-dayane.jpg",
    alt: "Alinhamento e simetria áurea das sobrancelhas",
    label: "Simetria e Desenho de Sobrancelhas",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha4-dayane.jpg",
    alt: "Curvatura e valorização do contorno dos olhos",
    label: "Curvatura e Abertura do Olhar",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha5-dayane.jpg",
    alt: "Harmonização visagista facial completa",
    label: "Harmonização Facial Sob Medida",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha6-dayane.jpg",
    alt: "Isolamento delicado sem contato do adesivo com a pele",
    label: "Fixação Delicada sem Contato Dérmico",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha7-dayane.jpg",
    alt: "Design com pigmentação suave gradiente em degradê",
    label: "Pigmentação Gradiente & Sombreamento",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha9-dayane.jpg",
    alt: "Fios em Y com retenção estendida e toque macio",
    label: "Volume Sofisticado de Alta Retenção",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha11-dayane.jpg",
    alt: "Mapeamento geométrico com paquímetro digital",
    label: "Mapeamento com Paquímetro de Precisão",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha14-dayane.jpg",
    alt: "Efeito lifting ocular natural sem intervenção invasiva",
    label: "Efeito Lifting Ocular Natural",
  },
  {
    type: "image",
    src: "/midias/cilios-sobrancelha16-dayane.jpg",
    alt: "Densidade harmônica para elegância no cotidiano",
    label: "Densidade Elegante para o Cotidiano",
  },
];

// =========================================================================
// 3. ARQUITETURA UNGUEAL: FIBRA & GEL (6 mídias exclusivas)
// =========================================================================
export const UNHAS_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/video-unhas-dayane1.mp4",
    alt: "Estruturação em gel tixotrópico com curvatura C anatômica",
    label: "Alongamento em Gel & Curvatura C",
  },
  {
    type: "video",
    src: "/midias/video-unhas-dayane2.mp4",
    alt: "Borda livre fina sem espessura artificial e alta resistência",
    label: "Borda Livre Fina & Resistência Máxima",
  },
  {
    type: "video",
    src: "/midias/video-unhas-dayane3.mp4",
    alt: "Blindagem diamante com acabamento vitrificado prolongado",
    label: "Blindagem Diamante com Retenção 25+ Dias",
  },
  {
    type: "video",
    src: "/midias/unha-dayane5.mp4",
    alt: "Aplicação de fibra de vidro pura com transparência vítrea",
    label: "Fibra de Vidro com Caimento Natural",
  },
  {
    type: "video",
    src: "/midias/unha-dayane6.mp4",
    alt: "Esmaltação em gel com brilho espelhado que não descasca",
    label: "Esmaltação em Gel & Brilho Espelhado",
  },
  {
    type: "image",
    src: "/midias/unha-dayane4.jpg",
    alt: "Design ungueal de alta precisão por Emily Lima",
    label: "Nail Art Minimalista & Sofisticada",
  },
];

// =========================================================================
// 4. BRONZEAMENTO EM CABINE & MARQUINHA DE SOL (12 mídias exclusivas)
// =========================================================================
export const BRONZE_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/video-bronzeamento-dayane.mp4",
    alt: "Sessão de bronzeamento em cabine tecnológica com controle de exposição",
    label: "Bronzeamento em Cabine Tecnológica",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane1.jpg",
    alt: "Marquinha anatômica milimétrica com fita cirúrgica",
    label: "Marquinha Anatômica Sob Medida",
  },
  {
    type: "video",
    src: "/midias/video-bronzeamento-dayane2.mp4",
    alt: "Cabine privativa com climatização e biossegurança total",
    label: "Cabine Privativa & Conforto Térmico",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane2.jpg",
    alt: "Tom dourado natural e homogêneo",
    label: "Tom Dourado Homogêneo",
  },
  {
    type: "video",
    src: "/midias/video-bronzeamento-dayane10.mp4",
    alt: "Tom dourado homogêneo e bronzeado saudável o ano todo",
    label: "Tom Dourado Uniforme e Duradouro",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane3.jpg",
    alt: "Protocolo nutritivo pós-bronze com hidratação",
    label: "Nutrição & Fixação do Bronze",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane4.jpg",
    alt: "Exposição controlada e biossegura em cabine",
    label: "Exposição Segura por Fototipo",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane5.jpg",
    alt: "Pele iluminada e radiante pós-sessão de bronze",
    label: "Pele Iluminada & Radiante",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane6.jpg",
    alt: "Definição milimétrica da marquinha de biquíni de fita",
    label: "Definição de Marquinha Perfeita",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane7.jpg",
    alt: "Acabamento acetinado e dourado profundo",
    label: "Acabamento Dourado Acetinado",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane8.jpg",
    alt: "Calibragem rigorosa respeitando o tom da pele",
    label: "Calibragem Personalizada",
  },
  {
    type: "image",
    src: "/midias/foto-bronzeamento-dayane9.jpg",
    alt: "Viço e brilho dourado saudável sob a luz",
    label: "Glow Dourado Saudável",
  },
];

// =========================================================================
// 5. DEPILAÇÃO A LASER SUBZERO (Vídeo de demonstração clínica)
// =========================================================================
export const LASER_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/video-depilação-lazer-dayane1.mp4",
    alt: "Sessão de depilação a laser com ponteira Subzero resfriada a -10°C",
    label: "Laser Subzero Resfriado a -10°C • Demonstração Clínica",
  },
];

// =========================================================================
// 6. ESPAÇO, FACHADA & ATELIÊ (Vídeos reais do ateliê)
// =========================================================================
export const ESPACO_GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/midias/video-fachadadosalão-dayane1.mp4",
    alt: "Fachada elegante e reservada na Rua Calcedônia, 155 - Monte Carmelo",
    label: "Fachada Reservada • Monte Carmelo",
  },
  {
    type: "video",
    src: "/midias/video-dayane-apresentação-serviços1.mp4",
    alt: "Apresentação oficial dos rituais de beleza por Dayane Lima",
    label: "Boas-vindas & Apresentação Institucional",
  },
];

// =========================================================================
// CATÁLOGO COMPLETO ESTRUTURADO COM METADADOS
// =========================================================================
export const MEDIA_CATALOG: MediaCatalogItem[] = [
  // --- Mega Hair ---
  {
    id: "mh-01",
    type: "video",
    src: "/midias/video-megahair-dayane1.mp4",
    title: "Aplicação em Nanocápsulas Invisíveis",
    subtitle: "Junções milimétricas moldadas artesanalmente mecha a mecha com zero tração na raiz.",
    category: "megahair",
    categoryLabel: "Mega Hair de Nanocápsulas",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/C7RGXNfNSFJ/",
    author: "Dayane Lima",
  },
  {
    id: "mh-02",
    type: "video",
    src: "/midias/video-megahair-dayane2.mp4",
    title: "Movimento Fluido & Balanço Indetectável",
    subtitle: "Caimento orgânico com fios brasileiros selecionados sob luz natural.",
    category: "megahair",
    categoryLabel: "Mega Hair de Nanocápsulas",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DHybqSox_VJ/",
    author: "Dayane Lima",
  },
  {
    id: "mh-03",
    type: "video",
    src: "/midias/video-megahair-dayane3.mp4",
    title: "Densidade Nobre & Preservação Folicular",
    subtitle: "Divisão geométrica que respeita o ciclo biológico de crescimento do cabelo natural.",
    category: "megahair",
    categoryLabel: "Mega Hair de Nanocápsulas",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DIBdXRpR6Q-/",
    author: "Dayane Lima",
  },

  // --- Mechas & Balayage ---
  {
    id: "mc-01",
    type: "video",
    src: "/midias/cabelo2-dayane.mp4",
    poster: "/midias/cabelo3-dayane.jpg",
    title: "Morena Iluminada em Luz Natural",
    subtitle: "Degradê orgânico com transição imperceptível e controle estrito de oxidação.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DJVbQxJM8rK/",
    author: "Dayane Lima",
  },
  {
    id: "mc-02",
    type: "video",
    src: "/midias/cabelo4-dayane.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Ondas Nobres & Brilho Acetinado",
    subtitle: "Finalização fluida com reposição lipídica e balanço sedoso após o clareamento.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DJZfCP5xv63/",
    author: "Dayane Lima",
  },
  {
    id: "mc-03",
    type: "video",
    src: "/midias/cabelo5-dayane.mp4",
    poster: "/midias/cabelo3-dayane.jpg",
    title: "Loiro Perolado Nobre",
    subtitle: "Clareamento de alta pureza sem alteração da integridade da queratina natural.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DMOqcrSpe0y/",
    author: "Dayane Lima",
  },
  {
    id: "mc-04",
    type: "video",
    src: "/midias/cabelo6-dayane.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Degradê Orgânico & Balayage",
    subtitle: "Esfumado contínuo com proteção molecular em tempo real.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/DXseaZzjJb5/",
    author: "Dayane Lima",
  },
  {
    id: "mc-05",
    type: "video",
    src: "/midias/cabelo7-dayane.mp4",
    poster: "/midias/cabelo3-dayane.jpg",
    title: "Transformação & Densidade Capilar",
    subtitle: "Resultado tridimensional com brilho acetinado sob o sol de Montes Claros.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/C8CTwziO4lI/",
    author: "Dayane Lima",
  },
  {
    id: "mc-06",
    type: "video",
    src: "/midias/cabelo8-dayane.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Movimento & Reflexos Dourados",
    subtitle: "Distribuição equilibrada de mechas com caimento fluido.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DLLF1JzJUi4/",
    author: "Dayane Lima",
  },
  {
    id: "mc-07",
    type: "video",
    src: "/midias/cabelo9-dayane.mp4",
    poster: "/midias/cabelo3-dayane.jpg",
    title: "Cutículas Seladas & Toque Sedoso",
    subtitle: "Selagem térmica e reposição hídrica nos fios descoloridos.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DJnTnhzJHjB/",
    author: "Dayane Lima",
  },
  {
    id: "mc-08",
    type: "video",
    src: "/midias/video-cabelo-hidratação-lavagem-dayane1.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Spa Capilar & Lavatório Relaxante",
    subtitle: "Massagem craniana e infusão de aminoácidos no lavatório privativo.",
    category: "mechas",
    categoryLabel: "Colorimetria & Balayage",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/CS28lSrj3af/",
    author: "Dayane Lima",
  },

  // --- Cílios & Sobrancelhas ---
  {
    id: "ol-01",
    type: "video",
    src: "/midias/cilios-sobrancelha3-dayane.mp4",
    poster: "/midias/cilios-sobrancelha1-dayane.jpg",
    title: "Isolamento Fio a Fio Anatômico",
    subtitle: "Fios de seda ultraleves com acoplagem milimétrica e retenção estendida.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/reel/CnXp9YbhN2o/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-02",
    type: "video",
    src: "/midias/cilios-sobrancelha8-dayane.mp4",
    poster: "/midias/cilios-sobrancelha2-dayane.jpg",
    title: "Harmonização e Curvatura do Olhar",
    subtitle: "Curvatura harmônica personalizada que valoriza a expressividade facial.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/_eu__rayssa/reel/DLd6UIAO4ws/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-03",
    type: "video",
    src: "/midias/cilios-sobrancelha10-dayane.mp4",
    poster: "/midias/cilios-sobrancelha4-dayane.jpg",
    title: "Design Visagista das Sobrancelhas",
    subtitle: "Alinhamento milimétrico em proporção áurea facial.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/hillerythauanne/reel/DRDhXIXEcJH/",
    author: "Hillery Thauanne",
  },
  {
    id: "ol-04",
    type: "video",
    src: "/midias/cilios-sobrancelha12-dayane.mp4",
    poster: "/midias/cilios-sobrancelha5-dayane.jpg",
    title: "Spa Micelar Ocular",
    subtitle: "Higienização preparatória calmante antes da acoplagem fio a fio.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/reel/CzlyrYdORS0/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-05",
    type: "video",
    src: "/midias/cilios-sobrancelha13-dayane.mp4",
    poster: "/midias/cilios-sobrancelha6-dayane.jpg",
    title: "Volume Brasileiro & Densidade",
    subtitle: "Preenchimento delicado com fios leves em formato Y.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/reel/Cpn7nTsgLFh/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-06",
    type: "video",
    src: "/midias/cilios-sobrancelha15-dayane.mp4",
    poster: "/midias/cilios-sobrancelha7-dayane.jpg",
    title: "Expressividade & Conforto Ocular",
    subtitle: "Extensão imperceptível ao piscar com máxima leveza.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/reel/CxyNdMXOx-E/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-07",
    type: "image",
    src: "/midias/cilios-sobrancelha1-dayane.jpg",
    title: "Extensão Clássica Fio a Fio",
    subtitle: "Isolamento anatômico com curvatura suave.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/DIkAMNdOIug/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-08",
    type: "image",
    src: "/midias/cilios-sobrancelha2-dayane.jpg",
    title: "Simetria Áurea das Sobrancelhas",
    subtitle: "Desenho personalizado conforme a estrutura óssea facial.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/hillerythauanne/p/DRkuUojEQH2/",
    author: "Hillery Thauanne",
  },
  {
    id: "ol-09",
    type: "image",
    src: "/midias/cilios-sobrancelha4-dayane.jpg",
    title: "Curvatura Dourada & Abertura",
    subtitle: "Valorização dos pontos focais dos olhos.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/C3G52c1u2VE/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-10",
    type: "image",
    src: "/midias/cilios-sobrancelha5-dayane.jpg",
    title: "Harmonização Visagista Integrada",
    subtitle: "Olhar expressivo sem exageros visuais.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/hillerythauanne/p/DQxjV5jEV9G/",
    author: "Hillery Thauanne",
  },
  {
    id: "ol-11",
    type: "image",
    src: "/midias/cilios-sobrancelha6-dayane.jpg",
    title: "Fixação Segura sem Contato Dérmico",
    subtitle: "Preservação integral do folículo dos cílios naturais.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/C1f3o4JOaHv/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-12",
    type: "image",
    src: "/midias/cilios-sobrancelha7-dayane.jpg",
    title: "Design com Pigmentação Gradiente",
    subtitle: "Sombreado delicado que preenche falhas naturais.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/hillerythauanne/p/DS5eb9XkRzS/",
    author: "Hillery Thauanne",
  },
  {
    id: "ol-13",
    type: "image",
    src: "/midias/cilios-sobrancelha9-dayane.jpg",
    title: "Volume em Y com Toque Sedoso",
    subtitle: "Fios tecnológicos com acoplagem anatômica perfeita.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/CzR3KJJubE7/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-14",
    type: "image",
    src: "/midias/cilios-sobrancelha11-dayane.jpg",
    title: "Mapeamento em Paquímetro Digital",
    subtitle: "Medições milimétricas para sobrancelhas equilibradas.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/hillerythauanne/p/DTLL4bXkbsh/",
    author: "Hillery Thauanne",
  },
  {
    id: "ol-15",
    type: "image",
    src: "/midias/cilios-sobrancelha14-dayane.jpg",
    title: "Efeito Lifting Natural do Olhar",
    subtitle: "Abertura dos olhos com elegância e sofisticação.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/CpDON8AOAMg/",
    author: "Rayssa Lash",
  },
  {
    id: "ol-16",
    type: "image",
    src: "/midias/cilios-sobrancelha16-dayane.jpg",
    title: "Densidade Equilibrada para o Dia a Dia",
    subtitle: "Praticidade diária sem necessidade de rímel.",
    category: "olhar",
    categoryLabel: "Cílios & Sobrancelhas",
    sourceUrl: "https://www.instagram.com/rayssa.lash/p/Co1kbQVOd1K/",
    author: "Rayssa Lash",
  },


  // --- Unhas ---
  {
    id: "un-01",
    type: "video",
    src: "/midias/video-unhas-dayane1.mp4",
    poster: "/midias/unha-dayane4.jpg",
    title: "Alongamento em Gel & Curvatura C",
    subtitle: "Ponto de tensão milimétrico sem espessura na borda livre.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/reel/DCWyuVLOVru/",
    author: "Emily Lima Nails",
  },
  {
    id: "un-02",
    type: "video",
    src: "/midias/video-unhas-dayane2.mp4",
    poster: "/midias/unha-dayane4.jpg",
    title: "Borda Livre Fina & Alta Resistência",
    subtitle: "Resistência estrutural com aspecto idêntico à unha natural.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/reel/DB_fM3vOMzI/",
    author: "Emily Lima Nails",
  },
  {
    id: "un-03",
    type: "video",
    src: "/midias/video-unhas-dayane3.mp4",
    poster: "/midias/unha-dayane4.jpg",
    title: "Blindagem Diamante com Retenção 25+",
    subtitle: "Acabamento vitrificado que protege as unhas naturais contra quebra.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/reel/CpC2xHGpacV/",
    author: "Emily Lima Nails",
  },
  {
    id: "un-04",
    type: "video",
    src: "/midias/unha-dayane5.mp4",
    poster: "/midias/unha-dayane4.jpg",
    title: "Alongamento em Fibra de Vidro Pura",
    subtitle: "Aderência molecular de alta tecnologia sem ardência na cabine.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/reel/Cn193CcrmLh/",
    author: "Emily Lima Nails",
  },
  {
    id: "un-05",
    type: "video",
    src: "/midias/unha-dayane6.mp4",
    poster: "/midias/unha-dayane4.jpg",
    title: "Esmaltação em Gel & Brilho Espelhado",
    subtitle: "Secagem instantânea sob LED com durabilidade estendida.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/reel/CmcwlyBp_Eq/",
    author: "Emily Lima Nails",
  },
  {
    id: "un-06",
    type: "image",
    src: "/midias/unha-dayane4.jpg",
    title: "Nail Art Minimalista & Sofisticada",
    subtitle: "Harmonização de formato amendoado e acabamento impecável.",
    category: "unhas",
    categoryLabel: "Alongamento em Fibra & Gel",
    sourceUrl: "https://www.instagram.com/emil.lylimanails/p/Co0JPSOOcFW/",
    author: "Emily Lima Nails",
  },

  // --- Bronzeamento ---
  {
    id: "br-01",
    type: "video",
    src: "/midias/video-bronzeamento-dayane.mp4",
    poster: "/midias/foto-bronzeamento-dayane1.jpg",
    title: "Bronzeamento em Cabine Tecnológica",
    subtitle: "Lâmpadas com espectro calibrado para bronze homogêneo e seguro.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DQaWhG5DGMF/",
    author: "Sol & Bronze",
  },
  {
    id: "br-02",
    type: "video",
    src: "/midias/video-bronzeamento-dayane2.mp4",
    poster: "/midias/foto-bronzeamento-dayane2.jpg",
    title: "Cabine Privativa & Conforto Térmico",
    subtitle: "Sala reservada com ventilação direcionada e biossegurança estrita.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/CWI2VoTlFlV/",
    author: "Sol & Bronze",
  },
  {
    id: "br-03",
    type: "video",
    src: "/midias/video-bronzeamento-dayane10.mp4",
    poster: "/midias/foto-bronzeamento-dayane3.jpg",
    title: "Tom Dourado Uniforme e Duradouro",
    subtitle: "Resultado homogêneo e luminoso sem manchas ou queimaduras.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DIeAFOxRKEc/",
    author: "Sol & Bronze",
  },
  {
    id: "br-04",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane1.jpg",
    title: "Marquinha Anatômica com Fita Cirúrgica",
    subtitle: "Montagem artesanal de biquíni de fita com linhas milimétricas.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/CeruaMMOlD1/",
    author: "Sol & Bronze",
  },
  {
    id: "br-05",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane2.jpg",
    title: "Tom Dourado Natural e Homogêneo",
    subtitle: "Ativação gradual da melanina com nutrição dérmica profunda.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/CaE6sEihYjZ/",
    author: "Sol & Bronze",
  },
  {
    id: "br-06",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane3.jpg",
    title: "Protocolo Nutritivo Pós-Bronze",
    subtitle: "Cosmecêuticos calmantes com pós-sol para fixação dourada.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/CZPaMmIuHTA/",
    author: "Sol & Bronze",
  },
  {
    id: "br-07",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane4.jpg",
    title: "Exposição Controlada & Segura",
    subtitle: "Temporizadores digitais rigorosos respeitando o fototipo da pele.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/CTC7BA6rj4u/",
    author: "Sol & Bronze",
  },
  {
    id: "br-08",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane5.jpg",
    title: "Pele Iluminada & Radiante",
    subtitle: "Luminosidade com textura acetinada ao toque.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/BxiPLAPFdyg/",
    author: "Sol & Bronze",
  },
  {
    id: "br-09",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane6.jpg",
    title: "Definição Milimétrica da Marquinha",
    subtitle: "Contraste nítido e estético com simetria corporal.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/BxdOGX5lSZj/",
    author: "Sol & Bronze",
  },
  {
    id: "br-10",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane7.jpg",
    title: "Acabamento Acetinado & Dourado",
    subtitle: "Preservação da barreira lipídica da pele durante o bronze.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/Bv6-3GMB5xt/",
    author: "Sol & Bronze",
  },
  {
    id: "br-11",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane8.jpg",
    title: "Calibragem Conforme Fototipo de Pele",
    subtitle: "Protocolo progressivo seguro para peles claras a morenas.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/C6Qyc3ELnl7/",
    author: "Sol & Bronze",
  },
  {
    id: "br-12",
    type: "image",
    src: "/midias/foto-bronzeamento-dayane9.jpg",
    title: "Viço & Brilho Sob a Luz Solar",
    subtitle: "Efeito glow dourado com hidratação acetinada.",
    category: "bronze",
    categoryLabel: "Bronzeamento em Cabine",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/C9KKjz-JkRX/",
    author: "Sol & Bronze",
  },

  // --- Laser ---
  {
    id: "ls-01",
    type: "video",
    src: "/midias/video-depilação-lazer-dayane1.mp4",
    title: "Laser Hakon Subzero a -10°C",
    subtitle: "Ponteira ultra refrigerada que anula a sensação térmica de dor com máxima eficácia.",
    category: "laser",
    categoryLabel: "Depilação a Laser Subzero",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/DIb_DttpgJq/",
    author: "Hakon Subzero",
  },

  // --- Espaço & Fachada ---
  {
    id: "es-01",
    type: "video",
    src: "/midias/video-fachadadosalão-dayane1.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Fachada Reservada • Monte Carmelo",
    subtitle: "Ateliê elegante e discreto localizado na Rua Calcedônia, 155, com fácil estacionamento.",
    category: "espaco",
    categoryLabel: "Ateliê Monte Carmelo",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/p/C6V_kN2rb6w/",
    author: "SB Estética e Beleza",
  },
  {
    id: "es-02",
    type: "video",
    src: "/midias/video-dayane-apresentação-serviços1.mp4",
    poster: "/midias/cabelo3-dayane.jpg",
    title: "Apresentação Oficial por Dayane Lima",
    subtitle: "Conheça os rituais integrados de beleza, visagismo e bem-estar do ateliê.",
    category: "espaco",
    categoryLabel: "Ateliê Monte Carmelo",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/reel/C7rwH1wONYq/",
    author: "Dayane Lima",
  },
  {
    id: "es-03",
    type: "video",
    src: "/midias/minivideo-logo.mp4",
    poster: "/midias/cabelo1-dayane.jpg",
    title: "Identidade Oficial SB Estética e Beleza",
    subtitle: "Selo de excelência e tradição em Monte Carmelo, Montes Claros.",
    category: "espaco",
    categoryLabel: "Ateliê Monte Carmelo",
    sourceUrl: "https://www.instagram.com/dayanelimaestetica/",
    author: "SB Estética e Beleza",
  },
];

// Função utilitária para filtragem estrita por categoria
export function getMediaByCategory(category: MediaCategory): MediaCatalogItem[] {
  return MEDIA_CATALOG.filter((item) => item.category === category);
}
