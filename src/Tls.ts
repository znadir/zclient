enum ContentType {
	INVALID = 0,
	CHANGE_CIPHER_SPEC = 20,
	ALERT = 21,
	HANDSHAKE = 22,
	APPLICATION_DATA = 23,
}

type uint16 = number & { __uint16__: void };

class Record {
	private contentType; // high-level protocol used to process the fragment
	private legacyRecordVersion; // 0x0303 for TLS 1.3 other than ClientHello
	private length; // length in bytes of TLSPlaintext.fragment. Max 2^14 bytes
	private fragment; // data being transmitted

	constructor(
		contentType: typeof ContentType,
		legacyRecordVersion: number = Tls.version,
		fragment: Uint8Array
	) {
		this.contentType = contentType;
		this.legacyRecordVersion = legacyRecordVersion;
		this.length = fragment.byteLength;
		this.fragment = fragment;

		if (this.length > 16384) {
			// should terminate connection with record_overflow alert
			throw Error("Record fragment can't exceed 2^14 bytes");
		}
	}
}

class Tls {
	public h_version = "1.3"; // or namely rfc8446
	public static version = 0x0303;

	constructor() {}
}
