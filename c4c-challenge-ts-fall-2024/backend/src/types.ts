export interface PartnerDetails {
    id: string;
    thumbnailUrl: string;
    name: string;
    description: string;
    active: boolean;
}

export type PartnerData = Record<string, PartnerDetails>;
