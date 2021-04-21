import React, { useEffect} from "react";
import { withActions } from "components"
import { randomKeys, ks, encryptUserData, generateTraceData } from "./actions";

const Setup = withActions(
	({generateTraceData, generateTraceDataAction, encryptUserData, encryptUserDataAction, ks, ksAction, randomKeys, randomKeysAction}) => {
		useEffect(() => {
			if (randomKeys === undefined)
				randomKeysAction(20)
			if (ks === undefined)
				ksAction()
			if (generateTraceData === undefined)
				generateTraceDataAction(["c62a89eaa26df516e7652baad03bb2556a1be3f3cb65", "c62a89eaa26df516e7652baad03bb2556a1be3f3cb65"])
			if (encryptUserData === undefined && ks !== undefined)
				encryptUserDataAction(ks.kc, "sdfsd fsdfsdf sdkjdsflkjsdflsjdflsdjflsdjflsdjfsldjf sdlfjsdl fjsdlfjsdl fjsldfkjsdlfjsdlfjsdlfjk")

		})
		if (generateTraceData !== undefined)
			console.log(generateTraceData)
		return <div>done</div>;
	},
	[randomKeys, ks, encryptUserData, generateTraceData]
	)

export default Setup;
