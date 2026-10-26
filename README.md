# GradeFlow

Calculadora de notas e faltas seguindo o modelo de avaliação FIAP.

## Scripts

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # typecheck + build de produção
pnpm lint       # ESLint
pnpm format     # Prettier
```

## Estrutura

```
src/
├── assets/              # arquivos importados pelo código (ícones, imagens)
├── components/
│   ├── ui/              # primitivos shadcn/ui (não editar regras de negócio aqui)
│   ├── shared/          # componentes reutilizáveis entre features (cards, campos, tabs)
│   └── layout/          # estrutura da página (Header, Footer, PageLayout)
├── config/              # regras e constantes de negócio globais (pesos, média FIAP)
├── features/
│   ├── grades/          # calculadora de notas
│   └── absences/        # calculadora de faltas
│       ├── components/  # UI da feature
│       ├── hooks/       # estado e orquestração do formulário
│       ├── lib/         # funções puras (cálculo, parse, validação)
│       ├── constants.ts
│       ├── types.ts
│       └── index.ts     # API pública da feature
├── lib/                 # utilitários genéricos (cn)
└── pages/               # composição das features em páginas
```

Regras:

- `features/*` não importam umas das outras; o que for comum vai para `components/shared`, `config` ou `lib`.
- Cálculos ficam em `lib/` como funções puras, sem React; componentes só renderizam o estado exposto pelo hook.
- Páginas importam features pelo `index.ts` (`@/features/grades`).
