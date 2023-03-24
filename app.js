class Hero {
  constructor() {
    this.name = "Earth";
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.keepPlaying = true;
  }
}
let HeroPlayer = new Hero();

//console.log(HeroPlayer);
class Alien {
  constructor(name) {
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.random() * (0.8 - 0.6) + 0.6).toFixed(1);
    this.keepPlaying = true;
  }
}

function GenerateAliens() {
  // Generate Alian Ship of 6 aliens array
  let AlienShipTeam = [];
  let alienNames = ["Venus", "Mars", "Saturn", "Jupitor", "Uranus", "Pluto"];
  // names of aliens ships
  for (let i = 0; i < 6; i++) {
    let AlienShip = new Alien((nme = alienNames[i]));
    AlienShipTeam.push(AlienShip);
  }
  return AlienShipTeam; // array of 6 aliens objects
}

function SelectAlien(AlienShipTeam) {
  // Select one aline from array of 6 for battle
  if (AlienShipTeam.length > 0) {
    let selectedAlien = AlienShipTeam[0];
    //console.log(`New Alien Selected: ${selectedAlien.name}`);
    return selectedAlien;
  }else{
    console.log("~~~~~~~~~~~~~~~~~~ Battle End ~~~~~~~");
    console.log(`No more Alines..`);
  }
}

function destroyEnemy(AlienShipTeam) {
  //destroy alien ship if Hull <=0
  if (AlienShipTeam.length >= 0) {
    AlienShipTeam.shift();
    return AlienShipTeam;
  } else {
    //if all alien ships destroyed, its a victory point
    console.log("~~~~~~~~~~~~~~~~~~` Battle End ~~~~~~~");
    console.log("All Alien ships destroyed. Hero - WIN !!!!!!");
  }
}

function BattleOn() {
  console.log(
    "********************** Game Satrted ***************************"
  );
  console.log(
    `Hero : ${HeroPlayer.name}, Hull(Energy): ${HeroPlayer.hull}, Firepower: ${HeroPlayer.firepower}, Accuracy: ${HeroPlayer.accuracy}`
  );
  // let firstattack = "Hero"
  // //let firstattack = "Alien";
  let firstattack = prompt("Who is going to attack first: HERO or ALIEN");
  if (firstattack.toUpperCase() === "HERO") {
    // Now Hero is attchking Alien ship
    let AlienPlayer = SelectAlien(AlienShipTeam); 
    // Select first-index aline from alien array
    console.log(
      `Alien: ${AlienPlayer.name}, Hull(Energy): ${AlienPlayer.hull}, Firepower: ${AlienPlayer.firepower}}`
    );
    attackAlien(HeroPlayer, AlienPlayer);
  } else if (firstattack.toUpperCase() === "ALIEN") {
    // Now Alien is attchking Hero ship
    let AlienPlayer = SelectAlien(AlienShipTeam); // Select first-index aline
    console.log(
      `Alien is : ${AlienPlayer.name}, Hull(Energy): ${AlienPlayer.hull}, Firepower: ${AlienPlayer.firepower}}`
    );
    attackHero(AlienPlayer, HeroPlayer);
  } else {
    console.log(`Enter Proper Ship Name: Hero or Alien`);
  }
}

function attackAlien(Hero, TargetAlien) {
  let AcuuracyCheck = Math.random().toFixed(1);
  console.log(`Acuuracy to Game start: ${AcuuracyCheck}`);
  console.log(`Hero is now attacking alien Ship!!`);
  //Hero is attcking Alien Ship
  let attackCount = 0
  while (Hero.keepPlaying) {
    if (AcuuracyCheck < Hero.accuracy) {
      
      if (TargetAlien.hull > 0) {
        // check if Aline ship have sufficient hull(hull>0)
        TargetAlien.hull = TargetAlien.hull - Hero.firepower;
        attackCount++
        console.log(attackCount);
        //updating hull after attack
        //console.log(TargetAlien);// target with new hull point
        Hero = checkKeepPlaying(Hero);// checking if hero want to attack again 
        if (TargetAlien.hull <= 0) { // checking if target have hull or destroyed
          AlienShipTeam = destroyEnemy(AlienShipTeam);
          console.log(`one Alien Ship down. ${AlienShipTeam.length} to go`);
          //destroy first alien ship whoes hull <= 0

          Hero = checkKeepPlaying(Hero)
        } else {
          Hero = checkKeepPlaying(Hero)
          console.log(TargetAlien);
        }
      } else {
        //Hero = checkKeepPlaying(Hero);
        TargetAlien = SelectAlien(AlienShipTeam);
        //console.log(TargetAlien);
        //Select next Enemy-Alien for attack
      }
    } else {
      console.log(`Attack fail`);
      //Accuracy point didnot match
      break;
    }
  }
}

function attackHero(AlienPlayer, HeroTarget) {
  let AcuuracyCheck = Math.random().toFixed(1);
  console.log(`Acuuracy to Game start: ${AcuuracyCheck}`);
    // alien is attcking Hero ship
  while (AlienPlayer.keepPlaying) {
    if (AcuuracyCheck < AlienPlayer.accuracy) {
      if (HeroTarget.hull > 0) {
        // check if Hero have sufficient hull (humll>0)
        console.log(`Alien is now attacking Hero Ship!!`);
        HeroTarget.hull = HeroTarget.hull - AlienPlayer.firepower;
        // updating hull after attack
        console.log(HeroTarget); //hero with new hull points
        AlienPlayer = checkKeepPlaying(AlienPlayer);
        if (HeroTarget.hull <= 0) { // checking if Hero have hull or destroyed
          
          console.log("~~~~~~~~~~~~~~~~~~ Battle End ~~~~~~~");
          console.log("You Loose.... DEFEAT!!!!");
        } else {
          //AlienPlayer = checkKeepPlaying(AlienPlayer);
        }
      } else {
        console.log("Battle End. Hero - Dead");
        break;
      }
    } else {
      console.log(`Attack fail`);

      break;
    }
  }
}

function checkKeepPlaying(Hero) {
  let attackAgain = prompt(
    "Do you want to attack again: Yes or No"
  );
  if (attackAgain.toUpperCase() === "YES") {
    Hero.keepPlaying = true;
  } else {
    Hero.keepPlaying = false;
    console.log("~~~~~~~~~~~~~~~~~~ Battle End ~~~~~~~");
  }
  return Hero;
}

// function victory() {
//   console.log("~~~~~~~~~~~~~~~~~~ Battle End ~~~~~~~");
// }

AlienShipTeam = GenerateAliens(); // Generate array of 6 aliens
console.log(AlienShipTeam);
BattleOn();
