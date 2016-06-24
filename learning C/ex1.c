#include <stdio.h>

int main(int argc, char *argv[])
{
	puts("Hello world.");
	
	fputs("Hello world.\n", stdout);
	
	fputc('H', stdout);
	fputc('e', stdout);
	fputc('l', stdout);
	fputc('l', stdout);
	fputc('o', stdout);
	fputc(' ', stdout);
	fputc('w', stdout);
	fputc('o', stdout);
	fputc('r', stdout);
	fputc('l', stdout);
	fputc('d', stdout);
	fputc('.', stdout);
	putchar('\n');

}
