# Casa Amar

Site institucional da Casa Amar, casa de temporada em Guaibim, Bahia. Implementação local em React, TypeScript, Vite e Tailwind CSS, orientada pelo `AGENTS.MD` existente e pelo [protótipo no Figma](https://www.figma.com/design/uw4RyfxodtnV2ZSYPnwVqG?node-id=1-2).

## Executar localmente

Use Node.js 22.12 ou superior e npm em um mesmo ambiente: Windows ou Linux/WSL. O requisito acompanha a [documentação do Vite](https://vite.dev/guide/).

```sh
npm ci
npm run dev
```

O Vite informa a URL local no terminal. O `package-lock.json` presente corresponde ao manifesto; use `npm ci` para instalações reproduzíveis. Para adicionar dependências aprovadas, use `npm install` e revise a atualização do lockfile.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm test` | Testes de componentes e regras de configuração |
| `npm run test:watch` | Testes durante o desenvolvimento |
| `npm run lint` | ESLint e regras de hooks |
| `npm run typecheck` | Verificação TypeScript |
| `npm run build` | Typecheck e compilação para `dist/` |
| `npm run preview` | Prévia do build local |
| `npm run test:e2e` | Fluxos e screenshots em cinco larguras |

Antes dos testes E2E, instale o navegador de teste:

```sh
npx playwright install chromium
npm run test:e2e
```

## Organização

- `src/app/`: entrada e composição da página.
- `src/sections/`: hero, apresentação, ambientes, destino, localização, FAQ e reservas.
- `src/components/`: navegação, links, mídias e galeria carregada sob demanda.
- `src/data/site.ts`: conteúdo, contato, links, comodidades e catálogo tipado de mídias.
- `src/styles/global.css`: tokens Tailwind, composições e regras responsivas.
- `src/lib/`: validação de contato e geração de metadados de publicação.
- `src/test/` e `*.test.ts(x)`: Vitest e React Testing Library.
- `e2e/`: Playwright, teclado, redução de movimento e viewports.
- `public/media/`: ilustrações SVG provisórias, sem fotografias de imóveis fictícios.

## Conteúdo e contato

Copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_NUMBER` somente com o contato oficial, incluindo código do país e DDD. Variáveis `VITE_` são públicas: nunca coloque segredos nelas. Reinicie o servidor após alterar o ambiente.

Sem número válido, os CTAs levam à seção de reservas, que informa a pendência. Com o número configurado, abrem o WhatsApp com uma mensagem de consulta. Não há backend, disponibilidade simulada ou envio automático de mensagens.

Confirme capacidade, quartos, camas, comodidades, regras e endereço antes de editar `src/data/site.ts`. A lista `amenities` começa vazia. `exactMapUrl` vazio mantém apenas o link para a região de Guaibim, claramente identificado. Atualize também as respostas do FAQ conforme as confirmações.

## Fotos e vídeos reais

Para cada item de mídia, preencha `src`, `alt`, `srcSet` quando disponível e `objectPosition` conforme o enquadramento. Use caminhos locais em `public/media/` ou URLs públicas aprovadas de um serviço de mídia. Marque `provisional: false` somente depois de confirmar o arquivo e sua autorização de uso.

`poster` é obrigatório e deve continuar disponível como fallback. Substitua o poster abstrato por uma imagem real otimizada ao integrar um vídeo. `videoSrc` habilita o player no hero e, quando fornecido, nos ambientes e no destino. O player exige interação, tem controles e `playsInline`, usa `preload="none"` e não inicia automaticamente. Isso preserva o conteúdo em conexões limitadas e com movimento reduzido.

A galeria usa `<dialog>` nativo, Escape, setas, foco contido pelo navegador e retorno ao botão de abertura. Imagens abaixo da dobra usam lazy loading. Fontes são servidas pelo próprio build; não há mapas incorporados, trackers ou fontes externas carregados automaticamente.

## Publicação e SEO

Mantenha `VITE_SITE_URL` vazio durante a preparação. O build gera `noindex, nofollow` e um `robots.txt` que bloqueia indexação. Após aprovar conteúdo, mídias e contato, retire o aviso provisório em `src/app/App.tsx` e configure a origem HTTPS pública em `VITE_SITE_URL`, sem subdiretório, parâmetros ou credenciais.

Com origem válida, o build inclui canonical, `og:url`, sitemap e robots de produção. Os metadados básicos e o favicon já estão presentes. Imagem de compartilhamento e dados estruturados devem usar materiais e informações aprovados. Hospedagem na raiz do domínio é a configuração prevista.

Publicação, commits, push e PR dependem de autorização específica, conforme `AGENTS.MD`.

## Estado da validação

- Figma consultado: node `1:2`, com referência de layout e captura visual. O protótipo contém blocos de mídia provisórios, sem fotografias reais para exportar.
- Testes escritos antes da implementação para os fluxos principais. O ciclo vermelho/verde não pôde ser executado: `npm test` falhou no ambiente, antes de iniciar o runner, com erro de WSL e diretório de Node indisponível.
- Node Linux ausente; o executável Windows falhou por integração WSL. O download pelo terminal falhou na resolução DNS.
- JSON, SVGs, imports locais e referências a arquivos foram conferidos estaticamente com Python. Essa conferência não substitui TypeScript, lint, testes ou build.
- `node_modules` e `package-lock.json` apareceram no diretório durante o trabalho e foram preservados; as dependências declaradas no lockfile correspondem ao manifesto. A origem e o resultado dessa instalação não foram verificados nesta sessão.
- `npm test`, `npm run lint`, `npm run typecheck` e `npm run build` foram tentados e bloquearam antes de executar suas ferramentas por causa do Node/WSL. Os resultados dos testes, lint, typecheck, build, inspeção visual em navegador e medição de Core Web Vitals continuam pendentes. A versão ainda não está validada para produção.
- A pasta não foi reconhecida como repositório Git; não há branch/base disponível nem commit criado. Sugestão futura de branch: `feature/casa-amar-site`; commit e título de PR: `feat: implementa site institucional da Casa Amar`.

## Experiência do mar

A seção SeaExperience, após Guaibim, usa o filme fornecido IMG_7813.MOV, copiado para public/media/som-do-mar.mov. O original tem cerca de 45,6 MB, vídeo HEVC 3840×2160 e áudio AAC. O poster continua sendo a fotografia existente da praia; ainda não é um frame extraído do filme.

A seção mantém o título acima do vídeo e o tamanho editorial original. O vídeo preenche toda a div com object-fit: cover, sem faixas vazias e com recorte central quando as proporções diferem. A reprodução automática em loop tenta começar com som quando a seção fica visível. O áudio fica ativado por padrão até o visitante silenciar; se o navegador bloquear autoplay com áudio, o botão Reproduzir com som permite iniciar por interação. Não há download antecipado. Movimento reduzido e economia de dados desabilitam o início automático. Os controles nativos permitem pausar, ajustar volume e entrar em tela cheia; sair da seção ou ocultar a aba pausa a reprodução. Em caso de falha, há nova tentativa e link para abrir o original.

A compatibilidade HEVC depende do navegador e do sistema. Pendente: converter para MP4 H.264/AAC com faststart, resolução/bitrate adequados à web e poster extraído do próprio filme; atualizar seaMedia.videoSrc em src/data/site.ts. A execução de processos está bloqueada por Acesso negado, impedindo a transcodificação e a reprodução de verificação nesta sessão. O arquivo original em Downloads foi preservado.

## Galeria editorial com parallax

ParallaxEditorialGallery está integrada em Spaces (seção 02), entre as imagens existentes e as comodidades. O componente recebe title, description, eyebrow, images e onOpenGallery; o conteúdo e as dez fotos reais estão em src/data/editorialGallery.ts. Os estilos usam os tokens existentes.

O módulo editorialMotion é carregado separadamente e usa GSAP/ScrollTrigger, scrub: 1, ease: none, force3D e deslocamentos individuais. O texto é sticky em desktop/tablet; no mobile fica acima da composição escalonada. Não há pin, scroll artificial, zoom ou fades. gsap.matchMedia reconstrói os efeitos por breakpoint e preferência de movimento; gsap.context().revert() limpa apenas esta instância. useScrollReveal exclui a galeria para não disputar os transforms.

Validação desta entrega: TypeScript e ESLint executados pelas APIs locais; conferência isolada da lógica de movimento em desktop/mobile/reduced motion e cleanup. Testes Vitest adicionados para conteúdo, interação, ciclo de vida e coreografia. A execução do runner continua bloqueada por CreateProcessAsUserW/Acesso negado. Build e screenshots responsivas continuam pendentes devido ao ambiente; a fidelidade à gravação não foi validada, pois não há reprodução de vídeo/navegador disponível.

## O que fazer em Guaibim

A seção ThingsToDo aparece após Destination, com fotos reais existentes e sugestões de praia, Taquari e culinária local. Conteúdo tipado e fontes de conferência em src/data/experiences.ts; sem distâncias, preços, serviços de passeio ou estabelecimentos prometidos. Link para o mapa da região, sem publicar o endereço exato da casa. Layout em duas colunas no desktop e uma no mobile. TypeScript e lint passaram; o runner de testes segue bloqueado por Acesso negado e a revisão visual responsiva continua pendente.

## Abertura cinematográfica

SiteEntrance apresenta a marca e uma linha de onda sobre duas cortinas em areia e azul profundo, que sobem para revelar o hero em cerca de 2,15 s. As letras e os CTAs do hero entram em sequência. A abertura roda novamente em cada montagem/recarregamento no topo, sem sessão persistida nem porcentagens de carregamento fictícias. Não bloqueia o scroll, dispensa foco automático e pode ser pulada por botão, teclado ou rolagem. Não aparece em links para âncoras internas, páginas restauradas com scroll ou movimento reduzido. Um timeout de 2,4 s garante saída mesmo sem animationend; listeners e timer são limpos no unmount. Sem bibliotecas adicionais.

TypeScript e lint passaram. Testes unitários e E2E de abertura adicionados; execução de Vitest/Playwright e inspeção visual seguem bloqueadas por Acesso negado ao criar processos.

## Revisão mobile

Breakpoints de celular alinhados em 767px. Menu fecha com toque externo, Escape e ao voltar ao desktop; cabeçalho fica acima do conteúdo do hero. Galeria reconhece gestos horizontais mantendo rolagem vertical e pinch zoom. Abertura sai ao primeiro toque. Fotos editoriais usam sizes menores nas colunas estreitas. Textos de experiências, parallax e chegada receberam tamanho mínimo mais legível; blur desativado no mobile. Galeria adapta altura a telas baixas e safe areas. Seis sugestões locais permanecem completas, com altura natural em celulares pequenos.

Testes de interação e E2E mobile atualizados. TypeScript e lint passaram. Sem navegador conectado; Vitest/Playwright bloqueados ao criar processos (Acesso negado), e build pela API Vite bloqueado por module-sync-enabled. Screenshots, reprodução HEVC e Core Web Vitals continuam sem validação.
