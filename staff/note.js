export class Note {

    constructor(image, time) {
        this.image = image;
        this.time = time;
    }
}

export const noteScheme = [
    { //quaver
        eq: 8,
        image: '/images/quaver.png',
        time: 5,
    },
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

