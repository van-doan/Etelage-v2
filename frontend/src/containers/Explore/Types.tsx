import {TUser} from '../../stores/App/Types'
// Interface is just static typing to declare variables

// "T" => Type; 'I' => info/interface
export interface IArtsyArtworkLink {
    href: string
}

export interface IArtsyArtwork {
        description: string,
        og_type: string,
        title: string,
        type: string,
        _links: {
            permalink: IArtsyArtworkLink,
            self: IArtsyArtworkLink,
            thumbnail: IArtsyArtworkLink,
}
}

// IArtsyArtworkApiResponse => simplistic version
export interface IArtsyApiResponse<I> {
    offset: number,
    q: string,
    total_count: number,
    _embedded: {
        results: I[],
    }
    _links: {
        next: IArtsyArtworkLink,
        self: IArtsyArtworkLink,
    }
}

export interface IArtsyArtworkApiResponse extends IArtsyApiResponse<IArtsyArtwork> {
}
