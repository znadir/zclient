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

module.exports = Layer;
