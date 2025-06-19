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
    new Costume("Shirt 1", "Shirt", "shirt1", "buttonIcon2", "shirt1Icon", -2),
    new Costume("Shirt 2", "Shirt", "shirt2", "buttonIcon2", "shirt2Icon", -1),
    new Costume("Shirt 3", "Shirt", "shirt3", "buttonIcon2", "shirt3Icon", 0),
    // new Costume("Shirt4", "Shirt", "shirt4", "buttonIcon2", "shirt4Icon", 0), // nggak ada iconnya
    new Costume("Shirt 4", "Shirt", "shirt5", "buttonIcon2", "shirt5Icon", +8),
    new Costume("Shirt 5", "Shirt", "shirt6", "buttonIcon2", "shirt6Icon", +2),
    new Costume("Shirt 6", "Shirt", "shirt7", "buttonIcon2", "shirt7Icon", +6),
    new Costume("Shirt 7", "Shirt", "shirt8", "buttonIcon2", "shirt8Icon", +3),
    new Costume("Shirt 8", "Shirt", "shirt9", "buttonIcon2", "shirt9Icon", +7),
    new Costume("Shirt 9", "Shirt", "shirt10", "buttonIcon2", "shirt10Icon", +9),
    new Costume("Shirt 10", "Shirt", "shirt11", "buttonIcon2", "shirt11Icon", +6),
    new Costume("Shirt 11", "Shirt", "shirt12", "buttonIcon2", "shirt12Icon", +5),
    new Costume("Shirt 12", "Shirt", "shirt13", "buttonIcon2", "shirt13Icon", +2),
    new Costume("Shirt 13", "Shirt", "shirt14", "buttonIcon2", "shirt14Icon", +6),
    new Costume("Shirt 14", "Shirt", "shirt15", "buttonIcon2", "shirt15Icon", +1),
    new Costume("Shirt 15", "Shirt", "shirt16", "buttonIcon2", "shirt16Icon", +7),
    new Costume("Shirt 16", "Shirt", "shirt17", "buttonIcon2", "shirt17Icon", +7),
    new Costume("Shirt 17", "Shirt", "shirt18", "buttonIcon2", "shirt18Icon", 0),
    new Costume("Shirt 18", "Shirt", "shirt19", "buttonIcon2", "shirt19Icon", +7),
    new Costume("Shirt 19", "Shirt", "shirt20", "buttonIcon2", "shirt20Icon", +6),

    //Outer
    new Costume("Outer 1", "Outer", "outer1", "buttonIcon2", "outer1Icon", +9),
    new Costume("Outer 2", "Outer", "outer2", "buttonIcon2", "outer2Icon", +4),
    new Costume("Outer 3", "Outer", "outer3", "buttonIcon2", "outer3Icon", -6),
    new Costume("Outer 4", "Outer", "outer4", "buttonIcon2", "outer4Icon", -10),
    new Costume("Outer 5", "Outer", "outer5", "buttonIcon2", "outer5Icon", +11),
    new Costume("Outer 6", "Outer", "outer6", "buttonIcon2", "outer6Icon", +1),
    new Costume("Outer 7", "Outer", "outer7", "buttonIcon2", "outer7Icon", +3),
    new Costume("Outer 8", "Outer", "outer8", "buttonIcon2", "outer8Icon", +7),
    new Costume("Outer 9", "Outer", "outer9", "buttonIcon2", "outer9Icon", 0),
    new Costume("Outer 10", "Outer", "outer10", "buttonIcon2", "outer10Icon", -8),
    new Costume("Outer 11", "Outer", "outer11", "buttonIcon2", "outer11Icon", +4),
    new Costume("Outer 12", "Outer", "outer12", "buttonIcon2", "outer12Icon", +1),
    new Costume("Outer 13", "Outer", "outer13", "buttonIcon2", "outer13Icon", +7),
    new Costume("Outer 14", "Outer", "outer14", "buttonIcon2", "outer14Icon", +5),
    new Costume("Outer 15", "Outer", "outer15", "buttonIcon2", "outer15Icon", -4),


    // Underwear
    new Costume("Underwear 1", "Underwear", "underwear1", "buttonIcon2", "underwear1Icon", -2),
    // new Costume("Underwear2", "Underwear", "underwear2", "buttonIcon2", "underwear2Icon", 2), // nggak ada iconnya
    // new Costume("Underwear3", "Underwear", "underwear3", "buttonIcon2", "underwear3Icon", 2), // nggak ada iconnya
    new Costume("Underwear 4", "Underwear", "underwear4", "buttonIcon2", "underwear4Icon", +3),
    new Costume("Underwear 5", "Underwear", "underwear5", "buttonIcon2", "underwear5Icon", +3),
    new Costume("Underwear 6", "Underwear", "underwear6", "buttonIcon2", "underwear6Icon", -4),
    new Costume("Underwear 7", "Underwear", "underwear7", "buttonIcon2", "underwear7Icon", +4),
    new Costume("Underwear 8", "Underwear", "underwear8", "buttonIcon2", "underwear8Icon", -5),
    new Costume("Underwear 9", "Underwear", "underwear9", "buttonIcon2", "underwear9Icon", +5),
    new Costume("Underwear 10", "Underwear", "underwear10", "buttonIcon2", "underwear10Icon", +6),

    // Socks
    new Costume("Socks 1", "Socks", "socks1", "buttonIcon2", "socks1Icon", +1),
    new Costume("Socks 2", "Socks", "socks2", "buttonIcon2", "socks2Icon", +3),
    new Costume("Socks 3", "Socks", "socks3", "buttonIcon2", "socks3Icon", -2),
    new Costume("Socks 4", "Socks", "socks4", "buttonIcon2", "socks4Icon", +2),
    new Costume("Socks 5", "Socks", "socks5", "buttonIcon2", "socks5Icon", +7),
    new Costume("Socks 6", "Socks", "socks6", "buttonIcon2", "socks6Icon", +3),
    new Costume("Socks 7", "Socks", "socks7", "buttonIcon2", "socks7Icon", -4),
    new Costume("Socks 8", "Socks", "socks8", "buttonIcon2", "socks8Icon", +4),
    new Costume("Socks 9", "Socks", "socks9", "buttonIcon2", "socks9Icon", -5),

    // Shoes
    new Costume("Shoes 1", "Shoes", "shoes1", "buttonIcon2", "shoes1Icon", +1),
    new Costume("Shoes 2", "Shoes", "shoes2", "buttonIcon2", "shoes2Icon", +9),
    new Costume("Shoes 3", "Shoes", "shoes3", "buttonIcon2", "shoes3Icon", +1),
    new Costume("Shoes 4", "Shoes", "shoes4", "buttonIcon2", "shoes4Icon", -3),
    new Costume("Shoes 5", "Shoes", "shoes5", "buttonIcon2", "shoes5Icon", +0),
    new Costume("Shoes 6", "Shoes", "shoes6", "buttonIcon2", "shoes6Icon", +4),
    new Costume("Shoes 7", "Shoes", "shoes7", "buttonIcon2", "shoes7Icon", -2),
    new Costume("Shoes 8", "Shoes", "shoes8", "buttonIcon2", "shoes8Icon", +5),
    new Costume("Shoes 9", "Shoes", "shoes9", "buttonIcon2", "shoes9Icon", +1),
    new Costume("Shoes 10", "Shoes", "shoes10", "buttonIcon2", "shoes10Icon", +4),
    new Costume("Shoes 11", "Shoes", "shoes11", "buttonIcon2", "shoes11Icon", +6),
    new Costume("Shoes 12", "Shoes", "shoes12", "buttonIcon2", "shoes12Icon", -7),
    new Costume("Shoes 13", "Shoes", "shoes13", "buttonIcon2", "shoes13Icon", +1)
];

const outfitCustomSizes = {
    dress18: { width: 944, height: 900 },
    dress19: { width: 944, height: 900 },
    dress20: { width: 944, height: 900 },
    outer8: { width: 530, height: 565 }
};

const outfitManualOffsets = {
    outer14: { x: 0, y: -40 },
    underwear2: { x: 0, y: 0 },
    underwear3: { x: 0, y: 0 },
    underwear4: { x: -15, y: 20 },
    underwear5: { x: -15, y: 20 },
    underwear6: { x: -15, y: 20 },
    underwear7: { x: -15, y: 20 },
    underwear8: { x: -15, y: 20 },
    underwear9: { x: -15, y: 20 },
    underwear10: { x: -15, y: 20 }
};

//Stores outfit positions to be displayed on the character.
const outfitPositions = {
    Dress: { x: 872, y: 646.5 },
    Shirt: { x: 872.5, y: 439 },
    Outer: { x: 872.5, y: 479.5 },
    Underwear: { x: 890, y: 740 },
    Socks: { x: 911.5, y: 770 },
    Shoes: { x: 922, y: 907 }
};
export { costumeData, outfitPositions, outfitCustomSizes, outfitManualOffsets };