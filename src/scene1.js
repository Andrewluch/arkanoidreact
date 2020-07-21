import Phaser from 'phaser';
import scene2 from './scene2';

let player, ball, violetBricks, yellowBricks, redBricks, greenBricks,
  balas, cursors, soundtrack, beep, laser;
let gameStarted = false;

let openingText, gameOverText, playerWonText;

let playerX = 400;
let playerY = 600
let isBalaCreated = false
var score = 0;
var scoreText;
var lives = 3;
var livesText;
var height = 640;

let arkanoid = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 640,
  key: 'Scene1',
  scale: {
    // mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  

  scene: {
    preload: function () {
      this.load.image('background', 'assets/images/background.png');
      this.load.image('ball', 'assets/images/ball_32_32.png');
      this.load.image('paddle', 'assets/images/paddle_128_32.png');
      this.load.image('brick1', 'assets/images/brick1_64_32.png');
      this.load.image('brick2', 'assets/images/brick2_64_32.png');
      this.load.image('brick3', 'assets/images/brick3_64_32.png');
      this.load.image('brick4', 'assets/images/brick4_64_32.png');
      this.load.image('star', 'assets/images/star.png');
      this.load.spritesheet('capsula', 'assets/images/capsula-animada.png', { frameWidth: 53, frameHeight: 20 });
      this.load.image('corazon', 'assets/images/corazon.png');
      this.load.image('boom', 'assets/images/boom2.png');
      this.load.image('bala', 'assets/images/bala.png');
      
      this.load.audio('soundtrack', 'assets/audio/soundtrack.mp3');
      this.load.audio('beep', 'assets/audio/beep.wav');
      this.load.audio('laser', 'assets/audio/laser.mp3');

    },
    create: function () {
      this.add.image(400, 320, 'background');

      // CREAR CAPSULA
      var frameNames = this.anims.generateFrameNumbers('capsula', { start: 0, end: 8 });

      this.anims.create({
        key: 'turnCapsule',
        frames: frameNames,
        frameRate: 10,
        repeat: -1
      });

      // CREAR LA PALA
        player = this.physics.add.sprite(
        playerX,
        playerY,
        'paddle',
      );

      // CREAR LA BOLA
        ball = this.physics.add.sprite(
        400,
        565,
        'ball'
      );


      // CREAR LA BALA
      /*bala = this.physics.add.sprite(
        432, // x position
        560, // y position
        'bala' // clave de imagen para el sprite
      );*/


      // AÑADIR EL AUDIO 
      //El primer parámetro es la llamada a la clave que contiene la ruta
      // del audio y el segundo activa el bucle.
      soundtrack = this.sound.add('soundtrack', { loop: true });
      beep = this.sound.add('beep');

      // Decimos a soundtrack que empiece a sonar. 
      //soundtrack.play('');
      this.input.keyboard.on('keydown_SPACE', () => {
        soundtrack.play('');
      });


      // AÑADIR LADRILLOS VERDES
      greenBricks = this.physics.add.group({
        key: 'brick4',
        repeat: 9,
        immovable: true,
        setXY: {
          x: 80,
          y: 160,
          stepX: 70
        }
      });

      // AÑADIR LADRILLOS VIOLETAS
      violetBricks = this.physics.add.group({
        key: 'brick1',
        repeat: 9,
        immovable: true,
        setXY: {
          x: 80,
          y: 130,
          stepX: 70
        }
      });

      // AÑADIR LADRILLOS AMARILLOS
      yellowBricks = this.physics.add.group({
        key: 'brick2',
        repeat: 9,
        immovable: true,
        setXY: {
          x: 80,
          y: 100,
          stepX: 70
        }
      });

      // AÑADIR LADRILLOS ROJOS
      redBricks = this.physics.add.group({
        key: 'brick3',
        repeat: 9,
        immovable: true,
        setXY: {
          x: 80,
          y: 70,
          stepX: 70
        }
      });

      //AÑADIR BALAS
        balas = this.physics.add.group({
        key: 'bala',
        repeat: 1,
        immovable: true,
        setXY: {
          playerX,
          playerY,
          stepX: 30
        }
      });


      // MANEJAR CON EL TECLADO
      cursors = this.input.keyboard.createCursorKeys();

      // PARA QUE LA PELOTA Y EL JUGADOR NO SALGAN DE LA PANTALLA
      player.setCollideWorldBounds(true);
      ball.setCollideWorldBounds(true);

      ball.setBounce(1, 1);

      this.physics.world.checkCollision.down = false;

      // COLISION DE LOS LADRILLOS
      this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
      this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
      this.physics.add.collider(ball, redBricks, hitBrick, null, this);
      this.physics.add.collider(ball, greenBricks, hitBrick, null, this);


      // Hacer que el jugador sea inamovible
      player.setImmovable(true);
      //bala.setImmovable(true);
      // Añadir colisión para la jugadora
      this.physics.add.collider(ball, player, hitPlayer, null, this);

      // TEXTO APERTURA
      openingText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Press SPACE to Start',
        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '30px',
          fill: '#fff'
        },
      );

      /*
      El origen del objeto de texto está en la parte superior izquierda, cambie el origen al centro para que pueda alinearse correctamente
       */
      openingText.setOrigin(0.5);





      // TEXTO GAME OVER
      gameOverText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Game Over',

        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '50px',
          fill: '#fff'
        },
        ball.setPosition(400, 565),
        player.setPosition(400, 600),
      );

      gameOverText.setOrigin(0.5);

      // Hazlo invisible hasta que la jugadora pierda
      gameOverText.setVisible(false);

      // TEXTO HAS GANADO
      playerWonText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'You won! Pasas al nivel 2',
        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '50px',
          fill: '#fff'
        },
        
        //this.scene.add ('scene2'),
        //this.scene.add('Scene2'),

      );

      playerWonText.setOrigin(0.5);

      // Hazlo invisible hasta que la jugadora gane
      playerWonText.setVisible(false);

      // TEXTO SCORE
      scoreText = this.add.text(50, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
      livesText = this.add.text(626, 16, 'Lives: 3', { fontSize: '24px', fill: '#fff' });

    },
    update: function () {
      // Comprueba si la pelota salió de la escena, es decir, el juego terminó

      if (isGameOver(this.physics.world)) {
        gameOverText.setVisible(false);
        //ball.disableBody(true, true);
        soundtrack.stop('');
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


      } else if (isWon()) {
        playerWonText.setVisible(true);
        ball.disableBody(true, true);
      } else {
        // Pon esto para que el jugador no se mueva si no se presiona ninguna tecla
        player.body.setVelocityX(0);
        // bala.body.setVelocityX(0);
        // bala2.body.setVelocityX(0);

        /*
         Verifique el cursor y mueva la velocidad en consecuencia. Con Arcade Physics nosotros
         ajustar la velocidad de movimiento en lugar de manipular los valores xy directamente
         */
        if (cursors.left.isDown) {
          player.body.setVelocityX(-1200);


          playerX = player.body.position.x
          console.log("pala: " + playerX);
          playerY = player.body.position.y
          // if(isBalaCreated){
          //  bala.body.setVelocityX(-1200);
          // // bala2.body.setVelocityX(-1200);
          // }
        } else if (cursors.right.isDown) {
          player.body.setVelocityX(1200);
          console.log("pala: " + playerX);

          playerX = player.body.position.x
          playerY = player.body.position.y
          // if(isBalaCreated){
          //  bala.body.setVelocityX(1200);
          // // bala2.body.setVelocityX(1200);
          // }
        }

        // El juego solo comienza cuando el usuario presiona la barra espaciadora para soltar la pala
        if (!gameStarted) {

          // La pelota debe seguir la paleta mientras el usuario selecciona por dónde comenzar
          ball.setX(player.x);
          //bala.setX(player.x + 35);
          //bala2.setX(player.x -40);
          //bala1.setX(player.x);

          if (cursors.space.isDown) {
            gameStarted = true;
            /*
            if(tieneLaCapsulaDeDisparar) {
              //creamos un objeto bala.
              // le damos posicion X y posicion Y de la pala
              // le damos velocityy -200
            }
            */

            ball.setVelocityY(-300);
            //bala.setImmovable(true);
            // bala.setVelocityY(-200);
            // bala2.setVelocityY(-200);

            openingText.setVisible(false);
          }
        }
      }
    },

    physics: {
      default: 'arcade',
      arcade: {
        gravity: false
      },
    }
  }
};

