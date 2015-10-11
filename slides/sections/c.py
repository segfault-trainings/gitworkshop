#!/usr/bin/python

f = open( "sections.txt", "r" )

lines = f.readlines()
f.close( )

i = 1
f = None
for line in lines:
    line = line.strip( )
    print line
    tokens = line.split( ' ', 1 )
    if line.startswith( "slide" ):
        if f:
            f.close( )
        filename = ""
        if i < 10:
            filename = "0" + str(i)
        else:
            filename = str(i)
        filename += "-%s.tex"%tokens[1]
        i += 1
        if i < 6:
            continue

        filename = filename.replace( "/", "-" )
        filename = filename.replace( " ", "-" )
        f = open( filename, "w" )
        f.write( "\section{%s}\n\
\\begin{frame}[fragile]\n\
    \\slidetitle\n\
\\end{frame}\n\n"%tokens[1] );
    elif line.startswith( "subslide" ):
        if f:
            f.write( "\subsection{%s}\n\
\\begin{frame}[fragile]\n\
    \\subslidetitle\n\
\\end{frame}\n\n"%tokens[1] );
    elif line.startswith( "subsubslide" ):
        if f:
            f.write( "\subsubsection{%s}\n\
\\begin{frame}[fragile]\n\
    \\subsubslidetitle\n\
\\end{frame}\n\n"%tokens[1] );

if f:
    f.close( )
