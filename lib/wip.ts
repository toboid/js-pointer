// function get<T>(obj: T, pointer: keyof T) {
//   return obj;
// }

function get<T>(obj: T, pointer: Pointer<T>) {
  return obj;
}

const obj = {
  one: { three: 3 },
  two: '2',
  four: [4, 5],
  five: [{ a: 1 }, { a: 2 }],
};

get(obj, 'one/three');
get(obj, '');
get(obj, '#');
get(obj, '#/');
get(obj, '#/one');
get(obj, '#/four/0');
get(obj, 'five/0/a');

type Values<T> = T[keyof T];
type Keys<T> = keyof T;

type vals = Values<typeof obj>;
type keys = Keys<typeof obj>;

type OptionalPrefix = '' | '#' | '/' | '#/';

type MakeStr<Prop, Value> = Prop extends string
  ?
      | `${Prop}`
      | (Value extends Record<string, unknown>
          ? `${Prop}/${Iterate<Value>}`
          : Value extends Array<infer ArrayOf>
          ?
              | `${Prop}/${number}`
              | (ArrayOf extends Record<string, unknown>
                  ? `${Prop}/${number}/${Iterate<ArrayOf>}`
                  : never)
          : never)
  : never;

type Iterate<Obj> = Values<{
  [Prop in keyof Obj]: MakeStr<Prop, Obj[Prop]>;
}>;

type i = Iterate<typeof obj>;

type Pointer<T> = OptionalPrefix | `${OptionalPrefix}${Iterate<T>}`;

type p = Pointer<typeof obj>;
