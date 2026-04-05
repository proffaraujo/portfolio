// main.js — comportamentos compartilhados entre todas as páginas
// tema claro/escuro, hamburger e modal de sucesso do form
// Autor: Francisco Araújo - Trabalho UNINTER.

document.addEventListener('DOMContentLoaded', function () {

  // pega tudo que vai precisar — se não existir na página, fica null mesmo
  const htmlElement = document.documentElement;
  const btnTema     = document.getElementById('btn-tema');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('nav-links');
  const formContato = document.getElementById('form-contato');
  const modalSucesso = document.getElementById('modal-sucesso');


  // --- TEMA CLARO / ESCURO ---

  // atualiza o botão de tema dependendo de qual componente tiver na página:
  // home usa o toggle com knob; páginas internas usam só emoji
  function atualizarControleTema(tema) {
    if (!btnTema) return;

    const knob     = btnTema.querySelector('.lang-knob');
    const lock     = btnTema.querySelector('.lang-lock');
    const langText = btnTema.querySelector('.lang-text');

    if (knob && lock && langText) {
      // é o toggle da home — só ajusta aria e mantém o texto fixo
      btnTema.setAttribute('aria-pressed', tema === 'escuro' ? 'true' : 'false');
      btnTema.setAttribute('aria-label', tema === 'escuro' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
      langText.textContent = 'pt';
      lock.textContent = '⌂';
      return;
    }

    // botão simples das páginas internas — troca o emoji
    btnTema.textContent = tema === 'escuro' ? '☀️' : '🌙';
    btnTema.setAttribute('aria-label', tema === 'escuro' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
  }

  // lê o tema salvo no localStorage; se não tiver nada, assume claro
  function carregarTema() {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    htmlElement.setAttribute('data-tema', temaSalvo);
    atualizarControleTema(temaSalvo);
  }

  if (btnTema) {
    btnTema.addEventListener('click', function () {
      // inverte o tema atual e salva pra próxima visita
      const temaAtual = htmlElement.getAttribute('data-tema') || 'claro';
      const novoTema  = temaAtual === 'escuro' ? 'claro' : 'escuro';
      htmlElement.setAttribute('data-tema', novoTema);
      localStorage.setItem('tema', novoTema);
      atualizarControleTema(novoTema);
    });
  }

  carregarTema(); // roda logo na carga pra não piscar o tema errado


  // --- HAMBURGER ---

  if (hamburger && navLinks) {

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation(); // evita que o clique vaze pro document e feche na hora
      hamburger.classList.toggle('aberto');
      navLinks.classList.toggle('aberto');
    });

    // clicou num link do menu — fecha o menu
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('aberto');
        navLinks.classList.remove('aberto');
      });
    });

    // clicou fora do menu — fecha também
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('aberto');
        navLinks.classList.remove('aberto');
      }
    });
  }


  // --- HELPERS DO FORMULÁRIO (só roda se a página tiver o form) ---

  // regex básico — não precisa ser RFC completo, só pegar os casos óbvios
  function validarEmail(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  // pinta o campo de vermelho e mostra a mensagem de erro embaixo
  function mostrarErro(campo, mensagem) {
    campo.classList.add('erro');
    const msgErro = campo.parentElement.querySelector('.msg-erro');
    if (msgErro) {
      msgErro.textContent = mensagem;
      msgErro.style.display = 'block';
    }
  }

  // limpa tudo — chamada antes de revalidar ou após sucesso
  function limparErros() {
    document.querySelectorAll('.erro').forEach(function (campo) {
      campo.classList.remove('erro');
    });
    document.querySelectorAll('.msg-erro').forEach(function (msg) {
      msg.style.display = 'none';
    });
  }

  // exibe o modal e joga o foco no botão de fechar (acessibilidade)
  function mostrarModalSucesso() {
    if (!modalSucesso) return;
    modalSucesso.classList.add('visivel');
    const btnFechar = modalSucesso.querySelector('.btn-modal-fechar');
    if (btnFechar) btnFechar.focus();
  }


  // --- SUBMIT DO FORMULÁRIO ---

  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();

      const campoNome  = document.getElementById('campo-nome');
      const campoEmail = document.getElementById('campo-email');
      const campoMsg   = document.getElementById('campo-mensagem');
      let formularioValido = true;

      limparErros(); // zera o estado visual antes de revalidar

      if (!campoNome.value.trim()) {
        mostrarErro(campoNome, 'Por favor, informe seu nome.');
        formularioValido = false;
      }

      if (!campoEmail.value.trim()) {
        mostrarErro(campoEmail, 'Por favor, informe seu e-mail.');
        formularioValido = false;
      } else if (!validarEmail(campoEmail.value.trim())) {
        mostrarErro(campoEmail, 'Formato de e-mail inválido. Ex: prof.faraujo@gmail.com');
        formularioValido = false;
      }

      if (!campoMsg.value.trim()) {
        mostrarErro(campoMsg, 'Por favor, escreva sua mensagem.');
        formularioValido = false;
      }

      if (formularioValido) {
        formContato.reset();
        limparErros();
        mostrarModalSucesso();
      }
    });

    // usuário começou a corrigir o campo — tira o erro na hora, sem esperar submit
    formContato.querySelectorAll('input, textarea').forEach(function (campo) {
      campo.addEventListener('input', function () {
        if (campo.classList.contains('erro')) {
          campo.classList.remove('erro');
          const msgErro = campo.parentElement.querySelector('.msg-erro');
          if (msgErro) msgErro.style.display = 'none';
        }
      });
    });
  }


  // --- FECHAR O MODAL ---

  if (modalSucesso) {
    const btnFechar = modalSucesso.querySelector('.btn-modal-fechar');

    // botão "Fechar" dentro do modal
    if (btnFechar) {
      btnFechar.addEventListener('click', function () {
        modalSucesso.classList.remove('visivel');
      });
    }

    // clicou no overlay escuro fora da caixa
    modalSucesso.addEventListener('click', function (e) {
      if (e.target === modalSucesso) modalSucesso.classList.remove('visivel');
    });

    // Escape também fecha — boa prática de acessibilidade
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalSucesso.classList.contains('visivel')) {
        modalSucesso.classList.remove('visivel');
      }
    });
  }

});
