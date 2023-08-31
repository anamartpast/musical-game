export const tones = {
    RE: 0,
    MI: 1,
    FA: 2,
    SOL: 3,
    LA: 4,
    S_CROTCHET: 5,
    S_MINIM: 6,
    S_SEMIBREVE: 7,
};

export const tonePositions = {
    [tones.S_CROTCHET]: "12%",
    [tones.S_MINIM]: "-2%",
    [tones.S_SEMIBREVE]: "-9%",
    [tones.RE]: "40%",
    [tones.MI]: "32%",
    [tones.FA]: "23%",
    [tones.SOL]: "15%",
    [tones.LA]: "6%"
}