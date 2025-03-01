/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AudioManager.ts":
/*!*****************************!*\
  !*** ./src/AudioManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.play = function (key, src, loop, volume) {
        if (src === void 0) { src = undefined; }
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1.0; }
        var audio = AudioManager.audioMap.get(key);
        if (audio === undefined) {
            if (src === undefined)
                audio = new Audio();
            else
                audio = new Audio(src);
            audio.loop = loop;
            audio.volume = volume;
            AudioManager.audioMap.set(key, audio);
        }
        audio.play().catch(function (err) {
            console.warn(err);
            audio.setAttribute('muted', '');
            audio.muted = true;
        });
        return audio;
    };
    AudioManager.playMusic = function (src, loop) {
        if (loop === void 0) { loop = true; }
        var audio = AudioManager.audioMap.get("_music");
        if (audio !== undefined && !audio.src.endsWith(src)) {
            AudioManager.release("_music");
        }
        return AudioManager.play("_music", src, loop, 0.75);
    };
    AudioManager.pause = function (key) {
        var audio = AudioManager.audioMap.get(key);
        if (audio !== undefined) {
            audio.pause();
            return true;
        }
        return false;
    };
    AudioManager.release = function (key) {
        if (AudioManager.pause(key)) {
            AudioManager.audioMap.get(key).remove();
            return AudioManager.audioMap.delete(key);
        }
        return false;
    };
    AudioManager.autoPlayFix = function () {
        if (!AudioManager.autoPlayFixed) {
            console.info("Trying to fix autoplay...");
            AudioManager.autoPlayFixed = true;
            AudioManager.audioMap.forEach(function (val, key) {
                if (val.muted) {
                    val.removeAttribute('muted');
                    val.muted = false;
                    if (key == "_music") {
                        val.play().catch(function (err) {
                            if (AudioManager.autoPlayFixed)
                                console.warn(err);
                            AudioManager.autoPlayFixed = false;
                            val.setAttribute('muted', '');
                            val.muted = true;
                        });
                    }
                }
            });
        }
    };
    AudioManager.audioMap = new Map();
    AudioManager.autoPlayFixed = false;
    return AudioManager;
}());
exports["default"] = AudioManager;


/***/ }),

/***/ "./src/Camera.ts":
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Camera = (function () {
    function Camera() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.sizeX = 1;
        this.sizeY = 1;
    }
    return Camera;
}());
exports["default"] = Camera;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var TestLevel_1 = __webpack_require__(/*! ./levels/TestLevel */ "./src/levels/TestLevel.ts");
var Camera_1 = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
var Game = (function () {
    function Game() {
    }
    Game.update = function (timestamp) {
        Game.DEBUG = Game.isButtonDown("F2");
        Game.canvas = document.getElementById("main-canvas");
        var pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
        var scale = Math.floor(25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25);
        Game.canvas.width = scale * 25;
        Game.canvas.height = scale * 19;
        var ctx = Game.canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        ctx.save();
        ctx.translate(Game.camera.x, Game.camera.y);
        ctx.rotate(Game.camera.angle);
        ctx.scale(Game.camera.sizeX * (Game.canvas.width / 800), Game.camera.sizeY * (Game.canvas.height / 608));
        Game.level.update(ctx, (timestamp - Game.lastTimestamp) / 1000);
        ctx.restore();
        if (Game.isButtonDown('r')) {
            if (!Game.isPushingReload) {
                this.level.dispose();
                this.level = this.level.instanceFabric();
            }
            Game.isPushingReload = true;
        }
        else
            Game.isPushingReload = false;
        Game.lastTimestamp = timestamp;
    };
    Game.isButtonDown = function (keyName) {
        if (keyName.length == 1)
            keyName = keyName.toLowerCase();
        return Game.keyMap.has(keyName) && Game.keyMap.get(keyName);
    };
    Game.DEBUG = false;
    Game.lastTimestamp = performance.now();
    Game.level = new TestLevel_1.default();
    Game.camera = new Camera_1.default();
    Game.keyMap = new Map();
    Game.isPushingReload = false;
    return Game;
}());
exports["default"] = Game;


/***/ }),

/***/ "./src/SAT/Box.ts":
/*!************************!*\
  !*** ./src/SAT/Box.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
var Polygon_1 = __webpack_require__(/*! ./Polygon */ "./src/SAT/Polygon.ts");
var Box = (function () {
    function Box(pos, w, h) {
        if (pos === void 0) { pos = new Vector_1.default(); }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.pos = pos;
        this.w = w;
        this.h = h;
    }
    Box.prototype.toPolygon = function () {
        var pos = this.pos;
        var w = this.w;
        var h = this.h;
        return new Polygon_1.default(new Vector_1.default(pos.x, pos.y), [
            new Vector_1.default(), new Vector_1.default(w, 0),
            new Vector_1.default(w, h), new Vector_1.default(0, h)
        ]);
    };
    return Box;
}());
exports["default"] = Box;


/***/ }),

/***/ "./src/SAT/Polygon.ts":
/*!****************************!*\
  !*** ./src/SAT/Polygon.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
var Box_1 = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");
var Polygon = (function () {
    function Polygon(pos, points) {
        if (pos === void 0) { pos = new Vector_1.default(); }
        if (points === void 0) { points = []; }
        this.angle = 0;
        this.offset = new Vector_1.default();
        this.pos = pos;
        this.setPoints(points);
    }
    Polygon.prototype.setPoints = function (points) {
        var lengthChanged = !this.points || this.points.length !== points.length;
        if (lengthChanged) {
            var i = void 0;
            var calcPoints = this.calcPoints = [];
            var edges = this.edges = [];
            var normals = this.normals = [];
            for (i = 0; i < points.length; i++) {
                var p1 = points[i];
                var p2 = i < points.length - 1 ? points[i + 1] : points[0];
                if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
                    points.splice(i, 1);
                    i -= 1;
                    continue;
                }
                calcPoints.push(new Vector_1.default());
                edges.push(new Vector_1.default());
                normals.push(new Vector_1.default());
            }
        }
        this.points = points;
        this._recalc();
        return this;
    };
    Polygon.prototype.setAngle = function (angle) {
        this.angle = angle;
        this._recalc();
        return this;
    };
    Polygon.prototype.setOffset = function (offset) {
        this.offset = offset;
        this._recalc();
        return this;
    };
    Polygon.prototype.rotate = function (angle) {
        var points = this.points;
        var len = points.length;
        for (var i = 0; i < len; i++)
            points[i].rotate(angle);
        this._recalc();
        return this;
    };
    Polygon.prototype.translate = function (x, y) {
        var points = this.points;
        var len = points.length;
        for (var i = 0; i < len; i++) {
            points[i].x += x;
            points[i].y += y;
        }
        this._recalc();
        return this;
    };
    Polygon.prototype._recalc = function () {
        var calcPoints = this.calcPoints;
        var edges = this.edges;
        var normals = this.normals;
        var points = this.points;
        var offset = this.offset;
        var angle = this.angle;
        var len = points.length;
        var i;
        for (i = 0; i < len; i++) {
            var calcPoint = calcPoints[i].copy(points[i]);
            calcPoint.x += offset.x;
            calcPoint.y += offset.y;
            if (angle !== 0)
                calcPoint.rotate(angle);
        }
        for (i = 0; i < len; i++) {
            var p1 = calcPoints[i];
            var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
            var e = edges[i].copy(p2).sub(p1);
            normals[i].copy(e).perp().normalize();
        }
        return this;
    };
    Polygon.prototype.getAABB = function () {
        var points = this.calcPoints;
        var xMin = points[0].x;
        var yMin = points[0].y;
        var xMax = points[0].x;
        var yMax = points[0].y;
        for (var i = 1; i < points.length; i++) {
            var point = points[i];
            if (point.x < xMin)
                xMin = point.x;
            else if (point.x > xMax)
                xMax = point.x;
            if (point.y < yMin)
                yMin = point.y;
            else if (point.y > yMax)
                yMax = point.y;
        }
        return new Box_1.default(this.pos.clone().add(new Vector_1.default(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
    };
    Polygon.prototype.getCentroid = function () {
        var points = this.calcPoints;
        var len = points.length;
        var cx = 0;
        var cy = 0;
        var ar = 0;
        for (var i = 0; i < len; i++) {
            var p1 = points[i];
            var p2 = i === len - 1 ? points[0] : points[i + 1];
            var a = p1.x * p2.y - p2.x * p1.y;
            cx += (p1.x + p2.x) * a;
            cy += (p1.y + p2.y) * a;
            ar += a;
        }
        ar = ar * 3;
        cx = cx / ar;
        cy = cy / ar;
        return new Vector_1.default(cx, cy);
    };
    return Polygon;
}());
exports["default"] = Polygon;


/***/ }),

