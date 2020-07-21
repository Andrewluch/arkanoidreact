import React, { useState } from 'react';
import logo from './logo.svg';
import { IonPhaser } from '@ion-phaser/react';
import Scena1 from './prueba.js';
//import scene2 from './scene2';

import "./App.css"


function App() {
  let [game] = useState (Scena1.game);
  let [initialize] = useState(true);
  return (
    <div>
    <div id="game" >
      <IonPhaser game={game} initialize={initialize} />
    </div>
    </div>
  );
}




export default App;