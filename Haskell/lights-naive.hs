import Data.List
import Control.Monad

type Cell = Bool
type Board = [[Cell]]

extrude :: Int -> [a] -> [[a]]
extrude width xs = unfoldr splitMaybe xs
  where
    splitMaybe [] = Nothing
    splitMaybe xs = Just $ splitAt width xs

allMoves :: Int -> Int -> Board
allMoves numMoves numCells = filter ((==numMoves) . sum . map fromEnum) $
                               replicateM numCells [False, True]

moveCombinations :: Int -> Int -> [Board]
moveCombinations moves boardSize = map (extrude boardSize) $
                                     allMoves moves (boardSize*boardSize)

drawBoard :: Board -> String
drawBoard = (unlines .) . map . map $ (".#" !!) . fromEnum -- such readable

mapBoardCell :: ((Int,Int,Cell) -> Board -> Cell) -> Board -> Board
mapBoardCell f board = zipWith g [1..] board
  where
    g r row = zipWith h [1..] row
      where
        h c cell = f (r,c,cell) board

changeCell :: (Int,Int,Cell) -> Board -> Cell
changeCell (r, c, value) board = foldr toggleFor value [ (r, c)
                                                       , (r+1, c)
                                                       , (r-1, c)
                                                       , (r, c+1)
                                                       , (r, c-1)
                                                       ]
  where
    toggleFor (r, c) value
      | r < 0 || r >= length board = value
      | c < 0 || c >= length board = value
      | board !! r !! c = not value
      | otherwise = value

main = do
  let sampleBoard = moveCombinations 6 4 !! 123
  putStrLn . drawBoard $ sampleBoard
  putStrLn . drawBoard $ mapBoardCell changeCell sampleBoard
  putStrLn . drawBoard $ mapBoardCell (\(_,_,cell) _ -> not cell) sampleBoard
