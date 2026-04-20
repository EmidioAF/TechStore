/**
 * Arquivo que centraliza todos os dados dos produtos da loja.
 * Responsabilidades:
 * - Armazena dados dos produtos localmente (mock data)
 * - Fornece um array reutilizável para toda a aplicação
 * 
 * Estrutura de cada produto:
 * - id: Identificador único (número)
 * - name: Nome descritivo do produto
 * - price: Preço formatado em Real (R$)
 * - category: Categoria (Periféricos, Monitores, Acessórios, Áudio)
 * - image: URL da imagem do produto
 * 
 * Em uma aplicação real, esses dados viriam de uma API/banco de dados
 */

export const products = [
  // PRODUTO 1: Mouse Gamer Logitech - Periférico principal para jogos
  {
    id: 1,
    name: 'Mouse Gamer Logitech G502 X LIGHTSPEED Branco',
    price: 'R$ 359,90',
    category: 'Periféricos', // Classificação: Periféricos de entrada
    image: 'https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502x-lightspeed/gallery/g502-x-lightspeed-mouse-top-angle-white-gallery-1.png',
  },
  
  // PRODUTO 2: Teclado Mecânico Redragon - Periférico para digitação/jogos
  {
    id: 2,
    name: 'Teclado Mecânico Redragon Lakshmi Switch Brown Layout 60% ABNT2 Preto K606-OG-BK-GY-PT-Brown',
    price: 'R$ 135,99',
    category: 'Periféricos', // Classificação: Periféricos de entrada
    image: 'https://images6.kabum.com.br/produtos/fotos/401376/teclado-gamer-redragon-lakshmi-switch-brown-layout-60-abnt2-preto-k606-og-bk-gy-pt-brown-_1700577178_gg.jpg',
  },
  
  // PRODUTO 3: Headset Gamer Redragon - Áudio para jogos/comunicação
  {
    id: 3,
    name: 'Headset Gamer Redragon Zeus Lite Preto P3 H510-lt Preto',
    price: 'R$ 199,90',
    category: 'Áudio', // Classificação: Produtos de áudio
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_743438-MLA105468591979_012026-F.webp',
  },
  
  // PRODUTO 4: Monitor Samsung Ultrawide - Display de alta qualidade
  {
    id: 4,
    name: 'Monitor Samsung Ultrawide S5 Viewfinity 34" WQHD 100hz 5ms HDMI',
    price: 'R$ 1598,90',
    category: 'Monitores', // Classificação: Monitores/Displays
    image: 'https://images6.kabum.com.br/produtos/fotos/sync_mirakl/1007006/xlarge/Monitor-Samsung-Ultrawide-S5-Viewfinity-34-WQHD-100hz-5ms-HDMI-Ls34c500galmzd_1771504120.webp',
  },
  
  // PRODUTO 5: Webcam Logitech Brio - Câmera de alta resolução
  {
    id: 5,
    name: 'Webcam Logitech Brio 4K Pro Ultra HD Preto 960-001105',
    price: 'R$ 179,90',
    category: 'Acessórios', // Classificação: Acessórios/Complementos
    image: 'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/brio/gallery/brio-gallery-1.png?v=1',
  },
  
  // PRODUTO 6: Mousepad Gamer - Acessório para mouse
  {
    id: 6,
    name: 'Mousepad Gamer 90x40 Escritório Alta Qualidade Preto Liso Isoprene',
    price: 'R$ 59,90',
    category: 'Acessórios', // Classificação: Acessórios/Complementos
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_803007-MLA100092191901_122025-F.webp',
  },
]