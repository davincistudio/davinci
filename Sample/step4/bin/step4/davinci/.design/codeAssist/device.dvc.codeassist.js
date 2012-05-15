var device = {
	sensor: {
		accelerometer: {
			getCurrentAcceleration: function ( successCallback, errorCallback, option ){},
			watchAcceleration: function ( successCallback, errorCallback, option ){},
			clearWatch: function ( watchID ){}
		},
		compass: {
			getCurrentHeading: function ( successCallback, errorCallback, option ){},
			watchHeading: function ( successCallback, errorCallback, option ){},
			clearWatch: function ( watchID ){}
		},
		orientation: {
			getCurrentOrientation: function ( successCallback, errorCallback, option ){},
			watchOrientation: function ( successCallback, errorCallback ){},
			clearWatch: function ( watchID ){}
		},
		geolocation: {
			getCurrentPosition: function ( successCallback, errorCallback, option ){},
			watchPosition: function ( successCallback, errorCallback, option ){},
			clearWatch: function ( watchID ){}
		}
	},
	media: {
		camera: {
			getPicture: function ( successCallback, errorCallback, option ){}
		}
	},
	network: {
		isReachable: function ( hostname, successCallback, option ){},
		httpconnection: {
			request: function ( url, query, successCallback, errorCallback, timeout ){},
			requestImage: function ( url, query, successCallback, errorCallback, timeout ){}
		},
		filetransfer: {
			download: function ( url, query, filePath, successCallback, errorCallback, option ){},
			upload: function (filePath, server, successCallback, errorCallback, option ){}
		}
	},
	system: {
		information: {
			getUserPropoerty: function ( field ){},
			getSystemPropoerty: function ( field ){}
		},
		application: {
			notify: function ( appID, Parameter, successCallback, errorCallback ){},
			launchSystemViewer: function ( filePath, successCallback, errorCallback ){},
			launchDocumentViewer: function ( url, query, successCallback, errorCallback ){},
			exit: function (){},
			hideKeypad: function (){},
			openURL: function ( url ){},
			setAlarm: function ( alarmObject, successCallback, errorCallback ){},
			getAlarmList: function ( retriveCallback ){},
			clearAlarm: function ( alarmID, successCallback, errorCallback ){},
			clearmAllAlarm: function (){}
		},
		interaction: {
			vibrate: function (){},
			alert: function ( message, completeCallback, title, buttonLabel ){},
			confirm: function ( message, resultCallback, title, buttonLabel ){},
			startLoading: function ( title, message ){},
			stopLoading: function (){}
		},
		telephony: {
			call: function (number){},
			sendMessage: function ( number, message, successCallback, errorCallback ){}
		},
		setting: {
			setOrientation: function (mode){}
		},
		pim: {
			create: function (proeperites){
				return {
					clone: function (){},
					remove: function ( successCallback, errorCallback ){},
					save: function ( successCallback, errorCallback ){}
				};
			},
			find: function (field, successCallback, errorCallback, options){}
		}
	},
	security: {
		crypto: {
			hash: function (key, message, method, successCallback, errorCallback ){}
		}
	},
	DBConnection: {
		open: function ( name, version, display_name, size ){}
	},
	storage: {
		local: {
			key: function ( index ){},
			setItem: function ( key, value ){},
			getItem: function ( key ){},
			removeItem: function ( key ){},
			clear: function (){}
		},
		shared: {
			setItem: function ( key, value, successCallback, errorCallback ){},
			getItem: function ( key, successCallback, errorCallback ){},
			removeItem: function ( key, successCallback, errorCallback ){}
		}
	},
	console: {
		log: function ( message ){},
		warn: function ( message, maxDepth ){},
		error: function ( message, maxDepth ){}
	},
	iOS: {
		system: {
			setBadgeCount: function ( count ){},
			getBadgeCount: function ( successCallback ){},
			requestRemoteNotification: function ( successCallback, errorCallback ){}
		}
	}
};




