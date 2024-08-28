// @generated by protobuf-ts 2.9.4 with parameter client_grpc1
// @generated from protobuf file "data.proto" (package "data", syntax proto3)
// tslint:disable
import { Data } from "./data";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { ReleasedPatchesReply } from "./data";
import type { ReleasedPatchesRequest } from "./data";
import type { RevokePatchReleasedReply } from "./data";
import type { RevokePatchReleasedRequest } from "./data";
import type { MarkPatchReleasedReply } from "./data";
import type { MarkPatchReleasedRequest } from "./data";
import type { DeletePatchChangeReply } from "./data";
import type { DeletePatchChangeRequest } from "./data";
import type { CreatePatchChangeReply } from "./data";
import type { CreatePatchChangeRequest } from "./data";
import type { DeletePatchReply } from "./data";
import type { DeletePatchRequest } from "./data";
import type { CreatePatchReply } from "./data";
import type { CreatePatchRequest } from "./data";
import * as grpc from "@grpc/grpc-js";
/**
 * @generated from protobuf service data.Data
 */
export interface IDataClient {
    /**
     * @generated from protobuf rpc: CreatePatch(data.CreatePatchRequest) returns (data.CreatePatchReply);
     */
    createPatch(input: CreatePatchRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: CreatePatchReply) => void): grpc.ClientUnaryCall;
    createPatch(input: CreatePatchRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: CreatePatchReply) => void): grpc.ClientUnaryCall;
    createPatch(input: CreatePatchRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: CreatePatchReply) => void): grpc.ClientUnaryCall;
    createPatch(input: CreatePatchRequest, callback: (err: grpc.ServiceError | null, value?: CreatePatchReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: DeletePatch(data.DeletePatchRequest) returns (data.DeletePatchReply);
     */
    deletePatch(input: DeletePatchRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: DeletePatchReply) => void): grpc.ClientUnaryCall;
    deletePatch(input: DeletePatchRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: DeletePatchReply) => void): grpc.ClientUnaryCall;
    deletePatch(input: DeletePatchRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: DeletePatchReply) => void): grpc.ClientUnaryCall;
    deletePatch(input: DeletePatchRequest, callback: (err: grpc.ServiceError | null, value?: DeletePatchReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: CreatePatchChange(data.CreatePatchChangeRequest) returns (data.CreatePatchChangeReply);
     */
    createPatchChange(input: CreatePatchChangeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void): grpc.ClientUnaryCall;
    createPatchChange(input: CreatePatchChangeRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void): grpc.ClientUnaryCall;
    createPatchChange(input: CreatePatchChangeRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void): grpc.ClientUnaryCall;
    createPatchChange(input: CreatePatchChangeRequest, callback: (err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: DeletePatchChange(data.DeletePatchChangeRequest) returns (data.DeletePatchChangeReply);
     */
    deletePatchChange(input: DeletePatchChangeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void): grpc.ClientUnaryCall;
    deletePatchChange(input: DeletePatchChangeRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void): grpc.ClientUnaryCall;
    deletePatchChange(input: DeletePatchChangeRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void): grpc.ClientUnaryCall;
    deletePatchChange(input: DeletePatchChangeRequest, callback: (err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: MarkPatchReleased(data.MarkPatchReleasedRequest) returns (data.MarkPatchReleasedReply);
     */
    markPatchReleased(input: MarkPatchReleasedRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void): grpc.ClientUnaryCall;
    markPatchReleased(input: MarkPatchReleasedRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void): grpc.ClientUnaryCall;
    markPatchReleased(input: MarkPatchReleasedRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void): grpc.ClientUnaryCall;
    markPatchReleased(input: MarkPatchReleasedRequest, callback: (err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: RevokePatchReleased(data.RevokePatchReleasedRequest) returns (data.RevokePatchReleasedReply);
     */
    revokePatchReleased(input: RevokePatchReleasedRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void): grpc.ClientUnaryCall;
    revokePatchReleased(input: RevokePatchReleasedRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void): grpc.ClientUnaryCall;
    revokePatchReleased(input: RevokePatchReleasedRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void): grpc.ClientUnaryCall;
    revokePatchReleased(input: RevokePatchReleasedRequest, callback: (err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void): grpc.ClientUnaryCall;
    /**
     * @generated from protobuf rpc: ReleasedPatches(data.ReleasedPatchesRequest) returns (data.ReleasedPatchesReply);
     */
    releasedPatches(input: ReleasedPatchesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void): grpc.ClientUnaryCall;
    releasedPatches(input: ReleasedPatchesRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void): grpc.ClientUnaryCall;
    releasedPatches(input: ReleasedPatchesRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void): grpc.ClientUnaryCall;
    releasedPatches(input: ReleasedPatchesRequest, callback: (err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void): grpc.ClientUnaryCall;
}
/**
 * @generated from protobuf service data.Data
 */
export class DataClient extends grpc.Client implements IDataClient {
    private readonly _binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions>;
    constructor(address: string, credentials: grpc.ChannelCredentials, options: grpc.ClientOptions = {}, binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> = {}) {
        super(address, credentials, options);
        this._binaryOptions = binaryOptions;
    }
    /**
     * @generated from protobuf rpc: CreatePatch(data.CreatePatchRequest) returns (data.CreatePatchReply);
     */
    createPatch(input: CreatePatchRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: CreatePatchReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: CreatePatchReply) => void), callback?: ((err: grpc.ServiceError | null, value?: CreatePatchReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[0];
        return this.makeUnaryRequest<CreatePatchRequest, CreatePatchReply>(`/${Data.typeName}/${method.name}`, (value: CreatePatchRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): CreatePatchReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: DeletePatch(data.DeletePatchRequest) returns (data.DeletePatchReply);
     */
    deletePatch(input: DeletePatchRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: DeletePatchReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: DeletePatchReply) => void), callback?: ((err: grpc.ServiceError | null, value?: DeletePatchReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[1];
        return this.makeUnaryRequest<DeletePatchRequest, DeletePatchReply>(`/${Data.typeName}/${method.name}`, (value: DeletePatchRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): DeletePatchReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: CreatePatchChange(data.CreatePatchChangeRequest) returns (data.CreatePatchChangeReply);
     */
    createPatchChange(input: CreatePatchChangeRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void), callback?: ((err: grpc.ServiceError | null, value?: CreatePatchChangeReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[2];
        return this.makeUnaryRequest<CreatePatchChangeRequest, CreatePatchChangeReply>(`/${Data.typeName}/${method.name}`, (value: CreatePatchChangeRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): CreatePatchChangeReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: DeletePatchChange(data.DeletePatchChangeRequest) returns (data.DeletePatchChangeReply);
     */
    deletePatchChange(input: DeletePatchChangeRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void), callback?: ((err: grpc.ServiceError | null, value?: DeletePatchChangeReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[3];
        return this.makeUnaryRequest<DeletePatchChangeRequest, DeletePatchChangeReply>(`/${Data.typeName}/${method.name}`, (value: DeletePatchChangeRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): DeletePatchChangeReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: MarkPatchReleased(data.MarkPatchReleasedRequest) returns (data.MarkPatchReleasedReply);
     */
    markPatchReleased(input: MarkPatchReleasedRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void), callback?: ((err: grpc.ServiceError | null, value?: MarkPatchReleasedReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[4];
        return this.makeUnaryRequest<MarkPatchReleasedRequest, MarkPatchReleasedReply>(`/${Data.typeName}/${method.name}`, (value: MarkPatchReleasedRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): MarkPatchReleasedReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: RevokePatchReleased(data.RevokePatchReleasedRequest) returns (data.RevokePatchReleasedReply);
     */
    revokePatchReleased(input: RevokePatchReleasedRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void), callback?: ((err: grpc.ServiceError | null, value?: RevokePatchReleasedReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[5];
        return this.makeUnaryRequest<RevokePatchReleasedRequest, RevokePatchReleasedReply>(`/${Data.typeName}/${method.name}`, (value: RevokePatchReleasedRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): RevokePatchReleasedReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
    /**
     * @generated from protobuf rpc: ReleasedPatches(data.ReleasedPatchesRequest) returns (data.ReleasedPatchesReply);
     */
    releasedPatches(input: ReleasedPatchesRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void), callback?: ((err: grpc.ServiceError | null, value?: ReleasedPatchesReply) => void)): grpc.ClientUnaryCall {
        const method = Data.methods[6];
        return this.makeUnaryRequest<ReleasedPatchesRequest, ReleasedPatchesReply>(`/${Data.typeName}/${method.name}`, (value: ReleasedPatchesRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): ReleasedPatchesReply => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
}