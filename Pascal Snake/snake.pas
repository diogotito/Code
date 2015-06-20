Program SnakeGame;
Uses crt, SnakeObject;

Var
	player : Snake;
	food : Point;

Function RandomFoodPosition : Point;
Begin
	Repeat
		RandomFoodPosition.x := Random(Width-1)+1;
		RandomFoodPosition.y := Random(Height-1)+1;
	Until not player.IsInsideBody(RandomFoodPosition);
End;

Procedure HandleKeyPress (pressedKey : Char);
Begin
	Case pressedKey of
		'w', 'H': player.ChangeDirection(Up);
		'a', 'K': player.ChangeDirection(Left);
		's', 'P': player.ChangeDirection(Down);
		'd', 'M': player.ChangeDirection(Right);
		'p': readKey;
	End;
End;

Procedure DrawGameField;
Begin
	textbackground(lightgray);
	clrscr;
	window(3, 2, 78, 24);
	textbackground(black);
	clrscr;
End;

Function TryAgain : Boolean;
Begin
	Window(16, 8, 63, 16);
	textbackground(lightred);
	clrscr;
	WriteLn;
	WriteLn('                Oops... Perdeu!');
	WriteLn('  Conseguiu atingir um tamanho de ', player.length, ' unidades!');
	WriteLn;
	WriteLn('         Gostaria de tentar de novo? ');
	WriteLn('                 [N] => Não          ');
	WriteLn('        <Qualquer outra tecla> => Sim');
	WriteLn;
	Write('-----------------------------------------------');
	TryAgain := UpCase(ReadKey) <> 'N';
End;

Function IsAlive : Boolean;
Begin
	IsAlive :=
		(not player.IsCollidingWithBorder)
    and (not player.IsOverlappingWithHimself);
End;


Begin
	Randomize;
	Repeat
		player := new_snake(40,12);
		food := randomFoodPosition;
		DrawGameField;

		{ GAME LOOP }
		While IsAlive do begin
			textbackground(black);
			ClrScr;
			If KeyPressed then
				HandleKeyPress(ReadKey);
			
			player.update;
			If player.isEating(food) then begin
				player.Grow;
				food := randomFoodPosition;
			End;

			player.draw;
			textbackground(lightblue);
			WriteAt(food, '*');

			delay(50);
		End;
	Until not TryAgain;
End.
