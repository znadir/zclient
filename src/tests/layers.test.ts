const { RecordLayer, ContentType } = require("../Tls/layers");
const Tls = require("../Tls/Tls");

test("test record layer serialization", () => {
	const randomData = new Uint8Array([1, 2, 3, 4, 5, 6]);
	const recordLayer = new RecordLayer(ContentType.HANDSHAKE, Tls.version, randomData);
	const serializedLayer = recordLayer.serialize();
	const expected = new Uint8Array([22, 3, 1, 6, 1, 2, 3, 4, 5, 6]);

	expect(JSON.stringify(expected)).toBe(JSON.stringify(serializedLayer));
});