/***/ "./src/SAT/Response.ts":
/*!*****************************!*\
  !*** ./src/SAT/Response.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
var Response = (function () {
    function Response() {
        this.a = null;
        this.b = null;
        this.overlapN = new Vector_1.default();
        this.overlapV = new Vector_1.default();
        this.aInB = true;
        this.bInA = true;
        this.overlap = Number.MAX_VALUE;
    }
    Response.prototype.clear = function () {
        this.aInB = true;
        this.bInA = true;
        this.overlap = Number.MAX_VALUE;
        return this;
    };
    return Response;
}());
exports["default"] = Response;


/***/ }),

/***/ "./src/SAT/SAT.ts":
/*!************************!*\
  !*** ./src/SAT/SAT.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*!
* sat-js (or SAT.js) made by Jim Riecken and released under the MIT license
* Modified by Robert Corponoi and me (SonoPG)
* Changes made by me: Bug fixes and conversion to TypeScript
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Box_1 = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
var Response_1 = __webpack_require__(/*! ./Response */ "./src/SAT/Response.ts");
var T_VECTORS = [];
for (var i = 0; i < 10; i++)
    T_VECTORS.push(new Vector_1.default());
var T_ARRAYS = [];
for (var i = 0; i < 5; i++)
    T_ARRAYS.push([]);
var T_RESPONSE = new Response_1.default();
var TEST_POINT = new Box_1.default(new Vector_1.default(), 0.000001, 0.000001).toPolygon();
var LEFT_VORONOI_REGION = -1;
var MIDDLE_VORONOI_REGION = 0;
var RIGHT_VORONOI_REGION = 1;
function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++) {
        var dot = points[i].dot(normal);
        if (dot < min)
            min = dot;
        if (dot > max)
            max = dot;
    }
    result[0] = min;
    result[1] = max;
}
function voronoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    if (dp < 0)
        return LEFT_VORONOI_REGION;
    else if (dp > len2)
        return RIGHT_VORONOI_REGION;
    else
        return MIDDLE_VORONOI_REGION;
}
var SAT = (function () {
    function SAT() {
    }
    SAT.isSeparatingAxis = function (aPos, bPos, aPoints, bPoints, axis, response) {
        var rangeA = T_ARRAYS.pop();
        var rangeB = T_ARRAYS.pop();
        var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
        var projectedOffset = offsetV.dot(axis);
        flattenPointsOn(aPoints, axis, rangeA);
        flattenPointsOn(bPoints, axis, rangeB);
        rangeB[0] += projectedOffset;
        rangeB[1] += projectedOffset;
        if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
            T_VECTORS.push(offsetV);
            T_ARRAYS.push(rangeA);
            T_ARRAYS.push(rangeB);
            return true;
        }
        if (response) {
            var overlap = 0;
            if (rangeA[0] < rangeB[0]) {
                response.aInB = false;
                if (rangeA[1] < rangeB[1]) {
                    overlap = rangeA[1] - rangeB[0];
                    response.bInA = false;
                }
                else {
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];
                    overlap = option1 < option2 ? option1 : -option2;
                }
            }
            else {
                response.bInA = false;
                if (rangeA[1] > rangeB[1]) {
                    overlap = rangeA[0] - rangeB[1];
                    response.aInB = false;
                }
                else {
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];
                    overlap = option1 < option2 ? option1 : -option2;
                }
            }
            var absOverlap = Math.abs(overlap);
            if (absOverlap < response.overlap) {
                response.overlap = absOverlap;
                response.overlapN.copy(axis);
                if (overlap < 0)
                    response.overlapN.reverse();
            }
        }
        T_VECTORS.push(offsetV);
        T_ARRAYS.push(rangeA);
        T_ARRAYS.push(rangeB);
        return false;
    };
    SAT.pointInCircle = function (p, c) {
        var differenceV = T_VECTORS.pop().copy(p).sub(c.pos).sub(c.offset);
        var radiusSq = c.r * c.r;
        var distanceSq = differenceV.len2();
        T_VECTORS.push(differenceV);
        return distanceSq <= radiusSq;
    };
    SAT.pointInPolygon = function (p, poly) {
        TEST_POINT.pos.copy(p);
        T_RESPONSE.clear();
        var result = SAT.testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
        if (result)
            result = T_RESPONSE.aInB;
        return result;
    };
    SAT.testCircleCircle = function (a, b, response) {
        var differenceV = T_VECTORS.pop().copy(b.pos).add(b.offset).sub(a.pos).sub(a.offset);
        var totalRadius = a.r + b.r;
        var totalRadiusSq = totalRadius * totalRadius;
        var distanceSq = differenceV.len2();
        if (distanceSq > totalRadiusSq) {
            T_VECTORS.push(differenceV);
            return false;
        }
        if (response) {
            var dist = Math.sqrt(distanceSq);
            response.a = a;
            response.b = b;
            response.overlap = totalRadius - dist;
            response.overlapN.copy(differenceV.normalize());
            response.overlapV.copy(differenceV).scale(response.overlap);
            response.aInB = a.r <= b.r && dist <= b.r - a.r;
            response.bInA = b.r <= a.r && dist <= a.r - b.r;
        }
        T_VECTORS.push(differenceV);
        return true;
    };
    SAT.testPolygonCircle = function (polygon, circle, response) {
        var circlePos = T_VECTORS.pop().copy(circle.pos).add(circle.offset).sub(polygon.pos);
        var radius = circle.r;
        var radius2 = radius * radius;
        var points = polygon.calcPoints;
        var len = points.length;
        var edge = T_VECTORS.pop();
        var point = T_VECTORS.pop();
        for (var i = 0; i < len; i++) {
            var next = i === len - 1 ? 0 : i + 1;
            var prev = i === 0 ? len - 1 : i - 1;
            var overlap = 0;
            var overlapN = null;
            edge.copy(polygon.edges[i]);
            point.copy(circlePos).sub(points[i]);
            if (response && point.len2() > radius2)
                response.aInB = false;
            var region = voronoiRegion(edge, point);
            if (region === LEFT_VORONOI_REGION) {
                edge.copy(polygon.edges[prev]);
                var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
                region = voronoiRegion(edge, point2);
                if (region === RIGHT_VORONOI_REGION) {
                    var dist = point.len();
                    if (dist > radius) {
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        T_VECTORS.push(point2);
                        return false;
                    }
                    else if (response) {
                        response.bInA = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
                T_VECTORS.push(point2);
            }
            else if (region === RIGHT_VORONOI_REGION) {
                edge.copy(polygon.edges[next]);
                point.copy(circlePos).sub(points[next]);
                region = voronoiRegion(edge, point);
                if (region === LEFT_VORONOI_REGION) {
                    var dist = point.len();
                    if (dist > radius) {
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        return false;
                    }
                    else if (response) {
                        response.bInA = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
            }
            else {
                var normal = edge.perp().normalize();
                var dist = point.dot(normal);
                var distAbs = Math.abs(dist);
                if (dist > 0 && distAbs > radius) {
                    T_VECTORS.push(circlePos);
                    T_VECTORS.push(normal);
                    T_VECTORS.push(point);
                    return false;
                }
                else if (response) {
                    overlapN = normal;
                    overlap = radius - dist;
                    if (dist >= 0 || overlap < 2 * radius)
                        response.bInA = false;
                }
            }
            if (overlapN && response && Math.abs(overlap) < Math.abs(response.overlap)) {
                response.overlap = overlap;
                response.overlapN.copy(overlapN);
            }
        }
        if (response) {
            response.a = polygon;
            response.b = circle;
            response.overlapV.copy(response.overlapN).scale(response.overlap);
        }
        T_VECTORS.push(circlePos);
        T_VECTORS.push(edge);
        T_VECTORS.push(point);
        return true;
    };
    SAT.testCirclePolygon = function (circle, polygon, response) {
        var result = SAT.testPolygonCircle(polygon, circle, response);
        if (result && response) {
            var a = response.a;
            var aInB = response.aInB;
            response.overlapN.reverse();
            response.overlapV.reverse();
            response.a = response.b;
            response.b = a;
            response.aInB = response.bInA;
            response.bInA = aInB;
        }
        return result;
    };
    SAT.testPolygonPolygon = function (a, b, response) {
        var aPoints = a.calcPoints;
        var aLen = aPoints.length;
        var bPoints = b.calcPoints;
        var bLen = bPoints.length;
        for (var i = 0; i < aLen; i++) {
            if (SAT.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, a.normals[i], response)) {
                return false;
            }
        }
        for (var i = 0; i < bLen; i++) {
            if (SAT.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, b.normals[i], response)) {
                return false;
            }
        }
        if (response) {
            response.a = a;
            response.b = b;
            response.overlapV.copy(response.overlapN).scale(response.overlap);
        }
        return true;
    };
    return SAT;
}());
exports["default"] = SAT;


