import * as actionImport from './activity.actions';
import * as selectorImport from './activity.selectors';

export { default } from './activity.reducer';
export { default as addActivity } from './addActivity';

export const actions = actionImport;
export const selectors = selectorImport;
