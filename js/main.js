import Game from '/js/modules/Game.js'


document.querySelector('.field-size-selector').addEventListener('click', function () {
  if (event.target.classList.contains('btn')) {
    let game = new Game(event.target.value)

    !document.querySelector('.field') ? game.renderField() : game.restartGame()
  }
})