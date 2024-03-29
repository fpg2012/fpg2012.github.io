#!/usr/bin/env python

"""
Pandoc filter to pass all code blocks through pygments highlighter.
"""

from pandocfilters import toJSONFilter, RawBlock
from pygments import highlight
from pygments.lexers import (get_lexer_by_name, TextLexer)
from pygments.formatters import get_formatter_by_name

def pygmentize(key, value, format, meta):
  if key == 'CodeBlock':
    [[ident, classes, keyvals], code] = value
    lexer = TextLexer() 
    try:
      lexer = get_lexer_by_name(classes[0])
    except:
      pass
    return [RawBlock(format, highlight(code, lexer, get_formatter_by_name(format)))]

if __name__ == "__main__":
  toJSONFilter(pygmentize)
