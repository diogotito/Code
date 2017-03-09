import Data.List
import Data.Char
import Control.Category

type Position = (Float, Float)

data Direction = N | E | W | S | NW | NE | SW | SE
  deriving (Eq, Read, Show)

distBetween :: Position -> Position -> Float
distBetween (x, y) (x', y') = sqrt $ (x'-x)^2 + (y'-y)^2

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
    
    -- De baixo para cima

    -- steps <- return . map (map readStep)
    --                 . map (split ',')
    --                 . map init
    --                 . init
    --                 . lines
    --                 =<< readFile "steps.txt"


    -- De cima para baixo
    
    steps <- (readFile "steps.txt" >>=)   -- Lê os conteúdos deste ficheiro
                 $ lines                  -- divide em linhas
               >>> init                   -- retira a última (que diz END)
               >>> map init               -- retira o "." no fim de cada linha
               >>> map (split ',')        -- fatia cada linha pelas vírgulas
               >>> map (map readStep)     -- transforma cada fatia num "passo"
               >>> return                 -- embrulha numa IO Action

    print $ map (foldl walk (0, 0)) steps

    
readStep :: String -> (Int, Direction)
readStep subs = let (numSteps, direction) = span isDigit subs
                 in (read numSteps, read direction) 


split :: Eq a => a -> [a] -> [[a]]
split char str = case break (==char) str of
                   (rest,     []) -> rest : []
                   (atom, _:rest) -> atom : split char rest
