import { Costume } from './CostumeManager.js'

//Stores Costumes and its stats.
const costumeData = [
    // Dress Data
    new Costume("Dress 1", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan17.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan17.png' }),
    new Costume("Dress 2", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya1.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_1.png' }),
    // new Costume("Dress3", "Dress", "dress2", "buttonIcon2", "dress2Icon", 2), // nggak ada iconnya
    new Costume("Dress 4", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya2.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_2.png' }),
    new Costume("Dress 5", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya3.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_3.png' }),
    new Costume("Dress 6", "Dress", { atlas: 'Dress_spritesheet3', frame: 'skate.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'skate.png' }),
    new Costume("Dress 7", "Dress", { atlas: 'Dress_spritesheet3', frame: 'terusan biru rample.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan biru rample.png' }),
    new Costume("Dress 8", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_07.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan07.png' }),
    new Costume("Dress 9", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_09.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan09.png' }),
    new Costume("Dress 10", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_14.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan14.png' }),
    // new Costume("Dress11", "Dress", "dress11", "buttonIcon2", "dress11Icon", 5), // nggak ada iconnya
    new Costume("Dress 12", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_dance.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_dansa.png' }),
    new Costume("Dress 13", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_prom.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_prom.png' }),
    new Costume("Dress 14", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_summer.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_summer.png' }),
    new Costume("Dress 15", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan05.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan05.png' }),
    new Costume("Dress 16", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan10.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan10.png' }),
    new Costume("Dress 17", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan13.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan13.png' }),
    new Costume("Dress 18", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan18.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan18.png' }),
    new Costume("Dress 19", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan19.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_Valentine.png' }),
    new Costume("Dress 20", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan20.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_gamis lebaran.png' }),

    // Shirt Data
    new Costume("Shirt 1", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_20.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_20.png' }),
    new Costume("Shirt 2", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_01.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_01.png' }),
    new Costume("Shirt 3", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'atasan_school.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_school.png' }),
    // new Costume("Shirt4", "Shirt", "shirt4", "buttonIcon2", "shirt4Icon", 0), // nggak ada iconnya
    new Costume("Shirt 4", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_03.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_03.png' }),
    new Costume("Shirt 5", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_04.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_04.png' }),
    new Costume("Shirt 6", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_06.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_06.png' }),
    new Costume("Shirt 7", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_08.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_08.png' }),
    new Costume("Shirt 8", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_22.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_22.png' }),
    new Costume("Shirt 9", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_19.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_19.png' }),
    new Costume("Shirt 10", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_23.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_23.png' }),
    new Costume("Shirt 11", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_25.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_25.png' }),
    new Costume("Shirt 12", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_26.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_26.png' }),
    new Costume("Shirt 13", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_28.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_28.png' }),
    new Costume("Shirt 14", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_31.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_31.png' }),
    new Costume("Shirt 15", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_32.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_32.png' }),
    new Costume("Shirt 16", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_33.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_33.png' }),
    new Costume("Shirt 17", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_34.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_34.png' }),
    new Costume("Shirt 18", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_35.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_35.png' }),
    new Costume("Shirt 19", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_37.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_37.png' }),

    //Outer
    new Costume("Outer 1", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_16.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_16.png' }),
    new Costume("Outer 2", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_17.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_17.png' }),
    new Costume("Outer 3", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_18.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_18.png' }),
    new Costume("Outer 4", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_20.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_20.png' }),
    new Costume("Outer 5", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_29.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_29.png' }),
    new Costume("Outer 6", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_32.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_32.png' }),
    new Costume("Outer 7", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_36.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_36.png' }),
    new Costume("Outer 8", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_37.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_37.png' }),
    new Costume("Outer 9", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_bomber.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaketbomber.png' }),
    new Costume("Outer 10", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_coklat.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_coklat.png' }),
    new Costume("Outer 11", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_flower.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_flower.png' }),
    new Costume("Outer 12", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_purple.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_purple.png' }),
    new Costume("Outer 13", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_red.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_red.png' }),
    new Costume("Outer 14", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sport.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_sport.png' }),
    new Costume("Outer 15", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sweater.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_sweater.png' }),


    // Underwear
    new Costume("Underwear 1", "Lower", { atlas: 'Lower_spritesheet', frame: 'celana_33.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'celana33.png' }),
    // new Costume("Underwear2", "Underwear", "underwear2", "buttonIcon2", "underwear2Icon", 2), // nggak ada iconnya
    // new Costume("Underwear3", "Underwear", "underwear3", "buttonIcon2", "underwear3Icon", 2), // nggak ada iconnya
    new Costume("Underwear 4", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_06.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_06.png' }),
    new Costume("Underwear 5", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_19.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_19.png' }),
    new Costume("Underwear 6", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_23.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_23.png' }),
    new Costume("Underwear 7", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_32.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_32.png' }),
    new Costume("Underwear 8", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_34.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_34.png' }),
    new Costume("Underwear 9", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_36.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_36.png' }),
    new Costume("Underwear 10", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_hangout.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'rok_hangout.png' }),

    //Socks
    new Costume("Socks 1", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_29.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_29.png' }),
    new Costume("Socks 2", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_05.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_05.png' }),
    new Costume("Socks 3", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_10.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_10.png' }),
    new Costume("Socks 4", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_17.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_17.png' }),
    new Costume("Socks 5", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_18.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_18.png' }),
    new Costume("Socks 6", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_22.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_22.png' }),
    new Costume("Socks 7", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_28.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_28.png' }),
    new Costume("Socks 8", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_in.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_in.png' }),
    new Costume("Socks 9", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_short.png' }, "buttonIcon2", { atlas: 'socksIcon_spritesheet', frame: 'kaoskaki_short.png' }),

    // Shoes
    new Costume("Shoes 1", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_14.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_14.png' }),
    new Costume("Shoes 2", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_07.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_07.png' }),
    new Costume("Shoes 3", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_08.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_08.png' }),
    new Costume("Shoes 4", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_12.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_12.png' }),
    new Costume("Shoes 5", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_18.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_18.png' }),
    new Costume("Shoes 6", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_16.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_16.png' }),
    new Costume("Shoes 7", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_21.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_21.png' }),
    new Costume("Shoes 8", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_26.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_26.png' }),
    new Costume("Shoes 9", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_28.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_28.png' }),
    new Costume("Shoes 10", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_29.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_29.png' }),
    new Costume("Shoes 11", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_30.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_30.png' }),
    new Costume("Shoes 12", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_34.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_34.png' }),
    new Costume("Shoes 13", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_36.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_36.png' })
];


export { costumeData };