package middlewares

type Middlewares struct {
	jwtSecret string
}

func NewMiddlewares(jwtSecret string) *Middlewares {
	return &Middlewares{
		jwtSecret: jwtSecret,
	}
}
