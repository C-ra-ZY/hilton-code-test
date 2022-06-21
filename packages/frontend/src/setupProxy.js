const {createProxyMiddleware} = require("http-proxy-middleware");
let proxyMiddleware = createProxyMiddleware({
	target: "http://localhost:7001",
	changeOrigin: true,
});

module.exports = function (app) {
	app.use("/api", (...args) => {
		console.log(args);
		proxyMiddleware.apply(null, args)();
	});
};
