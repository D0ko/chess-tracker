package middleware

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/cors"
)

// CORS retourne un middleware CORS configuré
func CORS() iris.Handler {
	crs := cors.New()
	crs.AllowOrigins("*")
	crs.AllowHeaders("Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With", "X-CSRF-Token")
	crs.ExposeHeaders("Content-Length", "Content-Type", "X-Total-Count")
	crs.MaxAge(86400) // 24 heures
	return crs.Handler()
}

// CORSProduction retourne un middleware CORS pour la production
func CORSProduction(allowedOrigins []string) iris.Handler {
	crs := cors.New()
	crs.AllowOrigins(allowedOrigins...)
	crs.AllowHeaders("Origin", "Content-Type", "Accept", "Authorization")
	crs.ExposeHeaders("Content-Length", "X-Total-Count")
	crs.MaxAge(3600) // 1 heure
	return crs.Handler()
}
