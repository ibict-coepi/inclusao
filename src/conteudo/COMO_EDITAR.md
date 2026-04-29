# Como editar os textos do portal

Os textos principais ficam nesta pasta. Assim, você não precisa mexer no código da página.

## Arquivos

- `portal.json`: título, subtítulo, dados oficiais, apresentação, justificativa, metodologia, rodapé e links.
- `metas.json`: cards de objetivos e metas.
- `orcamento.json`: previsão orçamentária por rubrica.
- `documentos.json`: lista de documentos oficiais que devem ser publicados ou vinculados.
- `levantamento.json`: explicação dos eixos do levantamento exploratório.
- `equipe.json`: lista de pessoas da equipe.
- `atualizacoes.json`: notícias e atualizações do projeto.

## Logotipo do Governo Federal

O portal usa os arquivos oficiais RGB em PNG da SECOM:

- `logoGovernoCabecalho`: versão positiva, para fundo claro.
- `logoGovernoRodape`: versão negativa, para fundo escuro.

Evite trocar esses links por imagens de busca ou de terceiros.

## Cuidados importantes

- Mantenha as aspas duplas `"` nos textos.
- Separe os itens com vírgula, menos o último item de uma lista.
- Para adicionar uma nova atualização, copie um bloco existente e altere os campos.
- Depois de editar, rode `npm run build` para confirmar que o site continua funcionando.
- Não publique CPF, SIAPE, dados pessoais sensíveis ou valores individuais de bolsa.
- Para documentos oficiais, prefira publicar PDFs em uma pasta `public/documentos/` e preencher o campo `caminho` em `documentos.json`.

## Exemplo de nova atualização

```json
{
  "data": "20/05/2026",
  "titulo": "Nova entrega publicada",
  "descricao": "Resumo curto da atualização que aparecerá no portal."
}
```

## Exemplo de documento com link

Se você colocar um PDF em `public/documentos/contrato-027-2025.pdf`, edite `documentos.json` assim:

```json
{
  "titulo": "Contrato IBICT/FUNDEP nº 027/2025",
  "descricao": "Instrumento de contratação da FUNDEP.",
  "caminho": "/documentos/contrato-027-2025.pdf"
}
```
