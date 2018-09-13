import connectClient from 'woody_js/dist/connect-client';

export type DomainService = any;

export type DomainClient = any;

export const createHttpClient = (service: DomainService): DomainClient =>
    connectClient(location.hostname, location.port, '/v1/domain/repository', service);
