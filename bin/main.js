/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function startConnect() {
    clientID = "webcontrol_" + parseInt(Math.random() * 100);
    user = "guest"
    password = "guest"
    host = "10.0.0.2"
    port = "15675";
    client = new Paho.MQTT.Client(host, Number(port), '/ws', clientID, user, password);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        onSuccess: onConnect,
        reconnect: true,
        keepAliveInterval: (60 * 60 * 24),
        onFailure: connectionFailed,
    });
}
function onConnect() {
    cnx_status = client.isConnected()
    console.log("Connected")
    if (cnx_status) {
        if (message !== undefined) {
            client.send(message)
            message = undefined
            return true
        } else {
            console.log("No Message Waiting")
        }
        client.subscribe('lighting/')
    }
}
function onConnectionLost(responseObject) {
    console.log(responseObject)
    cnx_status = client.isConnected()
}

function connectionFailed(invocationContext) {
    console.log("Connection Failed")
    console.log(invocationContext)
}
function onMessageArrived(message) {
    console.log("Message: " + message.payloadString);
}
// Called when the disconnection button is pressed
// eslint-disable-next-line no-unused-vars
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML +=
        '<span>Disconnected</span><br/>';
}

function getLightStates() {
    message = new Paho.MQTT.Message("2")
    message.destinationName = 'lighting/benchlight'
    message.qos = 0
    message.retained = false
    onConnect()
    client.send(message)
}