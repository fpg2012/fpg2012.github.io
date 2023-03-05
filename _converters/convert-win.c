#include <stdlib.h>

int main() {
    int ret = system("pandoc --toc -t html --filter pandoc-katex.exe --filter pandocfilter-pygments.py");
    return ret;
}
