# CineStream Navigator

Bem-vindo ao CineStream Navigator! Este é um protótipo de aplicativo web focado em agregar e permitir a reprodução de canais de TV online (estilo IPTV), com um toque de personalização através de recomendações baseadas no histórico de visualização.

## Funcionalidades Principais

*   **Listagem de Canais**: Exibe os canais disponíveis em formato de cards, permitindo uma navegação visual.
*   **Busca e Filtragem**: Permite aos usuários buscar canais por título ou palavras-chave, e filtrar por critérios como gênero, idioma e qualidade (funcionalidade implementada na interface, mas os filtros atualmente operam sobre dados de exemplo).
*   **Detalhes e Reprodução do Canal**: Ao selecionar um canal, o usuário é direcionado para uma página com detalhes sobre o mesmo e um player de vídeo integrado para reprodução do stream (atualmente suportando streams HLS com `hls.js`).
*   **Recomendações Personalizadas**: Uma ferramenta que utiliza IA (Genkit) para sugerir novos canais com base no histórico de canais assistidos pelo usuário, que é coletado automaticamente.

## Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto moderno de tecnologias para desenvolvimento web e integração de IA:

*   **Next.js**: Framework React para renderização no lado do servidor (SSR) e geração de sites estáticos (SSG), utilizando o App Router.
*   **React**: Biblioteca JavaScript para construir interfaces de usuário interativas e componentizadas.
*   **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a qualidade e a manutenibilidade do código.
*   **ShadCN UI**: Coleção de componentes de UI reutilizáveis, construídos com Radix UI e Tailwind CSS, focados em acessibilidade e personalização.
*   **Tailwind CSS**: Framework CSS utility-first para estilização rápida e customizável diretamente no HTML.
*   **Genkit (Firebase AI)**: Toolkit para desenvolvimento de funcionalidades baseadas em IA generativa, utilizado aqui para o sistema de recomendações.
*   **Lucide React**: Biblioteca de ícones SVG.
*   **HLS.js**: Biblioteca JavaScript para reprodução de streams HLS (HTTP Live Streaming) em navegadores que não o suportam nativamente.

## Como Iniciar (Ambiente de Desenvolvimento Padrão)

Este projeto foi configurado para rodar em um ambiente de desenvolvimento como o Firebase Studio. Geralmente, para iniciar o servidor de desenvolvimento, você usaria:

```bash
npm run dev
```

E para o Genkit (se estiver desenvolvendo as funcionalidades de IA):

```bash
npm run genkit:dev
```

Certifique-se de ter as dependências instaladas com `npm install`.

## Próximos Passos (Sugestões)

*   Expandir a lista de canais com mais streams públicos e estáveis.
*   Aprimorar o sistema de recomendações com mais critérios ou modelos de IA mais sofisticados.
*   Implementar autenticação de usuários para salvar históricos e preferências de forma mais robusta.
*   Melhorar a interface do player de vídeo com controles personalizados.
