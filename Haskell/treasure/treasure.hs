import Data.List
import Data.Char
import Control.Monad
import Text.Printf

type Position = (Float, Float)

data Direction = N | E | W | S | NW | NE | SW | SE
  deriving (Eq, Read, Show)

pythagoras :: Position -> Float
pythagoras (x, y) = sqrt (x^2 + y^2)

walk :: Position -> (Int, Direction) -> Position
walk (x, y) (numSteps, direction) = 
  let
    distance = fromIntegral numSteps
    diagonal = distance * sqrt 2 / 2
  in
    case direction of
      N -> (x, y + distance)
      S -> (x, y - distance)
      E -> (x + distance, y)
      W -> (x - distance, y)
      NW -> (x - diagonal, y + diagonal)
      NE -> (x + diagonal, y + diagonal)
      SW -> (x - diagonal, y - diagonal)
      SE -> (x + diagonal, y - diagonal)


main = do
    input <- getContents

    let descriptions = map init $ init $ lines input

    forM_ (zip [1..] descriptions) $ \(i, description) -> do
        let steps = map readStep $ split ',' description
            treasure@(x, y) = foldl walk (0, 0) steps
            dist = pythagoras treasure

        putStrLn $ "Map #" ++ show i
        printf "The treasure is located at (%-.3f,%-.3f).\n" (r x) (r y)
        printf "The distance to the treasure is %-.3f.\n" (r dist)
        putStrLn ""

r :: Float -> Float
-- r x = (fromIntegral . round $ x * 1000) / 1000.0
-- r x = (fromIntegral . floor $ x * 1000) / 1000.0
-- r x = (fromIntegral . ceiling $ x * 1000) / 1000.0
-- r x = (fromIntegral . truncate $ x * 1000) / 1000.0
-- ^^^^ none of these work :( ^^^^ --
r = id
    
readStep :: String -> (Int, Direction)
readStep subs = let (numSteps, direction) = span isDigit subs
                 in (read numSteps, read direction) 


split :: Eq a => a -> [a] -> [[a]]
split char str = case break (==char) str of
                   (rest,     []) -> rest : []
                   (atom, _:rest) -> atom : split char rest

