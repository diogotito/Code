unit SnakeObject;

interface

const
  Width: integer = 76;
  Height: integer = 23;

type
  Point = record
    x, y: integer;
  end;

operator = (p1, p2 : Point) b : boolean;

type
  Direction = (Up, Down, Left, Right);

type
  Snake = object
    length: 1..100;
    head: Point;
    tail: array[1..100] of Point;
    CurrentDirection: Direction;
    procedure Update();
    procedure Draw();
    procedure Grow();
    procedure ChangeDirection(where: Direction);
    function IsCollidingWithBorder: boolean;
    function IsInsideBody(location: Point): boolean;
    function IsOverlappingWithHimself: boolean;
    function IsEating(location: Point): boolean;
  end;

function getPoint(x, y: integer): Point;
function new_snake(initial_x: integer; initial_y: integer): Snake;

procedure WriteAt(location: Point; character: string);

implementation

uses crt;

operator = (p1, p2 : Point) b : boolean;
Begin
	b := (p1.x = p2.x) and (p1.y = p2.y);
End;

function getPoint(x, y: integer): Point;
begin
  getPoint.x := x;
  getPoint.y := y;
end;

procedure WriteAt(location: Point; character: string);
begin
  GotoXY(location.x, location.y);
  Write(character);
end;

function new_snake(initial_x: integer; initial_y: integer): Snake;
var
  i: integer;
begin
  with new_snake do
  begin
    head.x := initial_x;
    head.y := initial_y;
    CurrentDirection := Right;
    length := 3;
    for i := 1 to length do
    begin
      tail[i].x := head.x - i;
      tail[i].y := head.y;
    end;
  end;
end;

procedure Snake.Update();
var
  i: integer;
begin
  for i := length downto 2 do
    tail[i] := tail[i - 1];
  tail[1] := head;
  case CurrentDirection of
    Up: Dec(head.y);
    Down: Inc(head.y);
    Left: Dec(head.x);
    Right: Inc(head.x);
  end;
end;

procedure Snake.Draw();
var
  i: integer;
begin
  textbackground(lightgreen);
  for i := 1 to length do
    WriteAt(tail[i], '#');
  WriteAt(head, 'O');
end;

procedure Snake.Grow();
begin
  Inc(length);
end;

procedure Snake.ChangeDirection(where: Direction);
begin
  if ((where = Up) and (CurrentDirection <> Down)) or
    ((where = Down) and (CurrentDirection <> Up)) or
    ((where = Left) and (CurrentDirection <> Right)) or
    ((where = Right) and (CurrentDirection <> Left)) then
    CurrentDirection := where;
end;

function Snake.IsCollidingWithBorder: boolean;
begin
   IsCollidingWithBorder :=
    (head.x > Width) or (head.x < 1) or (head.y > Height) or (head.y < 1);
end;

function Snake.IsInsideBody(location: Point): boolean;
Var i : Integer;
begin
	IsInsideBody := False;
	For i := 1 to length do begin
		If tail[i] = location then begin
			IsInsideBody := True;
			break;
		End;
	End;
end;

function Snake.IsOverlappingWithHimself: boolean;
begin
	IsOverlappingWithHimself := IsInsideBody(head);
end;

function Snake.IsEating(location: Point): boolean;
begin
	IsEating := (head = location);
end;

end.

