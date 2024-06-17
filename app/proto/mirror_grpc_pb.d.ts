// package: mirror
// file: mirror.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as mirror_pb from "./mirror_pb";

interface IMirrorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    register: IMirrorService_IRegister;
    login: IMirrorService_ILogin;
}

interface IMirrorService_IRegister extends grpc.MethodDefinition<mirror_pb.RegisterRequest, mirror_pb.RegisterReply> {
    path: "/mirror.Mirror/Register";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mirror_pb.RegisterRequest>;
    requestDeserialize: grpc.deserialize<mirror_pb.RegisterRequest>;
    responseSerialize: grpc.serialize<mirror_pb.RegisterReply>;
    responseDeserialize: grpc.deserialize<mirror_pb.RegisterReply>;
}
interface IMirrorService_ILogin extends grpc.MethodDefinition<mirror_pb.LoginRequest, mirror_pb.LoginReply> {
    path: "/mirror.Mirror/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mirror_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<mirror_pb.LoginRequest>;
    responseSerialize: grpc.serialize<mirror_pb.LoginReply>;
    responseDeserialize: grpc.deserialize<mirror_pb.LoginReply>;
}

export const MirrorService: IMirrorService;

export interface IMirrorServer extends grpc.UntypedServiceImplementation {
    register: grpc.handleUnaryCall<mirror_pb.RegisterRequest, mirror_pb.RegisterReply>;
    login: grpc.handleUnaryCall<mirror_pb.LoginRequest, mirror_pb.LoginReply>;
}

export interface IMirrorClient {
    register(request: mirror_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    register(request: mirror_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    register(request: mirror_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    login(request: mirror_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
    login(request: mirror_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
    login(request: mirror_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
}

export class MirrorClient extends grpc.Client implements IMirrorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public register(request: mirror_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    public register(request: mirror_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    public register(request: mirror_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mirror_pb.RegisterReply) => void): grpc.ClientUnaryCall;
    public login(request: mirror_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
    public login(request: mirror_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
    public login(request: mirror_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mirror_pb.LoginReply) => void): grpc.ClientUnaryCall;
}
