import { Component } from '@angular/core';
import { Story } from './interface/story.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  possibleRaces: String[] = [
    'Altmer (High Elf)',
    'Argonian',
    'Bosmer (Wood Elf)',
    'Breton',
    'Dunmer (Dark Elf)',
    'Imperial ',
    'Khajiit',
    'Nord',
    'Orsimer (Orc)',
    'Redguard ',
  ];
  possibleFactions: String[] = [
    'Bards College',
    'College of Winterhold',
    'Companions',
    'Companions (and live as a werewolf)',
    'Coven of Namira',
    'House Telvanni',
    'Dark Brotherhood',
    'Thieves Guild',
    'Tribal Orcs',
    'Dawnguard',
    'Volkihar Clan (never to be cured)',
    'Volkihar Clan',
  ];
  possibleSkills: String[] = [
    'Alteration',
    'Conjuration',
    'Destruction',
    'Enchanting',
    'Illusion',
    'Restoration',
    'Alchemy',
    'Light Armor',
    'Lockpicking',
    'Pickpocket',
    'Sneak',
    'Speech',
    'Archery',
    'Block',
    'Heavy Armor',
    'One-Handed',
    'Smithing',
    'Two-Handed',
  ];
  possibleOccupations: String[] = [
    'Blacksmithing',
    'Alchemy',
    'Enchanting',
    'Farming',
    'Pickpocketing and Fencing',
    'Dungeoneering',
  ];

  possibleQuestlines: String[] = [
    'visit the Greybeards',
    'join the Imperials',
    'join the Stormcloaks',
    'find the Dragon Masks',
    'build a Custom Home',
    'seek out all Daedric artifacts',
  ];

  story: Story;

  generated: boolean = false;

  accepted: boolean = false;

  storyTold: String = '';
  rerolls: number = 3;
  accept: boolean = false;
  decline: boolean = false;
  paused: boolean = true;
  acceptanceText: String;
  audio = new Audio();

  constructor() {
    this.story = {
      race: '',
      skills: {
        skill1: '',
        skill2: '',
        skill3: '',
      },
      faction: '',
      questline: '',
      occupation: '',
    };
    this.acceptanceText = this.accept ? 'nope' : 'yay';

    this.audio.src = '../assets/Skyrim-The-Song-of-the-Dragonborn.mp3';
  }
  title = 'Skyrim Character Generator';
  Generate() {
    this.accepted = false;
    this.generated = true;
    this.storyTold = '';
    this.deciding(this.possibleFactions);
    this.deciding(this.possibleSkills);
    this.deciding(this.possibleQuestlines);
    this.deciding(this.possibleOccupations);
    this.deciding(this.possibleRaces);
    this.playSound();
  }
  Reroll() {
    this.accepted = false;
    this.generated = true;
    this.storyTold = '';
    this.deciding(this.possibleFactions);
    this.deciding(this.possibleSkills);
    this.deciding(this.possibleQuestlines);
    this.deciding(this.possibleOccupations);
    this.deciding(this.possibleRaces);
    this.reroller();
  }
  onAcceptance() {
    this.accepted = true;
    this.generated = false;
    this.tellStory();
    this.rerolls = 3;
  }

  deciding(parameter: String[]) {
    if (parameter.includes('Breton')) {
      this.story.race =
        this.possibleRaces[Math.floor(Math.random() * parameter.length)];
    }
    if (parameter.includes('Bards College')) {
      this.story.faction =
        this.possibleFactions[Math.floor(Math.random() * parameter.length)];
    }
    if (parameter.includes('Alteration')) {
      this.decideSkills();
    }
    if (parameter.includes('visit the Greybeards')) {
      this.story.questline =
        this.possibleQuestlines[Math.floor(Math.random() * parameter.length)];
    }
    if (parameter.includes('Farming')) {
      this.story.occupation =
        this.possibleOccupations[Math.floor(Math.random() * parameter.length)];
    }
  }

  reroller() {
    this.rerolls--;
    if (this.rerolls < 1) {
      this.onAcceptance();
    }
  }

  playSound() {
    this.audio.play();
  }

  decideSkills() {
    for (let x = 0; x < 3; ) {
      let skillToAssign = this.possibleSkills[Math.floor(Math.random() * 18)];
      if (x === 0) {
        this.story.skills.skill1 = skillToAssign;
        x++;
      }
      if (skillToAssign !== this.story.skills.skill1 && x === 1) {
        this.story.skills.skill2 = skillToAssign;
        x++;
      }
      if (
        skillToAssign !== this.story.skills.skill1 &&
        skillToAssign !== this.story.skills.skill2 &&
        x === 2
      ) {
        this.story.skills.skill3 = skillToAssign;
        x++;
      }
    }
  }
  tellStory() {
    this.storyTold = `You will explore the land of Skyrim as a proud member of the ${this.story.race}. \n 
      You will be especially proficient at ${this.story.skills.skill1}, ${this.story.skills.skill2}, and ${this.story.skills.skill3}. \n
      With these abilities, you may journey and join forces with the ${this.story.faction}. \n
      After progressing with the ${this.story.faction} you should ${this.story.questline}. \n   
      As needed, you should provide for yourself with the various loot you come across or ${this.story.occupation} as your income.`;
  }
}
