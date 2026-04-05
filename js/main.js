document.addEventListener('DOMContentLoaded', function () {
  const htmlElement = document.documentElement;
  const btnTema = document.getElementById('btn-tema');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const formContato = document.getElementById('form-contato');
  const modalSucesso = document.getElementById('modal-sucesso');

  function atualizarControleTema(tema) {
    if (!btnTema) return;

    const knob = btnTema.querySelector('.lang-knob');
    const lock = btnTema.querySelector('.lang-lock');
    const langText = btnTema.querySelector('.lang-text');

    if (knob && lock && langText) {
      btnTema.setAttribute('aria-pressed', tema === 'escuro' ? 'true' : 'false');
      btnTema.setAttribute('aria-label', tema === 'escuro' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
      langText.textContent = 'pt';
      lock.textContent = '⌂';
      return;
    }

    btnTema.textContent = tema === 'escuro' ? '☀️' : '🌙';
    btnTema.setAttribute('aria-label', tema === 'escuro' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
  }

  function carregarTema() {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    htmlElement.setAttribute('data-tema', temaSalvo);
    atualizarControleTema(temaSalvo);
  }

  if (btnTema) {
    btnTema.addEventListener('click', function () {
      const temaAtual = htmlElement.getAttribute('data-tema') || 'claro';
      const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
      htmlElement.setAttribute('data-tema', novoTema);
      localStorage.setItem('tema', novoTema);
      atualizarControleTema(novoTema);
    });
  }

  carregarTema();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('aberto');
      navLinks.classList.toggle('aberto');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('aberto');
        navLinks.classList.remove('aberto');
      });
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('aberto');
        navLinks.classList.remove('aberto');
      }
    });
  }

  function validarEmail(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function mostrarErro(campo, mensagem) {
    campo.classList.add('erro');
    const msgErro = campo.parentElement.querySelector('.msg-erro');
    if (msgErro) {
      msgErro.textContent = mensagem;
      msgErro.style.display = 'block';
    }
  }

  function limparErros() {
    document.querySelectorAll('.erro').forEach(function (campo) {
      campo.classList.remove('erro');
    });
    document.querySelectorAll('.msg-erro').forEach(function (msg) {
      msg.style.display = 'none';
    });
  }

  function mostrarModalSucesso() {
    if (!modalSucesso) return;
    modalSucesso.classList.add('visivel');
    const btnFechar = modalSucesso.querySelector('.btn-modal-fechar');
    if (btnFechar) btnFechar.focus();
  }

  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();
      const campoNome = document.getElementById('campo-nome');
      const campoEmail = document.getElementById('campo-email');
      const campoMsg = document.getElementById('campo-mensagem');
      let formularioValido = true;

      limparErros();

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

  if (modalSucesso) {
    const btnFechar = modalSucesso.querySelector('.btn-modal-fechar');
    if (btnFechar) {
      btnFechar.addEventListener('click', function () {
        modalSucesso.classList.remove('visivel');
      });
    }

    modalSucesso.addEventListener('click', function (e) {
      if (e.target === modalSucesso) modalSucesso.classList.remove('visivel');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalSucesso.classList.contains('visivel')) {
        modalSucesso.classList.remove('visivel');
      }
    });
  }
});
