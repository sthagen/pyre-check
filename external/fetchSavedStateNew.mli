(*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *)

val fetch : bucket:string -> path:string -> target:PyrePath.t -> unit -> unit Lwt.t