/*
 Checks if the user lost the game
  @param world - the physics world
  @return {boolean}
 */
function isGameOver(world) {

  return ball.body.y > world.bounds.height;
}

/**
 Comprueba si la usuaria ganó el juego.
 @return {boolean}
 */
function isWon() {
  return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() + greenBricks.countActive() == 0;
}

/**
  Esta función maneja la colisión entre una bola y un sprite de ladrillo.
 En la función de creación, la bola es un sprite y violetBricks, yellowBricks y
  Los redBricks son grupos de sprites. Phaser es lo suficientemente inteligente como para manejar las colisiones
  para cada sprite individual.
  @param ball - the ball sprite
  @param brick - the brick sprite
 */

function hitBala(bala, brick) {
  brick.disableBody(true, true);
  bala.disableBody(true, true);
}

function hitBrick(ball, brick) {
  brick.disableBody(true, true);
  let noCoincidir = false;


  const estrellaAleatoria = Math.floor(Math.random() * 10);
  if (estrellaAleatoria === 0 && noCoincidir === false) {
    let posicionX = brick.body.position.x + 30;
    let posicionY = brick.body.position.y + 10;
    this.star = this.physics.add.image(posicionX, posicionY, 'star');
    this.star.setGravityY(100);
    noCoincidir = true;

    //COLISION ESTRELLA CON PALA
    this.physics.add.collider(this.star, player, hitStar, null, this);

  }


  // CAPSULA ALEATORIA
  const numeroAleatorio = Math.floor(Math.random() * 6);
  // const numeroAleatorio = 0;
  if (numeroAleatorio === 0 && noCoincidir === false) {
    let posicionX = brick.body.position.x + (brick.body.width / 1.3) + 10; // 10 es mitad de la anchura de la estrella
    let posicionY = brick.body.position.y + (brick.body.height / 2);
    this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsula');
    this.capsula.setGravityY(100);
    this.physics.add.collider(this.capsula, player, hitCapsula, null, this);
    this.capsula.anims.play('turnCapsule');
  }

  const corazonAleatorio = Math.floor(Math.random() * 20);
  if (corazonAleatorio === 0 && noCoincidir === false) {
    let posicionX = brick.body.position.x + 30;
    let posicionY = brick.body.position.y + 10;
    this.corazon = this.physics.add.image(posicionX, posicionY, 'corazon');
    this.corazon.setGravityY(100);
    noCoincidir = true;

    //COLISION CORAZON CON PALA
    this.physics.add.collider(this.corazon, player, hitCorazon, null, this);

  }

  const bombaAleatoria = Math.floor(Math.random() * 8);
  if (bombaAleatoria === 0 && noCoincidir === false) {
    let posicionX = brick.body.position.x + 30;
    let posicionY = brick.body.position.y + 10;
    this.boom = this.physics.add.image(posicionX, posicionY, 'boom');
    this.boom.setGravityY(100);
    noCoincidir = true;

    //COLISION BOMBA CON PALA
    this.physics.add.collider(this.boom, player, hitBoom, null, this);
    // this.physics.add.collider(this.boom, player,hitBala, null, this);

  }

  score += 10;
  scoreText.setText('Score: ' + score);
  beep.play();

  if (ball.body.velocity.x == 0) {
    let randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(300);
    } else {
      ball.body.setVelocityX(-300);
    }
  }
}



