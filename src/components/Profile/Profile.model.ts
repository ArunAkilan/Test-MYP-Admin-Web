
export default interface ProfileForm {
    ProfileInformation: {
        firstName: string;
        lastName: string;
        gendeMale: string;
        genderFemale: string;
        genderOthers: string;
        gendePreferNotToSay: string;
    }
    contactInformation: {
        email: string;
        priaryPhone: string;
        secondaryPhone? : string;
    }
    location: {
        longitude: number;
        latitude: number;
        address: string;
    }
    description: string;
    profilePicture: string;
}
