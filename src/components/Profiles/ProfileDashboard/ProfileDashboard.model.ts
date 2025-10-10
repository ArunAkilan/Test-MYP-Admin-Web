export interface Profile {
  _id: string;
  profileInformation: {
    firstName: string;
    lastName: string;
    gender: string;
  };
  contactInformation: {
    email: string;
    primaryPhone: string;
    secondaryPhone?: string;
  };
  location: {
    map: {
      latitude: number;
      longitude: number;
    };
    address?: string;
  };
  profilePicture?: string;
  role: "Admin" | "Marketing" | "User" | "SuperAdmin";
  description?: string;
  password?: string;
}
