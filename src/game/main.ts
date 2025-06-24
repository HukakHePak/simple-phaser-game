import { Game } from 'phaser';
import { CONFIG } from './configs';

const StartGame = (parent: string) => {
    return new Game({ ...CONFIG.CORE, parent });
}

export default StartGame;
