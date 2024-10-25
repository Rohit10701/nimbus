import { Fields } from "../../types/mockData";
import { Chance } from "chance"
import casual from "casual";
import { getRandomLanguage, getRandomNationality, getRandomPronoun, getRandomRelationship } from "./randomGenerator";
export function GenerateUserProfileMockData(schemaFieldQueryString :keyof Fields) {
    const chance = new Chance()

    switch (schemaFieldQueryString) {
        case "$firstName":
            return  chance.first()
        case "$lastName":
            return chance.last()
        case "$fullName":
            return casual.full_name
        case "$prefixName":
            return casual.name_prefix
        case "$suffixName":
            return casual.name_suffix
        case "$middleName":
            return casual.name
        case "$displayName":
            return casual.username
        case "$nickname":
            return casual.name
        case "$age":
            return Math.floor(Math.random() * 100)
        case "$birthday":
            return chance.birthday
        case "$gender":
            return chance.gender
        case "$pronouns":
            return getRandomPronoun()
        case "$nationality":
            return getRandomNationality()
        case "$language":
            return  getRandomLanguage()
        case "$timezone":
            return chance.timezone
        case "$email":
            return casual.email
        case "$phoneNumber":
            return casual.phone
        case "$alternativeEmail":
            return casual.email
        case "$relationship":
            return getRandomRelationship()
        case "$address":
            return casual.address
        case "$address1":
            return casual.address1
        case "$address2":
            return casual.address2
        case "$addressCity":
            return casual.city
        case "$addressState":
            return casual.state
        case "$addressCountry":
            return casual.country
        case "$addressPostalCode":
        case "$userId":
        case "$username":
        case "$accountStatus":
        case "$registrationDate":
        case "$lastLoginDate":
        case "$lastActivityDate":
        case "$accountType":
        case "$verificationStatus":
        case "$emailNotifications":
        case "$pushNotifications":
        case "$marketingPreferencesEmail":
        case "$marketingPreferencesSms":
        case "$marketingPreferencesPush":
        case "$communicationLanguage":
        case "$theme":
        case "$socialProfilesLinkedin":
        case "$socialProfilesTwitter":
        case "$socialProfilesFacebook":
        case "$socialProfilesGithub":
        case "$occupation":
        case "$company":
        case "$department":
        case "$jobTitle":
        case "$skills":
        case "$professionalBio":
        case "$twoFactorEnabled":
        case "$lastPasswordChange":
        case "$securityQuestionsQuestion":
        case "$securityQuestionsAnswer":
        case "$tags":
        case "$notes":
        case "$customFields":
        case "$lastModified":
        case "$createdBy":
        case "$updatedBy":
        default:
            break;
    }
}