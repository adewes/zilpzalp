import React, { useEffect, useRef, useState } from "react";
import { parse } from "protobufjs";
import { hex2buf } from "./actions/utils";
import { withActions } from "components";
import QRCode from "qrcode";
import jsQR from "jsqr";
import { randomKeys, ks, encryptUserData, generateTraceData } from "./actions";

const buf = parse(`syntax = "proto3";

message HDData {
	required bytes hs = 1;
	required bytes id = 2;
	required bytes kb = 3;
}

message UserData {
	required bytes hs = 1;
	required bytes id = 2;
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

const Trace = buf.root.lookupType("Trace");
const TraceData = buf.root.lookupType("TraceData");

const Setup = withActions(
	({generateTraceData, generateTraceDataAction, encryptUserData, encryptUserDataAction, ks, ksAction, randomKeys, randomKeysAction}) => {

		const code = useRef(null)
		const video = useRef(null)
		const image = useRef(null)

		const [videoStarted, setVideoStarted] = useState(false)

		useEffect(() => {

			if (randomKeys === undefined)
				randomKeysAction(20)
			if (ks === undefined)
				ksAction()
			if (generateTraceData === undefined && randomKeys !== undefined && ks !== undefined){
				const traceData = {id: Buffer.from(hex2buf("aaaa")), kb: Buffer.from(hex2buf(ks.kb))}
				const traceDataPB = TraceData.encode(TraceData.fromObject(traceData)).finish()
				generateTraceDataAction({
					his: randomKeys.his,
					traceData: traceDataPB,
				})
			} else if (generateTraceData !== undefined) {

				const tr = generateTraceData.encryptedTraces[0]

				// we encode each trace
				const trace = {
					publicKey: Buffer.from(hex2buf(tr.publicKey)),
					hash: Buffer.from(hex2buf(tr.hi)),
					iv: Buffer.from(hex2buf(tr.iv)),
					data: Buffer.from(hex2buf(tr.data)),
				}

				const tracePB = Trace.encode(Trace.fromObject(trace)).finish()

				console.log(tracePB.length)

				QRCode.toCanvas(code.current, [{data: new Uint8ClampedArray(tracePB)}], function (error) {
				  if (error) console.error(error)
				})
			}
			if (encryptUserData === undefined && ks !== undefined)
				encryptUserDataAction(ks.kc, "sdfsd fsdfsdf sdkjdsflkjsdflsjdflsdjflsdjflsdjfsldjf sdlfjsdl fjsdlfjsdl fjsldfkjsdlfjsdlfjsdlfjk")

			if (!videoStarted){
				setVideoStarted(true)

				navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			    .then(function(stream){
			        video.current.srcObject = stream;
			        video.current.play();
			        setInterval(() => {

					var context = image.current.getContext('2d');
 				      image.current.width = video.current.videoWidth;
					  image.current.height = video.current.videoHeight;
					  context.filter = "brightness(150%)"
					  const sx = video.current.videoWidth/2 - 200
					  const ex = video.current.videoWidth/2 + 200
					  const sy = video.current.videoHeight/2 - 200
					  const ey = video.current.videoHeight/2 + 200
					  context.drawImage(video.current, sx , sy, 400, 400, 0, 0, 400, 400);

						var imageData = context.getImageData(0, 0, 400, 400);
						var code = jsQR(imageData.data, imageData.width, imageData.height, {
						    inversionAttempts: "dontInvert",
						});
						console.log(code)

			        }, 100)
			    })
			    .catch(function(err) {
			        console.log("An error occurred: " + err);
			    });
			}
		})

		if (generateTraceData !== undefined)
			console.log(generateTraceData)


		return <div>
			<canvas ref={code} />
			<canvas ref={image} />
			<video ref={video}>Video stream not available</video>
		</div>;
	},
	[randomKeys, ks, encryptUserData, generateTraceData]
	)

export default Setup;
