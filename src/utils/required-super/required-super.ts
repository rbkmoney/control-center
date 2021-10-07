/**
 * https://github.com/microsoft/TypeScript/issues/21388
 */
export const REQUIRED_SUPER = 'RequiredSuper' as const;

/**
 * If you're here, you probably need to return the parent
 * class's implementation, e.g. return super.ngOnInit();
 */
export type RequiredSuper = typeof REQUIRED_SUPER;
