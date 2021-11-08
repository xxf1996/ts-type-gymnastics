/**
 * 用泛型来推断（infer）可以避免丢失元素类型；
 * https://zhuanlan.zhihu.com/p/427309936
 */
type StringArray<First extends string, Other extends string[]> = [First, ...Other];

/**
 * 字符串连接操作
 */
export type Join<Arr extends string[], S extends string> = 
  Arr extends StringArray<infer First, infer Other>
    ? Other['length'] extends 1
      ? `${First}${S}${Other[0]}`
      : `${First}${S}${Join<Other, S>}`
    : '';

// export type Split<Str extends string, S extends string> =
//   Str extends `${}`

type A = Join<['asdffd', 'dfgf', 'ggdgg'], '/'>
