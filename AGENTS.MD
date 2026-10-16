# AGENTS.md — Casa Amar

## 1. Missão do projeto

Desenvolver um site institucional de alta qualidade visual para **Casa Amar**, uma casa de temporada em **Guaibim, Bahia**. O site deve apresentar a casa e seus ambientes, comunicar a experiência de hospedagem, contextualizar a localização e **converter visitantes em contatos qualificados para reserva**, preferencialmente via WhatsApp.

**Princípio central:** construir uma experiência editorial, cinematográfica e praiana — **não** um catálogo imobiliário genérico nem uma landing page feita de cartões retangulares repetitivos.

### Fontes de verdade

1. Informações verificadas e materiais reais fornecidos pelo proprietário (fotos, vídeos, comodidades, regras, localização e contato).
2. Protótipo editável no Figma: https://www.figma.com/design/uw4RyfxodtnV2ZSYPnwVqG?node-id=1-2
3. Este arquivo, para padrões de engenharia e direcionamento de experiência.

O Figma é uma **referência estrutural inicial**, não uma especificação visual final pixel-perfect: refinar composições e acabamento mantendo a intenção. Em conflitos de conteúdo, prevalecem os dados confirmados pelo proprietário. Não inventar quantidade de quartos, capacidade, distância da praia, preços, comodidades, avaliações ou disponibilidade.

## 2. Público e objetivo

- Público: famílias, casais e grupos interessados em alugar uma casa de praia em Guaibim.
- Ação primária: **Consultar disponibilidade** por WhatsApp.
- Ações secundárias: explorar ambientes, visualizar vídeos, descobrir a região e localizar a casa.
- A experiência deve gerar desejo, confiança e clareza antes de pedir contato.

## 3. Direção de arte obrigatória

### Conceito

**Minimalismo tropical + sofisticação editorial + acolhimento de casa de praia.** Atmosfera leve, ensolarada, afetiva, com espaço em branco e tipografia marcante. Não prometer luxo ou serviços que não existam.

### Paleta de referência

| Token | Cor | Uso |
| --- | --- | --- |
| `ocean-deep` | `#145B69` | títulos, áreas de contraste, navegação |
| `turquoise` | `#2DADB2` | detalhes e interações |
| `sand` | `#F3EEE4` | fundos quentes |
| `ivory` | `#FAF9F5` | superfícies claras |
| `graphite` | `#24383B` | texto principal |
| `coral` | `#D98870` | acento pontual, se necessário |

Usar variáveis CSS/tokens Tailwind; não espalhar valores hexadecimais pelos componentes.

### Tipografia

- Títulos editoriais: **Cormorant Garamond** ou **DM Serif Display**.
- Interface, corpo e CTAs: **Inter** ou **Manrope**.
- Hierarquia expressiva, boa leitura sobre mídia, espaçamento generoso e contraste adequado.
- Evitar excesso de fontes, efeitos de texto e caixa alta em parágrafos longos.

### Fotografia — regra inegociável

**Nunca apresentar todas as imagens como uma grade monótona de quadrados ou cards idênticos.** Construir narrativas visuais com:

- Composições **assimétricas** (retratos, panoramas, detalhes e vazios intencionais).
- **Sobreposição** de fotografias com diferentes escalas e profundidades.
- **Recortes orgânicos** discretos com `clip-path`, SVG masks ou bordas inspiradas em ondas/areia, quando agregarem valor.
- Imagens que **atravessam limites de seções** ou se expandem progressivamente durante o scroll.
- Alternância de layouts densos e pausas visuais, com texto editorial integrado.
- Galeria/lightbox acessível para inspeção das imagens reais.

Não aplicar todos os efeitos simultaneamente; preservar clareza, consistência e desempenho. Usar `object-fit` e `object-position` de acordo com o enquadramento, sem cortar pontos importantes.

### Vídeos

O projeto contará com **vídeos reais da casa e filmagens por drone**. Planejar:

1. **Hero cinematográfico:** tomada de drone da casa ou entorno, com texto e CTA legíveis.
2. **Tour dos ambientes:** pequenos clipes associados a cada espaço.
3. **Guaibim:** imagens aéreas para contextualizar a região e a experiência.
4. **Encerramento emocional:** vídeo de atmosfera com convite à reserva, se houver material adequado.

**Não usar vídeos fictícios como se fossem da Casa Amar.** Enquanto os arquivos não forem fornecidos, criar placeholders claramente identificados e poster images provisórias não enganosas.

