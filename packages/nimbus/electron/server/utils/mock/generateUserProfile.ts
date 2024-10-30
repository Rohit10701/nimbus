import { Fields } from "../../types/mock/mockDataTemplate";
import { Chance } from "chance";
import {
    getRandomLanguage,
    getRandomNationality,
    getRandomPronoun,
    getRandomRelationship
} from "./randomGenerator";

export function generateRandomDataForFields(schemaFieldQueryString: keyof Fields) {
    const chance = new Chance();

    const fieldMap: Record<keyof Fields, () => any> = {
        "$firstName": () => chance.first(),
        "$lastName": () => chance.last(),
        "$fullName": () => chance.name(),
        "$prefixName": () => chance.name_prefix(),
        "$suffixName": () => chance.name_suffix(),
        "$displayName": () => chance.name(),
        "$nickname": () => chance.name(),
        "$age": () => Math.floor(Math.random() * 100),
        "$birthday": () => chance.birthday(),
        "$gender": () => chance.gender(),
        "$pronouns": () => getRandomPronoun(),
        "$nationality": () => getRandomNationality(),
        "$language": () => getRandomLanguage(),
        "$timezone": () => chance.timezone(),
        "$email": () => chance.email(),
        "$phoneNumber": () => chance.phone(),
        "$alternativeEmail": () => chance.email(),
        "$relationship": () => getRandomRelationship(),
        "$address": () => chance.address(),
        "$address1": () => chance.street(),
        "$addressCity": () => chance.city(),
        "$addressState": () => chance.state(),
        "$addressCountry": () => chance.country(),
        "$addressPostalCode": () => chance.zip(),
        "$userId": () => chance.guid(),
        "$username": () => chance.word(),
        "$accountStatus": () => chance.bool(),
        "$registrationDate": () => chance.date(),
        "$lastLoginDate": () => chance.date(),
        "$lastActivityDate": () => chance.date(),
        "$accountType": () => chance.word(),
        "$verificationStatus": () => chance.bool(),
        "$emailNotifications": () => chance.bool(),
        "$pushNotifications": () => chance.bool(),
        "$marketingPreferencesEmail": () => chance.bool(),
        "$marketingPreferencesSms": () => chance.bool(),
        "$marketingPreferencesPush": () => chance.bool(),
        "$communicationLanguage": () => getRandomLanguage(),
        "$theme": () => chance.word(),
        "$socialProfilesLinkedin": () => chance.url(),
        "$socialProfilesTwitter": () => chance.url(),
        "$socialProfilesFacebook": () => chance.url(),
        "$socialProfilesGithub": () => chance.url(),
        "$occupation": () => chance.profession(),
        "$company": () => chance.company(),
        "$department": () => chance.word(),
        "$jobTitle": () => chance.sentence({ words: 2 }),
        "$skills": () => chance.word(), // Example: Generate skills list
        "$professionalBio": () => chance.paragraph(),
        "$twoFactorEnabled": () => chance.bool(),
        "$lastPasswordChange": () => chance.date(),
        "$securityQuestionsQuestion": () => chance.sentence(),
        "$securityQuestionsAnswer": () => chance.word(),
        "$tags": () => chance.word(), // Example: Generate tags
        "$notes": () => chance.paragraph(),
        "$customFields": () => ({}),
        "$lastModified": () => chance.date(),
        "$createdBy": () => chance.name(),
        "$updatedBy": () => chance.name(),
        "$middleName": () => chance.first(),
        "$emergencyContactPhone": () => chance.phone(),
        "$address2": () => chance.street(),
    };
    
    return fieldMap[schemaFieldQueryString]?.() || null; // Return null for unknown fields
    

    // Return the generated data based on the schema field query string
    return fieldMap[schemaFieldQueryString]?.() || null; // Return null for unknown fields
}
