import { Costume } from './CostumeManager.js'

//Stores Costumes and its stats.
const costumeData = [
    // Dress Data
    new Costume("Dress 1", "Dress", "dress1", "buttonIcon2", "dress1Icon", +1),
    new Costume("Dress 2", "Dress", "dress2", "buttonIcon2", "dress2Icon", -2),
    // new Costume("Dress3", "Dress", "dress2", "buttonIcon2", "dress2Icon", 2), // nggak ada iconnya
    new Costume("Dress 4", "Dress", "dress4", "buttonIcon2", "dress4Icon", +2),
    new Costume("Dress 5", "Dress", "dress5", "buttonIcon2", "dress5Icon", +3),
    new Costume("Dress 6", "Dress", "dress6", "buttonIcon2", "dress6Icon", +8),
    new Costume("Dress 7", "Dress", "dress7", "buttonIcon2", "dress7Icon", -4),
    new Costume("Dress 8", "Dress", "dress8", "buttonIcon2", "dress8Icon", +10),
    new Costume("Dress 9", "Dress", "dress9", "buttonIcon2", "dress9Icon", +5),
    new Costume("Dress 10", "Dress", "dress10", "buttonIcon2", "dress10Icon", +5),
    // new Costume("Dress11", "Dress", "dress11", "buttonIcon2", "dress11Icon", 5), // nggak ada iconnya
    new Costume("Dress 12", "Dress", "dress12", "buttonIcon2", "dress12Icon", +6),
    new Costume("Dress 13", "Dress", "dress13", "buttonIcon2", "dress13Icon", -6),
    new Costume("Dress 14", "Dress", "dress14", "buttonIcon2", "dress14Icon", +7),
    new Costume("Dress 15", "Dress", "dress15", "buttonIcon2", "dress15Icon", +1),
    new Costume("Dress 16", "Dress", "dress16", "buttonIcon2", "dress16Icon", -2),
    new Costume("Dress 17", "Dress", "dress17", "buttonIcon2", "dress17Icon", +8),
    new Costume("Dress 18", "Dress", "dress18", "buttonIcon2", "dress18Icon", +5),
    new Costume("Dress 19", "Dress", "dress19", "buttonIcon2", "dress19Icon", +9),
    new Costume("Dress 20", "Dress", "dress20", "buttonIcon2", "dress20Icon", +3),

    // Shirt Data
    new Costume("Shirt 1", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_20.png' }, "buttonIcon2", "shirt1Icon", -2),
    new Costume("Shirt 2", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_01.png' }, "buttonIcon2", "shirt2Icon", -1),
    new Costume("Shirt 3", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'atasan_school.png' }, "buttonIcon2", "shirt3Icon", 0),
    // new Costume("Shirt4", "Shirt", "shirt4", "buttonIcon2", "shirt4Icon", 0), // nggak ada iconnya
    new Costume("Shirt 4", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_03.png' }, "buttonIcon2", "shirt5Icon", +8),
    new Costume("Shirt 5", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_04.png' }, "buttonIcon2", "shirt6Icon", +2),
    new Costume("Shirt 6", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_06.png' }, "buttonIcon2", "shirt7Icon", +6),
    new Costume("Shirt 7", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_08.png' }, "buttonIcon2", "shirt8Icon", +3),
    new Costume("Shirt 8", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_22.png' }, "buttonIcon2", "shirt9Icon", +7),
    new Costume("Shirt 9", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_19.png' }, "buttonIcon2", "shirt10Icon", +9),
    new Costume("Shirt 10", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_23.png' }, "buttonIcon2", "shirt11Icon", +6),
    new Costume("Shirt 11", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_25.png' }, "buttonIcon2", "shirt12Icon", +5),
    new Costume("Shirt 12", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_26.png' }, "buttonIcon2", "shirt13Icon", +2),
    new Costume("Shirt 13", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_28.png' }, "buttonIcon2", "shirt14Icon", +6),
    new Costume("Shirt 14", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_31.png' }, "buttonIcon2", "shirt15Icon", +1),
    new Costume("Shirt 15", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_32.png' }, "buttonIcon2", "shirt16Icon", +7),
    new Costume("Shirt 16", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_33.png' }, "buttonIcon2", "shirt17Icon", +7),
    new Costume("Shirt 17", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_34.png' }, "buttonIcon2", "shirt18Icon", 0),
    new Costume("Shirt 18", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_35.png' }, "buttonIcon2", "shirt19Icon", +7),
    new Costume("Shirt 19", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_37.png' }, "buttonIcon2", "shirt20Icon", +6),

    //Outer
    new Costume("Outer 1", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_16.png' }, "buttonIcon2", "outer1Icon", +9),
    new Costume("Outer 2", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_17.png' }, "buttonIcon2", "outer2Icon", +4),
    new Costume("Outer 3", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_18.png' }, "buttonIcon2", "outer3Icon", -6),
    new Costume("Outer 4", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_20.png' }, "buttonIcon2", "outer4Icon", -10),
    new Costume("Outer 5", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_29.png' }, "buttonIcon2", "outer5Icon", +11),
    new Costume("Outer 6", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_32.png' }, "buttonIcon2", "outer6Icon", +1),
    new Costume("Outer 7", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_36.png' }, "buttonIcon2", "outer7Icon", +3),
    new Costume("Outer 8", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_37.png' }, "buttonIcon2", "outer8Icon", +7),
    new Costume("Outer 9", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_bomber.png' }, "buttonIcon2", "outer9Icon", 0),
    new Costume("Outer 10", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_coklat.png' }, "buttonIcon2", "outer10Icon", -8),
    new Costume("Outer 11", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_flower.png' }, "buttonIcon2", "outer11Icon", +4),
    new Costume("Outer 12", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_purple.png' }, "buttonIcon2", "outer12Icon", +1),
    new Costume("Outer 13", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_red.png' }, "buttonIcon2", "outer13Icon", +7),
    new Costume("Outer 14", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sport.png' }, "buttonIcon2", "outer14Icon", +5),
    new Costume("Outer 15", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sweater.png' }, "buttonIcon2", "outer15Icon", -4),


    // Underwear
    new Costume("Underwear 1", "Lower", { atlas: 'Lower_spritesheet', frame: 'celana_33.png' }, "buttonIcon2", "underwear1Icon", -2),
    // new Costume("Underwear2", "Underwear", "underwear2", "buttonIcon2", "underwear2Icon", 2), // nggak ada iconnya
    // new Costume("Underwear3", "Underwear", "underwear3", "buttonIcon2", "underwear3Icon", 2), // nggak ada iconnya
    new Costume("Underwear 4", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_06.png' }, "buttonIcon2", "underwear4Icon", +3),
    new Costume("Underwear 5", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_19.png' }, "buttonIcon2", "underwear5Icon", +3),
    new Costume("Underwear 6", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_23.png' }, "buttonIcon2", "underwear6Icon", -4),
    new Costume("Underwear 7", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_32.png' }, "buttonIcon2", "underwear7Icon", +4),
    new Costume("Underwear 8", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_34.png' }, "buttonIcon2", "underwear8Icon", -5),
    new Costume("Underwear 9", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_36.png' }, "buttonIcon2", "underwear9Icon", +5),
    new Costume("Underwear 10", "Lower", { atlas: 'Lower_spritesheet', frame: 'rok_hangout.png' }, "buttonIcon2", "underwear10Icon", +6),

    new Costume("Socks 1", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_29.png' }, "buttonIcon2", "socks1Icon", +1),
    new Costume("Socks 2", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_05.png' }, "buttonIcon2", "socks2Icon", +3),
    new Costume("Socks 3", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_10.png' }, "buttonIcon2", "socks3Icon", -2),
    new Costume("Socks 4", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_17.png' }, "buttonIcon2", "socks4Icon", +2),
    new Costume("Socks 5", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_18.png' }, "buttonIcon2", "socks5Icon", +7),
    new Costume("Socks 6", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_22.png' }, "buttonIcon2", "socks6Icon", +3),
    new Costume("Socks 7", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_28.png' }, "buttonIcon2", "socks7Icon", -4),
    new Costume("Socks 8", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_in.png' }, "buttonIcon2", "socks8Icon", +4),
    new Costume("Socks 9", "Socks", { atlas: 'Socks_spritesheet', frame: 'kaoskaki_short.png' }, "buttonIcon2", "socks9Icon", -5),

    // Shoes
    new Costume("Shoes 1", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_14.png' }, "buttonIcon2", "shoes1Icon", +1),
    new Costume("Shoes 2", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_07.png' }, "buttonIcon2", "shoes2Icon", +9),
    new Costume("Shoes 3", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_08.png' }, "buttonIcon2", "shoes3Icon", +1),
    new Costume("Shoes 4", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_12.png' }, "buttonIcon2", "shoes4Icon", -3),
    new Costume("Shoes 5", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_18.png' }, "buttonIcon2", "shoes5Icon", +0),
    new Costume("Shoes 6", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_16.png' }, "buttonIcon2", "shoes6Icon", +4),
    new Costume("Shoes 7", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_21.png' }, "buttonIcon2", "shoes7Icon", -2),
    new Costume("Shoes 8", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_26.png' }, "buttonIcon2", "shoes8Icon", +5),
    new Costume("Shoes 9", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_28.png' }, "buttonIcon2", "shoes9Icon", +1),
    new Costume("Shoes 10", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_29.png' }, "buttonIcon2", "shoes10Icon", +4),
    new Costume("Shoes 11", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_30.png' }, "buttonIcon2", "shoes13Icon", +6),
    new Costume("Shoes 12", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_34.png' }, "buttonIcon2", "shoes12Icon", -7),
    new Costume("Shoes 13", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_36.png' }, "buttonIcon2", "shoes11Icon", +1)
];


export { costumeData };