# Como editar os textos do portal

Os textos principais ficam nesta pasta. Assim, você não precisa mexer no código da página.

## Arquivos

- `portal.json`: título, subtítulo, dados oficiais, apresentação, justificativa, metodologia, rodapé e links.
- `metas.json`: cards de objetivos e metas.
- `equipe.json`: lista de pessoas da equipe.
- `atualizacoes.json`: notícias e atualizações do projeto.

## Cuidados importantes

- Mantenha as aspas duplas `"` nos textos.
- Separe os itens com vírgula, menos o último item de uma lista.
- Para adicionar uma nova atualização, copie um bloco existente e altere os campos.
- Depois de editar, rode `npm run build` para confirmar que o site continua funcionando.

## Exemplo de nova atualização

```json
{
  "data": "20/05/2026",
  "titulo": "Nova entrega publicada",
  "descricao": "Resumo curto da atualização que aparecerá no portal."
}
```
