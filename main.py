data: Buffer = None
serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BAUD_RATE9600)

mapovani = {
    21: 'Q', 29: 'W', 36: 'E', 45: 'R', 44: 'T', 53: 'Z', 60: 'U', 67: 'I', 68: 'O', 77: 'P',
    28: 'A', 27: 'S', 35: 'D', 43: 'F', 52: 'G', 51: 'H', 59: 'J', 66: 'K', 75: 'L',
    26: 'Y', 34: 'X', 33: 'C', 42: 'V', 50: 'B', 49: 'N', 58: 'M'
}

def on_forever():
    global data
    data = serial.read_buffer(1)
    if data[0] == 240:
        data = serial.read_buffer(1)

basic.forever(on_forever)
