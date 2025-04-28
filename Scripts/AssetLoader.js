export default class AssetLoader {
  static loadAllAssets(scene) {
    AssetLoader.loadRexUIPlugin(scene);
    AssetLoader.loadUIAssets(scene);
    AssetLoader.loadSceneAssets(scene);
    AssetLoader.loadOutfitAssets(scene);
    AssetLoader.loadAudioAssets(scene);
      scene.load.once('complete', () => {
        AssetLoader.changeFilterMode(scene);
      });
  }

  static loadRexUIPlugin(scene){
      scene.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
        });
  }
  static loadUIAssets(scene) {
    scene.load.image('categoryButtonsPanel', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_1.png');
    scene.load.image('outfitButton', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_2.png');
    scene.load.image('dressIcon', 'Asset/UI/Cisini_UI_DressUp_Dress_Icon.png');
    scene.load.image('outerIcon', 'Asset/UI/Cisini_UI_DressUp_Outer_Icon.png');
    scene.load.image('underwearIcon', 'Asset/UI/Cisini_UI_DressUp_Underwear_Icon.png');
    scene.load.image('uniformIcon', 'Asset/UI/Cisini_UI_DressUp_Uniform_Icon.png');
    scene.load.image('socksIcon', 'Asset/UI/Cisini_UI_DressUp_Socks_Icon.png');
    scene.load.image('shoesIcon', 'Asset/UI/Cisini_UI_DressUp_Shoes_Icon.png');
    scene.load.image('openIcon', 'Asset/UI/Cisini_UI_DressUp_ScrollButton_UP_Icon.png');
    scene.load.image('outfitPanel', 'Asset/UI/Cisini_UI_Buy_Background.png');
    scene.load.image('statPanel', 'Asset/UI/Cisini_UI_DressUp_MenuIcon_Scroll_Button.png');
    scene.load.image('emptyButton', 'Asset/UI/cisini_ui_button kosong.png');
    scene.load.image('backButton', 'Asset/UI/Cisini_UI_DressUp_BackButton_Icon.png');
    scene.load.image('checkMark', 'Asset/UI/tanda_ceklis.png');
    scene.load.image('xMark', 'Asset/UI/tanda_silang.png');
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

  static loadAudioAssets(scene){
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

  static changeFilterMode(scene){
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
    scene.textures.get('openIcon').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('statPanel').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('emptyButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
    scene.textures.get('backButton').setFilter(Phaser.Textures.FilterMode.NEAREST);
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