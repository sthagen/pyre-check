# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

import dataclasses
import json
import logging
from pathlib import Path
from typing import Optional, List, Dict, Iterable, Sequence

import tabulate
from typing_extensions import TypedDict

from ... import commands, log
from . import server_connection


LOG: logging.Logger = logging.getLogger(__name__)


class _ServerConfigurationJSONSchema(TypedDict):
    global_root: str


class _ServerInfoJSONSchema(TypedDict):
    pid: int
    version: str
    configuration: _ServerConfigurationJSONSchema


class InvalidServerResponse(Exception):
    pass


@dataclasses.dataclass(frozen=True)
class RunningServerStatus:
    pid: int
    version: str
    global_root: str
    local_root: Optional[str] = None

    @staticmethod
    def from_json(input_json: Dict[str, object]) -> "RunningServerStatus":
        pid = input_json.get("pid", None)
        if not isinstance(pid, int):
            raise InvalidServerResponse(f"Expect `pid` to be an int but got {pid}")
        version = input_json.get("version", None)
        if not isinstance(version, str):
            raise InvalidServerResponse(
                f"Expect `version` to be a string but got {version}"
            )

        configuration = input_json.get("configuration", None)
        if not isinstance(configuration, dict):
            raise InvalidServerResponse(
                f"Expect `configuration` to be a dict but got {configuration}"
            )
        global_root = configuration.get("global_root", None)
        if not isinstance(global_root, str):
            raise InvalidServerResponse(
                f"Expect `global_root` to be a string but got {global_root}"
            )
        local_root = configuration.get("local_root", None)
        if local_root is not None and not isinstance(local_root, str):
            raise InvalidServerResponse(
                f"Expected `local_root` to be a string but got {local_root}"
            )
        return RunningServerStatus(
            pid=pid,
            version=version,
            global_root=global_root,
            local_root=local_root,
        )

    @staticmethod
    def from_server_response(response: str) -> "RunningServerStatus":
        try:
            response_json = json.loads(response)
            if (
                not isinstance(response_json, list)
                or len(response_json) < 2
                or response_json[0] != "Info"
                or not isinstance(response_json[1], dict)
            ):
                message = f"Unexpected JSON response: {response_json}"
                raise InvalidServerResponse(message)
            return RunningServerStatus.from_json(response_json[1])
        except json.JSONDecodeError as error:
            message = f"Cannot parse response as JSON: {error}"
            raise InvalidServerResponse(message) from error


@dataclasses.dataclass(frozen=True)
class DefunctServerStatus:
    socket_path: str


@dataclasses.dataclass(frozen=True)
class AllServerStatus:
    running: List[RunningServerStatus] = dataclasses.field(default_factory=list)
    defunct: List[DefunctServerStatus] = dataclasses.field(default_factory=list)


def _get_running_server_status(socket_path: Path) -> Optional[RunningServerStatus]:
    try:
        with server_connection.connect_in_text_mode(socket_path) as (
            input_channel,
            output_channel,
        ):
            output_channel.write('["GetInfo"]\n')
            return RunningServerStatus.from_server_response(input_channel.readline())
    except server_connection.ConnectionFailure:
        return None


def _print_running_server_status(running_status: Sequence[RunningServerStatus]) -> None:
    if len(running_status) == 0:
        log.stdout.write("No server is currently running.\n")
    else:
        log.stdout.write("Running Servers:\n\n")
        log.stdout.write(
            tabulate.tabulate(
                [
                    [
                        status.pid,
                        status.global_root,
                        status.local_root or "",
                        status.version,
                    ]
                    for status in running_status
                ],
                headers=[
                    "PID",
                    "Global Root",
                    "Local Root",
                    "Version",
                ],
            ),
        )
        log.stdout.write("\n")
    log.stdout.write("\n")


def _print_defunct_server_status(defunct_status: Sequence[DefunctServerStatus]) -> None:
    defunct_count = len(defunct_status)
    if defunct_count > 0:
        log.stdout.write(f"Found {defunct_count} defunct server at:\n")
        for status in defunct_status:
            log.stdout.write(f" {status.socket_path}\n")
        log.stdout.write("\n")


def _print_server_status(server_status: AllServerStatus) -> None:
    _print_running_server_status(server_status.running)
    _print_defunct_server_status(server_status.defunct)


def find_all_servers(socket_paths: Iterable[Path]) -> AllServerStatus:
    running_servers = []
    defunct_servers = []

    for socket_path in socket_paths:
        running_server_status = _get_running_server_status(socket_path)
        if running_server_status is not None:
            running_servers.append(running_server_status)
        else:
            defunct_servers.append(DefunctServerStatus(str(socket_path)))

    return AllServerStatus(running_servers, defunct_servers)


def find_all_servers_under(socket_root: Path) -> AllServerStatus:
    # We exploit the fact that all socket files generated by the Pyre server
    # will be named as `pyre_server_{32-hexdigit MD5 hash}.sock`.
    md5_hash_pattern = "[0-9a-f]" * 32
    return find_all_servers(socket_root.glob(f"pyre_server_{md5_hash_pattern}.sock"))


def run_list() -> commands.ExitCode:
    try:
        server_status = find_all_servers_under(
            server_connection.get_default_socket_root()
        )
        _print_server_status(server_status)
        return commands.ExitCode.SUCCESS
    except Exception as error:
        raise commands.ClientException(
            f"Exception occured during server listing: {error}"
        ) from error
