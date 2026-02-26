import type { TechStack } from "./types";

export function renderCodeLine(line: string, activeTech: TechStack): React.ReactNode {
    if (!line) return '\u00A0';

    // Go syntax highlighting
    if (activeTech === "go") {
        if (line.includes('package') || line.includes('import') || line.includes('func')) {
            const keyword = line.match(/package|import|func/)?.[0];
            if (keyword) {
                const parts = line.split(keyword);
                return (
                    <>
                        {parts[0]}
                        <span className="text-purple-500 dark:text-purple-400">{keyword}</span>
                        {parts[1]}
                    </>
                );
            }
        }
        if (line.includes('"')) {
            const parts = line.split('"');
            return (
                <>
                    {parts[0]}
                    <span className="text-green-600 dark:text-green-400">"{parts[1]}"</span>
                    {parts[2] || ''}
                </>
            );
        }
        if (line.includes('Default') || line.includes('GET') || line.includes('Run')) {
            const method = line.match(/Default|GET|Run/)?.[0];
            if (method) {
                const parts = line.split(method);
                return (
                    <>
                        {parts[0]}
                        <span className="text-yellow-600 dark:text-yellow-400">{method}</span>
                        {parts[1]}
                    </>
                );
            }
        }
        if (line.includes('main') && line.includes('()')) {
            const parts = line.split('main');
            return (
                <>
                    {parts[0]}
                    <span className="text-blue-600 dark:text-blue-400">main</span>
                    {parts[1]}
                </>
            );
        }
    }

    // Docker syntax highlighting
    if (activeTech === "docker") {
        if (line.includes('FROM') || line.includes('WORKDIR') || line.includes('COPY') ||
            line.includes('RUN') || line.includes('CMD')) {
            const keyword = line.match(/FROM|WORKDIR|COPY|RUN|CMD/)?.[0];
            if (keyword) {
                const parts = line.split(keyword);
                return (
                    <>
                        {parts[0]}
                        <span className="text-blue-600 dark:text-blue-400">{keyword}</span>
                        {parts[1]}
                    </>
                );
            }
        }
        if (line.includes(' AS ')) {
            const parts = line.split(' AS ');
            return (
                <>
                    {parts[0]}
                    <span className="text-purple-500 dark:text-purple-400"> AS </span>
                    {parts[1]}
                </>
            );
        }
    }

    // Kubernetes YAML syntax highlighting
    if (activeTech === "k8s") {
        if (line.includes('apiVersion:') || line.includes('kind:') || line.includes('metadata:') ||
            line.includes('spec:') || line.includes('replicas:') || line.includes('selector:') ||
            line.includes('matchLabels:') || line.includes('template:') || line.includes('containers:') ||
            line.includes('labels:') || line.includes('ports:')) {
            const keyword = line.match(/apiVersion|kind|metadata|spec|replicas|selector|matchLabels|template|containers|labels|ports/)?.[0];
            if (keyword) {
                const parts = line.split(keyword + ':');
                return (
                    <>
                        {parts[0]}
                        <span className="text-purple-500 dark:text-purple-400">{keyword}:</span>
                        {parts[1] || ''}
                    </>
                );
            }
        }
        if (line.includes('name:') || line.includes('image:') || line.includes('containerPort:')) {
            const keyword = line.match(/name|image|containerPort/)?.[0];
            if (keyword) {
                const parts = line.split(keyword + ':');
                return (
                    <>
                        {parts[0]}
                        <span className="text-blue-600 dark:text-blue-400">{keyword}:</span>
                        <span className="text-green-600 dark:text-green-400">{parts[1] || ''}</span>
                    </>
                );
            }
        }
        if (line.includes('Deployment') || line.includes('app:')) {
            const keyword = line.match(/Deployment|app/)?.[0];
            if (keyword && line.includes('app:')) {
                const parts = line.split('app:');
                return (
                    <>
                        {parts[0]}
                        <span className="text-blue-600 dark:text-blue-400">app:</span>
                        <span className="text-green-600 dark:text-green-400">{parts[1]}</span>
                    </>
                );
            }
            if (keyword) {
                const parts = line.split(keyword);
                return (
                    <>
                        {parts[0]}
                        <span className="text-green-600 dark:text-green-400">{keyword}</span>
                        {parts[1]}
                    </>
                );
            }
        }
    }

    return line;
}
