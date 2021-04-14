import { filter } from 'rxjs/operators';

export const noop = filter(() => false);
