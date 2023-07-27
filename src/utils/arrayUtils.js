/**
 * returns array without duplicates
 * @template K
 * @param {K[]} arr 
 * @param {keyof K} key 
 * @returns 
 */
export const removeDuplicates = (arr, key) => [...new Map(arr.map((e) => [e[key], e])).values()]