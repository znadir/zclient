const ContentType = require("../enum/ContentType");
const Layer = require("./Layer");

class RecordLayer extends Layer {
	private contentType; // high-level protocol used to process the fragment
	private legacyRecordVersion; // 0x0303 for TLS 1.3 other than ClientHello
	private length; // length in bytes of TLSPlaintext.fragment. Max 2^14 bytes
	private fragment; // data being transmitted

	constructor(
		contentType: typeof ContentType,
		legacyRecordVersion: Uint8Array,
		fragment: Uint8Array
	) {
		super();

		this.contentType = contentType;
		this.legacyRecordVersion = legacyRecordVersion;
		this.length = fragment.byteLength;
		this.fragment = fragment;

		if (this.length > 2 ** 14) {
			// should terminate connection with record_overflow alert
			throw Error("Record fragment can't exceed 2^14 bytes");
		}
	}
}

module.exports = RecordLayer;
