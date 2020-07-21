import React, { useState, useEffect } from 'react';
import "./pantalla.css"

function partida1(){
var [score, setScore] = useState (0);
var [scoreText, setscoreText]=useSate("");
var [lives, setLives] = useState (3);
var [livesText, setlivesText]= ("");
}

 // TEXTO SCORE
 scoreText = this.add.text(50, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
 livesText = this.add.text(626, 16, 'Lives: 3', { fontSize: '24px', fill: '#fff' });


 score += 10;
 scoreText.setText('Score: ' + score);
 beep.play();


 score = score * 2;
scoreText.setText('Score: ' + score);

lives = lives - 1;
livesText.setText('Lives: ' + lives);
ball.setPosition(400, 565);
player.setPosition(400, 600);
if (lives === 0) {
  gameOverText.setVisible(true);
  ball.body.setVelocityY(0);
  ball.body.setVelocityX(0);
  ball.setPosition(400, 565);
}

lives = lives + 1  
livesText.setText('Lives: ' + lives);