// l. 435
import { ObjectSchema } from 'yup';

export interface IAuthUser {
  // profilePublicId?: string | null;
  profilePublicId: string | null;
  country: string | null;
  createdAt: Date | null;
  email: string | null;
  emailVerificationToken: string | null;
  emailVerified: boolean | null;
  id: number | null;
  passwordResetExpires: Date | null;
  passwordResetToken: null | null;
  // profilePicture?: string | null;
  profilePicture: string | null;
  updatedAt: Date | null;
  username: string | null;
  // browserName: string | null; // l. 647
  // deviceType: string | null; // l. 647
}

export interface IAuthDocument {
  id?: number;
  // profilePublicId?: string | null;
  profilePublicId?: string;
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  // profilePicture?: string | null;
  profilePicture?: string;
  emailVerified?: number;
  emailVerificationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // browserName?: string; // l. 647
  // deviceType?: string; // l. 647
}

export interface IUseAuthSchema {
  schema: ObjectSchema<ISignInPayload | ISignUpPayload | IResetPassword>;
  userInfo: ISignInPayload | ISignUpPayload | IResetPassword;
}

export const AUTH_FETCH_STATUS = {
  IDLE: '',
  SUCCESS: 'success',
  ERROR: 'error'
};

export interface ISignUpPayload {
  // [key: string]: string;
  [key: string]: string | null | undefined;
  username: string;
  password: string;
  email: string;
  country: string;
  profilePicture: string;
  // browserName: string | null | undefined; // l. 647
  // deviceType: string | null | undefined; // l. 647
}

export interface ISignInPayload {
  // [key: string]: string;
  [key: string]: string | null | undefined;
  username: string;
  password: string;
  // browserName: string | null | undefined; // l. 647
  // deviceType: string | null | undefined; // l. 647
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export interface IReduxAuthPayload {
  authInfo?: IAuthDocument;
}

export interface IReduxAddAuthUser {
  type: string;
  payload: IReduxAuthPayload;
}

export interface IReduxLogout {
  type: string;
  payload: boolean;
}

export interface IAuthResponse {
  message: string;
}
