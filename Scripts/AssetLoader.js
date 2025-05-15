export default class AssetLoader {
  static loadAllAssets(scene) {
    AssetLoader.loadRexUIPlugin(scene);
    AssetLoader.loadUIAssets(scene);
    AssetLoader.loadSceneAssets(scene);
    AssetLoader.loadOutfitAssets(scene);
    AssetLoader.loadAudioAssets(scene);
    AssetLoader.loadMakeUpAssets(scene);
    scene.load.once('complete', () => {
      AssetLoader.changeFilterMode(scene);
    });
  }

  static loadRexUIPlugin(scene) {
    scene.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
  }
  static loadUIAssets(scene) {
    scene.load.image('categoryButtonsPanel', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_1.png');
    scene.load.image('outfitButton', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_2.png');
    scene.load.image('outfitButtonOutline', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_2_Outline.png');
    scene.load.image('dressIcon', 'Asset/UI/Cisini_UI_DressUp_Dress_Icon.png');
    scene.load.image('outerIcon', 'Asset/UI/Cisini_UI_DressUp_Outer_Icon.png');
    scene.load.image('underwearIcon', 'Asset/UI/Cisini_UI_DressUp_Underwear_Icon.png');
    scene.load.image('uniformIcon', 'Asset/UI/Cisini_UI_DressUp_Uniform_Icon.png');
    scene.load.image('socksIcon', 'Asset/UI/Cisini_UI_DressUp_Socks_Icon.png');
    scene.load.image('shoesIcon', 'Asset/UI/Cisini_UI_DressUp_Shoes_Icon.png');
    scene.load.image('openIcon', 'Asset/UI/Cisini_UI_DressUp_ScrollButton_UP_Icon.png');
    scene.load.image('makeUpIcon', 'Asset/UI/Cisini_UI_DressUp_makeup_Icon.png');
    scene.load.image('sidePanel', 'Asset/UI/Cisini_UI_Buy_Background.png');
    scene.load.image('dialogueBox', 'Asset/UI/kotak dialog.png');
    scene.load.image('dialogueNameBox', 'Asset/UI/kotak nama.png');
    scene.load.image('statPanel', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_Scroll_Button.png');
    scene.load.image('emptyButton', 'Asset/UI/cisini_ui_button kosong.png');
    scene.load.image('categoryButton', 'Asset/UI/Square_Line.png');
    scene.load.image('backButton', 'Asset/UI/Cisini_UI_DressUp_BackButton_Icon.png');
    scene.load.image('categoryButtonHighlighted', 'Asset/UI/Square_Line_Highlighted.png');
    scene.load.image('checkMark', 'Asset/UI/tanda_ceklis.png');
    scene.load.image('xMark', 'Asset/UI/tanda_silang.png');
    scene.load.image('selectionBox', 'Asset/UI/action_box.png');
    scene.load.image('tipsButton', 'Asset/UI/Question_Mark_Button_lineputih.png');
    scene.load.image('statBar', 'Asset/UI/bar.png');
    scene.load.image('heartIcon', 'Asset/UI/ikon_hati.png');
  }

  static loadSceneAssets(scene) {
    //Dress up minigame background
    scene.load.image('background', 'Asset/Background/Cisini_UI_DressUp_Background.png');

    //Player
    scene.load.image('player', 'Asset/Character/t_basebody_mc_anime_portrait.png');
    scene.load.image('expression', 'Asset/Character/Normal.png');
    scene.load.image('hair', 'Asset/Outfit/Hairs_upscaled/hair_01_black_F_out.png');

    //Particle
    scene.load.image('lightParticle', 'Asset/UI/particle.png');

    //Cutscene
    scene.load.image('cutscene1', 'Asset/Cutscene/Hangout1_Azril2.jpg');
    scene.load.image('cutscene2', 'Asset/Cutscene/Crush1_Azril1.jpg');
  }

  static loadOutfitAssets(scene) {
    //Anime Textures
    //Dress
    scene.load.image('dress1', 'Asset/Outfit/terusan17.png');
    scene.load.image('dress2', 'Asset/Outfit/Terusan/kebaya1.png');
    scene.load.image('dress3', 'Asset/Outfit/Terusan/dress reward prereg.png');//ngga ada iconnya
    scene.load.image('dress4', 'Asset/Outfit/Terusan/kebaya2.png');
    scene.load.image('dress5', 'Asset/Outfit/Terusan/kebaya3.png');
    scene.load.image('dress6', 'Asset/Outfit/Terusan/skate.png');
    scene.load.image('dress7', 'Asset/Outfit/Terusan/terusan biru rample.png');
    scene.load.image('dress8', 'Asset/Outfit/Terusan/terusan_07.png');
    scene.load.image('dress9', 'Asset/Outfit/Terusan/terusan_09.png');
    scene.load.image('dress10', 'Asset/Outfit/Terusan/terusan_14.png');
    scene.load.image('dress11', 'Asset/Outfit/Terusan/terusan_barista.png');//ngga ada iconnya
    scene.load.image('dress12', 'Asset/Outfit/Terusan/terusan_dance.png');
    scene.load.image('dress13', 'Asset/Outfit/Terusan/terusan_prom.png');
    scene.load.image('dress14', 'Asset/Outfit/Terusan/terusan_summer.png');
    scene.load.image('dress15', 'Asset/Outfit/Terusan/terusan05.png');
    scene.load.image('dress16', 'Asset/Outfit/Terusan/terusan10.png');
    scene.load.image('dress17', 'Asset/Outfit/Terusan/terusan13.png');
    scene.load.image('dress18', 'Asset/Outfit/Terusan/terusan18.png');
    scene.load.image('dress19', 'Asset/Outfit/Terusan/terusan19.png');
    scene.load.image('dress20', 'Asset/Outfit/Terusan/terusan20.png');

    //Shirts
    scene.load.image('shirt1', 'Asset/Outfit/Baju/baju_20.png');
    scene.load.image('shirt2', 'Asset/Outfit/Baju/baju_01.png');
    scene.load.image('shirt3', 'Asset/Outfit/Baju/atasan_school.png');
    scene.load.image('shirt4', 'Asset/Outfit/Baju/baju_02.png');//ngga ada iconnya
    scene.load.image('shirt5', 'Asset/Outfit/Baju/baju_03.png');
    scene.load.image('shirt6', 'Asset/Outfit/Baju/baju_04.png');
    scene.load.image('shirt7', 'Asset/Outfit/Baju/baju_06.png');
    scene.load.image('shirt8', 'Asset/Outfit/Baju/baju_08.png');
    scene.load.image('shirt9', 'Asset/Outfit/Baju/baju_22.png');
    scene.load.image('shirt10', 'Asset/Outfit/Baju/baju_19.png');
    scene.load.image('shirt11', 'Asset/Outfit/Baju/baju_23.png');
    scene.load.image('shirt12', 'Asset/Outfit/Baju/baju_25.png');
    scene.load.image('shirt13', 'Asset/Outfit/Baju/baju_26.png');
    scene.load.image('shirt14', 'Asset/Outfit/Baju/baju_28.png');
    scene.load.image('shirt15', 'Asset/Outfit/Baju/baju_31.png');
    scene.load.image('shirt16', 'Asset/Outfit/Baju/baju_32.png');
    scene.load.image('shirt17', 'Asset/Outfit/Baju/baju_33.png');
    scene.load.image('shirt18', 'Asset/Outfit/Baju/baju_34.png');
    scene.load.image('shirt19', 'Asset/Outfit/Baju/baju_35.png');
    scene.load.image('shirt20', 'Asset/Outfit/Baju/baju_37.png');

    //Underwear
    scene.load.image('underwear1', 'Asset/Outfit/Bawahan/celana_33.png');
    scene.load.image('underwear2', 'Asset/Outfit/Bawahan/celana_school.png');//ga ada icon
    scene.load.image('underwear3', 'Asset/Outfit/Bawahan/celana_sport.png');//ga ada
    scene.load.image('underwear4', 'Asset/Outfit/Bawahan/rok_06.png');
    scene.load.image('underwear5', 'Asset/Outfit/Bawahan/rok_19.png');
    scene.load.image('underwear6', 'Asset/Outfit/Bawahan/rok_23.png');
    scene.load.image('underwear7', 'Asset/Outfit/Bawahan/rok_32.png');
    scene.load.image('underwear8', 'Asset/Outfit/Bawahan/rok_34.png');
    scene.load.image('underwear9', 'Asset/Outfit/Bawahan/rok_36.png');
    scene.load.image('underwear10', 'Asset/Outfit/Bawahan/rok_hangout.png');

    //Uniform
    //Socks
    scene.load.image('socks1', 'Asset/Outfit/Kaos Kaki/kaoskaki_29.png');
    scene.load.image('socks2', 'Asset/Outfit/Kaos Kaki/kaoskaki_05.png');
    scene.load.image('socks3', 'Asset/Outfit/Kaos Kaki/kaoskaki_10.png');
    scene.load.image('socks4', 'Asset/Outfit/Kaos Kaki/kaoskaki_17.png');
    scene.load.image('socks5', 'Asset/Outfit/Kaos Kaki/kaoskaki_18.png');
    scene.load.image('socks6', 'Asset/Outfit/Kaos Kaki/kaoskaki_22.png');
    scene.load.image('socks7', 'Asset/Outfit/Kaos Kaki/kaoskaki_28.png');
    scene.load.image('socks8', 'Asset/Outfit/Kaos Kaki/kaoskaki_in.png');
    scene.load.image('socks9', 'Asset/Outfit/Kaos Kaki/kaoskaki_short.png');

    //Shoes
    scene.load.image('shoes1', 'Asset/Outfit/Sepatu/sepatu_14.png');
    scene.load.image('shoes2', 'Asset/Outfit/Sepatu/sepatu_07.png');
    scene.load.image('shoes3', 'Asset/Outfit/Sepatu/sepatu_08.png');
    scene.load.image('shoes4', 'Asset/Outfit/Sepatu/sepatu_12.png');
    scene.load.image('shoes5', 'Asset/Outfit/Sepatu/sepatu_18.png');
    scene.load.image('shoes6', 'Asset/Outfit/Sepatu/sepatu_16.png');
    scene.load.image('shoes7', 'Asset/Outfit/Sepatu/sepatu_21.png');
    scene.load.image('shoes8', 'Asset/Outfit/Sepatu/sepatu_26.png');
    scene.load.image('shoes9', 'Asset/Outfit/Sepatu/sepatu_28.png');
    scene.load.image('shoes10', 'Asset/Outfit/Sepatu/sepatu_29.png');
    scene.load.image('shoes11', 'Asset/Outfit/Sepatu/sepatu_30.png');
    scene.load.image('shoes12', 'Asset/Outfit/Sepatu/sepatu_34.png');
    scene.load.image('shoes13', 'Asset/Outfit/Sepatu/sepatu_36.png');

    //Outer
    scene.load.image('outer1', 'Asset/Outfit/Jaket/jaket_16.png');
    scene.load.image('outer2', 'Asset/Outfit/Jaket/jaket_17.png');
    scene.load.image('outer3', 'Asset/Outfit/Jaket/jaket_18.png');
    scene.load.image('outer4', 'Asset/Outfit/Jaket/jaket_20.png');
    scene.load.image('outer5', 'Asset/Outfit/Jaket/jaket_29.png');
    scene.load.image('outer6', 'Asset/Outfit/Jaket/jaket_32.png');
    scene.load.image('outer7', 'Asset/Outfit/Jaket/jaket_36.png');
    scene.load.image('outer8', 'Asset/Outfit/Jaket/jaket_37.png');
    scene.load.image('outer9', 'Asset/Outfit/Jaket/jaket_bomber.png');
    scene.load.image('outer10', 'Asset/Outfit/Jaket/jaket_coklat.png');
    scene.load.image('outer11', 'Asset/Outfit/Jaket/jaket_flower.png');
    scene.load.image('outer12', 'Asset/Outfit/Jaket/jaket_purple.png');
    scene.load.image('outer13', 'Asset/Outfit/Jaket/jaket_red.png');
    scene.load.image('outer14', 'Asset/Outfit/Jaket/jaket_sport.png');
    scene.load.image('outer15', 'Asset/Outfit/Jaket/jaket_sweater.png');

    //Icon Textures
    //Outfit Buttons
    scene.load.image('button1', 'Asset/UI/Cisini_UI_DressUp_Menu_DressInventory_2.png');

    //Dress
    scene.load.image('dress1Icon', 'Asset/ikon/Terusan/terusan17.png');
    scene.load.image('dress2Icon', 'Asset/ikon/Terusan/Kebaya_1.png');
    //scene.load.image('dress3Icon', 'Asset/ikon/Terusan/dress reward prereg.png');
    scene.load.image('dress4Icon', 'Asset/ikon/Terusan/Kebaya_2.png');
    scene.load.image('dress5Icon', 'Asset/ikon/Terusan/Kebaya_3.png');
    scene.load.image('dress6Icon', 'Asset/ikon/Terusan/skate.png');
    scene.load.image('dress7Icon', 'Asset/ikon/Terusan/terusan biru rample.png');
    scene.load.image('dress8Icon', 'Asset/ikon/Terusan/terusan07.png');
    scene.load.image('dress9Icon', 'Asset/ikon/Terusan/terusan09.png');
    scene.load.image('dress10Icon', 'Asset/ikon/Terusan/terusan14.png');
    //scene.load.image('dress11Icon', 'Asset/ikon/Terusan/terusan_barista.png');
    scene.load.image('dress12Icon', 'Asset/ikon/Terusan/terusan_dansa.png');
    scene.load.image('dress13Icon', 'Asset/ikon/Terusan/terusan_prom.png');
    scene.load.image('dress14Icon', 'Asset/ikon/Terusan/terusan_summer.png');
    scene.load.image('dress15Icon', 'Asset/ikon/Terusan/terusan05.png');
    scene.load.image('dress16Icon', 'Asset/ikon/Terusan/terusan10.png');
    scene.load.image('dress17Icon', 'Asset/ikon/Terusan/terusan13.png');
    scene.load.image('dress18Icon', 'Asset/ikon/Terusan/terusan18.png');
    scene.load.image('dress19Icon', 'Asset/ikon/Terusan/terusan_Valentine.png');
    scene.load.image('dress20Icon', 'Asset/ikon/Terusan/terusan_gamis lebaran.png');

    //Shirts
    scene.load.image('shirt1Icon', 'Asset/ikon/Baju/baju_20.png');
    scene.load.image('shirt2Icon', 'Asset/ikon/Baju/baju_01.png');
    scene.load.image('shirt3Icon', 'Asset/ikon/Baju/baju_school.png');
    //scene.load.image('shirt4Icon', 'Asset/Outfit/Baju/baju_02.png');
    scene.load.image('shirt5Icon', 'Asset/ikon/Baju/baju_03.png');
    scene.load.image('shirt6Icon', 'Asset/ikon/Baju/baju_04.png');
    scene.load.image('shirt7Icon', 'Asset/ikon/Baju/baju_06.png');
    scene.load.image('shirt8Icon', 'Asset/ikon/Baju/baju_08.png');
    scene.load.image('shirt9Icon', 'Asset/ikon/Baju/baju_22.png');
    scene.load.image('shirt10Icon', 'Asset/ikon/Baju/baju_19.png');
    scene.load.image('shirt11Icon', 'Asset/ikon/Baju/baju_23.png');
    scene.load.image('shirt12Icon', 'Asset/ikon/Baju/baju_25.png');
    scene.load.image('shirt13Icon', 'Asset/ikon/Baju/baju_26.png');
    scene.load.image('shirt14Icon', 'Asset/ikon/Baju/baju_28.png');
    scene.load.image('shirt15Icon', 'Asset/ikon/Baju/baju_31.png');
    scene.load.image('shirt16Icon', 'Asset/ikon/Baju/baju_32.png');
    scene.load.image('shirt17Icon', 'Asset/ikon/Baju/baju_33.png');
    scene.load.image('shirt18Icon', 'Asset/ikon/Baju/baju_34.png');
    scene.load.image('shirt19Icon', 'Asset/ikon/Baju/baju_35.png');
    scene.load.image('shirt20Icon', 'Asset/ikon/Baju/baju_37.png');

    //Underwear
    scene.load.image('underwear1Icon', 'Asset/ikon/Bawahan/celana33.png');
    //scene.load.image('underwear2Icon', 'Asset/ikon/Bawahan/celana_school.png');
    //scene.load.image('underwear3Icon', 'Asset/ikon/Bawahan/celana_sport.png');
    scene.load.image('underwear4Icon', 'Asset/ikon/Bawahan/rok_06.png');
    scene.load.image('underwear5Icon', 'Asset/ikon/Bawahan/rok_19.png');
    scene.load.image('underwear6Icon', 'Asset/ikon/Bawahan/rok_23.png');
    scene.load.image('underwear7Icon', 'Asset/ikon/Bawahan/rok_32.png');
    scene.load.image('underwear8Icon', 'Asset/ikon/Bawahan/rok_34.png');
    scene.load.image('underwear9Icon', 'Asset/ikon/Bawahan/rok_36.png');
    scene.load.image('underwear10Icon', 'Asset/ikon/Bawahan/rok_hangout.png');

    //Uniform
    //Socks
    scene.load.image('socks1Icon', 'Asset/Outfit/ikon/Kaos Kaki/kaoskaki_29.png');
    scene.load.image('socks2Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_05.png');
    scene.load.image('socks3Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_10.png');
    scene.load.image('socks4Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_17.png');
    scene.load.image('socks5Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_18.png');
    scene.load.image('socks6Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_22.png');
    scene.load.image('socks7Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_28.png');
    scene.load.image('socks8Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_in.png');
    scene.load.image('socks9Icon', 'Asset/ikon/Kaos Kaki/kaoskaki_short.png');
    //Shoes
    scene.load.image('shoes1Icon', 'Asset/ikon/Sepatu/sepatu_14.png');
    scene.load.image('shoes2Icon', 'Asset/ikon/Sepatu/sepatu_07.png');
    scene.load.image('shoes3Icon', 'Asset/ikon/Sepatu/sepatu_08.png');
    scene.load.image('shoes4Icon', 'Asset/ikon/Sepatu/sepatu_12.png');
    scene.load.image('shoes5Icon', 'Asset/ikon/Sepatu/sepatu_18.png');
    scene.load.image('shoes6Icon', 'Asset/ikon/Sepatu/sepatu_16.png');
    scene.load.image('shoes7Icon', 'Asset/ikon/Sepatu/sepatu_21.png');
    scene.load.image('shoes8Icon', 'Asset/ikon/Sepatu/sepatu_26.png');
    scene.load.image('shoes9Icon', 'Asset/ikon/Sepatu/sepatu_28.png');
    scene.load.image('shoes10Icon', 'Asset/ikon/Sepatu/sepatu_29.png');
    scene.load.image('shoes11Icon', 'Asset/ikon/Sepatu/sepatu_30.png');
    scene.load.image('shoes12Icon', 'Asset/ikon/Sepatu/sepatu_34.png');
    scene.load.image('shoes13Icon', 'Asset/ikon/Sepatu/sepatu_36.png');
    //Outer
    scene.load.image('outer1Icon', 'Asset/ikon/Jaket/jaket_16.png');
    scene.load.image('outer2Icon', 'Asset/ikon/Jaket/jaket_17.png');
    scene.load.image('outer3Icon', 'Asset/ikon/Jaket/jaket_18.png');
    scene.load.image('outer4Icon', 'Asset/ikon/Jaket/jaket_20.png');
    scene.load.image('outer5Icon', 'Asset/ikon/Jaket/jaket_29.png');
    scene.load.image('outer6Icon', 'Asset/ikon/Jaket/jaket_32.png');
    scene.load.image('outer7Icon', 'Asset/ikon/Jaket/jaket_36.png');
    scene.load.image('outer8Icon', 'Asset/ikon/Jaket/jaket_37.png');
    scene.load.image('outer9Icon', 'Asset/ikon/Jaket/jaketbomber.png');
    scene.load.image('outer10Icon', 'Asset/ikon/Jaket/jaket_coklat.png');
    scene.load.image('outer11Icon', 'Asset/ikon/Jaket/jaket_flower.png');
    scene.load.image('outer12Icon', 'Asset/ikon/Jaket/jaket_purple.png');
    scene.load.image('outer13Icon', 'Asset/ikon/Jaket/jaket_red.png');
    scene.load.image('outer14Icon', 'Asset/ikon/Jaket/jaket_sport.png');
    scene.load.image('outer15Icon', 'Asset/ikon/Jaket/jaket_sweater.png');

  }

  static loadMakeUpAssets(scene) {
    //Icon texture
    scene.load.image('eyebrowsIcon', "Asset/UI/icon_eyebrow.png");
    scene.load.image('blushIcon', "Asset/UI/icon_blush.png");
    scene.load.image('eyelashesIcon', "Asset/UI/icon_eyelashes.png");
    scene.load.image('eyelinerIcon', "Asset/UI/icon_eyeliner.png");
    scene.load.image('eyeshadowIcon', "Asset/UI/icon_eyeshadow.png");
    scene.load.image('lipstickIcon', "Asset/UI/icon_lipstick.png");
    scene.load.image('stickerIcon', "Asset/UI/icon_stiker_wajah.png");
    scene.load.image('eyeColorIcon', "Asset/UI/icon_warna_mata.png");
    scene.load.image('hairIcon', "Asset/UI/Cisini_UI_DressUp_Hair_Icon.png");
    //Anime texture
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
    //angry
    scene.load.image('eyebrowangrydefault', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb default_angry.png");
    scene.load.image('eyebrowangry1', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb 1_angry.png");
    scene.load.image('eyebrowangry2', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb 2_angry.png");
    scene.load.image('eyebrowangry3', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb 3_angry.png");
    scene.load.image('eyebrowangry4', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb 4_angry.png");
    scene.load.image('eyebrowangry5', "Asset/makeup/MakeupAnime/eyebrow/angry/mc_eb 5_angry.png");
    //happy
    scene.load.image('eyebrowhappydefault', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb default_happy.png");
    scene.load.image('eyebrowhappy1', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb 1_happy.png");
    scene.load.image('eyebrowhappy2', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb 2_happy.png");
    scene.load.image('eyebrowhappy3', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb 3_happy.png");
    scene.load.image('eyebrowhappy4', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb 4_happy.png");
    scene.load.image('eyebrowhappy5', "Asset/makeup/MakeupAnime/eyebrow/happy/mc_eb 5_happy.png");
    //normal
    scene.load.image('EyebrowNormalDefault', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb default_normal.png");
    scene.load.image('eyebrownormal1', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb 1_normal.png");
    scene.load.image('eyebrownormal2', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb 2_normal.png");
    scene.load.image('eyebrownormal3', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb 3_normal.png");
    scene.load.image('eyebrownormal4', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb 4_normal.png");
    scene.load.image('eyebrownormal5', "Asset/makeup/MakeupAnime/eyebrow/normal/mc_eb 5_normal.png");
    //sad
    scene.load.image('eyebrowsaddefault', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb default_sad.png");
    scene.load.image('eyebrowsad1', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb 1_sad.png");
    scene.load.image('eyebrowsad2', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb 2_sad.png");
    scene.load.image('eyebrowsad3', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb 3_sad.png");
    scene.load.image('eyebrowsad4', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb 4_sad.png");
    scene.load.image('eyebrowsad5', "Asset/makeup/MakeupAnime/eyebrow/sad/mc_eb 5_sad.png");
    //shy
    scene.load.image('eyebrowshydefault', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb default_shy.png");
    scene.load.image('eyebrowshy1', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb 1_shy.png");
    scene.load.image('eyebrowshy2', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb 2_shy.png");
    scene.load.image('eyebrowshy3', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb 3_shy.png");
    scene.load.image('eyebrowshy4', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb 4_shy.png");
    scene.load.image('eyebrowshy5', "Asset/makeup/MakeupAnime/eyebrow/shy/mc_eb 5_shy.png");
    //surprise
    scene.load.image('eyebrowsurprisedefault', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb default_surprise.png");
    scene.load.image('eyebrowsurprise1', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb 1_surprise.png");
    scene.load.image('eyebrowsurprise2', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb 2_surprise.png");
    scene.load.image('eyebrowsurprise3', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb 3_surprise.png");
    scene.load.image('eyebrowsurprise4', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb 4_surprise.png");
    scene.load.image('eyebrowsurprise5', "Asset/makeup/MakeupAnime/eyebrow/surprise/mc_eb 5_surprise.png");

    //eyelashes
    //angry
    scene.load.image('eyelashesangrydefault', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el default_angry.png");
    scene.load.image('eyelashesangry1', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el 1_angry.png");
    scene.load.image('eyelashesangry2', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el 2_angry.png");
    scene.load.image('eyelashesangry3', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el 3_angry.png");
    scene.load.image('eyelashesangry4', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el 4_angry.png");
    scene.load.image('eyelashesangry5', "Asset/makeup/MakeupAnime/eyeleashes/angry/mc_el 5_angry.png");

    //happy
    scene.load.image('eyelasheshappydefault', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el default_happy.png");
    scene.load.image('eyelasheshappy1', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el 1_happy.png");
    scene.load.image('eyelasheshappy2', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el 2_happy.png");
    scene.load.image('eyelasheshappy3', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el 3_happy.png");
    scene.load.image('eyelasheshappy4', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el 4_happy.png");
    scene.load.image('eyelasheshappy5', "Asset/makeup/MakeupAnime/eyeleashes/happy/mc_el 5_happy.png");

    //normal
    scene.load.image('EyelashesNormalDefault', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el default_normal.png");
    scene.load.image('eyelashesnormal1', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el 1_normal.png");
    scene.load.image('eyelashesnormal2', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el 2_normal.png");
    scene.load.image('eyelashesnormal3', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el 3_normal.png");
    scene.load.image('eyelashesnormal4', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el 4_normal.png");
    scene.load.image('eyelashesnormal5', "Asset/makeup/MakeupAnime/eyeleashes/normal/mc_el 5_normal.png");

    //sad
    scene.load.image('eyelashessaddefault', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el default_sad.png");
    scene.load.image('eyelashessad1', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el 1_sad.png");
    scene.load.image('eyelashessad2', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el 2_sad.png");
    scene.load.image('eyelashessad3', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el 3_sad.png");
    scene.load.image('eyelashessad4', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el 4_sad.png");
    scene.load.image('eyelashessad5', "Asset/makeup/MakeupAnime/eyeleashes/sad/mc_el 5_sad.png");

    //shy
    scene.load.image('eyelashesshydefault', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el default_shy.png");
    scene.load.image('eyelashesshy1', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el 1_shy.png");
    scene.load.image('eyelashesshy2', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el 2_shy.png");
    scene.load.image('eyelashesshy3', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el 3_shy.png");
    scene.load.image('eyelashesshy4', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el 4_shy.png");
    scene.load.image('eyelashesshy5', "Asset/makeup/MakeupAnime/eyeleashes/shy/mc_el 5_shy.png");

    //surprise
    scene.load.image('eyelashesshydefault', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el default_surprise.png");
    scene.load.image('eyelashesshy1', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el 1_surprise.png");
    scene.load.image('eyelashesshy2', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el 2_surprise.png");
    scene.load.image('eyelashesshy3', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el 3_surprise.png");
    scene.load.image('eyelashesshy4', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el 3_surprise.png");
    scene.load.image('eyelashesshy5', "Asset/makeup/MakeupAnime/eyeleashes/surprise/mc_el 5_surprise.png");


    //eyeliner
    //angry
    scene.load.image('eyelinerangrydefault', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er default_angry.png");
    scene.load.image('eyelinerangry1', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er 1_angry.png");
    scene.load.image('eyelinerangry2', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er 2_angry.png");
    scene.load.image('eyelinerangry3', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er 3_angry.png");
    scene.load.image('eyelinerangry4', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er 4_angry.png");
    scene.load.image('eyelinerangry5', "Asset/makeup/MakeupAnime/eyeliner/angry/mc_er 5_angry.png");

    //happy
    scene.load.image('eyelinerhappydefault', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er default_happy.png");
    scene.load.image('eyelinerhappy1', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er 1_happy.png");
    scene.load.image('eyelinerhappy2', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er 2_happy.png");
    scene.load.image('eyelinerhappy3', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er 3_happy.png");
    scene.load.image('eyelinerhappy4', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er 4_happy.png");
    scene.load.image('eyelinerhappy5', "Asset/makeup/MakeupAnime/eyeliner/happy/mc_er 5_happy.png");

    //normal
    scene.load.image('eyelinernormaldefault', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er default_normal.png");
    scene.load.image('eyelinernormal1', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 1_normal.png");
    scene.load.image('eyelinernormal2', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 2_normal.png");
    scene.load.image('eyelinernormal3', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 3_normal.png");
    scene.load.image('eyelinernormal4', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 4_normal.png");
    scene.load.image('eyelinernormal5', "Asset/makeup/MakeupAnime/eyeliner/normal/mc_er 5_normal.png");

    //sad
    scene.load.image('eyelinersaddefault', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er default_sad.png");
    scene.load.image('eyelinersad1', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er 1_sad.png");
    scene.load.image('eyelinersad2', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er 2_sad.png");
    scene.load.image('eyelinersad3', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er 3_sad.png");
    scene.load.image('eyelinersad4', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er 4_sad.png");
    scene.load.image('eyelinersad5', "Asset/makeup/MakeupAnime/eyeliner/sad/mc_er 5_sad.png");

    //shy
    scene.load.image('eyelinershydefault', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er default_shy.png");
    scene.load.image('eyelinershy1', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er 1_shy.png");
    scene.load.image('eyelinershy2', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er 2_shy.png");
    scene.load.image('eyelinershy3', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er 3_shy.png");
    scene.load.image('eyelinershy4', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er 4_shy.png");
    scene.load.image('eyelinershy5', "Asset/makeup/MakeupAnime/eyeliner/shy/mc_er 5_shy.png");

    //surprise
    scene.load.image('eyelinersurprisedefault', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er default_surprise.png");
    scene.load.image('eyelinersurprise1', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er 1_surprise.png");
    scene.load.image('eyelinersurprise2', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er 2_surprise.png");
    scene.load.image('eyelinersurprise3', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er 3_surprise.png");
    scene.load.image('eyelinersurprise4', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er 4_surprise.png");
    scene.load.image('eyelinersurprise5', "Asset/makeup/MakeupAnime/eyeliner/surprise/mc_er 5_surprise.png");

    //eyeshadow
    //angry
    scene.load.image('eyeshadowangrydefault', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es default_angry.png");
    scene.load.image('eyeshadowangrybrown', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es brown_angry.png");
    scene.load.image('eyeshadowangrydragon', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es dragon_angry.png");
    scene.load.image('eyeshadowangryfairy', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es fairy_angry.png");
    scene.load.image('eyeshadowangrygold', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es gold_angry.png");
    scene.load.image('eyeshadowangrygreen', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es green_angry.png");
    scene.load.image('eyeshadowangryorange', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es orange_angry.png");
    scene.load.image('eyeshadowangrypeach', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es peach_angry.png");
    scene.load.image('eyeshadowangrypink', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es pink_angry.png");
    scene.load.image('eyeshadowangrypurple', "Asset/makeup/MakeupAnime/eyeshadow/angry/mc_es purple_angry.png");

    //happy
    scene.load.image('eyeshadowhappydefault', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es default_happy.png");
    scene.load.image('eyeshadowhappybrown', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es brown_happy.png");
    scene.load.image('eyeshadowhappydragon', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es dragon_happy.png");
    scene.load.image('eyeshadowhappyfairy', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es fairy_happy.png");
    scene.load.image('eyeshadowhappygold', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es gold_happy.png");
    scene.load.image('eyeshadowhappygreen', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es green_happy.png");
    scene.load.image('eyeshadowhappyorange', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es orange_happy.png");
    scene.load.image('eyeshadowhappypeach', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es peach_happy.png");
    scene.load.image('eyeshadowhappypink', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es pink_happy.png");
    scene.load.image('eyeshadowhappypurple', "Asset/makeup/MakeupAnime/eyeshadow/happy/mc_es purple_happy.png");

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

    //sad
    scene.load.image('eyeshadowsaddefault', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es default_sad.png");
    scene.load.image('eyeshadowsadbrown', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es brown_sad.png");
    scene.load.image('eyeshadowsaddragon', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es dragon_sad.png");
    scene.load.image('eyeshadowsadfairy', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es fairy_sad.png");
    scene.load.image('eyeshadowsadgold', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es gold_sad.png");
    scene.load.image('eyeshadowsadgreen', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es green_sad.png");
    scene.load.image('eyeshadowsadorange', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es orange_sad.png");
    scene.load.image('eyeshadowsadpeach', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es peach_sad.png");
    scene.load.image('eyeshadowsadpink', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es pink_sad.png");
    scene.load.image('eyeshadowsadpurple', "Asset/makeup/MakeupAnime/eyeshadow/sad/mc_es purple_sad.png");

    //shy
    scene.load.image('eyeshadowshydefault', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es default_shy.png");
    scene.load.image('eyeshadowshybrown', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es brown_shy.png");
    scene.load.image('eyeshadowshydragon', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es dragon_shy.png");
    scene.load.image('eyeshadowshyfairy', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es fairy_shy.png");
    scene.load.image('eyeshadowshygold', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es gold_shy.png");
    scene.load.image('eyeshadowshygreen', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es green_shy.png");
    scene.load.image('eyeshadowshyorange', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es orange_shy.png");
    scene.load.image('eyeshadowshypeach', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es peach_shy.png");
    scene.load.image('eyeshadowshypink', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es pink_shy.png");
    scene.load.image('eyeshadowshypurple', "Asset/makeup/MakeupAnime/eyeshadow/shy/mc_es purple_shy.png");

    //surprise
    scene.load.image('eyeshadowsurprisedefault', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es default_surprise.png");
    scene.load.image('eyeshadowsurprisebrown', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es brown_surprise.png");
    scene.load.image('eyeshadowsurprisedragon', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es dragon_surprise.png");
    scene.load.image('eyeshadowsurprisefairy', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es fairy_surprise.png");
    scene.load.image('eyeshadowsurprisegold', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es gold_surprise.png");
    scene.load.image('eyeshadowsurprisegreen', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es green_surprise.png");
    scene.load.image('eyeshadowsurpriseorange', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es orange_surprise.png");
    scene.load.image('eyeshadowsurprisepeach', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es peach_surprise.png");
    scene.load.image('eyeshadowsurprisepink', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es pink_surprise.png");
    scene.load.image('eyeshadowsurprisepurple', "Asset/makeup/MakeupAnime/eyeshadow/surprise/mc_es purple_surprise.png");

    //lip
    //angry
    scene.load.image('lipangrydefault', "Asset/makeup/MakeupAnime/lips/angry/mc_lips defaut_shy.png");
    scene.load.image('lipangrybrown', "Asset/makeup/MakeupAnime/lips/angry/mc_lips brown_angry.png");
    scene.load.image('lipangrycherry', "Asset/makeup/MakeupAnime/lips/angry/mc_lips cherry_angry.png");
    scene.load.image('lipangryorange', "Asset/makeup/MakeupAnime/lips/angry/mc_lips orange_angry.png");
    scene.load.image('lipangrypink', "Asset/makeup/MakeupAnime/lips/angry/mc_lips pink_angry.png");
    scene.load.image('lipangryred', "Asset/makeup/MakeupAnime/lips/angry/mc_lips red_angry.png");
    scene.load.image('lipangrywine', "Asset/makeup/MakeupAnime/lips/angry/mc_lips wine_angry.png");

    //happy
    scene.load.image('liphappydefault', "Asset/makeup/MakeupAnime/lips/happy/mc_lips default_happy.png");
    scene.load.image('liphappybrown', "Asset/makeup/MakeupAnime/lips/happy/mc_lips brown_happy.png");
    scene.load.image('liphappycherry', "Asset/makeup/MakeupAnime/lips/happy/mc_lips cherry_happy.png");
    scene.load.image('liphappyorange', "Asset/makeup/MakeupAnime/lips/happy/mc_lips orange_happy.png");
    scene.load.image('liphappypink', "Asset/makeup/MakeupAnime/lips/happy/mc_lips pink_happy.png");
    scene.load.image('liphappyred', "Asset/makeup/MakeupAnime/lips/happy/mc_lips red_happy.png");
    scene.load.image('liphappywine', "Asset/makeup/MakeupAnime/lips/happy/mc_lips wine_happy.png");

    //normal
    scene.load.image('LipNormalDefault', "Asset/makeup/MakeupAnime/lips/normal/mc_lips default_normal.png");
    scene.load.image('lipnormalbrown', "Asset/makeup/MakeupAnime/lips/normal/mc_lips brown_normal.png");
    scene.load.image('lipnormalcherry', "Asset/makeup/MakeupAnime/lips/normal/mc_lips cherry_normal.png");
    scene.load.image('lipnormalorange', "Asset/makeup/MakeupAnime/lips/normal/mc_lips orange_normal.png");
    scene.load.image('lipnormalpink', "Asset/makeup/MakeupAnime/lips/normal/mc_lips pink_normal.png");
    scene.load.image('lipnormalred', "Asset/makeup/MakeupAnime/lips/normal/mc_lips red_normal.png");
    scene.load.image('lipnormalwine', "Asset/makeup/MakeupAnime/lips/normal/mc_lips wine_normal.png");

    //sad
    scene.load.image('lipsaddefault', "Asset/makeup/MakeupAnime/lips/sad/mc_lips default_sad.png");
    scene.load.image('lipsadbrown', "Asset/makeup/MakeupAnime/lips/sad/mc_lips brown_sad.png");
    scene.load.image('lipsadcherry', "Asset/makeup/MakeupAnime/lips/sad/mc_lips cherry_sad.png");
    scene.load.image('lipsadorange', "Asset/makeup/MakeupAnime/lips/sad/mc_lips orange_sad.png");
    scene.load.image('lipsadpink', "Asset/makeup/MakeupAnime/lips/sad/mc_lips pink_sad.png");
    scene.load.image('lipsadred', "Asset/makeup/MakeupAnime/lips/sad/mc_lips red_sad.png");
    scene.load.image('lipsadwine', "Asset/makeup/MakeupAnime/lips/sad/mc_lips wine_sad.png");
    //shy
    scene.load.image('lipshydefault', "Asset/makeup/MakeupAnime/lips/shy/mc_lips default_shy.png");
    scene.load.image('lipshybrown', "Asset/makeup/MakeupAnime/lips/shy/mc_lips brown_shy.png");
    scene.load.image('lipshycherry', "Asset/makeup/MakeupAnime/lips/shy/mc_lips cherry_shy.png");
    scene.load.image('lipshyorange', "Asset/makeup/MakeupAnime/lips/shy/mc_lips orange_shy.png");
    scene.load.image('lipshypink', "Asset/makeup/MakeupAnime/lips/shy/mc_lips pink_shy.png");
    scene.load.image('lipshyred', "Asset/makeup/MakeupAnime/lips/shy/mc_lips red_shy.png");
    scene.load.image('lipshywine', "Asset/makeup/MakeupAnime/lips/shy/mc_lips wine_shy.png");
    //surprised
    scene.load.image('lipsurprisedefault', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips default_suprised.png");
    scene.load.image('lipsurprisebrown', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips brown_suprised.png");
    scene.load.image('lipsurprisecherry', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips cherry_suprised.png");
    scene.load.image('lipsurpriseorange', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips orange_suprised.png");
    scene.load.image('lipsurprisepink', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips pink_suprised.png");
    scene.load.image('lipsurprisered', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips red_suprised.png");
    scene.load.image('lipsurprisewine', "Asset/makeup/MakeupAnime/lips/suprised/mc_lips wine_suprised.png");

    //pupil
    //angry
    scene.load.image('pupilangryblack', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil black_angry.png");
    scene.load.image('pupilangryblue', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil blue_angry.png");
    scene.load.image('pupilangrydragon', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil dragon_angry.png");
    scene.load.image('pupilangryfairy', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil fairy_angry.png");
    scene.load.image('pupilangrygreen', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil green_angry.png");
    scene.load.image('pupilangrymagical', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil magical_angry.png");
    scene.load.image('pupilangrypink', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil pink_angry.png");
    scene.load.image('pupilangryred', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil red_angry.png");
    scene.load.image('pupilangryyellow', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil yellow_angry.png");

    //happy
    // scene.load.image('pupilhappyblack', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil black_angry.png");
    // scene.load.image('pupilhappyblue', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil blue_angry.png");
    // scene.load.image('pupilhappydragon', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil dragon_angry.png");
    // scene.load.image('pupilhappyfairy', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil fairy_angry.png");
    // scene.load.image('pupilhappygreen', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil green_angry.png");
    // scene.load.image('pupilhappymagical', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil magical_angry.png");
    // scene.load.image('pupilhappypink', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil pink_angry.png");
    // scene.load.image('pupilhappyred', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil red_angry.png");
    // scene.load.image('pupilhappyyellow', "Asset/makeup/MakeupAnime/pupil/angry/mc_pupil yellow_angry.png");

    //normal
    scene.load.image('pupilnormalblack', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil black_normal.png");
    scene.load.image('PupilNormalBlue', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil blue_normal.png");
    scene.load.image('pupilnormaldragon', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil dragon_normal.png");
    scene.load.image('pupilnormalfairy', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil fairy_normal.png");
    scene.load.image('pupilnormalgreen', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil green_normal.png");
    scene.load.image('pupilnormalmagical', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil magical_normal.png");
    scene.load.image('pupilnormalpink', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil pink_normal.png");
    scene.load.image('pupilnormalred', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil red_normal.png");
    scene.load.image('pupilnormalyellow', "Asset/makeup/MakeupAnime/pupil/normal/mc_pupil yellow_normal.png");

    //sad
    scene.load.image('pupilsadblack', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil black_sad.png");
    scene.load.image('pupilsadblue', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil blue_sad.png");
    scene.load.image('pupilsaddragon', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil dragon_sad.png");
    scene.load.image('pupilsadfairy', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil fairy_sad.png");
    scene.load.image('pupilsadgreen', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil green_sad.png");
    scene.load.image('pupilsadmagical', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil magical_sad.png");
    scene.load.image('pupilsadpink', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil pink_sad.png");
    scene.load.image('pupilsadred', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil red_sad.png");
    scene.load.image('pupilsadyellow', "Asset/makeup/MakeupAnime/pupil/sad/mc_pupil yellow_sad.png");

    //shy
    scene.load.image('pupilshyblack', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil black_shy.png");
    scene.load.image('pupilshyblue', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil blue_shy.png");
    scene.load.image('pupilshydragon', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil dragon_shy.png");
    scene.load.image('pupilshyfairy', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil fairy_shy.png");
    scene.load.image('pupilshygreen', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil green_shy.png");
    scene.load.image('pupilshymagical', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil magical_shy.png");
    scene.load.image('pupilshypink', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil pink_shy.png");
    scene.load.image('pupilshyred', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil red_shy.png");
    scene.load.image('pupilshyyellow', "Asset/makeup/MakeupAnime/pupil/shy/mc_pupil yellow_shy.png");

    //surprised
    scene.load.image('pupilsurprisedblack', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil black_suprised.png");
    scene.load.image('pupilsurprisedblue', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil blue_suprised.png");
    scene.load.image('pupilsurpriseddragon', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil dragon_suprised.png");
    scene.load.image('pupilsurprisedfairy', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil fairy_suprised.png");
    scene.load.image('pupilsurprisedgreen', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil green_suprised.png");
    scene.load.image('pupilsurprisedmagical', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil magical_suprised.png");
    scene.load.image('pupilsurprisedpink', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil pink_suprised.png");
    scene.load.image('pupilsurprisedred', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil red_suprised.png");
    scene.load.image('pupilsurprisedyellow', "Asset/makeup/MakeupAnime/pupil/suprised/mc_pupil yellow_suprised.png");

    //sticker
    //blusing love
    scene.load.image('stickerblushpink', "Asset/makeup/MakeupAnime/sticker make up/blushing love/mc_sticker manik pink_blush love.png");
    scene.load.image('stickerblushpurple', "Asset/makeup/MakeupAnime/sticker make up/blushing love/mc_sticker manik purple_blush love.png");
    scene.load.image('stickerblushred', "Asset/makeup/MakeupAnime/sticker make up/blushing love/mc_sticker manik red_blush love.png");
    scene.load.image('stickerblushyellow', "Asset/makeup/MakeupAnime/sticker make up/blushing love/mc_sticker manik yellow_blush love.png");

    //Diamond
    scene.load.image('stickerdiamond', "Asset/makeup/MakeupAnime/sticker make up/diamond/mc_sticker manik diamond.png");





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

  static changeFilterMode(scene) {
    //Change filter Mode of all pixel art assets to not appear blurry
    scene.textures.get('categoryButtonsPanel').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('outfitButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('button1').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('dressIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('outerIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('underwearIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('uniformIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('socksIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shoesIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('eyebrowsIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('blushIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('eyelashesIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('eyelinerIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('eyeshadowIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('lipstickIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('stickerIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('eyeColorIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('makeUpIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('hairIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('openIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('statPanel').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('sidePanel').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('emptyButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('backButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('categoryButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('categoryButtonHighlighted').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('dialogueBox').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('dialogueNameBox').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('selectionBox').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('tipsButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('statBar').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('heartIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('background').setFilter(Phaser.Textures.FilterMode.LINEAR);
    scene.textures.get('background').setFilter(Phaser.Textures.FilterMode.LINEAR);

    // Add filters for outfit icons if desired
    scene.textures.get('dress1Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('dress2Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shirt1Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shirt2Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('underwear1Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('socks1Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shoes1Icon').setFilter(Phaser.Textures.FilterMode.NEAREST);

    // Add filters for outfit anime textures if they are pixel art
    scene.textures.get('dress1').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('dress2').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shirt1').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shirt2').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('underwear1').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('socks1').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('shoes1').setFilter(Phaser.Textures.FilterMode.NEAREST);
  }
}