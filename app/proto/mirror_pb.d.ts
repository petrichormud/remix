// package: mirror
// file: mirror.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class RegisterRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): RegisterRequest;
    getPassword(): string;
    setPassword(value: string): RegisterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterRequest;
    static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
    export type AsObject = {
        username: string,
        password: string,
    }
}

export class RegisterReply extends jspb.Message { 
    getId(): number;
    setId(value: number): RegisterReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterReply.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterReply): RegisterReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterReply;
    static deserializeBinaryFromReader(message: RegisterReply, reader: jspb.BinaryReader): RegisterReply;
}

export namespace RegisterReply {
    export type AsObject = {
        id: number,
    }
}

export class LoginRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): LoginRequest;
    getPassword(): string;
    setPassword(value: string): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        username: string,
        password: string,
    }
}

export class LoginReply extends jspb.Message { 
    getVerified(): boolean;
    setVerified(value: boolean): LoginReply;
    getId(): number;
    setId(value: number): LoginReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginReply.AsObject;
    static toObject(includeInstance: boolean, msg: LoginReply): LoginReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginReply;
    static deserializeBinaryFromReader(message: LoginReply, reader: jspb.BinaryReader): LoginReply;
}

export namespace LoginReply {
    export type AsObject = {
        verified: boolean,
        id: number,
    }
}
