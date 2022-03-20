function readLineSensors () {
    L1 = 0
    L2 = 0
    L3 = 0
    R1 = 0
    R2 = 0
    R3 = 0
    if (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 1) {
        L1 = 1
    }
    if (DFRobotMaqueenPlus.readPatrol(Patrol.L2) == 1) {
        L2 = 1
    }
    if (DFRobotMaqueenPlus.readPatrol(Patrol.L3) == 1) {
        L3 = 1
    }
    if (DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 1) {
        R1 = 1
    }
    if (DFRobotMaqueenPlus.readPatrol(Patrol.R2) == 1) {
        R2 = 1
    }
    if (DFRobotMaqueenPlus.readPatrol(Patrol.R3) == 1) {
        R3 = 1
    }
}
function route4 () {
    dojunction_type("L")
    turn_left()
    dojunction_type("T")
    basic.pause(1000)
    servo("DOWN")
}
function turn_right () {
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed)
    basic.pause(500)
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function servo (action: string) {
    if (action.compare("UP") == 0) {
        DFRobotMaqueenPlus.servoRun(Servos.S1, 40)
    } else if (action.compare("DOWN") == 0) {
        DFRobotMaqueenPlus.servoRun(Servos.S1, 110)
    } else {
    	
    }
}
function line_tracking () {
    readLineSensors()
    if (L1 == 1 && R1 == 1 && (L2 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, speed)
    }
    if (L1 == 0 && R1 == 1 && (L2 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
        DFRobotMaqueenPlus.mototStop(Motors.M2)
    }
    if (L1 == 1 && R1 == 0 && (L2 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed)
        DFRobotMaqueenPlus.mototStop(Motors.M1)
    }
    if (L1 == 1 && L2 == 1 && (R1 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed)
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed)
    }
    if (L1 == 0 && L2 == 0 && (R1 == 1 && R2 == 1)) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed)
    }
    if (L1 == 0 && L2 == 1 && (R1 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed)
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed)
    }
    if (L1 == 0 && L2 == 0 && (R1 == 0 && R2 == 1)) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed)
    }
    if (L1 == 0 && L2 == 0 && (R1 == 0 && R2 == 0)) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed)
    }
}
function dojunction_type (_type: string) {
    junction_type = ""
    while (junction_type.compare(_type) != 0) {
        line_tracking()
        judgment()
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function route3 () {
    dojunction_type("R")
    turn_right()
    dojunction_type("T")
    basic.pause(1000)
    servo("DOWN")
}
function route2 () {
    dojunction_type("T")
    basic.pause(1000)
    servo("DOWN")
}
function turn_left () {
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed)
    basic.pause(900)
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
}
function judgment () {
    if (L3 == 1 && R3 == 1) {
        junction_type = "T"
    } else if (L3 == 1) {
        junction_type = "L"
    } else if (R3 == 1) {
        junction_type = "R"
    } else {
        junction_type = ""
    }
}
let junction_type = ""
let R3 = 0
let R2 = 0
let R1 = 0
let L3 = 0
let L2 = 0
let L1 = 0
let speed = 0
DFRobotMaqueenPlus.I2CInit()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.OBJECTCLASSIFICATION)
speed = 50
let ID = 0
servo("DOWN")
basic.pause(1000)
servo("UP")
basic.pause(1000)
servo("DOWN")
basic.pause(1000)
servo("UP")
basic.pause(1000)
while (ID <= 1) {
    huskylens.request()
    if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        ID = 2
    } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        ID = 3
    } else if (huskylens.isAppear(4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        ID = 4
    } else {
    	
    }
}
basic.pause(10000)
if (ID == 2) {
    route2()
} else if (ID == 3) {
    route3()
} else if (ID == 4) {
    route4()
} else {
	
}
basic.forever(function () {
	
})
