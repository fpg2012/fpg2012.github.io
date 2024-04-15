#include <stdlib.h>

char *const argv[] = {
 "--toc", "-t", "html", "--filter", "pandoc-katex", "--filter", "pandocfilter-pygments.py", NULL
};

char *envp[] = {
 NULL
};

int main() {
    int ret = execve("/usr/bin/pandoc", argv, envp);
    return ret;
}
