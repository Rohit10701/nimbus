export function getRandomPronoun() {
    const pronouns = [
        'he',
        'she',
        'they',
        'ze',
        'xe',
        'it',
        'we',
        'you',
        'I'
    ];

    // Generate a random index based on the length of the pronouns array
    const randomIndex = Math.floor(Math.random() * pronouns.length);
    
    // Return a random pronoun
    return pronouns[randomIndex];
}
export function getRandomNationality() {
    const nationalities = [
        'American',
        'British',
        'Canadian',
        'Australian',
        'German',
        'French',
        'Spanish',
        'Italian',
        'Indian',
        'Chinese',
        'Japanese',
        'Brazilian',
        'Mexican',
        'Russian',
        'South African',
        'Nigerian',
        'Egyptian',
        'Saudi',
        'Turkish',
        'Korean',
        'Swedish'
    ];

    // Generate a random index based on the length of the nationalities array
    const randomIndex = Math.floor(Math.random() * nationalities.length);
    
    // Return a random nationality
    return nationalities[randomIndex];
}
export function getRandomLanguage() {
    const languages = [
        'English',
        'Spanish',
        'French',
        'German',
        'Mandarin',
        'Hindi',
        'Arabic',
        'Portuguese',
        'Bengali',
        'Russian',
        'Japanese',
        'Korean',
        'Turkish',
        'Italian',
        'Vietnamese',
        'Polish',
        'Dutch',
        'Thai',
        'Swedish',
        'Danish'
    ];

    // Generate a random index based on the length of the languages array
    const randomIndex = Math.floor(Math.random() * languages.length);
    
    // Return a random language
    return languages[randomIndex];
}
export function getRandomRelationship() {
    const relationships = [
        'Single',
        'In a Relationship',
        'Engaged',
        'Married',
        'Separated',
        'Divorced',
        'Widowed',
        "It's Complicated",
        'Open Relationship',
        'In a Civil Union',
        'In a Domestic Partnership',
        'Long-Distance Relationship',
        'Dating',
        'Friends with Benefits',
        'Cohabitating'
    ];

    // Generate a random index based on the length of the relationships array
    const randomIndex = Math.floor(Math.random() * relationships.length);
    
    // Return a random relationship type
    return relationships[randomIndex];
}
