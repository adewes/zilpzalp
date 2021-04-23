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

import React, { useEffect, useRef, useState } from "react";
import { Trace, TraceData, UserData, HealthDepartmentData } from "helpers/protobuf";
import { hex2buf } from "./actions/utils";
import { withActions } from "components";
import QRCode from "qrcode";
import jsQR from "jsqr";
import { randomKeys, ks, encryptUserData, generateTraceData, gaPublicKey } from "./actions";

import "./index.scss";

const Setup = withActions(
	({
		gaPublicKey,
		gaPublicKeyAction,
		generateTraceData,
		generateTraceDataAction,
		encryptUserData,
		encryptUserDataAction,
		ks,
		ksAction,
		randomKeys,
		randomKeysAction}) => {

		const [qrCodesGenerated, setQrCodesGenerated] = useState(false)

		useEffect(() => {

			if (gaPublicKey === undefined)
				gaPublicKeyAction()

			// we generate H_s and H_is
			if (randomKeys === undefined)
				randomKeysAction(40)

			// we generate K_a, K_b & K_c
			if (ks === undefined)
				ksAction()

			// we generate the trace data based on the generated random keys
			if (generateTraceData === undefined && randomKeys !== undefined && ks !== undefined && gaPublicKey !== undefined){
				const traceData = {id: Buffer.from(hex2buf("aaaa")), kb: Buffer.from(hex2buf(ks.kb))}
				const traceDataPB = TraceData.encode(TraceData.fromObject(traceData)).finish()
				generateTraceDataAction({
					his: randomKeys.his,
					traceData: traceDataPB,
				}, gaPublicKey.data)
			} else if (generateTraceData !== undefined && !qrCodesGenerated) {

				setQrCodesGenerated(true)

				// we display the generated trace data

				generateTraceData.encryptedTraces.forEach((tr, i) => {
					// we encode each trace
					const trace = {
						publicKey: Buffer.from(hex2buf(tr.publicKey)),
						hash: Buffer.from(hex2buf(tr.hi)),
						iv: Buffer.from(hex2buf(tr.iv)),
						data: Buffer.from(hex2buf(tr.data)),
					}

					const tracePB = Trace.encode(Trace.fromObject(trace)).finish()

					QRCode.toCanvas(refs[i].current, [{data: new Uint8ClampedArray(tracePB)}], function (error) {
					  if (error)
					  	console.error(error)
					})
				})

			}
			if (encryptUserData === undefined && ks !== undefined){
				// we encrypt the user data
				encryptUserDataAction(ks.kc, "sdfsd fsdfsdf sdkjdsflkjsdflsjdflsdjflsdjflsdjfsldjf sdlfjsdl fjsdlfjsdl fjsldfkjsdlfjsdlfjsdlfjk")
			}
			else if (encryptUserData !== undefined){
				// user data is ready, ask the user to upload it

			}
		})

		const refs = []
		const canvases = []

		for(let i=0;i<40;i++){
			const ref = useRef(null)
			refs.push(ref)
			canvases.push(<canvas className="kip-qr-code" key={i} ref={ref} />)
		}

		return <div className="kip-qr-codes">
			{canvases}
		</div>;
	},
	[randomKeys, ks, encryptUserData, generateTraceData, gaPublicKey]
	)

export default Setup;
