(* Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. *)

open Core
open OUnit2
open Ast
open Analysis
open Expression
open Statement
open Test
module StatementClass = Class
module Argument = Call.Argument

let ( !! ) concretes = List.map concretes ~f:(fun single -> Type.Parameter.Single single)

let value option = Option.value_exn option

let test_inferred_generic_base context =
  let assert_inferred_generic ~target source expected =
    let { ScratchProject.BuiltGlobalEnvironment.ast_environment; global_environment; _ } =
      ScratchProject.setup ~context ["test.py", source] |> ScratchProject.build_global_environment
    in
    let source =
      AstEnvironment.ReadOnly.get_source
        (AstEnvironment.read_only ast_environment)
        (Reference.create "test")
    in
    let source = Option.value_exn source in
    let { Source.statements; _ } = source in
    let target =
      let target = function
        | { Node.location; value = Statement.Class ({ StatementClass.name; _ } as definition) }
          when Reference.show (Node.value name) = target ->
            Some { Node.location; value = definition }
        | _ -> None
      in
      List.find_map ~f:target statements |> value |> Node.map ~f:ClassSummary.create
    in
    let resolution = GlobalResolution.create global_environment in
    let parse_annotation =
      GlobalResolution.parse_annotation ~validation:ValidatePrimitives resolution
    in
    assert_equal
      ~cmp:(List.equal Argument.equal)
      expected
      (Annotated.Bases.inferred_generic_base target ~parse_annotation)
  in
  assert_inferred_generic
    ~target:"test.C"
    {|
       _T = typing.TypeVar('_T')
       class C:
         pass
     |}
    [];
  assert_inferred_generic
    ~target:"test.C"
    {|
       _T = typing.TypeVar("_T")
       class List(typing.Generic[_T]):
         pass
       class C(List[_T]):
         pass
     |}
    [
      {
        Argument.name = None;
        value = Type.expression (Type.parametric "typing.Generic" !![Type.variable "test._T"]);
      };
    ];
  assert_inferred_generic
    ~target:"test.List"
    {|
       _T = TypeVar("_T")
       class Iterable(typing.Generic[_T]):
         pass
       class List(Iterable[_T], typing.Generic[_T]):
         pass
     |}
    [];
  assert_inferred_generic
    ~target:"test.Foo"
    {|
      _T1 = typing.TypeVar('_T1')
      _T2 = typing.TypeVar('_T2')
      class Foo(typing.Dict[_T1, _T2]): pass
    |}
    [
      {
        Argument.name = None;
        value =
          Type.expression
            (Type.parametric
               "typing.Generic"
               !![Type.variable "test._T1"; Type.variable "test._T2"]);
      };
    ];
  assert_inferred_generic
    ~target:"test.Foo"
    {|
      _T1 = typing.TypeVar('_T1')
      class Foo(typing.Dict[_T1, _T1]): pass
    |}
    [
      {
        Argument.name = None;
        value = Type.expression (Type.parametric "typing.Generic" !![Type.variable "test._T1"]);
      };
    ];
  assert_inferred_generic
    ~target:"test.Foo"
    {|
      Ts = pyre_extensions.ListVariadic("Ts")
      class Base(typing.Generic[Ts]): pass
      class Foo(Base[Ts]): pass
    |}
    [
      {
        Argument.name = None;
        value =
          Type.expression
            (Type.parametric
               "typing.Generic"
               [
                 Type.Parameter.Group
                   (Type.Variable.Variadic.List.self_reference
                      (Type.Variable.Variadic.List.create "test.Ts"));
               ]);
      };
    ];
  assert_inferred_generic
    ~target:"test.Foo"
    {|
      TParams = pyre_extensions.ParameterSpecification("TParams")
      class Base(typing.Generic[TParams]): pass
      class Foo(Base[TParams]): pass
    |}
    [
      {
        Argument.name = None;
        value =
          Type.expression
            (Type.parametric
               "typing.Generic"
               [
                 Type.Parameter.CallableParameters
                   (Type.Variable.Variadic.Parameters.self_reference
                      (Type.Variable.Variadic.Parameters.create "test.TParams"));
               ]);
      };
    ];
  ()


let () = "bases" >::: ["generic" >:: test_inferred_generic_base] |> Test.run
