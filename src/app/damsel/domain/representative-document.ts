import { ArticlesOfAssociation } from './articles-of-association';
import { PowerOfAttorney } from './power-of-attorney';

export enum RepresentativeDocumentType {
    ArticlesOfAssociation = 'ArticlesOfAssociation',
    PowerOfAttorney = 'PowerOfAttorney'
}

export class RepresentativeDocument {
    articlesOfAssociation?: ArticlesOfAssociation;
    powerOfAttorney?: PowerOfAttorney;
}
