import {EAssessmentStatus, EControlCategory, EControlType} from "./ModelEnums";

export interface TUser {
    activated: number,
    blocked: boolean | null,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    role: TUserRole,
    user_group: number,
    username: string,
    profile_img: TStrapiMediaFile,
    user_bio: string,
}

export interface TStrapiMediaFile {
    alternativeText: string,
    caption: string,
    created_at: string,
    ext: string,
    formats: {
        small: TStrapiMediaFileFormat,
        thumbnail: TStrapiMediaFileFormat,
    }
    hash: string,
    height: number,
    id: number,
    mime: string,
    name: string,
    previewUrl: null,
    provider: string,
    provider_metadata: null,
    size:  number,
    updated_at: string,
    url: string,
    width: number,
}

export interface TStrapiMediaFileFormat {
    ext: string,
    hash: string,
    height: number,
    mime: string,
    name: string,
    path: null,
    size: number,
    url: string,
    width: number,
}

export interface TExhibits {
    title: string,
    description: string,
    artwork_ids: any,
    exhibit_likes: number,
    user: TUser,
}

export interface TSignupValues {
    username?: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}


export interface TUserRole {
    description: string,
    id: number,
    name: string,
    type: string,
}

export interface TLoginValues {
    username: string,
    password: string,
}

export interface TLoginResponse {
    jwt: string,
    user: TUser,
}

export interface TSignupResponse {
    jwt: string,
    user: TUser,
}

export const LSAuthTokenKey = 'etelage_jwt';