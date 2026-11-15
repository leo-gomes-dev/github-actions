# Laboratório Prático: CI/CD e Testes Automatizados com GitHub Actions

[CI/CD - Vite para GitHub Pages](https://leo-gomes-dev.github.io/github-actions/)

Este repositório é um ambiente de estudo criado para os alunos do curso de **Fullstack JavaScript** aprenderem, na prática, como funciona uma esteira completa de **Integração Contínua (CI)** e **Entrega/Implantação Contínua (CD)** utilizando **Vite**, **Vitest** e **GitHub Actions**.

---

## O que este projeto demonstra?

Diferente de um projeto comum onde o código é enviado manualmente para o servidor, aqui todo o fluxo é automatizado a cada `git push` ou `Pull Request` na branch `main`:

1. **Testes Automatizados (CI):** Valida se as funções do projeto estão funcionando antes de qualquer outra etapa. Se um teste falhar, a esteira trava e impede o deploy de código quebrado.
2. **Build de Produção com Variáveis Seguras (CI):** Compila o projeto Vite injetando chaves secretas (*GitHub Secrets*) sem expor senhas no código-fonte.
3. **Deploy Contínuo (CD):** Publica a versão compilada automaticamente no **GitHub Pages**.
4. **Notificações via Webhook:** Envia um aviso em tempo real para um canal do **Discord** informando o status da esteira e o link do site atualizado.

---

## Tecnologias Utilizadas

* **Vite** (JavaScript Vanilla) — Bundler e ambiente de desenvolvimento.
* **Vitest** — Framework de testes unitários.
* **GitHub Actions** — Orquestrador da esteira de CI/CD (`.github/workflows/ci-vite.yml`).
* **GitHub Pages** — Hospedagem estática automatizada.
* **Discord Webhooks** — Notificações de status do pipeline.

---

## Como a Esteira (Pipeline) Funciona?

O arquivo `.github/workflows/ci-vite.yml` está dividido em **3 Jobs sequenciais**:

```text
[1. Qualidade e Testes] ──▶ [2. Build de Produção] ──▶ [3. Deploy + Discord]
     (npm test)                 (npm run build)           (GitHub Pages)
```

* **Job 1 (`qualidade-e-testes`):** Sobe uma máquina virtual Ubuntu, instala as dependências com `npm ci` e executa `npm test` via Vitest.
* **Job 2 (`build-producao`):** Depende do sucesso do Job 1 (`needs`). Injeta a variável secreta `VITE_API_KEY`, gera a pasta `dist/` e empacota o artefato.
* **Job 3 (`deploy-producao`):** Roda apenas em pushes na branch `main`. Publica o site no GitHub Pages e dispara uma requisição `POST` para o Webhook do Discord com o link no ar.

---

## Como rodar este projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/leo-gomes-dev/github-actions.git
   cd github-actions
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute os testes unitários:**
   ```bash
   npm test
   ```

4. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## Configuração de Secrets (Para quem fizer Fork)

Se você fizer um **Fork** deste repositório para testar na sua própria conta do GitHub, lembre-se de configurar as seguintes variáveis em **Settings > Secrets and variables > Actions**:

| Nome da Secret | Descrição |
| :--- | :--- |
| `VITE_API_KEY` | Chave fictícia usada para simular a injeção segura de variáveis de ambiente no build. |
| `DISCORD_WEBHOOK_URL` | URL do Webhook do seu canal do Discord para receber as notificações de deploy. |

Além disso, ative o deploy via Actions em **Settings > Pages > Source > GitHub Actions**.

---

## Desafio sugerido para os alunos

1. Faça um **Fork** deste repositório.
2. Altere propositalmente a lógica da função em `src/calculadora.js` para causar um erro matemático.
3. Faça um `commit` e `push` para a `main`.
4. Acesse a aba **Actions** no GitHub e observe como o **Job 1** bloqueia o **Build** e o **Deploy**, protegendo o ambiente de produção!

---

## Autor e Créditos

Desenvolvido por **Leo Gomes Develop** ([@leo-gomes-dev](https://github.com)) — Material de apoio**.
