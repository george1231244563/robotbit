function TURN_LEFT () {
    pins.servoSetPulse(AnalogPin.P13, 1300)
    pins.servoSetPulse(AnalogPin.P8, 1300)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        forward()
    }
    if (receivedNumber == 2) {
        Backward()
    }
    if (receivedNumber == 3) {
        STOP()
    }
    if (receivedNumber == 4) {
        TURN_RIGHT()
    }
    if (receivedNumber == 5) {
        TURN_LEFT()
    }
})
input.onButtonPressed(Button.A, function () {
    forward()
})
function STOP () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoSetPulse(AnalogPin.P13, 0)
    control.waitMicros(20000)
}
input.onButtonPressed(Button.AB, function () {
    STOP()
})
input.onButtonPressed(Button.B, function () {
    Backward()
})
function forward () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoSetPulse(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
function TURN_RIGHT () {
    pins.servoSetPulse(AnalogPin.P13, 1700)
    pins.servoSetPulse(AnalogPin.P8, 1700)
}
function sensor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    DISTANCE = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
}
function Backward () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
let DISTANCE = 0
radio.setGroup(12)
basic.showLeds(`
    # # . . .
    . # # . .
    . # # # .
    # # # # #
    # . . # #
    `)
DISTANCE = 0
let count = 0
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        sensor()
        if (DISTANCE < 4) {
            count += 1
        }
    }
    if (count < 4) {
        forward()
        control.waitMicros(500000)
        STOP()
        control.waitMicros(500000)
        TURN_LEFT()
        control.waitMicros(100000)
        STOP()
        control.waitMicros(500000)
        Backward()
        control.waitMicros(500000)
        count = 0
    }
    count = 0
})
