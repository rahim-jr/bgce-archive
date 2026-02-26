import type { CodeExamples } from "./types";

export const codeExamples: CodeExamples = {
    go: {
        filename: "server.go",
        lines: [
            'package main',
            '',
            'import (',
            '    "net/http"',
            '    "github.com/gin-gonic/gin"',
            ')',
            '',
            'func main() {',
            '    r := gin.Default()',
            '    r.GET("/api/v1", handler)',
            '    r.Run(":8080")',
            '}',
        ]
    },
    docker: {
        filename: "Dockerfile",
        lines: [
            'FROM golang:1.21-alpine AS builder',
            '',
            'WORKDIR /app',
            'COPY go.* ./',
            'RUN go mod download',
            '',
            'COPY . .',
            'RUN go build -o server .',
            '',
            'FROM alpine:latest',
            'COPY --from=builder /app/server .',
            'CMD ["./server"]',
        ]
    },
    k8s: {
        filename: "deployment.yaml",
        lines: [
            'apiVersion: apps/v1',
            'kind: Deployment',
            'metadata:',
            '  name: api-server',
            'spec:',
            '  replicas: 3',
            '  selector:',
            '    matchLabels:',
            '      app: api',
            '  template:',
            '    metadata:',
            '      labels:',
            '        app: api',
            '    spec:',
            '      containers:',
            '        - name: server',
            '          image: api:latest',
            '          ports:',
            '            - containerPort: 8080',
        ]
    }
};
