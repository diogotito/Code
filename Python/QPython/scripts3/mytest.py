def test(function):
    print("Testing", function.__name__, "...", end="")
    try:
        function()
    except Exception:
        print("FAIL!")
    else:
        print("PASS...")

@test
def gonna_pass():
    pass

@test
def gonna_fail():
    raise Exception


