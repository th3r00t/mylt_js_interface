$(document).ready(function() {
    startConnect()
    $("div#benchlight").click(function() {
        console.log('toggle')
        message = new Paho.MQTT.Message("0");
        message.destinationName = 'lighting/benchlight'
        message.qos = 0
        message.retained = false
        onConnect()
    });
});
/*
        $.ajax({
            type: "POST",
            url: '/controller',
            data: '',
            success: '',
            dataType: 'json'
        });
*/