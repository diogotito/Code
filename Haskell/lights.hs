import Control.Monad

type Cell = Bool
type Board = [[Cell]]

type Position = (Int, Int)


emptyBoard n = replicate n $ replicate n False


tap :: Board -> Position -> Board
tap board (r, c) = zipWith (\r' row ->
                              zipWith (\c' cell ->
                                         toggle (r', c') cell)
                              [0..] row)
                   [0..] board
  where
    toggle (r', c') cell
      | r' == r && abs (c' - c) <= 1 = not cell
      | c' == c && abs (r' - r) <= 1 = not cell
      | otherwise = cell
      

drawBoard :: Board -> String
drawBoard = (unlines .) . map . map $ (".#" !!) . fromEnum -- such readable

---------------------------------------------------------------------------
-- Interactive game                                                      --
---------------------------------------------------------------------------

gameLoop board = do
  putStrLn $ drawBoard board
  if all and board
    then putStrLn "Congratulations! You've turned all the lights on!"
    else do putStr ">>> "
            [c,r] <- map read . words <$> getLine :: IO [Int]
            gameLoop $ tap board (r,c)

main = gameLoop $ emptyBoard 4


---------------------------------------------------------------------------
-- Find all solutions                                                    --
---------------------------------------------------------------------------

allSolutions n size = filter (\xs -> length xs == n && doesItSolve size xs)
                      $ filterM (const [False, True])
                      $ liftM2 (,) [0..size-1] [0..size-1]

doesItSolve n moves = all and $ foldl tap (emptyBoard n) moves

drawSolution :: Int -> [Position] -> IO ()
drawSolution size moves = do
  forM_ [0..size-1] $ \r -> do
    forM_ [0..size-1] $ \c ->
      putChar $ if (r,c) `elem` moves
                then 'o'
                else '.'
    putStrLn ""
  putStrLn ""
  
  
  
