export const getLanguageFromFile = (fileName) => {
    if (!fileName) return "plaintext"; // Default if no file is selected

    const extension = fileName.split(".").pop().toLowerCase(); // Get file extension

    const languageMap = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        json: "json",
        html: "html",
        css: "css",
        scss: "scss",
        md: "markdown",
        txt: "plaintext",
        py: "python",
        java: "java",
        c: "c",
        cpp: "cpp",
        cs: "csharp",
        php: "php",
        rb: "ruby",
        go: "go",
        swift: "swift",
        kt: "kotlin",
        rs: "rust",
        sh: "shell",
        yaml: "yaml",
        xml: "xml"
    };

    return languageMap[extension] || "plaintext"; // Default to plaintext if unknown
};
