import Phaser from 'phaser';
import Scene2 from './scene2'
import Scene3 from './scene3'
import WebFont from 'webfontloader'


let player, ball, greenBricks, violetBricks, yellowBricks, redBricks, balas, cursors, soundtrack, beep;
let gameStarted = false;

let openingText, gameOverText, playerWonText;
let playerX = 400;
let playerY = 600;
let arrayCapsulas = [];
let isBalaCreated = false
let score = 0;
let maximo;
let highscoreText = maximo;
let highscoreTextNumber;
let scoreText;
let scoreTextNumber;
let lives = 3;
let livesText;
let livesTextNumber;
let height = 640;
let config;


class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene1',
            active: true,

        })

    }

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('logo', 'assets/images/arkanoid-logo.png');
        this.load.image('creditos', 'assets/images/arkanoid-copyright.png');
        this.load.image('bordeIzdo', 'assets/images/borde-izdo.png');
        this.load.image('bordeSup', 'assets/images/borde-sup.png');
        this.load.image('ball', 'assets/images/ball_32_32.png');
        this.load.image('paddle', 'assets/images/paddle_128_32.png');
        this.load.image('brick1', 'assets/images/brick1_64_32.png');
        this.load.image('brick2', 'assets/images/brick2_64_32.png');
        this.load.image('brick3', 'assets/images/brick3_64_32.png');
        this.load.image('brick4', 'assets/images/brick4_64_32.png');
        this.load.image('brick5', 'assets/images/brick5_64_32.png');
        this.load.image('brick6', 'assets/images/brick6_64_32.png');
        this.load.image('brick7', 'assets/images/brick7_64_32.png');
        this.load.image('brick8', 'assets/images/brick8_64_32.png');
        this.load.image('brick9', 'assets/images/brick9_64_32.png');
        this.load.image('brick9b', 'assets/images/brick9b_64_32.png');
        this.load.image('brick9c', 'assets/images/brick9c_64_32.png');
        this.load.image('brick9d', 'assets/images/brick9d_64_32.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.spritesheet('capsularoja', 'assets/images/capsula-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.spritesheet('capsulagris', 'assets/images/capsula-gris-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.spritesheet('capsulaceleste', 'assets/images/capsula-celeste-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.spritesheet('capsulaverde', 'assets/images/capsula-verde-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.spritesheet('capsulamorada', 'assets/images/capsula-morada-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.spritesheet('capsulanaranja', 'assets/images/capsula-naranja-animada.png', { frameWidth: 53, frameHeight: 20 });
        this.load.image('corazon', 'assets/images/corazon.png');
        this.load.image('boom', 'assets/images/boom2.png');
        this.load.image('bala', 'assets/images/bala.png');
        // this.load.image('bala2', 'assets/images/bala.png');
        this.load.audio('soundtrack', 'assets/audio/soundtrack.mp3');
        this.load.audio('beep', 'assets/audio/beep.wav');
        // this.load.audio('laser', 'assets/audio/laser.mp3');
    };
    create() {


        this.add.image(1000, 120, 'logo');
        this.add.image(400, 320, 'background');
        this.add.image(995, 620, 'creditos');

        //CAPSULA ROJA
        var frameNames = this.anims.generateFrameNumbers('capsularoja', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleRoja',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        });

        //CAPSULA GRIS
        var frameNames = this.anims.generateFrameNumbers('capsulagris', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleGris',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        });

        //CAPSULA CELESTE
        var frameNames = this.anims.generateFrameNumbers('capsulaceleste', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleCeleste',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        });

        //CAPSULA VERDE
        var frameNames = this.anims.generateFrameNumbers('capsulaverde', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleVerde',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        });

        //CAPSULA MORADA
        var frameNames = this.anims.generateFrameNumbers('capsulamorada', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleMorada',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        });

        //CAPSULA NARANJA
        var frameNames = this.anims.generateFrameNumbers('capsulanaranja', { start: 0, end: 8 });
        this.anims.create({
            key: 'turnCapsuleNaranja',
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

        this.physics.world.setBounds(25, 25, 745, 640);


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
   
        // Añadir colisión para la jugadora
        this.physics.add.collider(ball, player, hitPlayer, null, this);

        // TEXTO APERTURA
        openingText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Press SPACE to Start',
            {
                fontFamily: 'Game Over',
                fontSize: '100px',
                fill: '#fff'
            },
        );

        openingText.setOrigin(0.5);

        // TEXTO GAME OVER
        gameOverText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Game Over',


            {
                fontFamily: 'Game Over',
                fontSize: '100px',
                fill: '#fff'
            },
            ball.setPosition(400, 565),
            player.setPosition(400, 600),
        );

        gameOverText.setOrigin(0.5);

        // Hazlo invisible hasta que la jugadora pierda
        gameOverText.setVisible(false);


        // TEXTO SCORE
        highscoreText = this.add.text(850, 190, 'High Score ', { fontFamily: 'Game Over', fontSize: '100px', fill: '#fff' });
        highscoreTextNumber = this.add.text(850, 220, '0', { fontFamily: 'Game Over', fontSize: '125px', fill: 'yellow' });
        scoreText = this.add.text(850, 290, 'Score ', { fontFamily: 'Game Over', fontSize: '100px', fill: '#fff' });
        scoreTextNumber = this.add.text(850, 320, '0', { fontFamily: 'Game Over', fontSize: '125px', fill: 'yellow' });    
        livesText = this.add.text(850, 390, 'Lives ', { fontFamily: 'Game Over', fontSize: '100px', fill: '#fff' });
        livesTextNumber = this.add.text(850, 420, '3', { fontFamily: 'Game Over', fontSize: '125px', fill: 'yellow' });


    };
    update() {
        let highscore = localStorage.getItem('highscore')
        if (highscore === undefined) {
            localStorage.setItem('highscore', score)
        }
        if (score > highscore) {
            localStorage.setItem('highscore', score)
        }
        if (highscore === null) {
            highscore = 0
        } else {
            maximo = localStorage.getItem('highscore')

            highscoreText.setText('High Score ' )
            highscoreTextNumber.setText( maximo)
        }


        if (isGameOver(this.physics.world)) {
            gameOverText.setVisible(false);
            soundtrack.stop('');
            lives = lives - 1;

            livesTextNumber.setText(lives);
            livesText.setText('Lives ' )
            livesText.setFontFamily('Game Over')

            //PARA QUE SE ACABE TODO AL HACER GAME OVER
            for (let i = 0; i < arrayCapsulas.length; i++) {
                arrayCapsulas[i].destroy()
            }
            


            ball.setPosition(400, 565);
            ball.body.setVelocityX(ball.body.velocity.x)
            ball.body.setVelocityX(ball.body.velocity.y)
            player.setPosition(400, 600);
            if (lives === 0) {
                gameOverText.setVisible(true);
                ball.body.setVelocityY(0);
                ball.body.setVelocityX(0);
                ball.setPosition(400, 565);

            }


        } else if (isWon()) {
            ball.disableBody(true, true);
            playerWonText = this.add.text(
                this.physics.world.bounds.width / 2,
                this.physics.world.bounds.height / 2,
                'LEVEL 2',

                {
                    fontFamily: 'Game Over',
                    fontSize: '100px',
                    fill: '#fff'
                },

                localStorage.setItem('score', score)
            );

            playerWonText.setOrigin(0.5);
            playerWonText.setVisible(true);


            this.scene.switch('Scene2');
            this.scene.wake('Scene2');
            this.scene.sleep('Scene1');


        } else {
            // Pon esto para que el jugador no se mueva si no se presiona ninguna tecla
            player.body.setVelocityX(0);

            if (cursors.left.isDown) {
                player.body.setVelocityX(-600);
                playerX = player.body.position.x
                playerY = player.body.position.y

            } else if (cursors.right.isDown) {
                player.body.setVelocityX(600);
                playerX = player.body.position.x
                playerY = player.body.position.y

            }


            // El juego solo comienza cuando el usuario presiona la barra espaciadora para soltar la pala
            if (!gameStarted) {

                // La pelota debe seguir la paleta mientras el usuario selecciona por dónde comenzar
                ball.setX(player.x);

                if (cursors.space.isDown) {
                    gameStarted = true;
                    ball.setVelocityY(-300);
                    openingText.setVisible(false);
                }
            }

        }

    }

}

function isGameOver(world) {

    return ball.body.y > world.bounds.height;
}

/**
 Comprueba si la usuaria ganó el juego.
 @return {boolean}
 */
function isWon() {
    return violetBricks.countActive() + redBricks.countActive() + yellowBricks.countActive() + greenBricks.countActive() == 0;
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
    score += 10;
    
    scoreText.setText('Score ' )
    scoreTextNumber.setText( score)

}

function hitBrick(ball, brick) {
    brick.disableBody(true, true);
    let noCoincidir = false;

    // CAPSULA ALEATORIA ROJA
    const capsulaRojaAleatoria = Math.floor(Math.random() * 6);
    if (capsulaRojaAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + 30;
        let posicionY = brick.body.position.y + 10;
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsularoja');
        this.capsula.setGravityY(100);
        this.physics.add.collider(this.capsula, player, hitBoom, null, this);
        this.capsula.anims.play('turnCapsuleRoja');
        noCoincidir = true;
        arrayCapsulas.push(this.capsula)

        //COLISION BOMBA CON PALA
        this.physics.add.collider(this.capsula, player, hitBoom, null, this);


    }

    //CAPSULA ALEATORIA NARANJA
    const capsulaNaranjaAleatoria = Math.floor(Math.random() * 7);
    if (capsulaNaranjaAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + (brick.body.width / 3.2) + 10;
        let posicionY = brick.body.position.y + (brick.body.height / 2);
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsulanaranja');
        this.capsula.setGravityY(100);
        this.capsula.anims.play('turnCapsuleNaranja');
        noCoincidir = true;
        arrayCapsulas.push(this.capsula)

        //COLISION CON PALA
        this.physics.add.collider(this.capsula, player, hitCapsulaNaranja, null, this);
    }


    // CAPSULA ALEATORIA GRIS
    const capsulaGrisAleatoria = Math.floor(Math.random() * 9);
    if (capsulaGrisAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + 30;
        let posicionY = brick.body.position.y + 10;
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsulagris');
        this.capsula.setGravityY(100);
        this.physics.add.collider(this.capsula, player, hitCorazon, null, this);
        this.capsula.anims.play('turnCapsuleGris');
        noCoincidir = true;
        arrayCapsulas.push(this.capsula)

        //COLISION CORAZON CON PALA
        this.physics.add.collider(this.capsula, player, hitCorazon, null, this);

    }

    //CAPSULA ALEATORIA CELESTE
    const capsulaCelesteAleatoria = Math.floor(Math.random() * 7);
    if (capsulaCelesteAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + 30;
        let posicionY = brick.body.position.y + 10;
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsulaceleste');
        this.capsula.anims.play('turnCapsuleCeleste');
        this.capsula.setGravityY(100);
        noCoincidir = true;
        arrayCapsulas.push(this.capsula)

        //COLISION ESTRELLA CON PALA
        this.physics.add.collider(this.capsula, player, hitStar, null, this);

    }

    //CAPSULA ALEATORIA VERDE
    const capsulaVerdeAleatoria = Math.floor(Math.random() * 4);
    if (capsulaVerdeAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + (brick.body.width / 3.2) + 10;
        let posicionY = brick.body.position.y + (brick.body.height / 2);
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsulaverde');
        this.capsula.setGravityY(100);
        this.capsula.anims.play('turnCapsuleVerde');
        noCoincidir = true;
        arrayCapsulas.push(this.capsula)

        //COLISION  CON PALA
        this.physics.add.collider(this.capsula, player, hitCapsulaVerde, null, this);
    }

    //CAPSULA ALEATORIA MORADA
    const capsulaMoradaAleatoria = Math.floor(Math.random() * 6);
    if (capsulaMoradaAleatoria === 0 && noCoincidir === false) {
        let posicionX = brick.body.position.x + (brick.body.width / 3.2) + 10;
        let posicionY = brick.body.position.y + (brick.body.height / 2);
        this.capsula = this.physics.add.sprite(posicionX, posicionY, 'capsulamorada');
        this.capsula.setGravityY(100);
        this.capsula.anims.play('turnCapsuleMorada');
     
        arrayCapsulas.push(this.capsula)

        //COLISION  CON PALA
        this.physics.add.collider(this.capsula, player, hitCapsulaMorada, null, this);
    }

    //FUNCIONES DE LAS COSAS QUE CAEN CAPSULA CELESTE
    function hitStar(capsula, player) {
        capsula.disableBody(true, true);
        ball = this.physics.add.sprite(
            400,
            565,
            'ball',
        );
        ball.setVelocityY(-600);
        ball.setVelocityX(600);
        ball.setBounce(1, 1);
        this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
        this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
        this.physics.add.collider(ball, redBricks, hitBrick, null, this);
        this.physics.add.collider(ball, greenBricks, hitBrick, null, this);
        this.physics.add.collider(ball, player, hitPlayer, null, this);

        ball.setCollideWorldBounds(true);

    }

    let verde = false;
    function hitCapsulaVerde(capsula, player) {
        verde = true;
        player.scaleX = 1;
        capsula.disableBody(true, true);
        ball.setPosition(400, 565);
        gameStarted = false;
        ball.body.setVelocityY(0);
        ball.body.setVelocityX(0);
        if (cursors.space.isDown) {
            ball.body.setVelocityY(-600);
            ball.body.setVelocityX(600);
            verde = false;
        }
    }

    function hitCapsulaNaranja(capsula, player) {

        capsula.disableBody(true, true);
        player.scaleX = 1;
        let oldXVelocity = ball.body.velocity.x;
        let oldYVelocity = ball.body.velocity.y;
        let newXVelocity = ball.body.velocity.x / 2;
        let newYVelocity = ball.body.velocity.y / 2;
        ball.body.setVelocityY(newYVelocity);
        ball.body.setVelocityX(newXVelocity);
        setTimeout(() => {
            // newXVelocity = ball.body.velocity.x ;
            // newYVelocity = ball.body.velocity.y ;
            ball.body.setVelocityX(ball.body.velocity.x * 2);
            ball.body.setVelocityY(ball.body.velocity.y * 2);

        }, 5000)

    }

    let palaDoble = false;
    function hitCapsulaMorada(capsula, player) {

        // ball.body.setVelocityY(-400);
        // ball.body.setVelocityX(400);
        capsula.disableBody(true, true);
        palaDoble = true;
        player.scaleX = 1.5;
        if (palaDoble === true) {
            setTimeout(function () {

                player.scaleX = 1;
            }, 5000)

        }


    }




    score += 10;
    scoreText.setText('Score ' )
    scoreTextNumber.setText( score)
    beep.play();

    if (ball.body.velocity.x === 0) {
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

//ESTO ES LO MIO
// function hitPlayer(ball, player) {
//     // Aumenta la velocidad de la pelota después de que rebota
//     ball.setVelocityY(ball.body.velocity.y + 0);
//     let newXVelocity = Math.abs(ball.body.velocity.x) + 0;
//     // Si la pelota está a la izquierda del jugador, asegúrese de que la velocidad x sea negativa
//     if (ball.x < player.x) {
//         ball.setVelocityX(-newXVelocity);
//     } else {
//         ball.setVelocityX(newXVelocity);
//     }
// }

function hitPlayer(ball, player) {
    // Increase the velocity of the ball after it bounces
    ball.setVelocityY(ball.body.velocity.y - 5);

    let newXVelocity = Math.abs(ball.body.velocity.x) + 5;
    // If the ball is to the left of the player, ensure the x velocity is negative
    if (ball.x < player.x) {
        ball.setVelocityX(-newXVelocity);
    } else {
        ball.setVelocityX(newXVelocity);
    }
}

//FUNCIONES DE LAS COSAS QUE CAEN
// function hitStar(star, player) {
//     star.disableBody(true, true);
//     score = score * 2;
//     scoreText.text ='Score: ' + score;

//     function hitCapsula(capsula, player) {
//         // Si la capsula golpea la pala, pasa algo:
//         capsula.disableBody(true, true);


//     }

//     // function disparar(fisica, repeticiones) {
//     //     balas = fisica.add.group({
//     //         key: 'bala',
//     //         repeat: 1,
//     //         setXY: { x: playerX, y: playerY, stepX: 60 }
//     //     });

//     //     balas.children.iterate(function (bala) {

//     //         bala.setVelocityY(-900)
//     //         bala.setCollideWorldBounds(false);

//     //         fisica.add.collider(bala, violetBricks, hitBala, null, this);
//     //         fisica.add.collider(bala, yellowBricks, hitBala, null, this);
//     //         fisica.add.collider(bala, redBricks, hitBala, null, this);
//     //         fisica.add.collider(bala, greenBricks, hitBala, null, this);
//     //     });

//     //     if (repeticiones > 0) {
//     //         setTimeout(function () {
//     //             disparar(fisica, repeticiones - 1);
//     //         }, 500)
//     //         // laser = this.sound.add('laser');
//     //     }
//     // }
//     // function render() {

//     //   game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
//     //   game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

//     // }

// }



function hitCorazon(capsula, player) {
    capsula.disableBody(true, true);
    lives = lives + 1

   
    livesTextNumber.setText(lives);
    livesText.setText('Lives ' )
    livesText.setFontFamily('Game Over');
    // player.width.setScale(2).refreshBody();
}



function hitBoom(capsula, player) {
    capsula.disableBody(true, true);
    let fisica = this.physics;
    disparar(fisica, 5);

    //game.time.events.repeat(Phaser.Timer.SECOND * 5, 5, bala, this);

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
            // laser = this.sound.add('laser');
        }
    }
}

config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 640,
    scene: [Scene1, Scene2, Scene3],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        },
    }
}

let game = new Phaser.Game(config)
export default Scene1

