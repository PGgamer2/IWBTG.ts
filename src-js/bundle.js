/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AudioManager.ts":
/*!*****************************!*\
  !*** ./src/AudioManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioManager = void 0;
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.play = function (key, src, loop) {
        if (src === void 0) { src = undefined; }
        if (loop === void 0) { loop = false; }
        var audio = AudioManager.audioMap.get(key);
        if (audio === undefined) {
            if (src === undefined)
                audio = new Audio();
            else
                audio = new Audio(src);
            audio.loop = loop;
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
        audio = AudioManager.play("_music", src, loop);
        audio.volume = 0.75;
        return audio;
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
            console.info("This browser sux: trying to fix autoplay...");
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
exports.AudioManager = AudioManager;


/***/ }),

/***/ "./src/Camera.ts":
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Camera = void 0;
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
exports.Camera = Camera;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
var TestLevel_1 = __webpack_require__(/*! ./levels/TestLevel */ "./src/levels/TestLevel.ts");
var Camera_1 = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
var Game = (function () {
    function Game() {
    }
    Game.update = function (timestamp) {
        Game.DEBUG = Game.isButtonDown("F2");
        Game.canvas = document.getElementById("main-canvas");
        var pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
        var scale = 25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25;
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
    Game.level = new TestLevel_1.TestLevel();
    Game.camera = new Camera_1.Camera();
    Game.keyMap = new Map();
    Game.isPushingReload = false;
    return Game;
}());
exports.Game = Game;


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
exports.randomUnsecureUUID = void 0;
function randomUnsecureUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        return r.toString(16);
    });
}
exports.randomUnsecureUUID = randomUnsecureUUID;


/***/ }),

/***/ "./src/levels/BasicLevel.ts":
/*!**********************************!*\
  !*** ./src/levels/BasicLevel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicLevel = void 0;
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
        if (Game_1.Game.DEBUG) {
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
            ctx.strokeStyle = '#ff0000';
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
exports.BasicLevel = BasicLevel;


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
exports.TestLevel = void 0;
var BasicLevel_1 = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");
var PlayerObject_1 = __webpack_require__(/*! ../objects/player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
var ImageObject_1 = __webpack_require__(/*! ../objects/ImageObject */ "./src/objects/ImageObject.ts");
var SpikeObject_1 = __webpack_require__(/*! ../objects/SpikeObject */ "./src/objects/SpikeObject.ts");
var AudioManager_1 = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
var TestLevel = (function (_super) {
    __extends(TestLevel, _super);
    function TestLevel() {
        var _this = _super.call(this) || this;
        AudioManager_1.AudioManager.playMusic("assets/music/begins.ogg");
        _this.objects.push(new PlayerObject_1.PlayerObject(32, 512));
        for (var i = 0; i < 25; i++) {
            _this.objects.push(new ImageObject_1.ImageObject("ground" + i, i * 32, 576, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        }
        _this.objects.push(new ImageObject_1.ImageObject("ground25", 256, 544, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground26", 256, 512, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground27", 256, 480, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground28", 256, 448, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground29", 288, 416, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground30", 288, 384, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike0", 320, 416, 1));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike1", 320, 384, 1));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike2", 288, 352, 0));
        return _this;
    }
    TestLevel.prototype.instanceFabric = function () {
        return new TestLevel();
    };
    return TestLevel;
}(BasicLevel_1.BasicLevel));
exports.TestLevel = TestLevel;


/***/ }),

