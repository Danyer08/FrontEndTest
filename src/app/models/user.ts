import { UserProfile } from './user-profile';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  lastvisit: number;
  session?: UserProfile;
}
