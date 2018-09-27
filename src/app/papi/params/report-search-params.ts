export class ReportSearchParams {
    fromTime: string;
    toTime: string;
    from: string;
    size: string;
    merchantId?: string;
    invoiceId?: string;
    status?: string;
    categoryIds?: string[];
    paymentDomainRevision?: string;
}
