const cluster = require("egg-cluster");
cluster.startCluster({
	baseDir: __dirname,
	workers: 1,
});