/***/ "./src/objects/BasicObject.ts":
/*!************************************!*\
  !*** ./src/objects/BasicObject.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicObject = void 0;
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
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                collided = true;
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                var bColl = Game_1.Game.level.objects[i].onCollision(response, this);
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
exports.BasicObject = BasicObject;


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
exports.ImageObject = void 0;
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
}(BasicObject_1.BasicObject));
exports.ImageObject = ImageObject;


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
exports.SpikeObject = void 0;
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
        if (obj instanceof PlayerObject_1.PlayerObject) {
            obj.die();
        }
        return false;
    };
    SpikeObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.direction * 32, 0, 32, 32, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
    };
    return SpikeObject;
}(ImageObject_1.ImageObject));
exports.SpikeObject = SpikeObject;


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
exports.BloodParticle = void 0;
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
        this.dy += PlayerObject_1.PlayerObject.gravity * delta;
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
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                Game_1.Game.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                }
            }
        }
        return collided;
    };
    BloodParticle.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.PlayerObject)
            return false;
        if (obj instanceof SpikeObject_1.SpikeObject)
            return Math.random() < 0.5;
        return true;
    };
    BloodParticle.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.type * 3, 0, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
    };
    return BloodParticle;
}(ImageObject_1.ImageObject));
exports.BloodParticle = BloodParticle;


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
exports.BulletObject = void 0;
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
        if (obj instanceof SpikeObject_1.SpikeObject)
            return false;
        if (obj instanceof PlayerObject_1.PlayerObject)
            return false;
        Game_1.Game.level.removeObject(this.id);
        return false;
    };
    BulletObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.20)
            this.frameTime -= 0.20;
        ctx.drawImage(this.image, Math.floor(this.frameTime / 0.10) * 4, 0, 4, 4, this.polygon.pos.x + 3, this.polygon.pos.y - 1, 4, 4);
    };
    return BulletObject;
}(ImageObject_1.ImageObject));
exports.BulletObject = BulletObject;


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
exports.DeathMessage = void 0;
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var DeathMessage = (function (_super) {
    __extends(DeathMessage, _super);
    function DeathMessage() {
        var _this = _super.call(this, "death_message", 400 - 350, 304 - 82, 700, 164, "assets/textures/ui/sprGameOver.png") || this;
        _this.collision = false;
        return _this;
    }
    return DeathMessage;
}(ImageObject_1.ImageObject));
exports.DeathMessage = DeathMessage;


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
exports.GibParticle = void 0;
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
        _this.bodyType = 0;
        _this.dx = dx;
        _this.dy = dy;
        _this.type = type;
        _this.collision = false;
        if (_this.type == 0 || _this.type == 1) {
            _this.bodyType = Math.round(Math.random() * 32);
        }
        return _this;
    }
    GibParticle.prototype.update = function (delta) {
        this.dy += PlayerObject_1.PlayerObject.gravity * Math.min(delta, 0.3);
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
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                Game_1.Game.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                    var objtAABB = Game_1.Game.level.objects[i].polygon.getAABB();
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
        if (obj instanceof PlayerObject_1.PlayerObject || obj instanceof SpikeObject_1.SpikeObject)
            return false;
        return true;
    };
    GibParticle.prototype.draw = function (ctx, delta) {
        switch (this.type) {
            case 0:
                ctx.drawImage(this.image, this.bodyType * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
                break;
            case 1:
                ctx.drawImage(this.image, this.bodyType * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
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
}(ImageObject_1.ImageObject));
exports.GibParticle = GibParticle;


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
exports.PlayerObject = void 0;
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
        if (Game_1.Game.isButtonDown('ArrowRight')) {
            this.rightKeyTime++;
            if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
                this.dx = PlayerObject.velocity * delta;
            }
        }
        else
            this.rightKeyTime = 0;
        if (Game_1.Game.isButtonDown('ArrowLeft')) {
            this.leftKeyTime++;
            if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
                this.dx = -PlayerObject.velocity * delta;
            }
        }
        else
            this.leftKeyTime = 0;
        if (Game_1.Game.isButtonDown('z')) {
            if (this.shootKeyTime == 0) {
                var bulletId_1 = "bullet" + (0, Utils_1.randomUnsecureUUID)();
                AudioManager_1.AudioManager.play(bulletId_1, "assets/sounds/fire.wav").onended = function (e) { AudioManager_1.AudioManager.release(bulletId_1); };
                Game_1.Game.level.objects.push(new BulletObject_1.BulletObject(this.polygon.pos.x + 16 + 10 * this.lookingDirection, this.polygon.pos.y + 21, this.lookingDirection, bulletId_1));
            }
            this.shootKeyTime++;
        }
        else
            this.shootKeyTime = 0;
        if (Game_1.Game.isButtonDown('Shift') && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
            if (this.jumpKeyTime == 0) {
                this.availableJumps--;
                if (this.availableJumps == 1)
                    AudioManager_1.AudioManager.play("jump1", "assets/sounds/jump1.wav");
                else
                    AudioManager_1.AudioManager.play("jump2", "assets/sounds/jump2.wav");
            }
            this.jumpKeyTime += delta;
            if (this.jumpKeyTime - delta < 0.3) {
                if (this.jumpKeyTime < 0.3) {
                    if (this.availableJumps == 1)
                        this.dy = -220 * delta;
                    else
                        this.dy = -180 * delta;
                }
                else {
                    if (this.availableJumps == 1)
                        this.dy = -220 * (this.jumpKeyTime - 0.3);
                    else
                        this.dy = -180 * (this.jumpKeyTime - 0.3);
                }
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
        if (Game_1.Game.level.isRemoved(this.id))
            return;
        Game_1.Game.level.removeObject(this.id);
        var center = this.polygon.getCentroid().add(this.polygon.pos);
        for (var i = 0; i < 128; i++) {
            Game_1.Game.level.objects.push(new BloodParticle_1.BloodParticle(center.x, center.y, Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6, Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10, "blood" + (0, Utils_1.randomUnsecureUUID)()));
        }
        for (var i = 0; i < 8; i += 2) {
            for (var o = 0; o < (i > 3 ? 2 : 1); o++) {
                Game_1.Game.level.objects.push(new GibParticle_1.GibParticle(center.x, center.y, Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4, Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4, i, "gib" + (0, Utils_1.randomUnsecureUUID)()));
            }
        }
        AudioManager_1.AudioManager.playMusic("assets/music/gameover.ogg", false);
        Game_1.Game.level.objects.push(new DeathMessage_1.DeathMessage());
    };
    PlayerObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.40)
            this.frameTime -= 0.40;
        var frame = Math.floor(this.frameTime / 0.10);
        ctx.save();
        if (this.lookingDirection == -1) {
            ctx.translate(Game_1.Game.canvas.width - this.polygon.pos.x, this.polygon.pos.y);
            ctx.scale(-1, 1);
            ctx.translate(Game_1.Game.canvas.width - this.polygon.pos.x * 2 - 32, 0);
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
}(ImageObject_1.ImageObject));
exports.PlayerObject = PlayerObject;


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
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
    Game_1.Game.update(timestamp);
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
onkeydown = function (e) {
    Game_1.Game.keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, true);
    AudioManager_1.AudioManager.autoPlayFix();
};
onkeyup = function (e) { Game_1.Game.keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, false); };

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBbUVBLENBQUM7SUFoRWlCLGlCQUFJLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxHQUF1QixFQUFFLElBQXFCO1FBQTlDLHFDQUF1QjtRQUFFLG1DQUFxQjtRQUMxRSxJQUFJLEtBQUssR0FBcUIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksR0FBRyxLQUFLLFNBQVM7Z0JBQUUsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O2dCQUN0QyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFHO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRWEsc0JBQVMsR0FBdkIsVUFBd0IsR0FBVyxFQUFFLElBQW9CO1FBQXBCLGtDQUFvQjtRQUNyRCxJQUFJLEtBQUssR0FBcUIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVhLGtCQUFLLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxLQUFLLEdBQXFCLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNyQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVhLG9CQUFPLEdBQXJCLFVBQXNCLEdBQVc7UUFDN0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR2Esd0JBQVcsR0FBekI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtZQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDNUQsWUFBWSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDbEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFDbkMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNYLEdBQUcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNsQixJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7d0JBQ2pCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBRzs0QkFDaEIsSUFBSSxZQUFZLENBQUMsYUFBYTtnQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNsRCxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs0QkFDbkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNyQixDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBakVhLHFCQUFRLEdBQWtDLElBQUksR0FBRyxFQUFFLENBQUM7SUE2Q25ELDBCQUFhLEdBQVksS0FBSyxDQUFDO0lBcUJsRCxtQkFBQztDQUFBO0FBbkVZLG9DQUFZOzs7Ozs7Ozs7Ozs7OztBQ0F6QjtJQUFBO1FBQ1csTUFBQyxHQUFXLENBQUMsQ0FBQztRQUNkLE1BQUMsR0FBVyxDQUFDLENBQUM7UUFDZCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQUQsYUFBQztBQUFELENBQUM7QUFOWSx3QkFBTTs7Ozs7Ozs7Ozs7Ozs7QUNDbkIsNkZBQStDO0FBQy9DLHNFQUFrQztBQUNsQztJQUFBO0lBK0NBLENBQUM7SUFwQ2lCLFdBQU0sR0FBcEIsVUFBcUIsU0FBOEI7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7UUFFMUUsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0UsSUFBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3pHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUdkLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDL0I7O1lBQU0sSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVhLGlCQUFZLEdBQTFCLFVBQTJCLE9BQWU7UUFDdEMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQTdDYSxVQUFLLEdBQVksS0FBSyxDQUFDO0lBRXZCLGtCQUFhLEdBQXdCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUV2RCxVQUFLLEdBQWUsSUFBSSxxQkFBUyxFQUFFLENBQUM7SUFDcEMsV0FBTSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFFOUIsV0FBTSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQztJQUMxRCxvQkFBZSxHQUFZLEtBQUssQ0FBQztJQXNDbkQsV0FBQztDQUFBO0FBL0NZLG9CQUFJOzs7Ozs7Ozs7Ozs7O0FDSGpCLDBFQUE4QjtBQUM5Qiw2RUFBZ0M7QUFPaEM7SUFlRSxhQUFZLEdBQWtCLEVBQUUsQ0FBSyxFQUFFLENBQUs7UUFBaEMsZ0NBQVUsZ0JBQU0sRUFBRTtRQUFFLHlCQUFLO1FBQUUseUJBQUs7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQU9NLHVCQUFTLEdBQWhCO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNDLElBQUksZ0JBQU0sRUFBRSxFQUFFLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzVDRCwwRUFBOEI7QUFDOUIsaUVBQXdCO0FBWXhCO0lBZ0JFLGlCQUFZLEdBQWtCLEVBQUUsTUFBMEI7UUFBOUMsZ0NBQVUsZ0JBQU0sRUFBRTtRQUFFLG9DQUEwQjtRQWRuRCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQWNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQWFNLDJCQUFTLEdBQWhCLFVBQWlCLE1BQXFCO1FBRXBDLElBQU0sYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRTNFLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFDO1lBRU4sSUFBTSxVQUFVLEdBQWtCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3ZELElBQU0sS0FBSyxHQUFrQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFNLE9BQU8sR0FBa0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFHakQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVsQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3RCxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsU0FBUztpQkFDVjtnQkFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBTSxFQUFFLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFTTSwwQkFBUSxHQUFmLFVBQWdCLEtBQWE7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBU00sMkJBQVMsR0FBaEIsVUFBaUIsTUFBYztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFXTSx3QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN6QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVlNLDJCQUFTLEdBQWhCLFVBQWlCLENBQVMsRUFBRSxDQUFTO1FBQ25DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUUxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBV08seUJBQU8sR0FBZjtRQUdFLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFLbkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUt6QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRzdCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXpCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUM7UUFFTixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhELFNBQVMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixTQUFTLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxLQUFLLEtBQUssQ0FBQztnQkFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDO1FBR0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0QsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN2QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVdNLHlCQUFPLEdBQWQ7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRS9CLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJO2dCQUFFLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM5QixJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSTtnQkFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSTtnQkFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDOUIsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUk7Z0JBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksYUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyRyxDQUFDO0lBYU0sNkJBQVcsR0FBbEI7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVyRCxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNUO1FBRUQsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWIsT0FBTyxJQUFJLGdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNwUkQsMEVBQThCO0FBVTlCO0lBQUE7UUFDUyxNQUFDLEdBQVEsSUFBSSxDQUFDO1FBQ2QsTUFBQyxHQUFRLElBQUksQ0FBQztRQUNkLGFBQVEsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFFeEIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBaUI1QyxDQUFDO0lBUlEsd0JBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUVoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ25DRDs7OztFQUlFOztBQUVGLGlFQUF3QjtBQUN4QiwwRUFBOEI7QUFHOUIsZ0ZBQWtDO0FBV2pDLElBQU0sU0FBUyxHQUFrQixFQUFFLENBQUM7QUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQU0sRUFBRSxDQUFDLENBQUM7QUFPMUQsSUFBTSxRQUFRLEdBQXlCLEVBQUUsQ0FBQztBQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFRL0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxrQkFBUSxFQUFFLENBQUM7QUFPbEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFHLENBQUMsSUFBSSxnQkFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBS3pFLElBQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsSUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7QUFDaEMsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7QUFjL0IsU0FBUyxlQUFlLENBQUMsTUFBcUIsRUFBRSxNQUFjLEVBQUUsTUFBcUI7SUFDbkYsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMzQixJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFFNUIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUUxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBRTVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsSUFBSSxHQUFHLEdBQUcsR0FBRztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUcsR0FBRztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7S0FDMUI7SUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDbEIsQ0FBQztBQWlCRCxTQUFTLGFBQWEsQ0FBQyxJQUFZLEVBQUUsS0FBYTtJQUNoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsSUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUczQixJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQUUsT0FBTyxtQkFBbUIsQ0FBQztTQUdsQyxJQUFJLEVBQUUsR0FBRyxJQUFJO1FBQUUsT0FBTyxvQkFBb0IsQ0FBQzs7UUFHM0MsT0FBTyxxQkFBcUIsQ0FBQztBQUNwQyxDQUFDO0FBRUQ7SUFBQTtJQTRaQSxDQUFDO0lBaFplLG9CQUFnQixHQUE5QixVQUErQixJQUFZLEVBQUUsSUFBWSxFQUFFLE9BQXNCLEVBQUUsT0FBc0IsRUFBRSxJQUFZLEVBQUUsUUFBbUI7UUFDMUksSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUc5QixJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBR3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFlLENBQUM7UUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQztRQUc3QixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBR0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFHaEIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFHdEIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN6QixPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBRXZCO3FCQUFNO29CQUNMLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXRDLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2lCQUNsRDthQUVGO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUd0QixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVoQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztpQkFFdkI7cUJBQU07b0JBQ0wsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdEMsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7aUJBQ2xEO2FBQ0Y7WUFHRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXJDLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFN0IsSUFBSSxPQUFPLEdBQUcsQ0FBQztvQkFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzlDO1NBQ0Y7UUFFRCxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFjYSxpQkFBYSxHQUEzQixVQUE0QixDQUFTLEVBQUUsQ0FBUztRQUM5QyxJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyRSxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXRDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHNUIsT0FBTyxVQUFVLElBQUksUUFBUSxDQUFDO0lBQ2hDLENBQUM7SUFVYSxrQkFBYyxHQUE1QixVQUE2QixDQUFTLEVBQUUsSUFBYTtRQUNuRCxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFbEUsSUFBSSxNQUFNO1lBQUUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFFckMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQVdhLG9CQUFnQixHQUE5QixVQUErQixDQUFTLEVBQUUsQ0FBUyxFQUFFLFFBQW1CO1FBRXRFLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZGLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFNLGFBQWEsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2hELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUd0QyxJQUFJLFVBQVUsR0FBRyxhQUFhLEVBQUU7WUFDOUIsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU1QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBR0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRW5DLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFZixRQUFRLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFFRCxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVdhLHFCQUFpQixHQUEvQixVQUFnQyxPQUFnQixFQUFFLE1BQWMsRUFBRSxRQUFtQjtRQUVuRixJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkYsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUUxQixJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXZDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFHcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFHNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFHckMsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU87Z0JBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFHOUQsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUd4QyxJQUFJLE1BQU0sS0FBSyxtQkFBbUIsRUFBRTtnQkFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRy9CLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFckMsSUFBSSxNQUFNLEtBQUssb0JBQW9CLEVBQUU7b0JBRW5DLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFekIsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFO3dCQUVqQixTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUV2QixPQUFPLEtBQUssQ0FBQztxQkFDZDt5QkFBTSxJQUFJLFFBQVEsRUFBRTt3QkFFbkIsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7d0JBRXRCLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQzdCLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUN6QjtpQkFDRjtnQkFFRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBR3hCO2lCQUFNLElBQUksTUFBTSxLQUFLLG9CQUFvQixFQUFFO2dCQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFHL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLE1BQU0sS0FBSyxtQkFBbUIsRUFBRTtvQkFFbEMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUV6QixJQUFJLElBQUksR0FBRyxNQUFNLEVBQUU7d0JBRWpCLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRXRCLE9BQU8sS0FBSyxDQUFDO3FCQUNkO3lCQUFNLElBQUksUUFBUSxFQUFFO3dCQUVuQixRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzt3QkFFdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsT0FBTyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ3pCO2lCQUNGO2FBRUY7aUJBQU07Z0JBRUwsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUd2QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUcvQixJQUFJLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLE1BQU0sRUFBRTtvQkFFaEMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFdEIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7cUJBQU0sSUFBSSxRQUFRLEVBQUU7b0JBRW5CLFFBQVEsR0FBRyxNQUFNLENBQUM7b0JBQ2xCLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUd4QixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxNQUFNO3dCQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUM5RDthQUNGO1lBSUQsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBR0QsSUFBSSxRQUFRLEVBQUU7WUFDWixRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUNyQixRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUVwQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRTtRQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQWNhLHFCQUFpQixHQUEvQixVQUFnQyxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxRQUFtQjtRQUVuRixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRSxJQUFJLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFFdEIsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRTNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUU1QixRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFZixRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDOUIsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBV2Esc0JBQWtCLEdBQWhDLFVBQWlDLENBQVUsRUFBRSxDQUFVLEVBQUUsUUFBbUI7UUFDMUUsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM3QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRTVCLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDN0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUc1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQ2hGLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtRQUdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDaEYsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBS0QsSUFBSSxRQUFRLEVBQUU7WUFDWixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkU7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNyZ0JEO0lBUUUsZ0JBQVksQ0FBSyxFQUFFLENBQUs7UUFBWix5QkFBSztRQUFFLHlCQUFLO1FBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBU00scUJBQUksR0FBWCxVQUFZLEtBQWE7UUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFPTSxzQkFBSyxHQUFaO1FBQ0UsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBU00scUJBQUksR0FBWDtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFTTSx1QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN6QixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQU9NLHdCQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFPTSwwQkFBUyxHQUFoQjtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFTTSxvQkFBRyxHQUFWLFVBQVcsS0FBYTtRQUN0QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVNNLG9CQUFHLEdBQVYsVUFBVyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBYU0sc0JBQUssR0FBWixVQUFhLENBQVMsRUFBRSxDQUFVO1FBQ2hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVNNLHdCQUFPLEdBQWQsVUFBZSxLQUFhO1FBQzFCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFXTSx5QkFBUSxHQUFmLFVBQWdCLEtBQWE7UUFDM0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBU00sd0JBQU8sR0FBZCxVQUFlLElBQVk7UUFDekIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFXTSx5QkFBUSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFTTSxvQkFBRyxHQUFWLFVBQVcsS0FBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQU9NLHFCQUFJLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQU9NLG9CQUFHLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM3UEQsU0FBZ0Isa0JBQWtCO0lBQzlCLE9BQU8sb0JBQW9CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFDLENBQUM7UUFDMUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUxELGdEQUtDOzs7Ozs7Ozs7Ozs7OztBQ0pELGlFQUErQjtBQUUvQjtJQUFBO1FBQ1csWUFBTyxHQUF1QixFQUFFLENBQUM7UUFDOUIsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO0lBK0Q5QyxDQUFDO0lBN0RVLDJCQUFNLEdBQWIsVUFBYyxHQUE2QixFQUFFLEtBQWE7UUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsTUFBTTtpQkFDVDthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBR0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksV0FBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFTSxpQ0FBWSxHQUFuQixVQUFvQixFQUFVO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSw4QkFBUyxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVTLHVDQUFrQixHQUE1QixVQUE2QixHQUE2QjtRQUN0RCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBTSxNQUFNLEdBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hELEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4RztxQkFBTTtvQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoSDthQUNKO1lBQ0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDNUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSw0QkFBTyxHQUFkO1FBQ0ksT0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQUFDO0FBakVxQixnQ0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIaEMseUZBQTBDO0FBQzFDLHVIQUE4RDtBQUM5RCxzR0FBcUQ7QUFDckQsc0dBQXFEO0FBQ3JELHlGQUErQztBQUMvQztJQUErQiw2QkFBVTtJQUNyQztRQUFBLFlBQ0ksaUJBQU8sU0FpQlY7UUFoQkcsMkJBQVksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVsRCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLDZDQUE2QyxDQUFDLENBQUMsQ0FBQztTQUN4SDtRQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLDZDQUE2QyxDQUFDLENBQUMsQ0FBQztRQUNoSCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsNkNBQTZDLENBQUMsQ0FBQyxDQUFDO1FBQ2hILEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLDZDQUE2QyxDQUFDLENBQUMsQ0FBQztRQUNoSCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsNkNBQTZDLENBQUMsQ0FBQyxDQUFDO1FBRWhILEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUM5RCxDQUFDO0lBRU0sa0NBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxDQXhCOEIsdUJBQVUsR0F3QnhDO0FBeEJZLDhCQUFTOzs7Ozs7Ozs7Ozs7OztBQ0x0QixpRUFBK0I7QUFDL0Isc0VBQTZCO0FBQzdCLHFGQUF1QztBQUN2QyxrRkFBcUM7QUFDckMsK0VBQW1DO0FBQ25DO0lBS0kscUJBQVksRUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFIM0QsY0FBUyxHQUFZLElBQUksQ0FBQztRQUk3QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxnQkFBTSxFQUFFLEVBQUUsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLENBQVMsRUFBRSxDQUFTO1FBQzlCLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksUUFBUSxHQUFhLElBQUksa0JBQVEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQUUsU0FBUztZQUN0RixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsSUFBSSxhQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQy9FLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksS0FBSyxHQUFZLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUztvQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0o7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU0saUNBQVcsR0FBbEIsVUFBbUIsSUFBYyxFQUFFLEdBQWdCLElBQWEsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBTXZFLDZCQUFPLEdBQWQsY0FBd0IsQ0FBQztJQUM3QixrQkFBQztBQUFELENBQUM7QUF0Q3FCLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xqQyw2RkFBNEM7QUFDNUM7SUFBaUMsK0JBQVc7SUFHeEMscUJBQVksRUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxHQUFXO1FBQS9FLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUl4QjtRQVBNLFdBQUssR0FBcUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUl6QyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7SUFDMUIsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxLQUFhLElBQVMsQ0FBQztJQUU5QiwwQkFBSSxHQUFYLFVBQVksR0FBNkIsRUFBRSxLQUFhO1FBQ3BELEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQ0FwQmdDLHlCQUFXLEdBb0IzQztBQXBCWSxrQ0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEeEIsa0ZBQXFDO0FBRXJDLCtFQUFtQztBQUVuQyw2RkFBNEM7QUFDNUMsOEdBQXFEO0FBQ3JEO0lBQWlDLCtCQUFXO0lBR3hDLHFCQUFZLEVBQVUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLFNBQWlCO1FBQS9ELFlBQ0ksa0JBQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxzQ0FBc0MsQ0FBQyxTQXVCbEU7UUF0QkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsUUFBTyxLQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLEtBQUssQ0FBQztnQkFDRixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUN6QyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksZ0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxnQkFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzNELENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxnQkFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLGdCQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDMUQsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDekMsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksZ0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWO2dCQUNJLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pDLElBQUksZ0JBQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLGdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDM0QsQ0FBQyxDQUFDO1NBQ047O0lBQ0wsQ0FBQztJQUVNLGlDQUFXLEdBQWxCLFVBQW1CLElBQWMsRUFBRSxHQUFnQjtRQUMvQyxJQUFJLEdBQUcsWUFBWSwyQkFBWSxFQUFFO1lBQzVCLEdBQW9CLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDL0I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sMEJBQUksR0FBWCxVQUFZLEdBQTZCLEVBQUUsS0FBYTtRQUNwRCxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxDQXZDZ0MseUJBQVcsR0F1QzNDO0FBdkNZLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ054Qix3RkFBMEM7QUFDMUMseUVBQWdDO0FBQ2hDLDhGQUE2QztBQUM3Qyx1R0FBOEM7QUFDOUMsb0VBQWtDO0FBRWxDLDhGQUE2QztBQUM3QyxrRkFBc0M7QUFDdEM7SUFBbUMsaUNBQVc7SUFNMUMsdUJBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVU7UUFBcEUsWUFDSSxrQkFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLDZDQUE2QyxDQUFDLFNBS3ZFO1FBWE0sUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFDZixXQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFJcEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O0lBQzNCLENBQUM7SUFFTSw4QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUV2QixJQUFJLENBQUMsRUFBRSxJQUFJLDJCQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDaEM7YUFBTSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFTSw4QkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQWEsSUFBSSxrQkFBUSxFQUFFLENBQUM7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFBRSxTQUFTO1lBQ3RGLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixJQUFJLGFBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxLQUFLLEdBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDbkI7YUFDSjtTQUNKO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1DQUFXLEdBQWxCLFVBQW1CLElBQWMsRUFBRSxHQUFnQjtRQUMvQyxJQUFJLEdBQUcsWUFBWSwyQkFBWTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlDLElBQUksR0FBRyxZQUFZLHlCQUFXO1lBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSw0QkFBSSxHQUFYLFVBQVksR0FBNkIsRUFBRSxLQUFhO1FBQ3BELEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQ0E1RGtDLHlCQUFXLEdBNEQ3QztBQTVEWSxzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSMUIsOEZBQTZDO0FBQzdDLHVHQUE4QztBQUc5QyxvRUFBa0M7QUFDbEMsOEZBQTZDO0FBQzdDO0lBQWtDLGdDQUFXO0lBSXpDLHNCQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsU0FBaUIsRUFBRSxFQUFVO1FBQS9ELFlBQ0ksa0JBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLDhDQUE4QyxDQUFDLFNBRWpGO1FBTlMsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUs1QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7SUFDL0IsQ0FBQztJQUVNLDZCQUFNLEdBQWIsVUFBYyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxrQ0FBVyxHQUFsQixVQUFtQixJQUFjLEVBQUUsR0FBZ0I7UUFDL0MsSUFBSSxHQUFHLFlBQVkseUJBQVc7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3QyxJQUFJLEdBQUcsWUFBWSwyQkFBWTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzlDLFdBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sMkJBQUksR0FBWCxVQUFZLEdBQTZCLEVBQUUsS0FBYTtRQUNwRCxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEksQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxDQXpCaUMseUJBQVcsR0F5QjVDO0FBekJZLG9DQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ056Qiw4RkFBNkM7QUFFN0M7SUFBa0MsZ0NBQVc7SUFDekM7UUFBQSxZQUNJLGtCQUFNLGVBQWUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxvQ0FBb0MsQ0FBQyxTQUU5RjtRQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztJQUMzQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLENBTGlDLHlCQUFXLEdBSzVDO0FBTFksb0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRnpCLHdGQUEwQztBQUMxQyx5RUFBZ0M7QUFDaEMsOEZBQTZDO0FBQzdDLHVHQUE4QztBQUM5QyxvRUFBa0M7QUFFbEMsOEZBQTZDO0FBRTdDLGtGQUFzQztBQUN0QztJQUFpQywrQkFBVztJQWdCeEMscUJBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLElBQVksRUFBRSxFQUFVO1FBQWxGLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSw0Q0FBNEMsQ0FBQyxTQVF0RTtRQXhCTSxRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQWN4QixLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNsQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEOztJQUNMLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixJQUFJLENBQUMsRUFBRSxJQUFJLDJCQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO1FBQzlCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBYSxJQUFJLGtCQUFRLEVBQUUsQ0FBQztRQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUFFLFNBQVM7WUFDdEYsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLElBQUksYUFBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUMvRSxJQUFJLEtBQUssR0FBWSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEtBQUssRUFBRTtvQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN4QyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFFBQVEsR0FBWSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hFLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzJCQUNwRCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDNUQsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDcEI7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDcEI7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLGlDQUFXLEdBQWxCLFVBQW1CLElBQWMsRUFBRSxHQUFnQjtRQUMvQyxJQUFJLEdBQUcsWUFBWSwyQkFBWSxJQUFJLEdBQUcsWUFBWSx5QkFBVztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSwwQkFBSSxHQUFYLFVBQVksR0FBNkIsRUFBRSxLQUFhO1FBQ3BELFFBQU8sSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixLQUFLLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEcsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUYsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5RixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRztJQUNMLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQ0FsR2dDLHlCQUFXLEdBa0czQztBQWxHWSxrQ0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUeEIsb0VBQWtDO0FBQ2xDLDhGQUE2QztBQUM3Qyx1R0FBOEM7QUFDOUMsdUVBQWlEO0FBQ2pELGtGQUFzQztBQUN0QywwR0FBZ0Q7QUFDaEQsb0dBQTRDO0FBQzVDLHVHQUE4QztBQUM5Qyw0RkFBa0Q7QUFDbEQscUZBQXdDO0FBQ3hDO0lBQWtDLGdDQUFXO0lBaUJ6QyxzQkFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEVBQXFCO1FBQXJCLGtDQUFxQjtRQUF2RCxZQUNJLGtCQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsOENBQThDLENBQUMsU0FLMUU7UUFuQk0sZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0Isa0JBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFDZixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBSTlCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksZ0JBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxJQUFJLGdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksZ0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQ3pDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRU0sNkJBQU0sR0FBYixVQUFjLEtBQWE7UUFDdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVaLElBQUksV0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDM0M7U0FDSjs7WUFBTSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLFdBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDNUM7U0FDSjs7WUFBTSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUU1QixJQUFJLFdBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxVQUFRLEdBQVcsUUFBUSxHQUFHLDhCQUFrQixHQUFFLENBQUM7Z0JBQ3ZELDJCQUFZLENBQUMsSUFBSSxDQUFDLFVBQVEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxXQUFDLElBQU0sMkJBQVksQ0FBQyxPQUFPLENBQUMsVUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pHLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbkIsSUFBSSwyQkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUMxRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBUSxDQUNsQyxDQUNKLENBQUM7YUFDTDtZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2Qjs7WUFBTSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUU3QixJQUFJLFdBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ25GLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUM7b0JBQUUsMkJBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7O29CQUMvRSwyQkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQzthQUM5RDtZQUNELElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO29CQUN4QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQzt3QkFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQzs7d0JBQ2hELElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQzt3QkFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQzs7d0JBQ25FLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNsRDthQUNKO1NBQ0o7O1lBQU0sSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksV0FBVyxHQUFXLENBQUMsSUFBSSxnQkFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRTtnQkFFcEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUM7WUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sMEJBQUcsR0FBVjtRQUNJLElBQUksV0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU87UUFDMUMsV0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUN2RyxPQUFPLEdBQUcsOEJBQWtCLEdBQUUsQ0FDakMsQ0FDSixDQUFDO1NBQ0w7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQ3BILENBQUMsRUFBRSxLQUFLLEdBQUcsOEJBQWtCLEdBQUUsQ0FDbEMsQ0FDSixDQUFDO2FBQ0w7U0FDSjtRQUNELDJCQUFZLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNELFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSwyQkFBSSxHQUFYLFVBQVksR0FBNkIsRUFBRSxLQUFhO1FBQ3BELElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7UUFDdEQsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXRELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNyRTthQUFNO1lBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBRWIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRTtnQkFDbEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMxRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFO2dCQUN6RCxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzlFO1NBQ0o7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUV2QixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pFO2FBQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUVyQixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNuRTthQUFNO1lBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEU7UUFDRCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQWpKc0IscUJBQVEsR0FBVyxHQUFHLENBQUM7SUFDdkIsb0JBQU8sR0FBVyxFQUFFLENBQUM7SUFpSmhELG1CQUFDO0NBQUEsQ0FuSmlDLHlCQUFXLEdBbUo1QztBQW5KWSxvQ0FBWTs7Ozs7OztVQ1Z6QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7OztBQ3RCQTs7Ozs7RUFLRTs7QUFFRix3RkFBOEM7QUFDOUMsZ0VBQThCO0FBRTlCLFNBQVMsS0FBSyxDQUFDLFNBQThCO0lBQ3pDLFdBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFDRCxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFcEMsU0FBUyxHQUFHLFVBQVMsQ0FBQztJQUNsQixXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRixPQUFPLEdBQUcsVUFBUyxDQUFDLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0F1ZGlvTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQm94LnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL0Jhc2ljTGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9UZXN0TGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvQmFzaWNPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvSW1hZ2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvU3Bpa2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Jsb29kUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0J1bGxldE9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvRGVhdGhNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9HaWJQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXVkaW9NYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXVkaW9NYXA6IE1hcDxzdHJpbmcsIEhUTUxBdWRpb0VsZW1lbnQ+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheShrZXk6IHN0cmluZywgc3JjOiBzdHJpbmcgPSB1bmRlZmluZWQsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoc3JjID09PSB1bmRlZmluZWQpIGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIGVsc2UgYXVkaW8gPSBuZXcgQXVkaW8oc3JjKTtcclxuICAgICAgICAgICAgYXVkaW8ubG9vcCA9IGxvb3A7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5zZXQoa2V5LCBhdWRpbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF1ZGlvLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgYXVkaW8uc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlNdXNpYyhzcmM6IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IHRydWUpOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KFwiX211c2ljXCIpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkICYmICFhdWRpby5zcmMuZW5kc1dpdGgoc3JjKSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucmVsZWFzZShcIl9tdXNpY1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXVkaW8gPSBBdWRpb01hbmFnZXIucGxheShcIl9tdXNpY1wiLCBzcmMsIGxvb3ApO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IDAuNzU7XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGF1c2Uoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbGVhc2Uoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLnBhdXNlKGtleSkpIHtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXV0b1BsYXlGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBhdXRvUGxheUZpeCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlRoaXMgYnJvd3NlciBzdXg6IHRyeWluZyB0byBmaXggYXV0b3BsYXkuLi5cIik7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLm11dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwiX211c2ljXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNpemVYOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHNpemVZOiBudW1iZXIgPSAxO1xyXG59IiwiaW1wb3J0IHsgQmFzaWNMZXZlbCB9IGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgeyBUZXN0TGV2ZWwgfSBmcm9tICcuL2xldmVscy9UZXN0TGV2ZWwnO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuL0NhbWVyYSc7XHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbGFzdFRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWw6IEJhc2ljTGV2ZWwgPSBuZXcgVGVzdExldmVsKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICBHYW1lLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgLy8gUmVzaXplIGtlZXBpbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgbGV0IHBhZ2VBc3BlY3RSYXRpbyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUgPSAyNSAvIDE5IDwgcGFnZUFzcGVjdFJhdGlvID8gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLyAxOSA6IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyAyNTtcclxuICAgICAgICBHYW1lLmNhbnZhcy53aWR0aCA9IHNjYWxlICogMjU7XHJcbiAgICAgICAgR2FtZS5jYW52YXMuaGVpZ2h0ID0gc2NhbGUgKiAxOTtcclxuICAgICAgICAvLyBHZXQgY29udGV4dCBhbmQgY2xlYXJcclxuICAgICAgICBsZXQgY3R4ID0gR2FtZS5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIEdhbWUuY2FudmFzLndpZHRoLCBHYW1lLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW1lcmEueCwgR2FtZS5jYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZShHYW1lLmNhbWVyYS5hbmdsZSk7XHJcbiAgICAgICAgY3R4LnNjYWxlKEdhbWUuY2FtZXJhLnNpemVYICogKEdhbWUuY2FudmFzLndpZHRoIC8gODAwKSwgR2FtZS5jYW1lcmEuc2l6ZVkgKiAoR2FtZS5jYW52YXMuaGVpZ2h0IC8gNjA4KSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC51cGRhdGUoY3R4LCAodGltZXN0YW1wIC0gR2FtZS5sYXN0VGltZXN0YW1wKSAvIDEwMDApO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubGV2ZWwuaW5zdGFuY2VGYWJyaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNCdXR0b25Eb3duKGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChrZXlOYW1lLmxlbmd0aCA9PSAxKSBrZXlOYW1lID0ga2V5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBHYW1lLmtleU1hcC5oYXMoa2V5TmFtZSkgJiYgR2FtZS5rZXlNYXAuZ2V0KGtleU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcblxuLyoqXG4gKiAjIyBCb3hcbiAqIFxuICogUmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94LCB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94IHtcbiAgcHVibGljIHBvczogVmVjdG9yO1xuICBwdWJsaWMgdzogbnVtYmVyO1xuICBwdWJsaWMgaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC5cbiAgICogXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXG4gICAqIGJlIHNldCB0byBgMGAuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1uZXcgVmVjdG9yKCldIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdIFRoZSB3aWR0aCBvZiB0aGUgQm94LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2g9MF0gVGhlIGhlaWdodCBvZiB0aGUgQm94LlxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCB3ID0gMCwgaCA9IDApIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLncgPSB3O1xuICAgIHRoaXMuaCA9IGg7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IEEgbmV3IFBvbHlnb24gdGhhdCByZXByZXNlbnRzIHRoaXMgQm94LlxuICAgKi9cbiAgcHVibGljIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLnBvcztcbiAgICBjb25zdCB3ID0gdGhpcy53O1xuICAgIGNvbnN0IGggPSB0aGlzLmg7XG5cbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcihwb3MueCwgcG9zLnkpLCBbXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXG4gICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKDAsIGgpXG4gICAgXSk7XG4gIH1cbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xuXG4vKipcbiAqICMjIFBvbHlnb25cbiAqIFxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cbiAqIFxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcbiAqIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxuICogXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcbiAgcHVibGljIGFuZ2xlOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XG4gIHB1YmxpYyBwb2ludHM6IEFycmF5PFZlY3Rvcj47XG4gIHB1YmxpYyBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+O1xuICBwdWJsaWMgZWRnZXM6IEFycmF5PFZlY3Rvcj47XG4gIHB1YmxpYyBub3JtYWxzOiBBcnJheTxWZWN0b3I+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWQgYnkgdmVjdG9ycyBcbiAgICogcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IFtwb2ludHM9W11dIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwb2ludHMgb2YgdGhlIHBvbHlnb24uIEFueSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzIHdpbGwgYmUgY29tYmluZWQuXG4gICAqIFxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXG4gICAqIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lciBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBcbiAgICoganVzdCBiZWNhdXNlIG9mIHRoZSBpbnZlcnNpb24gb2YgdGhlIFktYXhpcyB3aGVuIGJlaW5nIGRpc3BsYXllZC5cbiAgICogXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwdWJsaWMgc2V0UG9pbnRzKHBvaW50czogQXJyYXk8VmVjdG9yPik6IFBvbHlnb24ge1xuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxuICAgIGNvbnN0IGxlbmd0aENoYW5nZWQgPSAhdGhpcy5wb2ludHMgfHwgdGhpcy5wb2ludHMubGVuZ3RoICE9PSBwb2ludHMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcbiAgICAgIGxldCBpO1xuXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XG4gICAgICBjb25zdCBlZGdlczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuZWRnZXMgPSBbXTtcbiAgICAgIGNvbnN0IG5vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLm5vcm1hbHMgPSBbXTtcblxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcbiAgICAgICAgY29uc3QgcDEgPSBwb2ludHNbaV07XG4gICAgICAgIGNvbnN0IHAyID0gaSA8IHBvaW50cy5sZW5ndGggLSAxID8gcG9pbnRzW2kgKyAxXSA6IHBvaW50c1swXTtcblxuICAgICAgICBpZiAocDEgIT09IHAyICYmIHAxLnggPT09IHAyLnggJiYgcDEueSA9PT0gcDIueSkge1xuICAgICAgICAgIHBvaW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaSAtPSAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY1BvaW50cy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gICAgICAgIGVkZ2VzLnB1c2gobmV3IFZlY3RvcigpKTtcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG5cbiAgICB0aGlzLl9yZWNhbGMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSAoaW4gcmFkaWFucykuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuXG4gICAgdGhpcy5fcmVjYWxjKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgdGhpcy5fcmVjYWxjKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXG4gICAqIFxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgYW5nbGVgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyByb3RhdGlvbikuXG4gICAqIFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcblxuICAgIHRoaXMuX3JlY2FsYygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxuICAgKiBcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYG9mZnNldGAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHRyYW5zbGF0aW9uKVxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHZlcnRpY2FsIGFtb3VudCB0byB0cmFuc2xhdGUuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2x5Z29uIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgcG9pbnRzW2ldLnggKz0geDtcbiAgICAgIHBvaW50c1tpXS55ICs9IHk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVjYWxjKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgY2FsY3VsYXRlZCBjb2xsaXNpb24gUG9seWdvbi5cbiAgICogXG4gICAqIFRoaXMgYXBwbGllcyB0aGUgYGFuZ2xlYCBhbmQgYG9mZnNldGAgdG8gdGhlIG9yaWdpbmFsIHBvaW50cyB0aGVuIHJlY2FsY3VsYXRlcyB0aGUgZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBQb2x5Z29uLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVjYWxjKCk6IFBvbHlnb24ge1xuICAgIC8vIENhbGN1bGF0ZWQgcG9pbnRzIC0gdGhpcyBpcyB3aGF0IGlzIHVzZWQgZm9yIHVuZGVybHlpbmcgY29sbGlzaW9ucyBhbmQgdGFrZXMgaW50byBhY2NvdW50XG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXG4gICAgY29uc3QgY2FsY1BvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcblxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XG5cbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XG4gICAgLy8gdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgY29uc3Qgbm9ybWFscyA9IHRoaXMubm9ybWFscztcblxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZTtcblxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGNQb2ludCA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xuXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xuXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcDEgPSBjYWxjUG9pbnRzW2ldO1xuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcblxuICAgICAgY29uc3QgZSA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XG5cbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveC5cbiAgICogXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cbiAgICogXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyBBQUJCLlxuICAgKi9cbiAgcHVibGljIGdldEFBQkIoKTogUG9seWdvbiB7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xuXG4gICAgbGV0IHhNaW4gPSBwb2ludHNbMF0ueDtcbiAgICBsZXQgeU1pbiA9IHBvaW50c1swXS55O1xuXG4gICAgbGV0IHhNYXggPSBwb2ludHNbMF0ueDtcbiAgICBsZXQgeU1heCA9IHBvaW50c1swXS55O1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gcG9pbnRzW2ldO1xuXG4gICAgICBpZiAocG9pbnQueCA8IHhNaW4pIHhNaW4gPSBwb2ludC54O1xuICAgICAgZWxzZSBpZiAocG9pbnQueCA+IHhNYXgpIHhNYXggPSBwb2ludC54O1xuXG4gICAgICBpZiAocG9pbnQueSA8IHlNaW4pIHlNaW4gPSBwb2ludC55O1xuICAgICAgZWxzZSBpZiAocG9pbnQueSA+IHlNYXgpIHlNYXggPSBwb2ludC55O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQm94KHRoaXMucG9zLmNsb25lKCkuYWRkKG5ldyBWZWN0b3IoeE1pbiwgeU1pbikpLCB4TWF4IC0geE1pbiwgeU1heCAtIHlNaW4pLnRvUG9seWdvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cbiAgICogXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbXB1dGluZyB0aGUgY2VudHJvaWQuXG4gICAqIFxuICAgKiBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ2VudHJvaWQjQ2VudHJvaWRfb2ZfYV9wb2x5Z29uXG4gICAqIFxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIGEgVmVjdG9yIHRoYXQgY29udGFpbnMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjZW50cm9pZC5cbiAgICovXG4gIHB1YmxpYyBnZXRDZW50cm9pZCgpOiBWZWN0b3Ige1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgbGV0IGN4ID0gMDtcbiAgICBsZXQgY3kgPSAwO1xuICAgIGxldCBhciA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcbiAgICAgIGNvbnN0IHAyID0gaSA9PT0gbGVuIC0gMSA/IHBvaW50c1swXSA6IHBvaW50c1tpICsgMV07IC8vIExvb3AgYXJvdW5kIGlmIGxhc3QgcG9pbnRcblxuICAgICAgY29uc3QgYSA9IHAxLnggKiBwMi55IC0gcDIueCAqIHAxLnk7XG5cbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xuICAgICAgY3kgKz0gKHAxLnkgKyBwMi55KSAqIGE7XG4gICAgICBhciArPSBhO1xuICAgIH1cblxuICAgIGFyID0gYXIgKiAzOyAvLyB3ZSB3YW50IDEgLyA2IHRoZSBhcmVhIGFuZCB3ZSBjdXJyZW50bHkgaGF2ZSAyKmFyZWFcbiAgICBjeCA9IGN4IC8gYXI7XG4gICAgY3kgPSBjeSAvIGFyO1xuICAgIFxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XG4gIH1cbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcblxuLyoqXG4gKiAjIyBSZXNwb25zZVxuICogXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uLiBDb250YWluczpcbiAqIC0gVGhlIHR3byBvYmplY3RzIHBhcnRpY2lwYXRpbmcgaW4gdGhlIGludGVyc2VjdGlvblxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXG4gKiAtIFdoZXRoZXIgdGhlIGZpcnN0IG9iamVjdCBpcyBlbnRpcmVseSBpbnNpZGUgdGhlIHNlY29uZCwgYW5kIHZpY2UgdmVyc2EuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcbiAgcHVibGljIGE6IGFueSA9IG51bGw7XG4gIHB1YmxpYyBiOiBhbnkgPSBudWxsO1xuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XG4gIHB1YmxpYyBvdmVybGFwViA9IG5ldyBWZWN0b3IoKTtcblxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBiSW5BOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIG92ZXJsYXA6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgLyoqXG4gICAqIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy5cbiAgICogXG4gICAqIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVuZGVkIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcbiAgICogXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiBSZXNwb25zZSB7XG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcbiAgICB0aGlzLmJJbkEgPSB0cnVlO1xuXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59IiwiLyohXG4qIHNhdC1qcyAob3IgU0FULmpzKSBtYWRlIGJ5IEppbSBSaWVja2VuIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxuKiBDaGFuZ2VzIG1hZGUgYnkgbWU6IEJ1ZyBmaXhlcyBhbmQgY29udmVyc2lvbiB0byBUeXBlU2NyaXB0XG4qL1xuXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuXG4vKipcbiAqICMjIE9iamVjdCBQb29sc1xuICovXG5cbi8qKlxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cbiAqIFxuICogQHR5cGUge0FycmF5PFZlY3Rvcj59XG4gKi9cbiBjb25zdCBUX1ZFQ1RPUlM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcbiBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIFRfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gXG4gLyoqXG4gICogQSBwb29sIG9mIGFycmF5cyBvZiBudW1iZXJzIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmcgbWVtb3J5LlxuICAqIFxuICAqIEB0eXBlIHtBcnJheTxBcnJheTxudW1iZXI+Pn1cbiAgKi9cbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcbiBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgVF9BUlJBWVMucHVzaChbXSk7XG4gXG5cbi8qKlxuICogVGVtcG9yYXJ5IHJlc3BvbnNlIHVzZWQgZm9yIFBvbHlnb24gaGl0IGRldGVjdGlvbi5cbiAqIFxuICogQHR5cGUge1Jlc3BvbnNlfVxuICovXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XG5cbi8qKlxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXG4gKiBcbiAqIEB0eXBlIHtQb2x5Z29ufVxuICovXG5jb25zdCBURVNUX1BPSU5UID0gbmV3IEJveChuZXcgVmVjdG9yKCksIDAuMDAwMDAxLCAwLjAwMDAwMSkudG9Qb2x5Z29uKCk7XG5cbi8qKlxuICogIyMgQ29uc3RhbnRzIGZvciBWb3Jvbm9pIHJlZ2lvbnMuXG4gKi9cbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcbmNvbnN0IE1JRERMRV9WT1JPTk9JX1JFR0lPTiA9IDA7XG5jb25zdCBSSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XG5cbi8qKlxuICogIyMgSGVscGVyIEZ1bmN0aW9uc1xuICovXG5cbi8qKlxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXG4gKiByYW5nZSBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLCByZXN1bHRbMV0gd2lsbCBiZSB0aGUgbWF4aW11bSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50czogQXJyYXk8VmVjdG9yPiwgbm9ybWFsOiBWZWN0b3IsIHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IHZvaWQge1xuICBsZXQgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuXG4gIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbC5cbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XG5cbiAgICBpZiAoZG90IDwgbWluKSBtaW4gPSBkb3Q7XG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xuICB9XG5cbiAgcmVzdWx0WzBdID0gbWluO1xuICByZXN1bHRbMV0gPSBtYXg7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxuICogXG4gKiBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXG4gKiBcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICogICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXG4gKiAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICogXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxuICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcbiAqICAgICAgICAgICAgICAgICAgTUlERExFX1ZPUk9OT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbixcbiAqICAgICAgICAgICAgICAgICAgUklHSFRfVk9ST05PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXG4gKi9cbmZ1bmN0aW9uIHZvcm9ub2lSZWdpb24obGluZTogVmVjdG9yLCBwb2ludDogVmVjdG9yKTogbnVtYmVyIHtcbiAgY29uc3QgbGVuMiA9IGxpbmUubGVuMigpO1xuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcblxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIGxlZnQgdm9yb25vaSByZWdpb24uXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xuXG4gIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIHJpZ2h0IHZvcm9ub2kgcmVnaW9uLlxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcblxuICAvLyBPdGhlcndpc2UsIGl0J3MgaW4gdGhlIG1pZGRsZSBvbmUuXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdHdvIGNvbnZleCBwb2x5Z29ucyBhcmUgc2VwYXJhdGVkIGJ5IHRoZSBzcGVjaWZpZWQgYXhpcyAobXVzdCBiZSBhIHVuaXQgdmVjdG9yKS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYlBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIGF4aXMgKHVuaXQgc2l6ZWQpIHRvIHRlc3QgYWdhaW5zdC4gIFRoZSBwb2ludHMgb2YgYm90aCBwb2x5Z29ucyB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSwgYW5kIGEgcmVzcG9uc2UgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICBjb25zdCByYW5nZUEgPSBUX0FSUkFZUy5wb3AoKTtcbiAgICBjb25zdCByYW5nZUIgPSBUX0FSUkFZUy5wb3AoKTtcbiAgXG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIHR3byBwb2x5Z29uc1xuICAgIGNvbnN0IG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShiUG9zKS5zdWIoYVBvcyk7XG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XG4gIFxuICAgIC8vIFByb2plY3QgdGhlIHBvbHlnb25zIG9udG8gdGhlIGF4aXMuXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XG4gICAgZmxhdHRlblBvaW50c09uKGJQb2ludHMsIGF4aXMsIHJhbmdlQik7XG4gIFxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcbiAgXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcbiAgXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICBcbiAgICAvLyBUaGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy4gSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xuICBcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcbiAgICAgICAgcmVzcG9uc2UuYUluQiA9IGZhbHNlO1xuICBcbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHtcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuICBcbiAgICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xuICBcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xuICBcbiAgICAgICAgLy8gQiBlbmRzIGJlZm9yZSBBIGVuZHMuIFdlIGhhdmUgdG8gcHVzaCBBIG91dCBvZiBCXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xuICBcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XG4gICAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xuICBcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXG4gICAgICBjb25zdCBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XG4gIFxuICAgICAgaWYgKGFic092ZXJsYXAgPCByZXNwb25zZS5vdmVybGFwKSB7XG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBhYnNPdmVybGFwO1xuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xuICBcbiAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcbiAgXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcbiAgXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xuICAgKi9cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGMgVGhlIGNpcmNsZSB0byB0ZXN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBwb2ludEluQ2lyY2xlKHA6IFZlY3RvciwgYzogQ2lyY2xlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShwKS5zdWIoYy5wb3MpLnN1YihjLm9mZnNldCk7XG5cbiAgICBjb25zdCByYWRpdXNTcSA9IGMuciAqIGMucjtcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xuXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXG4gICAgcmV0dXJuIGRpc3RhbmNlU3EgPD0gcmFkaXVzU3E7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjb252ZXggcG9seWdvbi5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHkgVGhlIHBvbHlnb24gdG8gdGVzdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHBvaW50SW5Qb2x5Z29uKHA6IFZlY3RvciwgcG9seTogUG9seWdvbik6IGJvb2xlYW4ge1xuICAgIFRFU1RfUE9JTlQucG9zLmNvcHkocCk7XG4gICAgVF9SRVNQT05TRS5jbGVhcigpO1xuXG4gICAgbGV0IHJlc3VsdCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24oVEVTVF9QT0lOVCwgcG9seSwgVF9SRVNQT05TRSk7XG5cbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFLmFJbkI7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXG4gICAqIFxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHRlc3RDaXJjbGVDaXJjbGUoYTogQ2lyY2xlLCBiOiBDaXJjbGUsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGIucG9zKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvcykuc3ViKGEub2Zmc2V0KTtcblxuICAgIGNvbnN0IHRvdGFsUmFkaXVzID0gYS5yICsgYi5yO1xuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG5cbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXG4gICAgaWYgKGRpc3RhbmNlU3EgPiB0b3RhbFJhZGl1c1NxKSB7XG4gICAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XG5cbiAgICAgIHJlc3BvbnNlLmEgPSBhO1xuICAgICAgcmVzcG9uc2UuYiA9IGI7XG5cbiAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSB0b3RhbFJhZGl1cyAtIGRpc3Q7XG4gICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xuXG4gICAgICByZXNwb25zZS5hSW5CID0gYS5yIDw9IGIuciAmJiBkaXN0IDw9IGIuciAtIGEucjtcbiAgICAgIHJlc3BvbnNlLmJJbkEgPSBiLnIgPD0gYS5yICYmIGRpc3QgPD0gYS5yIC0gYi5yO1xuICAgIH1cblxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIGNvbnN0IGNpcmNsZVBvcyA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZS5wb3MpLmFkZChjaXJjbGUub2Zmc2V0KS5zdWIocG9seWdvbi5wb3MpO1xuXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XG4gICAgY29uc3QgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcblxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKTtcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKTtcblxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcblxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcblxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcblxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSByZXNwb25zZS5hSW5CID0gZmFsc2U7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXG4gICAgICBsZXQgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XG5cbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xuXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcblxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XG5cbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcblxuICAgICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbbmV4dF0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcblxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcblxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcblxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcblxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxuICAgICAgICBjb25zdCBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcblxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cbiAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xuICAgICAgICBjb25zdCBkaXN0QWJzID0gTWF0aC5hYnMoZGlzdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxuICAgICAgICBpZiAoZGlzdCA+IDAgJiYgZGlzdEFicyA+IHJhZGl1cykge1xuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTtcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KG92ZXJsYXBOKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICByZXNwb25zZS5hID0gcG9seWdvbjtcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XG5cbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkocmVzcG9uc2Uub3ZlcmxhcE4pLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xuICAgIH1cblxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxuICAgKiBcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXG4gICAqIGF0IHRoZSBlbmQuXG4gICAqIFxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIC8vIFRlc3QgdGhlIHBvbHlnb24gYWdhaW5zdCB0aGUgY2lyY2xlLlxuICAgIGNvbnN0IHJlc3VsdCA9IFNBVC50ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzcG9uc2UpIHtcbiAgICAgIC8vIFN3YXAgQSBhbmQgQiBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcbiAgICAgIGNvbnN0IGFJbkIgPSByZXNwb25zZS5hSW5CO1xuXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XG4gICAgICByZXNwb25zZS5vdmVybGFwVi5yZXZlcnNlKCk7XG5cbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xuICAgICAgcmVzcG9uc2UuYiA9IGE7XG5cbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xuICAgICAgcmVzcG9uc2UuYkluQSA9IGFJbkI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBwb2x5Z29ucyBjb2xsaWRlLlxuICAgKiBcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBhIFRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IGIgVGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uUG9seWdvbihhOiBQb2x5Z29uLCBiOiBQb2x5Z29uLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYVBvaW50cyA9IGEuY2FsY1BvaW50cztcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XG5cbiAgICBjb25zdCBiUG9pbnRzID0gYi5jYWxjUG9pbnRzO1xuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcblxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xuICAgICAgaWYgKFNBVC5pc1NlcGFyYXRpbmdBeGlzKGEucG9zLCBiLnBvcywgYVBvaW50cywgYlBvaW50cywgYS5ub3JtYWxzW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJMZW47IGkrKykge1xuICAgICAgaWYgKFNBVC5pc1NlcGFyYXRpbmdBeGlzKGEucG9zLCBiLnBvcywgYVBvaW50cywgYlBvaW50cywgYi5ub3JtYWxzW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLmEgPSBhO1xuICAgICAgcmVzcG9uc2UuYiA9IGI7XG5cbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkocmVzcG9uc2Uub3ZlcmxhcE4pLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59IiwiLyoqXG4gKiAjIyBWZWN0b3JcbiAqIFxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXG4gKiBcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcbiAqIGl0IHdpbGwgYmUgc2V0IHRvIGAwYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhpcyBWZWN0b3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbm90aGVyIFZlY3RvciBpbnRvIHRoaXMgb25lLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHVibGljIGNvcHkob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gb3RoZXIueDtcbiAgICB0aGlzLnkgPSBvdGhlci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZlY3RvciB3aXRoIHRoZSBzYW1lIGNvb3JkaW5hdGVzIGFzIHRoZSBvbmUuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoaXMgVmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLlxuICAgKiBcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyBwZXJwKCk6IFZlY3RvciB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcblxuICAgIHRoaXMueCA9IHRoaXMueTtcbiAgICB0aGlzLnkgPSAteDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZSB0aGlzIFZlY3RvciAoY291bnRlci1jbG9ja3dpc2UpIGJ5IHRoZSBzcGVjaWZpZWQgYW5nbGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgdGhpcy55ID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnNlIHRoaXMgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyByZXZlcnNlKCk6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIHRoaXMgdmVjdG9yIChtYWtlIGl0IGhhdmUgYSBsZW5ndGggb2YgYDFgKS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwdWJsaWMgbm9ybWFsaXplKCk6IFZlY3RvciB7XG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XG5cbiAgICBpZiAoZCA+IDApIHtcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XG4gICAgICB0aGlzLnkgPSB0aGlzLnkgLyBkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbm90aGVyIFZlY3RvciB0byB0aGlzIG9uZS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyBhZGQob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy54ICs9IG90aGVyLng7XG4gICAgdGhpcy55ICs9IG90aGVyLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvciBmcm9tIHRoaXMgb25lLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHVibGljIHN1YihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICB0aGlzLnggLT0gb3RoZXIueDtcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxuICAgKiBcbiAgICogQW4gaW5kZXBlbmRlbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHdpbGwgc2NhbGVcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwdWJsaWMgc2NhbGUoeDogbnVtYmVyLCB5PzogbnVtYmVyKTogVmVjdG9yIHtcbiAgICB0aGlzLnggKj0geDtcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5sZW4yKCk7XG5cbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYSBWZWN0b3Igb2YgdW5pdCBsZW5ndGguXG4gICAqIFxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdW5pdCB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcik7XG5cbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHVibGljIHJlZmxlY3QoYXhpczogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XG5cbiAgICB0aGlzLnggLT0geDtcbiAgICB0aGlzLnkgLT0geTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXG4gICAqIFxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHJlZmxlY3RgIHdoZW4gZGVhbGluZyB3aXRoIGFuIGF4aXMgdGhhdCBpcyBhIHVuaXQgdmVjdG9yLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHVibGljIHJlZmxlY3ROKGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcblxuICAgIHRoaXMueCAtPSB4O1xuICAgIHRoaXMueSAtPSB5O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIFZlY3RvciBhbmQgYW5vdGhlci5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIGRvdCB0aGlzIG9uZSBhZ2FpbnN0LlxuICAgKiBcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cbiAgICovXG4gIHB1YmxpYyBkb3Qob3RoZXI6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxuICAgKi9cbiAgcHVibGljIGxlbjIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cbiAgICovXG4gIHB1YmxpYyBsZW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiByYW5kb21VbnNlY3VyZVVVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAneHh4eC14eHh4LXh4eC14eHh4Jy5yZXBsYWNlKC9beF0vZywgKGMpID0+IHsgIFxyXG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNik7ICBcclxuICAgICAgICByZXR1cm4gci50b1N0cmluZygxNik7ICBcclxuICAgIH0pO1xyXG59IiwiaW1wb3J0IHsgQmFzaWNPYmplY3QgfSBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgb2JqZWN0czogQXJyYXk8QmFzaWNPYmplY3Q+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUXVldWU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLnJlbW92ZVF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW29dLmlkID09IHRoaXMucmVtb3ZlUXVldWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbb10uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UobywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW5kZXJpbmdcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uZHJhdyhjdHgsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWUuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q29sbGlzaW9uTGluZXMoY3R4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU9iamVjdChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5wdXNoKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNSZW1vdmVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVRdWV1ZS5pbmNsdWRlcyhpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdDb2xsaXNpb25MaW5lcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzOiBWZWN0b3JbXSA9IHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvaW50cztcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHBvaW50cy5sZW5ndGg7IHArKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAgKyAxID09IHBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzW3AgKyAxXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1twICsgMV0ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmYwMDAwJztcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlKHRoaXMub2JqZWN0cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbMF0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaW5zdGFuY2VGYWJyaWMoKTogQmFzaWNMZXZlbDtcclxufSIsImltcG9ydCB7IEJhc2ljTGV2ZWwgfSBmcm9tICcuL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgeyBQbGF5ZXJPYmplY3QgfSBmcm9tICcuLi9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL29iamVjdHMvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBTcGlrZU9iamVjdCB9IGZyb20gJy4uL29iamVjdHMvU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tICcuLi9BdWRpb01hbmFnZXInO1xyXG5leHBvcnQgY2xhc3MgVGVzdExldmVsIGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvYmVnaW5zLm9nZ1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGxheWVyT2JqZWN0KDMyLCA1MTIpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kXCIgKyBpLCBpICogMzIsIDU3NiwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgSW1hZ2VPYmplY3QoXCJncm91bmQyNVwiLCAyNTYsIDU0NCwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBJbWFnZU9iamVjdChcImdyb3VuZDI2XCIsIDI1NiwgNTEyLCAzMiwgMzIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kMjdcIiwgMjU2LCA0ODAsIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCIpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgSW1hZ2VPYmplY3QoXCJncm91bmQyOFwiLCAyNTYsIDQ0OCwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBJbWFnZU9iamVjdChcImdyb3VuZDI5XCIsIDI4OCwgNDE2LCAzMiwgMzIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kMzBcIiwgMjg4LCAzODQsIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UwXCIsIDMyMCwgNDE2LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UxXCIsIDMyMCwgMzg0LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UyXCIsIDI4OCwgMzUyLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbmNlRmFicmljKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdExldmVsKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbjtcclxuICAgIHB1YmxpYyBjb2xsaXNpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIGlmICh3ID09IDAgJiYgaCA9PSAwKSB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKDAsIGgpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKHcsIDApXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYkNvbGw6IGJvb2xlYW4gPSBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsICYmIGJDb2xsICYmIHRoaXMuY29sbGlzaW9uKSB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge31cclxufSIsImltcG9ydCB7IEJhc2ljT2JqZWN0IH0gZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgdywgaCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy5pbWFnZS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQgPSBoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIHRoaXMuaW1hZ2Uud2lkdGgsIHRoaXMuaW1hZ2UuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmltYWdlLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IHsgQmFzaWNPYmplY3QgfSBmcm9tICcuL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHsgUGxheWVyT2JqZWN0IH0gZnJvbSAnLi9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuZXhwb3J0IGNsYXNzIFNwaWtlT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCAzMiwgMzIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByU3Bpa2UucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxNiksIG5ldyBWZWN0b3IoMzEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxNiwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMTYpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDE2LCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDMxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkge1xyXG4gICAgICAgICAgICAob2JqIGFzIFBsYXllck9iamVjdCkuZGllKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5kaXJlY3Rpb24gKiAzMiwgMCwgMzIsIDMyLCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMzIsIDMyKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHsgUGxheWVyT2JqZWN0IH0gZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCB7IEJhc2ljT2JqZWN0IH0gZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgeyBTcGlrZU9iamVjdCB9IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGNsYXNzIEJsb29kUGFydGljbGUgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3R1Y2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyB0eXBlOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCAyLCAyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJCbG9vZC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5keCA9IGR4O1xyXG4gICAgICAgIHRoaXMuZHkgPSBkeTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0dWNrKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIGRlbHRhO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zdHVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnR5cGUgKiAzLCAwLCAzLCA0LCB0aGlzLnBvbHlnb24ucG9zLnggLSAxLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCAzLCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBQbGF5ZXJPYmplY3QgfSBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgeyBCYXNpY09iamVjdCB9IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBTcGlrZU9iamVjdCB9IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuZXhwb3J0IGNsYXNzIEJ1bGxldE9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHByb3RlY3RlZCBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggLSA1LCB5IC0gMSwgMTAsIDIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJ1bGxldC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5kaXJlY3Rpb24gKiA3NTAgKiBkZWx0YSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZyYW1lVGltZSA+PSAwLjIwKSB0aGlzLmZyYW1lVGltZSAtPSAwLjIwO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApICogNCwgMCwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMywgdGhpcy5wb2x5Z29uLnBvcy55IC0gMSwgNCwgNCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gXCIuLi9JbWFnZU9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlYXRoTWVzc2FnZSBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiZGVhdGhfbWVzc2FnZVwiLCA0MDAgLSAzNTAsIDMwNCAtIDgyLCA3MDAsIDE2NCwgXCJhc3NldHMvdGV4dHVyZXMvdWkvc3ByR2FtZU92ZXIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi8uLi9TQVQvU0FUJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IFBsYXllck9iamVjdCB9IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBCYXNpY09iamVjdCB9IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgU3Bpa2VPYmplY3QgfSBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGNsYXNzIEdpYlBhcnRpY2xlIGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYm9keVR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSAwOiBib2R5LFxyXG4gICAgICogdHlwZSAxOiBib2R5IHN0b25lZCxcclxuICAgICAqIHR5cGUgMjogaGVhZCxcclxuICAgICAqIHR5cGUgMzogaGVhZCBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDQ6IGFybSxcclxuICAgICAqIHR5cGUgNTogYXJtIHN0b25lZCxcclxuICAgICAqIHR5cGUgNjogZmVldCxcclxuICAgICAqIHR5cGUgNzogZmVldCBzdG9uZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHR5cGU6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCA4LCA4LCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJHaWJzLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDAgfHwgdGhpcy50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5VHlwZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIE1hdGgubWluKGRlbHRhLCAwLjMpO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aGlzQUFCQjogUG9seWdvbiA9IHRoaXMucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5ib2R5VHlwZSAqIDIsIDAsIDIsIDksIHRoaXMucG9seWdvbi5wb3MueCArIDQsIHRoaXMucG9seWdvbi5wb3MueSwgMiwgOSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmJvZHlUeXBlICogMiwgOSwgMiwgOSwgdGhpcy5wb2x5Z29uLnBvcy54ICsgNCwgdGhpcy5wb2x5Z29uLnBvcy55LCAyLCA5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMTAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMjAsIDE4LCA4LCA4LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgOCwgOCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDM2LCAxOCwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAzNiwgMjIsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IEJ1bGxldE9iamVjdCB9IGZyb20gJy4vQnVsbGV0T2JqZWN0JztcclxuaW1wb3J0IHsgcmFuZG9tVW5zZWN1cmVVVUlEIH0gZnJvbSAnLi4vLi4vVXRpbHMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBCbG9vZFBhcnRpY2xlIH0gZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IHsgR2liUGFydGljbGUgfSBmcm9tICcuL0dpYlBhcnRpY2xlJztcclxuaW1wb3J0IHsgRGVhdGhNZXNzYWdlIH0gZnJvbSAnLi9EZWF0aE1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tICcuLi8uLi9BdWRpb01hbmFnZXInO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi8uLi9TQVQvUG9seWdvbic7XHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlbG9jaXR5OiBudW1iZXIgPSAxNzU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXZpdHk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgIHB1YmxpYyBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJQbGF5ZXIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcig5LCAxMSksIG5ldyBWZWN0b3IoOSwgMzIpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDIzLCAzMiksIG5ldyBWZWN0b3IoMjMsIDExKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd6JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRJZDogc3RyaW5nID0gXCJidWxsZXRcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCdWxsZXRPYmplY3QodGhpcy5wb2x5Z29uLnBvcy54ICsgMTYgKyAxMCAqIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RLZXlUaW1lKys7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdTaGlmdCcpICYmICh0aGlzLmF2YWlsYWJsZUp1bXBzICE9IDAgfHwgdGhpcy5qdW1wS2V5VGltZSAhPSAwKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVKdW1wcyA9PSAxKSBBdWRpb01hbmFnZXIucGxheShcImp1bXAxXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMS53YXZcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIEF1ZGlvTWFuYWdlci5wbGF5KFwianVtcDJcIiwgXCJhc3NldHMvc291bmRzL2p1bXAyLndhdlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmp1bXBLZXlUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAtIGRlbHRhIDwgMC4zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA8IDAuMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLmR5ID0gLTE4MCAqIGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVKdW1wcyA9PSAxKSB0aGlzLmR5ID0gLTIyMCAqICh0aGlzLmp1bXBLZXlUaW1lIC0gMC4zKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogKHRoaXMuanVtcEtleVRpbWUgLSAwLjMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuanVtcEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5keCAhPSAwKSB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBNYXRoLnNpZ24odGhpcy5keCk7XHJcbiAgICAgICAgdGhpcy5keSA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMuZHksIDEwLjY2NiksIC0xMC42NjYpO1xyXG4gICAgICAgIGxldCBwcmV2aW91c1BvczogVmVjdG9yID0gKG5ldyBWZWN0b3IoKSkuY29weSh0aGlzLnBvbHlnb24ucG9zKTtcclxuICAgICAgICB0aGlzLm9uR3JvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR5ID4gMCAmJiB0aGlzLnBvbHlnb24ucG9zLnkgPT0gcHJldmlvdXNQb3MueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gT24gZ3JvdW5kXHJcbiAgICAgICAgICAgICAgICB0aGlzLmR5ID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Hcm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcyA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uR3JvdW5kICYmIHRoaXMuYXZhaWxhYmxlSnVtcHMgPiAxKSB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMTsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZS5sZXZlbC5pc1JlbW92ZWQodGhpcy5pZCkpIHJldHVybjtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICBsZXQgY2VudGVyOiBWZWN0b3IgPSB0aGlzLnBvbHlnb24uZ2V0Q2VudHJvaWQoKS5hZGQodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjg7IGkrKykge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgQmxvb2RQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDYsIE1hdGguc2luKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBcImJsb29kXCIgKyByYW5kb21VbnNlY3VyZVVVSUQoKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IChpID4gMyA/IDIgOiAxKTsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgR2liUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsIE1hdGguc2luKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgXCJnaWJcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2dhbWVvdmVyLm9nZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IERlYXRoTWVzc2FnZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZyYW1lVGltZSA+PSAwLjQwKSB0aGlzLmZyYW1lVGltZSAtPSAwLjQwO1xyXG4gICAgICAgIGxldCBmcmFtZTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgLy8gSnVtcGluZ1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjAyKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDY0LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjA0KSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDMyLCA2NCwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAoZnJhbWUgJSAyKSAqIDMyICsgNjQsIDY0LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAoZnJhbWUgJSAyKSAqIDMyLCA5NiwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBmcmFtZSAqIDMyLCAzMiwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElkbGVcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBmcmFtZSAqIDMyLCAwLCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyohXHJcbiogSSBXYW5uYSBCZSBUaGUgR3V5OiBUaGUgTW92aWU6IFRoZSBHYW1lXHJcbiogVHlwZVNjcmlwdCByZW1ha2UgbWFkZSBieSBQR2dhbWVyMiAoYWthIFNvbm9QRykuXHJcbiogWW91IGNhbiBmaW5kIHRoZSBzb3VyY2UgY29kZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vUEdnYW1lcjIvSVdCVEcudHNcclxuKiBPcmlnaW5hbCBnYW1lIG1hZGUgYnkgS2F5aW46IGh0dHBzOi8va2F5aW4ubW9lL2l3YnRnL1xyXG4qL1xyXG5cclxuaW1wb3J0IHsgQXVkaW9NYW5hZ2VyIH0gZnJvbSBcIi4vQXVkaW9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5mdW5jdGlvbiBmcmFtZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgIEdhbWUudXBkYXRlKHRpbWVzdGFtcCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxufVxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxuXHJcbm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgdHJ1ZSk7XHJcbiAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXgoKTtcclxufTtcclxub25rZXl1cCA9IGZ1bmN0aW9uKGUpIHsgR2FtZS5rZXlNYXAuc2V0KGUua2V5Lmxlbmd0aCA9PSAxID8gZS5rZXkudG9Mb3dlckNhc2UoKSA6IGUua2V5LCBmYWxzZSk7IH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9