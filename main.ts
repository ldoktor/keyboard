let data: Buffer = null
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
serial.setRxBufferSize(1)

let capsLock = true
let char = ""
let current = 0
let mapovani: any = {};
mapovani = {
    21 : "Q",
    29 : "W",
    36 : "E",
    45 : "R",
    44 : "T",
    53 : "Z",
    60 : "U",
    67 : "I",
    68 : "O",
    77 : "P",
    28 : "A",
    27 : "S",
    35 : "D",
    43 : "F",
    52 : "G",
    51 : "H",
    59 : "J",
    66 : "K",
    75 : "L",
    26 : "Y",
    34 : "X",
    33 : "C",
    42 : "V",
    50 : "B",
    49 : "N",
    58 : "M",
    41: '_'
}

basic.forever(function () {
    // XXX 240 XXX YYY 240 YYY ZZZ 240 ZZZ
    // Detect and show XXX YYY ZZZ
    data = serial.readBuffer(1)
    if (data[0] == 240) {
        return
    }
    // If they don't match we are out-of-sync, skip this char
    if (current != data[0]) {
        current = data[0]
        return
    }
    // Special chars
    if (current == 88) {
        capsLock = !capsLock
        if (capsLock) {
            basic.showArrow(0, 100)
        } else {
            basic.showArrow(180, 100)
        }
        return
    }
    char = mapovani[current]
    if (char == null) { // Unknown chars
        basic.showNumber(current)
    } else { // Normal chars
        if (!capsLock) {
            char == char.toLowerCase()
        }
        basic.showString(char)
    }
    basic.pause(100)
    basic.clearScreen()
})
