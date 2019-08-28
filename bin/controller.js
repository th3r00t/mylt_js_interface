$(document).ready(function() {
    first_run = true
    startConnect()
        // Click handlers
    $("div#benchlight").click(function() {
        console.log('toggle')
        message = new Paho.MQTT.Message("0");
        message.destinationName = 'lighting/benchlight'
        message.qos = 0
        message.retained = false
        onConnect()
    });
    if (first_run) {
        if (client.isConnected()) {
            message = new Paho.MQTT.Message("2")
        }
    }
    first_run = false
});