/***/ }),

/***/ "./src/SAT/Vector.ts":
/*!***************************!*\
  !*** ./src/SAT/Vector.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector.prototype.copy = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.perp = function () {
        var x = this.x;
        this.x = this.y;
        this.y = -x;
        return this;
    };
    Vector.prototype.rotate = function (angle) {
        var x = this.x;
        var y = this.y;
        this.x = x * Math.cos(angle) - y * Math.sin(angle);
        this.y = x * Math.sin(angle) + y * Math.cos(angle);
        return this;
    };
    Vector.prototype.reverse = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Vector.prototype.normalize = function () {
        var d = this.len();
        if (d > 0) {
            this.x = this.x / d;
            this.y = this.y / d;
        }
        return this;
    };
    Vector.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector.prototype.sub = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Vector.prototype.scale = function (x, y) {
        this.x *= x;
        this.y *= typeof y != 'undefined' ? y : x;
        return this;
    };
    Vector.prototype.project = function (other) {
        var amt = this.dot(other) / other.len2();
        this.x = amt * other.x;
        this.y = amt * other.y;
        return this;
    };
    Vector.prototype.projectN = function (other) {
        var amt = this.dot(other);
        this.x = amt * other.x;
        this.y = amt * other.y;
        return this;
    };
    Vector.prototype.reflect = function (axis) {
        var x = this.x;
        var y = this.y;
        this.project(axis).scale(2);
        this.x -= x;
        this.y -= y;
        return this;
    };
    Vector.prototype.reflectN = function (axis) {
        var x = this.x;
        var y = this.y;
        this.projectN(axis).scale(2);
        this.x -= x;
        this.y -= y;
        return this;
    };
    Vector.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vector.prototype.len2 = function () {
        return this.dot(this);
    };
    Vector.prototype.len = function () {
        return Math.sqrt(this.len2());
    };
    return Vector;
}());
exports["default"] = Vector;


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomUnsecureUUID = randomUnsecureUUID;
function randomUnsecureUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        return r.toString(16);
    });
}


/***/ }),

/***/ "./src/levels/BasicLevel.ts":
/*!**********************************!*\
  !*** ./src/levels/BasicLevel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var BasicLevel = (function () {
    function BasicLevel() {
        this.objects = [];
        this.removeQueue = [];
    }
    BasicLevel.prototype.update = function (ctx, delta) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(delta);
        }
        while (this.removeQueue.length != 0) {
            for (var o = 0; o < this.objects.length; o++) {
                if (this.objects[o].id == this.removeQueue[0]) {
                    this.objects[o].dispose();
                    this.objects.splice(o, 1);
                    break;
                }
            }
            this.removeQueue.splice(0, 1);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(ctx, delta);
        }
        if (Game_1.default.DEBUG) {
            this.drawCollisionLines(ctx);
        }
    };
    BasicLevel.prototype.removeObject = function (id) {
        this.removeQueue.push(id);
    };
    BasicLevel.prototype.isRemoved = function (id) {
        return this.removeQueue.includes(id);
    };
    BasicLevel.prototype.drawCollisionLines = function (ctx) {
        ctx.save();
        for (var i = 0; i < this.objects.length; i++) {
            var points = this.objects[i].polygon.points;
            ctx.beginPath();
            ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
            for (var p = 0; p < points.length; p++) {
                if (p + 1 == points.length) {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
                }
                else {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[p + 1].x, this.objects[i].polygon.pos.y + points[p + 1].y);
                }
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.objects[i].collision ? '#ff0000' : '#0000ff';
            ctx.stroke();
        }
        ctx.restore();
    };
    BasicLevel.prototype.dispose = function () {
        while (this.objects.length != 0) {
            this.objects[0].dispose();
            this.objects.splice(0, 1);
        }
    };
    return BasicLevel;
}());
exports["default"] = BasicLevel;


/***/ }),

/***/ "./src/levels/TestLevel.ts":
/*!*********************************!*\
  !*** ./src/levels/TestLevel.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var BasicLevel_1 = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");
var PlayerObject_1 = __webpack_require__(/*! ../objects/player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
var SpikeObject_1 = __webpack_require__(/*! ../objects/SpikeObject */ "./src/objects/SpikeObject.ts");
var AudioManager_1 = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
var TileObject_1 = __webpack_require__(/*! ../objects/TileObject */ "./src/objects/TileObject.ts");
var TestLevel = (function (_super) {
    __extends(TestLevel, _super);
    function TestLevel() {
        var _this = _super.call(this) || this;
        AudioManager_1.default.playMusic("assets/music/begins.ogg");
        _this.objects.push(new PlayerObject_1.default(32, 512));
        _this.objects.push(new TileObject_1.default("ground0", 0, 18, 25, 1, ["assets/textures/objects/sprFallingBlock.png"]));
        _this.objects.push(new TileObject_1.default("wall0", 8, 14, 1, 4, ["assets/textures/objects/sprFallingBlock.png"]));
        _this.objects.push(new TileObject_1.default("wall1", 9, 12, 1, 6, ["assets/textures/objects/sprFallingBlock.png"]));
        _this.objects.push(new SpikeObject_1.default("spike0", 320, 416, 1));
        _this.objects.push(new SpikeObject_1.default("spike1", 320, 384, 1));
        _this.objects.push(new SpikeObject_1.default("spike2", 288, 352, 0));
        return _this;
    }
    TestLevel.prototype.instanceFabric = function () {
        return new TestLevel();
    };
    return TestLevel;
}(BasicLevel_1.default));
exports["default"] = TestLevel;


/***/ }),

/***/ "./src/objects/BasicObject.ts":
/*!************************************!*\
  !*** ./src/objects/BasicObject.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var SAT_1 = __webpack_require__(/*! ../SAT/SAT */ "./src/SAT/SAT.ts");
var Response_1 = __webpack_require__(/*! ../SAT/Response */ "./src/SAT/Response.ts");
var Polygon_1 = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
var Vector_1 = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");
var BasicObject = (function () {
    function BasicObject(id, x, y, w, h) {
        this.collision = true;
        this.id = id;
        if (w == 0 && h == 0)
            this.collision = false;
        this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
            new Vector_1.default(), new Vector_1.default(0, h),
            new Vector_1.default(w, h), new Vector_1.default(w, 0)
        ]);
    }
    BasicObject.prototype.moveBy = function (x, y) {
        var collided = false;
        this.polygon.pos.add(new Vector_1.default(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.default.level.objects.length; i++) {
            if (!Game_1.default.level.objects[i].collision || Game_1.default.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.default.level.objects[i].polygon, response)) {
                collided = true;
                var aColl = this.onCollision(response, Game_1.default.level.objects[i]);
                var bColl = Game_1.default.level.objects[i].onCollision(response, this);
                if (aColl && bColl && this.collision)
                    this.polygon.pos.sub(response.overlapV);
            }
        }
        return collided;
    };
    BasicObject.prototype.onCollision = function (info, obj) { return true; };
    BasicObject.prototype.dispose = function () { };
    return BasicObject;
}());
exports["default"] = BasicObject;


/***/ }),

/***/ "./src/objects/ImageObject.ts":
/*!************************************!*\
  !*** ./src/objects/ImageObject.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var BasicObject_1 = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");
var ImageObject = (function (_super) {
    __extends(ImageObject, _super);
    function ImageObject(id, x, y, w, h, src) {
        var _this = _super.call(this, id, x, y, w, h) || this;
        _this.image = new Image();
        _this.image.src = src;
        _this.image.width = w;
        _this.image.height = h;
        return _this;
    }
    ImageObject.prototype.update = function (delta) { };
    ImageObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, this.image.width, this.image.height);
    };
    ImageObject.prototype.dispose = function () {
        this.image.remove();
        this.image = null;
    };
    return ImageObject;
}(BasicObject_1.default));
exports["default"] = ImageObject;


/***/ }),

/***/ "./src/objects/SpikeObject.ts":
/*!************************************!*\
  !*** ./src/objects/SpikeObject.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Polygon_1 = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
var Vector_1 = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");
var ImageObject_1 = __webpack_require__(/*! ./ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
var SpikeObject = (function (_super) {
    __extends(SpikeObject, _super);
    function SpikeObject(id, x, y, direction) {
        var _this = _super.call(this, id, x, y, 32, 32, "assets/textures/objects/sprSpike.png") || this;
        _this.direction = direction;
        switch (_this.direction) {
            case 3:
                _this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
                    new Vector_1.default(1, 16), new Vector_1.default(31, 31), new Vector_1.default(31, 1)
                ]);
                break;
            case 2:
                _this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
                    new Vector_1.default(1, 1), new Vector_1.default(16, 31), new Vector_1.default(31, 1)
                ]);
                break;
            case 1:
                _this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
                    new Vector_1.default(1, 1), new Vector_1.default(1, 31), new Vector_1.default(31, 16)
                ]);
                break;
            default:
                _this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
                    new Vector_1.default(16, 1), new Vector_1.default(1, 31), new Vector_1.default(31, 31)
                ]);
        }
        return _this;
    }
    SpikeObject.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.default) {
            obj.die();
        }
        return false;
    };
    SpikeObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.direction * 32, 0, 32, 32, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
    };
    return SpikeObject;
}(ImageObject_1.default));
exports["default"] = SpikeObject;


/***/ }),

