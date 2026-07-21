# Cynthia Nicole — Doula

Landing page de alta conversão para os serviços de doulagem de Cynthia Nicole, enfermeira especialista em Doulagem.

## Desenvolvimento

Requisitos: Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm test
```

## Publicação na Netlify

O projeto usa o runtime nativo do Next.js na Netlify:

- comando de build: `npm run build`
- diretório de publicação: `.next`
- versão do Node.js: `22.13.0`

As configurações estão registradas em `netlify.toml` e substituem os valores definidos manualmente no painel.

## Leads

O formulário utiliza Netlify Forms com envio AJAX. As submissões ficam disponíveis na área **Forms** do projeto na Netlify.

Depois do primeiro deploy, ative **Form detection** no painel da Netlify e faça um novo deploy caso o formulário ainda não apareça.
