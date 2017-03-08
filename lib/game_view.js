const Util = require("./util");

class GameView {
  constructor(options) {
    this.game = options.game;
  }

  addMainMenu(score) {
    $('.wrapper').append(this.startScreen());
    $('.alert-screen').css('background', '#111');

    if (score !== undefined) {
      $('.player-score').append(`<h2>Your Score</h2><p class="score">${score}</p>`);
    }

    this.game.getHighScore('.high-score');

  }


  clearScreen() {
    $(document).off("keypress");
    $('.alert-screen').html('');
    $('.alert-screen').css('background', 'none');
  }

  displayScreen() {
    let ctx = this.game.context;
    // ctx.fillStyle = "#fefefe";
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 900, 550);

    // horizontal bar
    ctx.fillStyle = "#666";
    ctx.fillRect(0, 30, 900, 20);

    // vertical bar
    ctx.fillStyle = "#666";
    ctx.fillRect(440, 50, 20, 550);
  }

  displayHeaders(score, lives) {
    this.displayScore(score);
    this.displayLives(lives);
  }

  displayScore(score) {
    this.game.context.fillStyle = "#FFF";
    this.game.context.font = '24px Audiowide';
    this.game.context.fillText(`Score: ${score}`, 10, 25);
  }

  displayLives(lives) {
    this.game.context.fillStyle = "#FFF";
    this.game.context.font = '24px Audiowide';
    this.game.context.fillText(`Lives: ${lives}`, 770, 25);
  }




  startScreen() {
    return `
      <div class="alert-screen">
        <div class="player-score"></div>
        <div class="high-score-container">
          <h2>High Score</h2>
          <p class="score high-score"></p>
        </div>
        <div class="flex-center">
          <div>
            <h2>Controls</h2>
            <ul>
              <li><p>left screen:</p> <div class="controls"> <span>A</span> & <span>D</span> </div> </li>
              <li><p>right screen:</p> <div class="controls"> <span class="arrow">▲</span> & <span class="arrow">▼</span> </div> </li>
              <li><p>sound on/off:</p> <div class="controls"> <span>Q</span> </div> </li>
            </ul>
          </div>
          <div class="power-ups">
            <h2>Power Ups</h2>
            <ul>
              <li><img src="img/star_blue.png" />bigger paddles</li>
              <li><img src="img/star.png" /> removes bricks</li>
              <li><img src="img/star_green.png" /> extra life</li>
            </ul>
          </div>
        </div>
        <div class="btn btn-play">Press Enter</div>
      </div>
    `;

  }


}


module.exports = GameView;
