#qpy:console
import pip

print "Input the name of the package to install with pip:" 
pkgname = raw_input("--> ")

if pkgname:
    pip.main(["install", pkgname])