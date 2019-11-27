from typing import Any, Optional


def len(o: Any) -> int:
    ...


def min(x: int, y: str):
    ...


def named(*, named_parameter: int, **kw):
    ...


def tito_via_len(o: Any):
    return len(o)


def tito_via_min_left(o: Any):
    return min(o, "")


def tito_via_min_right(o: Any):
    return min(5, o)


def tito_via_named(o: Any):
    return named(named_parameter=o)


def tito_via_min_or_not(o: Any, b: bool):
    if b:
        return min(o, 5)
    else:
        return o


def tito_via_constructor(o: Any):
    return int(o)


def optional_scalar(parameter) -> Optional[int]:
    return 0


def tito_via_optional(o: Any):
    return optional_scalar(o)
