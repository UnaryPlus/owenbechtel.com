//default values
//replaced with values in local storage if they exist
let data = {
    lastUnlockedLevel: 1,
    costume: 0,
    unlockedCostumes: [true].concat(Array(47).fill(false)),
    scores: {
        endlessMode: [],
        darkMode: [],
        timedMode: [],
        weirdMode: []
    }
}

let currentSong = "gravity-ball"
const gameHeight = Math.max(800, 600 * screen.height / screen.width)
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const fontStyle = {
    fontSize: 42,
    fontFamily: "Syncopate",
    fontStyle: "bold",
    metrics: {
        ascent: 38,
        descent: 10,
        fontSize: 48
    }
};

const levels = {}

/**
 * 0 = gap
 * 1 = random obstacle
 * 2 = obstacle on left
 * 3 = obstacle on right
 * 4 = moving obstacle
 * 5 = moving obstacle in opposite direction
 * 6 = ramp on left
 * 7 = ramp on right
 * 8 = spinning obstacle
 * 9 = spinning obstacle in opposite direction
 * 10 = reverse ramp on left
 * 11 = reverse ramp on right
 * 12 = tilting obstacle
 * 13 = tilting obstacle in opposite direction
 * 14 = turbine spinning anticlockwise
 * 15 = turbine spinning clockwise
 * (there has to be a gap after ramps and reverse ramps and a gap before and after turbines because they take up more vertical space)
**/

