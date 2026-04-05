// contato.js — validação e envio simulado do formulário de contato
// só roda nessa página; main.js cuida do resto
// Autor: Francisco Araújo - Trabalho UNINTER.

"use strict";

/* ─────────────────────────────────────────
   1. SELETORES
───────────────────────────────────────── */
const form        = document.getElementById("form-contato");
const campoNome   = document.getElementById("campo-nome");
const campoEmail  = document.getElementById("campo-email");
const campoMsg    = document.getElementById("campo-mensagem");
const btnSubmit   = form.querySelector(".btn-submit");

const modalSucesso   = document.getElementById("modal-sucesso");
const btnFecharModal = document.getElementById("btn-fechar-modal");   // ver HTML atualizado

/* ─────────────────────────────────────────
   2. UTILITÁRIOS DE VALIDAÇÃO
───────────────────────────────────────── */

/**
 * Verifica formato de e-mail via RegEx.
 * Aceita padrão RFC 5322 simplificado: usuario@dominio.tld
 */
function emailValido(valor) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(valor.trim());
}

/**
 * Marca um campo como inválido e exibe a mensagem de erro associada.
 * @param {HTMLElement} campo  – input ou textarea
 */
function marcarInvalido(campo) {
  campo.classList.add("invalido");
  campo.classList.remove("valido");
  const erro = campo.parentElement.querySelector(".msg-erro");
  if (erro) erro.classList.add("visivel");
  campo.setAttribute("aria-invalid", "true");
}

/**
 * Marca um campo como válido e oculta qualquer erro visível.
 * @param {HTMLElement} campo  – input ou textarea
 */
function marcarValido(campo) {
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  const erro = campo.parentElement.querySelector(".msg-erro");
  if (erro) erro.classList.remove("visivel");
  campo.setAttribute("aria-invalid", "false");
}

/**
 * Executa todas as regras de validação.
 * Retorna true somente se todos os campos forem válidos.
 */
function validarFormulario() {
  let tudo_ok = true;

  /* ── Nome: obrigatório, mínimo 3 caracteres ── */
  if (campoNome.value.trim().length < 3) {
    marcarInvalido(campoNome);
    tudo_ok = false;
  } else {
    marcarValido(campoNome);
  }

  /* ── E-mail: obrigatório + formato RFC ── */
  if (!emailValido(campoEmail.value)) {
    marcarInvalido(campoEmail);
    tudo_ok = false;
  } else {
    marcarValido(campoEmail);
  }

  /* ── Mensagem: obrigatória, mínimo 10 caracteres ── */
  if (campoMsg.value.trim().length < 10) {
    marcarInvalido(campoMsg);
    tudo_ok = false;
  } else {
    marcarValido(campoMsg);
  }

  return tudo_ok;
}

/* ─────────────────────────────────────────
   3. VALIDAÇÃO EM TEMPO REAL (ao sair do campo)
───────────────────────────────────────── */
[campoNome, campoEmail, campoMsg].forEach((campo) => {

  /* Valida ao perder o foco (blur) */
  campo.addEventListener("blur", () => {
    if (campo === campoEmail) {
      emailValido(campo.value) ? marcarValido(campo) : marcarInvalido(campo);
    } else {
      const minimo = campo === campoMsg ? 10 : 3;
      campo.value.trim().length >= minimo
        ? marcarValido(campo)
        : marcarInvalido(campo);
    }
  });

  /* Remove o erro assim que o usuário começa a digitar */
  campo.addEventListener("input", () => {
    if (campo.classList.contains("invalido")) {
      campo.classList.remove("invalido");
      const erro = campo.parentElement.querySelector(".msg-erro");
      if (erro) erro.classList.remove("visivel");
    }
  });
});

/* ─────────────────────────────────────────
   4. ENVIO DO FORMULÁRIO
───────────────────────────────────────── */
form.addEventListener("submit", (evento) => {
  evento.preventDefault();   // impede recarregamento da página

  if (!validarFormulario()) {
    /* Foca no primeiro campo inválido para acessibilidade */
    const primeiroInvalido = form.querySelector(".invalido");
    if (primeiroInvalido) primeiroInvalido.focus();
    return;
  }

  /* ── Feedback visual: estado de carregamento ── */
  btnSubmit.disabled    = true;
  btnSubmit.textContent = "Enviando…";

  /* ── Simulação de latência de rede (1,5 s) ── */
  setTimeout(() => {
    limparFormulario();
    exibirModal();

    btnSubmit.disabled    = false;
    btnSubmit.textContent = "Enviar mensagem";
  }, 1500);
});

/* ─────────────────────────────────────────
   5. LIMPAR FORMULÁRIO
───────────────────────────────────────── */
function limparFormulario() {
  form.reset();
  [campoNome, campoEmail, campoMsg].forEach((campo) => {
    campo.classList.remove("valido", "invalido");
    campo.removeAttribute("aria-invalid");
  });
}

/* ─────────────────────────────────────────
   6. MODAL DE CONFIRMAÇÃO
───────────────────────────────────────── */
function exibirModal() {
  modalSucesso.classList.add("ativo");
  modalSucesso.setAttribute("aria-hidden", "false");

  /* Foco acessível no botão de fechar */
  if (btnFecharModal) btnFecharModal.focus();
}

function fecharModal() {
  modalSucesso.classList.remove("ativo");
  modalSucesso.setAttribute("aria-hidden", "true");

  /* Devolve o foco ao botão de envio */
  btnSubmit.focus();
}

/* Fecha pelo botão interno do modal */
if (btnFecharModal) {
  btnFecharModal.addEventListener("click", fecharModal);
}

/* Fecha clicando no overlay (fora da caixa) */
modalSucesso.addEventListener("click", (e) => {
  if (e.target === modalSucesso) fecharModal();
});

/* Fecha com a tecla Escape */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalSucesso.classList.contains("ativo")) {
    fecharModal();
  }
});