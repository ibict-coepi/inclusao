# Portal de Transparência IBICT

Este projeto é um site estático feito com React e Vite. Ele pode ser publicado no GitHub Pages sem chave do Gemini.

## Como alterar os textos

Os textos editáveis ficam em:

```text
src/conteudo/
```

Arquivos principais:

- `portal.json`: título, subtítulo, dados oficiais, apresentação, justificativa, metodologia, rodapé e links.
- `metas.json`: objetivos e metas.
- `orcamento.json`: previsão orçamentária por rubrica.
- `documentos.json`: documentos oficiais do projeto.
- `levantamento.json`: eixos do levantamento exploratório.
- `equipe.json`: lista de integrantes da equipe.
- `atualizacoes.json`: atualizações do projeto.

Há um guia curto em `src/conteudo/COMO_EDITAR.md`.

## Transparência ativa

O site foi organizado para mostrar:

- dados oficiais do contrato;
- metas, cronograma e resultados esperados;
- previsão orçamentária;
- documentos oficiais;
- levantamento exploratório;
- equipe sem dados pessoais sensíveis;
- atualizações públicas do projeto.

## Como testar no computador

Instale as dependências:

```bash
npm install
```

Abra o site em modo de teste:

```bash
npm run dev
```

## Como conferir antes de publicar

```bash
npm run build
```

Se o comando terminar sem erro, os arquivos finais serão criados na pasta `dist`.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para o repositório.
3. No GitHub, abra `Settings` > `Pages`.
4. Em `Build and deployment`, selecione `GitHub Actions`.
5. Faça um envio para a branch `main`.

O arquivo `.github/workflows/deploy.yml` já está preparado para publicar o site automaticamente.

O endereço final ficará parecido com:

```text
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```
