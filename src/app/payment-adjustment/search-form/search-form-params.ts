import { ReportSearchParams } from '../../papi/params';
import { Diff } from '../../shared/type-helpers';

export interface SearchFormParams extends Pick<ReportSearchParams, Diff<keyof ReportSearchParams, 'invoiceId' | 'paymentDomainRevision'>> {
    invoiceId?: string[];
    paymentDomainRevision?: string[];
}
