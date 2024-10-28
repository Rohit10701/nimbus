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

    // Mapping schema fields to their corresponding chance methods or functions
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
        "$userId": () => chance.guid(), // Example: Generate a unique user ID
        "$username": () => chance.word(), // Example: Generate a username
        "$accountStatus": () => chance.bool(), // Example: Random account status
        "$registrationDate": () => chance.date(), // Example: Generate a registration date
        "$lastLoginDate": () => chance.date(), // Example: Generate a last login date
        "$lastActivityDate": () => chance.date(), // Example: Generate a last activity date
        "$accountType": () => chance.word(), // Example: Generate account type
        "$verificationStatus": () => chance.bool(), // Example: Random verification status
        "$emailNotifications": () => chance.bool(), // Example: Random email notification preference
        "$pushNotifications": () => chance.bool(), // Example: Random push notification preference
        "$marketingPreferencesEmail": () => chance.bool(), // Example: Email marketing preference
        "$marketingPreferencesSms": () => chance.bool(), // Example: SMS marketing preference
        "$marketingPreferencesPush": () => chance.bool(), // Example: Push marketing preference
        "$communicationLanguage": () => getRandomLanguage(), // Example: Random communication language
        "$theme": () => chance.word(), // Example: Generate a random theme
        "$socialProfilesLinkedin": () => chance.url(), // Example: Generate a LinkedIn profile URL
        "$socialProfilesTwitter": () => chance.url(), // Example: Generate a Twitter profile URL
        "$socialProfilesFacebook": () => chance.url(), // Example: Generate a Facebook profile URL
        "$socialProfilesGithub": () => chance.url(), // Example: Generate a GitHub profile URL
        "$occupation": () => chance.profession(), // Example: Generate a profession
        "$company": () => chance.company(), // Example: Generate a company name
        "$department": () => chance.word(), // Example: Generate a department name
        "$jobTitle": () => chance.sentence({ words: 2 }), // Example: Generate a job title
        "$skills": () => chance.words({ count: 3 }).join(", "), // Example: Generate skills list
        "$professionalBio": () => chance.paragraph(), // Example: Generate a professional bio
        "$twoFactorEnabled": () => chance.bool(), // Example: Random two-factor authentication status
        "$lastPasswordChange": () => chance.date(), // Example: Generate a last password change date
        "$securityQuestionsQuestion": () => chance.sentence(), // Example: Generate a security question
        "$securityQuestionsAnswer": () => chance.word(), // Example: Generate a security question answer
        "$tags": () => chance.word({ count: 3 }).join(", "), // Example: Generate tags
        "$notes": () => chance.paragraph(), // Example: Generate notes
        "$customFields": () => ({}), // Example: Generate custom fields object
        "$lastModified": () => chance.date(), // Example: Generate last modified date
        "$createdBy": () => chance.name(), // Example: Generate creator name
        "$updatedBy": () => chance.name(), // Example: Generate updater name
        "$middleName": () => chance.first(), // Example: Generate a middle name
        "$emergencyContactPhone": () => chance.phone(), // Example: Generate an emergency contact phone number
        "$address2": () => chance.street(), // Example: Generate a second address line
    };

    // Return the generated data based on the schema field query string
    return fieldMap[schemaFieldQueryString]?.() || null; // Return null for unknown fields
}
