import Control.Monad

numeros :: [Int]
numeros = [1,5,9,2,6,5]

main = do
  filtrados <- flip filterM numeros $
    \n -> do putStrLn $ "Gostas do numero " ++ show n ++ "?"
             resposta <- getLine
             case resposta of
               "Sim" -> return True
               "sim" -> return True
               _     -> return False
               
  putStrLn "------------------------------"
  putStrLn "Resultado:"
  print filtrados
