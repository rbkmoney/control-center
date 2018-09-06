import connectClient from 'woody_js/dist/connect-client';

export type PaymentProcessingService = any;

export type PaymentProcessingClient = any;

export const createHttpClient = (service: PaymentProcessingService): PaymentProcessingClient =>
    connectClient(location.hostname, location.port, '/v1/processing/invoicing', service);
