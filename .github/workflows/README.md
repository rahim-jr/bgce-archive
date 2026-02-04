# GitHub Actions Workflows

## 📋 Overview

This directory contains CI/CD workflows for the BGCE Archive project.

## 🔄 Workflows

### `build-and-push.yml` - Docker Image Build & Push

**Triggers:**
- Push to `master` branch
- New tags (e.g., `v1.0.0`)
- Pull requests (build only, no push)

**What it does:**
1. **Detects changes** - Only builds services that have changed
2. **Type checks** - Validates TypeScript in archive-admin (warning only)
3. **Builds Docker images** - Multi-platform (amd64 + arm64)
4. **Pushes to GHCR** - GitHub Container Registry
5. **Updates deployment** - Commits new image tags to infra repo

**Services:**
- `archive-admin` - Vue.js admin panel
- `archive-client` - Next.js public site
- `cortex` - Go backend (categories)
- `postal` - Go backend (posts)

## 🚀 Usage

### Trigger a Build

```bash
# Build changed services
git add .
git commit -m "Update service"
git push origin master

# Build all services with a release
git tag v1.0.0
git push origin v1.0.0
```

### View Build Status

- Go to **Actions** tab in GitHub
- Click on the latest workflow run
- View logs for each service

### Pull Built Images

```bash
# Latest from master
docker pull ghcr.io/nesohq/bgce-archive/cortex:latest

# Specific commit
docker pull ghcr.io/nesohq/bgce-archive/cortex:master-abc1234

# Specific version
docker pull ghcr.io/nesohq/bgce-archive/cortex:v1.0.0
```

## 🔧 Configuration

### Required Secrets

| Secret | Description | Required |
|--------|-------------|----------|
| `GITHUB_TOKEN` | Auto-provided by GitHub | ✅ Yes |
| `INFRA_REPO_TOKEN` | Personal access token for infra repo | ⚠️ Optional |
| `DOCKERHUB_USERNAME` | Docker Hub username | ❌ No (commented out) |
| `DOCKERHUB_TOKEN` | Docker Hub access token | ❌ No (commented out) |

### Add Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the secret name and value

### Enable Docker Hub (Optional)

Uncomment these lines in `build-and-push.yml`:

```yaml
- name: Log in to Docker Hub
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY_DOCKERHUB }}
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

And update the metadata step to include Docker Hub:

```yaml
- name: Extract metadata
  id: meta
  uses: docker/metadata-action@v5
  with:
    images: |
      ${{ env.REGISTRY_GHCR }}/${{ env.IMAGE_PREFIX }}/${{ matrix.service }}
      ${{ env.REGISTRY_DOCKERHUB }}/${{ env.IMAGE_PREFIX }}/${{ matrix.service }}
```

## 🐛 Troubleshooting

### Build Fails

**Check logs:**
1. Go to Actions tab
2. Click on failed workflow
3. Expand the failed step

**Common issues:**
- **Type errors**: Fix TypeScript errors in the code
- **Missing dependencies**: Update package.json/go.mod
- **Docker build fails**: Check Dockerfile syntax

### Image Not Found

**Verify image exists:**
```bash
# List all images
gh api /user/packages/container/bgce-archive%2Fcortex/versions

# Or check on GitHub
# Go to: https://github.com/orgs/nesohq/packages
```

**Make package public:**
1. Go to package settings
2. Change visibility to **Public**

### Slow Builds

**Enable build cache:**
- Already enabled with `cache-from: type=gha`
- First build is slow, subsequent builds are faster

**Reduce build context:**
- Add files to `.dockerignore`
- Remove unnecessary files from Docker context

## 📊 Build Matrix

The workflow uses a matrix strategy to build all services in parallel:

```yaml
strategy:
  matrix:
    service: [archive-admin, archive-client, cortex, postal]
```

This means:
- ✅ Faster builds (parallel execution)
- ✅ Independent failures (one service can fail without affecting others)
- ✅ Better resource utilization

## 🏷️ Image Tagging Strategy

| Event | Tags Created |
|-------|--------------|
| Push to master | `latest`, `master-<sha>` |
| Push to branch | `<branch>-<sha>` |
| Tag `v1.2.3` | `v1.2.3`, `1.2`, `1`, `latest` |
| Pull request | Build only, no push |

## 📈 Best Practices

1. **Test locally first**
   ```bash
   docker build -t test:local ./cortex
   docker run test:local
   ```

2. **Use semantic versioning**
   ```bash
   git tag v1.0.0  # Major.Minor.Patch
   ```

3. **Keep Dockerfiles simple**
   - Use multi-stage builds
   - Minimize layers
   - Use .dockerignore

4. **Monitor build times**
   - Check Actions tab for slow builds
   - Optimize Dockerfiles if needed

5. **Clean up old images**
   - Set retention policies in package settings
   - Delete unused tags manually

## 🔗 Related Documentation

- [Docker Guide](../../DOCKER.md)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GHCR Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
