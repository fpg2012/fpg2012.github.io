#!/bin/bash

pandoc -t html --filter pandoc-katex --filter pandocfilter-pygments.py
