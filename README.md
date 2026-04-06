![](C:\Users\Lenovo\Documents\UNINTER\UNINTER_Logo.png)

<p align="center">
  <b>CIÊNCIA DA COMPUTAÇÃO</b><br>
  Desenvolvimento WEB<br>
  Profa. Margarete Klamas Marzani<br>
  Aluno: Francisco Araújo - Mat. 5149011
</p>



# 📁 Projeto Portfólio — Francisco Araújo

> Site de portfólio pessoal e profissional, estático, sem frameworks, publicado via **GitHub Pages**.
>
> https://proffaraujo.github.io/portfolio/
>
> https://github.com/proffaraujo/portfolio/

---

## 🗂️ Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Páginas](#páginas)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Como Executar Localmente](#como-executar-localmente)
- [Deploy no GitHub Pages](#deploy-no-github-pages)
- [Responsividade](#responsividade)
- [Acessibilidade](#acessibilidade)
- [Contato](#contato)

---

## Sobre o Projeto

Atividade prática do curso Ciência da Computação e disciplina Desenvolvimento WEB (Profa. Margarete Klamas Marzani). 
Portfólio pessoal desenvolvido com **HTML5 puro, CSS3 e JavaScript vanilla**, sem dependência de frameworks ou bibliotecas externas. 

O objetivo é apresentar a trajetória acadêmica, projetos e canais de contato do aluno, de forma clara, moderna e acessível.

O site é totalmente **estático** e hospedado no **GitHub Pages**, sem back-end, banco de dados ou build step.

---

## Páginas

| Página | Arquivo | Descrição |
|---|---|---|
| Início / Sobre mim | `index.html` | Hero full-screen com foto de perfil e links para as demais seções |
| Formação | `formacao.html` | Formação acadêmica, certificações, idiomas e disciplinas lecionadas |
| Portfólio | `portfolio.html` | Projetos nas áreas de Economia, Finanças, Educação, Tecnologia e Comunidade |
| Contato | `contato.html` | Formulário de contato com validação e canais alternativos |

---

## Estrutura de Arquivos

```
portfolio/
│
├── index.html          # Página inicial (home)
├── formacao.html       # Página de formação
├── portfolio.html      # Página de portfólio
├── contato.html        # Página de contato
├── favicon.ico         # Ícone do site (aba do navegador)
├── README.md           # Este arquivo
│
├── css/
│   └── style.css       # Toda a estilização (tema claro/escuro, grid, cards, responsivo)
│
├── js/
│   ├── main.js         # Tema, hamburger, modal de sucesso (páginas internas)
│   └── contato.js      # Validação do formulário de contato
│
└── images/
    ├── hero-profile.png    # Foto de perfil (hero da home)
    └── trajetoria-icon.png # Ícone do card "Formação"
```

---

## Tecnologias

| Tecnologia | Versão / Detalhes |
|---|---|
| HTML5 | Semântico (`<header>`, `<main>`, `<article>`, `<aside>`, `<section>`) |
| CSS3 | Custom Properties (variáveis), Grid, Flexbox, `clamp()`, `dvh`, `@media` |
| JavaScript | ES6+ — `"use strict"`, sem frameworks |
| Google Fonts | [Inter](https://fonts.google.com/specimen/Inter) — pesos 300 a 800 |
| GitHub Pages | Hospedagem estática gratuita |

> Nenhuma dependência de npm, node_modules, bundler ou transpilador.

---

## Funcionalidades

### 🎨 Tema Claro / Escuro
- Alternância via botão na navbar
- Preferência salva em `localStorage` — persiste entre sessões
- Implementado com `data-tema="claro"|"escuro"` no `<html>` e CSS Custom Properties (`--bg`, `--text`, `--surface`, etc.)

### 📱 Menu Responsivo (Hamburger)
- Visível em telas ≤ 760 px
- Abre/fecha via clique no botão ou clique fora da área do menu
- Fecha automaticamente ao selecionar um link

### 📄 Home Page Full-Screen
- Ocupa exatamente `100dvh` — sem scroll
- Hero com gradiente e foto de perfil sobrepostos em `z-index`
- Cards de navegação na parte inferior com efeito hover (`translateY`)

### ✉️ Formulário de Contato com Validação
- Validação em tempo real ao perder o foco (`blur`) e ao digitar (`input`)
- Regras:
  - **Nome**: obrigatório, mínimo 3 caracteres
  - **E-mail**: obrigatório, formato RFC 5322 via RegEx
  - **Mensagem**: obrigatória, mínimo 10 caracteres
- Estado visual de campo `válido` (borda verde) e `inválido` (borda vermelha + mensagem inline)
- Botão desabilitado durante o envio (`disabled` + `opacity`)
- Modal de confirmação animado (`keyframe entrar`) após envio bem-sucedido

### ♿ Acessibilidade
- `aria-label`, `aria-expanded`, `aria-invalid`, `aria-required`, `aria-hidden`, `aria-modal` em todos os elementos interativos
- Foco programático no primeiro campo inválido após tentativa de envio
- Modal fecha com `Escape` e devolve foco ao botão de envio
- Contraste de texto respeitado em ambos os temas

---

> 

---

## Deploy no GitHub Pages

O site está publicado em:

**[https://proffaraujo.github.io/portfolio/](https://proffaraujo.github.io/portfolio/)**

### Passos para republicar após alterações

```bash
# 1. Faça as alterações nos arquivos
# 2. Commit e push para a branch principal
git add .
git commit -m "feat: descrição da alteração"
git push origin main
```

O GitHub Pages atualiza automaticamente em 1–2 minutos após o push.

### Configuração do Pages (uma única vez)

1. Repositório → **Settings** → **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` · Pasta: `/ (root)`
4. Salvar

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| ≥ 921 px | Layout desktop: grid de 3 colunas, navbar horizontal, hero proporcional a `vw` |
| 761 – 920 px | Grid colapsa para 1 coluna; hero e foto ajustados para `65vh` |
| ≤ 760 px | Hamburger ativo; fontes via `vw` menores; hero em `62vh` |

---

## Acessibilidade

- Estrutura semântica com landmarks HTML5
- Todos os botões com `aria-label` descritivo
- Formulário com `novalidate` (validação controlada por JS) + `aria-invalid` dinâmico
- Modal com `role="dialog"`, `aria-modal="true"` e gestão de foco (`focus()` no botão de fechar)
- Tecla `Escape` fecha o modal
- Contraste adequado nos dois temas (claro e escuro)

---

## Contato

| Canal | Informação |
|---|---|
| E-mail | prof.faraujo@gmail.com |
| Instituição | ISINTESE |
| GitHub | [github.com/proffaraujo/portfolio](https://github.com/proffaraujo/portfolio.git) |
| Localização | Fortaleza, Ceará — Brasil |

---

*Desenvolvido por **Francisco Araújo** · 2026*
