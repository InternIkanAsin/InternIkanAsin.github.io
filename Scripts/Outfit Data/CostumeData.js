import {Costume} from './CostumeManager.js'

//Stores Costumes and its stats.
const costumeData = [
        // Dress Data
        new Costume("Dress1", "Dress", "dress1", "button1", "dress1Icon", 1),
        new Costume("Dress2", "Dress", "dress2", "button1", "dress2Icon", -2),
        // new Costume("Dress3", "Dress", "dress2", "button1", "dress2Icon", 2), // nggak ada iconnya
        new Costume("Dress4", "Dress", "dress4", "button1", "dress4Icon", 2),
        new Costume("Dress5", "Dress", "dress5", "button1", "dress5Icon", 3),
        new Costume("Dress6", "Dress", "dress6", "button1", "dress6Icon", 8),
        new Costume("Dress7", "Dress", "dress7", "button1", "dress7Icon", -4),
        new Costume("Dress8", "Dress", "dress8", "button1", "dress8Icon", 10),
        new Costume("Dress9", "Dress", "dress9", "button1", "dress9Icon", 5),
        new Costume("Dress10", "Dress", "dress10", "button1", "dress10Icon", 5),
        // new Costume("Dress11", "Dress", "dress11", "button1", "dress11Icon", 5), // nggak ada iconnya
        new Costume("Dress12", "Dress", "dress12", "button1", "dress12Icon", 6),
        new Costume("Dress13", "Dress", "dress13", "button1", "dress13Icon", -6),
        new Costume("Dress14", "Dress", "dress14", "button1", "dress14Icon", 7),
        new Costume("Dress15", "Dress", "dress15", "button1", "dress15Icon", 1),
        new Costume("Dress16", "Dress", "dress16", "button1", "dress16Icon", -2),
        new Costume("Dress17", "Dress", "dress17", "button1", "dress17Icon", 8),
        new Costume("Dress18", "Dress", "dress18", "button1", "dress18Icon", 5),
        new Costume("Dress19", "Dress", "dress19", "button1", "dress19Icon", 9),
        new Costume("Dress20", "Dress", "dress20", "button1", "dress20Icon", 3),

        // Shirt Data
        new Costume("Shirt1", "Shirt", "shirt1", "button1", "shirt1Icon", -2),
        new Costume("Shirt2", "Shirt", "shirt2", "button1", "shirt2Icon", -1),
        new Costume("Shirt3", "Shirt", "shirt3", "button1", "shirt3Icon", 0),
        // new Costume("Shirt4", "Shirt", "shirt4", "button1", "shirt4Icon", 0), // nggak ada iconnya
        new Costume("Shirt5", "Shirt", "shirt5", "button1", "shirt5Icon", 8),
        new Costume("Shirt6", "Shirt", "shirt6", "button1", "shirt6Icon", 2),
        new Costume("Shirt7", "Shirt", "shirt7", "button1", "shirt7Icon", 6),
        new Costume("Shirt8", "Shirt", "shirt8", "button1", "shirt8Icon", 3),
        new Costume("Shirt9", "Shirt", "shirt9", "button1", "shirt9Icon", 7),
        new Costume("Shirt10", "Shirt", "shirt10", "button1", "shirt10Icon", 9),
        new Costume("Shirt11", "Shirt", "shirt11", "button1", "shirt11Icon", 6),
        new Costume("Shirt12", "Shirt", "shirt12", "button1", "shirt12Icon", 5),
        new Costume("Shirt13", "Shirt", "shirt13", "button1", "shirt13Icon", 2),
        new Costume("Shirt14", "Shirt", "shirt14", "button1", "shirt14Icon", 6),
        new Costume("Shirt15", "Shirt", "shirt15", "button1", "shirt15Icon", 1),
        new Costume("Shirt16", "Shirt", "shirt16", "button1", "shirt16Icon", 7),
        new Costume("Shirt17", "Shirt", "shirt17", "button1", "shirt17Icon", 7),
        new Costume("Shirt18", "Shirt", "shirt18", "button1", "shirt18Icon", 0),
        new Costume("Shirt19", "Shirt", "shirt19", "button1", "shirt19Icon", 7),
        new Costume("Shirt20", "Shirt", "shirt20", "button1", "shirt20Icon", 6),
            
        //Outer
        new Costume("Outer1", "Outer", "outer1", "button1", "outer1Icon", 9),
        new Costume("Outer2", "Outer", "outer2", "button1", "outer2Icon", 4),
        new Costume("Outer3", "Outer", "outer3", "button1", "outer3Icon", -6),
        new Costume("Outer4", "Outer", "outer4", "button1", "outer4Icon", -10),
        new Costume("Outer5", "Outer", "outer5", "button1", "outer5Icon", 11),
        new Costume("Outer6", "Outer", "outer6", "button1", "outer6Icon", 1),
        new Costume("Outer7", "Outer", "outer7", "button1", "outer7Icon", 3),
        new Costume("Outer8", "Outer", "outer8", "button1", "outer8Icon", 7),
        new Costume("Outer9", "Outer", "outer9", "button1", "outer9Icon", 0),
        new Costume("Outer10", "Outer", "outer10", "button1", "outer10Icon", -8),
        new Costume("Outer11", "Outer", "outer11", "button1", "outer11Icon", 4),
        new Costume("Outer12", "Outer", "outer12", "button1", "outer12Icon", 1),
        new Costume("Outer13", "Outer", "outer13", "button1", "outer13Icon", 7),
        new Costume("Outer14", "Outer", "outer14", "button1", "outer14Icon", 5),
        new Costume("Outer15", "Outer", "outer15", "button1", "outer15Icon", -4),


        // Underwear
        new Costume("Underwear1", "Underwear", "underwear1", "button1", "underwear1Icon", -2),
        // new Costume("Underwear2", "Underwear", "underwear2", "button1", "underwear2Icon", 2), // nggak ada iconnya
        // new Costume("Underwear3", "Underwear", "underwear3", "button1", "underwear3Icon", 2), // nggak ada iconnya
        new Costume("Underwear4", "Underwear", "underwear4", "button1", "underwear4Icon", 3),
        new Costume("Underwear5", "Underwear", "underwear5", "button1", "underwear5Icon", 3),
        new Costume("Underwear6", "Underwear", "underwear6", "button1", "underwear6Icon", -4),
        new Costume("Underwear7", "Underwear", "underwear7", "button1", "underwear7Icon", 4),
        new Costume("Underwear8", "Underwear", "underwear8", "button1", "underwear8Icon", -5),
        new Costume("Underwear9", "Underwear", "underwear9", "button1", "underwear9Icon", 5),
        new Costume("Underwear10", "Underwear", "underwear10", "button1", "underwear10Icon", 6),

        // Socks
        new Costume("Socks1", "Socks", "socks1", "button1", "socks1Icon", 1),
        new Costume("Socks2", "Socks", "socks2", "button1", "socks2Icon", 3),
        new Costume("Socks3", "Socks", "socks3", "button1", "socks3Icon", -2),
        new Costume("Socks4", "Socks", "socks4", "button1", "socks4Icon", 2),
        new Costume("Socks5", "Socks", "socks5", "button1", "socks5Icon", 7),
        new Costume("Socks6", "Socks", "socks6", "button1", "socks6Icon", 3),
        new Costume("Socks7", "Socks", "socks7", "button1", "socks7Icon", -4),
        new Costume("Socks8", "Socks", "socks8", "button1", "socks8Icon", 4),
        new Costume("Socks9", "Socks", "socks9", "button1", "socks9Icon", -5),

        // Shoes
        new Costume("Shoes1", "Shoes", "shoes1", "button1", "shoes1Icon", 1),
        new Costume("Shoes2", "Shoes", "shoes2", "button1", "shoes2Icon", 9),
        new Costume("Shoes3", "Shoes", "shoes3", "button1", "shoes3Icon", 1),
        new Costume("Shoes4", "Shoes", "shoes4", "button1", "shoes4Icon", -3),
        new Costume("Shoes5", "Shoes", "shoes5", "button1", "shoes5Icon", 0),
        new Costume("Shoes6", "Shoes", "shoes6", "button1", "shoes6Icon", 4),
        new Costume("Shoes7", "Shoes", "shoes7", "button1", "shoes7Icon", -2),
        new Costume("Shoes8", "Shoes", "shoes8", "button1", "shoes8Icon", 5),
        new Costume("Shoes9", "Shoes", "shoes9", "button1", "shoes9Icon", 1),
        new Costume("Shoes10", "Shoes", "shoes10", "button1", "shoes10Icon", 4),
        new Costume("Shoes11", "Shoes", "shoes11", "button1", "shoes11Icon", 6),
        new Costume("Shoes12", "Shoes", "shoes12", "button1", "shoes12Icon", -7),
        new Costume("Shoes13", "Shoes", "shoes13", "button1", "shoes13Icon", 1)
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
    Dress: { x: 362.5, y: 527.5 },
    Shirt: { x: 362, y: 319  },
    Outer: { x: 362.5, y: 360.5 },
    Underwear: { x: 375, y: 623 },
    Socks: { x: 397.5, y: 648 },
    Shoes: { x: 408, y: 792 }
};
export {costumeData, outfitPositions, outfitCustomSizes, outfitManualOffsets};