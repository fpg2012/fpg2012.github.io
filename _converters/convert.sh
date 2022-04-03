#!/bin/bash

pandoc --toc -t html --filter pandoc-katex --filter pandocfilter-pygments.py
