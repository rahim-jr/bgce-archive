# Redis Optimization - Quick Reference Card

## 🚀 What Changed?

Redis connection pooling optimized to eliminate 450ms latency:
- **Pool size increased**: 10 → 50 (read) / 20 (write)
- **Operation timeouts added**: 100ms (GET) / 200ms (SET)
- **DNS caching enabled**: Eliminates DNS lookup overhead
- **Aggressive timeouts**: 2s for all socket operations

## 📊 Expected Results

| Metric | Before | After |
|--------|--------|-------|
| Avg Latency | 450ms | <5ms |
| P99 Latency | >500ms | <10ms |
| Throughput | Low | 90x higher |

## 🔧 Configuration

### No Changes Required!

Uses existing environment variables:
```bash
READ_REDIS_URL=redis://redis-archive.default.svc.cluster.local:6379
WRITE_REDIS_URL=redis://redis-archive.default.svc.cluster.local:6379
ENABLE_REDIS_TLS_MODE=false
```

## 🧪 Testing

### Quick Health Check
```bash
# Check Redis latency
redis-cli --latency

# Should show: min: 0, max: 2, avg: 0.5 (ms)
```

### Monitor Connections
```bash
# Watch connection count
watch -n 1 'redis-cli INFO clients | grep connected_clients'

# Should see: connected_clients:15-30 (normal load)
```

### Load Test
```bash
# Cortex
ab -n 1000 -c 50 http://localhost:8080/api/v1/categories

# Postal
ab -n 1000 -c 50 http://localhost:8081/api/v1/posts
```

## 🎯 Key Metrics to Monitor

### ✅ Good
- Average latency: <5ms
- P99 latency: <10ms
- Cache hit rate: >80%
- Error rate: <0.1%

### ⚠️ Warning
- Average latency: 10-50ms
- Connection pool usage: >80%
- Cache hit rate: 60-80%

### 🚨 Critical
- Average latency: >50ms
- Connection pool exhausted
- Cache hit rate: <60%
- Error rate: >1%

## 🐛 Troubleshooting

### Problem: High Latency (>50ms)

```bash
# 1. Check Redis health
redis-cli PING
# Expected: PONG

# 2. Check network latency
redis-cli --latency
# Expected: avg <1ms

# 3. Check connections
redis-cli INFO clients
# Look for: connected_clients, blocked_clients

# 4. Check DNS
dig redis-archive.default.svc.cluster.local
# Should resolve quickly
```

### Problem: Connection Pool Exhausted

**Symptoms:**
- Errors: "connection pool timeout"
- Increasing latency

**Solutions:**
```go
// Increase pool size in cache/client.go
opt.PoolSize = 100  // Increase from 50
opt.MinIdleConns = 20  // Increase from 10
```

### Problem: Low Cache Hit Rate

```bash
# Check cache stats
redis-cli INFO stats

# Check memory
redis-cli INFO memory

# Check eviction policy
redis-cli CONFIG GET maxmemory-policy
```

## 📝 Code Examples

### Using Cache with Fallback

```go
// Resilient cache pattern
result, err := cache.GetWithFallback(ctx, "key", 10*time.Minute, func() (interface{}, error) {
    // Fallback to database
    return db.Query(...)
})
```

### Manual Cache Operations

```go
// GET with timeout
ctx, cancel := context.WithTimeout(ctx, 100*time.Millisecond)
defer cancel()
value, err := cache.Get(ctx, "key")

// SET with timeout
ctx, cancel := context.WithTimeout(ctx, 200*time.Millisecond)
defer cancel()
err := cache.Set(ctx, "key", value, 10*time.Minute)
```

## 🔍 Redis CLI Commands

```bash
# Monitor all commands
redis-cli MONITOR

# Check latency
redis-cli --latency

# Check connection info
redis-cli INFO clients

# Check memory usage
redis-cli INFO memory

# Check stats
redis-cli INFO stats

# Get specific key
redis-cli GET "category:list"

# Check key TTL
redis-cli TTL "category:list"

# List all keys (use carefully in production!)
redis-cli KEYS "*"

# Scan keys (safer than KEYS)
redis-cli SCAN 0 MATCH "category:*" COUNT 100
```

## 📚 Documentation

- **Detailed docs**: `cortex/REDIS_OPTIMIZATION.md`, `postal/REDIS_OPTIMIZATION.md`
- **Summary**: `REDIS_OPTIMIZATION_SUMMARY.md`
- **This guide**: `REDIS_QUICK_REFERENCE.md`

## 🚢 Deployment Checklist

- [x] Code implemented
- [x] Build verified
- [ ] Deploy to staging
- [ ] Run load tests
- [ ] Monitor metrics (24h)
- [ ] Deploy to production
- [ ] Verify latency <5ms
- [ ] Monitor for 1 week

## 🆘 Emergency Rollback

```bash
# Quick rollback
git revert <commit-hash>
make build
make deploy

# Or restore previous deployment
kubectl rollout undo deployment/cortex
kubectl rollout undo deployment/postal
```

## 💡 Tips

1. **Monitor first 24h closely** after deployment
2. **Check logs** for any timeout errors
3. **Watch connection pool** usage patterns
4. **Adjust pool sizes** if needed based on load
5. **Keep DNS caching enabled** - it's critical

## 📞 Support

If issues persist:
1. Check logs: `kubectl logs -f deployment/cortex`
2. Check Redis: `redis-cli INFO all`
3. Review metrics in monitoring dashboard
4. Consult detailed docs in service directories

---

**Quick Win:** This optimization should reduce Redis latency from 450ms to <5ms! 🎉
