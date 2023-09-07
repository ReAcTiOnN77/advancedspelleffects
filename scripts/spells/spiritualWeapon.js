class spiritualWeapon {
  static registerHooks() {
  }
  static async createSpiritualWeapon(midiData) {
    const casterActor = midiData.actor;
    const casterActorRollData = casterActor.getRollData();
    canvas.tokens.get(midiData.tokenId);
    const item = midiData.item;
    const effectOptions = item.getFlag("advancedspelleffects", "effectOptions") ?? {};
    const level = midiData.itemLevel;
    let summonType = "Spiritual Weapon";
    const casterActorSpellcastingMod = casterActorRollData.abilities[casterActorRollData.attributes.spellcasting].mod ?? 0;
    casterActor.system.attributes.spelldc;
    const summonerAttack = casterActorRollData.attributes.prof + casterActorSpellcastingMod + Number(casterActorRollData.bonuses?.msak?.attack ?? 0);
    const summonerMod = casterActorSpellcastingMod + Number(casterActorRollData.bonuses?.msak?.damage ?? 0);
    let damageScale = "";
    async function myEffectFunction(template, options2, update2) {
      let glowColor;
      let color = options2.color;
      const sound = options2.effectOptions?.summonSound ?? "";
      const soundDelay = Number(options2.effectOptions?.summonSoundDelay) ?? 0;
      const volume = options2.effectOptions?.summonVolume ?? 1;
      switch (color) {
        case "blue":
          glowColor = rgbToHex(173, 216, 230);
          break;
        case "green":
          glowColor = rgbToHex(144, 238, 144);
          break;
        case "orange":
          glowColor = rgbToHex(255, 128, 0);
          break;
        case "pruple":
          glowColor = rgbToHex(153, 0, 153);
          break;
        case "red":
          glowColor = rgbToHex(204, 0, 0);
          break;
        case "yellow":
          glowColor = rgbToHex(255, 255, 0);
          break;
        case "pink":
          glowColor = rgbToHex(255, 102, 255);
          break;
        default:
          glowColor = rgbToHex(153, 204, 255);
      }
      let effectFile = `jb2a.eldritch_blast.${color}`;
      if (!Sequencer.Database.entryExists(effectFile)) {
        effectFile = `jb2a.eldritch_blast.yellow`;
      }
      let effect = `jb2a.bless.400px.intro.${color}`;
      if (!Sequencer.Database.entryExists(effect)) {
        effect = `jb2a.bless.400px.intro.yellow`;
      }
      new Sequence("Advanced Spell Effects").sound().file(sound).delay(soundDelay).volume(volume).playIf(sound !== "").effect().file(effectFile).atLocation(template).waitUntilFinished(-1200).endTime(3300).playbackRate(0.7).scaleOut(0, 250).filter("Glow", { color: glowColor, distance: 35, outerStrength: 2, innerStrength: 0.25 }).center().belowTokens().effect().file(effect).atLocation(template).center().scale(1.5).belowTokens().play();
    }
    __name(myEffectFunction, "myEffectFunction");
    async function postEffects(template, token) {
      new Sequence("Advanced Spell Effects").animation().on(token).fadeIn(500).play();
    }
    __name(postEffects, "postEffects");
    let weaponData = [{
      type: "select",
      label: game.i18n.localize("ASE.WeaponDialogLabel"),
      options: ["Club", "Dagger", "Falchion", "Glaive", "Greataxe", "Greatclub", "Greatsword", "Halberd", "Hammer", "Handaxe", "Javelin", "Longsword", "Mace", "Maul", "Quarterstaff.01", "Quarterstaff.02", "Quarterstaff.03", "Quarterstaff.04", "Rapier", "Scimitar", "Scythe", "Shortsword", "Spear", "Trident", "Warhammer", "Wrench"]
    }];
    let weaponChoice = await warpgate.dialog(weaponData);
    weaponChoice = weaponChoice[0].toLowerCase();
    let spiritWeapon = `jb2a.spiritual_weapon.${weaponChoice}`;
    let types = [];
	if (weaponChoice === "dagger" || weaponChoice === "glaive") {
		types = Sequencer.Database.getPathsUnder(spiritWeapon + `.02`);
		spiritWeapon = spiritWeapon + `.02`;
	} else if (weaponChoice === "quarterstaff.01" || weaponChoice === "quarterstaff.02" || weaponChoice === "quarterstaff.03" || weaponChoice === "quarterstaff.04"  ) {
		types = Sequencer.Database.getPathsUnder(spiritWeapon);
	} else {
		types = Sequencer.Database.getPathsUnder(spiritWeapon + `.01`);
		spiritWeapon = spiritWeapon + `.01`;
	}
		
	
    let typeOptions = [];
    types.forEach((type) => {
      typeOptions.push(capitalizeFirstLetter(type));
    });
    let typeData = [{
      type: "select",
      label: game.i18n.localize("ASE.SpiritTypeDialogLabel"),
      options: typeOptions
    }];
    let typeChoice = await warpgate.dialog(typeData);
    typeChoice = typeChoice[0].toLowerCase();
	    spiritWeapon = spiritWeapon + `.${typeChoice}`;
    let colors = [];
	
	if (weaponChoice != "longsword" && weaponChoice != "mace" && typeChoice == "spectral") {
		colors = Sequencer.Database.getPathsUnder(spiritWeapon + `.02`);
	    spiritWeapon = spiritWeapon + `.02`;
	} else if (weaponChoice === "longsword" || weaponChoice === "mace" && typeChoice != "astral" && typeChoice != "spectral" && typeChoice != "liquid") {
		colors = Sequencer.Database.getPathsUnder(spiritWeapon);
	} else {
		colors = Sequencer.Database.getPathsUnder(spiritWeapon + `.01`);
		spiritWeapon = spiritWeapon + `.01`;
	}
	
	
    let colorOptions = [];
    colors.forEach((color) => {
      colorOptions.push(capitalizeFirstLetter(color));
    });
    let attackColors;
    if (weaponChoice === "mace" || weaponChoice === "maul" || weaponChoice === "scythe" || weaponChoice === "sword") {
      attackColors = Sequencer.Database.getPathsUnder(`jb2a.spiritual_weapon.${weaponChoice}`);
    } else if (Sequencer.Database.entryExists(`jb2a.${weaponChoice}.melee`)) {
      attackColors = Sequencer.Database.getPathsUnder(`jb2a.${weaponChoice}.melee`);
    } else {
      attackColors = Sequencer.Database.getPathsUnder(`jb2a.sword.melee.fire`);
    }
    let attackColorOptions = [];
    attackColors.forEach((attackColor) => {
      attackColorOptions.push(capitalizeFirstLetter(attackColor));
    });
    let colorData = [{
      type: "select",
      label: game.i18n.localize("ASE.SpiritColorDialogLabel"),
      options: colorOptions
    }];
    let colorChoices = await warpgate.dialog(colorData);
    let spiritColorChoice = colorChoices[0].toLowerCase();
    let attackColorChoice = spiritColorChoice;
    spiritWeapon = spiritWeapon + `.${spiritColorChoice}`;
    let spiritAttackAnim;
    if (weaponChoice !== "scythe") {
      if (attackColorChoice === "white") {
        attackColorChoice = "black";
      } else if (weaponChoice === "mace" || weaponChoice === "maul" && attackColorChoice === "purple") {
        attackColorChoice = "dark_purple";
      }
      spiritAttackAnim = `jb2a.${weaponChoice}.melee.fire.${attackColorChoice}`;
    } else {
      spiritAttackAnim = spiritWeapon;
    }
    let spiritualWeapon2 = Sequencer.Database.getEntry(spiritWeapon).file;
    let spiritualWeaponAttackImg = Sequencer.Database.getEntry(spiritWeapon).file;
    if (spiritualWeaponAttackImg.includes("Mace") || spiritualWeaponAttackImg.includes("Maul")) {
		if (spiritualWeaponAttackImg.includes("Astral") || spiritualWeaponAttackImg.includes("Liquid")) {
			spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("400x400.webm", "Thumb.webp");
		} else {
	      spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("200x200.webm", "Thumb.webp");
		}
    } else if (spiritualWeaponAttackImg.includes("Scythe")){
		if (spiritualWeaponAttackImg.includes("Astral") || spiritualWeaponAttackImg.includes("Liquid")) {
			spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("400x400.webm", "Thumb.webp");
		} else {
	      spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("300x300.webm", "Thumb.webp");
		}
    } else if (spiritualWeaponAttackImg.includes("Sword")){
		if (spiritualWeaponAttackImg.includes("Long") || spiritualWeaponAttackImg.includes("Short")) {
			spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("400x400.webm", "Thumb.webp");
		} else {
			spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("200x200.webm", "Thumb.webp");
		}
	} else {
		spiritualWeaponAttackImg = spiritualWeaponAttackImg.replace("400x400.webm", "Thumb.webp");
    }
    const spiritualWeaponActorImg = spiritualWeaponAttackImg;
    if (level - 3 > 0) {
      damageScale = `+ ${Math.floor((level - 2) / 2)}d8[upcast]`;
    }
    const attackItemName = game.i18n.localize("ASE.SpiritAttackItemName");
    let updates = {
      token: {
        "alpha": 0,
        "name": `${summonType} of ${casterActor.name}`,
        "img": spiritualWeapon2,
        "scale": 1.5,
        "actorLink": false
      },
      actor: {
        "name": `${summonType} of ${casterActor.name}`,
        "img": spiritualWeaponActorImg
      },
      embedded: {
        Item: {}
      }
    };
    updates.embedded.Item[attackItemName] = {
      "type": "weapon",
      img: spiritualWeaponAttackImg,
      "system": {
        "ability": "",
        "actionType": "mwak",
        "activation": { "type": "action", "cost": 1, "condition": "" },
        "attackBonus": `- @mod - @prof + ${summonerAttack}`,
        "damage": { "parts": [[`1d8 ${damageScale} + ${summonerMod}`, "force"]], "versatile": "" },
        "range": { "value": null, "long": null, "units": "" },
        "description": {
          "value": game.i18n.localize("ASE.SpiritAttackItemDescription")
        }
      },
      "flags": {
        "advancedspelleffects": {
          "enableASE": true,
          "disableSettings": true,
          "spellEffect": game.i18n.localize("ASE.SpiritAttackItemName"),
          "castItem": true,
          "castStage": "preDamage",
          "effectOptions": {
            "attackAnimFile": spiritAttackAnim
          }
        }
      }
    };
    let crosshairsConfig = {
      size: 1,
      label: `${summonType} of ${casterActor.name}`,
      tag: "spiritual-weapon-crosshairs",
      drawIcon: false,
      drawOutline: false,
      interval: 2
    };
    const options = { controllingActor: game.actors.get(casterActor.id), crosshairs: crosshairsConfig };
    const displayCrosshairs = /* @__PURE__ */ __name(async (crosshairs) => {
      new Sequence("Advanced Spell Effects").effect().file(spiritualWeapon2).attachTo(crosshairs).persist().name("ASE-spiritual-weapon-crosshairs").opacity(0.5).play();
    }, "displayCrosshairs");
    const callbacks = {
      pre: async (template, update2) => {
        myEffectFunction(template, { color: spiritColorChoice, effectOptions });
        await warpgate.wait(1750);
      },
      post: async (template, token) => {
        postEffects(template, token);
        await warpgate.wait(500);
        await Sequencer.EffectManager.endEffects({ name: "ASE-spiritual-weapon-crosshairs" });
      },
      show: displayCrosshairs
    };
    warpgate.spawn(summonType, updates, callbacks, options);
  }
  static async spiritualWeaponAttack(data) {
    console.log("ASE Spiritual Weapon Attacking...", data);
    data.actor;
    const casterToken = canvas.tokens.get(data.tokenId);
    const spellItem = data.item;
    const aseEffectOptions = spellItem?.getFlag("advancedspelleffects", "effectOptions");
    const attackAnimFile = aseEffectOptions?.attackAnimFile;
    const target = Array.from(data.targets)[0];
    let hitTargets = Array.from(data.hitTargets);
    console.log("Hit Targets: ", hitTargets);
    const missed = hitTargets.length === 0;
    console.log("ASE Spiritual Weapon Attack Missed: ", missed);
    new Sequence("Advanced Spell Effects").animation().on(casterToken).opacity(1).fadeOut(250).effect().fadeIn(750).startTime(500).endTime(650).file(attackAnimFile).missed(missed).atLocation(casterToken).fadeOut(500).stretchTo(target).waitUntilFinished(-250).animation().on(casterToken).opacity(1).fadeIn(750).play();
  }
  static async getRequiredSettings(currFlags) {
    if (!currFlags)
      currFlags = {};
    const spellDetails = {
      actionType: "other",
      target: {
        type: "",
        units: "",
        value: null,
        width: null
      }
    };
    let spellOptions = [];
    let animOptions = [];
    let soundOptions = [];
    soundOptions.push({
      label: game.i18n.localize("ASE.SummonSoundLabel"),
      type: "fileInput",
      name: "flags.advancedspelleffects.effectOptions.summonSound",
      flagName: "summonSound",
      flagValue: currFlags.summonSound ?? ""
    });
    soundOptions.push({
      label: game.i18n.localize("ASE.SummonSoundDelayLabel"),
      type: "numberInput",
      name: "flags.advancedspelleffects.effectOptions.summonSoundDelay",
      flagName: "summonSoundDelay",
      flagValue: currFlags.summonSoundDelay ?? 0
    });
    soundOptions.push({
      label: game.i18n.localize("ASE.SummonVolumeLabel"),
      type: "rangeInput",
      name: "flags.advancedspelleffects.effectOptions.summonVolume",
      flagName: "summonVolume",
      flagValue: currFlags.summonVolume ?? 0.5,
      min: 0,
      max: 1,
      step: 0.01
    });
    return {
      spellOptions,
      animOptions,
      soundOptions,
      allowInitialMidiCall: false,
      requireDetails: spellDetails
    };
  }
}