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
        cnx_state = client.isConnected()
        if (cnx_state) {
            message = new Paho.MQTT.Message("2")
        } else {
            //startConnect()
        }
    }
    first_run = false
});