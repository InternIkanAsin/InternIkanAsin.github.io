import { Costume } from './CostumeManager.js'

//Stores Costumes and its stats.
const costumeData = [
    // Dress Data
    new Costume("Cargo pants + knit crop top", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan17.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan17.png' }),
    new Costume("Kebaya", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya1.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_1.png' }),
    new Costume("Quality kebaya", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya2.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_2.png' }),
    new Costume("Rare kebaya", "Dress", { atlas: 'Dress_spritesheet3', frame: 'kebaya3.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'Kebaya_3.png' }),
    new Costume("Pink set", "Dress", { atlas: 'Dress_spritesheet3', frame: 'skate.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'skate.png' }),
    new Costume("Blue rample", "Dress", { atlas: 'Dress_spritesheet3', frame: 'terusan biru rample.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan biru rample.png' }),
    new Costume("Long-Sleeved Purple Dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_07.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan07.png' }),
    new Costume("Floral Print sundress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_09.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan09.png' }),
    new Costume("Pink blazer dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_14.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan14.png' }),
    new Costume("Flower dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_dance.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_dansa.png' }),
    new Costume("Ruffled white and purple dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_prom.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_prom.png' }),
    new Costume("Orange summer dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan_summer.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_summer.png' }),
    new Costume("Frilly blue dress", "Dress", { atlas: 'Dress_spritesheet2', frame: 'terusan05.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan05.png' }),
    new Costume("Black Cocktail Dress", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan10.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan10.png' }),
    new Costume("White minidress", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan13.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan13.png' }),
    new Costume("Corset dress", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan18.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan18.png' }),
    new Costume("Red heart white mini dress", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan19.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_Valentine.png' }),
    new Costume("Holiday Dress", "Dress", { atlas: 'Dress_spritesheet1', frame: 'terusan20.png' }, "buttonIcon2", { atlas: 'dressIcon_spritesheet', frame: 'terusan_gamis lebaran.png' }),

    // Shirt Data
    new Costume("Brown sleeveless top", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_20.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_20.png' }),
    new Costume("Long sleeve cold shoulder t-shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_01.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_01.png' }),
    new Costume("School top", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'atasan_school.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_school.png' }),
    new Costume("Black sleeveless shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_03.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_03.png' }),
    new Costume("White t-shirt + cropped camisole top", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_04.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_04.png' }),
    new Costume("Crop top white shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_06.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_06.png' }),
    new Costume("Off Shoulder Halter Neck", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_08.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_08.png' }),
    new Costume("Cold shoulder short sleeve", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_22.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_22.png' }),
    new Costume("Long sleeve cold shoulder t-shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_19.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_19.png' }),
    new Costume("Pink knitwear", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_23.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_23.png' }),
    new Costume("Checkered tanktop with ribbons", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_25.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_25.png' }),
    new Costume("White blouse", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_26.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_26.png' }),
    new Costume("Shirt with Ties", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_28.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_28.png' }),
    new Costume("White Shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_31.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_31.png' }),
    new Costume("Purple v-neck", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_32.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_32.png' }),
    new Costume("Mock neck pink shirt", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_33.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_33.png' }),
    new Costume("White turtleneck", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_34.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_34.png' }),
    new Costume("Off-Shoulder crop top", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_35.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_35.png' }),
    new Costume("White Mock neck", "Shirt", { atlas: 'Shirt_spritesheet', frame: 'baju_37.png' }, "buttonIcon2", { atlas: 'shirtIcon_spritesheet', frame: 'baju_37.png' }),

    //Outer
    new Costume("See through maxi crop", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_16.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_16.png' }),
    new Costume("Fur cardigan", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_17.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_17.png' }),
    new Costume("Green wool cardigan", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_18.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_18.png' }),
    new Costume("Blue oversized Sweater", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_20.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_20.png' }),
    new Costume("Pink Bomber Jacket", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_29.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_29.png' }),
    new Costume("White cardigan", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_32.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_32.png' }),
    new Costume("Sports jacket", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_36.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_36.png' }),
    new Costume("Grey jacket", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_37.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_37.png' }),
    new Costume("Denim vest", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_bomber.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaketbomber.png' }),
    new Costume("Crop tweed jacket", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_coklat.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_coklat.png' }),
    new Costume("Knitted vest with laces", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_flower.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_flower.png' }),
    new Costume("Purple Cropped blazer", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_purple.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_purple.png' }),
    new Costume("Knitted Red blazer", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_red.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_red.png' }),
    new Costume("Green sport jacket", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sport.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_sport.png' }),
    new Costume("Pink Knitted blazer", "Outer", { atlas: 'Outer_spritesheet', frame: 'jaket_sweater.png' }, "buttonIcon2", { atlas: 'outerIcon_spritesheet', frame: 'jaket_sweater.png' }),


    // Underwear
    new Costume("Underwear 1", "Lower", { atlas: 'Lower_spritesheet', frame: 'celana_33.png' }, "buttonIcon2", { atlas: 'underwearIcon_spritesheet', frame: 'celana33.png' }),
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
    new Costume("Shoes 11", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_30.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_36.png' }),
    new Costume("Shoes 12", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_34.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_34.png' }),
    new Costume("Shoes 13", "Shoes", { atlas: 'Shoes_spritesheet', frame: 'sepatu_36.png' }, "buttonIcon2", { atlas: 'shoesIcon_spritesheet', frame: 'sepatu_30.png' })
];


export { costumeData };