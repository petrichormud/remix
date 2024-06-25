// @generated by protobuf-ts 2.9.4 with parameter client_grpc1
// @generated from protobuf file "mirror.proto" (package "mirror", syntax proto3)
// tslint:disable
import { Mirror } from "./mirror";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { RevokePlayerPermissionReply } from "./mirror";
import type { RevokePlayerPermissionRequest } from "./mirror";
import type { GrantPlayerPermissionReply } from "./mirror";
import type { GrantPlayerPermissionRequest } from "./mirror";
import type { PlayerPermissionsReply } from "./mirror";
import type { PlayerPermissionsRequest } from "./mirror";
import type { PlayerPermissionDefinitionsReply } from "./mirror";
import type { PlayerPermissionDefinitionsRequest } from "./mirror";
import type { PlayersReply } from "./mirror";
import type { PlayersRequest } from "./mirror";
import type { SetPlayerSettingsThemeReply } from "./mirror";
import type { SetPlayerSettingsThemeRequest } from "./mirror";
import type { PlayerSettingsReply } from "./mirror";
import type { PlayerSettingsRequest } from "./mirror";
import type { LoginReply } from "./mirror";
import type { LoginRequest } from "./mirror";
import type { RegisterReply } from "./mirror";
import type { RegisterRequest } from "./mirror";
import * as grpc from "@grpc/grpc-js";
/**
 * @generated from protobuf service mirror.Mirror
 */