/***/ "./src/objects/TileObject.ts":
/*!***********************************!*\
  !*** ./src/objects/TileObject.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ImageObject_1 = __webpack_require__(/*! ./ImageObject */ "./src/objects/ImageObject.ts");
var TileObject = (function (_super) {
    __extends(TileObject, _super);
    function TileObject(id, x, y, w, h, sources, order) {
        var _this = _super.call(this, id, x * 32, y * 32, w * 32, h * 32, sources.shift()) || this;
        _this.order = new Array(0);
        _this.image.width = 32;
        _this.image.height = 32;
        _this.totalW = w;
        _this.totalH = h;
        _this.otherImages = sources.map(function (src) {
            var img = new Image(32, 32);
            img.src = src;
            return img;
        });
        if (typeof order !== 'undefined')
            _this.order = order;
        return _this;
    }
    TileObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
        for (var i = 1; i < this.totalW * this.totalH; i++) {
            ctx.drawImage(i < this.order.length ? this.otherImages[this.order[i]] : this.image, this.polygon.pos.x + (i % this.totalW) * 32, this.polygon.pos.y + Math.floor(i / this.totalW) * 32, 32, 32);
        }
    };
    TileObject.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        while (this.otherImages.length != 0) {
            this.otherImages.shift().remove();
        }
    };
    return TileObject;
}(ImageObject_1.default));
exports["default"] = TileObject;


/***/ }),

/***/ "./src/objects/player/BloodParticle.ts":
/*!*********************************************!*\
  !*** ./src/objects/player/BloodParticle.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Response_1 = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
var SAT_1 = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var Vector_1 = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
var BloodParticle = (function (_super) {
    __extends(BloodParticle, _super);
    function BloodParticle(x, y, dx, dy, id) {
        var _this = _super.call(this, id, x, y, 2, 2, "assets/textures/objects/player/sprBlood.png") || this;
        _this.dx = 0;
        _this.dy = 0;
        _this.stuck = false;
        _this.type = 0;
        _this.dx = dx;
        _this.dy = dy;
        _this.type = Math.round(Math.random() * 3);
        _this.collision = false;
        return _this;
    }
    BloodParticle.prototype.update = function (delta) {
        if (this.stuck)
            return;
        this.dy += PlayerObject_1.default.gravity * delta;
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0)
                this.dx = 0;
        }
        else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0)
                this.dx = 0;
        }
        if (this.moveBy(this.dx, this.dy)) {
            this.dx = 0;
            this.dy = 0;
            this.stuck = true;
        }
    };
    BloodParticle.prototype.moveBy = function (x, y) {
        var collided = false;
        this.polygon.pos.add(new Vector_1.default(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.default.level.objects.length; i++) {
            if (!Game_1.default.level.objects[i].collision || Game_1.default.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.default.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.default.level.objects[i]);
                Game_1.default.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                }
            }
        }
        return collided;
    };
    BloodParticle.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.default)
            return false;
        if (obj instanceof SpikeObject_1.default)
            return Math.random() < 0.5;
        return true;
    };
    BloodParticle.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.type * 3, 0, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
    };
    return BloodParticle;
}(ImageObject_1.default));
exports["default"] = BloodParticle;


/***/ }),

/***/ "./src/objects/player/BulletObject.ts":
/*!********************************************!*\
  !*** ./src/objects/player/BulletObject.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var BulletObject = (function (_super) {
    __extends(BulletObject, _super);
    function BulletObject(x, y, direction, id) {
        var _this = _super.call(this, id, x - 5, y - 1, 10, 2, "assets/textures/objects/player/sprBullet.png") || this;
        _this.frameTime = 0;
        _this.direction = direction;
        return _this;
    }
    BulletObject.prototype.update = function (delta) {
        this.moveBy(this.direction * 750 * delta, 0);
    };
    BulletObject.prototype.onCollision = function (info, obj) {
        if (obj instanceof SpikeObject_1.default)
            return false;
        if (obj instanceof PlayerObject_1.default)
            return false;
        Game_1.default.level.removeObject(this.id);
        return false;
    };
    BulletObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.20)
            this.frameTime -= 0.20;
        ctx.drawImage(this.image, Math.floor(this.frameTime / 0.10) * 4, 0, 4, 4, this.polygon.pos.x + 3, this.polygon.pos.y - 1, 4, 4);
    };
    return BulletObject;
}(ImageObject_1.default));
exports["default"] = BulletObject;


/***/ }),

/***/ "./src/objects/player/DeathMessage.ts":
/*!********************************************!*\
  !*** ./src/objects/player/DeathMessage.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var DeathMessage = (function (_super) {
    __extends(DeathMessage, _super);
    function DeathMessage() {
        var _this = _super.call(this, "death_message", 400 - 350, 304 - 82, 700, 164, "assets/textures/ui/sprGameOver.png") || this;
        _this.collision = false;
        return _this;
    }
    return DeathMessage;
}(ImageObject_1.default));
exports["default"] = DeathMessage;


/***/ }),

/***/ "./src/objects/player/GibParticle.ts":
/*!*******************************************!*\
  !*** ./src/objects/player/GibParticle.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Response_1 = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
var SAT_1 = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var Vector_1 = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
var GibParticle = (function (_super) {
    __extends(GibParticle, _super);
    function GibParticle(x, y, dx, dy, type, id) {
        var _this = _super.call(this, id, x, y, 8, 8, "assets/textures/objects/player/sprGibs.png") || this;
        _this.dx = 0;
        _this.dy = 0;
        _this.type = 0;
        _this.bodyVariant = 0;
        _this.dx = dx;
        _this.dy = dy;
        _this.type = type;
        _this.collision = false;
        if (_this.type == 0 || _this.type == 1) {
            _this.bodyVariant = Math.round(Math.random() * 32);
        }
        return _this;
    }
    GibParticle.prototype.update = function (delta) {
        this.dy += PlayerObject_1.default.gravity * Math.min(delta, 0.3);
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0)
                this.dx = 0;
        }
        else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0)
                this.dx = 0;
        }
        this.moveBy(this.dx, this.dy);
    };
    GibParticle.prototype.moveBy = function (x, y) {
        var collided = false;
        var thisAABB = this.polygon.getAABB();
        this.polygon.pos.add(new Vector_1.default(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.default.level.objects.length; i++) {
            if (!Game_1.default.level.objects[i].collision || Game_1.default.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.default.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.default.level.objects[i]);
                Game_1.default.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                    var objtAABB = Game_1.default.level.objects[i].polygon.getAABB();
                    if (thisAABB.pos.y + thisAABB.points[2].y <= objtAABB.pos.y
                        || thisAABB.pos.y >= objtAABB.pos.y + objtAABB.points[2].y) {
                        this.dy *= -0.75;
                    }
                    else {
                        this.dx *= -0.75;
                    }
                }
            }
        }
        return collided;
    };
    GibParticle.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.default || obj instanceof SpikeObject_1.default)
            return false;
        return true;
    };
    GibParticle.prototype.draw = function (ctx, delta) {
        switch (this.type) {
            case 0:
                ctx.drawImage(this.image, this.bodyVariant * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
                break;
            case 1:
                ctx.drawImage(this.image, this.bodyVariant * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
                break;
            case 2:
                ctx.drawImage(this.image, 0, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
                break;
            case 3:
                ctx.drawImage(this.image, 10, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
                break;
            case 4:
                ctx.drawImage(this.image, 20, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
                break;
            case 5:
                ctx.drawImage(this.image, 28, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
                break;
            case 6:
                ctx.drawImage(this.image, 36, 18, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
                break;
            case 7:
                ctx.drawImage(this.image, 36, 22, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
        }
    };
    return GibParticle;
}(ImageObject_1.default));
exports["default"] = GibParticle;


/***/ }),

/***/ "./src/objects/player/PlayerObject.ts":
/*!********************************************!*\
  !*** ./src/objects/player/PlayerObject.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var BulletObject_1 = __webpack_require__(/*! ./BulletObject */ "./src/objects/player/BulletObject.ts");
