class Tls {
	// doc: https://datatracker.ietf.org/doc/html/rfc8446
	public h_version = "1.3"; // or namely rfc8446
	public static version = new Uint8Array([3, 1]);

	constructor() {}
}

module.exports = Tls;
