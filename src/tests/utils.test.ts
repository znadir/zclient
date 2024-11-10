const { getIpFromDomain } = require("../utils");

test("get ip by domain", async () => {
	const ip = await getIpFromDomain("tcpbin.com");
	expect(ip).toBe("45.79.112.203");
});
