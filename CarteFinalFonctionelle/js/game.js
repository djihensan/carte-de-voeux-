let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     
        create: create,     
        update : update   
    }
};
let game = new Phaser.Game(config);
let inc = -0.025;
let musicIcon;
let tweenRibbonClear;

function preload() {
    this.load.image('background', './assets/images/Eid.png');
    this.load.image('pannel', './assets/images/sheep_msg.png');
    this.load.image('gift', './assets/images/sheeps.png');
    this.load.image('musicIcon', './assets/images/sheep.png');
    this.load.image('ribbon', './assets/images/fil.png');
    this.load.image('ribbonClear', './assets/images/guirllande.png');
    this.load.image('ribbonIcon', './assets/images/obj/obj_29.png');

    this.load.audio('sheepSound', './assets/audio/sheep.mp3');
}

function create() {
   
    let backImage = this.add.image(0, 375, 'background');
    backImage.setOrigin(0, 0);
    backImage.setScale(0.5);
  

    pannel = this.add.image(305, 300, 'pannel');
    pannel.setVisible(false);
    pannel.setScale(0.2);
  

    pannelText = this.add.text(240, 280, 'Eid Mubarek', { fontFamily: 'Arial', fontSize: 24, color: "#000000" });
    pannelText.setVisible(false);

    gift = this.add.image(105, 800, 'gift').setInteractive();
    gift.on('pointerdown', giftControl);
    gift.setScale(0.05);

    
    musicIcon = this.add.image(520, 820, 'musicIcon').setInteractive();
    musicIcon.setScale(0.15);
    musicIcon.alpha = 0.3;
    musicIcon.on('pointerdown', soundControl);
    
    EidMusic = this.sound.add('sheepSound');

    let ribbon = this.add.image(0, 0, 'ribbon');
    ribbon.setOrigin(0, 0);
   // ribbon.setScale(0.4);
    let ribbonClear = this.add.image(0, 0, 'ribbonClear');
    ribbonClear.setOrigin(0, 0);
   // ribbonClear.setScale(0.4);

    tweenRibbonClear = this.tweens.add({
        targets: ribbonClear,
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
        });

    ribbonIcon = this.add.image(240, 460, 'ribbonIcon').setInteractive();
    ribbonIcon.setScale(0.3);
    ribbonIcon.on('pointerdown', ribbonControl);

    // =======> ajouter la date 
    // Obtenez la date actuelle
    const currentDate = new Date();
    dateString = `Date : ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      // Ajoutez la date à la carte des vœux
    this.add.text(40, 140, dateString, {
          fontFamily: 'Arial',
          fontSize: '16px',
    });//<================
     //Ajoutez la date islamique 
     dateIslamique = (new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now()));
     this.add.text(10, 170, dateIslamique, {
        fontFamily: 'Arial',
        fontSize: '16px',
     });

    //trouvez le jour de l'eid : 16 juin 2024
    const eidDate = new Date(2024, 6, 16);
    //const eidDate = new Date(2024, 0, 5); //ici on fait les changement
    eiddateStiring = `EidDate : ${eidDate.getDate()}/${eidDate.getMonth()}/${eidDate.getFullYear()}`
    this.add.text(30, 110, eiddateStiring, {
        fontFamily: 'Arial',
        fontSize: '16px',
    });
 
    // Vérifiez si la date actuelle correspond à la date de l'Eid
    if (currentDate.toDateString() === eidDate.toDateString()) {
    // Si la condition est satisfaite, affichez un message Eid al-Adha Mubarak
        this.add.text(170, 320, " cliquez sur la famille des moutons ", {
            fontFamily: 'Arial',
            fontSize: '18px',
            fill: '#B39F8D' // Couleur rouge pour le message spécial
        });
    } else {
        const diffInDays = Math.floor((eidDate - currentDate) / (1000 * 60 * 60 * 24));
        console.log(diffInDays);
        
    // Si ce n'est pas le jour de l'Eid, affichez un message différent
        this.add.text(180, 320, `Il reste ${diffInDays} jour${diffInDays > 1 ? 's' : ''} avant l'Eid al-Adha.\n       Revenez à ce moment-là.`, {
            fontFamily: 'Arial',
            fontSize: '16px',
            fill: '#ff0000' // Couleur rouge pour le message spécial
        });
    }
}

function update() {}

function soundControl(){
    if(EidMusic.isPlaying) {
        EidMusic.pause();
        musicIcon.alpha = 0.3;
    }
    else {
        EidMusic.play();
        musicIcon.alpha = 1;
    }
}
function giftControl(){
    pannel.setVisible(true);
    pannelText.setVisible(true);
}

function ribbonControl(){
    if(tweenRibbonClear.paused) {
        tweenRibbonClear.resume();
        ribbonIcon.alpha = 1;
    }
    else {
        tweenRibbonClear.pause();
        ribbonIcon.alpha = 0.3;
    }
}



