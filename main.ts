function enterCode () {
    serial.writeLine("ENTER PASSCODE")
    for (let idx = 0; idx <= passcode.length - 1; idx++) {
        led.plot(idx, 2)
        buttonPressed = 0
        while (buttonPressed == 0) {
            if (input.buttonIsPressed(Button.A)) {
                if (checkButton("A", idx) == 1) {
                    continue;
                } else {
                    raiseAlarm()
                }
            } else if (input.buttonIsPressed(Button.B)) {
                if (checkButton("B", idx) == 1) {
                    continue;
                } else {
                    raiseAlarm()
                }
            }
        }
    }
}
function checkButton (btn: string, index: number) {
    buttonPressed = 1
    if (passcode.charAt(index) != btn) {
        return 0
    }
    basic.pause(500)
    basic.clearScreen()
    return 1
}
function raiseAlarm () {
    serial.writeLine("ALARM!")
    basic.showIcon(IconNames.Skull)
}
let buttonPressed = 0
let passcode = ""
passcode = "AABB"
enterCode()
serial.writeLine("ARMED OR WHATEVER")
basic.clearScreen()
basic.showIcon(IconNames.Yes)
basic.pause(5000)
basic.clearScreen()
