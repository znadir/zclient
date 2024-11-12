import RecordLayer from "./RecordLayer";
import HandshakeType from "../enum/HandshakeType";
import ContentType from "../enum/ContentType";

class HandshakeMessage {} // idk yet

class HandshakeLayer {
	private messageType;
	private length;
	private message;

	constructor(messageType: HandshakeType, length: number, message: HandshakeMessage) {
		this.messageType = messageType;
		this.length = length;

		switch (messageType) {
			case HandshakeType.CLIENT_HELLO: {
			}
			default: {
				throw Error("Type de Handshake non supporté");
			}
		}
	}
}
