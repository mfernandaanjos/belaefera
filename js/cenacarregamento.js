export default class CenaCarregamento extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaCarregamento'
        });
    }

    preload() {
        const larguraJogo = this.sys.canvas.width;
        const barraDeProgresso = this.add.graphics();

        // registra evento de progresso para atualizar a barra de progresso
        const larguraBarra = 0.8 * larguraJogo;
        this.load.on('progress', (value) => {
            barraDeProgresso.clear();
            // barra branca preenchida
            barraDeProgresso.fillStyle(0xffffff, 1);
            barraDeProgresso.fillRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra * value, 20);
            // contorno amarelo
            barraDeProgresso.lineStyle(4, 0xc30303, 1);
            barraDeProgresso.strokeRect((larguraJogo - larguraBarra) / 2, this.sys.game.config.height / 2, larguraBarra, 20);
        });

        this.load.on('complete', () => {
            this.scene.start('CenaJogo');
        });

        this.load.image('cena', 'assets/cena.jpg');
        this.load.image('proximo', 'assets/proximo.png');
        this.load.image('gameOVER', 'assets/gameOVER.png');
        this.load.image('livros', 'assets/livros.png');
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.spritesheet('inimigo', 'assets/gaston.png', {frameWidth: 40, frameHeight: 70});
        this.load.spritesheet('bela', 'assets/belasprite.png', {frameWidth: 30, frameHeight: 70});
       
    }

    create() {

    }

    update() {

    }
}    