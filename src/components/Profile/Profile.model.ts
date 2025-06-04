export default interface ProfileForm {
  ProfileInformation: {
    firstName: string;
    lastName: string;
    gendeMale: string;
    genderFemale: string;
    genderOthers: string;
    gendePreferNotToSay: string;
  };
  contactInformation: {
    email: string;
    priaryPhone: string;
    secondaryPhone?: string;
  };
  location: {
    longitude: number;
    latitude: number;
    address: string;
  };
  description: string;
  profilePicture: string;
}

export interface FormDataInterface {
  firstName: string;
  lastName: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  bio: string;
  address: string;
  gender: string;
  longitude:number | null ;
  latitude:number | null ;
}

// export interface uploadmageData {
//  File {name: 'Screenshot 2025-05-20 095114.png', lastModified: 1747714874997, lastModifiedDate: Tue May 20 2025 09:51:14 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 98829, …}
// lastModified
// : 
// 1747714874997
// lastModifiedDate
// : 
// Tue May 20 2025 09:51:14 GMT+0530 (India Standard Time) {}
// name
// : 
// "Screenshot 2025-05-20 095114.png"
// size
// : 
// 98829
// type
// : 
// "image/png"
// webkitRelativePath
// : 
// ""
// }
