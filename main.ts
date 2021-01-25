function enterCode () {
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
                }
            } else if (input.buttonIsPressed(Button.B)) {
                if (checkButton("B", idx)) {
                    continue;
                } else {
                    raiseAlarm()
                }
            }
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
function raiseAlarm () {
    serial.writeLine("ALARM!")
    basic.showIcon(IconNames.Skull)
}
let buttonPressed = false
let passcode = ""
passcode = "AABB"
enterCode()
serial.writeLine("ARMED OR WHATEVER")
basic.clearScreen()
basic.showIcon(IconNames.Yes)
basic.pause(5000)
basic.clearScreen()
