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
