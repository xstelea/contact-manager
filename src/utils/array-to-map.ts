import { get } from 'lodash';

export const arrayToMap = <InputType, OutputType = InputType>(
  arr: InputType[],
  keyPath: string,
): { [id: string]: OutputType } =>
  arr.reduce((acc, item) => {
    const id = get(item, keyPath);
    return id ? { ...acc, [id]: item } : acc;
  }, {});