Regras técnicas: `muted`, `playsInline`, `loop` apenas onde fizer sentido; poster obrigatório; formatos e bitrate otimizados; não baixar vídeos grandes no carregamento inicial; não depender de autoplay para transmitir informação; fornecer controles quando o vídeo for conteúdo essencial; respeitar `prefers-reduced-motion` e `Save-Data` quando possível.

## 4. Arquitetura de informação

Ordem inicial sugerida (ajustar conforme materiais reais e testes):

1. **Header**: marca, navegação por âncoras e CTA discreto.
2. **Hero**: vídeo de drone, título curto e CTA para explorar/consultar disponibilidade.
3. **Manifesto da casa**: apresentação afetiva com fotos em composição editorial.
4. **Ambientes**: quartos e áreas comuns com layouts alternados, vídeo e galeria.
5. **Comodidades**: lista objetiva e verificável, sem ícones decorativos excessivos.
6. **Guaibim e experiências**: praias, paisagens e atrações com dados confirmados.
7. **Localização**: mapa, contexto de acesso e distâncias somente se verificadas.
8. **Informações práticas / FAQ**: dúvidas reais sobre estadia e reservas.
9. **CTA final**: convite emocional e botão para WhatsApp.
10. **Footer**: contatos, créditos e informações legais pertinentes.

Não adicionar depoimentos, avaliações, preços ou selos de confiança inventados.

## 5. Stack e arquitetura técnica

Stack preferencial, salvo decisão justificada no repositório:

- **React + TypeScript + Vite**.
- **Tailwind CSS** para estilos e tokens.
- **GSAP + ScrollTrigger** para animações de scroll mais complexas.
- **Motion (Framer Motion)** apenas quando fizer sentido para microinterações/estados; evitar duplicar a mesma animação em duas bibliotecas.
- **Lenis** opcional para smooth scroll, somente se não comprometer acessibilidade, performance ou navegação nativa.
- **Cloudinary** ou solução equivalente para transformação e entrega de mídias, se configurada.
- **Vitest + React Testing Library** para testes de componentes; **Playwright** para fluxos E2E quando disponível.

### Estrutura sugerida

```text
src/
  app/                  # bootstrap, providers e configuração
  components/
    ui/                 # botões, tipografia, elementos compartilhados
    media/              # vídeos, fotos, galeria, lightbox
    layout/             # header, footer, containers
  sections/             # Hero, About, Spaces, Amenities, Destination, Location, FAQ, CTA
  data/                 # conteúdo tipado e dados confirmados
  hooks/                # hooks reutilizáveis
  lib/                  # analytics, URLs, helpers
  styles/               # tokens, estilos globais
  assets/                # recursos locais leves
  test/                  # setup e utilitários de teste
```

Preferir componentes pequenos, sem abstração prematura. Conteúdo e mídias devem ser configuráveis, sem textos/URLs espalhados pela árvore de componentes. Não introduzir backend, CMS, banco de dados ou sistema de reservas sem necessidade aprovada.

## 6. Padrões de interação e animação

- Animações devem **explicar a narrativa**, nunca atrapalhar leitura ou reserva.
- Revelações graduais, parallax sutil, imagens em expansão e transições orgânicas são desejáveis.
- Usar `ScrollTrigger` com cleanup adequado ao desmontar componentes (`gsap.context()`/revert).
- Evitar `scroll-jacking`, scroll horizontal involuntário e efeitos pesados no mobile.
- Priorizar `transform` e `opacity` quando possível; evitar animar propriedades que forçam layout continuamente.
- Implementar alternativa estática para `prefers-reduced-motion: reduce`.
- Todos os botões, links e galerias precisam funcionar por teclado e toque.

## 7. Responsividade

Projetar e testar em **mobile, tablet e desktop**; começar com conteúdo e experiência mobile viáveis, sem simplesmente encolher o layout desktop.

- No mobile, reordenar as sobreposições para preservar hierarquia e leitura.
- Evitar elementos decorativos que obstruam fotos, CTAs ou textos.
- Reduzir ou desativar parallax pesado; considerar poster estático no lugar do vídeo de fundo.
- Menu mobile acessível, CTA sempre facilmente localizável, alvos de toque confortáveis.
- Verificar 320px, 375px, 768px, 1024px e 1440px, além de larguras intermediárias.

## 8. Performance, acessibilidade e SEO

### Performance

- Imagens responsivas com `srcset`/`sizes` quando aplicável, AVIF/WebP e compressão adequada.
- `loading="lazy"` para mídia abaixo da dobra; priorizar o visual principal sem excesso de preload.
- Reservar espaço de mídia para evitar CLS; controlar fontes e scripts.
- Medir Core Web Vitals, especialmente LCP, CLS e INP; não sacrificar performance por efeitos.
- Usar code splitting e inicialização tardia para galerias/efeitos pesados.

