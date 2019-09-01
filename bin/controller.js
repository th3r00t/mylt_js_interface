/* eslint-disable no-undef */

window.addEventListener("focus", handleBrowserState.bind(window, true));
window.addEventListener("blur", handleBrowserState.bind(window, false));

function handleBrowserState(isActive){
    // do something
    if (isActive) {
        if (client.isConnected()) {
            return
        } else {
            startConnect()
        }
    } else {
        client.disconnect()
    }
}

$(document).ready(function() {
    first_run = true
    startConnect()
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