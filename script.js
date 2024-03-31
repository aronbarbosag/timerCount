const timer = document.querySelector('.card-title');
const btnIniciar = document.getElementById('iniciar');
const btnPausar = document.getElementById('pausar');
const btnZerar = document.getElementById('zerar');
let inicioTimer;
const horario = {
  horas: 0,
  minutos: 0,
  segundos: 0,
};
function zeroEsquerda(num) {
  return num >= 10 ? num : `0${num}`;
}

function desabilitarBtn() {
  btnIniciar.setAttribute('disabled', '');
}
function habilitarBtn() {
  btnIniciar.removeAttribute('disabled');
}

function iniciarTimer(event) {
  event.preventDefault();
  timer.classList.remove('pausado');
  desabilitarBtn();
  inicioTimer = setInterval(() => {
    timer.innerHTML = `${zeroEsquerda(horario.horas)}:${zeroEsquerda(
      horario.minutos
    )}:${zeroEsquerda(horario.segundos)}`;
    horario.segundos += 1;
    if (horario.segundos === 60) {
      horario.segundos = 0;
      horario.minutos += 1;
    }
    if (horario.minutos === 60) {
      horario.minutos = 0;
      horario.horas += 1;
    }
  }, 1000);
}

function pausarTimer(event) {
  event.preventDefault();
  timer.classList.add('pausado');
  clearInterval(inicioTimer);
  habilitarBtn();
}

function zerarTimer(event) {
  event.preventDefault();
  habilitarBtn();

  horario.segundos = 0;
  horario.minutos = 0;
  horario.horas = 0;
  timer.innerHTML = `${zeroEsquerda(horario.horas)}:${zeroEsquerda(
    horario.minutos
  )}:${zeroEsquerda(horario.segundos)}`;
  pausarTimer();
}

btnIniciar.addEventListener('click', iniciarTimer);
btnPausar.addEventListener('click', pausarTimer);
btnZerar.addEventListener('click', zerarTimer);
const img = document.querySelector('.desenho img');
const btnDark = document.getElementById('btnDark');

function changeMode() {
  if (this.checked) {
    document.body.setAttribute('data-mode', 'dark');

    img.src = `imgdarkmode.svg`;
  } else {
    document.body.setAttribute('data-mode', 'light');

    img.src = `imglightmode.svg`;
  }
  salvarDados();
}

btnDark.addEventListener('change', changeMode);

function salvarDados() {
  const modoSalvo = document.body.getAttribute('data-mode');

  localStorage.setItem('mode', modoSalvo);
}

function atualizarDados() {
  const key = localStorage.getItem('mode');

  document.body.setAttribute('data-mode', key);
  img.src = `img${key}mode.svg`;
  btnDark.checked = key === 'dark' ? true : false;
}
atualizarDados();