### Acessibilidade

- HTML semântico, landmarks e hierarquia correta de headings.
- `alt` descritivo para imagens informativas; vazio para decoração.
- Contraste adequado inclusive sobre vídeo; overlay quando necessário.
- Foco visível, navegação por teclado, lightbox acessível e respeito à redução de movimento.
- Evitar texto essencial incorporado em imagem/vídeo.

### SEO local

- `title`, `meta description`, canonical, Open Graph e favicon.
- Estrutura semântica e conteúdo útil sobre a casa e Guaibim, Bahia.
- Dados estruturados somente quando apropriados e fundamentados em informações verificadas.
- Sitemap e robots configurados para produção.
- Não inventar localização exata, classificações ou avaliações.

## 9. Conversão e mensuração

- CTA principal: **Consultar disponibilidade**.
- Link WhatsApp configurável em ambiente/dados do projeto; mensagem pré-preenchida curta e contextualizada.
- Nunca inserir telefone de exemplo em produção.
- Acompanhar eventos (com consentimento e configuração adequada): clique no WhatsApp, visualização de galeria, interação com vídeo e CTA por seção.
- Respeitar LGPD e evitar trackers desnecessários.

## 10. Fluxo obrigatório de desenvolvimento — TDD

Para **cada nova feature**:

1. Entender a demanda, a seção afetada e os critérios de aceite.
2. Inspecionar padrões e componentes existentes antes de escrever código.
3. Definir comportamento observável e escrever **teste que falha primeiro** quando aplicável.
4. Implementar o mínimo necessário para passar no teste.
5. Refatorar preservando comportamento e clareza.
6. Verificar responsividade, acessibilidade, motion reduzido e performance da feature.
7. Executar testes, lint, typecheck e build disponíveis no repositório.
8. Revisar diff e reportar arquivos alterados, verificações executadas e limitações.

Para detalhes puramente visuais difíceis de cobrir com teste unitário, definir critérios objetivos e usar screenshots/revisão visual por viewport; testar interações e comportamento com RTL/E2E.

**Não criar commits, fazer push, abrir PR ou publicar em produção sem solicitação explícita do usuário.** Não modificar features não relacionadas nem remover código existente sem justificativa.

## 11. Qualidade de código

- TypeScript com tipagem explícita em contratos e sem `any` desnecessário.
- Componentes acessíveis e reutilizáveis; props claras.
- Evitar dependências sem necessidade e efeitos globais que vazem entre rotas/componentes.
- Tratar estados de erro, mídia indisponível e carregamento lento.
- Não deixar URLs, credenciais, IDs privados ou tokens em código versionado.
- Comentários para decisões não óbvias, não para narrar cada linha.
- Preservar consistência de nomenclatura e convenções existentes.

## 12. Critérios de aceite do site

O trabalho só está pronto quando:

- A identidade visual remete a uma **experiência editorial tropical**, não a um template genérico.
- A apresentação de fotos inclui **composições variadas, sobreposições e recortes**, com bom comportamento mobile.
- Os vídeos reais, quando disponibilizados, são integrados com fallback e otimização.
- Informações de imóvel e região são verificadas, sem promessas inventadas.
- Navegação, galeria, mapa/links e CTAs funcionam em desktop e mobile.
- O site permanece utilizável sem animações, autoplay ou conexão rápida.
- Testes relevantes, lint, typecheck e build passam, ou impedimentos são documentados.

## 13. Informações pendentes a solicitar ao proprietário

- Fotos originais da fachada, quartos, banheiros, cozinha, áreas externas e detalhes.
- Vídeos da casa e filmagens de drone; identificação dos melhores takes.
- Quantidade e descrição dos quartos, capacidade, camas, comodidades e regras.
- Endereço/pino de mapa aprovado para publicação e referências de acesso.
- Telefone/WhatsApp oficial, horários de contato e processo de reserva.
- Política de preços, temporadas e disponibilidade, caso devam aparecer.
- Logo existente, identidade de marca e autorização de uso das mídias.

Se essas informações faltarem, manter conteúdo de demonstração **claramente marcado como provisório**. Não preencher lacunas com fatos inventados.

## 14. Instrução para agentes de IA

Antes de cada implementação, releia este arquivo, consulte o Figma e os componentes existentes, proponha uma solução coerente com a identidade da Casa Amar e preserve o objetivo de conversão. Quando houver conflito entre um efeito impressionante e usabilidade/performance, priorize uma experiência elegante, rápida e acessível. **A originalidade está na direção de arte e na narrativa visual, não no excesso de animações.**
