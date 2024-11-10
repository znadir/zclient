const { getIpFromDomain } = require("./utils");
const ZClient = require("./ZClient");

async function main() {
	const res = await ZClient.get("http://echo.free.beeceptor.com/");
	console.log(res);
}

main();
