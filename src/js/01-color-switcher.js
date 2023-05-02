const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
  let intervalId = null;

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function startInterval() {
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
  }

  function stopInterval() {
    clearInterval(intervalId);
    startBtn.disabled = false;
  }

  startBtn.addEventListener('click', startInterval);
  stopBtn.addEventListener('click', stopInterval);