export interface IMirrorClient {
    /**
     * @generated from protobuf rpc: Register(mirror.RegisterRequest) returns (mirror.RegisterReply);
     */
    register(input: RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RegisterReply) => void): grpc.ClientUnaryCall;
    register(input: RegisterRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: RegisterReply) => void): grpc.ClientUnaryCall;
    register(input: RegisterRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RegisterReply) => void): grpc.ClientUnaryCall;
    register(input: RegisterRequest, callback: (err: grpc.ServiceError | null, value?: RegisterReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: Login(mirror.LoginRequest) returns (mirror.LoginReply);
     */
    login(input: LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: LoginReply) => void): grpc.ClientUnaryCall;
    login(input: LoginRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: LoginReply) => void): grpc.ClientUnaryCall;
    login(input: LoginRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: LoginReply) => void): grpc.ClientUnaryCall;
    login(input: LoginRequest, callback: (err: grpc.ServiceError | null, value?: LoginReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: PlayerSettings(mirror.PlayerSettingsRequest) returns (mirror.PlayerSettingsReply);
     */
    playerSettings(input: PlayerSettingsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void): grpc.ClientUnaryCall;
    playerSettings(input: PlayerSettingsRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void): grpc.ClientUnaryCall;
    playerSettings(input: PlayerSettingsRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void): grpc.ClientUnaryCall;
    playerSettings(input: PlayerSettingsRequest, callback: (err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: SetPlayerSettingsTheme(mirror.SetPlayerSettingsThemeRequest) returns (mirror.SetPlayerSettingsThemeReply);
     */
    setPlayerSettingsTheme(input: SetPlayerSettingsThemeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void): grpc.ClientUnaryCall;
    setPlayerSettingsTheme(input: SetPlayerSettingsThemeRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void): grpc.ClientUnaryCall;
    setPlayerSettingsTheme(input: SetPlayerSettingsThemeRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void): grpc.ClientUnaryCall;
    setPlayerSettingsTheme(input: SetPlayerSettingsThemeRequest, callback: (err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: Players(mirror.PlayersRequest) returns (mirror.PlayersReply);
     */
    players(input: PlayersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayersReply) => void): grpc.ClientUnaryCall;
    players(input: PlayersRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: PlayersReply) => void): grpc.ClientUnaryCall;
    players(input: PlayersRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayersReply) => void): grpc.ClientUnaryCall;
    players(input: PlayersRequest, callback: (err: grpc.ServiceError | null, value?: PlayersReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: PlayerPermissionDefinitions(mirror.PlayerPermissionDefinitionsRequest) returns (mirror.PlayerPermissionDefinitionsReply);
     */
    playerPermissionDefinitions(input: PlayerPermissionDefinitionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void): grpc.ClientUnaryCall;
    playerPermissionDefinitions(input: PlayerPermissionDefinitionsRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void): grpc.ClientUnaryCall;
    playerPermissionDefinitions(input: PlayerPermissionDefinitionsRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void): grpc.ClientUnaryCall;
    playerPermissionDefinitions(input: PlayerPermissionDefinitionsRequest, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: PlayerPermissions(mirror.PlayerPermissionsRequest) returns (mirror.PlayerPermissionsReply);
     */
    playerPermissions(input: PlayerPermissionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void): grpc.ClientUnaryCall;
    playerPermissions(input: PlayerPermissionsRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void): grpc.ClientUnaryCall;
    playerPermissions(input: PlayerPermissionsRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void): grpc.ClientUnaryCall;
    playerPermissions(input: PlayerPermissionsRequest, callback: (err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: GrantPlayerPermission(mirror.GrantPlayerPermissionRequest) returns (mirror.GrantPlayerPermissionReply);
     */
    grantPlayerPermission(input: GrantPlayerPermissionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void): grpc.ClientUnaryCall;
    grantPlayerPermission(input: GrantPlayerPermissionRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void): grpc.ClientUnaryCall;
    grantPlayerPermission(input: GrantPlayerPermissionRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void): grpc.ClientUnaryCall;
    grantPlayerPermission(input: GrantPlayerPermissionRequest, callback: (err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: RevokePlayerPermission(mirror.RevokePlayerPermissionRequest) returns (mirror.RevokePlayerPermissionReply);
     */
    revokePlayerPermission(input: RevokePlayerPermissionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void): grpc.ClientUnaryCall;
    revokePlayerPermission(input: RevokePlayerPermissionRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void): grpc.ClientUnaryCall;
    revokePlayerPermission(input: RevokePlayerPermissionRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void): grpc.ClientUnaryCall;
    revokePlayerPermission(input: RevokePlayerPermissionRequest, callback: (err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void): grpc.ClientUnaryCall;
}
/**
 * @generated from protobuf service mirror.Mirror
 */
export class MirrorClient extends grpc.Client implements IMirrorClient {
    private readonly _binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions>;
    constructor(address: string, credentials: grpc.ChannelCredentials, options: grpc.ClientOptions = {}, binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> = {}) {
        super(address, credentials, options);
        this._binaryOptions = binaryOptions;
    }
    /**
     * @generated from protobuf rpc: Register(mirror.RegisterRequest) returns (mirror.RegisterReply);
     */
    register(input: RegisterRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RegisterReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RegisterReply) => void), callback?: ((err: grpc.ServiceError | null, value?: RegisterReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[0];
        return this.makeUnaryRequest<RegisterRequest, RegisterReply>(`/${Mirror.typeName}/${method.name}`, (value: RegisterRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): RegisterReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: Login(mirror.LoginRequest) returns (mirror.LoginReply);
     */
    login(input: LoginRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: LoginReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: LoginReply) => void), callback?: ((err: grpc.ServiceError | null, value?: LoginReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[1];
        return this.makeUnaryRequest<LoginRequest, LoginReply>(`/${Mirror.typeName}/${method.name}`, (value: LoginRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): LoginReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: PlayerSettings(mirror.PlayerSettingsRequest) returns (mirror.PlayerSettingsReply);
     */
    playerSettings(input: PlayerSettingsRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void), callback?: ((err: grpc.ServiceError | null, value?: PlayerSettingsReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[2];
        return this.makeUnaryRequest<PlayerSettingsRequest, PlayerSettingsReply>(`/${Mirror.typeName}/${method.name}`, (value: PlayerSettingsRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): PlayerSettingsReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: SetPlayerSettingsTheme(mirror.SetPlayerSettingsThemeRequest) returns (mirror.SetPlayerSettingsThemeReply);
     */
    setPlayerSettingsTheme(input: SetPlayerSettingsThemeRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void), callback?: ((err: grpc.ServiceError | null, value?: SetPlayerSettingsThemeReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[3];
        return this.makeUnaryRequest<SetPlayerSettingsThemeRequest, SetPlayerSettingsThemeReply>(`/${Mirror.typeName}/${method.name}`, (value: SetPlayerSettingsThemeRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): SetPlayerSettingsThemeReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: Players(mirror.PlayersRequest) returns (mirror.PlayersReply);
     */
    players(input: PlayersRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayersReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayersReply) => void), callback?: ((err: grpc.ServiceError | null, value?: PlayersReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[4];
        return this.makeUnaryRequest<PlayersRequest, PlayersReply>(`/${Mirror.typeName}/${method.name}`, (value: PlayersRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): PlayersReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: PlayerPermissionDefinitions(mirror.PlayerPermissionDefinitionsRequest) returns (mirror.PlayerPermissionDefinitionsReply);
     */
    playerPermissionDefinitions(input: PlayerPermissionDefinitionsRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void), callback?: ((err: grpc.ServiceError | null, value?: PlayerPermissionDefinitionsReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[5];
        return this.makeUnaryRequest<PlayerPermissionDefinitionsRequest, PlayerPermissionDefinitionsReply>(`/${Mirror.typeName}/${method.name}`, (value: PlayerPermissionDefinitionsRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): PlayerPermissionDefinitionsReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: PlayerPermissions(mirror.PlayerPermissionsRequest) returns (mirror.PlayerPermissionsReply);
     */
    playerPermissions(input: PlayerPermissionsRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void), callback?: ((err: grpc.ServiceError | null, value?: PlayerPermissionsReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[6];
        return this.makeUnaryRequest<PlayerPermissionsRequest, PlayerPermissionsReply>(`/${Mirror.typeName}/${method.name}`, (value: PlayerPermissionsRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): PlayerPermissionsReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: GrantPlayerPermission(mirror.GrantPlayerPermissionRequest) returns (mirror.GrantPlayerPermissionReply);
     */
    grantPlayerPermission(input: GrantPlayerPermissionRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void), callback?: ((err: grpc.ServiceError | null, value?: GrantPlayerPermissionReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[7];
        return this.makeUnaryRequest<GrantPlayerPermissionRequest, GrantPlayerPermissionReply>(`/${Mirror.typeName}/${method.name}`, (value: GrantPlayerPermissionRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): GrantPlayerPermissionReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: RevokePlayerPermission(mirror.RevokePlayerPermissionRequest) returns (mirror.RevokePlayerPermissionReply);
     */
    revokePlayerPermission(input: RevokePlayerPermissionRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void), callback?: ((err: grpc.ServiceError | null, value?: RevokePlayerPermissionReply) => void)): grpc.ClientUnaryCall {
        const method = Mirror.methods[8];
        return this.makeUnaryRequest<RevokePlayerPermissionRequest, RevokePlayerPermissionReply>(`/${Mirror.typeName}/${method.name}`, (value: RevokePlayerPermissionRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): RevokePlayerPermissionReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
}
