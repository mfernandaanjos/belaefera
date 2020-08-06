export default class Jogador {
    constructor(cena) {
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(900, 50, 'bela');
        this.sprite.body.setSize(24, 16);
        this.sprite.setBounce(0.2)
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key: 'direita',
            frames: cena.anims.generateFrameNumbers('bela', {start: 13, end: 16}),
            frameRate: 10,
            repeat: -1
        });

        cena.anims.create({
            key: 'esquerda',
            frames: cena.anims.generateFrameNumbers('bela', {start: 13, end: 16 }),
            frameRate: 10,
            repeat: 0
        });

        cena.anims.create({
            key: 'atoa',
            frames: cena.anims.generateFrameNumbers('bela', { start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
        });

        cena.anims.create({
            key: 'pulando',
            frames: cena.anims.generateFrameNumbers('bela', { start: 28, end: 28}),
            frameRate: 5,
            repeat: -1
        });


        cena.anims.create({
            key: 'morreu', 
            frames: cena.anims.generateFrameNumbers('bela', {start: 93, end: 93}),
            frameRate: 5,
            repeat: -1 
        });
        

    }
}