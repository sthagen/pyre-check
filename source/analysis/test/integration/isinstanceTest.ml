(*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *)

open OUnit2
open IntegrationTest

let test_check_isinstance context =
  let assert_type_errors = assert_type_errors ~context in
  let assert_default_type_errors = assert_default_type_errors ~context in
  let assert_strict_type_errors = assert_strict_type_errors ~context in
  assert_default_type_errors
    {|
      def f(x) -> int:
        class Stub:
          ...
        class Actual:
          def f(self) -> int:
            return 0
        if isinstance(x, Stub):
          return -1
        elif isinstance(x, Actual):
          return 0
        else:
          return 1
    |}
    [];
  assert_strict_type_errors
    {|
      isinstance(1, NonexistentClass)
    |}
    ["Unbound name [10]: Name `NonexistentClass` is used but not defined in the current scope."];
  assert_type_errors
    {|
      def foo(x: int) -> None:
        if isinstance(x, str):
          reveal_type(x)
        reveal_type(x)
    |}
    ["Revealed type [-1]: Revealed type for `x` is `int`."];
  assert_type_errors
    {|
      def foo(x: int) -> None:
        if not isinstance(x, int):
          reveal_type(x)
        reveal_type(x)
    |}
    ["Revealed type [-1]: Revealed type for `x` is `int`."];
  assert_strict_type_errors
    {|
      def foo(x: int) -> None:
        if isinstance(x, NonexistentClass):
          reveal_type(x)
        reveal_type(x)
    |}
    [
      "Unbound name [10]: Name `NonexistentClass` is used but not defined in the current scope.";
      "Revealed type [-1]: Revealed type for `x` is `int`.";
      "Revealed type [-1]: Revealed type for `x` is `int`.";
    ];
  assert_type_errors
    {|
      import typing
      def foo(x: typing.Union[int, typing.List[int]]) -> None:
        if isinstance(x, list):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is `typing.List[int]`.";
      "Revealed type [-1]: Revealed type for `x` is `int`.";
    ];
  assert_type_errors
    {|
      import typing
      def foo(x: typing.Union[int, typing.List[str], str, typing.List[int]]) -> None:
        if isinstance(x, list):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is "
      ^ "`typing.Union[typing.List[int], typing.List[str]]`.";
      "Revealed type [-1]: Revealed type for `x` is `typing.Union[int, str]`.";
    ];
  assert_type_errors
    {|
      import typing
      def foo(x: typing.Union[int, typing.Set[str], str, typing.Set[int]]) -> None:
        if isinstance(x, set):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is "
      ^ "`typing.Union[typing.Set[int], typing.Set[str]]`.";
      "Revealed type [-1]: Revealed type for `x` is `typing.Union[int, str]`.";
    ];
  assert_type_errors
    {|
      import typing
      class CommonBase(): pass
      class ChildA(CommonBase): pass
      class ChildB(CommonBase): pass
      class Unrelated(): pass
      def foo(x: typing.Union[int, ChildA, ChildB, Unrelated]) -> None:
        if isinstance(x, CommonBase):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is `typing.Union[ChildA, ChildB]`.";
      "Revealed type [-1]: Revealed type for `x` is `typing.Union[Unrelated, int]`.";
    ];
  assert_type_errors
    {|
      import typing
      def foo(x: typing.Union[int, float, bool]) -> None:
        if isinstance(x, str):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    ["Revealed type [-1]: Revealed type for `x` is `typing.Union[bool, float, int]`."];
  assert_type_errors "isinstance(1, (int, str))" [];
  assert_type_errors "isinstance(1, (int, (int, str)))" [];
  assert_type_errors
    "isinstance(str, '')"
    [
      "Incompatible parameter type [6]: Expected `typing.Union[typing.Type[typing.Any], \
       typing.Tuple[typing.Type[typing.Any], ...]]` for 2nd positional only parameter to call \
       `isinstance` but got `str`.";
    ];
  assert_type_errors
    "isinstance(1, (int, ('', str)))"
    [
      "Incompatible parameter type [6]: Expected `typing.Union[typing.Type[typing.Any], \
       typing.Tuple[typing.Type[typing.Any], ...]]` for 2nd positional only parameter to call \
       `isinstance` but got `str`.";
    ];
  assert_type_errors
    {|
      from typing import Type, Union
      def foo(x: object, types: Union[Type[int], Type[str]]) -> None:
        isinstance(x, types)
    |}
    [];
  assert_type_errors
    {|
      from typing import Type, Union, Tuple
      def foo(x: object, types: Tuple[Type[int], ...]) -> None:
        isinstance(x, types)
    |}
    [];
  assert_type_errors
    {|
      from typing import Type, Union, Tuple
      def foo(x: object, types: Union[Tuple[Type[int], ...], Type[object]]) -> None:
        isinstance(x, types)
    |}
    [];
  assert_type_errors
    {|
      def foo(x: int, y: int) -> None:
        isinstance(x, y)
    |}
    [
      "Incompatible parameter type [6]: Expected `typing.Union[typing.Type[typing.Any], \
       typing.Tuple[typing.Type[typing.Any], ...]]` for 2nd positional only parameter to call \
       `isinstance` but got `int`.";
    ];
  assert_type_errors
    {|
      from typing import List, Dict
      def foo(x: int) -> None:
        isinstance(x, List)
        isinstance(x, Dict)
        Y = Dict
        isinstance(x, Y)
    |}
    [];
  assert_type_errors
    {|
      class A:
        pass
      class B:
        pass
      def foo(x:A) -> None:
        if (isinstance(x, B)):
          pass
        reveal_type(x)
    |}
    ["Revealed type [-1]: Revealed type for `x` is `A`."];
  assert_type_errors
    {|
      class A:
        pass
      class B:
        pass
      def foo(x:A) -> None:
        if (isinstance(x, B)):
          reveal_type(x)
    |}
    [];
  assert_type_errors
    {|
      class A:
        pass
      class B(A):
        pass
      def foo(x:A) -> None:
        if (isinstance(x, B)):
          reveal_type(x)
    |}
    ["Revealed type [-1]: Revealed type for `x` is `B`."];
  assert_type_errors
    {|
      from typing import Tuple, Union
      X = Union[int, Tuple["X", ...]]

      def foo() -> None:
        x: X
        if isinstance(x, tuple):
          reveal_type(x)
        else:
          reveal_type(x)
     |}
    [
      "Revealed type [-1]: Revealed type for `x` is `typing.Tuple[test.X (resolves to Union[int, \
       typing.Tuple[X, ...]]), ...]`.";
      "Revealed type [-1]: Revealed type for `x` is `int`.";
    ];
  assert_type_errors
    {|
      from typing import Tuple, Union
      X = Union[int, Tuple["X", "X"]]

      def foo() -> None:
        x: X
        if not isinstance(x, tuple):
          reveal_type(x)
        else:
          reveal_type(x)
          reveal_type(x[0])
     |}
    [
      "Revealed type [-1]: Revealed type for `x` is `int`.";
      "Revealed type [-1]: Revealed type for `x` is `Tuple[test.X (resolves to Union[Tuple[X, X], \
       int]), test.X (resolves to Union[Tuple[X, X], int])]`.";
      "Revealed type [-1]: Revealed type for `x[0]` is `test.X (resolves to Union[Tuple[X, X], \
       int])`.";
    ];
  (* Ternary operator with isinstance. *)
  assert_type_errors
    {|
      from typing import Tuple, Union
      X = Union[int, Tuple["X", "X"]]

      def first_int(x: X) -> int:
        return x if isinstance(x, int) else first_int(x[1])
    |}
    [];
  (* TODO(T80894007): `isinstance` doesn't work correctly with `and`. *)
  assert_type_errors
    {|
      from typing import Tuple, Union
      NonRecursiveUnion = Union[int, Tuple[int, Union[int, Tuple[int, int]]]]

      def foo(x: NonRecursiveUnion) -> None:
        if isinstance(x, tuple) and not isinstance(x[1], tuple):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is `Tuple[int, Union[Tuple[int, int], int]]`.";
      "Revealed type [-1]: Revealed type for `x` is `Union[Tuple[int, Union[Tuple[int, int], \
       int]], int]`.";
    ];
  assert_type_errors
    {|
      from typing import Tuple, Union
      X = Union[int, Tuple[int, "X"]]

      def foo(x: X) -> None:
        if isinstance(x, tuple) and not isinstance(x[1], tuple):
          reveal_type(x)
        else:
          reveal_type(x)
    |}
    [
      "Revealed type [-1]: Revealed type for `x` is `Tuple[int, test.X (resolves to \
       Union[Tuple[int, X], int])]`.";
      "Revealed type [-1]: Revealed type for `x` is `Union[Tuple[int, test.X (resolves to \
       Union[Tuple[int, X], int])], int]`.";
    ];
  ()


let () = "isinstance" >::: ["check_isinstance" >:: test_check_isinstance] |> Test.run
