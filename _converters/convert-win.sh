#!/bin/bash

pandoc --toc -t html --filter pandoc-katex.exe --filter pandocfilter-pygments.py
