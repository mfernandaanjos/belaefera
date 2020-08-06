import CenaCarregamento from './cenacarregamento.js';
import CenaJogo from './cenajogo.js';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    
    parent: 'belavilarejo',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 100
            },
            debug: false
        }
    },
    scene: [
        CenaCarregamento,
        CenaJogo
    ]
};

const jogo = new Phaser.Game(config);