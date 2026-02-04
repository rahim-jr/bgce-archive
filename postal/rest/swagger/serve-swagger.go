package swagger

import (
	"net/http"

	"postal/config"
	"postal/rest/middlewares"
	"postal/rest/utils"
)

func serveSwagger(w http.ResponseWriter, r *http.Request) {
	// Simple placeholder for swagger
	utils.SendError(w, http.StatusNotImplemented, "Swagger UI not yet configured", nil)
}

func SetupSwagger(mux *http.ServeMux, manager *middlewares.Manager) {
	conf := config.GetConfig()

	if conf.Mode == config.ReleaseMode {
		return
	}

	mux.Handle("GET /swagger/{path...}",
		manager.With(
			http.HandlerFunc(serveSwagger),
		),
	)
}
