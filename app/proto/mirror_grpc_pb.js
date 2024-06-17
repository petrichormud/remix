// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mirror_pb = require('./mirror_pb.js');

function serialize_mirror_LoginReply(arg) {
  if (!(arg instanceof mirror_pb.LoginReply)) {
    throw new Error('Expected argument of type mirror.LoginReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mirror_LoginReply(buffer_arg) {
  return mirror_pb.LoginReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mirror_LoginRequest(arg) {
  if (!(arg instanceof mirror_pb.LoginRequest)) {
    throw new Error('Expected argument of type mirror.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mirror_LoginRequest(buffer_arg) {
  return mirror_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mirror_RegisterReply(arg) {
  if (!(arg instanceof mirror_pb.RegisterReply)) {
    throw new Error('Expected argument of type mirror.RegisterReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mirror_RegisterReply(buffer_arg) {
  return mirror_pb.RegisterReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mirror_RegisterRequest(arg) {
  if (!(arg instanceof mirror_pb.RegisterRequest)) {
    throw new Error('Expected argument of type mirror.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mirror_RegisterRequest(buffer_arg) {
  return mirror_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MirrorService = exports.MirrorService = {
  register: {
    path: '/mirror.Mirror/Register',
    requestStream: false,
    responseStream: false,
    requestType: mirror_pb.RegisterRequest,
    responseType: mirror_pb.RegisterReply,
    requestSerialize: serialize_mirror_RegisterRequest,
    requestDeserialize: deserialize_mirror_RegisterRequest,
    responseSerialize: serialize_mirror_RegisterReply,
    responseDeserialize: deserialize_mirror_RegisterReply,
  },
  login: {
    path: '/mirror.Mirror/Login',
    requestStream: false,
    responseStream: false,
    requestType: mirror_pb.LoginRequest,
    responseType: mirror_pb.LoginReply,
    requestSerialize: serialize_mirror_LoginRequest,
    requestDeserialize: deserialize_mirror_LoginRequest,
    responseSerialize: serialize_mirror_LoginReply,
    responseDeserialize: deserialize_mirror_LoginReply,
  },
};

exports.MirrorClient = grpc.makeGenericClientConstructor(MirrorService);
