/**
 * 重复某个元素`E` `N`次的数组；
 * @template E 元素
 * @template N 重复次数
 */
type RepeatArray<E, N extends number, Array extends unknown[] = []> = 
  N extends Array['length']
    ? Array
    : RepeatArray<E, N, [...Array, E]>;

/**
 * 将正整数转化为一个对应长度的数组；
 * 最大值取决于TS类型目前支持的最大递归层数；
 * @template N 正整数
 * @template Array 当前数组
 */
type NumberToArray<N extends number> = RepeatArray<1, N>

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
type MultiplyIR<A extends number, B extends number> = RepeatArray<NumberToArray<A>, B>;
/** 将二维数组平展为一维数组 */
type FlatArray<Arr extends Array<unknown[]>, Res extends unknown[] = []> =
  Arr extends [infer E, ...(infer Other)]
    ? FlatArray<Other, [...Res, ...E]>
    : Res;
/** 
 * 正整数乘法；A/B目前只支持在45以内（跟TS支持的最大递归次数有关）；
 * @template A 元素1
 * @template B 元素2
 */
type Multiply<A extends number, B extends number> = FlatArray<MultiplyIR<A, B>>['length'];

type A = Add<10, 6>;
type B = Subtract<16, 1>;
type C = Multiply<44, 45>;