var Utils_1 = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
var Vector_1 = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
var BloodParticle_1 = __webpack_require__(/*! ./BloodParticle */ "./src/objects/player/BloodParticle.ts");
var GibParticle_1 = __webpack_require__(/*! ./GibParticle */ "./src/objects/player/GibParticle.ts");
var DeathMessage_1 = __webpack_require__(/*! ./DeathMessage */ "./src/objects/player/DeathMessage.ts");
var AudioManager_1 = __webpack_require__(/*! ../../AudioManager */ "./src/AudioManager.ts");
var Polygon_1 = __webpack_require__(/*! ../../SAT/Polygon */ "./src/SAT/Polygon.ts");
var PlayerObject = (function (_super) {
    __extends(PlayerObject, _super);
    function PlayerObject(x, y, id) {
        if (id === void 0) { id = "player"; }
        var _this = _super.call(this, id, x, y, 32, 32, "assets/textures/objects/player/sprPlayer.png") || this;
        _this.frameTime = 0;
        _this.lookingDirection = 1;
        _this.rightKeyTime = 0;
        _this.leftKeyTime = 0;
        _this.jumpKeyTime = 0;
        _this.shootKeyTime = 0;
        _this.dx = 0;
        _this.dy = 1;
        _this.onGround = false;
        _this.availableJumps = 0;
        _this.polygon = new Polygon_1.default(new Vector_1.default(x, y), [
            new Vector_1.default(9, 11), new Vector_1.default(9, 32),
            new Vector_1.default(23, 32), new Vector_1.default(23, 11)
        ]);
        return _this;
    }
    PlayerObject.prototype.update = function (delta) {
        this.dy += PlayerObject.gravity * delta;
        this.dx = 0;
        if (Game_1.default.isButtonDown('ArrowRight')) {
            this.rightKeyTime++;
            if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
                this.dx = PlayerObject.velocity * delta;
            }
        }
        else
            this.rightKeyTime = 0;
        if (Game_1.default.isButtonDown('ArrowLeft')) {
            this.leftKeyTime++;
            if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
                this.dx = -PlayerObject.velocity * delta;
            }
        }
        else
            this.leftKeyTime = 0;
        if (Game_1.default.isButtonDown('x')) {
            if (this.shootKeyTime == 0) {
                var bulletId_1 = "bullet" + (0, Utils_1.randomUnsecureUUID)();
                AudioManager_1.default.play(bulletId_1, "assets/sounds/fire.wav").onended = function (e) { AudioManager_1.default.release(bulletId_1); };
                Game_1.default.level.objects.push(new BulletObject_1.default(this.polygon.pos.x + 16 + 10 * this.lookingDirection, this.polygon.pos.y + 21, this.lookingDirection, bulletId_1));
            }
            this.shootKeyTime++;
        }
        else
            this.shootKeyTime = 0;
        if ((Game_1.default.isButtonDown('Shift') || Game_1.default.isButtonDown('z')) && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
            if (this.jumpKeyTime == 0) {
                this.availableJumps--;
                if (this.availableJumps == 1)
                    AudioManager_1.default.play("jump1", "assets/sounds/jump1.wav");
                else
                    AudioManager_1.default.play("jump2", "assets/sounds/jump2.wav");
            }
            this.jumpKeyTime += delta;
            if (this.jumpKeyTime < 0.3) {
                if (this.availableJumps == 1)
                    this.dy = -220 * delta;
                else
                    this.dy = -180 * delta;
            }
        }
        else
            this.jumpKeyTime = 0;
        if (this.dx != 0)
            this.lookingDirection = Math.sign(this.dx);
        this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
        var previousPos = (new Vector_1.default()).copy(this.polygon.pos);
        this.onGround = false;
        if (this.moveBy(this.dx, this.dy)) {
            if (this.dy > 0 && this.polygon.pos.y == previousPos.y) {
                this.dy = 1;
                this.onGround = true;
                this.availableJumps = 2;
            }
        }
        if (!this.onGround && this.availableJumps > 1)
            this.availableJumps = 1;
    };
    PlayerObject.prototype.die = function () {
        if (Game_1.default.level.isRemoved(this.id))
            return;
        Game_1.default.level.removeObject(this.id);
        var center = this.polygon.getCentroid().add(this.polygon.pos);
        for (var i = 0; i < 128; i++) {
            Game_1.default.level.objects.push(new BloodParticle_1.default(center.x, center.y, Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6, Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10, "blood" + (0, Utils_1.randomUnsecureUUID)()));
        }
        for (var i = 0; i < 8; i += 2) {
            for (var o = 0; o < (i > 3 ? 2 : 1); o++) {
                Game_1.default.level.objects.push(new GibParticle_1.default(center.x, center.y, Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4, Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4, i, "gib" + (0, Utils_1.randomUnsecureUUID)()));
            }
        }
        AudioManager_1.default.playMusic("assets/music/gameover.ogg", false);
        Game_1.default.level.objects.push(new DeathMessage_1.default());
    };
    PlayerObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.40)
            this.frameTime -= 0.40;
        var frame = Math.floor(this.frameTime / 0.10);
        ctx.save();
        if (this.lookingDirection == -1) {
            ctx.translate(Game_1.default.canvas.width - this.polygon.pos.x, this.polygon.pos.y);
            ctx.scale(-1, 1);
            ctx.translate(Game_1.default.canvas.width - this.polygon.pos.x * 2 - 32, 0);
        }
        else {
            ctx.translate(this.polygon.pos.x, this.polygon.pos.y);
        }
        if (this.dy < 0) {
            if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
                ctx.drawImage(this.image, 0, 64, 32, 32, 0, 0, 32, 32);
            }
            else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
                ctx.drawImage(this.image, 32, 64, 32, 32, 0, 0, 32, 32);
            }
            else {
                ctx.drawImage(this.image, (frame % 2) * 32 + 64, 64, 32, 32, 0, 0, 32, 32);
            }
        }
        else if (!this.onGround) {
            ctx.drawImage(this.image, (frame % 2) * 32, 96, 32, 32, 0, 0, 32, 32);
        }
        else if (this.dx != 0) {
            ctx.drawImage(this.image, frame * 32, 32, 32, 32, 0, 0, 32, 32);
        }
        else {
            ctx.drawImage(this.image, frame * 32, 0, 32, 32, 0, 0, 32, 32);
        }
        ctx.restore();
    };
    PlayerObject.velocity = 175;
    PlayerObject.gravity = 24;
    return PlayerObject;
}(ImageObject_1.default));
exports["default"] = PlayerObject;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/