/**
 La función maneja la colisión entre la pelota y el jugador. Queremos
 para asegurar que la dirección de la pelota después de rebotar en el jugador se base
 en qué lado del jugador fue golpeado. Además, para hacer las cosas más difíciles, nosotros
 quiere aumentar la velocidad de la pelota cuando es golpeada.
  @param ball - the ball sprite
  @param player - the player/paddle sprite
 */
function hitPlayer(ball, player) {
  // Aumenta la velocidad de la pelota después de que rebota
  ball.setVelocityY(ball.body.velocity.y - 5);

  let newXVelocity = Math.abs(ball.body.velocity.x) + 5;
  // Si la pelota está a la izquierda del jugador, asegúrese de que la velocidad x sea negativa
  if (ball.x < player.x) {
    ball.setVelocityX(-newXVelocity);
  } else {
    ball.setVelocityX(newXVelocity);
  }
}


//FUNCIONES DE LAS COSAS QUE CAEN
function hitStar(star, player) {
  star.disableBody(true, true);
  score = score * 2;
  scoreText.setText('Score: ' + score);
  // player.width.setScale(2).refreshBody();
}

function hitCapsula(capsula, player) {
  // Si la capsula golpea la pala, pasa algo:
  capsula.disableBody(true, true);
  //player.width.setScale(2).refreshBody();
}


function hitCorazon(corazon, player) {
  corazon.disableBody(true, true);
  lives = lives + 1

  livesText.setText('Lives: ' + lives);
  // player.width.setScale(2).refreshBody();
}

function hitBoom(boom, player) {
  boom.disableBody(true, true);
  let fisica = this.physics;
  disparar(fisica, 5);
  //game.time.events.repeat(Phaser.Timer.SECOND * 5, 5, bala, this);
};

function disparar(fisica, repeticiones) {
  balas = fisica.add.group({
    key: 'bala',
    repeat: 1,
    setXY: { x: playerX, y: playerY, stepX: 60 }
  });

  balas.children.iterate(function (bala) {

    bala.setVelocityY(-900)
    bala.setCollideWorldBounds(false);

    fisica.add.collider(bala, violetBricks, hitBala, null, this);
    fisica.add.collider(bala, yellowBricks, hitBala, null, this);
    fisica.add.collider(bala, redBricks, hitBala, null, this);
    fisica.add.collider(bala, greenBricks, hitBala, null, this);
  });

  if (repeticiones > 0) {
    setTimeout(function () {
      disparar(fisica, repeticiones - 1);
    }, 500)
    laser = this.sound.add('laser');
  }
}
// function render() {

//   game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
//   game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

// }




export default arkanoid


