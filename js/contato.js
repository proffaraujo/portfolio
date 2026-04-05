// contato.js — validação e envio simulado do formulário de contato
// só roda nessa página; main.js cuida do resto
// Autor: Francisco Araújo - Trabalho UNINTER.

"use strict";

// --- SELETORES ---

const form        = document.getElementById("form-contato");
const campoNome   = document.getElementById("campo-nome");
const campoEmail  = document.getElementById("campo-email");
const campoMsg    = document.getElementById("campo-mensagem");
const btnSubmit   = form.querySelector(".btn-submit");

const modalSucesso   = document.getElementById("modal-sucesso");
const btnFecharModal = document.getElementById("btn-fechar-modal");


// --- VALIDAÇÃO ---

// regex simples: tem algo @ tem algo . tem algo com 2+ chars — serve pra maioria dos casos
function emailValido(valor) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(valor.trim());
}

// pinta o campo de vermelho e mostra o span de erro que fica escondido no HTML
function marcarInvalido(campo) {
  campo.classList.add("invalido");
  campo.classList.remove("valido");
  const erro = campo.parentElement.querySelector(".msg-erro");
  if (erro) erro.classList.add("visivel");
  campo.setAttribute("aria-invalid", "true"); // leitores de tela vão reclamar se não tiver isso
}

// volta ao normal — tira vermelho, coloca borda verde, esconde o erro
function marcarValido(campo) {
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  const erro = campo.parentElement.querySelector(".msg-erro");
  if (erro) erro.classList.remove("visivel");
  campo.setAttribute("aria-invalid", "false");
}

// roda nos três campos e retorna false se qualquer um falhar
function validarFormulario() {
  let tudo_ok = true;

  // nome: no mínimo 3 chars — "Jo" não conta
  if (campoNome.value.trim().length < 3) {
    marcarInvalido(campoNome);
    tudo_ok = false;
  } else {
    marcarValido(campoNome);
  }

  // email: tem que passar no regex
  if (!emailValido(campoEmail.value)) {
    marcarInvalido(campoEmail);
    tudo_ok = false;
  } else {
    marcarValido(campoEmail);
  }

  // mensagem: no mínimo 10 chars — evita envios de "oi" e ponto final
  if (campoMsg.value.trim().length < 10) {
    marcarInvalido(campoMsg);
    tudo_ok = false;
  } else {
    marcarValido(campoMsg);
  }

  return tudo_ok;
}


// --- VALIDAÇÃO EM TEMPO REAL ---

// valida campo a campo quando o usuário sai de um campo (blur)
// e limpa o erro visual assim que começa a digitar de novo
[campoNome, campoEmail, campoMsg].forEach((campo) => {

  campo.addEventListener("blur", () => {
    if (campo === campoEmail) {
      // email tem regra própria
      emailValido(campo.value) ? marcarValido(campo) : marcarInvalido(campo);
    } else {
      // nome >= 3, mensagem >= 10
      const minimo = campo === campoMsg ? 10 : 3;
      campo.value.trim().length >= minimo
        ? marcarValido(campo)
        : marcarInvalido(campo);
    }
  });

  // usuário começou a corrigir — tira o vermelho pra não ficar gritando
  campo.addEventListener("input", () => {
    if (campo.classList.contains("invalido")) {
      campo.classList.remove("invalido");
      const erro = campo.parentElement.querySelector(".msg-erro");
      if (erro) erro.classList.remove("visivel");
    }
  });
});


// --- SUBMIT ---

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // sem isso a página recarrega e perde tudo

  if (!validarFormulario()) {
    // manda o foco pro primeiro campo com problema
    const primeiroInvalido = form.querySelector(".invalido");
    if (primeiroInvalido) primeiroInvalido.focus();
    return;
  }

  // desabilita o botão pra não dar duplo envio
  btnSubmit.disabled    = true;
  btnSubmit.textContent = "Enviando…";

  // simula 1.5s de latência de rede — aqui entraria o fetch() real
  setTimeout(() => {
    limparFormulario();
    exibirModal();

    btnSubmit.disabled    = false;
    btnSubmit.textContent = "Enviar mensagem";
  }, 1500);
});


// --- LIMPAR FORMULÁRIO ---

// reseta os valores e remove as classes de estado (verde/vermelho)
function limparFormulario() {
  form.reset();
  [campoNome, campoEmail, campoMsg].forEach((campo) => {
    campo.classList.remove("valido", "invalido");
    campo.removeAttribute("aria-invalid");
  });
}


// --- MODAL ---

function exibirModal() {
  modalSucesso.classList.add("ativo");
  modalSucesso.setAttribute("aria-hidden", "false");
  if (btnFecharModal) btnFecharModal.focus(); // foco acessível ao abrir
}

function fecharModal() {
  modalSucesso.classList.remove("ativo");
  modalSucesso.setAttribute("aria-hidden", "true");
  btnSubmit.focus(); // devolve o foco pra quem abriu o modal
}

// botão "Fechar" dentro do modal
if (btnFecharModal) {
  btnFecharModal.addEventListener("click", fecharModal);
}

// clicou no overlay escuro fora da caixa
modalSucesso.addEventListener("click", (e) => {
  if (e.target === modalSucesso) fecharModal();
});

// Escape fecha — padrão de UX esperado em qualquer modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalSucesso.classList.contains("ativo")) {
    fecharModal();
  }
});
