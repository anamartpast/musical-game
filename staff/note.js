export class Note {

    constructor(image, time) {
        this.image = image;
        this.time = time;
    }
}

export const noteScheme = [
    { //crotchet
        eq: 4,
        image: '/images/crotchet.png',
        time: 10
    },
    { //minim
        eq: 2,
        image: '/images/minim.png',
        time: 20
    },
    { //semibreve
        eq: 1,
        image: '/images/semibreve.png',
        time: 40
    }
];

