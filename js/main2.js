let imgBackground = new Image()
let map

let botaoEl = document.querySelector('#botao');

let canvasEl = document.querySelector('#game');
let ctx = canvasEl.getContext('2d');
    imgBackground.src = 'assets/floresta.png'
    map = new Map(imgBackground,3,1000,500,0)

const ALTURA_JOGO = 500;
const LARGURA_JOGO = 1000;
/////////////////////////////////

class Sprites {
    constructor(x, y, largura, altura, imagem){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.imagem = imagem;
    }
    desenha(ctx){
        if(this.imagem){
            ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
        } else {
            ctx.strokeRect(this.x, this.y, this.largura, this.altura);

        }
    }

    get centro() {
        return {
            x: this.x + this.largura / 2,
            y: this.y + this.altura / 2
        };
    }

    colideCom(outraSprite) {
        let a = Math.abs(outraSprite.centro.x - this.centro.x);
        let b = Math.abs(outraSprite.centro.y - this.centro.y);
        let d = Math.sqrt(a ** 2 + b ** 2);
        let r1 = this.altura / 2;
        let r2 = outraSprite.altura / 2;

        return d <= r1 + r2;
    }
}

class Lobo extends Sprites {
    constructor() {
        super(LARGURA_JOGO, Math.random() * (ALTURA_JOGO - 200), 100, 100, imagemLobo);
        this.velocidadeX = -2 * Math.random() - 1;
    }

    atualizar() {
        this.x += this.velocidadeX;

        if (this.x + this.largura < 0) {
            this.x = LARGURA_JOGO;
            this.y = Math.random() * (ALTURA_JOGO - 30);
        }
    }

    destruir() {
        this.x = LARGURA_JOGO;
        this.y = Math.random() * (ALTURA_JOGO - 30);

    }
}
class Tiro extends Sprites {
    constructor(bela) {
        super(bela.centro.x, bela.centro.y, 50, 50, imagemTiro);
        this.velocidadeX = 6;
    }

    atualizar() {
        this.x += this.velocidadeX;
        if (this.x > LARGURA_JOGO) {
            this.podeSerDestruido = true;
        }
    }
}

let vidas = 10;
let pontos = 0;

        let imagemLobo = new Image;
        imagemLobo.src = 'assets/lobo.png';
        let lobos = [];

        lobos.push(new Lobo());
        lobos.push(new Lobo());
        lobos.push(new Lobo());
       

        let imagemBela = new Image;
        imagemBela.src = 'assets/bela.gif';
        let bela = new Sprites(400, 100, 200, 180, imagemBela);

        imagemBela.addEventListener('load', (e)=>{
            drawGame();
        });
        imagemTiro = new Image;
        imagemTiro.src = 'assets/tiro.png';

        let tiros = [];

        canvasEl.addEventListener('mousemove', (e)=>{
           bela.x = e.offsetX - bela.largura/2;
            bela.y = e.offsetY - bela.altura/2;
        });
        


function drawGame(){
    setInterval(() =>{
        ctx.clearRect(0,0,1000,500)
        map.show(ctx)
        map.move(ctx)

        bela.desenha(ctx);

    for(let lobo of lobos){
        lobo.desenha(ctx);
         
      }
      for (let tiro of tiros) {
             tiro.desenha(ctx);
         }

         ctx.fillStyle = 'white';
         ctx.font = "20px 'Arial'";
         ctx.fillText(`${vidas} VIDA(S)`, 10, 25);
         ctx.fillText(`${pontos} PONTO(S)`, 875, 25);

     
    },10)

    
     function atualizaInimigos() {
        for (let lobo of lobos) {
            lobo.atualizar();
        }
    }


    function atualizaTiros() {
        for (let tiro of tiros) {
            tiro.atualizar();
        }

        for (let i = 0; i < tiros.length; i++) {
            if (tiros[i].podeSerDestruido) {
                tiros.splice(i, 1);
            }
        }
    }

    function verificaColisoes() {
        for (let lobo of lobos) {
            const atingiuBela = lobo.colideCom(bela);
            if (atingiuBela) {
                lobo.destruir();
                vidas--;
                if (vidas < 1) {
                    alert('Você perdeu todas as vidas...\n');
                }
            }
        }
        for (let lobo of lobos) {
            for (let tiro of tiros) {
                const tiroAtingiuLobo = tiro.colideCom(lobo);
                if (tiroAtingiuLobo) {
                    tiro.podeSerDestruido = true;
                    lobo.destruir();
                    pontos++;
                    if(pontos == 10){
                        alert('Você ganhou!\n');

                         window.location.href ="fase3.html"
                    }
                }
            }
        }
    }

    function atualizaLogicaJogo(){
        atualizaInimigos();
        atualizaTiros();
        verificaColisoes();

        drawGame();
    }

    setInterval(atualizaLogicaJogo, 33);

    function darTiro() {
        let tiro = new Tiro(bela);
        tiros.push(tiro);
    }

    document.body.addEventListener('keydown', e => {
        if (e.key === ' ') {
            darTiro();
            
            e.preventDefault();
        }
    })
}