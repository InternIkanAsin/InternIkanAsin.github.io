export default class AssetLoader {
  static loadAllAssets(scene) {
    AssetLoader.loadRexUIPlugin(scene); //x
    AssetLoader.loadUIAssets(scene); //x
    AssetLoader.loadSceneAssets(scene); //x
    AssetLoader.loadOutfitAssets(scene);
    AssetLoader.loadAudioAssets(scene); //x
    AssetLoader.loadMakeUpAssets(scene);
    AssetLoader.loadBachelorAssets(scene); //x
    scene.load.once('complete', () => {
      AssetLoader.changeFilterMode(scene);
    });
  }
  static loadGame(scene) {
    AssetLoader.loadUIAssets(scene);
    AssetLoader.loadAudioAssets(scene);
    AssetLoader.loadCutsceneAssets(scene);
  }

  static loadMiniGame(scene) {
    AssetLoader.loadRexUIPlugin(scene);
    AssetLoader.loadSceneAssets(scene);
    AssetLoader.loadBachelorAssets(scene);
  }

  static loadDressUpAssets(scene) {
    // Load all assets for outfits
    return new Promise((resolve) => {
      scene.load.once('complete', resolve);
      AssetLoader.loadOutfitAssets(scene);
      scene.load.start();
    });
  }

  static loadMakeUpAssets(scene) {
    // Load all assets for outfits
    return new Promise((resolve) => {
      scene.load.once('complete', resolve);
      AssetLoader.loadMakeupAssets(scene);
      scene.load.start();
    });
  }
  static loadCutsceneAssets(scene) {
    scene.load.image('AnggaHangout1', 'Asset/Background/Pool.png');
    scene.load.image('AzrilHangout1', 'Asset/Background/Concert.jpg');
    scene.load.image('IndraHangout1', 'Asset/Background/Cafe.jpg');
    scene.load.image('RezaHangout1', 'Asset/Background/Park.jpg');
    scene.load.image('KeenanHangout1', 'Asset/Background/Aquarium.jpg');
  }
  static loadRexUIPlugin(scene) {
    scene.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });

    scene.load.plugin('rexbbcodetextplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js',
      true);
  }
  static loadUIAssets(scene) {
    scene.load.image('dialogueBox', 'Asset/UI/Text_Box.png');
    scene.load.image('dialogueNameBox', 'Asset/UI/Name_Box.png');

    //New Assets
    scene.load.image('buttonIcon', 'Asset/UI/Button_Released.png');
    scene.load.image('buttonIconPressed', 'Asset/UI/Button_Pressed.png');

    scene.load.image('dressButtonIcon', 'Asset/UI/Wardrobe_Icon.png');
    scene.load.image('makeUpButtonIcon', 'Asset/UI/Makeup_Icon.png');
    scene.load.image('dressButtonIcon2', 'Asset/UI/Wardrobe_Icon_Plain.png');
    scene.load.image('makeUpButtonIcon2', 'Asset/UI/Makeup_Two_Icon.png');

    scene.load.image('backButtonIcon', 'Asset/UI/Back_Button_Released.png');
    scene.load.image('backButtonIconPressed', 'Asset/UI/Back_Button_Pressed.png');

    scene.load.image('stitchedButtonIcon', 'Asset/UI/Stitched_Button.png');
    scene.load.image('StitchedButtonWithoutStitchIcon', "Asset/UI/Stitched_Button_WithoutStitch.png")

    scene.load.image('removeDressIcon', 'Asset/UI/Undress_All_Icon.png');
    scene.load.image('removeMakeUpIcon', 'Asset/UI/Remove_All_MakeUp_Icon.png');

    scene.load.image('readyButtonIcon', 'Asset/UI/Tombol_Ready_Released.png');
    scene.load.image('readyButtonIconPressed', 'Asset/UI/Tombol_Ready_Pressed.png');

    scene.load.image('readyButtonIconPressed', 'Asset/UI/Tombol_Ready_Pressed.png');
    scene.load.image('leftDrape', 'Asset/UI/Curtains_Released_Left.png');
    scene.load.image('rightDrape', 'Asset/UI/Curtains_Released_Right.png');
    scene.load.image('leftCurtain', 'Asset/UI/Curtain_Tied_Left.png');
    scene.load.image('rightCurtain', 'Asset/UI/Curtain_Tied_Right.png');
    scene.load.image('leftCurtainUntied', 'Asset/UI/Curtain_Tied_Left_Mobile.png');
    scene.load.image('rightCurtainUntied', 'Asset/UI/Curtain_Tied_Right_Mobile.png');


    scene.load.image('sidePanel', 'Asset/UI/Panel.png');
    scene.load.image('sidePanelLine', 'Asset/UI/Panel_Line.png');

    scene.load.image('dressIcon', 'Asset/UI/Dress_Icon.png');
    scene.load.image('outerIcon', 'Asset/UI/Coat_Icon.png');
    scene.load.image('LowerIcon', 'Asset/UI/Pants_Icon.png');
    scene.load.image('socksIcon', 'Asset/UI/Socks_Icon.png');
    scene.load.image('shoesIcon', 'Asset/UI/Shoes_Icon.png');

    scene.load.image('buttonIcon2', 'Asset/UI/Button_Icon.png');
    scene.load.image('buttonIcon2Highlighted', 'Asset/UI/Button_Icon_Highlighted.png');

    scene.load.image('xMark', 'Asset/UI/Cross.png');
    scene.load.image('tickMark', 'Asset/UI/Checkmark.png');
  }

  static loadSceneAssets(scene) {
    //Dress up minigame background
    scene.load.image('background', 'Asset/Background/Cisini_UI_DressUp_Background.png');

    //Player
    scene.load.image('hair', 'Asset/Outfit/Hairs_upscaled/hair_01_black_F_out.png');
    scene.load.image('01blackB', "Asset/Outfit/Hairs_upscaled/hair_01_black_B_out.png");
    scene.load.image('player', 'Asset/Character/t_basebody_mc_anime_portrait.png');
    scene.load.image('LipNormalDefault', "Asset/makeup/MakeupAnime/lips/normal/mc_lips default_normal.png");
    scene.load.image('EyebrowNormalDefault', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb default_normal.png");
    scene.load.image('PupilNormalBlue', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil blue_normal.png");
    scene.load.image('EyelashesNormalDefault', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el default_normal.png");

  }

  static loadBachelorAssets(scene) {

    //Bachelor Fullbody
    scene.load.image('anggaFullbody', 'Asset/Character/ekspresi/angga/Angga_casual.png');
    scene.load.image('azrilFullbody', 'Asset/Character/ekspresi/Azril/Azril_portrait_casual.png');
    scene.load.image('indraFullbody', 'Asset/Character/ekspresi/indra/Indra_portrait_casual.png');
    scene.load.image('keenanFullbody', 'Asset/Character/ekspresi/keenan/Keenan_portrait_casual.png');
    scene.load.image('rezaFullbody', 'Asset/Character/ekspresi/reza/Reza_portrait_casual.png');

    //Bachelor Expressions
    //Neutral expression
    scene.load.image('AnggaNeutral', 'Asset/Character/ekspresi/angga/Angga_netral.png');
    scene.load.image('AzrilNeutral', 'Asset/Character/ekspresi/Azril/Azril_expression_normal.png');
    scene.load.image('IndraNeutral', 'Asset/Character/ekspresi/indra/Indra_expression_Normal.png');
    scene.load.image('KeenanNeutral', 'Asset/Character/ekspresi/keenan/Keenan_expression_normal.png');
    scene.load.image('RezaNeutral', 'Asset/Character/ekspresi/reza/Reza_expression_normal.png');



    //Happy Expression
    scene.load.image('AnggaHappy', 'Asset/Character/ekspresi/angga/Angga_Senang.png');
    scene.load.image('AzrilHappy', 'Asset/Character/ekspresi/Azril/Azril_Senang.png');
    scene.load.image('IndraHappy', 'Asset/Character/ekspresi/indra/Indra_Senang.png');
    scene.load.image('KeenanHappy', 'Asset/Character/ekspresi/keenan/Keenan_Senang.png');
    scene.load.image('RezaHappy', 'Asset/Character/ekspresi/reza/Reza_Senang.png');
  }
  static loadOutfitAssets(scene) {
    //Anime Textures

    //Dress
    scene.load.atlas(
      'Dress_spritesheet1',
      'Asset/Outfit/Terusan/dress_spritesheet.png',
      'Asset/Outfit/Terusan/spritesheet.json'
    );

    scene.load.atlas(
      'Dress_spritesheet2',
      'Asset/Outfit/Terusan/dress_spritesheet(1).png',
      'Asset/Outfit/Terusan/spritesheet (1).json'
    );

    scene.load.atlas(
      'Dress_spritesheet3',
      'Asset/Outfit/Terusan/dress_spritesheet(2).png',
      'Asset/Outfit/Terusan/spritesheet (2).json'
    );

    //Shirts
    scene.load.atlas(
      'Shirt_spritesheet',
      'Asset/Outfit/Baju/shirt_spritesheet.png',
      'Asset/Outfit/Baju/shirt_spritesheet.json'
    );

    //Lower
    scene.load.atlas(
      'Lower_spritesheet',
      'Asset/Outfit/Bawahan/lower_spritesheet.png',
      'Asset/Outfit/Bawahan/lower_spritesheet.json'
    );

    //Socks
    scene.load.atlas(
      'Socks_spritesheet',
      'Asset/Outfit/Kaos Kaki/socks_spritesheet.png',
      'Asset/Outfit/Kaos Kaki/socks_spritesheet.json'
    );

    //Shoes
    scene.load.atlas(
      'Shoes_spritesheet',
      'Asset/Outfit/Sepatu/shoes_spritesheet.png',
      'Asset/Outfit/Sepatu/shoes_spritesheet.json'
    );

    //Outer
    scene.load.atlas(
      'Outer_spritesheet',
      'Asset/Outfit/Jaket/outer_spritesheet.png',
      'Asset/Outfit/Jaket/outer_spritesheet.json'
    );

    //Outfit Icons
    //Dress
    scene.load.atlas(
      'dressIcon_spritesheet',
      'Asset/ikon/Terusan/spritesheet.png',
      'Asset/ikon/Terusan/spritesheet.json'
    );

    //Shirts
    scene.load.atlas(
      'shirtIcon_spritesheet',
      'Asset/ikon/Baju/spritesheet.png',
      'Asset/ikon/Baju/spritesheet.json'
    );

    //Underwear
    scene.load.atlas(
      'underwearIcon_spritesheet',
      'Asset/ikon/Bawahan/spritesheet (1).png',
      'Asset/ikon/Bawahan/spritesheet (1).json'
    );

    //Socks
    scene.load.atlas(
      'socksIcon_spritesheet',
      'Asset/ikon/Kaos Kaki/spritesheet (3).png',
      'Asset/ikon/Kaos Kaki/spritesheet (3).json'
    );

    //Shoes
    scene.load.atlas(
      'shoesIcon_spritesheet',
      'Asset/ikon/Sepatu/shoes_spritesheet.png',
      'Asset/ikon/Sepatu/shoes_spritesheet.json'
    );

    //Outer
    scene.load.atlas(
      'outerIcon_spritesheet',
      'Asset/ikon/Jaket/spritesheet (2).png',
      'Asset/ikon/Jaket/spritesheet (2).json'
    );
  }

  static loadMakeupAssets(scene) {
    //Icon texture
    scene.load.image('eyebrowsIcon', "Asset/UI/Eyebrow_Icon.png");
    scene.load.image('blushIcon', "Asset/UI/Blush_Icon.png");
    scene.load.image('eyelashesIcon', "Asset/UI/Eyelash_Icon.png");
    scene.load.image('eyelinerIcon', "Asset/UI/Eyeliner_Icon.png");
    scene.load.image('eyeshadowIcon', "Asset/UI/Eyeshadow_Icon.png");
    scene.load.image('lipstickIcon', "Asset/UI/Lipstick_Icon.png");
    scene.load.image('stickerIcon', "Asset/UI/Sticker_Icon.png");
    scene.load.image('eyeColorIcon', "Asset/UI/Eye_Color_Icon.png");
    scene.load.image('hairIcon', "Asset/UI/Hair_Icon.png");
    //Anime texture
    //Hair Atlas

    scene.load.atlas('hair_front_01', "Asset/Outfit/Hairs_upscaled/spritesheet_F.png", "Asset/Outfit/Hairs_upscaled/spritesheet_F.json");
    scene.load.atlas('hair_back_01', "Asset/Outfit/Hairs_upscaled/spritesheet_B.png", " Asset/Outfit/Hairs_upscaled/spritesheet_B.json");

    // Grup 2
    scene.load.atlas('hair_front_02', "Asset/Outfit/Hairs_upscaled/spritesheet_F 2.png", "Asset/Outfit/Hairs_upscaled/spritesheet_F 2.json");
    scene.load.atlas('hair_back_02', "Asset/Outfit/Hairs_upscaled/spritesheet_B 2.png", "Asset/Outfit/Hairs_upscaled/spritesheet_B 2.json");

    // Grup 3
    scene.load.atlas('hair_front_03', "Asset/Outfit/Hairs_upscaled/spritesheet_F 3.png", "Asset/Outfit/Hairs_upscaled/spritesheet_F 3.json");
    scene.load.atlas('hair_back_03', "Asset/Outfit/Hairs_upscaled/spritesheet_B 3.png", "Asset/Outfit/Hairs_upscaled/spritesheet_B 3.json");

    //hair
    scene.load.image('01blackB', "Asset/Outfit/Hairs_upscaled/hair_01_black_B_out.png");




    //blush
    scene.load.image('blushdefault', "Asset/makeup/MakeupAnime/blush/mc_blush default.png");
    scene.load.image('blushanime', "Asset/makeup/MakeupAnime/blush/mc_blush anime.png");
    scene.load.image('blushfever', "Asset/makeup/MakeupAnime/blush/mc_blush fever.png");
    scene.load.image('blushfrackles', "Asset/makeup/MakeupAnime/blush/mc_blush frackles.png");
    scene.load.image('blushlove', "Asset/makeup/MakeupAnime/blush/mc_blush love.png");
    scene.load.image('blushorange', "Asset/makeup/MakeupAnime/blush/mc_blush orange.png");
    scene.load.image('blushpink', "Asset/makeup/MakeupAnime/blush/mc_blush pink.png");
    scene.load.image('blushnose', "Asset/makeup/MakeupAnime/blush/mc_blush red nose.png");
    scene.load.image('blushround', "Asset/makeup/MakeupAnime/blush/mc_blush round.png");

    //eyebrow
    //normal
    scene.load.atlas('eyebrow_spritesheet', "Asset/makeup/MakeupAnime/eyebrow/normal/spritesheet.png", "Asset/makeup/MakeupAnime/eyebrow/normal/spritesheet.json");

    //eyelashes
    //normal
    scene.load.image('EyelashesNormalDefault', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el default_normal.png");
    scene.load.atlas('eyelashes_spritesheet', "Asset/makeup/MakeupAnime/eyeleashes/normal/spritesheet_Eyebrow.png", "Asset/makeup/MakeupAnime/eyeleashes/normal/spritesheet_Eyebrow.json");

    //eyeliner

    //normal
    scene.load.image('eyelinernormaldefault', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er default_normal.png");
    scene.load.image('eyelinernormal1', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 1_normal.png");
    scene.load.image('eyelinernormal2', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 2_normal.png");
    scene.load.image('eyelinernormal3', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 3_normal.png");
    scene.load.image('eyelinernormal4', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 4_normal.png");
    scene.load.image('eyelinernormal5', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 5_normal.png");

    //eyeshadow
    //normal
    scene.load.image('eyeshadownormaldefault', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es default_normal.png");
    scene.load.image('eyeshadownormalbrown', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es brown_normal.png");
    scene.load.image('eyeshadownormaldragon', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es dragon_normal.png");
    scene.load.image('eyeshadownormalfairy', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es fairy_normal.png");
    scene.load.image('eyeshadownormalgold', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es gold_normal.png");
    scene.load.image('eyeshadownormalgreen', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es green_normal.png");
    scene.load.image('eyeshadownormalorange', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es orange_normal.png");
    scene.load.image('eyeshadownormalpeach', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es peach_normal.png");
    scene.load.image('eyeshadownormalpink', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es pink_normal.png");
    scene.load.image('eyeshadownormalpurple', "Asset/makeup/MakeupAnime/eyeshadow/normal/mc_es purple_normal.png");


    //lip

    //normal
    scene.load.image('lipnormalbrown', "Asset/makeup/MakeupAnime/lips/normal/mc_lips brown_normal.png");
    scene.load.image('lipnormalcherry', "Asset/makeup/MakeupAnime/lips/normal/mc_lips cherry_normal.png");
    scene.load.image('lipnormalorange', "Asset/makeup/MakeupAnime/lips/normal/mc_lips orange_normal.png");
    scene.load.image('lipnormalpink', "Asset/makeup/MakeupAnime/lips/normal/mc_lips pink_normal.png");
    scene.load.image('lipnormalred', "Asset/makeup/MakeupAnime/lips/normal/mc_lips red_normal.png");
    scene.load.image('lipnormalwine', "Asset/makeup/MakeupAnime/lips/normal/mc_lips wine_normal.png");

    //pupil
    //normal
    scene.load.atlas('pupil_spritesheet', "Asset/makeup/MakeupAnime/pupil/normal/spritesheet_Pupil.png", "Asset/makeup/MakeupAnime/pupil/normal/spritesheet_Pupil.json");

    //sticker
    scene.load.atlas(
      'sticker_spritesheet',
      "Asset/makeup/MakeupAnime/sticker make up/spritesheet_stiker.png",
      "Asset/makeup/MakeupAnime/sticker make up/spritesheet_stiker.json"
    );





    //icon
    //blush 
    //scene.load.image('blushdefaultIcon', "Asset/makeup/MakeupIcon/blush/mc_blush anime.png");
    scene.load.image('blushanimeIcon', "Asset/makeup/MakeupIcon/blush/mc_blush anime.png");
    scene.load.image('blushfeverIcon', "Asset/makeup/MakeupIcon/blush/mc_blush fever.png");
    scene.load.image('blushfracklesIcon', "Asset/makeup/MakeupIcon/blush/mc_blush frackles.png");
    scene.load.image('blushloveIcon', "Asset/makeup/MakeupIcon/blush/mc_blush love.png");
    scene.load.image('blushorangeIcon', "Asset/makeup/MakeupIcon/blush/mc_blush orange.png");
    scene.load.image('blushpinkIcon', "Asset/makeup/MakeupIcon/blush/mc_blush pink.png");
    scene.load.image('blushnoseIcon', "Asset/makeup/MakeupIcon/blush/mc_blush red nose.png");
    scene.load.image('blushroundIcon', "Asset/makeup/MakeupIcon/blush/mc_blush round.png");

    //eyebrow
    scene.load.image('eyebrow1Icon', "Asset/makeup/MakeupIcon/eyebrow/mc_eb 1.png");
    scene.load.image('eyebrow2Icon', "Asset/makeup/MakeupIcon/eyebrow/mc_eb 2.png");
    scene.load.image('eyebrow3Icon', "Asset/makeup/MakeupIcon/eyebrow/mc_eb 3.png");
    scene.load.image('eyebrow4Icon', "Asset/makeup/MakeupIcon/eyebrow/mc_eb 4.png");
    scene.load.image('eyebrow5Icon', "Asset/makeup/MakeupIcon/eyebrow/mc_eb 5.png");

    //eyelashes
    scene.load.image('eyelashes1Icon', "Asset/makeup/MakeupIcon/eyeleashes/mc_el 1.png");
    scene.load.image('eyelashes2Icon', "Asset/makeup/MakeupIcon/eyeleashes/mc_el 2.png");
    scene.load.image('eyelashes3Icon', "Asset/makeup/MakeupIcon/eyeleashes/mc_el 3.png");
    scene.load.image('eyelashes4Icon', "Asset/makeup/MakeupIcon/eyeleashes/mc_el 4.png");
    scene.load.image('eyelashes5Icon', "Asset/makeup/MakeupIcon/eyeleashes/mc_el 5.png");

    //eyeliner
    scene.load.image('eyelinerdefaultIcon', "Asset/makeup/MakeupIcon/eyeliner/mc_er default.png");
    scene.load.image('eyeliner1Icon', "Asset/makeup/MakeupIcon/eyeliner/mc_er 1.png");
    scene.load.image('eyeliner2Icon', "Asset/makeup/MakeupIcon/eyeliner/mc_er 2.png");
    scene.load.image('eyeliner3Icon', "Asset/makeup/MakeupIcon/eyeliner/mc_er 3.png");
    scene.load.image('eyeliner4Icon', "Asset/makeup/MakeupIcon/eyeliner/mc_er 4.png");
    scene.load.image('eyeliner5Icon', "Asset/makeup/MakeupIcon/eyeliner/mc_er 5.png");

    //eyeshadow
    scene.load.image('eyeshadowbrownIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_brown.png");
    scene.load.image('eyeshadowdragonIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_es dragon.png");
    scene.load.image('eyeshadowfairyIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_es fairy.png");
    scene.load.image('eyeshadowgoldIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_gold.png");
    scene.load.image('eyeshadowgreenIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_green.png");
    scene.load.image('eyeshadoworangeIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_orange.png");
    scene.load.image('eyeshadowpeachIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_peach.png");
    scene.load.image('eyeshadowpinkIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_pink.png");
    scene.load.image('eyeshadowpurpleIcon', "Asset/makeup/MakeupIcon/eyeshadow/mc_purple.png");

    //lips
    scene.load.image('lipsbrownIcon', "Asset/makeup/MakeupIcon/lips/mc_lips brown.png");
    scene.load.image('lipspinkIcon', "Asset/makeup/MakeupIcon/lips/mc_lips cherry.png");
    scene.load.image('lipsredIcon', "Asset/makeup/MakeupIcon/lips/mc_lips orange.png");
    scene.load.image('lipswineIcon', "Asset/makeup/MakeupIcon/lips/mc_lips pink.png");
    scene.load.image('lipscherryIcon', "Asset/makeup/MakeupIcon/lips/mc_lips red.png");
    scene.load.image('lipsorangeIcon', "Asset/makeup/MakeupIcon/lips/mc_lips wine.png");

    //pupil
    scene.load.image('pupilblackIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil black.png");
    scene.load.image('pupilblueIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil blue.png");
    scene.load.image('pupildragonIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil dragon.png");
    scene.load.image('pupilfairyIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil fairy.png");
    scene.load.image('pupilgreenIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil green.png");
    scene.load.image('pupilmagicIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil magic.png");
    scene.load.image('pupilpinkIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil pink.png");
    scene.load.image('pupilredIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil red.png");
    scene.load.image('pupilyellowIcon', "Asset/makeup/MakeupIcon/pupil/mc_pupil yellow.png");

    //hair
    scene.load.image('01blackIcon', "Asset/ikon/Rambut/hair_01_black.png");
    scene.load.image('01blondeIcon', "Asset/ikon/Rambut/hair_01_blonde.png");
    scene.load.image('01brownIcon', "Asset/ikon/Rambut/hair_01_brown.png");
    scene.load.image('01pinkIcon', "Asset/ikon/Rambut/hair_01_pink.png");
    scene.load.image('02blackIcon', "Asset/ikon/Rambut/hair_02_black.png");
    scene.load.image('02blondeIcon', "Asset/ikon/Rambut/hair_02_blonde.png");
    scene.load.image('02brownIcon', "Asset/ikon/Rambut/hair_02_brown.png");
    scene.load.image('02pinkIcon', "Asset/ikon/Rambut/hair_02_pink.png");
    scene.load.image('03blackIcon', "Asset/ikon/Rambut/hair_03_black.png");
    scene.load.image('03blondeIcon', "Asset/ikon/Rambut/hair_03_blonde.png");
    scene.load.image('03brownIcon', "Asset/ikon/Rambut/hair_03_brown.png");
    scene.load.image('03pinkIcon', "Asset/ikon/Rambut/hair_03_pink.png");
    scene.load.image('04blackIcon', "Asset/ikon/Rambut/hair_04_black.png");
    scene.load.image('04blondeIcon', "Asset/ikon/Rambut/hair_04_blonde.png");
    scene.load.image('04brownIcon', "Asset/ikon/Rambut/hair_04_brown.png");
    scene.load.image('04pinkIcon', "Asset/ikon/Rambut/hair_04_pink.png");
    scene.load.image('05blackIcon', "Asset/ikon/Rambut/hair_05_black.png");
    scene.load.image('05blondeIcon', "Asset/ikon/Rambut/hair_05_blonde.png");
    scene.load.image('05brownIcon', "Asset/ikon/Rambut/hair_05_brown.png");
    scene.load.image('05pinkIcon', "Asset/ikon/Rambut/hair_05_pink.png");
    scene.load.image('06blackIcon', "Asset/ikon/Rambut/hair_06_black.png");
    scene.load.image('06blondeIcon', "Asset/ikon/Rambut/hair_06_blonde.png");
    scene.load.image('06brownIcon', "Asset/ikon/Rambut/hair_06_brown.png");
    scene.load.image('06pinkIcon', "Asset/ikon/Rambut/hair_06_pink.png");
    scene.load.image('07blackIcon', "Asset/ikon/Rambut/hair_07_black.png");
    scene.load.image('07blondeIcon', "Asset/ikon/Rambut/hair_07_blonde.png");
    scene.load.image('07brownIcon', "Asset/ikon/Rambut/hair_07_brown.png");
    scene.load.image('07pinkIcon', "Asset/ikon/Rambut/hair_07_pink.png");
    scene.load.image('08blackIcon', "Asset/ikon/Rambut/hair_08_black.png");
    scene.load.image('08blondeIcon', "Asset/ikon/Rambut/hair_08_blonde.png");
    scene.load.image('08brownIcon', "Asset/ikon/Rambut/hair_08_brown.png");
    scene.load.image('08pinkIcon', "Asset/ikon/Rambut/hair_08_pink.png");
    scene.load.image('09blackIcon', "Asset/ikon/Rambut/hair_09_black.png");
    scene.load.image('09blondeIcon', "Asset/ikon/Rambut/hair_09_blonde.png");
    scene.load.image('09brownIcon', "Asset/ikon/Rambut/hair_09_brown.png");
    scene.load.image('09pinkIcon', "Asset/ikon/Rambut/hair_09_pink.png");
    scene.load.image('10blackIcon', "Asset/ikon/Rambut/hair_10_black.png");
    scene.load.image('10blondeIcon', "Asset/ikon/Rambut/hair_10_blonde.png");
    scene.load.image('10brownIcon', "Asset/ikon/Rambut/hair_10_brown.png");
    scene.load.image('10violetBIcon', "Asset/ikon/Rambut/hair_10_violet.png");
    scene.load.image('11blackIcon', "Asset/ikon/Rambut/hair_11_black.png");
    scene.load.image('11blondeBIcon', "Asset/ikon/Rambut/hair_11_blonde.png");
    scene.load.image('11brownBIcon', "Asset/ikon/Rambut/hair_11_brown.png");
    scene.load.image('11pinkBIcon', "Asset/ikon/Rambut/hair_11_pink.png");


    //sticker
    //blushing love
    scene.load.image('stickerblushpinkIcon', "Asset/makeup/MakeupIcon/sticker/blushing love/mc_sticker manik pink_blush love.png");
    scene.load.image('stickerblushpurpleIcon', "Asset/makeup/MakeupIcon/sticker/blushing love/mc_sticker manik purple_blush love.png");
    scene.load.image('stickerblushredIcon', "Asset/makeup/MakeupIcon/sticker/blushing love/mc_sticker manik red_blush love.png");
    scene.load.image('stickerblushyellowIcon', "Asset/makeup/MakeupIcon/sticker/blushing love/mc_sticker manik yellow_blush love.png");

    //diamond
    scene.load.image('stickerdiamondIcon', "Asset/makeup/MakeupIcon/sticker/diamond/mc_sticker manik diamond.png");

    //love
    scene.load.image('stickerloveIcon', "Asset/makeup/MakeupIcon/sticker/love/mc_sticker manik_Love.png");

    //moonlight crown
    scene.load.image('stickermoonlightcrownblueIcon', "Asset/makeup/MakeupIcon/sticker/moonlight crown/mc_sticker manik blue_moonlight crown.png");
    scene.load.image('stickermoonlightcrownpurpleIcon', "Asset/makeup/MakeupIcon/sticker/moonlight crown/mc_sticker manik purple_moonlight crown.png");
    scene.load.image('stickermoonlightcrownredIcon', "Asset/makeup/MakeupIcon/sticker/moonlight crown/mc_sticker manik red_moonlight crown.png");
    scene.load.image('stickermoonlightcrownwhiteIcon', "Asset/makeup/MakeupIcon/sticker/moonlight crown/mc_sticker manik white_moonlight crown.png");
    scene.load.image('stickermoonlightcrownyellowIcon', "Asset/makeup/MakeupIcon/sticker/moonlight crown/mc_sticker manik yellow_moonlight crown.png");

    //princess tears
    scene.load.image('stickerprincesstearsIcon', "Asset/makeup/MakeupIcon/sticker/princess tears/mc_sticker manik_princess tears.png");

    //star
    scene.load.image('stickerstarblueIcon', "Asset/makeup/MakeupIcon/sticker/star/mc_sticker manik blue_star.png");
    scene.load.image('stickerstarpinkIcon', "Asset/makeup/MakeupIcon/sticker/star/mc_sticker manik pink_star.png");
    scene.load.image('stickerstarpurpleIcon', "Asset/makeup/MakeupIcon/sticker/star/mc_sticker manik purple_star.png");
    scene.load.image('stickerstarredIcon', "Asset/makeup/MakeupIcon/sticker/star/mc_sticker manik red_star.png");
    scene.load.image('stickerstaryellowIcon', "Asset/makeup/MakeupIcon/sticker/star/mc_sticker manik yellow_star.png");

  }





  static loadAudioAssets(scene) {
    //Music assets
    scene.load.audio('cutsceneMusic', [
      'Asset/Audio/Music/musikIndoor02-elevator-music.ogg',
      'Asset/Audio/Music/musikIndoor02-elevator-music.wav'
    ]);
    scene.load.audio('minigameMusic', [
      'Asset/Audio/Music/musikIndoor01-rainy-date-cosy-relaxed-soft-j.ogg',
      'Asset/Audio/Music/musikIndoor01-rainy-date-cosy-relaxed-soft-j.wav'
    ]);

    //SFX assets
    scene.load.audio('buttonClickSFX', [
      'Asset/Audio/SFX/audio_ui_click - succes.ogg',
      'Asset/Audio/SFX/audio_ui_click - succes.wav'
    ]);
    scene.load.audio('hoverButtonSFX', [
      'Asset/Audio/SFX/Hover over button sound 29.ogg',
      'Asset/Audio/SFX/Hover over button sound 29.wav'
    ]);
    scene.load.audio('openPanelSFX', [
      'Asset/Audio/SFX/Pop sound 19.ogg',
      'Asset/Audio/SFX/Pop sound 19.wav'
    ]);

    scene.load.audio('successSFX', [
      'Asset/Audio/SFX/levelUp.ogg',
    ]);
  }


}