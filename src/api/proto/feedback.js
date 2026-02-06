/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

import * as $protobuf from "protobufjs";

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.feedback_api = (function () {
  /**
   * Namespace feedback_api.
   * @exports feedback_api
   * @namespace
   */
  var feedback_api = {};

  feedback_api.Feedback = (function () {
    /**
     * Properties of a Feedback.
     * @memberof feedback_api
     * @interface IFeedback
     * @property {number|null} [id] Feedback id
     * @property {string|null} [type] Feedback type
     * @property {string|null} [content] Feedback content
     * @property {string|null} [phone] Feedback phone
     * @property {number|Long|null} [createdTime] Feedback createdTime
     */

    /**
     * Constructs a new Feedback.
     * @memberof feedback_api
     * @classdesc Represents a Feedback.
     * @implements IFeedback
     * @constructor
     * @param {feedback_api.IFeedback=} [properties] Properties to set
     */
    function Feedback(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Feedback id.
     * @member {number} id
     * @memberof feedback_api.Feedback
     * @instance
     */
    Feedback.prototype.id = 0;

    /**
     * Feedback type.
     * @member {string} type
     * @memberof feedback_api.Feedback
     * @instance
     */
    Feedback.prototype.type = "";

    /**
     * Feedback content.
     * @member {string} content
     * @memberof feedback_api.Feedback
     * @instance
     */
    Feedback.prototype.content = "";

    /**
     * Feedback phone.
     * @member {string|null|undefined} phone
     * @memberof feedback_api.Feedback
     * @instance
     */
    Feedback.prototype.phone = null;

    /**
     * Feedback createdTime.
     * @member {number|Long} createdTime
     * @memberof feedback_api.Feedback
     * @instance
     */
    Feedback.prototype.createdTime = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Feedback _phone.
     * @member {"phone"|undefined} _phone
     * @memberof feedback_api.Feedback
     * @instance
     */
    Object.defineProperty(Feedback.prototype, "_phone", {
      get: $util.oneOfGetter(($oneOfFields = ["phone"])),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new Feedback instance using the specified properties.
     * @function create
     * @memberof feedback_api.Feedback
     * @static
     * @param {feedback_api.IFeedback=} [properties] Properties to set
     * @returns {feedback_api.Feedback} Feedback instance
     */
    Feedback.create = function create(properties) {
      return new Feedback(properties);
    };

    /**
     * Encodes the specified Feedback message. Does not implicitly {@link feedback_api.Feedback.verify|verify} messages.
     * @function encode
     * @memberof feedback_api.Feedback
     * @static
     * @param {feedback_api.IFeedback} message Feedback message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Feedback.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.id != null && Object.hasOwnProperty.call(message, "id"))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.id);
      if (message.type != null && Object.hasOwnProperty.call(message, "type"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.type);
      if (
        message.content != null &&
        Object.hasOwnProperty.call(message, "content")
      )
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.content);
      if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.phone);
      if (
        message.createdTime != null &&
        Object.hasOwnProperty.call(message, "createdTime")
      )
        writer.uint32(/* id 5, wireType 0 =*/ 40).int64(message.createdTime);
      return writer;
    };

    /**
     * Encodes the specified Feedback message, length delimited. Does not implicitly {@link feedback_api.Feedback.verify|verify} messages.
     * @function encodeDelimited
     * @memberof feedback_api.Feedback
     * @static
     * @param {feedback_api.IFeedback} message Feedback message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Feedback.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Feedback message from the specified reader or buffer.
     * @function decode
     * @memberof feedback_api.Feedback
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {feedback_api.Feedback} Feedback
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Feedback.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.feedback_api.Feedback();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.id = reader.int32();
            break;
          case 2:
            message.type = reader.string();
            break;
          case 3:
            message.content = reader.string();
            break;
          case 4:
            message.phone = reader.string();
            break;
          case 5:
            message.createdTime = reader.int64();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Feedback message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof feedback_api.Feedback
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {feedback_api.Feedback} Feedback
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Feedback.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Feedback message.
     * @function verify
     * @memberof feedback_api.Feedback
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Feedback.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      var properties = {};
      if (message.id != null && message.hasOwnProperty("id"))
        if (!$util.isInteger(message.id)) return "id: integer expected";
      if (message.type != null && message.hasOwnProperty("type"))
        if (!$util.isString(message.type)) return "type: string expected";
      if (message.content != null && message.hasOwnProperty("content"))
        if (!$util.isString(message.content)) return "content: string expected";
      if (message.phone != null && message.hasOwnProperty("phone")) {
        properties._phone = 1;
        if (!$util.isString(message.phone)) return "phone: string expected";
      }
      if (message.createdTime != null && message.hasOwnProperty("createdTime"))
        if (
          !$util.isInteger(message.createdTime) &&
          !(
            message.createdTime &&
            $util.isInteger(message.createdTime.low) &&
            $util.isInteger(message.createdTime.high)
          )
        )
          return "createdTime: integer|Long expected";
      return null;
    };

    /**
     * Creates a Feedback message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof feedback_api.Feedback
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {feedback_api.Feedback} Feedback
     */
    Feedback.fromObject = function fromObject(object) {
      if (object instanceof $root.feedback_api.Feedback) return object;
      var message = new $root.feedback_api.Feedback();
      if (object.id != null) message.id = object.id | 0;
      if (object.type != null) message.type = String(object.type);
      if (object.content != null) message.content = String(object.content);
      if (object.phone != null) message.phone = String(object.phone);
      if (object.createdTime != null)
        if ($util.Long)
          (message.createdTime = $util.Long.fromValue(
            object.createdTime,
          )).unsigned = false;
        else if (typeof object.createdTime === "string")
          message.createdTime = parseInt(object.createdTime, 10);
        else if (typeof object.createdTime === "number")
          message.createdTime = object.createdTime;
        else if (typeof object.createdTime === "object")
          message.createdTime = new $util.LongBits(
            object.createdTime.low >>> 0,
            object.createdTime.high >>> 0,
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a Feedback message. Also converts values to other types if specified.
     * @function toObject
     * @memberof feedback_api.Feedback
     * @static
     * @param {feedback_api.Feedback} message Feedback
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Feedback.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.id = 0;
        object.type = "";
        object.content = "";
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.createdTime =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.createdTime = options.longs === String ? "0" : 0;
      }
      if (message.id != null && message.hasOwnProperty("id"))
        object.id = message.id;
      if (message.type != null && message.hasOwnProperty("type"))
        object.type = message.type;
      if (message.content != null && message.hasOwnProperty("content"))
        object.content = message.content;
      if (message.phone != null && message.hasOwnProperty("phone")) {
        object.phone = message.phone;
        if (options.oneofs) object._phone = "phone";
      }
      if (message.createdTime != null && message.hasOwnProperty("createdTime"))
        if (typeof message.createdTime === "number")
          object.createdTime =
            options.longs === String
              ? String(message.createdTime)
              : message.createdTime;
        else
          object.createdTime =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.createdTime)
              : options.longs === Number
                ? new $util.LongBits(
                    message.createdTime.low >>> 0,
                    message.createdTime.high >>> 0,
                  ).toNumber()
                : message.createdTime;
      return object;
    };

    /**
     * Converts this Feedback to JSON.
     * @function toJSON
     * @memberof feedback_api.Feedback
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Feedback.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Feedback;
  })();

  feedback_api.FeedbackRequest = (function () {
    /**
     * Properties of a FeedbackRequest.
     * @memberof feedback_api
     * @interface IFeedbackRequest
     * @property {string|null} [type] FeedbackRequest type
     * @property {string|null} [content] FeedbackRequest content
     * @property {string|null} [phone] FeedbackRequest phone
     */

    /**
     * Constructs a new FeedbackRequest.
     * @memberof feedback_api
     * @classdesc Represents a FeedbackRequest.
     * @implements IFeedbackRequest
     * @constructor
     * @param {feedback_api.IFeedbackRequest=} [properties] Properties to set
     */
    function FeedbackRequest(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * FeedbackRequest type.
     * @member {string} type
     * @memberof feedback_api.FeedbackRequest
     * @instance
     */
    FeedbackRequest.prototype.type = "";

    /**
     * FeedbackRequest content.
     * @member {string} content
     * @memberof feedback_api.FeedbackRequest
     * @instance
     */
    FeedbackRequest.prototype.content = "";

    /**
     * FeedbackRequest phone.
     * @member {string|null|undefined} phone
     * @memberof feedback_api.FeedbackRequest
     * @instance
     */
    FeedbackRequest.prototype.phone = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * FeedbackRequest _phone.
     * @member {"phone"|undefined} _phone
     * @memberof feedback_api.FeedbackRequest
     * @instance
     */
    Object.defineProperty(FeedbackRequest.prototype, "_phone", {
      get: $util.oneOfGetter(($oneOfFields = ["phone"])),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new FeedbackRequest instance using the specified properties.
     * @function create
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {feedback_api.IFeedbackRequest=} [properties] Properties to set
     * @returns {feedback_api.FeedbackRequest} FeedbackRequest instance
     */
    FeedbackRequest.create = function create(properties) {
      return new FeedbackRequest(properties);
    };

    /**
     * Encodes the specified FeedbackRequest message. Does not implicitly {@link feedback_api.FeedbackRequest.verify|verify} messages.
     * @function encode
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {feedback_api.IFeedbackRequest} message FeedbackRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.type != null && Object.hasOwnProperty.call(message, "type"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.type);
      if (
        message.content != null &&
        Object.hasOwnProperty.call(message, "content")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.content);
      if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.phone);
      return writer;
    };

    /**
     * Encodes the specified FeedbackRequest message, length delimited. Does not implicitly {@link feedback_api.FeedbackRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {feedback_api.IFeedbackRequest} message FeedbackRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackRequest.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FeedbackRequest message from the specified reader or buffer.
     * @function decode
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {feedback_api.FeedbackRequest} FeedbackRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackRequest.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.feedback_api.FeedbackRequest();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.string();
            break;
          case 2:
            message.content = reader.string();
            break;
          case 3:
            message.phone = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a FeedbackRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {feedback_api.FeedbackRequest} FeedbackRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackRequest.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FeedbackRequest message.
     * @function verify
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FeedbackRequest.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      var properties = {};
      if (message.type != null && message.hasOwnProperty("type"))
        if (!$util.isString(message.type)) return "type: string expected";
      if (message.content != null && message.hasOwnProperty("content"))
        if (!$util.isString(message.content)) return "content: string expected";
      if (message.phone != null && message.hasOwnProperty("phone")) {
        properties._phone = 1;
        if (!$util.isString(message.phone)) return "phone: string expected";
      }
      return null;
    };

    /**
     * Creates a FeedbackRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {feedback_api.FeedbackRequest} FeedbackRequest
     */
    FeedbackRequest.fromObject = function fromObject(object) {
      if (object instanceof $root.feedback_api.FeedbackRequest) return object;
      var message = new $root.feedback_api.FeedbackRequest();
      if (object.type != null) message.type = String(object.type);
      if (object.content != null) message.content = String(object.content);
      if (object.phone != null) message.phone = String(object.phone);
      return message;
    };

    /**
     * Creates a plain object from a FeedbackRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof feedback_api.FeedbackRequest
     * @static
     * @param {feedback_api.FeedbackRequest} message FeedbackRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FeedbackRequest.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.type = "";
        object.content = "";
      }
      if (message.type != null && message.hasOwnProperty("type"))
        object.type = message.type;
      if (message.content != null && message.hasOwnProperty("content"))
        object.content = message.content;
      if (message.phone != null && message.hasOwnProperty("phone")) {
        object.phone = message.phone;
        if (options.oneofs) object._phone = "phone";
      }
      return object;
    };

    /**
     * Converts this FeedbackRequest to JSON.
     * @function toJSON
     * @memberof feedback_api.FeedbackRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FeedbackRequest.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FeedbackRequest;
  })();

  feedback_api.FeedbackResponse = (function () {
    /**
     * Properties of a FeedbackResponse.
     * @memberof feedback_api
     * @interface IFeedbackResponse
     * @property {feedback_api.IFeedback|null} [feedback] FeedbackResponse feedback
     * @property {number|null} [code] FeedbackResponse code
     * @property {string|null} [message] FeedbackResponse message
     */

    /**
     * Constructs a new FeedbackResponse.
     * @memberof feedback_api
     * @classdesc Represents a FeedbackResponse.
     * @implements IFeedbackResponse
     * @constructor
     * @param {feedback_api.IFeedbackResponse=} [properties] Properties to set
     */
    function FeedbackResponse(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * FeedbackResponse feedback.
     * @member {feedback_api.IFeedback|null|undefined} feedback
     * @memberof feedback_api.FeedbackResponse
     * @instance
     */
    FeedbackResponse.prototype.feedback = null;

    /**
     * FeedbackResponse code.
     * @member {number} code
     * @memberof feedback_api.FeedbackResponse
     * @instance
     */
    FeedbackResponse.prototype.code = 0;

    /**
     * FeedbackResponse message.
     * @member {string} message
     * @memberof feedback_api.FeedbackResponse
     * @instance
     */
    FeedbackResponse.prototype.message = "";

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * FeedbackResponse _feedback.
     * @member {"feedback"|undefined} _feedback
     * @memberof feedback_api.FeedbackResponse
     * @instance
     */
    Object.defineProperty(FeedbackResponse.prototype, "_feedback", {
      get: $util.oneOfGetter(($oneOfFields = ["feedback"])),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new FeedbackResponse instance using the specified properties.
     * @function create
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {feedback_api.IFeedbackResponse=} [properties] Properties to set
     * @returns {feedback_api.FeedbackResponse} FeedbackResponse instance
     */
    FeedbackResponse.create = function create(properties) {
      return new FeedbackResponse(properties);
    };

    /**
     * Encodes the specified FeedbackResponse message. Does not implicitly {@link feedback_api.FeedbackResponse.verify|verify} messages.
     * @function encode
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {feedback_api.IFeedbackResponse} message FeedbackResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.feedback != null &&
        Object.hasOwnProperty.call(message, "feedback")
      )
        $root.feedback_api.Feedback.encode(
          message.feedback,
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
        ).ldelim();
      if (message.code != null && Object.hasOwnProperty.call(message, "code"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.code);
      if (
        message.message != null &&
        Object.hasOwnProperty.call(message, "message")
      )
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.message);
      return writer;
    };

    /**
     * Encodes the specified FeedbackResponse message, length delimited. Does not implicitly {@link feedback_api.FeedbackResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {feedback_api.IFeedbackResponse} message FeedbackResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackResponse.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FeedbackResponse message from the specified reader or buffer.
     * @function decode
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {feedback_api.FeedbackResponse} FeedbackResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.feedback_api.FeedbackResponse();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.feedback = $root.feedback_api.Feedback.decode(
              reader,
              reader.uint32(),
            );
            break;
          case 2:
            message.code = reader.int32();
            break;
          case 3:
            message.message = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a FeedbackResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {feedback_api.FeedbackResponse} FeedbackResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FeedbackResponse message.
     * @function verify
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FeedbackResponse.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      var properties = {};
      if (message.feedback != null && message.hasOwnProperty("feedback")) {
        properties._feedback = 1;
        {
          var error = $root.feedback_api.Feedback.verify(message.feedback);
          if (error) return "feedback." + error;
        }
      }
      if (message.code != null && message.hasOwnProperty("code"))
        if (!$util.isInteger(message.code)) return "code: integer expected";
      if (message.message != null && message.hasOwnProperty("message"))
        if (!$util.isString(message.message)) return "message: string expected";
      return null;
    };

    /**
     * Creates a FeedbackResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {feedback_api.FeedbackResponse} FeedbackResponse
     */
    FeedbackResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.feedback_api.FeedbackResponse) return object;
      var message = new $root.feedback_api.FeedbackResponse();
      if (object.feedback != null) {
        if (typeof object.feedback !== "object")
          throw TypeError(
            ".feedback_api.FeedbackResponse.feedback: object expected",
          );
        message.feedback = $root.feedback_api.Feedback.fromObject(
          object.feedback,
        );
      }
      if (object.code != null) message.code = object.code | 0;
      if (object.message != null) message.message = String(object.message);
      return message;
    };

    /**
     * Creates a plain object from a FeedbackResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof feedback_api.FeedbackResponse
     * @static
     * @param {feedback_api.FeedbackResponse} message FeedbackResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FeedbackResponse.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.code = 0;
        object.message = "";
      }
      if (message.feedback != null && message.hasOwnProperty("feedback")) {
        object.feedback = $root.feedback_api.Feedback.toObject(
          message.feedback,
          options,
        );
        if (options.oneofs) object._feedback = "feedback";
      }
      if (message.code != null && message.hasOwnProperty("code"))
        object.code = message.code;
      if (message.message != null && message.hasOwnProperty("message"))
        object.message = message.message;
      return object;
    };

    /**
     * Converts this FeedbackResponse to JSON.
     * @function toJSON
     * @memberof feedback_api.FeedbackResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FeedbackResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FeedbackResponse;
  })();

  feedback_api.FeedbackExportRequest = (function () {
    /**
     * Properties of a FeedbackExportRequest.
     * @memberof feedback_api
     * @interface IFeedbackExportRequest
     * @property {number|Long|null} [startTime] FeedbackExportRequest startTime
     * @property {number|Long|null} [endTime] FeedbackExportRequest endTime
     */

    /**
     * Constructs a new FeedbackExportRequest.
     * @memberof feedback_api
     * @classdesc Represents a FeedbackExportRequest.
     * @implements IFeedbackExportRequest
     * @constructor
     * @param {feedback_api.IFeedbackExportRequest=} [properties] Properties to set
     */
    function FeedbackExportRequest(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * FeedbackExportRequest startTime.
     * @member {number|Long} startTime
     * @memberof feedback_api.FeedbackExportRequest
     * @instance
     */
    FeedbackExportRequest.prototype.startTime = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * FeedbackExportRequest endTime.
     * @member {number|Long} endTime
     * @memberof feedback_api.FeedbackExportRequest
     * @instance
     */
    FeedbackExportRequest.prototype.endTime = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * Creates a new FeedbackExportRequest instance using the specified properties.
     * @function create
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {feedback_api.IFeedbackExportRequest=} [properties] Properties to set
     * @returns {feedback_api.FeedbackExportRequest} FeedbackExportRequest instance
     */
    FeedbackExportRequest.create = function create(properties) {
      return new FeedbackExportRequest(properties);
    };

    /**
     * Encodes the specified FeedbackExportRequest message. Does not implicitly {@link feedback_api.FeedbackExportRequest.verify|verify} messages.
     * @function encode
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {feedback_api.IFeedbackExportRequest} message FeedbackExportRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackExportRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.startTime != null &&
        Object.hasOwnProperty.call(message, "startTime")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.startTime);
      if (
        message.endTime != null &&
        Object.hasOwnProperty.call(message, "endTime")
      )
        writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.endTime);
      return writer;
    };

    /**
     * Encodes the specified FeedbackExportRequest message, length delimited. Does not implicitly {@link feedback_api.FeedbackExportRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {feedback_api.IFeedbackExportRequest} message FeedbackExportRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackExportRequest.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FeedbackExportRequest message from the specified reader or buffer.
     * @function decode
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {feedback_api.FeedbackExportRequest} FeedbackExportRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackExportRequest.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.feedback_api.FeedbackExportRequest();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.startTime = reader.int64();
            break;
          case 2:
            message.endTime = reader.int64();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a FeedbackExportRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {feedback_api.FeedbackExportRequest} FeedbackExportRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackExportRequest.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FeedbackExportRequest message.
     * @function verify
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FeedbackExportRequest.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.startTime != null && message.hasOwnProperty("startTime"))
        if (
          !$util.isInteger(message.startTime) &&
          !(
            message.startTime &&
            $util.isInteger(message.startTime.low) &&
            $util.isInteger(message.startTime.high)
          )
        )
          return "startTime: integer|Long expected";
      if (message.endTime != null && message.hasOwnProperty("endTime"))
        if (
          !$util.isInteger(message.endTime) &&
          !(
            message.endTime &&
            $util.isInteger(message.endTime.low) &&
            $util.isInteger(message.endTime.high)
          )
        )
          return "endTime: integer|Long expected";
      return null;
    };

    /**
     * Creates a FeedbackExportRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {feedback_api.FeedbackExportRequest} FeedbackExportRequest
     */
    FeedbackExportRequest.fromObject = function fromObject(object) {
      if (object instanceof $root.feedback_api.FeedbackExportRequest)
        return object;
      var message = new $root.feedback_api.FeedbackExportRequest();
      if (object.startTime != null)
        if ($util.Long)
          (message.startTime = $util.Long.fromValue(
            object.startTime,
          )).unsigned = false;
        else if (typeof object.startTime === "string")
          message.startTime = parseInt(object.startTime, 10);
        else if (typeof object.startTime === "number")
          message.startTime = object.startTime;
        else if (typeof object.startTime === "object")
          message.startTime = new $util.LongBits(
            object.startTime.low >>> 0,
            object.startTime.high >>> 0,
          ).toNumber();
      if (object.endTime != null)
        if ($util.Long)
          (message.endTime = $util.Long.fromValue(object.endTime)).unsigned =
            false;
        else if (typeof object.endTime === "string")
          message.endTime = parseInt(object.endTime, 10);
        else if (typeof object.endTime === "number")
          message.endTime = object.endTime;
        else if (typeof object.endTime === "object")
          message.endTime = new $util.LongBits(
            object.endTime.low >>> 0,
            object.endTime.high >>> 0,
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a FeedbackExportRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof feedback_api.FeedbackExportRequest
     * @static
     * @param {feedback_api.FeedbackExportRequest} message FeedbackExportRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FeedbackExportRequest.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.startTime =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.startTime = options.longs === String ? "0" : 0;
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.endTime =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long;
        } else object.endTime = options.longs === String ? "0" : 0;
      }
      if (message.startTime != null && message.hasOwnProperty("startTime"))
        if (typeof message.startTime === "number")
          object.startTime =
            options.longs === String
              ? String(message.startTime)
              : message.startTime;
        else
          object.startTime =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.startTime)
              : options.longs === Number
                ? new $util.LongBits(
                    message.startTime.low >>> 0,
                    message.startTime.high >>> 0,
                  ).toNumber()
                : message.startTime;
      if (message.endTime != null && message.hasOwnProperty("endTime"))
        if (typeof message.endTime === "number")
          object.endTime =
            options.longs === String
              ? String(message.endTime)
              : message.endTime;
        else
          object.endTime =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.endTime)
              : options.longs === Number
                ? new $util.LongBits(
                    message.endTime.low >>> 0,
                    message.endTime.high >>> 0,
                  ).toNumber()
                : message.endTime;
      return object;
    };

    /**
     * Converts this FeedbackExportRequest to JSON.
     * @function toJSON
     * @memberof feedback_api.FeedbackExportRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FeedbackExportRequest.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FeedbackExportRequest;
  })();

  feedback_api.FeedbackExportResponse = (function () {
    /**
     * Properties of a FeedbackExportResponse.
     * @memberof feedback_api
     * @interface IFeedbackExportResponse
     */

    /**
     * Constructs a new FeedbackExportResponse.
     * @memberof feedback_api
     * @classdesc Represents a FeedbackExportResponse.
     * @implements IFeedbackExportResponse
     * @constructor
     * @param {feedback_api.IFeedbackExportResponse=} [properties] Properties to set
     */
    function FeedbackExportResponse(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new FeedbackExportResponse instance using the specified properties.
     * @function create
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {feedback_api.IFeedbackExportResponse=} [properties] Properties to set
     * @returns {feedback_api.FeedbackExportResponse} FeedbackExportResponse instance
     */
    FeedbackExportResponse.create = function create(properties) {
      return new FeedbackExportResponse(properties);
    };

    /**
     * Encodes the specified FeedbackExportResponse message. Does not implicitly {@link feedback_api.FeedbackExportResponse.verify|verify} messages.
     * @function encode
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {feedback_api.IFeedbackExportResponse} message FeedbackExportResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackExportResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      return writer;
    };

    /**
     * Encodes the specified FeedbackExportResponse message, length delimited. Does not implicitly {@link feedback_api.FeedbackExportResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {feedback_api.IFeedbackExportResponse} message FeedbackExportResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FeedbackExportResponse.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FeedbackExportResponse message from the specified reader or buffer.
     * @function decode
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {feedback_api.FeedbackExportResponse} FeedbackExportResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackExportResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.feedback_api.FeedbackExportResponse();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a FeedbackExportResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {feedback_api.FeedbackExportResponse} FeedbackExportResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FeedbackExportResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FeedbackExportResponse message.
     * @function verify
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FeedbackExportResponse.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      return null;
    };

    /**
     * Creates a FeedbackExportResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {feedback_api.FeedbackExportResponse} FeedbackExportResponse
     */
    FeedbackExportResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.feedback_api.FeedbackExportResponse)
        return object;
      return new $root.feedback_api.FeedbackExportResponse();
    };

    /**
     * Creates a plain object from a FeedbackExportResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof feedback_api.FeedbackExportResponse
     * @static
     * @param {feedback_api.FeedbackExportResponse} message FeedbackExportResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FeedbackExportResponse.toObject = function toObject() {
      return {};
    };

    /**
     * Converts this FeedbackExportResponse to JSON.
     * @function toJSON
     * @memberof feedback_api.FeedbackExportResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FeedbackExportResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FeedbackExportResponse;
  })();

  feedback_api.FeedbackService = (function () {
    /**
     * Constructs a new FeedbackService service.
     * @memberof feedback_api
     * @classdesc Represents a FeedbackService
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function FeedbackService(rpcImpl, requestDelimited, responseDelimited) {
      $protobuf.rpc.Service.call(
        this,
        rpcImpl,
        requestDelimited,
        responseDelimited,
      );
    }

    (FeedbackService.prototype = Object.create(
      $protobuf.rpc.Service.prototype,
    )).constructor = FeedbackService;

    /**
     * Creates new FeedbackService service using the specified rpc implementation.
     * @function create
     * @memberof feedback_api.FeedbackService
     * @static
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     * @returns {FeedbackService} RPC service. Useful where requests and/or responses are streamed.
     */
    FeedbackService.create = function create(
      rpcImpl,
      requestDelimited,
      responseDelimited,
    ) {
      return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link feedback_api.FeedbackService#submitFeedback}.
     * @memberof feedback_api.FeedbackService
     * @typedef SubmitFeedbackCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {feedback_api.FeedbackResponse} [response] FeedbackResponse
     */

    /**
     * Calls SubmitFeedback.
     * @function submitFeedback
     * @memberof feedback_api.FeedbackService
     * @instance
     * @param {feedback_api.IFeedbackRequest} request FeedbackRequest message or plain object
     * @param {feedback_api.FeedbackService.SubmitFeedbackCallback} callback Node-style callback called with the error, if any, and FeedbackResponse
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(
      (FeedbackService.prototype.submitFeedback = function submitFeedback(
        request,
        callback,
      ) {
        return this.rpcCall(
          submitFeedback,
          $root.feedback_api.FeedbackRequest,
          $root.feedback_api.FeedbackResponse,
          request,
          callback,
        );
      }),
      "name",
      { value: "SubmitFeedback" },
    );

    /**
     * Calls SubmitFeedback.
     * @function submitFeedback
     * @memberof feedback_api.FeedbackService
     * @instance
     * @param {feedback_api.IFeedbackRequest} request FeedbackRequest message or plain object
     * @returns {Promise<feedback_api.FeedbackResponse>} Promise
     * @variation 2
     */

    /**
     * Callback as used by {@link feedback_api.FeedbackService#exportFeedback}.
     * @memberof feedback_api.FeedbackService
     * @typedef ExportFeedbackCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {feedback_api.FeedbackExportResponse} [response] FeedbackExportResponse
     */

    /**
     * Calls ExportFeedback.
     * @function exportFeedback
     * @memberof feedback_api.FeedbackService
     * @instance
     * @param {feedback_api.IFeedbackExportRequest} request FeedbackExportRequest message or plain object
     * @param {feedback_api.FeedbackService.ExportFeedbackCallback} callback Node-style callback called with the error, if any, and FeedbackExportResponse
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(
      (FeedbackService.prototype.exportFeedback = function exportFeedback(
        request,
        callback,
      ) {
        return this.rpcCall(
          exportFeedback,
          $root.feedback_api.FeedbackExportRequest,
          $root.feedback_api.FeedbackExportResponse,
          request,
          callback,
        );
      }),
      "name",
      { value: "ExportFeedback" },
    );

    /**
     * Calls ExportFeedback.
     * @function exportFeedback
     * @memberof feedback_api.FeedbackService
     * @instance
     * @param {feedback_api.IFeedbackExportRequest} request FeedbackExportRequest message or plain object
     * @returns {Promise<feedback_api.FeedbackExportResponse>} Promise
     * @variation 2
     */

    return FeedbackService;
  })();

  return feedback_api;
})();

module.exports = $root;
