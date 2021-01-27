function enterCode () {
    enteringCode = true
    basic.clearScreen()
    serial.writeLine("ENTER PASSCODE")
    for (let idx = 0; idx <= passcode.length - 1; idx++) {
        led.plot(idx, 2)
        buttonPressed = false
        while (!(buttonPressed)) {
            if (input.buttonIsPressed(Button.A)) {
                if (checkButton("A", idx)) {
                    continue;
                } else {
                    raiseAlarm()
                    return false
                }
            } else if (input.buttonIsPressed(Button.B)) {
                if (checkButton("B", idx)) {
                    continue;
                } else {
                    raiseAlarm()
                    return false
                }
            }
        }
    }
    enteringCode = false
    return true
}
function toggleArmed () {
    armed = !(armed)
}
function showStatus () {
    serial.writeLine("ARMED " + armed)
    while (!(enteringCode) && !(alarming)) {
        basic.clearScreen()
        if (armed) {
            basic.showLeds(`
                . . # . .
                . # . # .
                . # # # .
                . # # # .
                . # # # .
                `)
        } else {
            basic.showLeds(`
                . # . . .
                # . # . .
                . . # # #
                . . # # #
                . . # # #
                `)
        }
    }
}
function checkButton (btn: string, index: number) {
    buttonPressed = true
    if (passcode.charAt(index) != btn) {
        return false
    }
    basic.pause(500)
    basic.clearScreen()
    return true
}
input.onButtonPressed(Button.AB, function () {
    if (enterCode()) {
        if (alarming) {
            stopAlarm()
            armed = false
        } else {
            toggleArmed()
        }
    }
})
function stopAlarm () {
    alarming = false
    serial.writeLine("ALARM STOPPED")
    basic.clearScreen()
}
function raiseAlarm () {
    alarming = true
    serial.writeLine("ALARM!")
    basic.showIcon(IconNames.Skull)
}
let buttonPressed = false
let enteringCode = false
let armed = false
let alarming = false
let passcode = ""
passcode = "AABB"
alarming = false
armed = false
basic.forever(function () {
    showStatus()
})
