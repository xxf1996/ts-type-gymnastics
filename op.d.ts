/**
 * 将正整数转化为一个对应长度的数组；
 * 最大值取决于TS类型目前支持的最大递归层数；
 * @template N 正整数
 * @template Array 当前数组
 */
type NumberToArray<N extends number, Array extends unknown[] = []> =
  N extends Array['length']
    ? Array
    : NumberToArray<N, [...Array, 1]>;

/**
 * 正整数加法；
 * @template A 元素1
 * @template B 元素2
 */
type Add<A extends number, B extends number> = [...NumberToArray<A>, ...NumberToArray<B>]['length'];

type SubtractIR<A extends number, B extends number, Res extends number = 0> =
  A extends Add<B, Res>
    ? Res
    : SubtractIR<A, B, Add<Res, 1>>;
/**
 * 正整数减法；A不能小于B；A - B；
 * @template A 元素1
 * @template B 元素2
 */
type Subtract<A extends number, B extends number> = SubtractIR<A, B>;

type A = Add<10, 6>;
type B = Subtract<16, 1>;