/*!
* I Wanna Be The Guy: The Movie: The Game
* TypeScript remake made by PGgamer2 (aka SonoPG).
* You can find the source code here: https://github.com/PGgamer2/IWBTG.ts
* Original game made by Kayin: https://kayin.moe/iwbtg/
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AudioManager_1 = __webpack_require__(/*! ./AudioManager */ "./src/AudioManager.ts");
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
function frame(timestamp) {
    Game_1.default.update(timestamp);
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
onkeydown = function (e) {
    Game_1.default.keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, true);
    AudioManager_1.default.autoPlayFix();
};
onkeyup = function (e) { Game_1.default.keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, false); };

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsY0FBYyxDQUFDLGFBQWEsQ0FBc0IsQ0FBQztRQUUxRSxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFF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RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7O0FDdEJBOzs7OztFQUtFOztBQUVGLHdGQUEwQztBQUMxQyxnRUFBMEI7QUFFMUIsU0FBUyxLQUFLLENBQUMsU0FBOEI7SUFDekMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUNELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVwQyxTQUFTLEdBQUcsVUFBUyxDQUFDO0lBQ2xCLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGLE9BQU8sR0FBRyxVQUFTLENBQUMsSUFBSSxjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXVkaW9NYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9DYW1lcmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9Cb3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9Qb2x5Z29uLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9TQVQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvQmFzaWNMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL1Rlc3RMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9CYXNpY09iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9JbWFnZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TcGlrZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9UaWxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CbG9vZFBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CdWxsZXRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0RlYXRoTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvR2liUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL1BsYXllck9iamVjdC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9NYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXVkaW9NYXA6IE1hcDxzdHJpbmcsIEhUTUxBdWRpb0VsZW1lbnQ+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheShrZXk6IHN0cmluZywgc3JjOiBzdHJpbmcgPSB1bmRlZmluZWQsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgdm9sdW1lOiBudW1iZXIgPSAxLjApOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHNyYyA9PT0gdW5kZWZpbmVkKSBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgICAgICBlbHNlIGF1ZGlvID0gbmV3IEF1ZGlvKHNyYyk7XHJcbiAgICAgICAgICAgIGF1ZGlvLmxvb3AgPSBsb29wO1xyXG4gICAgICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5zZXQoa2V5LCBhdWRpbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF1ZGlvLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgYXVkaW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlNdXNpYyhzcmM6IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IHRydWUpOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KFwiX211c2ljXCIpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkICYmICFhdWRpby5zcmMuZW5kc1dpdGgoc3JjKSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucmVsZWFzZShcIl9tdXNpY1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEF1ZGlvTWFuYWdlci5wbGF5KFwiX211c2ljXCIsIHNyYywgbG9vcCwgMC43NSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwYXVzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChBdWRpb01hbmFnZXIucGF1c2Uoa2V5KSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvUGxheUZpeGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1dG9QbGF5Rml4KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVHJ5aW5nIHRvIGZpeCBhdXRvcGxheS4uLlwiKTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfbXVzaWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgVGVzdExldmVsIGZyb20gJy4vbGV2ZWxzL1Rlc3RMZXZlbCc7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSAnLi9DYW1lcmEnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbGFzdFRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWw6IEJhc2ljTGV2ZWwgPSBuZXcgVGVzdExldmVsKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICBHYW1lLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgLy8gUmVzaXplIGtlZXBpbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgbGV0IHBhZ2VBc3BlY3RSYXRpbyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBNYXRoLmZsb29yKDI1IC8gMTkgPCBwYWdlQXNwZWN0UmF0aW8gPyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAvIDE5IDogZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIDI1KTtcclxuICAgICAgICBHYW1lLmNhbnZhcy53aWR0aCA9IHNjYWxlICogMjU7XHJcbiAgICAgICAgR2FtZS5jYW52YXMuaGVpZ2h0ID0gc2NhbGUgKiAxOTtcclxuICAgICAgICAvLyBHZXQgY29udGV4dCBhbmQgY2xlYXJcclxuICAgICAgICBsZXQgY3R4ID0gR2FtZS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIEdhbWUuY2FudmFzLndpZHRoLCBHYW1lLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW1lcmEueCwgR2FtZS5jYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZShHYW1lLmNhbWVyYS5hbmdsZSk7XHJcbiAgICAgICAgY3R4LnNjYWxlKEdhbWUuY2FtZXJhLnNpemVYICogKEdhbWUuY2FudmFzLndpZHRoIC8gODAwKSwgR2FtZS5jYW1lcmEuc2l6ZVkgKiAoR2FtZS5jYW52YXMuaGVpZ2h0IC8gNjA4KSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC51cGRhdGUoY3R4LCAodGltZXN0YW1wIC0gR2FtZS5sYXN0VGltZXN0YW1wKSAvIDEwMDApO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubGV2ZWwuaW5zdGFuY2VGYWJyaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNCdXR0b25Eb3duKGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChrZXlOYW1lLmxlbmd0aCA9PSAxKSBrZXlOYW1lID0ga2V5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBHYW1lLmtleU1hcC5oYXMoa2V5TmFtZSkgJiYgR2FtZS5rZXlNYXAuZ2V0KGtleU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xyXG5cclxuLyoqXHJcbiAqICMjIEJveFxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94LCB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XHJcbiAgcHVibGljIHBvczogVmVjdG9yO1xyXG4gIHB1YmxpYyB3OiBudW1iZXI7XHJcbiAgcHVibGljIGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBCb3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXHJcbiAgICogXHJcbiAgICogSWYgbm8gcG9zaXRpb24gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwgMClgLiBJZiBubyB3aWR0aCBvciBoZWlnaHQgYXJlIGdpdmVuLCB0aGV5IHdpbGxcclxuICAgKiBiZSBzZXQgdG8gYDBgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPW5ldyBWZWN0b3IoKV0gQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBib3R0b20tbGVmdCBvZiB0aGUgYm94KGkuZS4gdGhlIHNtYWxsZXN0IHggYW5kIHNtYWxsZXN0IHkgdmFsdWUpLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdz0wXSBUaGUgd2lkdGggb2YgdGhlIEJveC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2g9MF0gVGhlIGhlaWdodCBvZiB0aGUgQm94LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBvcyA9IG5ldyBWZWN0b3IoKSwgdyA9IDAsIGggPSAwKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMudyA9IHc7XHJcbiAgICB0aGlzLmggPSBoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cclxuICAgKi9cclxuICBwdWJsaWMgdG9Qb2x5Z29uKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5wb3M7XHJcbiAgICBjb25zdCB3ID0gdGhpcy53O1xyXG4gICAgY29uc3QgaCA9IHRoaXMuaDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcihwb3MueCwgcG9zLnkpLCBbXHJcbiAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3Rvcih3LCAwKSxcclxuICAgICAgbmV3IFZlY3Rvcih3LCBoKSwgbmV3IFZlY3RvcigwLCBoKVxyXG4gICAgXSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5cclxuLyoqXHJcbiAqICMjIFBvbHlnb25cclxuICogXHJcbiAqIFJlcHJlc2VudHMgYSAqY29udmV4KiBwb2x5Z29uIHdpdGggYW55IG51bWJlciBvZiBwb2ludHMgKHNwZWNpZmllZCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlcikuXHJcbiAqIFxyXG4gKiBOb3RlOiBEbyBfbm90XyBtYW51YWxseSBjaGFuZ2UgdGhlIGBwb2ludHNgLCBgYW5nbGVgLCBvciBgb2Zmc2V0YCBwcm9wZXJ0aWVzLiBVc2UgdGhlIHByb3ZpZGVkIFxyXG4gKiBzZXR0ZXJzLiBPdGhlcndpc2UgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSB1cGRhdGVkIGNvcnJlY3RseS5cclxuICogXHJcbiAqIGBwb3NgIGNhbiBiZSBjaGFuZ2VkIGRpcmVjdGx5LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XHJcbiAgcHVibGljIHBvczogVmVjdG9yO1xyXG4gIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIHBvaW50czogQXJyYXk8VmVjdG9yPjtcclxuICBwdWJsaWMgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPjtcclxuICBwdWJsaWMgZWRnZXM6IEFycmF5PFZlY3Rvcj47XHJcbiAgcHVibGljIG5vcm1hbHM6IEFycmF5PFZlY3Rvcj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZCBieSB2ZWN0b3JzIFxyXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9VmVjdG9yXSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBbcG9pbnRzPVtdXSBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgY29uc3QgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzLnBvaW50cyB8fCB0aGlzLnBvaW50cy5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgbGV0IGk7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XHJcbiAgICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XHJcblxyXG4gICAgICAgIGlmIChwMSAhPT0gcDIgJiYgcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55KSB7XHJcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjUG9pbnRzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZWNhbGMoKTogUG9seWdvbiB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjYWxjUG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcblxyXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcclxuICAgICAgY2FsY1BvaW50LnkgKz0gb2Zmc2V0Lnk7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGUgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xyXG5cclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBBQUJCLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgQUFCQi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICBsZXQgeE1pbiA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW4gPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heCA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNYXggPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludC54IDwgeE1pbikgeE1pbiA9IHBvaW50Lng7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnggPiB4TWF4KSB4TWF4ID0gcG9pbnQueDtcclxuXHJcbiAgICAgIGlmIChwb2ludC55IDwgeU1pbikgeU1pbiA9IHBvaW50Lnk7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnkgPiB5TWF4KSB5TWF4ID0gcG9pbnQueTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLnBvcy5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldENlbnRyb2lkKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBjeCA9IDA7XHJcbiAgICBsZXQgY3kgPSAwO1xyXG4gICAgbGV0IGFyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XHJcblxyXG4gICAgICBjb25zdCBhID0gcDEueCAqIHAyLnkgLSBwMi54ICogcDEueTtcclxuXHJcbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xyXG4gICAgICBjeSArPSAocDEueSArIHAyLnkpICogYTtcclxuICAgICAgYXIgKz0gYTtcclxuICAgIH1cclxuXHJcbiAgICBhciA9IGFyICogMzsgLy8gd2Ugd2FudCAxIC8gNiB0aGUgYXJlYSBhbmQgd2UgY3VycmVudGx5IGhhdmUgMiphcmVhXHJcbiAgICBjeCA9IGN4IC8gYXI7XHJcbiAgICBjeSA9IGN5IC8gYXI7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogIyMgUmVzcG9uc2VcclxuICogXHJcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcclxuICBwdWJsaWMgYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgYjogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIG92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGJJbkE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBvdmVybGFwOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXIoKTogUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iLCIvKiFcclxuKiBzYXQtanMgKG9yIFNBVC5qcykgbWFkZSBieSBKaW0gUmllY2tlbiBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxyXG4qIENoYW5nZXMgbWFkZSBieSBtZTogQnVnIGZpeGVzIGFuZCBjb252ZXJzaW9uIHRvIFR5cGVTY3JpcHRcclxuKi9cclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcclxuXHJcbi8qKlxyXG4gKiAjIyBPYmplY3QgUG9vbHNcclxuICovXHJcblxyXG4vKipcclxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICogXHJcbiAqIEB0eXBlIHtBcnJheTxWZWN0b3I+fVxyXG4gKi9cclxuIGNvbnN0IFRfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gXHJcbiAvKipcclxuICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAqIFxyXG4gICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICovXHJcbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBUX0FSUkFZUy5wdXNoKFtdKTtcclxuIFxyXG5cclxuLyoqXHJcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAqL1xyXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4vKipcclxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UG9seWdvbn1cclxuICovXHJcbmNvbnN0IFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbi8qKlxyXG4gKiAjIyBDb25zdGFudHMgZm9yIFZvcm9ub2kgcmVnaW9ucy5cclxuICovXHJcbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuY29uc3QgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuLyoqXHJcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XHJcblxyXG4gICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0WzBdID0gbWluO1xyXG4gIHJlc3VsdFsxXSA9IG1heDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICogXHJcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICogXHJcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpO1xyXG4gICAgY29uc3QgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCk7XHJcbiAgXHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICBjb25zdCBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICBcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG4gIFxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlLm92ZXJsYXApIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG4gIFxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJbkNpcmNsZShwOiBWZWN0b3IsIGM6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShwKS5zdWIoYy5wb3MpLnN1YihjLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzU3EgPSBjLnIgKiBjLnI7XHJcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBpcyBzbWFsbGVyIHRoYW4gdGhlIHJhZGl1cyB0aGVuIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZS5cclxuICAgIHJldHVybiBkaXN0YW5jZVNxIDw9IHJhZGl1c1NxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjb252ZXggcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHkgVGhlIHBvbHlnb24gdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24gb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJblBvbHlnb24ocDogVmVjdG9yLCBwb2x5OiBQb2x5Z29uKTogYm9vbGVhbiB7XHJcbiAgICBURVNUX1BPSU5ULnBvcy5jb3B5KHApO1xyXG4gICAgVF9SRVNQT05TRS5jbGVhcigpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25Qb2x5Z29uKFRFU1RfUE9JTlQsIHBvbHksIFRfUkVTUE9OU0UpO1xyXG5cclxuICAgIGlmIChyZXN1bHQpIHJlc3VsdCA9IFRfUkVTUE9OU0UuYUluQjtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdHdvIGNpcmNsZXMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBiIFRoZSBzZWNvbmQgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RDaXJjbGVDaXJjbGUoYTogQ2lyY2xlLCBiOiBDaXJjbGUsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXJzIG9mIHRoZSB0d28gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShiLnBvcykuYWRkKGIub2Zmc2V0KS5zdWIoYS5wb3MpLnN1YihhLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSBhLnIgKyBiLnI7XHJcbiAgICBjb25zdCB0b3RhbFJhZGl1c1NxID0gdG90YWxSYWRpdXMgKiB0b3RhbFJhZGl1cztcclxuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxyXG4gICAgaWYgKGRpc3RhbmNlU3EgPiB0b3RhbFJhZGl1c1NxKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGRpc3RhbmNlU3EpO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBiO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYUluQiA9IGEuciA8PSBiLnIgJiYgZGlzdCA8PSBiLnIgLSBhLnI7XHJcbiAgICAgIHJlc3BvbnNlLmJJbkEgPSBiLnIgPD0gYS5yICYmIGRpc3QgPD0gYS5yIC0gYi5yO1xyXG4gICAgfVxyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uOiBQb2x5Z29uLCBjaXJjbGU6IENpcmNsZSwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2lyY2xlUG9zID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoY2lyY2xlLnBvcykuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvcyk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKTtcclxuICAgIGNvbnN0IHBvaW50ID0gVF9WRUNUT1JTLnBvcCgpO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcclxuXHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cclxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXHJcbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50IGlzIGJpZ2dlciB0aGFuIHRoZSByYWRpdXMsIHRoZSBwb2x5Z29uIGlzIGRlZmluaXRlbHkgbm90IGZ1bGx5IGluIHRoZSBjaXJjbGUuXHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxyXG4gICAgICBsZXQgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcclxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBSSUdIVF9WT1JPTk9JX1JFR0lPTiBvZiB0aGUgcHJldmlvdXMgZWRnZS5cclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1twcmV2XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXHJcbiAgICAgICAgY29uc3QgcG9pbnQyID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cclxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jvbm9pIHJlZ2lvbikuXHJcbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IG92ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IHBvbHlnb247XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXHJcbiAgICogYXQgdGhlIGVuZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICBjb25zdCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcclxuICAgICAgY29uc3QgYUluQiA9IHJlc3BvbnNlLmFJbkI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xyXG4gICAgICByZXNwb25zZS5iID0gYTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0iLCIvKipcclxuICogIyMgVmVjdG9yXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuICogXHJcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcclxuICogaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgIHRoaXMueSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy55O1xyXG4gICAgdGhpcy55ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLnkgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgIHRoaXMueSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlXHJcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICo9IHg7XHJcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBwdWJsaWMgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gcmFuZG9tVW5zZWN1cmVVVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ3h4eHgteHh4eC14eHgteHh4eCcucmVwbGFjZSgvW3hdL2csIChjKSA9PiB7ICBcclxuICAgICAgICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpOyAgXHJcbiAgICAgICAgcmV0dXJuIHIudG9TdHJpbmcoMTYpOyAgXHJcbiAgICB9KTtcclxufSIsImltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2ljTGV2ZWwge1xyXG4gICAgcHVibGljIG9iamVjdHM6IEFycmF5PEJhc2ljT2JqZWN0PiA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIHJlbW92ZVF1ZXVlOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5yZW1vdmVRdWV1ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tvXS5pZCA9PSB0aGlzLnJlbW92ZVF1ZXVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW29dLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKG8sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUXVldWUuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVyaW5nXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLmRyYXcoY3R4LCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lLkRFQlVHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0NvbGxpc2lvbkxpbmVzKGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVPYmplY3QoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUXVldWUucHVzaChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUmVtb3ZlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlUXVldWUuaW5jbHVkZXMoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3Q29sbGlzaW9uTGluZXMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50czogVmVjdG9yW10gPSB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb2ludHM7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCBwb2ludHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwICsgMSA9PSBwb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1twICsgMV0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbcCArIDFdLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLm9iamVjdHNbaV0uY29sbGlzaW9uID8gJyNmZjAwMDAnIDogJyMwMDAwZmYnO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUodGhpcy5vYmplY3RzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1swXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBpbnN0YW5jZUZhYnJpYygpOiBCYXNpY0xldmVsO1xyXG59IiwiaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSAnLi9CYXNpY0xldmVsJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuLi9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFRpbGVPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9UaWxlT2JqZWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdExldmVsIGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvYmVnaW5zLm9nZ1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGxheWVyT2JqZWN0KDMyLCA1MTIpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyb3VuZDBcIiwgMCwgMTgsIDI1LCAxLCBbXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCJdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ3YWxsMFwiLCA4LCAxNCwgMSwgNCwgW1wiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDFcIiwgOSwgMTIsIDEsIDYsIFtcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIl0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UwXCIsIDMyMCwgNDE2LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UxXCIsIDMyMCwgMzg0LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UyXCIsIDI4OCwgMzUyLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbmNlRmFicmljKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdExldmVsKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi9TQVQvU0FUJztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHBvbHlnb246IFBvbHlnb247XHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICBpZiAodyA9PSAwICYmIGggPT0gMCkgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3RvcigwLCBoKSxcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcih3LCBoKSwgbmV3IFZlY3Rvcih3LCAwKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2xsOiBib29sZWFuID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCAmJiBiQ29sbCAmJiB0aGlzLmNvbGxpc2lvbikgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHt9XHJcbn0iLCJpbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLmltYWdlLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLmltYWdlLmhlaWdodCA9IGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgdGhpcy5pbWFnZS53aWR0aCwgdGhpcy5pbWFnZS5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZU9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwclNwaWtlLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMSwgMTYpLCBuZXcgVmVjdG9yKDMxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMSwgMSksIG5ldyBWZWN0b3IoMTYsIDMxKSwgbmV3IFZlY3RvcigzMSwgMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDE2KVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxNiwgMSksIG5ldyBWZWN0b3IoMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAzMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHtcclxuICAgICAgICAgICAgKG9iaiBhcyBQbGF5ZXJPYmplY3QpLmRpZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuZGlyZWN0aW9uICogMzIsIDAsIDMyLCAzMiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDMyLCAzMik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSBcIi4vSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZU9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyBvdGhlckltYWdlczogSFRNTEltYWdlRWxlbWVudFtdO1xyXG4gICAgcHVibGljIHRvdGFsVzogbnVtYmVyO1xyXG4gICAgcHVibGljIHRvdGFsSDogbnVtYmVyO1xyXG4gICAgcHVibGljIG9yZGVyOiBudW1iZXJbXSA9IG5ldyBBcnJheSgwKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNvdXJjZXM6IHN0cmluZ1tdLCBvcmRlcj86IG51bWJlcltdKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggKiAzMiwgeSAqIDMyLCB3ICogMzIsIGggKiAzMiwgc291cmNlcy5zaGlmdCgpKTtcclxuICAgICAgICB0aGlzLmltYWdlLndpZHRoID0gMzI7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQgPSAzMjtcclxuICAgICAgICB0aGlzLnRvdGFsVyA9IHc7XHJcbiAgICAgICAgdGhpcy50b3RhbEggPSBoO1xyXG4gICAgICAgIHRoaXMub3RoZXJJbWFnZXMgPSBzb3VyY2VzLm1hcChzcmMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKDMyLCAzMik7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIHJldHVybiBpbWc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcmRlciAhPT0gJ3VuZGVmaW5lZCcpIHRoaXMub3JkZXIgPSBvcmRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDMyLCAzMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnRvdGFsVyAqIHRoaXMudG90YWxIOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpIDwgdGhpcy5vcmRlci5sZW5ndGggPyB0aGlzLm90aGVySW1hZ2VzW3RoaXMub3JkZXJbaV1dIDogdGhpcy5pbWFnZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3MueCArIChpICUgdGhpcy50b3RhbFcpICogMzIsIHRoaXMucG9seWdvbi5wb3MueSArIE1hdGguZmxvb3IoaSAvIHRoaXMudG90YWxXKSAqIDMyLCAzMiwgMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgd2hpbGUodGhpcy5vdGhlckltYWdlcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVySW1hZ2VzLnNoaWZ0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvb2RQYXJ0aWNsZSBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdHVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDIsIDIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJsb29kLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R1Y2spIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnN0dWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMudHlwZSAqIDMsIDAsIDMsIDQsIHRoaXMucG9seWdvbi5wb3MueCAtIDEsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDMsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEltYWdlT2JqZWN0IGZyb20gJy4uL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0T2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIGZyYW1lVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCAtIDUsIHkgLSAxLCAxMCwgMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByQnVsbGV0LnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmRpcmVjdGlvbiAqIDc1MCAqIGRlbHRhLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuMjApIHRoaXMuZnJhbWVUaW1lIC09IDAuMjA7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lIC8gMC4xMCkgKiA0LCAwLCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAzLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBJbWFnZU9iamVjdCBmcm9tIFwiLi4vSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVhdGhNZXNzYWdlIGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkZWF0aF9tZXNzYWdlXCIsIDQwMCAtIDM1MCwgMzA0IC0gODIsIDcwMCwgMTY0LCBcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2liUGFydGljbGUgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBib2R5VmFyaWFudDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlIDA6IGJvZHksXHJcbiAgICAgKiB0eXBlIDE6IGJvZHkgc3RvbmVkLFxyXG4gICAgICogdHlwZSAyOiBoZWFkLFxyXG4gICAgICogdHlwZSAzOiBoZWFkIHN0b25lZCxcclxuICAgICAqIHR5cGUgNDogYXJtLFxyXG4gICAgICogdHlwZSA1OiBhcm0gc3RvbmVkLFxyXG4gICAgICogdHlwZSA2OiBmZWV0LFxyXG4gICAgICogdHlwZSA3OiBmZWV0IHN0b25lZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgdHlwZTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDgsIDgsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckdpYnMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMCB8fCB0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHlWYXJpYW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogTWF0aC5taW4oZGVsdGEsIDAuMyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRoaXNBQUJCOiBQb2x5Z29uID0gdGhpcy5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9ianRBQUJCOiBQb2x5Z29uID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24uZ2V0QUFCQigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzQUFCQi5wb3MueSArIHRoaXNBQUJCLnBvaW50c1syXS55IDw9IG9ianRBQUJCLnBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXNBQUJCLnBvcy55ID49IG9ianRBQUJCLnBvcy55ICsgb2JqdEFBQkIucG9pbnRzWzJdLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keSAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR4ICo9IC0wLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCB8fCBvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmJvZHlWYXJpYW50ICogMiwgMCwgMiwgOSwgdGhpcy5wb2x5Z29uLnBvcy54ICsgNCwgdGhpcy5wb2x5Z29uLnBvcy55LCAyLCA5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMTgsIDEwLCAxNiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDEwLCAxNik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAxMCwgMTgsIDEwLCAxNiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDEwLCAxNik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDI4LCAxOCwgOCwgOCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDgsIDgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMzYsIDE4LCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAyLCB0aGlzLnBvbHlnb24ucG9zLnkgKyA0LCA0LCA0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQgfSBmcm9tICcuLi8uLi9VdGlscyc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCBCbG9vZFBhcnRpY2xlIGZyb20gJy4vQmxvb2RQYXJ0aWNsZSc7XHJcbmltcG9ydCBHaWJQYXJ0aWNsZSBmcm9tICcuL0dpYlBhcnRpY2xlJztcclxuaW1wb3J0IERlYXRoTWVzc2FnZSBmcm9tICcuL0RlYXRoTWVzc2FnZSc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlbG9jaXR5OiBudW1iZXIgPSAxNzU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXZpdHk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgIHB1YmxpYyBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJQbGF5ZXIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcig5LCAxMSksIG5ldyBWZWN0b3IoOSwgMzIpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDIzLCAzMiksIG5ldyBWZWN0b3IoMjMsIDExKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRJZDogc3RyaW5nID0gXCJidWxsZXRcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCdWxsZXRPYmplY3QodGhpcy5wb2x5Z29uLnBvcy54ICsgMTYgKyAxMCAqIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RLZXlUaW1lKys7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lLmxldmVsLmlzUmVtb3ZlZCh0aGlzLmlkKSkgcmV0dXJuO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIGxldCBjZW50ZXI6IFZlY3RvciA9IHRoaXMucG9seWdvbi5nZXRDZW50cm9pZCgpLmFkZCh0aGlzLnBvbHlnb24ucG9zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyODsgaSsrKSB7XHJcbiAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBCbG9vZFBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogNiwgTWF0aC5zaW4oTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYmxvb2RcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgKGkgPiAzID8gMiA6IDEpOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBHaWJQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCwgTWF0aC5zaW4oTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCBcImdpYlwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvZ2FtZW92ZXIub2dnXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgRGVhdGhNZXNzYWdlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuNDApIHRoaXMuZnJhbWVUaW1lIC09IDAuNDA7XHJcbiAgICAgICAgbGV0IGZyYW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lIC8gMC4xMCk7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubG9va2luZ0RpcmVjdGlvbiA9PSAtMSkge1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKEdhbWUuY2FudmFzLndpZHRoIC0gdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnkpO1xyXG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKEdhbWUuY2FudmFzLndpZHRoIC0gdGhpcy5wb2x5Z29uLnBvcy54ICogMiAtIDMyLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR5IDwgMCkge1xyXG4gICAgICAgICAgICAvLyBKdW1waW5nXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDIpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgNjQsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDQpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMzIsIDY0LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIChmcmFtZSAlIDIpICogMzIgKyA2NCwgNjQsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub25Hcm91bmQpIHtcclxuICAgICAgICAgICAgLy8gRmFsbGluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIChmcmFtZSAlIDIpICogMzIsIDk2LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gUnVubmluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIGZyYW1lICogMzIsIDMyLCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWRsZVxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIGZyYW1lICogMzIsIDAsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvKiFcclxuKiBJIFdhbm5hIEJlIFRoZSBHdXk6IFRoZSBNb3ZpZTogVGhlIEdhbWVcclxuKiBUeXBlU2NyaXB0IHJlbWFrZSBtYWRlIGJ5IFBHZ2FtZXIyIChha2EgU29ub1BHKS5cclxuKiBZb3UgY2FuIGZpbmQgdGhlIHNvdXJjZSBjb2RlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9QR2dhbWVyMi9JV0JURy50c1xyXG4qIE9yaWdpbmFsIGdhbWUgbWFkZSBieSBLYXlpbjogaHR0cHM6Ly9rYXlpbi5tb2UvaXdidGcvXHJcbiovXHJcblxyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gXCIuL0F1ZGlvTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5mdW5jdGlvbiBmcmFtZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgIEdhbWUudXBkYXRlKHRpbWVzdGFtcCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxufVxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxuXHJcbm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgdHJ1ZSk7XHJcbiAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXgoKTtcclxufTtcclxub25rZXl1cCA9IGZ1bmN0aW9uKGUpIHsgR2FtZS5rZXlNYXAuc2V0KGUua2V5Lmxlbmd0aCA9PSAxID8gZS5rZXkudG9Mb3dlckNhc2UoKSA6IGUua2V5LCBmYWxzZSk7IH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9