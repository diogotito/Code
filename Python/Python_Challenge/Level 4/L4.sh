next-nothing () {

    nothing=$(curl -s \
      "http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=$1")

    echo "$nothing"
    nothing=$(echo "$nothing" | sed -r 's/.+ ([0-9]+)/\1/')
    next-nothing $nothing

}

next-nothing 12345 
