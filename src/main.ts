const { getIpFromDomain } = require("./utils");
const ZClient = require("./ZClient");

async function main() {
	const res = await ZClient.get("http://echo.free.beeceptor.com/", {
		headers: {
			lol: 123,
		},
	});
	console.log(res);
}

main();
