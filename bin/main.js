function startConnect() {
    // Generate a random client ID
    clientID = "webcontrol_" + parseInt(Math.random() * 100);
    // Fetch the hostname/IP address and port number from the form
    host = "10.0.0.2"
    port = "15675";
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), '/ws', clientID);
    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
        reconnect: true,
        keepAliveInterval: (60 * 60 * 24),
        onFailure: connectionFailed,
    });
}
// Called when the client connects
function onConnect() {
    cnx_status = client.isConnected()
    console.log("Connected")
    if (cnx_status) {
        if (message !== undefined) {
            client.send(message)
            message = undefined
        } else {
            console.log("No Message Waiting")
        }
    }
}
// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log(responseObject)
    cnx_status = client.isConnected()
}

function connectionFailed(invocationContext) {
    console.log("Connection Failed")
    console.log(invocationContext)
}
// Called when a message arrives
function onMessageArrived(message) {
    console.log("Message: " + message.payloadString);
}
// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML +=
        '<span>Disconnected</span><br/>';
}