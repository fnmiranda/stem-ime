This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# 📘 Regras e Boas Práticas do Projeto

Este documento define **regras, padrões e boas práticas** para toda a equipe de desenvolvimento do projeto **STEM-IME**.

O objetivo é garantir **qualidade, segurança, organização e previsibilidade**, facilitando manutenção e escalabilidade.

---

## 🎯 Objetivos

* Padronizar o desenvolvimento
* Evitar retrabalho
* Reduzir bugs e falhas de segurança
* Facilitar code review e onboarding
* Garantir entregas consistentes

---

# 1️⃣ Regras Gerais (Todos os membros)

## Organização e responsabilidade

* Cada task deve ter **1 responsável principal**
* Nenhuma task começa sem:

  * descrição clara
  * critério de aceite
* O responsável acompanha a task até a entrega final

## Comunicação

* Problemas devem ser comunicados imediatamente
* Tasks bloqueadas **não devem ficar paradas sem aviso**
* Decisões técnicas importantes devem ser registradas

## Proibições

* ❌ Commits direto na branch principal
* ❌ Código sem revisão
* ❌ Hardcode de senhas, tokens ou chaves
* ❌ "Depois a gente arruma"

---

# 2️⃣ Versionamento e Git

## Branches

Padrão obrigatório:

* `main` → produção
* `dev` → desenvolvimento
* `feature/nome-da-feature`
* `fix/nome-do-bug`

## Commits

* Commits pequenos e objetivos
* Padrão de mensagem:

```text
tipo: descrição curta

ex:
feat: adiciona upload de PDFs
fix: corrige validação de login admin
```

## Pull Requests

Todo PR deve:

* Ter descrição clara
* Referenciar a task relacionada
* Passar por code review
* Não quebrar build nem testes

---

# 3️⃣ Boas Práticas — Front-end

## Componentização

* Componentes pequenos e reutilizáveis
* Telas não devem conter lógica pesada
* Separar UI de regra de negócio

Exemplos:

* `components/Button`
* `components/Input`
* `components/Card`

## Responsividade

* Obrigatório funcionar em:

  * Mobile
  * Tablet
  * Desktop

## Consumo de API

* Utilizar apenas: `GET`, `POST`, `PUT`, `DELETE`
* Tratar sempre:

  * loading
  * erro
  * sucesso
* Nunca assumir resposta válida

## Segurança no Front-end

* Nenhuma regra crítica deve existir apenas no front
* Front apenas exibe permissões, não decide
* Upload com validação de tipo e tamanho

---

# 4️⃣ Boas Práticas — Back-end

## Regras de Negócio

* Toda regra importante fica no back-end
* Nenhuma validação crítica apenas no front

Exemplos:

* Permissões de admin
* Upload de arquivos
* Políticas de uso

## Banco de Dados (Supabase)

* Tabelas normalizadas
* Relacionamentos explícitos
* Índices para campos usados em busca

Nunca:

* ❌ lógica complexa espalhada
* ❌ acesso direto sem políticas de segurança

## Autenticação e Permissões

* Roles bem definidas (admin / user)
* Verificação em toda rota sensível
* Tokens com expiração

## APIs / Server Actions

* Cada endpoint faz apenas uma coisa
* Validação de input obrigatória
* Erros padronizados

---

# 5️⃣ Testes e Qualidade

## Tipos mínimos de testes

* Testes de request (API)
* Testes de fluxo crítico
* Testes básicos de performance

## Bugs

* Todo bug deve virar ticket
* Bug não resolvido ≠ bug esquecido
* Prioridade definida por impacto

## Checklist antes de entregar

* Build passando
* Sem erros no console
* Fluxos principais funcionando
* Sem logs de debug

---

# 6️⃣ Infraestrutura e Deploy

## Deploy

* Deploy automatizado
* Nunca deploy manual em produção
* Ambientes separados:

  * dev
  * prod

## Monitoramento

Monitorar no mínimo:

* Disponibilidade do sistema
* Erros de API
* Uso de recursos
* Falhas de upload

## Segurança

* HTTPS obrigatório
* Variáveis de ambiente para segredos
* Backups automáticos
* Controle de acesso por ambiente

---

# 7️⃣ Padrões de Qualidade de Código

## Código Limpo

* Funções pequenas
* Nomes claros
* Nada de código morto
* Comentários apenas quando necessários

Regra prática:

> Se outra pessoa não entender em 2 minutos, precisa melhorar.

## Refatoração

* Permitida e incentivada
* Preferencialmente separada de features
* Nunca misturar refatoração grande com feature crítica

---

# 8️⃣ Responsabilidades por Papel

## Dev Front-end

* Fidelidade ao design
* Performance da interface
* Tratamento de erros

## Dev Back-end

* Segurança
* Integridade dos dados
* Performance da API

## QA

* Testar antes do usuário
* Documentar bugs
* Validar critérios de aceite

## Infra / DevOps

* Sistema disponível
* Logs e monitoramento ativos
* Backups e segurança

---

# 🧩 Regra Final

> **Problema pequeno ignorado vira problema grande em produção.**

Qualquer dúvida, falha ou risco deve ser comunicado e discutido.

---

📌 Este README deve ser seguido por toda a equipe durante o desenvolvimento do projeto.
