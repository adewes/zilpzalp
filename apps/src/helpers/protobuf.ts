// Zilp-Zalp - Privacy-Friendly Contact Tracing
// Copyright (C) 2021-2021 The Zilp-Zalp Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

