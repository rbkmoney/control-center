import get from 'lodash-es/get';
import { CategoryRef, ProviderObject } from '../damsel/gen-model/domain';

export const filterProvidersByCategories = (
    objects: ProviderObject[],
    shopCategories: number[]
): ProviderObject[] => objects.filter((obj) => {
        const predicate = (category: CategoryRef) =>
            !!shopCategories.find((shopCategory) => shopCategory === category.id);
        const paymentCats = get(obj, 'data.payment_terms.categories.value');
        const recurrentCats = get(obj, 'data.recurrent_paytool_terms.categories.value');
        if (paymentCats) {
            return !!Array.from(paymentCats.values()).find(predicate);
        }
        if (recurrentCats) {
            return !!Array.from(recurrentCats.values()).find(predicate);
        }
        return null;
    });
