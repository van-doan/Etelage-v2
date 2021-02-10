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
}

export interface TVendor {
    id: number,
    name: string,
}

export interface TClient {
    id: number,
    name: string,
}

export interface TControl {
    id: number,
    question: string,
    type: EControlType,
    category: EControlCategory,
    depends_on:object
}

export interface TAssessmentTemplate {
    name:string,
    controls:TControl[],
    id:number,
}

export interface TStrapiFile {
    alternativeText: string,
    caption: string,
    created_at: string,
    ext: string,
    formats: string[],
    hash: string,
    height: number,
    id: number,
    mime: MimeType,
    name: string
    previewUrl: null
    provider: string
    provider_metadata: any
    size: number
    updated_at: string
    url: string
    width: number
}

export interface TControlResponse {
    id: number,
    control: TControl,
    comments: string,
    artifacts: any,
    assessment: TAssessment,
    answer: string,
}

export interface TAssessment {
    id: number,
    title: string,
    vendor: TVendor,
    client: TClient,
    controls: TControl[],
    status: EAssessmentStatus,
    control_responses: TControlResponse[],
    due_date:string,
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

export const LSAuthTokenKey = 'corl_jwt';