levels[1] = {
    cameraSpeed: 2,
    goals: [ 13, 11.25, 9.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[2] = {
    cameraSpeed: 2.5,
    goals: [ 11, 9.75, 8.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[3] = {
    cameraSpeed: 3,
    goals: [ 9, 8.25, 7.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[4] = {
    cameraSpeed: 3,
    goals: [ 14, 13, 12 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1 ]
}

levels[5] = {
    cameraSpeed: 3,
    goals: [ 14, 13, 12 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 4, 5, 0, 1, 1, 1, 1, 4, 5 ]
}

levels[6] = {
    cameraSpeed: 3,
    goals: [ 13.5, 13, 12.5 ],
    stars: 0,
    obstacles: [ 1, 4, 1, 5, 1, 4, 1, 5, 1, 4, 1, 5 ]
}

levels[7] = {
    cameraSpeed: 3.5,
    goals: [ 14.5, 13.75, 13 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ]
}

levels[8] = {
    cameraSpeed: 3.5,
    goals: [ 14.5, 13.75, 13 ],
    stars: 0,
    obstacles: [ 1, 4, 1, 0, 1, 5, 1, 0, 1, 4, 1, 0, 1, 5, 1 ]
}

levels[9] = {
    cameraSpeed: 3,
    goals: [ 26, 24.75, 23.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 6, 0, 5 ]
}

levels[10] = {
    cameraSpeed: 3.25,
    goals: [ 29, 27, 25 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[11] = {
    cameraSpeed: 5,
    goals: [ 21, 20, 19 ],
    stars: 0,
    obstacles: [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]
}

levels[12] = {
    cameraSpeed: 3.25,
    goals: [ 24, 23.25, 22.5 ],
    stars: 0,
    obstacles: [ 3, 6, 0, 3, 2, 7, 0, 2, 3, 6, 0, 3, 2, 7, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[13] = {
    cameraSpeed: 3,
    goals: [ 27.5, 25.75, 24 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 3, 2, 3, 2, 3, 6, 0, 7, 0, 6, 0, 7, 0 ]
}

levels[14] = {
    cameraSpeed: 4,
    goals: [ 23.75, 22.25, 20.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 4, 7, 0, 6, 0, 5, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ]
}

levels[15] = {
    cameraSpeed: 3.5,
    goals: [ 19, 18.5, 18 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[16] = {
    cameraSpeed: 3.5,
    goals: [ 32.75, 30.75, 28.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 3, 6, 0, 3, 6, 0, 3, 6, 0, 3, 6, 0, 1, 1, 1, 1, 1, 1, 2, 7, 0, 2, 7, 0, 2, 7, 0, 2, 7, 0 ]
}

levels[17] = {
    cameraSpeed: 3.5,
    goals: [ 31.75, 29, 26.25 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 4, 6, 0, 5, 7, 0, 4, 6, 0, 5, 7, 0, 1, 1, 1, 1, 1, 1, 4, 6, 0, 5, 7, 0, 4, 6, 0, 5, 7, 0 ]
}

levels[18] = {
    cameraSpeed: 3.75,
    goals: [ 38.5, 36, 33.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 0, 4, 5, 4, 5, 0, 2, 3, 2, 3, 0, 6, 0, 7, 0, 6, 0, 7, 0, 1, 1, 1, 1, 0, 4, 5, 4, 5, 0, 2, 3, 2, 3, 0, 6, 0, 7, 0, 6, 0, 7, 0 ]
}

levels[19] = {
    cameraSpeed: 3.5,
    goals: [ 25.25, 24.5, 23.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 5, 8, 5, 1, 1, 1, 1, 1, 1, 4, 9, 4, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[20] = {
    cameraSpeed: 5,
    goals: [ 29.25, 29, 28.75 ],
    stars: 0,
    obstacles: [ 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 8, 0, 9, 0, 8, 0, 9, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 2, 0, 3, 0, 2, 0, 3, 0, 2, 0, 3, 0 ]
}

levels[21] = {
    cameraSpeed: 3,
    goals: [ 35.5, 35, 34.5 ],
    stars: 0,
    obstacles: [ 8, 4, 9, 5, 8, 4, 9, 5, 2, 3, 2, 3, 2, 3, 2, 3, 8, 4, 9, 5, 8, 4, 9, 5, 2, 3, 2, 3, 2, 3, 2, 3 ]
}

levels[22] = {
    cameraSpeed: 4.25,
    goals: [ 34.5, 33.5, 32.5 ],
    stars: 0,
    obstacles: [ 6, 0, 9, 7, 0, 8, 6, 0, 9, 7, 0, 8, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 6, 0, 9, 7, 0, 8, 6, 0, 9, 7, 0, 8 ]
}

levels[23] = {
    cameraSpeed: 3.75,
    goals: [ 38.5, 37.5, 36.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[24] = {
    cameraSpeed: 3,
    goals: [ 37, 36, 35 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 3, 2, 3, 2, 1, 1, 1, 1, 3, 2, 3, 2, 3, 1, 1, 1, 1 ]
}

levels[25] = {
    cameraSpeed: 3.5,
    goals: [ 38, 36.75, 35.5 ],
    stars: 0,
    obstacles: [ 4, 10, 0, 5, 11, 0, 1, 1, 1, 1, 1, 1, 9, 10, 0, 8, 11, 0, 1, 1, 1, 1, 1, 3, 6, 0, 11, 0, 2, 3, 2, 7, 0, 10, 0, 1, 1, 1, 1, 1, 1 ]
}

levels[26] = {
    cameraSpeed: 4,
    goals: [ 29.25, 28.5, 27.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 10, 0, 11, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 10, 0, 11, 0, 4, 1, 5, 1, 4, 1, 5, 1 ]
}

levels[27] = {
    cameraSpeed: 4.5,
    goals: [ 41.25, 40.75, 40.25 ],
    stars: 0,
    obstacles: [ 10, 0, 11, 6, 0, 11, 0, 10, 7, 0, 10, 0, 11, 6, 0, 11, 0, 10, 7, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 10, 0, 11, 6, 0, 11, 0, 10, 7, 0, 10, 0, 11, 6, 0, 11, 0, 10, 7, 0 ]
}

levels[28] = {
    cameraSpeed: 3.5,
    goals: [ 52.5, 50, 47.5 ],
    stars: 0,
    obstacles: [ 1, 1, 8, 1, 1, 9, 1, 1, 8, 1, 1, 9, 4, 5, 8, 4, 5, 9, 4, 5, 8, 4, 5, 9, 6, 0, 7, 0, 8, 6, 0, 7, 0, 9, 1, 1, 8, 1, 1, 9, 1, 1, 8, 1, 1, 9, 4, 5, 8, 4, 5, 9, 4, 5, 8, 4, 5, 9 ]
}

levels[29] = {
    cameraSpeed: 2.5,
    goals: [ 33.25, 32.25, 31.25 ],
    stars: 0,
    obstacles: [ 6, 11, 6, 11, 6, 11, 6, 11, 0, 2, 3, 2, 3, 2, 3, 2, 7, 10, 7, 10, 7, 10, 7, 10, 0 ]
}

levels[30] = {
    cameraSpeed: 4,
    goals: [ 22.75, 21.75, 20.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 8, 0, 9, 0, 8, 0, 9, 0, 1, 1, 1, 1, 8, 4, 9, 4, 8, 4, 9, 4, 1, 1, 1, 1 ]
}

levels[31] = {
    cameraSpeed: 5,
    goals: [ 35.75, 34, 32.25 ],
    stars: 0,
    obstacles: [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 10, 0, 11, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 11, 0, 10, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ]
}

levels[32] = {
    cameraSpeed: 3.5,
    goals: [ 54.25, 53, 51.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 6, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[33] = {
    cameraSpeed: 3.5,
    goals: [ 44, 42.25, 40.5 ],
    stars: 0,
    obstacles: [ 4, 0, 8, 0, 12, 0, 5, 0, 9, 0, 13, 0, 4, 0, 8, 0, 12, 0, 5, 0, 9, 0, 13, 0, 4, 1, 8, 1, 12, 1, 5, 1, 9, 1, 13, 1, 4, 1, 8, 1, 12, 1, 5, 1, 9, 1, 13, 1 ]
}

levels[34] = {
    cameraSpeed: 3.25,
    goals: [ 36.25, 35.75, 35.25 ],
    stars: 0,
    obstacles: [ 3, 2, 0, 3, 2, 0, 3, 12, 2, 0, 3, 12, 2, 0, 3, 12, 12, 2, 0, 3, 12, 12, 2, 0, 3, 12, 12, 12, 2, 0, 3, 12, 12, 12, 2 ]
}

levels[35] = {
    cameraSpeed: 4.25,
    goals: [ 44.25, 42, 39.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 3, 6, 0, 4, 7, 0, 4, 6, 0, 4, 7, 0, 4, 6, 0, 9, 7, 0, 8, 6, 0, 9, 7, 0, 8, 6, 0, 12, 7, 0, 12, 6, 0, 12, 7, 0, 12, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ]
}

levels[36] = {
    cameraSpeed: 2.5,
    goals: [ 46.5, 45.75, 45 ],
    stars: 0,
    obstacles: [ 12, 12, 12, 12, 12, 12, 6, 11, 6, 11, 6, 11, 0, 2, 3, 2, 3, 2, 3, 2, 7, 10, 7, 10, 7, 10, 0, 12, 13, 12, 13, 12, 13, 12, 13 ]
}

levels[37] = {
    cameraSpeed: 4,
    goals: [ 52.25, 51.25, 50.25 ],
    stars: 0,
    obstacles: [ 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
}

levels[38] = {
    cameraSpeed: 3.75,
    goals: [ 28.75, 28.5, 28.25 ],
    stars: 0,
    obstacles: [ 11, 0, 10, 0, 11, 0, 10, 0, 11, 0, 8, 10, 0, 9, 11, 0, 8, 10, 0, 9, 11, 0, 12, 10, 0, 13, 11, 0, 12, 10, 0, 13 ]
}

levels[39] = {
    cameraSpeed: 3.25,
    goals: [ 66, 64.5, 63 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 3, 10, 0, 3, 1, 1, 1, 1, 1, 1, 2, 11, 0, 2, 1, 1, 1, 1, 1, 1, 3, 10, 0, 3, 1, 1, 1, 1, 1, 1, 2, 11, 0, 2, 1, 1, 1, 1, 1, 1, 4, 10, 0, 5, 1, 1, 1, 1, 1, 1, 5, 11, 0, 5, 1, 1, 1, 1, 1, 1 ]
}

levels[40] = {
    cameraSpeed: 4.75,
    goals: [ 44.5, 43.5, 42.5 ],
    stars: 0,
    obstacles: [ 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1 ]
}

levels[41] = {
    cameraSpeed: 4,
    goals: [ 36.5, 35.25, 34 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 14, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 15, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1 ]
}

levels[42] = {
    cameraSpeed: 4,
    goals: [ 50, 47.5, 45 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 0, 1, 1, 1, 3, 6, 0, 0, 14, 0, 6, 0, 0, 14, 0, 1, 1, 1, 1, 0, 1, 1, 1, 2, 7, 0, 0, 15, 0, 7, 0, 0, 15, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 8, 0, 15, 0, 9, 0, 14, 0, 8, 0, 15, 0, 9, 0, 14, 0 ]
}

levels[43] = {
    cameraSpeed: 5.25,
    goals: [ 44.75, 43, 41.25 ],
    stars: 0,
    obstacles: [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 14, 0, 0, 15, 0, 0, 14, 0, 0, 15, 0, 0, 14, 0, 0, 15, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 15, 0, 0, 14, 0, 0, 15, 0, 0, 14, 0, 0, 15, 0, 0, 14, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]
}

levels[44] = {
    cameraSpeed: 4,
    goals: [ 50.5, 48.75, 47 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 4, 1, 0, 1, 5, 1, 0, 3, 6, 0, 3, 0, 2, 7, 0, 2, 0, 1, 8, 1, 0, 1, 9, 1, 0, 3, 10, 0, 3, 0, 2, 11, 0, 2, 0, 1, 12, 1, 0, 1, 13, 1, 0, 1, 0, 14, 0, 1, 0, 1, 0, 15, 0, 1 ]
}

levels[45] = {
    cameraSpeed: 2.75,
    goals: [ 57.5, 54.5, 51.5 ],
    stars: 0,
    obstacles: [ 2, 3, 2, 3, 0, 15, 0, 3, 2, 3, 2, 0, 14, 0, 2, 3, 2, 3, 0, 15, 0, 3, 2, 3, 2, 0, 14, 0, 10, 0, 11, 0, 10, 0, 11, 0, 0, 15, 0, 11, 0, 10, 0, 11, 0, 10, 0, 0, 14, 0 ]
}

levels[46] = {
    cameraSpeed: 3.75,
    goals: [ 38.25, 37, 35.75 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 3, 6, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 6, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 0 ]
}

levels[47] = {
    cameraSpeed: 4.5,
    goals: [ 35.75, 34.75, 33.75 ],
    stars: 0,
    obstacles: [ 8, 0, 9, 0, 8, 0, 9, 0, 4, 5, 12, 4, 5, 0, 14, 0, 0, 15, 0, 0, 14, 0, 0, 15, 0, 0, 14, 0, 5, 4, 12, 5, 4, 0, 9, 0, 8, 0, 9, 0, 8, 0, 9, 0, 8, 0, 9, 0, 8 ]
}

levels[48] = {
    cameraSpeed: 3,
    goals: [ 56.5, 55, 53.5 ],
    stars: 0,
    obstacles: [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1 ]
}