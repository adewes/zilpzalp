import { parse } from "protobufjs";

export const protocol = parse(`syntax = "proto3";

message HealthDepartmentData {
	required bytes hs = 1; // users' H_s parameter used to generate hashes
	required bytes id = 2;
	required bytes kb = 3;
}

message UserData {
	required bytes hs = 1; // users' H_s parameter used to generate hashes
	required bytes id = 2; // users' ID in the backend database
	required bytes privateKey = 3; // users' private key (to update / delete user data)
}

message TraceData {
	required bytes id = 1;
	required bytes kb = 2;
}

message Trace {
	required bytes publicKey = 1;
	required bytes hash = 2;
	required bytes iv = 3;
	required bytes data = 4;
}`)

export const Trace = protocol.root.lookupType("Trace");
export const TraceData = protocol.root.lookupType("TraceData");
export const UserData = protocol.root.lookupType("UserData");
export const HealthDepartmentData = protocol.root.lookupType("HealthDepartmentData")

