import Jogador from "./jogador.js";


export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaJogo'
        });

        this.gameover = false;
        this.inimigos;
        this.livro;

        this.pont = 0;
        this.pontuacao;
        this.vidas = 3;

        this.fim;
    }

    preload() {

    }

    create() {
        const fundo = this.add.image(0, 0, 'cena');
        fundo.setOrigin(0, 0);

        //adicionando as plataformas
        const plataformas = this.physics.add.staticGroup();
        plataformas.create(0, 545, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(470, 545 , 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(790, 450, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(50, 350, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(690, 200, 'plataforma').setOrigin(0, 0).refreshBody();
        plataformas.create(130, 90, 'plataforma').setOrigin(0, 0).refreshBody();
        
        
        this.jogador = new Jogador(this);
        this.physics.add.collider(this.jogador.sprite, plataformas);
        
        this.teclas = this.input.keyboard.createCursorKeys();
        
        // Cria os livros
        this.livro = this.physics.add.group({
            key: 'livros',
            repeat: 17,
            setXY: { x: 18, y: 0, stepX: 70}
        });
        
        this.livro.children.iterate(function (child) {
            
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
        });

        // criação e colisão dos inimigos
        this.inimigos = this.physics.add.group();
        this.physics.add.collider(this.inimigos, plataformas);
        this.physics.add.collider(this.jogador.sprite, this.inimigos, this.chuvainim, null, this);

        //Criação de pontos 
        this.pontuacao = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000'});


        //Colisões com os coletados
        this.physics.add.collider(this.livro, plataformas);
        this.physics.add.overlap(this.jogador.sprite, this.livro, this.collectLivros, null, this);

    }

    update() {
        const jogador =  this.jogador.sprite;
        
        if(this.gameover) {
            
            return;
        }

        if (this.teclas.left.isDown) {
            jogador.setVelocityX(-160);
            jogador.setFlip(true, false)
            jogador.anims.play('esquerda', true);
        }
        else if (this.teclas.right.isDown) {
            jogador.setVelocityX(160);
            jogador.setFlip(false, false)
            jogador.anims.play('direita', true);
        } else {
            jogador.setVelocityX(0);
            if (jogador.body.touching.down) {
                jogador.anims.play('atoa');
            }

            if (this.teclas.up.isDown && jogador.body.touching.down) {
                jogador.setVelocityY(-250);
                jogador.anims.play('pulando')
            }

            if(this.pont === 1000) {
                this.physics.pause();
               
               window.location.href="fase2.html"
            }
        }

    }


    collectLivros(jogador, livros)
    {   
        livros.disableBody(true, true);

        
        this.pont += 10;
        this.pontuacao.setText('Pontuação: ' + this.pont);
      
        if(this.livro.countActive(true) === 0) {

            this.livro.children.iterate(function (child){

                child.enableBody(true, child.x, 0, true, true);
            });

           let x = (jogador.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400));

            this.inim = this.inimigos.create(x, 16, 'inimigo');
            this.inim.setBounce(1);
            this.inim.setCollideWorldBounds(true);
            this.inim.setVelocity(Phaser.Math.Between(-200, 200), 20);
            

        }
    }

    chuvainim(jogador, inimigos)
    {
        
        this.physics.pause();
        this.fim = this.add.image(600, 300, 'gameOVER');
        
       
        jogador.setTint(0xff0000);
        jogador.anims.play('morreu');
            
        this.gameover = true;
       
    }
}