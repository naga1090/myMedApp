export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "medapp1d924102": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "geo": {
        "medMap": {
            "Name": "string",
            "Style": "string",
            "Region": "string",
            "Arn": "string"
        },
        "medAppLoc": {
            "Name": "string",
            "Region": "string",
            "Arn": "string"
        }
    },
    "storage": {
        "medAppUserFiles": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}