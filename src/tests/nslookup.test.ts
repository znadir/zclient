const { getIpFromDoamin, getDomainFromUrl } = require("../utils");

test("get domain from url", () => {
	const url = "https://www.google.com/lol";
	const domain = getDomainFromUrl(url);

	expect(domain).toBe("google.com");
});

test("get ip by domain", async () => {
	const ip = await getIpFromDoamin("tcpbin.com");
	expect(ip).toBe("45.79.112.203");
});
