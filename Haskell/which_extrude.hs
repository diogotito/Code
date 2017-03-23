{-
Objetivo: cortar uma lista em fatias de um dado comprimento

  > extrude 4 [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  [ [1 , 2 , 3 , 4 ],
    [5 , 6 , 7 , 8 ],
    [9 , 10, 11, 12],
    [13, 14, 15, 16] ]

-}


import Data.List

extrude :: Int -> [a] -> [[a]]
extrude width xs = unfoldr splitMaybe xs
  where
    splitMaybe [] = Nothing
    splitMaybe xs = Just $ splitAt width xs

----------------------------------------------------------------------

extrude' :: Int -> [a] -> [[a]]
extrude' width xs = helper [] xs
  where
    helper result [] = result
    helper result xs = let (part, rest) = splitAt width xs in
                         part : helper result rest
