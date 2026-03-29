/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, import/no-commonjs*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * MessageType enum.
 * @exports MessageType
 * @enum {number}
 * @property {number} TEXT=0 TEXT value
 * @property {number} IMAGE=1 IMAGE value
 * @property {number} VOICE=2 VOICE value
 */
$root.MessageType = (function () {
  var valuesById = {},
    values = Object.create(valuesById);
  values[(valuesById[0] = "TEXT")] = 0;
  values[(valuesById[1] = "IMAGE")] = 1;
  values[(valuesById[2] = "VOICE")] = 2;
  return values;
})();

$root.AiChatMessage = (function () {
  /**
   * Properties of an AiChatMessage.
   * @exports IAiChatMessage
   * @interface IAiChatMessage
   * @property {number|null} [id] AiChatMessage id
   * @property {string|null} [sessionId] AiChatMessage sessionId
   * @property {string|null} [openid] AiChatMessage openid
   * @property {string|null} [title] AiChatMessage title
   * @property {string|null} [userMessage] AiChatMessage userMessage
   * @property {string|null} [aiResponse] AiChatMessage aiResponse
   * @property {MessageType|null} [messageType] AiChatMessage messageType
   * @property {number|Long|null} [createdAt] AiChatMessage createdAt
   * @property {number|Long|null} [updatedAt] AiChatMessage updatedAt
   */

  /**
   * Constructs a new AiChatMessage.
   * @exports AiChatMessage
   * @classdesc Represents an AiChatMessage.
   * @implements IAiChatMessage
   * @constructor
   * @param {IAiChatMessage=} [properties] Properties to set
   */
  function AiChatMessage(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * AiChatMessage id.
   * @member {number} id
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.id = 0;

  /**
   * AiChatMessage sessionId.
   * @member {string} sessionId
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.sessionId = "";

  /**
   * AiChatMessage openid.
   * @member {string} openid
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.openid = "";

  /**
   * AiChatMessage title.
   * @member {string} title
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.title = "";

  /**
   * AiChatMessage userMessage.
   * @member {string} userMessage
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.userMessage = "";

  /**
   * AiChatMessage aiResponse.
   * @member {string} aiResponse
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.aiResponse = "";

  /**
   * AiChatMessage messageType.
   * @member {MessageType} messageType
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.messageType = 0;

  /**
   * AiChatMessage createdAt.
   * @member {number|Long} createdAt
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.createdAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * AiChatMessage updatedAt.
   * @member {number|Long} updatedAt
   * @memberof AiChatMessage
   * @instance
   */
  AiChatMessage.prototype.updatedAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * Creates a new AiChatMessage instance using the specified properties.
   * @function create
   * @memberof AiChatMessage
   * @static
   * @param {IAiChatMessage=} [properties] Properties to set
   * @returns {AiChatMessage} AiChatMessage instance
   */
  AiChatMessage.create = function create(properties) {
    return new AiChatMessage(properties);
  };

  /**
   * Encodes the specified AiChatMessage message. Does not implicitly {@link AiChatMessage.verify|verify} messages.
   * @function encode
   * @memberof AiChatMessage
   * @static
   * @param {IAiChatMessage} message AiChatMessage message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  AiChatMessage.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.id);
    if (
      message.sessionId != null &&
      Object.hasOwnProperty.call(message, "sessionId")
    )
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.sessionId);
    if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.openid);
    if (message.title != null && Object.hasOwnProperty.call(message, "title"))
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.title);
    if (
      message.userMessage != null &&
      Object.hasOwnProperty.call(message, "userMessage")
    )
      writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userMessage);
    if (
      message.aiResponse != null &&
      Object.hasOwnProperty.call(message, "aiResponse")
    )
      writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.aiResponse);
    if (
      message.messageType != null &&
      Object.hasOwnProperty.call(message, "messageType")
    )
      writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.messageType);
    if (
      message.createdAt != null &&
      Object.hasOwnProperty.call(message, "createdAt")
    )
      writer.uint32(/* id 8, wireType 0 =*/ 64).int64(message.createdAt);
    if (
      message.updatedAt != null &&
      Object.hasOwnProperty.call(message, "updatedAt")
    )
      writer.uint32(/* id 9, wireType 0 =*/ 72).int64(message.updatedAt);
    return writer;
  };

  /**
   * Encodes the specified AiChatMessage message, length delimited. Does not implicitly {@link AiChatMessage.verify|verify} messages.
   * @function encodeDelimited
   * @memberof AiChatMessage
   * @static
   * @param {IAiChatMessage} message AiChatMessage message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  AiChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes an AiChatMessage message from the specified reader or buffer.
   * @function decode
   * @memberof AiChatMessage
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {AiChatMessage} AiChatMessage
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  AiChatMessage.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.AiChatMessage();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.id = reader.int32();
          break;
        }
        case 2: {
          message.sessionId = reader.string();
          break;
        }
        case 3: {
          message.openid = reader.string();
          break;
        }
        case 4: {
          message.title = reader.string();
          break;
        }
        case 5: {
          message.userMessage = reader.string();
          break;
        }
        case 6: {
          message.aiResponse = reader.string();
          break;
        }
        case 7: {
          message.messageType = reader.int32();
          break;
        }
        case 8: {
          message.createdAt = reader.int64();
          break;
        }
        case 9: {
          message.updatedAt = reader.int64();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes an AiChatMessage message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof AiChatMessage
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {AiChatMessage} AiChatMessage
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  AiChatMessage.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies an AiChatMessage message.
   * @function verify
   * @memberof AiChatMessage
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  AiChatMessage.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.id != null && message.hasOwnProperty("id"))
      if (!$util.isInteger(message.id)) return "id: integer expected";
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      if (!$util.isString(message.sessionId))
        return "sessionId: string expected";
    if (message.openid != null && message.hasOwnProperty("openid"))
      if (!$util.isString(message.openid)) return "openid: string expected";
    if (message.title != null && message.hasOwnProperty("title"))
      if (!$util.isString(message.title)) return "title: string expected";
    if (message.userMessage != null && message.hasOwnProperty("userMessage"))
      if (!$util.isString(message.userMessage))
        return "userMessage: string expected";
    if (message.aiResponse != null && message.hasOwnProperty("aiResponse"))
      if (!$util.isString(message.aiResponse))
        return "aiResponse: string expected";
    if (message.messageType != null && message.hasOwnProperty("messageType"))
      switch (message.messageType) {
        default:
          return "messageType: enum value expected";
        case 0:
        case 1:
        case 2:
          break;
      }
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (
        !$util.isInteger(message.createdAt) &&
        !(
          message.createdAt &&
          $util.isInteger(message.createdAt.low) &&
          $util.isInteger(message.createdAt.high)
        )
      )
        return "createdAt: integer|Long expected";
    if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
      if (
        !$util.isInteger(message.updatedAt) &&
        !(
          message.updatedAt &&
          $util.isInteger(message.updatedAt.low) &&
          $util.isInteger(message.updatedAt.high)
        )
      )
        return "updatedAt: integer|Long expected";
    return null;
  };

  /**
   * Creates an AiChatMessage message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof AiChatMessage
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {AiChatMessage} AiChatMessage
   */
  AiChatMessage.fromObject = function fromObject(object) {
    if (object instanceof $root.AiChatMessage) return object;
    var message = new $root.AiChatMessage();
    if (object.id != null) message.id = object.id | 0;
    if (object.sessionId != null) message.sessionId = String(object.sessionId);
    if (object.openid != null) message.openid = String(object.openid);
    if (object.title != null) message.title = String(object.title);
    if (object.userMessage != null)
      message.userMessage = String(object.userMessage);
    if (object.aiResponse != null)
      message.aiResponse = String(object.aiResponse);
    switch (object.messageType) {
      case "TEXT":
      case 0:
        message.messageType = 0;
        break;
      case "IMAGE":
      case 1:
        message.messageType = 1;
        break;
      case "VOICE":
      case 2:
        message.messageType = 2;
        break;
    }
    if (object.createdAt != null)
      if ($util.Long)
        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned =
          false;
      else if (typeof object.createdAt === "string")
        message.createdAt = parseInt(object.createdAt, 10);
      else if (typeof object.createdAt === "number")
        message.createdAt = object.createdAt;
      else if (typeof object.createdAt === "object")
        message.createdAt = new $util.LongBits(
          object.createdAt.low >>> 0,
          object.createdAt.high >>> 0,
        ).toNumber();
    if (object.updatedAt != null)
      if ($util.Long)
        (message.updatedAt = $util.Long.fromValue(object.updatedAt)).unsigned =
          false;
      else if (typeof object.updatedAt === "string")
        message.updatedAt = parseInt(object.updatedAt, 10);
      else if (typeof object.updatedAt === "number")
        message.updatedAt = object.updatedAt;
      else if (typeof object.updatedAt === "object")
        message.updatedAt = new $util.LongBits(
          object.updatedAt.low >>> 0,
          object.updatedAt.high >>> 0,
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from an AiChatMessage message. Also converts values to other types if specified.
   * @function toObject
   * @memberof AiChatMessage
   * @static
   * @param {AiChatMessage} message AiChatMessage
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  AiChatMessage.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.id = 0;
      object.sessionId = "";
      object.openid = "";
      object.title = "";
      object.userMessage = "";
      object.aiResponse = "";
      object.messageType = options.enums === String ? "TEXT" : 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.createdAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.createdAt = options.longs === String ? "0" : 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.updatedAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.updatedAt = options.longs === String ? "0" : 0;
    }
    if (message.id != null && message.hasOwnProperty("id"))
      object.id = message.id;
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      object.sessionId = message.sessionId;
    if (message.openid != null && message.hasOwnProperty("openid"))
      object.openid = message.openid;
    if (message.title != null && message.hasOwnProperty("title"))
      object.title = message.title;
    if (message.userMessage != null && message.hasOwnProperty("userMessage"))
      object.userMessage = message.userMessage;
    if (message.aiResponse != null && message.hasOwnProperty("aiResponse"))
      object.aiResponse = message.aiResponse;
    if (message.messageType != null && message.hasOwnProperty("messageType"))
      object.messageType =
        options.enums === String
          ? $root.MessageType[message.messageType]
          : message.messageType;
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (typeof message.createdAt === "number")
        object.createdAt =
          options.longs === String
            ? String(message.createdAt)
            : message.createdAt;
      else
        object.createdAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.createdAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.createdAt.low >>> 0,
                  message.createdAt.high >>> 0,
                ).toNumber()
              : message.createdAt;
    if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
      if (typeof message.updatedAt === "number")
        object.updatedAt =
          options.longs === String
            ? String(message.updatedAt)
            : message.updatedAt;
      else
        object.updatedAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.updatedAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.updatedAt.low >>> 0,
                  message.updatedAt.high >>> 0,
                ).toNumber()
              : message.updatedAt;
    return object;
  };

  /**
   * Converts this AiChatMessage to JSON.
   * @function toJSON
   * @memberof AiChatMessage
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  AiChatMessage.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for AiChatMessage
   * @function getTypeUrl
   * @memberof AiChatMessage
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  AiChatMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/AiChatMessage";
  };

  return AiChatMessage;
})();

$root.AiChatSession = (function () {
  /**
   * Properties of an AiChatSession.
   * @exports IAiChatSession
   * @interface IAiChatSession
   * @property {string|null} [sessionId] AiChatSession sessionId
   * @property {string|null} [openid] AiChatSession openid
   * @property {string|null} [title] AiChatSession title
   * @property {number|null} [messageCount] AiChatSession messageCount
   * @property {number|Long|null} [createdAt] AiChatSession createdAt
   * @property {number|Long|null} [lastMessageAt] AiChatSession lastMessageAt
   */

  /**
   * Constructs a new AiChatSession.
   * @exports AiChatSession
   * @classdesc Represents an AiChatSession.
   * @implements IAiChatSession
   * @constructor
   * @param {IAiChatSession=} [properties] Properties to set
   */
  function AiChatSession(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * AiChatSession sessionId.
   * @member {string} sessionId
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.sessionId = "";

  /**
   * AiChatSession openid.
   * @member {string} openid
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.openid = "";

  /**
   * AiChatSession title.
   * @member {string} title
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.title = "";

  /**
   * AiChatSession messageCount.
   * @member {number} messageCount
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.messageCount = 0;

  /**
   * AiChatSession createdAt.
   * @member {number|Long} createdAt
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.createdAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * AiChatSession lastMessageAt.
   * @member {number|Long} lastMessageAt
   * @memberof AiChatSession
   * @instance
   */
  AiChatSession.prototype.lastMessageAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * Creates a new AiChatSession instance using the specified properties.
   * @function create
   * @memberof AiChatSession
   * @static
   * @param {IAiChatSession=} [properties] Properties to set
   * @returns {AiChatSession} AiChatSession instance
   */
  AiChatSession.create = function create(properties) {
    return new AiChatSession(properties);
  };

  /**
   * Encodes the specified AiChatSession message. Does not implicitly {@link AiChatSession.verify|verify} messages.
   * @function encode
   * @memberof AiChatSession
   * @static
   * @param {IAiChatSession} message AiChatSession message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  AiChatSession.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.sessionId != null &&
      Object.hasOwnProperty.call(message, "sessionId")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.sessionId);
    if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.openid);
    if (message.title != null && Object.hasOwnProperty.call(message, "title"))
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.title);
    if (
      message.messageCount != null &&
      Object.hasOwnProperty.call(message, "messageCount")
    )
      writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.messageCount);
    if (
      message.createdAt != null &&
      Object.hasOwnProperty.call(message, "createdAt")
    )
      writer.uint32(/* id 5, wireType 0 =*/ 40).int64(message.createdAt);
    if (
      message.lastMessageAt != null &&
      Object.hasOwnProperty.call(message, "lastMessageAt")
    )
      writer.uint32(/* id 6, wireType 0 =*/ 48).int64(message.lastMessageAt);
    return writer;
  };

  /**
   * Encodes the specified AiChatSession message, length delimited. Does not implicitly {@link AiChatSession.verify|verify} messages.
   * @function encodeDelimited
   * @memberof AiChatSession
   * @static
   * @param {IAiChatSession} message AiChatSession message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  AiChatSession.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes an AiChatSession message from the specified reader or buffer.
   * @function decode
   * @memberof AiChatSession
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {AiChatSession} AiChatSession
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  AiChatSession.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.AiChatSession();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.sessionId = reader.string();
          break;
        }
        case 2: {
          message.openid = reader.string();
          break;
        }
        case 3: {
          message.title = reader.string();
          break;
        }
        case 4: {
          message.messageCount = reader.int32();
          break;
        }
        case 5: {
          message.createdAt = reader.int64();
          break;
        }
        case 6: {
          message.lastMessageAt = reader.int64();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes an AiChatSession message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof AiChatSession
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {AiChatSession} AiChatSession
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  AiChatSession.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies an AiChatSession message.
   * @function verify
   * @memberof AiChatSession
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  AiChatSession.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      if (!$util.isString(message.sessionId))
        return "sessionId: string expected";
    if (message.openid != null && message.hasOwnProperty("openid"))
      if (!$util.isString(message.openid)) return "openid: string expected";
    if (message.title != null && message.hasOwnProperty("title"))
      if (!$util.isString(message.title)) return "title: string expected";
    if (message.messageCount != null && message.hasOwnProperty("messageCount"))
      if (!$util.isInteger(message.messageCount))
        return "messageCount: integer expected";
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (
        !$util.isInteger(message.createdAt) &&
        !(
          message.createdAt &&
          $util.isInteger(message.createdAt.low) &&
          $util.isInteger(message.createdAt.high)
        )
      )
        return "createdAt: integer|Long expected";
    if (
      message.lastMessageAt != null &&
      message.hasOwnProperty("lastMessageAt")
    )
      if (
        !$util.isInteger(message.lastMessageAt) &&
        !(
          message.lastMessageAt &&
          $util.isInteger(message.lastMessageAt.low) &&
          $util.isInteger(message.lastMessageAt.high)
        )
      )
        return "lastMessageAt: integer|Long expected";
    return null;
  };

  /**
   * Creates an AiChatSession message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof AiChatSession
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {AiChatSession} AiChatSession
   */
  AiChatSession.fromObject = function fromObject(object) {
    if (object instanceof $root.AiChatSession) return object;
    var message = new $root.AiChatSession();
    if (object.sessionId != null) message.sessionId = String(object.sessionId);
    if (object.openid != null) message.openid = String(object.openid);
    if (object.title != null) message.title = String(object.title);
    if (object.messageCount != null)
      message.messageCount = object.messageCount | 0;
    if (object.createdAt != null)
      if ($util.Long)
        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned =
          false;
      else if (typeof object.createdAt === "string")
        message.createdAt = parseInt(object.createdAt, 10);
      else if (typeof object.createdAt === "number")
        message.createdAt = object.createdAt;
      else if (typeof object.createdAt === "object")
        message.createdAt = new $util.LongBits(
          object.createdAt.low >>> 0,
          object.createdAt.high >>> 0,
        ).toNumber();
    if (object.lastMessageAt != null)
      if ($util.Long)
        (message.lastMessageAt = $util.Long.fromValue(
          object.lastMessageAt,
        )).unsigned = false;
      else if (typeof object.lastMessageAt === "string")
        message.lastMessageAt = parseInt(object.lastMessageAt, 10);
      else if (typeof object.lastMessageAt === "number")
        message.lastMessageAt = object.lastMessageAt;
      else if (typeof object.lastMessageAt === "object")
        message.lastMessageAt = new $util.LongBits(
          object.lastMessageAt.low >>> 0,
          object.lastMessageAt.high >>> 0,
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from an AiChatSession message. Also converts values to other types if specified.
   * @function toObject
   * @memberof AiChatSession
   * @static
   * @param {AiChatSession} message AiChatSession
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  AiChatSession.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.sessionId = "";
      object.openid = "";
      object.title = "";
      object.messageCount = 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.createdAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.createdAt = options.longs === String ? "0" : 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.lastMessageAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.lastMessageAt = options.longs === String ? "0" : 0;
    }
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      object.sessionId = message.sessionId;
    if (message.openid != null && message.hasOwnProperty("openid"))
      object.openid = message.openid;
    if (message.title != null && message.hasOwnProperty("title"))
      object.title = message.title;
    if (message.messageCount != null && message.hasOwnProperty("messageCount"))
      object.messageCount = message.messageCount;
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (typeof message.createdAt === "number")
        object.createdAt =
          options.longs === String
            ? String(message.createdAt)
            : message.createdAt;
      else
        object.createdAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.createdAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.createdAt.low >>> 0,
                  message.createdAt.high >>> 0,
                ).toNumber()
              : message.createdAt;
    if (
      message.lastMessageAt != null &&
      message.hasOwnProperty("lastMessageAt")
    )
      if (typeof message.lastMessageAt === "number")
        object.lastMessageAt =
          options.longs === String
            ? String(message.lastMessageAt)
            : message.lastMessageAt;
      else
        object.lastMessageAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.lastMessageAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.lastMessageAt.low >>> 0,
                  message.lastMessageAt.high >>> 0,
                ).toNumber()
              : message.lastMessageAt;
    return object;
  };

  /**
   * Converts this AiChatSession to JSON.
   * @function toJSON
   * @memberof AiChatSession
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  AiChatSession.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for AiChatSession
   * @function getTypeUrl
   * @memberof AiChatSession
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  AiChatSession.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/AiChatSession";
  };

  return AiChatSession;
})();

$root.SaveChatRequest = (function () {
  /**
   * Properties of a SaveChatRequest.
   * @exports ISaveChatRequest
   * @interface ISaveChatRequest
   * @property {string|null} [sessionId] SaveChatRequest sessionId
   * @property {string|null} [title] SaveChatRequest title
   * @property {string|null} [userMessage] SaveChatRequest userMessage
   * @property {string|null} [aiResponse] SaveChatRequest aiResponse
   * @property {MessageType|null} [messageType] SaveChatRequest messageType
   */

  /**
   * Constructs a new SaveChatRequest.
   * @exports SaveChatRequest
   * @classdesc Represents a SaveChatRequest.
   * @implements ISaveChatRequest
   * @constructor
   * @param {ISaveChatRequest=} [properties] Properties to set
   */
  function SaveChatRequest(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SaveChatRequest sessionId.
   * @member {string} sessionId
   * @memberof SaveChatRequest
   * @instance
   */
  SaveChatRequest.prototype.sessionId = "";

  /**
   * SaveChatRequest title.
   * @member {string} title
   * @memberof SaveChatRequest
   * @instance
   */
  SaveChatRequest.prototype.title = "";

  /**
   * SaveChatRequest userMessage.
   * @member {string} userMessage
   * @memberof SaveChatRequest
   * @instance
   */
  SaveChatRequest.prototype.userMessage = "";

  /**
   * SaveChatRequest aiResponse.
   * @member {string} aiResponse
   * @memberof SaveChatRequest
   * @instance
   */
  SaveChatRequest.prototype.aiResponse = "";

  /**
   * SaveChatRequest messageType.
   * @member {MessageType} messageType
   * @memberof SaveChatRequest
   * @instance
   */
  SaveChatRequest.prototype.messageType = 0;

  /**
   * Creates a new SaveChatRequest instance using the specified properties.
   * @function create
   * @memberof SaveChatRequest
   * @static
   * @param {ISaveChatRequest=} [properties] Properties to set
   * @returns {SaveChatRequest} SaveChatRequest instance
   */
  SaveChatRequest.create = function create(properties) {
    return new SaveChatRequest(properties);
  };

  /**
   * Encodes the specified SaveChatRequest message. Does not implicitly {@link SaveChatRequest.verify|verify} messages.
   * @function encode
   * @memberof SaveChatRequest
   * @static
   * @param {ISaveChatRequest} message SaveChatRequest message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SaveChatRequest.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.sessionId != null &&
      Object.hasOwnProperty.call(message, "sessionId")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.sessionId);
    if (message.title != null && Object.hasOwnProperty.call(message, "title"))
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.title);
    if (
      message.userMessage != null &&
      Object.hasOwnProperty.call(message, "userMessage")
    )
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userMessage);
    if (
      message.aiResponse != null &&
      Object.hasOwnProperty.call(message, "aiResponse")
    )
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.aiResponse);
    if (
      message.messageType != null &&
      Object.hasOwnProperty.call(message, "messageType")
    )
      writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.messageType);
    return writer;
  };

  /**
   * Encodes the specified SaveChatRequest message, length delimited. Does not implicitly {@link SaveChatRequest.verify|verify} messages.
   * @function encodeDelimited
   * @memberof SaveChatRequest
   * @static
   * @param {ISaveChatRequest} message SaveChatRequest message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SaveChatRequest.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a SaveChatRequest message from the specified reader or buffer.
   * @function decode
   * @memberof SaveChatRequest
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SaveChatRequest} SaveChatRequest
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SaveChatRequest.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SaveChatRequest();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.sessionId = reader.string();
          break;
        }
        case 2: {
          message.title = reader.string();
          break;
        }
        case 3: {
          message.userMessage = reader.string();
          break;
        }
        case 4: {
          message.aiResponse = reader.string();
          break;
        }
        case 5: {
          message.messageType = reader.int32();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a SaveChatRequest message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof SaveChatRequest
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {SaveChatRequest} SaveChatRequest
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SaveChatRequest.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a SaveChatRequest message.
   * @function verify
   * @memberof SaveChatRequest
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SaveChatRequest.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      if (!$util.isString(message.sessionId))
        return "sessionId: string expected";
    if (message.title != null && message.hasOwnProperty("title"))
      if (!$util.isString(message.title)) return "title: string expected";
    if (message.userMessage != null && message.hasOwnProperty("userMessage"))
      if (!$util.isString(message.userMessage))
        return "userMessage: string expected";
    if (message.aiResponse != null && message.hasOwnProperty("aiResponse"))
      if (!$util.isString(message.aiResponse))
        return "aiResponse: string expected";
    if (message.messageType != null && message.hasOwnProperty("messageType"))
      switch (message.messageType) {
        default:
          return "messageType: enum value expected";
        case 0:
        case 1:
        case 2:
          break;
      }
    return null;
  };

  /**
   * Creates a SaveChatRequest message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof SaveChatRequest
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {SaveChatRequest} SaveChatRequest
   */
  SaveChatRequest.fromObject = function fromObject(object) {
    if (object instanceof $root.SaveChatRequest) return object;
    var message = new $root.SaveChatRequest();
    if (object.sessionId != null) message.sessionId = String(object.sessionId);
    if (object.title != null) message.title = String(object.title);
    if (object.userMessage != null)
      message.userMessage = String(object.userMessage);
    if (object.aiResponse != null)
      message.aiResponse = String(object.aiResponse);
    switch (object.messageType) {
      case "TEXT":
      case 0:
        message.messageType = 0;
        break;
      case "IMAGE":
      case 1:
        message.messageType = 1;
        break;
      case "VOICE":
      case 2:
        message.messageType = 2;
        break;
    }
    return message;
  };

  /**
   * Creates a plain object from a SaveChatRequest message. Also converts values to other types if specified.
   * @function toObject
   * @memberof SaveChatRequest
   * @static
   * @param {SaveChatRequest} message SaveChatRequest
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  SaveChatRequest.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.sessionId = "";
      object.title = "";
      object.userMessage = "";
      object.aiResponse = "";
      object.messageType = options.enums === String ? "TEXT" : 0;
    }
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      object.sessionId = message.sessionId;
    if (message.title != null && message.hasOwnProperty("title"))
      object.title = message.title;
    if (message.userMessage != null && message.hasOwnProperty("userMessage"))
      object.userMessage = message.userMessage;
    if (message.aiResponse != null && message.hasOwnProperty("aiResponse"))
      object.aiResponse = message.aiResponse;
    if (message.messageType != null && message.hasOwnProperty("messageType"))
      object.messageType =
        options.enums === String
          ? $root.MessageType[message.messageType]
          : message.messageType;
    return object;
  };

  /**
   * Converts this SaveChatRequest to JSON.
   * @function toJSON
   * @memberof SaveChatRequest
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  SaveChatRequest.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for SaveChatRequest
   * @function getTypeUrl
   * @memberof SaveChatRequest
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  SaveChatRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/SaveChatRequest";
  };

  return SaveChatRequest;
})();

$root.SaveChatResponse = (function () {
  /**
   * Properties of a SaveChatResponse.
   * @exports ISaveChatResponse
   * @interface ISaveChatResponse
   * @property {IAiChatMessage|null} [message] SaveChatResponse message
   * @property {string|null} [sessionId] SaveChatResponse sessionId
   * @property {number|null} [code] SaveChatResponse code
   * @property {string|null} [messageInfo] SaveChatResponse messageInfo
   */

  /**
   * Constructs a new SaveChatResponse.
   * @exports SaveChatResponse
   * @classdesc Represents a SaveChatResponse.
   * @implements ISaveChatResponse
   * @constructor
   * @param {ISaveChatResponse=} [properties] Properties to set
   */
  function SaveChatResponse(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SaveChatResponse message.
   * @member {IAiChatMessage|null|undefined} message
   * @memberof SaveChatResponse
   * @instance
   */
  SaveChatResponse.prototype.message = null;

  /**
   * SaveChatResponse sessionId.
   * @member {string} sessionId
   * @memberof SaveChatResponse
   * @instance
   */
  SaveChatResponse.prototype.sessionId = "";

  /**
   * SaveChatResponse code.
   * @member {number} code
   * @memberof SaveChatResponse
   * @instance
   */
  SaveChatResponse.prototype.code = 0;

  /**
   * SaveChatResponse messageInfo.
   * @member {string} messageInfo
   * @memberof SaveChatResponse
   * @instance
   */
  SaveChatResponse.prototype.messageInfo = "";

  /**
   * Creates a new SaveChatResponse instance using the specified properties.
   * @function create
   * @memberof SaveChatResponse
   * @static
   * @param {ISaveChatResponse=} [properties] Properties to set
   * @returns {SaveChatResponse} SaveChatResponse instance
   */
  SaveChatResponse.create = function create(properties) {
    return new SaveChatResponse(properties);
  };

  /**
   * Encodes the specified SaveChatResponse message. Does not implicitly {@link SaveChatResponse.verify|verify} messages.
   * @function encode
   * @memberof SaveChatResponse
   * @static
   * @param {ISaveChatResponse} message SaveChatResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SaveChatResponse.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.message != null &&
      Object.hasOwnProperty.call(message, "message")
    )
      $root.AiChatMessage.encode(
        message.message,
        writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
      ).ldelim();
    if (
      message.sessionId != null &&
      Object.hasOwnProperty.call(message, "sessionId")
    )
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.sessionId);
    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
      writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.code);
    if (
      message.messageInfo != null &&
      Object.hasOwnProperty.call(message, "messageInfo")
    )
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.messageInfo);
    return writer;
  };

  /**
   * Encodes the specified SaveChatResponse message, length delimited. Does not implicitly {@link SaveChatResponse.verify|verify} messages.
   * @function encodeDelimited
   * @memberof SaveChatResponse
   * @static
   * @param {ISaveChatResponse} message SaveChatResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SaveChatResponse.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a SaveChatResponse message from the specified reader or buffer.
   * @function decode
   * @memberof SaveChatResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SaveChatResponse} SaveChatResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SaveChatResponse.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SaveChatResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.message = $root.AiChatMessage.decode(reader, reader.uint32());
          break;
        }
        case 2: {
          message.sessionId = reader.string();
          break;
        }
        case 3: {
          message.code = reader.int32();
          break;
        }
        case 4: {
          message.messageInfo = reader.string();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a SaveChatResponse message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof SaveChatResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {SaveChatResponse} SaveChatResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SaveChatResponse.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a SaveChatResponse message.
   * @function verify
   * @memberof SaveChatResponse
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SaveChatResponse.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.message != null && message.hasOwnProperty("message")) {
      var error = $root.AiChatMessage.verify(message.message);
      if (error) return "message." + error;
    }
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      if (!$util.isString(message.sessionId))
        return "sessionId: string expected";
    if (message.code != null && message.hasOwnProperty("code"))
      if (!$util.isInteger(message.code)) return "code: integer expected";
    if (message.messageInfo != null && message.hasOwnProperty("messageInfo"))
      if (!$util.isString(message.messageInfo))
        return "messageInfo: string expected";
    return null;
  };

  /**
   * Creates a SaveChatResponse message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof SaveChatResponse
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {SaveChatResponse} SaveChatResponse
   */
  SaveChatResponse.fromObject = function fromObject(object) {
    if (object instanceof $root.SaveChatResponse) return object;
    var message = new $root.SaveChatResponse();
    if (object.message != null) {
      if (typeof object.message !== "object")
        throw TypeError(".SaveChatResponse.message: object expected");
      message.message = $root.AiChatMessage.fromObject(object.message);
    }
    if (object.sessionId != null) message.sessionId = String(object.sessionId);
    if (object.code != null) message.code = object.code | 0;
    if (object.messageInfo != null)
      message.messageInfo = String(object.messageInfo);
    return message;
  };

  /**
   * Creates a plain object from a SaveChatResponse message. Also converts values to other types if specified.
   * @function toObject
   * @memberof SaveChatResponse
   * @static
   * @param {SaveChatResponse} message SaveChatResponse
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  SaveChatResponse.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.message = null;
      object.sessionId = "";
      object.code = 0;
      object.messageInfo = "";
    }
    if (message.message != null && message.hasOwnProperty("message"))
      object.message = $root.AiChatMessage.toObject(message.message, options);
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      object.sessionId = message.sessionId;
    if (message.code != null && message.hasOwnProperty("code"))
      object.code = message.code;
    if (message.messageInfo != null && message.hasOwnProperty("messageInfo"))
      object.messageInfo = message.messageInfo;
    return object;
  };

  /**
   * Converts this SaveChatResponse to JSON.
   * @function toJSON
   * @memberof SaveChatResponse
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  SaveChatResponse.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for SaveChatResponse
   * @function getTypeUrl
   * @memberof SaveChatResponse
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  SaveChatResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/SaveChatResponse";
  };

  return SaveChatResponse;
})();

$root.GetSessionListResponse = (function () {
  /**
   * Properties of a GetSessionListResponse.
   * @exports IGetSessionListResponse
   * @interface IGetSessionListResponse
   * @property {Array.<IAiChatSession>|null} [sessions] GetSessionListResponse sessions
   * @property {number|null} [total] GetSessionListResponse total
   * @property {number|null} [code] GetSessionListResponse code
   * @property {string|null} [message] GetSessionListResponse message
   */

  /**
   * Constructs a new GetSessionListResponse.
   * @exports GetSessionListResponse
   * @classdesc Represents a GetSessionListResponse.
   * @implements IGetSessionListResponse
   * @constructor
   * @param {IGetSessionListResponse=} [properties] Properties to set
   */
  function GetSessionListResponse(properties) {
    this.sessions = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * GetSessionListResponse sessions.
   * @member {Array.<IAiChatSession>} sessions
   * @memberof GetSessionListResponse
   * @instance
   */
  GetSessionListResponse.prototype.sessions = $util.emptyArray;

  /**
   * GetSessionListResponse total.
   * @member {number} total
   * @memberof GetSessionListResponse
   * @instance
   */
  GetSessionListResponse.prototype.total = 0;

  /**
   * GetSessionListResponse code.
   * @member {number} code
   * @memberof GetSessionListResponse
   * @instance
   */
  GetSessionListResponse.prototype.code = 0;

  /**
   * GetSessionListResponse message.
   * @member {string} message
   * @memberof GetSessionListResponse
   * @instance
   */
  GetSessionListResponse.prototype.message = "";

  /**
   * Creates a new GetSessionListResponse instance using the specified properties.
   * @function create
   * @memberof GetSessionListResponse
   * @static
   * @param {IGetSessionListResponse=} [properties] Properties to set
   * @returns {GetSessionListResponse} GetSessionListResponse instance
   */
  GetSessionListResponse.create = function create(properties) {
    return new GetSessionListResponse(properties);
  };

  /**
   * Encodes the specified GetSessionListResponse message. Does not implicitly {@link GetSessionListResponse.verify|verify} messages.
   * @function encode
   * @memberof GetSessionListResponse
   * @static
   * @param {IGetSessionListResponse} message GetSessionListResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  GetSessionListResponse.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.sessions != null && message.sessions.length)
      for (var i = 0; i < message.sessions.length; ++i)
        $root.AiChatSession.encode(
          message.sessions[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
        ).ldelim();
    if (message.total != null && Object.hasOwnProperty.call(message, "total"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.total);
    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
      writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.code);
    if (
      message.message != null &&
      Object.hasOwnProperty.call(message, "message")
    )
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.message);
    return writer;
  };

  /**
   * Encodes the specified GetSessionListResponse message, length delimited. Does not implicitly {@link GetSessionListResponse.verify|verify} messages.
   * @function encodeDelimited
   * @memberof GetSessionListResponse
   * @static
   * @param {IGetSessionListResponse} message GetSessionListResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  GetSessionListResponse.encodeDelimited = function encodeDelimited(
    message,
    writer,
  ) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a GetSessionListResponse message from the specified reader or buffer.
   * @function decode
   * @memberof GetSessionListResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {GetSessionListResponse} GetSessionListResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  GetSessionListResponse.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.GetSessionListResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (!(message.sessions && message.sessions.length))
            message.sessions = [];
          message.sessions.push(
            $root.AiChatSession.decode(reader, reader.uint32()),
          );
          break;
        }
        case 2: {
          message.total = reader.int32();
          break;
        }
        case 3: {
          message.code = reader.int32();
          break;
        }
        case 4: {
          message.message = reader.string();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a GetSessionListResponse message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof GetSessionListResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {GetSessionListResponse} GetSessionListResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  GetSessionListResponse.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a GetSessionListResponse message.
   * @function verify
   * @memberof GetSessionListResponse
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  GetSessionListResponse.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.sessions != null && message.hasOwnProperty("sessions")) {
      if (!Array.isArray(message.sessions)) return "sessions: array expected";
      for (var i = 0; i < message.sessions.length; ++i) {
        var error = $root.AiChatSession.verify(message.sessions[i]);
        if (error) return "sessions." + error;
      }
    }
    if (message.total != null && message.hasOwnProperty("total"))
      if (!$util.isInteger(message.total)) return "total: integer expected";
    if (message.code != null && message.hasOwnProperty("code"))
      if (!$util.isInteger(message.code)) return "code: integer expected";
    if (message.message != null && message.hasOwnProperty("message"))
      if (!$util.isString(message.message)) return "message: string expected";
    return null;
  };

  /**
   * Creates a GetSessionListResponse message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof GetSessionListResponse
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {GetSessionListResponse} GetSessionListResponse
   */
  GetSessionListResponse.fromObject = function fromObject(object) {
    if (object instanceof $root.GetSessionListResponse) return object;
    var message = new $root.GetSessionListResponse();
    if (object.sessions) {
      if (!Array.isArray(object.sessions))
        throw TypeError(".GetSessionListResponse.sessions: array expected");
      message.sessions = [];
      for (var i = 0; i < object.sessions.length; ++i) {
        if (typeof object.sessions[i] !== "object")
          throw TypeError(".GetSessionListResponse.sessions: object expected");
        message.sessions[i] = $root.AiChatSession.fromObject(
          object.sessions[i],
        );
      }
    }
    if (object.total != null) message.total = object.total | 0;
    if (object.code != null) message.code = object.code | 0;
    if (object.message != null) message.message = String(object.message);
    return message;
  };

  /**
   * Creates a plain object from a GetSessionListResponse message. Also converts values to other types if specified.
   * @function toObject
   * @memberof GetSessionListResponse
   * @static
   * @param {GetSessionListResponse} message GetSessionListResponse
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  GetSessionListResponse.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.arrays || options.defaults) object.sessions = [];
    if (options.defaults) {
      object.total = 0;
      object.code = 0;
      object.message = "";
    }
    if (message.sessions && message.sessions.length) {
      object.sessions = [];
      for (var j = 0; j < message.sessions.length; ++j)
        object.sessions[j] = $root.AiChatSession.toObject(
          message.sessions[j],
          options,
        );
    }
    if (message.total != null && message.hasOwnProperty("total"))
      object.total = message.total;
    if (message.code != null && message.hasOwnProperty("code"))
      object.code = message.code;
    if (message.message != null && message.hasOwnProperty("message"))
      object.message = message.message;
    return object;
  };

  /**
   * Converts this GetSessionListResponse to JSON.
   * @function toJSON
   * @memberof GetSessionListResponse
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  GetSessionListResponse.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for GetSessionListResponse
   * @function getTypeUrl
   * @memberof GetSessionListResponse
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  GetSessionListResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/GetSessionListResponse";
  };

  return GetSessionListResponse;
})();

$root.GetSessionResponse = (function () {
  /**
   * Properties of a GetSessionResponse.
   * @exports IGetSessionResponse
   * @interface IGetSessionResponse
   * @property {string|null} [sessionId] GetSessionResponse sessionId
   * @property {string|null} [title] GetSessionResponse title
   * @property {string|null} [openid] GetSessionResponse openid
   * @property {Array.<IAiChatMessage>|null} [messages] GetSessionResponse messages
   * @property {number|null} [totalMessages] GetSessionResponse totalMessages
   * @property {number|Long|null} [createdAt] GetSessionResponse createdAt
   * @property {number|Long|null} [lastMessageAt] GetSessionResponse lastMessageAt
   * @property {number|null} [code] GetSessionResponse code
   * @property {string|null} [message] GetSessionResponse message
   */

  /**
   * Constructs a new GetSessionResponse.
   * @exports GetSessionResponse
   * @classdesc Represents a GetSessionResponse.
   * @implements IGetSessionResponse
   * @constructor
   * @param {IGetSessionResponse=} [properties] Properties to set
   */
  function GetSessionResponse(properties) {
    this.messages = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * GetSessionResponse sessionId.
   * @member {string} sessionId
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.sessionId = "";

  /**
   * GetSessionResponse title.
   * @member {string} title
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.title = "";

  /**
   * GetSessionResponse openid.
   * @member {string} openid
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.openid = "";

  /**
   * GetSessionResponse messages.
   * @member {Array.<IAiChatMessage>} messages
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.messages = $util.emptyArray;

  /**
   * GetSessionResponse totalMessages.
   * @member {number} totalMessages
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.totalMessages = 0;

  /**
   * GetSessionResponse createdAt.
   * @member {number|Long} createdAt
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.createdAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * GetSessionResponse lastMessageAt.
   * @member {number|Long} lastMessageAt
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.lastMessageAt = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * GetSessionResponse code.
   * @member {number} code
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.code = 0;

  /**
   * GetSessionResponse message.
   * @member {string} message
   * @memberof GetSessionResponse
   * @instance
   */
  GetSessionResponse.prototype.message = "";

  /**
   * Creates a new GetSessionResponse instance using the specified properties.
   * @function create
   * @memberof GetSessionResponse
   * @static
   * @param {IGetSessionResponse=} [properties] Properties to set
   * @returns {GetSessionResponse} GetSessionResponse instance
   */
  GetSessionResponse.create = function create(properties) {
    return new GetSessionResponse(properties);
  };

  /**
   * Encodes the specified GetSessionResponse message. Does not implicitly {@link GetSessionResponse.verify|verify} messages.
   * @function encode
   * @memberof GetSessionResponse
   * @static
   * @param {IGetSessionResponse} message GetSessionResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  GetSessionResponse.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.sessionId != null &&
      Object.hasOwnProperty.call(message, "sessionId")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.sessionId);
    if (message.title != null && Object.hasOwnProperty.call(message, "title"))
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.title);
    if (message.openid != null && Object.hasOwnProperty.call(message, "openid"))
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.openid);
    if (message.messages != null && message.messages.length)
      for (var i = 0; i < message.messages.length; ++i)
        $root.AiChatMessage.encode(
          message.messages[i],
          writer.uint32(/* id 4, wireType 2 =*/ 34).fork(),
        ).ldelim();
    if (
      message.totalMessages != null &&
      Object.hasOwnProperty.call(message, "totalMessages")
    )
      writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.totalMessages);
    if (
      message.createdAt != null &&
      Object.hasOwnProperty.call(message, "createdAt")
    )
      writer.uint32(/* id 6, wireType 0 =*/ 48).int64(message.createdAt);
    if (
      message.lastMessageAt != null &&
      Object.hasOwnProperty.call(message, "lastMessageAt")
    )
      writer.uint32(/* id 7, wireType 0 =*/ 56).int64(message.lastMessageAt);
    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
      writer.uint32(/* id 8, wireType 0 =*/ 64).int32(message.code);
    if (
      message.message != null &&
      Object.hasOwnProperty.call(message, "message")
    )
      writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.message);
    return writer;
  };

  /**
   * Encodes the specified GetSessionResponse message, length delimited. Does not implicitly {@link GetSessionResponse.verify|verify} messages.
   * @function encodeDelimited
   * @memberof GetSessionResponse
   * @static
   * @param {IGetSessionResponse} message GetSessionResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  GetSessionResponse.encodeDelimited = function encodeDelimited(
    message,
    writer,
  ) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a GetSessionResponse message from the specified reader or buffer.
   * @function decode
   * @memberof GetSessionResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {GetSessionResponse} GetSessionResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  GetSessionResponse.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.GetSessionResponse();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          message.sessionId = reader.string();
          break;
        }
        case 2: {
          message.title = reader.string();
          break;
        }
        case 3: {
          message.openid = reader.string();
          break;
        }
        case 4: {
          if (!(message.messages && message.messages.length))
            message.messages = [];
          message.messages.push(
            $root.AiChatMessage.decode(reader, reader.uint32()),
          );
          break;
        }
        case 5: {
          message.totalMessages = reader.int32();
          break;
        }
        case 6: {
          message.createdAt = reader.int64();
          break;
        }
        case 7: {
          message.lastMessageAt = reader.int64();
          break;
        }
        case 8: {
          message.code = reader.int32();
          break;
        }
        case 9: {
          message.message = reader.string();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a GetSessionResponse message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof GetSessionResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {GetSessionResponse} GetSessionResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  GetSessionResponse.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a GetSessionResponse message.
   * @function verify
   * @memberof GetSessionResponse
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  GetSessionResponse.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      if (!$util.isString(message.sessionId))
        return "sessionId: string expected";
    if (message.title != null && message.hasOwnProperty("title"))
      if (!$util.isString(message.title)) return "title: string expected";
    if (message.openid != null && message.hasOwnProperty("openid"))
      if (!$util.isString(message.openid)) return "openid: string expected";
    if (message.messages != null && message.hasOwnProperty("messages")) {
      if (!Array.isArray(message.messages)) return "messages: array expected";
      for (var i = 0; i < message.messages.length; ++i) {
        var error = $root.AiChatMessage.verify(message.messages[i]);
        if (error) return "messages." + error;
      }
    }
    if (
      message.totalMessages != null &&
      message.hasOwnProperty("totalMessages")
    )
      if (!$util.isInteger(message.totalMessages))
        return "totalMessages: integer expected";
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (
        !$util.isInteger(message.createdAt) &&
        !(
          message.createdAt &&
          $util.isInteger(message.createdAt.low) &&
          $util.isInteger(message.createdAt.high)
        )
      )
        return "createdAt: integer|Long expected";
    if (
      message.lastMessageAt != null &&
      message.hasOwnProperty("lastMessageAt")
    )
      if (
        !$util.isInteger(message.lastMessageAt) &&
        !(
          message.lastMessageAt &&
          $util.isInteger(message.lastMessageAt.low) &&
          $util.isInteger(message.lastMessageAt.high)
        )
      )
        return "lastMessageAt: integer|Long expected";
    if (message.code != null && message.hasOwnProperty("code"))
      if (!$util.isInteger(message.code)) return "code: integer expected";
    if (message.message != null && message.hasOwnProperty("message"))
      if (!$util.isString(message.message)) return "message: string expected";
    return null;
  };

  /**
   * Creates a GetSessionResponse message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof GetSessionResponse
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {GetSessionResponse} GetSessionResponse
   */
  GetSessionResponse.fromObject = function fromObject(object) {
    if (object instanceof $root.GetSessionResponse) return object;
    var message = new $root.GetSessionResponse();
    if (object.sessionId != null) message.sessionId = String(object.sessionId);
    if (object.title != null) message.title = String(object.title);
    if (object.openid != null) message.openid = String(object.openid);
    if (object.messages) {
      if (!Array.isArray(object.messages))
        throw TypeError(".GetSessionResponse.messages: array expected");
      message.messages = [];
      for (var i = 0; i < object.messages.length; ++i) {
        if (typeof object.messages[i] !== "object")
          throw TypeError(".GetSessionResponse.messages: object expected");
        message.messages[i] = $root.AiChatMessage.fromObject(
          object.messages[i],
        );
      }
    }
    if (object.totalMessages != null)
      message.totalMessages = object.totalMessages | 0;
    if (object.createdAt != null)
      if ($util.Long)
        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned =
          false;
      else if (typeof object.createdAt === "string")
        message.createdAt = parseInt(object.createdAt, 10);
      else if (typeof object.createdAt === "number")
        message.createdAt = object.createdAt;
      else if (typeof object.createdAt === "object")
        message.createdAt = new $util.LongBits(
          object.createdAt.low >>> 0,
          object.createdAt.high >>> 0,
        ).toNumber();
    if (object.lastMessageAt != null)
      if ($util.Long)
        (message.lastMessageAt = $util.Long.fromValue(
          object.lastMessageAt,
        )).unsigned = false;
      else if (typeof object.lastMessageAt === "string")
        message.lastMessageAt = parseInt(object.lastMessageAt, 10);
      else if (typeof object.lastMessageAt === "number")
        message.lastMessageAt = object.lastMessageAt;
      else if (typeof object.lastMessageAt === "object")
        message.lastMessageAt = new $util.LongBits(
          object.lastMessageAt.low >>> 0,
          object.lastMessageAt.high >>> 0,
        ).toNumber();
    if (object.code != null) message.code = object.code | 0;
    if (object.message != null) message.message = String(object.message);
    return message;
  };

  /**
   * Creates a plain object from a GetSessionResponse message. Also converts values to other types if specified.
   * @function toObject
   * @memberof GetSessionResponse
   * @static
   * @param {GetSessionResponse} message GetSessionResponse
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  GetSessionResponse.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.arrays || options.defaults) object.messages = [];
    if (options.defaults) {
      object.sessionId = "";
      object.title = "";
      object.openid = "";
      object.totalMessages = 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.createdAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.createdAt = options.longs === String ? "0" : 0;
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.lastMessageAt =
          options.longs === String
            ? long.toString()
            : options.longs === Number
              ? long.toNumber()
              : long;
      } else object.lastMessageAt = options.longs === String ? "0" : 0;
      object.code = 0;
      object.message = "";
    }
    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
      object.sessionId = message.sessionId;
    if (message.title != null && message.hasOwnProperty("title"))
      object.title = message.title;
    if (message.openid != null && message.hasOwnProperty("openid"))
      object.openid = message.openid;
    if (message.messages && message.messages.length) {
      object.messages = [];
      for (var j = 0; j < message.messages.length; ++j)
        object.messages[j] = $root.AiChatMessage.toObject(
          message.messages[j],
          options,
        );
    }
    if (
      message.totalMessages != null &&
      message.hasOwnProperty("totalMessages")
    )
      object.totalMessages = message.totalMessages;
    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
      if (typeof message.createdAt === "number")
        object.createdAt =
          options.longs === String
            ? String(message.createdAt)
            : message.createdAt;
      else
        object.createdAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.createdAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.createdAt.low >>> 0,
                  message.createdAt.high >>> 0,
                ).toNumber()
              : message.createdAt;
    if (
      message.lastMessageAt != null &&
      message.hasOwnProperty("lastMessageAt")
    )
      if (typeof message.lastMessageAt === "number")
        object.lastMessageAt =
          options.longs === String
            ? String(message.lastMessageAt)
            : message.lastMessageAt;
      else
        object.lastMessageAt =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.lastMessageAt)
            : options.longs === Number
              ? new $util.LongBits(
                  message.lastMessageAt.low >>> 0,
                  message.lastMessageAt.high >>> 0,
                ).toNumber()
              : message.lastMessageAt;
    if (message.code != null && message.hasOwnProperty("code"))
      object.code = message.code;
    if (message.message != null && message.hasOwnProperty("message"))
      object.message = message.message;
    return object;
  };

  /**
   * Converts this GetSessionResponse to JSON.
   * @function toJSON
   * @memberof GetSessionResponse
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  GetSessionResponse.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for GetSessionResponse
   * @function getTypeUrl
   * @memberof GetSessionResponse
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  GetSessionResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/GetSessionResponse";
  };

  return GetSessionResponse;
})();

module.exports = $root;
