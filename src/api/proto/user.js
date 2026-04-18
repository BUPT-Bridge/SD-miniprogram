/* eslint-disable */
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.api = (function () {
  /**
   * Namespace api.
   * @exports api
   * @namespace
   */
  var api = $root.api || {};

  api.user = (function () {
    /**
     * Namespace user.
     * @memberof api
     * @namespace
     */
    var user = {};

    user.User = (function () {
      /**
       * Properties of a User.
       * @memberof api.user
       * @interface IUser
       * @property {string|null} [token] User token
       * @property {string|null} [nickname] User nickname
       * @property {string|null} [name] User name
       * @property {string|null} [phoneNumber] User phoneNumber
       * @property {string|null} [address] User address
       * @property {string|null} [community] User community
       * @property {string|null} [isImportant] User isImportant
       * @property {string|null} [avatar] User avatar
       * @property {string|null} [permission] User permission
       * @property {string|null} [xApiKey] User xApiKey
       */

      /**
       * Constructs a new User.
       * @memberof api.user
       * @classdesc Represents a User.
       * @implements IUser
       * @constructor
       * @param {api.user.IUser=} [properties] Properties to set
       */
      function User(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * User token.
       * @member {string|null|undefined} token
       * @memberof api.user.User
       * @instance
       */
      User.prototype.token = null;

      /**
       * User nickname.
       * @member {string|null|undefined} nickname
       * @memberof api.user.User
       * @instance
       */
      User.prototype.nickname = null;

      /**
       * User name.
       * @member {string|null|undefined} name
       * @memberof api.user.User
       * @instance
       */
      User.prototype.name = null;

      /**
       * User phoneNumber.
       * @member {string|null|undefined} phoneNumber
       * @memberof api.user.User
       * @instance
       */
      User.prototype.phoneNumber = null;

      /**
       * User address.
       * @member {string|null|undefined} address
       * @memberof api.user.User
       * @instance
       */
      User.prototype.address = null;

      /**
       * User community.
       * @member {string|null|undefined} community
       * @memberof api.user.User
       * @instance
       */
      User.prototype.community = null;

      /**
       * User isImportant.
       * @member {string|null|undefined} isImportant
       * @memberof api.user.User
       * @instance
       */
      User.prototype.isImportant = null;

      /**
       * User avatar.
       * @member {string|null|undefined} avatar
       * @memberof api.user.User
       * @instance
       */
      User.prototype.avatar = null;

      /**
       * User permission.
       * @member {string|null|undefined} permission
       * @memberof api.user.User
       * @instance
       */
      User.prototype.permission = null;

      /**
       * User xApiKey.
       * @member {string|null|undefined} xApiKey
       * @memberof api.user.User
       * @instance
       */
      User.prototype.xApiKey = null;

      // OneOf field names bound to virtual getters and setters
      var $oneOfFields;

      /**
       * User _token.
       * @member {"token"|undefined} _token
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_token", {
        get: $util.oneOfGetter(($oneOfFields = ["token"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _nickname.
       * @member {"nickname"|undefined} _nickname
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_nickname", {
        get: $util.oneOfGetter(($oneOfFields = ["nickname"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _name.
       * @member {"name"|undefined} _name
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_name", {
        get: $util.oneOfGetter(($oneOfFields = ["name"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _phoneNumber.
       * @member {"phoneNumber"|undefined} _phoneNumber
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_phoneNumber", {
        get: $util.oneOfGetter(($oneOfFields = ["phoneNumber"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _address.
       * @member {"address"|undefined} _address
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_address", {
        get: $util.oneOfGetter(($oneOfFields = ["address"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _community.
       * @member {"community"|undefined} _community
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_community", {
        get: $util.oneOfGetter(($oneOfFields = ["community"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _isImportant.
       * @member {"isImportant"|undefined} _isImportant
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_isImportant", {
        get: $util.oneOfGetter(($oneOfFields = ["isImportant"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _avatar.
       * @member {"avatar"|undefined} _avatar
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_avatar", {
        get: $util.oneOfGetter(($oneOfFields = ["avatar"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _permission.
       * @member {"permission"|undefined} _permission
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_permission", {
        get: $util.oneOfGetter(($oneOfFields = ["permission"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * User _xApiKey.
       * @member {"xApiKey"|undefined} _xApiKey
       * @memberof api.user.User
       * @instance
       */
      Object.defineProperty(User.prototype, "_xApiKey", {
        get: $util.oneOfGetter(($oneOfFields = ["xApiKey"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * Creates a new User instance using the specified properties.
       * @function create
       * @memberof api.user.User
       * @static
       * @param {api.user.IUser=} [properties] Properties to set
       * @returns {api.user.User} User instance
       */
      User.create = function create(properties) {
        return new User(properties);
      };

      /**
       * Encodes the specified User message. Does not implicitly {@link api.user.User.verify|verify} messages.
       * @function encode
       * @memberof api.user.User
       * @static
       * @param {api.user.IUser} message User message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      User.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.token != null &&
          Object.hasOwnProperty.call(message, "token")
        )
          writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.token);
        if (
          message.nickname != null &&
          Object.hasOwnProperty.call(message, "nickname")
        )
          writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.nickname);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.name);
        if (
          message.phoneNumber != null &&
          Object.hasOwnProperty.call(message, "phoneNumber")
        )
          writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.phoneNumber);
        if (
          message.address != null &&
          Object.hasOwnProperty.call(message, "address")
        )
          writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.address);
        if (
          message.community != null &&
          Object.hasOwnProperty.call(message, "community")
        )
          writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.community);
        if (
          message.isImportant != null &&
          Object.hasOwnProperty.call(message, "isImportant")
        )
          writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.isImportant);
        if (
          message.avatar != null &&
          Object.hasOwnProperty.call(message, "avatar")
        )
          writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.avatar);
        if (
          message.permission != null &&
          Object.hasOwnProperty.call(message, "permission")
        )
          writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.permission);
        if (
          message.xApiKey != null &&
          Object.hasOwnProperty.call(message, "xApiKey")
        )
          writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.xApiKey);
        return writer;
      };

      /**
       * Encodes the specified User message, length delimited. Does not implicitly {@link api.user.User.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.user.User
       * @static
       * @param {api.user.IUser} message User message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      User.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a User message from the specified reader or buffer.
       * @function decode
       * @memberof api.user.User
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.user.User} User
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      User.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.user.User();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.token = reader.string();
              break;
            }
            case 2: {
              message.nickname = reader.string();
              break;
            }
            case 3: {
              message.name = reader.string();
              break;
            }
            case 4: {
              message.phoneNumber = reader.string();
              break;
            }
            case 5: {
              message.address = reader.string();
              break;
            }
            case 6: {
              message.community = reader.string();
              break;
            }
            case 7: {
              message.isImportant = reader.string();
              break;
            }
            case 8: {
              message.avatar = reader.string();
              break;
            }
            case 9: {
              message.permission = reader.string();
              break;
            }
            case 10: {
              message.xApiKey = reader.string();
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
       * Decodes a User message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.user.User
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.user.User} User
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      User.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a User message.
       * @function verify
       * @memberof api.user.User
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      User.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        var properties = {};
        if (message.token != null && message.hasOwnProperty("token")) {
          properties._token = 1;
          if (!$util.isString(message.token)) return "token: string expected";
        }
        if (message.nickname != null && message.hasOwnProperty("nickname")) {
          properties._nickname = 1;
          if (!$util.isString(message.nickname))
            return "nickname: string expected";
        }
        if (message.name != null && message.hasOwnProperty("name")) {
          properties._name = 1;
          if (!$util.isString(message.name)) return "name: string expected";
        }
        if (
          message.phoneNumber != null &&
          message.hasOwnProperty("phoneNumber")
        ) {
          properties._phoneNumber = 1;
          if (!$util.isString(message.phoneNumber))
            return "phoneNumber: string expected";
        }
        if (message.address != null && message.hasOwnProperty("address")) {
          properties._address = 1;
          if (!$util.isString(message.address))
            return "address: string expected";
        }
        if (message.community != null && message.hasOwnProperty("community")) {
          properties._community = 1;
          if (!$util.isString(message.community))
            return "community: string expected";
        }
        if (
          message.isImportant != null &&
          message.hasOwnProperty("isImportant")
        ) {
          properties._isImportant = 1;
          if (!$util.isString(message.isImportant))
            return "isImportant: string expected";
        }
        if (message.avatar != null && message.hasOwnProperty("avatar")) {
          properties._avatar = 1;
          if (!$util.isString(message.avatar)) return "avatar: string expected";
        }
        if (
          message.permission != null &&
          message.hasOwnProperty("permission")
        ) {
          properties._permission = 1;
          if (!$util.isString(message.permission))
            return "permission: string expected";
        }
        if (message.xApiKey != null && message.hasOwnProperty("xApiKey")) {
          properties._xApiKey = 1;
          if (!$util.isString(message.xApiKey))
            return "xApiKey: string expected";
        }
        return null;
      };

      /**
       * Creates a User message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.user.User
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.user.User} User
       */
      User.fromObject = function fromObject(object) {
        if (object instanceof $root.api.user.User) return object;
        var message = new $root.api.user.User();
        if (object.token != null) message.token = String(object.token);
        if (object.nickname != null) message.nickname = String(object.nickname);
        if (object.name != null) message.name = String(object.name);
        if (object.phoneNumber != null)
          message.phoneNumber = String(object.phoneNumber);
        if (object.address != null) message.address = String(object.address);
        if (object.community != null)
          message.community = String(object.community);
        if (object.isImportant != null)
          message.isImportant = String(object.isImportant);
        if (object.avatar != null) message.avatar = String(object.avatar);
        if (object.permission != null)
          message.permission = String(object.permission);
        if (object.xApiKey != null) message.xApiKey = String(object.xApiKey);
        return message;
      };

      /**
       * Creates a plain object from a User message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.user.User
       * @static
       * @param {api.user.User} message User
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      User.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (message.token != null && message.hasOwnProperty("token")) {
          object.token = message.token;
          if (options.oneofs) object._token = "token";
        }
        if (message.nickname != null && message.hasOwnProperty("nickname")) {
          object.nickname = message.nickname;
          if (options.oneofs) object._nickname = "nickname";
        }
        if (message.name != null && message.hasOwnProperty("name")) {
          object.name = message.name;
          if (options.oneofs) object._name = "name";
        }
        if (
          message.phoneNumber != null &&
          message.hasOwnProperty("phoneNumber")
        ) {
          object.phoneNumber = message.phoneNumber;
          if (options.oneofs) object._phoneNumber = "phoneNumber";
        }
        if (message.address != null && message.hasOwnProperty("address")) {
          object.address = message.address;
          if (options.oneofs) object._address = "address";
        }
        if (message.community != null && message.hasOwnProperty("community")) {
          object.community = message.community;
          if (options.oneofs) object._community = "community";
        }
        if (
          message.isImportant != null &&
          message.hasOwnProperty("isImportant")
        ) {
          object.isImportant = message.isImportant;
          if (options.oneofs) object._isImportant = "isImportant";
        }
        if (message.avatar != null && message.hasOwnProperty("avatar")) {
          object.avatar = message.avatar;
          if (options.oneofs) object._avatar = "avatar";
        }
        if (
          message.permission != null &&
          message.hasOwnProperty("permission")
        ) {
          object.permission = message.permission;
          if (options.oneofs) object._permission = "permission";
        }
        if (message.xApiKey != null && message.hasOwnProperty("xApiKey")) {
          object.xApiKey = message.xApiKey;
          if (options.oneofs) object._xApiKey = "xApiKey";
        }
        return object;
      };

      /**
       * Converts this User to JSON.
       * @function toJSON
       * @memberof api.user.User
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      User.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for User
       * @function getTypeUrl
       * @memberof api.user.User
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.user.User";
      };

      return User;
    })();

    user.UserResponse = (function () {
      /**
       * Properties of a UserResponse.
       * @memberof api.user
       * @interface IUserResponse
       * @property {api.user.IUser|null} [user] UserResponse user
       * @property {number|null} [code] UserResponse code
       * @property {string|null} [message] UserResponse message
       */

      /**
       * Constructs a new UserResponse.
       * @memberof api.user
       * @classdesc Represents a UserResponse.
       * @implements IUserResponse
       * @constructor
       * @param {api.user.IUserResponse=} [properties] Properties to set
       */
      function UserResponse(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * UserResponse user.
       * @member {api.user.IUser|null|undefined} user
       * @memberof api.user.UserResponse
       * @instance
       */
      UserResponse.prototype.user = null;

      /**
       * UserResponse code.
       * @member {number} code
       * @memberof api.user.UserResponse
       * @instance
       */
      UserResponse.prototype.code = 0;

      /**
       * UserResponse message.
       * @member {string} message
       * @memberof api.user.UserResponse
       * @instance
       */
      UserResponse.prototype.message = "";

      // OneOf field names bound to virtual getters and setters
      var $oneOfFields;

      /**
       * UserResponse _user.
       * @member {"user"|undefined} _user
       * @memberof api.user.UserResponse
       * @instance
       */
      Object.defineProperty(UserResponse.prototype, "_user", {
        get: $util.oneOfGetter(($oneOfFields = ["user"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * Creates a new UserResponse instance using the specified properties.
       * @function create
       * @memberof api.user.UserResponse
       * @static
       * @param {api.user.IUserResponse=} [properties] Properties to set
       * @returns {api.user.UserResponse} UserResponse instance
       */
      UserResponse.create = function create(properties) {
        return new UserResponse(properties);
      };

      /**
       * Encodes the specified UserResponse message. Does not implicitly {@link api.user.UserResponse.verify|verify} messages.
       * @function encode
       * @memberof api.user.UserResponse
       * @static
       * @param {api.user.IUserResponse} message UserResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      UserResponse.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.user != null && Object.hasOwnProperty.call(message, "user"))
          $root.api.user.User.encode(
            message.user,
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
       * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link api.user.UserResponse.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.user.UserResponse
       * @static
       * @param {api.user.IUserResponse} message UserResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      UserResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a UserResponse message from the specified reader or buffer.
       * @function decode
       * @memberof api.user.UserResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.user.UserResponse} UserResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      UserResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.user.UserResponse();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.user = $root.api.user.User.decode(
                reader,
                reader.uint32(),
              );
              break;
            }
            case 2: {
              message.code = reader.int32();
              break;
            }
            case 3: {
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
       * Decodes a UserResponse message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.user.UserResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.user.UserResponse} UserResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      UserResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a UserResponse message.
       * @function verify
       * @memberof api.user.UserResponse
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      UserResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        var properties = {};
        if (message.user != null && message.hasOwnProperty("user")) {
          properties._user = 1;
          {
            var error = $root.api.user.User.verify(message.user);
            if (error) return "user." + error;
          }
        }
        if (message.code != null && message.hasOwnProperty("code"))
          if (!$util.isInteger(message.code)) return "code: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
          if (!$util.isString(message.message))
            return "message: string expected";
        return null;
      };

      /**
       * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.user.UserResponse
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.user.UserResponse} UserResponse
       */
      UserResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.api.user.UserResponse) return object;
        var message = new $root.api.user.UserResponse();
        if (object.user != null) {
          if (typeof object.user !== "object")
            throw TypeError(".api.user.UserResponse.user: object expected");
          message.user = $root.api.user.User.fromObject(object.user);
        }
        if (object.code != null) message.code = object.code | 0;
        if (object.message != null) message.message = String(object.message);
        return message;
      };

      /**
       * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.user.UserResponse
       * @static
       * @param {api.user.UserResponse} message UserResponse
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      UserResponse.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
          object.code = 0;
          object.message = "";
        }
        if (message.user != null && message.hasOwnProperty("user")) {
          object.user = $root.api.user.User.toObject(message.user, options);
          if (options.oneofs) object._user = "user";
        }
        if (message.code != null && message.hasOwnProperty("code"))
          object.code = message.code;
        if (message.message != null && message.hasOwnProperty("message"))
          object.message = message.message;
        return object;
      };

      /**
       * Converts this UserResponse to JSON.
       * @function toJSON
       * @memberof api.user.UserResponse
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      UserResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for UserResponse
       * @function getTypeUrl
       * @memberof api.user.UserResponse
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      UserResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.user.UserResponse";
      };

      return UserResponse;
    })();

    user.UserRequest = (function () {
      /**
       * Properties of a UserRequest.
       * @memberof api.user
       * @interface IUserRequest
       * @property {string|null} [targetOpenid] UserRequest targetOpenid
       * @property {string|null} [nickname] UserRequest nickname
       * @property {string|null} [name] UserRequest name
       * @property {string|null} [phoneNumber] UserRequest phoneNumber
       * @property {string|null} [address] UserRequest address
       * @property {string|null} [isImportant] UserRequest isImportant
       * @property {string|null} [avatar] UserRequest avatar
       */

      /**
       * Constructs a new UserRequest.
       * @memberof api.user
       * @classdesc Represents a UserRequest.
       * @implements IUserRequest
       * @constructor
       * @param {api.user.IUserRequest=} [properties] Properties to set
       */
      function UserRequest(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * UserRequest targetOpenid.
       * @member {string|null|undefined} targetOpenid
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.targetOpenid = null;

      /**
       * UserRequest nickname.
       * @member {string|null|undefined} nickname
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.nickname = null;

      /**
       * UserRequest name.
       * @member {string|null|undefined} name
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.name = null;

      /**
       * UserRequest phoneNumber.
       * @member {string|null|undefined} phoneNumber
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.phoneNumber = null;

      /**
       * UserRequest address.
       * @member {string|null|undefined} address
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.address = null;

      /**
       * UserRequest isImportant.
       * @member {string|null|undefined} isImportant
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.isImportant = null;

      /**
       * UserRequest avatar.
       * @member {string|null|undefined} avatar
       * @memberof api.user.UserRequest
       * @instance
       */
      UserRequest.prototype.avatar = null;

      // OneOf field names bound to virtual getters and setters
      var $oneOfFields;

      /**
       * UserRequest _targetOpenid.
       * @member {"targetOpenid"|undefined} _targetOpenid
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_targetOpenid", {
        get: $util.oneOfGetter(($oneOfFields = ["targetOpenid"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _nickname.
       * @member {"nickname"|undefined} _nickname
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_nickname", {
        get: $util.oneOfGetter(($oneOfFields = ["nickname"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _name.
       * @member {"name"|undefined} _name
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_name", {
        get: $util.oneOfGetter(($oneOfFields = ["name"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _phoneNumber.
       * @member {"phoneNumber"|undefined} _phoneNumber
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_phoneNumber", {
        get: $util.oneOfGetter(($oneOfFields = ["phoneNumber"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _address.
       * @member {"address"|undefined} _address
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_address", {
        get: $util.oneOfGetter(($oneOfFields = ["address"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _isImportant.
       * @member {"isImportant"|undefined} _isImportant
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_isImportant", {
        get: $util.oneOfGetter(($oneOfFields = ["isImportant"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * UserRequest _avatar.
       * @member {"avatar"|undefined} _avatar
       * @memberof api.user.UserRequest
       * @instance
       */
      Object.defineProperty(UserRequest.prototype, "_avatar", {
        get: $util.oneOfGetter(($oneOfFields = ["avatar"])),
        set: $util.oneOfSetter($oneOfFields),
      });

      /**
       * Creates a new UserRequest instance using the specified properties.
       * @function create
       * @memberof api.user.UserRequest
       * @static
       * @param {api.user.IUserRequest=} [properties] Properties to set
       * @returns {api.user.UserRequest} UserRequest instance
       */
      UserRequest.create = function create(properties) {
        return new UserRequest(properties);
      };

      /**
       * Encodes the specified UserRequest message. Does not implicitly {@link api.user.UserRequest.verify|verify} messages.
       * @function encode
       * @memberof api.user.UserRequest
       * @static
       * @param {api.user.IUserRequest} message UserRequest message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      UserRequest.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.nickname != null &&
          Object.hasOwnProperty.call(message, "nickname")
        )
          writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.nickname);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.name);
        if (
          message.phoneNumber != null &&
          Object.hasOwnProperty.call(message, "phoneNumber")
        )
          writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.phoneNumber);
        if (
          message.address != null &&
          Object.hasOwnProperty.call(message, "address")
        )
          writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.address);
        if (
          message.isImportant != null &&
          Object.hasOwnProperty.call(message, "isImportant")
        )
          writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.isImportant);
        if (
          message.avatar != null &&
          Object.hasOwnProperty.call(message, "avatar")
        )
          writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.avatar);
        if (
          message.targetOpenid != null &&
          Object.hasOwnProperty.call(message, "targetOpenid")
        )
          writer
            .uint32(/* id 10, wireType 2 =*/ 82)
            .string(message.targetOpenid);
        return writer;
      };

      /**
       * Encodes the specified UserRequest message, length delimited. Does not implicitly {@link api.user.UserRequest.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.user.UserRequest
       * @static
       * @param {api.user.IUserRequest} message UserRequest message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      UserRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a UserRequest message from the specified reader or buffer.
       * @function decode
       * @memberof api.user.UserRequest
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.user.UserRequest} UserRequest
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      UserRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.user.UserRequest();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 10: {
              message.targetOpenid = reader.string();
              break;
            }
            case 2: {
              message.nickname = reader.string();
              break;
            }
            case 3: {
              message.name = reader.string();
              break;
            }
            case 4: {
              message.phoneNumber = reader.string();
              break;
            }
            case 5: {
              message.address = reader.string();
              break;
            }
            case 7: {
              message.isImportant = reader.string();
              break;
            }
            case 8: {
              message.avatar = reader.string();
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
       * Decodes a UserRequest message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.user.UserRequest
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.user.UserRequest} UserRequest
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      UserRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a UserRequest message.
       * @function verify
       * @memberof api.user.UserRequest
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      UserRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        var properties = {};
        if (
          message.targetOpenid != null &&
          message.hasOwnProperty("targetOpenid")
        ) {
          properties._targetOpenid = 1;
          if (!$util.isString(message.targetOpenid))
            return "targetOpenid: string expected";
        }
        if (message.nickname != null && message.hasOwnProperty("nickname")) {
          properties._nickname = 1;
          if (!$util.isString(message.nickname))
            return "nickname: string expected";
        }
        if (message.name != null && message.hasOwnProperty("name")) {
          properties._name = 1;
          if (!$util.isString(message.name)) return "name: string expected";
        }
        if (
          message.phoneNumber != null &&
          message.hasOwnProperty("phoneNumber")
        ) {
          properties._phoneNumber = 1;
          if (!$util.isString(message.phoneNumber))
            return "phoneNumber: string expected";
        }
        if (message.address != null && message.hasOwnProperty("address")) {
          properties._address = 1;
          if (!$util.isString(message.address))
            return "address: string expected";
        }
        if (
          message.isImportant != null &&
          message.hasOwnProperty("isImportant")
        ) {
          properties._isImportant = 1;
          if (!$util.isString(message.isImportant))
            return "isImportant: string expected";
        }
        if (message.avatar != null && message.hasOwnProperty("avatar")) {
          properties._avatar = 1;
          if (!$util.isString(message.avatar)) return "avatar: string expected";
        }
        return null;
      };

      /**
       * Creates a UserRequest message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.user.UserRequest
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.user.UserRequest} UserRequest
       */
      UserRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.api.user.UserRequest) return object;
        var message = new $root.api.user.UserRequest();
        if (object.targetOpenid != null)
          message.targetOpenid = String(object.targetOpenid);
        if (object.nickname != null) message.nickname = String(object.nickname);
        if (object.name != null) message.name = String(object.name);
        if (object.phoneNumber != null)
          message.phoneNumber = String(object.phoneNumber);
        if (object.address != null) message.address = String(object.address);
        if (object.isImportant != null)
          message.isImportant = String(object.isImportant);
        if (object.avatar != null) message.avatar = String(object.avatar);
        return message;
      };

      /**
       * Creates a plain object from a UserRequest message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.user.UserRequest
       * @static
       * @param {api.user.UserRequest} message UserRequest
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      UserRequest.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (message.nickname != null && message.hasOwnProperty("nickname")) {
          object.nickname = message.nickname;
          if (options.oneofs) object._nickname = "nickname";
        }
        if (message.name != null && message.hasOwnProperty("name")) {
          object.name = message.name;
          if (options.oneofs) object._name = "name";
        }
        if (
          message.phoneNumber != null &&
          message.hasOwnProperty("phoneNumber")
        ) {
          object.phoneNumber = message.phoneNumber;
          if (options.oneofs) object._phoneNumber = "phoneNumber";
        }
        if (message.address != null && message.hasOwnProperty("address")) {
          object.address = message.address;
          if (options.oneofs) object._address = "address";
        }
        if (
          message.isImportant != null &&
          message.hasOwnProperty("isImportant")
        ) {
          object.isImportant = message.isImportant;
          if (options.oneofs) object._isImportant = "isImportant";
        }
        if (message.avatar != null && message.hasOwnProperty("avatar")) {
          object.avatar = message.avatar;
          if (options.oneofs) object._avatar = "avatar";
        }
        if (
          message.targetOpenid != null &&
          message.hasOwnProperty("targetOpenid")
        ) {
          object.targetOpenid = message.targetOpenid;
          if (options.oneofs) object._targetOpenid = "targetOpenid";
        }
        return object;
      };

      /**
       * Converts this UserRequest to JSON.
       * @function toJSON
       * @memberof api.user.UserRequest
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      UserRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for UserRequest
       * @function getTypeUrl
       * @memberof api.user.UserRequest
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      UserRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.user.UserRequest";
      };

      return UserRequest;
    })();

    user.ApplyPermission = (function () {
      /**
       * Properties of an ApplyPermission.
       * @memberof api.user
       * @interface IApplyPermission
       * @property {string|null} [code] ApplyPermission code
       * @property {number|null} [applyType] ApplyPermission applyType
       * @property {number|Long|null} [expireTime] ApplyPermission expireTime
       */

      /**
       * Constructs a new ApplyPermission.
       * @memberof api.user
       * @classdesc Represents an ApplyPermission.
       * @implements IApplyPermission
       * @constructor
       * @param {api.user.IApplyPermission=} [properties] Properties to set
       */
      function ApplyPermission(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * ApplyPermission code.
       * @member {string} code
       * @memberof api.user.ApplyPermission
       * @instance
       */
      ApplyPermission.prototype.code = "";

      /**
       * ApplyPermission applyType.
       * @member {number} applyType
       * @memberof api.user.ApplyPermission
       * @instance
       */
      ApplyPermission.prototype.applyType = 0;

      /**
       * ApplyPermission expireTime.
       * @member {number|Long} expireTime
       * @memberof api.user.ApplyPermission
       * @instance
       */
      ApplyPermission.prototype.expireTime = $util.Long
        ? $util.Long.fromBits(0, 0, false)
        : 0;

      /**
       * Creates a new ApplyPermission instance using the specified properties.
       * @function create
       * @memberof api.user.ApplyPermission
       * @static
       * @param {api.user.IApplyPermission=} [properties] Properties to set
       * @returns {api.user.ApplyPermission} ApplyPermission instance
       */
      ApplyPermission.create = function create(properties) {
        return new ApplyPermission(properties);
      };

      /**
       * Encodes the specified ApplyPermission message. Does not implicitly {@link api.user.ApplyPermission.verify|verify} messages.
       * @function encode
       * @memberof api.user.ApplyPermission
       * @static
       * @param {api.user.IApplyPermission} message ApplyPermission message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      ApplyPermission.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
          writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.code);
        if (
          message.applyType != null &&
          Object.hasOwnProperty.call(message, "applyType")
        )
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.applyType);
        if (
          message.expireTime != null &&
          Object.hasOwnProperty.call(message, "expireTime")
        )
          writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.expireTime);
        return writer;
      };

      /**
       * Encodes the specified ApplyPermission message, length delimited. Does not implicitly {@link api.user.ApplyPermission.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.user.ApplyPermission
       * @static
       * @param {api.user.IApplyPermission} message ApplyPermission message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      ApplyPermission.encodeDelimited = function encodeDelimited(
        message,
        writer,
      ) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes an ApplyPermission message from the specified reader or buffer.
       * @function decode
       * @memberof api.user.ApplyPermission
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.user.ApplyPermission} ApplyPermission
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      ApplyPermission.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.user.ApplyPermission();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.code = reader.string();
              break;
            }
            case 2: {
              message.applyType = reader.int32();
              break;
            }
            case 3: {
              message.expireTime = reader.int64();
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
       * Decodes an ApplyPermission message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.user.ApplyPermission
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.user.ApplyPermission} ApplyPermission
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      ApplyPermission.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies an ApplyPermission message.
       * @function verify
       * @memberof api.user.ApplyPermission
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      ApplyPermission.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.code != null && message.hasOwnProperty("code"))
          if (!$util.isString(message.code)) return "code: string expected";
        if (message.applyType != null && message.hasOwnProperty("applyType"))
          if (!$util.isInteger(message.applyType))
            return "applyType: integer expected";
        if (message.expireTime != null && message.hasOwnProperty("expireTime"))
          if (
            !$util.isInteger(message.expireTime) &&
            !(
              message.expireTime &&
              $util.isInteger(message.expireTime.low) &&
              $util.isInteger(message.expireTime.high)
            )
          )
            return "expireTime: integer|Long expected";
        return null;
      };

      /**
       * Creates an ApplyPermission message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.user.ApplyPermission
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.user.ApplyPermission} ApplyPermission
       */
      ApplyPermission.fromObject = function fromObject(object) {
        if (object instanceof $root.api.user.ApplyPermission) return object;
        var message = new $root.api.user.ApplyPermission();
        if (object.code != null) message.code = String(object.code);
        if (object.applyType != null) message.applyType = object.applyType | 0;
        if (object.expireTime != null)
          if ($util.Long)
            (message.expireTime = $util.Long.fromValue(
              object.expireTime,
            )).unsigned = false;
          else if (typeof object.expireTime === "string")
            message.expireTime = parseInt(object.expireTime, 10);
          else if (typeof object.expireTime === "number")
            message.expireTime = object.expireTime;
          else if (typeof object.expireTime === "object")
            message.expireTime = new $util.LongBits(
              object.expireTime.low >>> 0,
              object.expireTime.high >>> 0,
            ).toNumber();
        return message;
      };

      /**
       * Creates a plain object from an ApplyPermission message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.user.ApplyPermission
       * @static
       * @param {api.user.ApplyPermission} message ApplyPermission
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      ApplyPermission.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
          object.code = "";
          object.applyType = 0;
          if ($util.Long) {
            var long = new $util.Long(0, 0, false);
            object.expireTime =
              options.longs === String
                ? long.toString()
                : options.longs === Number
                  ? long.toNumber()
                  : long;
          } else object.expireTime = options.longs === String ? "0" : 0;
        }
        if (message.code != null && message.hasOwnProperty("code"))
          object.code = message.code;
        if (message.applyType != null && message.hasOwnProperty("applyType"))
          object.applyType = message.applyType;
        if (message.expireTime != null && message.hasOwnProperty("expireTime"))
          if (typeof message.expireTime === "number")
            object.expireTime =
              options.longs === String
                ? String(message.expireTime)
                : message.expireTime;
          else
            object.expireTime =
              options.longs === String
                ? $util.Long.prototype.toString.call(message.expireTime)
                : options.longs === Number
                  ? new $util.LongBits(
                      message.expireTime.low >>> 0,
                      message.expireTime.high >>> 0,
                    ).toNumber()
                  : message.expireTime;
        return object;
      };

      /**
       * Converts this ApplyPermission to JSON.
       * @function toJSON
       * @memberof api.user.ApplyPermission
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      ApplyPermission.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for ApplyPermission
       * @function getTypeUrl
       * @memberof api.user.ApplyPermission
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      ApplyPermission.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.user.ApplyPermission";
      };

      return ApplyPermission;
    })();

    user.ApplyPermissionResponse = (function () {
      /**
       * Properties of an ApplyPermissionResponse.
       * @memberof api.user
       * @interface IApplyPermissionResponse
       * @property {api.user.IApplyPermission|null} [applyPermission] ApplyPermissionResponse applyPermission
       * @property {number|null} [code] ApplyPermissionResponse code
       * @property {string|null} [message] ApplyPermissionResponse message
       */

      /**
       * Constructs a new ApplyPermissionResponse.
       * @memberof api.user
       * @classdesc Represents an ApplyPermissionResponse.
       * @implements IApplyPermissionResponse
       * @constructor
       * @param {api.user.IApplyPermissionResponse=} [properties] Properties to set
       */
      function ApplyPermissionResponse(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * ApplyPermissionResponse applyPermission.
       * @member {api.user.IApplyPermission|null|undefined} applyPermission
       * @memberof api.user.ApplyPermissionResponse
       * @instance
       */
      ApplyPermissionResponse.prototype.applyPermission = null;

      /**
       * ApplyPermissionResponse code.
       * @member {number} code
       * @memberof api.user.ApplyPermissionResponse
       * @instance
       */
      ApplyPermissionResponse.prototype.code = 0;

      /**
       * ApplyPermissionResponse message.
       * @member {string} message
       * @memberof api.user.ApplyPermissionResponse
       * @instance
       */
      ApplyPermissionResponse.prototype.message = "";

      // OneOf field names bound to virtual getters and setters
      var $oneOfFields;

      /**
       * ApplyPermissionResponse _applyPermission.
       * @member {"applyPermission"|undefined} _applyPermission
       * @memberof api.user.ApplyPermissionResponse
       * @instance
       */
      Object.defineProperty(
        ApplyPermissionResponse.prototype,
        "_applyPermission",
        {
          get: $util.oneOfGetter(($oneOfFields = ["applyPermission"])),
          set: $util.oneOfSetter($oneOfFields),
        },
      );

      /**
       * Creates a new ApplyPermissionResponse instance using the specified properties.
       * @function create
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {api.user.IApplyPermissionResponse=} [properties] Properties to set
       * @returns {api.user.ApplyPermissionResponse} ApplyPermissionResponse instance
       */
      ApplyPermissionResponse.create = function create(properties) {
        return new ApplyPermissionResponse(properties);
      };

      /**
       * Encodes the specified ApplyPermissionResponse message. Does not implicitly {@link api.user.ApplyPermissionResponse.verify|verify} messages.
       * @function encode
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {api.user.IApplyPermissionResponse} message ApplyPermissionResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      ApplyPermissionResponse.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.applyPermission != null &&
          Object.hasOwnProperty.call(message, "applyPermission")
        )
          $root.api.user.ApplyPermission.encode(
            message.applyPermission,
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
       * Encodes the specified ApplyPermissionResponse message, length delimited. Does not implicitly {@link api.user.ApplyPermissionResponse.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {api.user.IApplyPermissionResponse} message ApplyPermissionResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      ApplyPermissionResponse.encodeDelimited = function encodeDelimited(
        message,
        writer,
      ) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes an ApplyPermissionResponse message from the specified reader or buffer.
       * @function decode
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.user.ApplyPermissionResponse} ApplyPermissionResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      ApplyPermissionResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.user.ApplyPermissionResponse();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.applyPermission = $root.api.user.ApplyPermission.decode(
                reader,
                reader.uint32(),
              );
              break;
            }
            case 2: {
              message.code = reader.int32();
              break;
            }
            case 3: {
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
       * Decodes an ApplyPermissionResponse message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.user.ApplyPermissionResponse} ApplyPermissionResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      ApplyPermissionResponse.decodeDelimited = function decodeDelimited(
        reader,
      ) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies an ApplyPermissionResponse message.
       * @function verify
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      ApplyPermissionResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        var properties = {};
        if (
          message.applyPermission != null &&
          message.hasOwnProperty("applyPermission")
        ) {
          properties._applyPermission = 1;
          {
            var error = $root.api.user.ApplyPermission.verify(
              message.applyPermission,
            );
            if (error) return "applyPermission." + error;
          }
        }
        if (message.code != null && message.hasOwnProperty("code"))
          if (!$util.isInteger(message.code)) return "code: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
          if (!$util.isString(message.message))
            return "message: string expected";
        return null;
      };

      /**
       * Creates an ApplyPermissionResponse message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.user.ApplyPermissionResponse} ApplyPermissionResponse
       */
      ApplyPermissionResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.api.user.ApplyPermissionResponse)
          return object;
        var message = new $root.api.user.ApplyPermissionResponse();
        if (object.applyPermission != null) {
          if (typeof object.applyPermission !== "object")
            throw TypeError(
              ".api.user.ApplyPermissionResponse.applyPermission: object expected",
            );
          message.applyPermission = $root.api.user.ApplyPermission.fromObject(
            object.applyPermission,
          );
        }
        if (object.code != null) message.code = object.code | 0;
        if (object.message != null) message.message = String(object.message);
        return message;
      };

      /**
       * Creates a plain object from an ApplyPermissionResponse message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {api.user.ApplyPermissionResponse} message ApplyPermissionResponse
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      ApplyPermissionResponse.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
          object.code = 0;
          object.message = "";
        }
        if (
          message.applyPermission != null &&
          message.hasOwnProperty("applyPermission")
        ) {
          object.applyPermission = $root.api.user.ApplyPermission.toObject(
            message.applyPermission,
            options,
          );
          if (options.oneofs) object._applyPermission = "applyPermission";
        }
        if (message.code != null && message.hasOwnProperty("code"))
          object.code = message.code;
        if (message.message != null && message.hasOwnProperty("message"))
          object.message = message.message;
        return object;
      };

      /**
       * Converts this ApplyPermissionResponse to JSON.
       * @function toJSON
       * @memberof api.user.ApplyPermissionResponse
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      ApplyPermissionResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for ApplyPermissionResponse
       * @function getTypeUrl
       * @memberof api.user.ApplyPermissionResponse
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      ApplyPermissionResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.user.ApplyPermissionResponse";
      };

      return ApplyPermissionResponse;
    })();

    return user;
  })();

  return api;
})();

module.exports = $root;
