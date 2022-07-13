const isArrayOfNums = (arr: unknown[]) : boolean => {
    return arr.every(item => Number.isInteger(item));
};

const itemsInArray = (arr: unknown[], items: unknown[]): boolean => {
    return arr.every((item) => items.indexOf(item) !== -1);
  };

export {isArrayOfNums , itemsInArray};