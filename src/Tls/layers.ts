enum ContentType {
	INVALID = 0,
	CHANGE_CIPHER_SPEC = 20,
	ALERT = 21,
	HANDSHAKE = 22,
	APPLICATION_DATA = 23,
}

class Layer {
	public serialize(): Uint8Array {
		const segment: number[] = [];

		const keys = Object.keys(this);

		for (const key of keys) {
			const val = (this as Record<string, any>)[key];

			if (val instanceof Uint8Array) {
				segment.push(...Array.from(val));
			} else if (typeof val === "number") {
				segment.push(val);
			} else {
				throw Error(`Key ${key} is not a number or an Uint8Array`);
			}
		}

		return new Uint8Array(segment);
	}
}

class RecordLayer extends Layer {
	private contentType; // high-level protocol used to process the fragment
	private legacyRecordVersion; // 0x0303 for TLS 1.3 other than ClientHello
	private length; // length in bytes of TLSPlaintext.fragment. Max 2^14 bytes
	private fragment; // data being transmitted

	constructor(contentType: ContentType, legacyRecordVersion: Uint8Array, fragment: Uint8Array) {
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

module.exports = {
	ContentType,
	Layer,
	RecordLayer,
};
