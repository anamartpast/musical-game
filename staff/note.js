import { tones } from "./tones.js";

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

export const silenceScheme = [
    { //crotchet
        eq: 4,
        image: '/images/s_crotchet.png',
        time: 10,
        silence: true,
        tone: tones.S_CROTCHET
    },
    {
        eq: 2,
        image: '/images/minim.png',
        time: 20,
        silence: true,
        tone: tones.S_MINIM
    },
    { //semibreve silence
        eq: 1,
        image: '/images/silence_w.png',
        time: 40,
        silence: true,
        tone: tones.S_SEMIBREVE
    }
]