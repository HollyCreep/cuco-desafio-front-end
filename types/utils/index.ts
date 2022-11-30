/* -------------------------------------------------------------------------- */
export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
type PathImpl<T, K extends keyof T, D extends Prev[number] = 3> = [D] extends [
  never
]
  ? never
  : K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>, Prev[D]>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K], Prev[D]>}`
    : K
  : never

export type Path<T> = PathImpl<T, keyof T> | keyof T

export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
/* -------------------------------------------------------------------------- */

export type ValueOf<T> = T[keyof T]
