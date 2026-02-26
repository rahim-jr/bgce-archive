// Types for Welcome Section components
export type TechStack = "go" | "docker" | "k8s";

export interface CodeExample {
    filename: string;
    lines: string[];
}

export interface CodeExamples {
    go: CodeExample;
    docker: CodeExample;
    k8s: CodeExample;
}
