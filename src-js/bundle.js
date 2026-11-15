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
        var _a;
        if (AudioManager.pause(key)) {
            (_a = AudioManager.audioMap.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
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
        if (document.getElementById("discrete-scale-checkbox").checked)
            scale = Math.max(1 << (31 - Math.clz32(scale)), 1);
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
        var _a;
        if (keyName.length == 1)
            keyName = keyName.toLowerCase();
        return (_a = Game.keyMap.get(keyName)) !== null && _a !== void 0 ? _a : false;
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
        this.points = [];
        this.calcPoints = [];
        this.edges = [];
        this.normals = [];
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
        return this.removeQueue.indexOf(id) !== -1;
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
        if (this.image === undefined)
            return;
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, this.image.width, this.image.height);
    };
    ImageObject.prototype.dispose = function () {
        var _a;
        (_a = this.image) === null || _a === void 0 ? void 0 : _a.remove();
        delete this.image;
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
        if (this.image === undefined)
            return;
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
        if (this.image === undefined)
            return;
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
        for (var i = 1; i < this.totalW * this.totalH; i++) {
            ctx.drawImage(i < this.order.length ? this.otherImages[this.order[i]] : this.image, this.polygon.pos.x + (i % this.totalW) * 32, this.polygon.pos.y + Math.floor(i / this.totalW) * 32, 32, 32);
        }
    };
    TileObject.prototype.dispose = function () {
        var _a;
        _super.prototype.dispose.call(this);
        while (this.otherImages.length != 0) {
            (_a = this.otherImages.shift()) === null || _a === void 0 ? void 0 : _a.remove();
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
        if (this.image === undefined)
            return;
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
        if (this.image === undefined)
            return;
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
        if (this.image === undefined)
            return;
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
        if (this.image === undefined)
            return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUVkLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDbkQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDMUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0UsQ0FBQztRQUNMLENBQUM7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXhCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUV0QixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDO2FBQU0sQ0FBQztZQUVKLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFDRCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQTdJc0IscUJBQVEsR0FBVyxHQUFHLENBQUM7SUFDdkIsb0JBQU8sR0FBVyxFQUFFLENBQUM7SUE2SWhELG1CQUFDO0NBQUEsQ0EvSXlDLHFCQUFXLEdBK0lwRDtxQkEvSW9CLFlBQVk7Ozs7Ozs7VUNWakM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QkE7Ozs7O0VBS0U7O0FBRUYsd0ZBQTBDO0FBQzFDLGdFQUEwQjtBQUUxQixTQUFTLEtBQUssQ0FBQyxTQUE4QjtJQUN6QyxjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBQ0QsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXBDLFNBQVMsR0FBRyxVQUFTLENBQUM7SUFDbEIsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0YsT0FBTyxHQUFHLFVBQVMsQ0FBQyxJQUFJLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BdWRpb01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbWVyYS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL0JveC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1BvbHlnb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9SZXNwb25zZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1NBVC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9CYXNpY0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvVGVzdExldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2ljT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1NwaWtlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1RpbGVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Jsb29kUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0J1bGxldE9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvRGVhdGhNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9HaWJQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb01hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBhdWRpb01hcDogTWFwPHN0cmluZywgSFRNTEF1ZGlvRWxlbWVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5KGtleTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDEuMCk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoc3JjID09PSB1bmRlZmluZWQpIGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIGVsc2UgYXVkaW8gPSBuZXcgQXVkaW8oc3JjKTtcclxuICAgICAgICAgICAgYXVkaW8ubG9vcCA9IGxvb3A7XHJcbiAgICAgICAgICAgIGF1ZGlvLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLnNldChrZXksIGF1ZGlvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXVkaW8ucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICBhdWRpby5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICBhdWRpby5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheU11c2ljKHNyYzogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQgJiYgIWF1ZGlvLnNyYy5lbmRzV2l0aChzcmMpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5yZWxlYXNlKFwiX211c2ljXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLnBsYXkoXCJfbXVzaWNcIiwgc3JjLCBsb29wLCAwLjc1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5wYXVzZShrZXkpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvUGxheUZpeGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1dG9QbGF5Rml4KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVHJ5aW5nIHRvIGZpeCBhdXRvcGxheS4uLlwiKTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfbXVzaWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgVGVzdExldmVsIGZyb20gJy4vbGV2ZWxzL1Rlc3RMZXZlbCc7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSAnLi9DYW1lcmEnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbGFzdFRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWw6IEJhc2ljTGV2ZWwgPSBuZXcgVGVzdExldmVsKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICBHYW1lLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgLy8gUmVzaXplIGtlZXBpbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgbGV0IHBhZ2VBc3BlY3RSYXRpbyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBNYXRoLmZsb29yKDI1IC8gMTkgPCBwYWdlQXNwZWN0UmF0aW8gPyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAvIDE5IDogZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIDI1KTtcclxuXHRcdGlmICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNjcmV0ZS1zY2FsZS1jaGVja2JveFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKVxyXG5cdFx0XHRzY2FsZSA9IE1hdGgubWF4KDEgPDwgKDMxIC0gTWF0aC5jbHozMihzY2FsZSkpLCAxKTtcdC8vIFNldCBzY2FsZSB0byBhIHBvd2VyIG9mIHR3b1xyXG4gICAgICAgIEdhbWUuY2FudmFzLndpZHRoID0gc2NhbGUgKiAyNTtcclxuICAgICAgICBHYW1lLmNhbnZhcy5oZWlnaHQgPSBzY2FsZSAqIDE5O1xyXG4gICAgICAgIC8vIEdldCBjb250ZXh0IGFuZCBjbGVhclxyXG4gICAgICAgIGxldCBjdHggPSBHYW1lLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikhO1xyXG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIEdhbWUuY2FudmFzLndpZHRoLCBHYW1lLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW1lcmEueCwgR2FtZS5jYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZShHYW1lLmNhbWVyYS5hbmdsZSk7XHJcbiAgICAgICAgY3R4LnNjYWxlKEdhbWUuY2FtZXJhLnNpemVYICogKEdhbWUuY2FudmFzLndpZHRoIC8gODAwKSwgR2FtZS5jYW1lcmEuc2l6ZVkgKiAoR2FtZS5jYW52YXMuaGVpZ2h0IC8gNjA4KSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC51cGRhdGUoY3R4LCAodGltZXN0YW1wIC0gR2FtZS5sYXN0VGltZXN0YW1wKSAvIDEwMDApO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubGV2ZWwuaW5zdGFuY2VGYWJyaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNCdXR0b25Eb3duKGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChrZXlOYW1lLmxlbmd0aCA9PSAxKSBrZXlOYW1lID0ga2V5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBHYW1lLmtleU1hcC5nZXQoa2V5TmFtZSkgPz8gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcblxyXG4vKipcclxuICogIyMgQm94XHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94IHtcclxuICBwdWJsaWMgcG9zOiBWZWN0b3I7XHJcbiAgcHVibGljIHc6IG51bWJlcjtcclxuICBwdWJsaWMgaDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IEJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC5cclxuICAgKiBcclxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxyXG4gICAqIGJlIHNldCB0byBgMGAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9bmV3IFZlY3RvcigpXSBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGJvdHRvbS1sZWZ0IG9mIHRoZSBib3goaS5lLiB0aGUgc21hbGxlc3QgeCBhbmQgc21hbGxlc3QgeSB2YWx1ZSkuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdIFRoZSB3aWR0aCBvZiB0aGUgQm94LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaD0wXSBUaGUgaGVpZ2h0IG9mIHRoZSBCb3guXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCB3ID0gMCwgaCA9IDApIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy53ID0gdztcclxuICAgIHRoaXMuaCA9IGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgUG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBCb3guXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IEEgbmV3IFBvbHlnb24gdGhhdCByZXByZXNlbnRzIHRoaXMgQm94LlxyXG4gICAqL1xyXG4gIHB1YmxpYyB0b1BvbHlnb24oKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb3MgPSB0aGlzLnBvcztcclxuICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICBjb25zdCBoID0gdGhpcy5oO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHBvcy54LCBwb3MueSksIFtcclxuICAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKHcsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKDAsIGgpXHJcbiAgICBdKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IEJveCBmcm9tICcuL0JveCc7XHJcblxyXG4vKipcclxuICogIyMgUG9seWdvblxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cclxuICogXHJcbiAqIE5vdGU6IERvIF9ub3RfIG1hbnVhbGx5IGNoYW5nZSB0aGUgYHBvaW50c2AsIGBhbmdsZWAsIG9yIGBvZmZzZXRgIHByb3BlcnRpZXMuIFVzZSB0aGUgcHJvdmlkZWQgXHJcbiAqIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxyXG4gKiBcclxuICogYHBvc2AgY2FuIGJlIGNoYW5nZWQgZGlyZWN0bHkuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uIHtcclxuICBwdWJsaWMgcG9zOiBWZWN0b3I7XHJcbiAgcHVibGljIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBvZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuICBwdWJsaWMgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiAgcHVibGljIGNhbGNQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWQgYnkgdmVjdG9ycyBcclxuICAgKiByZWxhdGl2ZSB0byB0aGUgcG9zaXRpb24gdmVjdG9yKS4gSWYgbm8gcG9zaXRpb24gaXMgcGFzc2VkIGluLCB0aGUgcG9zaXRpb24gb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBgKDAsMClgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gW3BvaW50cz1bXV0gQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXSkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLnNldFBvaW50cyhwb2ludHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBwb2ludHMgb2YgdGhlIHBvbHlnb24uIEFueSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzIHdpbGwgYmUgY29tYmluZWQuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhlIHBvaW50cyBhcmUgY291bnRlci1jbG9ja3dpc2UgKndpdGggcmVzcGVjdCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0qLiBJZiB5b3UgZGlyZWN0bHkgZHJhdyB0aGUgcG9pbnRzIG9uIGEgc2NyZWVuIFxyXG4gICAqIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lciBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBcclxuICAgKiBqdXN0IGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRQb2ludHMocG9pbnRzOiBBcnJheTxWZWN0b3I+KTogUG9seWdvbiB7XHJcbiAgICAvLyBPbmx5IHJlLWFsbG9jYXRlIGlmIHRoaXMgaXMgYSBuZXcgcG9seWdvbiBvciB0aGUgbnVtYmVyIG9mIHBvaW50cyBoYXMgY2hhbmdlZC5cclxuICAgIGNvbnN0IGxlbmd0aENoYW5nZWQgPSAhdGhpcy5wb2ludHMgfHwgdGhpcy5wb2ludHMubGVuZ3RoICE9PSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW5ndGhDaGFuZ2VkKSB7XHJcbiAgICAgIGxldCBpO1xyXG5cclxuICAgICAgY29uc3QgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cyA9IFtdO1xyXG4gICAgICBjb25zdCBlZGdlczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuZWRnZXMgPSBbXTtcclxuICAgICAgY29uc3Qgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzXHJcbiAgICAgICAgY29uc3QgcDEgPSBwb2ludHNbaV07XHJcbiAgICAgICAgY29uc3QgcDIgPSBpIDwgcG9pbnRzLmxlbmd0aCAtIDEgPyBwb2ludHNbaSArIDFdIDogcG9pbnRzWzBdO1xyXG5cclxuICAgICAgICBpZiAocDEgIT09IHAyICYmIHAxLnggPT09IHAyLnggJiYgcDEueSA9PT0gcDIueSkge1xyXG4gICAgICAgICAgcG9pbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIGkgLT0gMTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsY1BvaW50cy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgZWRnZXMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgb2YgdGhlIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0QW5nbGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjdXJyZW50IG9mZnNldCB0byBhcHBseSB0byB0aGUgYHBvaW50c2AgYmVmb3JlIGFwcGx5aW5nIHRoZSBgYW5nbGVgIHJvdGF0aW9uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRPZmZzZXQob2Zmc2V0OiBWZWN0b3IpOiBQb2x5Z29uIHtcclxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlcyB0aGlzIFBvbHlnb24gY291bnRlci1jbG9ja3dpc2UgYXJvdW5kIHRoZSBvcmlnaW4gb2YgKml0cyBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBhbmdsZWAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHJvdGF0aW9uKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykgcG9pbnRzW2ldLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGVzIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uIGJ5IGEgc3BlY2lmaWVkIGFtb3VudCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mICppdHMgb3duIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYG9mZnNldGAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHRyYW5zbGF0aW9uKVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHZlcnRpY2FsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgcG9pbnRzW2ldLnggKz0geDtcclxuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGVzIHRoZSBjYWxjdWxhdGVkIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgYXBwbGllcyB0aGUgYGFuZ2xlYCBhbmQgYG9mZnNldGAgdG8gdGhlIG9yaWdpbmFsIHBvaW50cyB0aGVuIHJlY2FsY3VsYXRlcyB0aGUgZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVjYWxjKCk6IFBvbHlnb24ge1xyXG4gICAgLy8gQ2FsY3VsYXRlZCBwb2ludHMgLSB0aGlzIGlzIHdoYXQgaXMgdXNlZCBmb3IgdW5kZXJseWluZyBjb2xsaXNpb25zIGFuZCB0YWtlcyBpbnRvIGFjY291bnRcclxuICAgIC8vIHRoZSBhbmdsZS9vZmZzZXQgc2V0IG9uIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2FsY1BvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cclxuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcclxuICAgIC8vIGZpcnN0IHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgY29uc3QgZWRnZXMgPSB0aGlzLmVkZ2VzO1xyXG5cclxuICAgIC8vIFRoZSBub3JtYWxzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5vcm1hbCBmb3IgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlXHJcbiAgICAvLyB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGFuIGVkZ2Ugbm9ybWFsLCB5b3UgbXVzdCBmaXJzdFxyXG4gICAgLy8gdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG5cclxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcclxuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZTtcclxuXHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgbGV0IGk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNhbGNQb2ludCA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xyXG5cclxuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XHJcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xyXG5cclxuICAgICAgaWYgKGFuZ2xlICE9PSAwKSBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBwMSA9IGNhbGNQb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyID0gaSA8IGxlbiAtIDEgPyBjYWxjUG9pbnRzW2kgKyAxXSA6IGNhbGNQb2ludHNbMF07XHJcblxyXG4gICAgICBjb25zdCBlID0gZWRnZXNbaV0uY29weShwMikuc3ViKHAxKTtcclxuXHJcbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94LlxyXG4gICAqIFxyXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIEFBQkIuXHJcbiAgICovXHJcbiAgcHVibGljIGdldEFBQkIoKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcblxyXG4gICAgbGV0IHhNaW4gPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWluID0gcG9pbnRzWzBdLnk7XHJcblxyXG4gICAgbGV0IHhNYXggPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWF4ID0gcG9pbnRzWzBdLnk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNbaV07XHJcblxyXG4gICAgICBpZiAocG9pbnQueCA8IHhNaW4pIHhNaW4gPSBwb2ludC54O1xyXG4gICAgICBlbHNlIGlmIChwb2ludC54ID4geE1heCkgeE1heCA9IHBvaW50Lng7XHJcblxyXG4gICAgICBpZiAocG9pbnQueSA8IHlNaW4pIHlNaW4gPSBwb2ludC55O1xyXG4gICAgICBlbHNlIGlmIChwb2ludC55ID4geU1heCkgeU1heCA9IHBvaW50Lnk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3godGhpcy5wb3MuY2xvbmUoKS5hZGQobmV3IFZlY3Rvcih4TWluLCB5TWluKSksIHhNYXggLSB4TWluLCB5TWF4IC0geU1pbikudG9Qb2x5Z29uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBjZW50cm9pZCAoZ2VvbWV0cmljIGNlbnRlcikgb2YgdGhlIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29tcHV0aW5nIHRoZSBjZW50cm9pZC5cclxuICAgKiBcclxuICAgKiBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ2VudHJvaWQjQ2VudHJvaWRfb2ZfYV9wb2x5Z29uXHJcbiAgICogXHJcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBWZWN0b3JgIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgYSBWZWN0b3IgdGhhdCBjb250YWlucyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRyb2lkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDZW50cm9pZCgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgY3ggPSAwO1xyXG4gICAgbGV0IGN5ID0gMDtcclxuICAgIGxldCBhciA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpID09PSBsZW4gLSAxID8gcG9pbnRzWzBdIDogcG9pbnRzW2kgKyAxXTsgLy8gTG9vcCBhcm91bmQgaWYgbGFzdCBwb2ludFxyXG5cclxuICAgICAgY29uc3QgYSA9IHAxLnggKiBwMi55IC0gcDIueCAqIHAxLnk7XHJcblxyXG4gICAgICBjeCArPSAocDEueCArIHAyLngpICogYTtcclxuICAgICAgY3kgKz0gKHAxLnkgKyBwMi55KSAqIGE7XHJcbiAgICAgIGFyICs9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgYXIgPSBhciAqIDM7IC8vIHdlIHdhbnQgMSAvIDYgdGhlIGFyZWEgYW5kIHdlIGN1cnJlbnRseSBoYXZlIDIqYXJlYVxyXG4gICAgY3ggPSBjeCAvIGFyO1xyXG4gICAgY3kgPSBjeSAvIGFyO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcihjeCwgY3kpO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5cclxuLyoqXHJcbiAqICMjIFJlc3BvbnNlXHJcbiAqIFxyXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uLiBDb250YWluczpcclxuICogLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXHJcbiAqIC0gVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc2Vjb25kIG9uZSAoYXMgd2VsbCBhcyBhIHVuaXQgdmVjdG9yIGluIHRoYXQgZGlyZWN0aW9uIGFuZCB0aGUgbWFnbml0dWRlIG9mIHRoZSBvdmVybGFwKVxyXG4gKiAtIFdoZXRoZXIgdGhlIGZpcnN0IG9iamVjdCBpcyBlbnRpcmVseSBpbnNpZGUgdGhlIHNlY29uZCwgYW5kIHZpY2UgdmVyc2EuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zZSB7XHJcbiAgcHVibGljIGE6IGFueSA9IG51bGw7XHJcbiAgcHVibGljIGI6IGFueSA9IG51bGw7XHJcbiAgcHVibGljIG92ZXJsYXBOID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBvdmVybGFwViA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgcHVibGljIGFJbkI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBiSW5BOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgb3ZlcmxhcDogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLlxyXG4gICAqIFxyXG4gICAqIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVuZGVkIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UmVzcG9uc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFyKCk6IFJlc3BvbnNlIHtcclxuICAgIHRoaXMuYUluQiA9IHRydWU7XHJcbiAgICB0aGlzLmJJbkEgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMub3ZlcmxhcCA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59IiwiLyohXHJcbiogc2F0LWpzIChvciBTQVQuanMpIG1hZGUgYnkgSmltIFJpZWNrZW4gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4qIE1vZGlmaWVkIGJ5IFJvYmVydCBDb3Jwb25vaSBhbmQgbWUgKFNvbm9QRylcclxuKiBDaGFuZ2VzIG1hZGUgYnkgbWU6IEJ1ZyBmaXhlcyBhbmQgY29udmVyc2lvbiB0byBUeXBlU2NyaXB0XHJcbiovXHJcblxyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9DaXJjbGUnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XHJcblxyXG4vKipcclxuICogIyMgT2JqZWN0IFBvb2xzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgcG9vbCBvZiBgVmVjdG9yIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAqIFxyXG4gKiBAdHlwZSB7QXJyYXk8VmVjdG9yPn1cclxuICovXHJcbiBjb25zdCBUX1ZFQ1RPUlM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykgVF9WRUNUT1JTLnB1c2gobmV3IFZlY3RvcigpKTtcclxuIFxyXG4gLyoqXHJcbiAgKiBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAgKiBcclxuICAqIEB0eXBlIHtBcnJheTxBcnJheTxudW1iZXI+Pn1cclxuICAqL1xyXG4gY29uc3QgVF9BUlJBWVM6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XHJcbiBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgVF9BUlJBWVMucHVzaChbXSk7XHJcbiBcclxuXHJcbi8qKlxyXG4gKiBUZW1wb3JhcnkgcmVzcG9uc2UgdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gKiBcclxuICogQHR5cGUge1Jlc3BvbnNlfVxyXG4gKi9cclxuY29uc3QgVF9SRVNQT05TRSA9IG5ldyBSZXNwb25zZSgpO1xyXG5cclxuLyoqXHJcbiAqIFRpbnkgXCJwb2ludFwiIFBvbHlnb24gdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gKiBcclxuICogQHR5cGUge1BvbHlnb259XHJcbiAqL1xyXG5jb25zdCBURVNUX1BPSU5UID0gbmV3IEJveChuZXcgVmVjdG9yKCksIDAuMDAwMDAxLCAwLjAwMDAwMSkudG9Qb2x5Z29uKCk7XHJcblxyXG4vKipcclxuICogIyMgQ29uc3RhbnRzIGZvciBWb3Jvbm9pIHJlZ2lvbnMuXHJcbiAqL1xyXG5jb25zdCBMRUZUX1ZPUk9OT0lfUkVHSU9OID0gLTE7XHJcbmNvbnN0IE1JRERMRV9WT1JPTk9JX1JFR0lPTiA9IDA7XHJcbmNvbnN0IFJJR0hUX1ZPUk9OT0lfUkVHSU9OID0gMTtcclxuXHJcbi8qKlxyXG4gKiAjIyBIZWxwZXIgRnVuY3Rpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZsYXR0ZW5zIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgcG9pbnRzIG9udG8gYSB1bml0IHZlY3RvciBheGlzIHJlc3VsdGluZyBpbiBhIG9uZSBkaW1lbnNpb25zbFxyXG4gKiByYW5nZSBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSByZXN1bHQgQW4gYXJyYXkuIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgcmVzdWx0WzBdIHdpbGwgYmUgdGhlIG1pbmltdW0gdmFsdWUsIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxyXG4gKi9cclxuZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50czogQXJyYXk8VmVjdG9yPiwgbm9ybWFsOiBWZWN0b3IsIHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IHZvaWQge1xyXG4gIGxldCBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gIGxldCBtYXggPSAtTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgcHJvamVjdGlvbiBvZiB0aGUgcG9pbnQgb250byB0aGUgbm9ybWFsLlxyXG4gICAgY29uc3QgZG90ID0gcG9pbnRzW2ldLmRvdChub3JtYWwpO1xyXG5cclxuICAgIGlmIChkb3QgPCBtaW4pIG1pbiA9IGRvdDtcclxuICAgIGlmIChkb3QgPiBtYXgpIG1heCA9IGRvdDtcclxuICB9XHJcblxyXG4gIHJlc3VsdFswXSA9IG1pbjtcclxuICByZXN1bHRbMV0gPSBtYXg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHdoaWNoIFZvcm9ub2kgcmVnaW9uIGEgcG9pbnQgaXMgb24gYSBsaW5lIHNlZ21lbnQuXHJcbiAqIFxyXG4gKiBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXHJcbiAqICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XHJcbiAqIFxyXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxyXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50LlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IExFRlRfVk9ST05PSV9SRUdJT04gKC0xKSBpZiBpdCBpcyB0aGUgbGVmdCByZWdpb24sXHJcbiAqICAgICAgICAgICAgICAgICAgTUlERExFX1ZPUk9OT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBSSUdIVF9WT1JPTk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIHZvcm9ub2lSZWdpb24obGluZTogVmVjdG9yLCBwb2ludDogVmVjdG9yKTogbnVtYmVyIHtcclxuICBjb25zdCBsZW4yID0gbGluZS5sZW4yKCk7XHJcbiAgY29uc3QgZHAgPSBwb2ludC5kb3QobGluZSk7XHJcblxyXG4gIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBpZiAoZHAgPCAwKSByZXR1cm4gTEVGVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgZWxzZSBpZiAoZHAgPiBsZW4yKSByZXR1cm4gUklHSFRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cclxuICBlbHNlIHJldHVybiBNSURETEVfVk9ST05PSV9SRUdJT047XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNBVCB7XHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYlBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYVBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYlBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zIHdpbGwgYmUgcHJvamVjdGVkIG9udG8gdGhpcyBheGlzLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHdoaWNoIHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBheGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSwgYW5kIGEgcmVzcG9uc2UgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNTZXBhcmF0aW5nQXhpcyhhUG9zOiBWZWN0b3IsIGJQb3M6IFZlY3RvciwgYVBvaW50czogQXJyYXk8VmVjdG9yPiwgYlBvaW50czogQXJyYXk8VmVjdG9yPiwgYXhpczogVmVjdG9yLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCByYW5nZUEgPSBUX0FSUkFZUy5wb3AoKSE7XHJcbiAgICBjb25zdCByYW5nZUIgPSBUX0FSUkFZUy5wb3AoKSE7XHJcbiAgXHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICBjb25zdCBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcclxuICAgIGNvbnN0IHByb2plY3RlZE9mZnNldCA9IG9mZnNldFYuZG90KGF4aXMpO1xyXG4gIFxyXG4gICAgLy8gUHJvamVjdCB0aGUgcG9seWdvbnMgb250byB0aGUgYXhpcy5cclxuICAgIGZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xyXG4gICAgZmxhdHRlblBvaW50c09uKGJQb2ludHMsIGF4aXMsIHJhbmdlQik7XHJcbiAgXHJcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cclxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgICByYW5nZUJbMV0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG4gIFxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxyXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcbiAgXHJcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG4gIFxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIFRoaXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLiBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gIFxyXG4gICAgICAvLyBBIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBCXHJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcclxuICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXHJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA8IHJhbmdlQlsxXSkge1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICBcclxuICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcclxuICBcclxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYUluQiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXHJcbiAgICAgIGNvbnN0IGFic092ZXJsYXAgPSBNYXRoLmFicyhvdmVybGFwKTtcclxuICBcclxuICAgICAgaWYgKGFic092ZXJsYXAgPCByZXNwb25zZS5vdmVybGFwKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IGFic092ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShheGlzKTtcclxuICBcclxuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIHJlc3BvbnNlLm92ZXJsYXBOLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcbiAgXHJcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAjIyBDb2xsaXNpb24gVGVzdHNcclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGMgVGhlIGNpcmNsZSB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5DaXJjbGUocDogVmVjdG9yLCBjOiBDaXJjbGUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KHApLnN1YihjLnBvcykuc3ViKGMub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCByYWRpdXNTcSA9IGMuciAqIGMucjtcclxuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxyXG4gICAgcmV0dXJuIGRpc3RhbmNlU3EgPD0gcmFkaXVzU3E7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNvbnZleCBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seSBUaGUgcG9seWdvbiB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwb2ludEluUG9seWdvbihwOiBWZWN0b3IsIHBvbHk6IFBvbHlnb24pOiBib29sZWFuIHtcclxuICAgIFRFU1RfUE9JTlQucG9zLmNvcHkocCk7XHJcbiAgICBUX1JFU1BPTlNFLmNsZWFyKCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24oVEVTVF9QT0lOVCwgcG9seSwgVF9SRVNQT05TRSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCkgcmVzdWx0ID0gVF9SRVNQT05TRS5hSW5CO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBhIFRoZSBmaXJzdCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdENpcmNsZUNpcmNsZShhOiBDaXJjbGUsIGI6IENpcmNsZSwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3byBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXHJcbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShiLnBvcykuYWRkKGIub2Zmc2V0KS5zdWIoYS5wb3MpLnN1YihhLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSBhLnIgKyBiLnI7XHJcbiAgICBjb25zdCB0b3RhbFJhZGl1c1NxID0gdG90YWxSYWRpdXMgKiB0b3RhbFJhZGl1cztcclxuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxyXG4gICAgaWYgKGRpc3RhbmNlU3EgPiB0b3RhbFJhZGl1c1NxKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGRpc3RhbmNlU3EpO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBiO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYUluQiA9IGEuciA8PSBiLnIgJiYgZGlzdCA8PSBiLnIgLSBhLnI7XHJcbiAgICAgIHJlc3BvbnNlLmJJbkEgPSBiLnIgPD0gYS5yICYmIGRpc3QgPD0gYS5yIC0gYi5yO1xyXG4gICAgfVxyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uOiBQb2x5Z29uLCBjaXJjbGU6IENpcmNsZSwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2lyY2xlUG9zID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZS5wb3MpLmFkZChjaXJjbGUub2Zmc2V0KS5zdWIocG9seWdvbi5wb3MpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1cyA9IGNpcmNsZS5yO1xyXG4gICAgY29uc3QgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBwb2x5Z29uLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGVkZ2UgPSBUX1ZFQ1RPUlMucG9wKCkhO1xyXG4gICAgY29uc3QgcG9pbnQgPSBUX1ZFQ1RPUlMucG9wKCkhO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcclxuXHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cclxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXHJcbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50IGlzIGJpZ2dlciB0aGFuIHRoZSByYWRpdXMsIHRoZSBwb2x5Z29uIGlzIGRlZmluaXRlbHkgbm90IGZ1bGx5IGluIHRoZSBjaXJjbGUuXHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxyXG4gICAgICBsZXQgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcclxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBSSUdIVF9WT1JPTk9JX1JFR0lPTiBvZiB0aGUgcHJldmlvdXMgZWRnZS5cclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1twcmV2XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXHJcbiAgICAgICAgY29uc3QgcG9pbnQyID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcblxyXG4gICAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIGlmIChyZWdpb24gPT09IFJJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tuZXh0XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXHJcbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xyXG5cclxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSwgY2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cclxuICAgICAgICBjb25zdCBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIGVkZ2UuXHJcbiAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChub3JtYWwpO1xyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICBvdmVybGFwTiA9IG5vcm1hbDtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgb3IgcGFydCBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlLCB0aGUgY2lyY2xlIGlzIG5vdCBmdWxseSBpbnNpZGUgdGhlIHBvbHlnb24uXHJcbiAgICAgICAgICBpZiAoZGlzdCA+PSAwIHx8IG92ZXJsYXAgPCAyICogcmFkaXVzKSByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXHJcbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxyXG4gICAgICBpZiAob3ZlcmxhcE4gJiYgcmVzcG9uc2UgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyhyZXNwb25zZS5vdmVybGFwKSkge1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBvdmVybGFwO1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLmNvcHkob3ZlcmxhcE4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHJlc3BvbnNlLmEgPSBwb2x5Z29uO1xyXG4gICAgICByZXNwb25zZS5iID0gY2lyY2xlO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShyZXNwb25zZS5vdmVybGFwTikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0IHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZ1xyXG4gICAqIGF0IHRoZSBlbmQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdENpcmNsZVBvbHlnb24oY2lyY2xlOiBDaXJjbGUsIHBvbHlnb246IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIC8vIFRlc3QgdGhlIHBvbHlnb24gYWdhaW5zdCB0aGUgY2lyY2xlLlxyXG4gICAgY29uc3QgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb24sIGNpcmNsZSwgcmVzcG9uc2UpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgcmVzcG9uc2UpIHtcclxuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSByZXNwb25zZS5cclxuICAgICAgY29uc3QgYSA9IHJlc3BvbnNlLmE7XHJcbiAgICAgIGNvbnN0IGFJbkIgPSByZXNwb25zZS5hSW5CO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5yZXZlcnNlKCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gcmVzcG9uc2UuYjtcclxuICAgICAgcmVzcG9uc2UuYiA9IGE7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gcmVzcG9uc2UuYkluQTtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGFJbkI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBhIFRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uUG9seWdvbihhOiBQb2x5Z29uLCBiOiBQb2x5Z29uLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBhUG9pbnRzID0gYS5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGJQb2ludHMgPSBiLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBiTGVuID0gYlBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcclxuICAgICAgaWYgKFNBVC5pc1NlcGFyYXRpbmdBeGlzKGEucG9zLCBiLnBvcywgYVBvaW50cywgYlBvaW50cywgYS5ub3JtYWxzW2ldLCByZXNwb25zZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBiLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cclxuICAgIC8vIGFuZCB3ZSd2ZSBhbHJlYWR5IGNhbGN1bGF0ZWQgdGhlIHNtYWxsZXN0IG92ZXJsYXAgKGluIGlzU2VwYXJhdGluZ0F4aXMpLiBcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBiO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShyZXNwb25zZS5vdmVybGFwTikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqICMjIFZlY3RvclxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXHJcbiAqIFxyXG4gKiBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZiBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgXHJcbiAqIGl0IHdpbGwgYmUgc2V0IHRvIGAwYC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIFZlY3Rvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY29weShvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCA9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IFZlY3RvciB3aXRoIHRoZSBzYW1lIGNvb3JkaW5hdGVzIGFzIHRoZSBvbmUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gVGhlIG5ldyBjbG9uZWQgVmVjdG9yLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbG9uZSgpOiBWZWN0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHRoaXMgVmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLlxyXG4gICAqIFxyXG4gICAqIEVmZmVjdGl2ZWx5IHRoaXMgcm90YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwZXJwKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG5cclxuICAgIHRoaXMueCA9IHRoaXMueTtcclxuICAgIHRoaXMueSA9IC14O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlIHRoaXMgVmVjdG9yIChjb3VudGVyLWNsb2Nrd2lzZSkgYnkgdGhlIHNwZWNpZmllZCBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgdGhpcy55ID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXZlcnNlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJldmVyc2UoKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCA9IC10aGlzLng7XHJcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm9ybWFsaXplIHRoaXMgdmVjdG9yIChtYWtlIGl0IGhhdmUgYSBsZW5ndGggb2YgYDFgKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBub3JtYWxpemUoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGQgPSB0aGlzLmxlbigpO1xyXG5cclxuICAgIGlmIChkID4gMCkge1xyXG4gICAgICB0aGlzLnggPSB0aGlzLnggLyBkO1xyXG4gICAgICB0aGlzLnkgPSB0aGlzLnkgLyBkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFub3RoZXIgVmVjdG9yIHRvIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGFkZChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCArPSBvdGhlci54O1xyXG4gICAgdGhpcy55ICs9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvciBmcm9tIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHN1YihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCAtPSBvdGhlci54O1xyXG4gICAgdGhpcy55IC09IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY2FsZSB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBBbiBpbmRlcGVuZGVudCBzY2FsaW5nIGZhY3RvciBjYW4gYmUgcHJvdmlkZWQgZm9yIGVhY2ggYXhpcywgb3IgYSBzaW5nbGUgc2NhbGluZyBmYWN0b3Igd2lsbCBzY2FsZVxyXG4gICAqIGJvdGggYHhgIGFuZCBgeWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3ldIFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeSBkaXJlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2NhbGUoeDogbnVtYmVyLCB5PzogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCAqPSB4O1xyXG4gICAgdGhpcy55ICo9IHR5cGVvZiB5ICE9ICd1bmRlZmluZWQnID8geSA6IHg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHByb2plY3Qob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5sZW4yKCk7XHJcblxyXG4gICAgdGhpcy54ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYSBWZWN0b3Igb2YgdW5pdCBsZW5ndGguXHJcbiAgICogXHJcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB1bml0IHZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdE4ob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcik7XHJcblxyXG4gICAgdGhpcy54ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJlZmxlY3QoYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdChheGlzKS5zY2FsZSgyKTtcclxuXHJcbiAgICB0aGlzLnggLT0geDtcclxuICAgIHRoaXMueSAtPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHJlZmxlY3RgIHdoZW4gZGVhbGluZyB3aXRoIGFuIGF4aXMgdGhhdCBpcyBhIHVuaXQgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJlZmxlY3ROKGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgY29uc3QgeSA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgVmVjdG9yIGFuZCBhbm90aGVyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIGRvdCB0aGlzIG9uZSBhZ2FpbnN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgZG90IHByb2R1Y3QuXHJcbiAgICovXHJcbiAgcHVibGljIGRvdChvdGhlcjogVmVjdG9yKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBzcXVhcmVkIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuMigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBsZW5ndGguXHJcbiAgICovXHJcbiAgcHVibGljIGxlbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuc2VjdXJlVVVJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICd4eHh4LXh4eHgteHh4LXh4eHgnLnJlcGxhY2UoL1t4XS9nLCAoYykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTsgIFxyXG4gICAgICAgIHJldHVybiByLnRvU3RyaW5nKDE2KTsgIFxyXG4gICAgfSk7XHJcbn0iLCJpbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY0xldmVsIHtcclxuICAgIHB1YmxpYyBvYmplY3RzOiBBcnJheTxCYXNpY09iamVjdD4gPSBbXTtcclxuICAgIHByb3RlY3RlZCByZW1vdmVRdWV1ZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMucmVtb3ZlUXVldWUubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbb10uaWQgPT0gdGhpcy5yZW1vdmVRdWV1ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tvXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShvLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbmRlcmluZ1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5kcmF3KGN0eCwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZS5ERUJVRykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdDb2xsaXNpb25MaW5lcyhjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlT2JqZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnB1c2goaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1JlbW92ZWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVF1ZXVlLmluZGV4T2YoaWQpICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0NvbGxpc2lvbkxpbmVzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludHM6IFZlY3RvcltdID0gdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9pbnRzO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgPSAwOyBwIDwgcG9pbnRzLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocCArIDEgPT0gcG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbcCArIDFdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzW3AgKyAxXS55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vYmplY3RzW2ldLmNvbGxpc2lvbiA/ICcjZmYwMDAwJyA6ICcjMDAwMGZmJztcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlKHRoaXMub2JqZWN0cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbMF0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaW5zdGFuY2VGYWJyaWMoKTogQmFzaWNMZXZlbDtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vQmFzaWNMZXZlbCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvVGlsZU9iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RMZXZlbCBleHRlbmRzIEJhc2ljTGV2ZWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2JlZ2lucy5vZ2dcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFBsYXllck9iamVjdCgzMiwgNTEyKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJncm91bmQwXCIsIDAsIDE4LCAyNSwgMSwgW1wiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDBcIiwgOCwgMTQsIDEsIDQsIFtcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIl0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcIndhbGwxXCIsIDksIDEyLCAxLCA2LCBbXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCJdKSk7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMFwiLCAzMjAsIDQxNiwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMVwiLCAzMjAsIDM4NCwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMlwiLCAyODgsIDM1MiwgMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW5jZUZhYnJpYygpOiBCYXNpY0xldmVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3RMZXZlbCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBwb2x5Z29uOiBQb2x5Z29uO1xyXG4gICAgcHVibGljIGNvbGxpc2lvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgaWYgKHcgPT0gMCAmJiBoID09IDApIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IoMCwgaCksXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IodywgMClcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIGxldCBiQ29sbDogYm9vbGVhbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwgJiYgYkNvbGwgJiYgdGhpcy5jb2xsaXNpb24pIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7fVxyXG59IiwiaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgdywgaCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSEuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UhLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLmltYWdlIS5oZWlnaHQgPSBoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCB0aGlzLmltYWdlLndpZHRoLCB0aGlzLmltYWdlLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbWFnZT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaW1hZ2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZU9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwclNwaWtlLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMSwgMTYpLCBuZXcgVmVjdG9yKDMxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMSwgMSksIG5ldyBWZWN0b3IoMTYsIDMxKSwgbmV3IFZlY3RvcigzMSwgMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDE2KVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxNiwgMSksIG5ldyBWZWN0b3IoMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAzMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHtcclxuICAgICAgICAgICAgKG9iaiBhcyBQbGF5ZXJPYmplY3QpLmRpZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmRpcmVjdGlvbiAqIDMyLCAwLCAzMiwgMzIsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAzMiwgMzIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEltYWdlT2JqZWN0IGZyb20gXCIuL0ltYWdlT2JqZWN0XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGVPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgb3RoZXJJbWFnZXM6IEhUTUxJbWFnZUVsZW1lbnRbXTtcclxuICAgIHB1YmxpYyB0b3RhbFc6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0b3RhbEg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBvcmRlcjogbnVtYmVyW10gPSBuZXcgQXJyYXkoMCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBzb3VyY2VzOiBzdHJpbmdbXSwgb3JkZXI/OiBudW1iZXJbXSkge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4ICogMzIsIHkgKiAzMiwgdyAqIDMyLCBoICogMzIsIHNvdXJjZXMuc2hpZnQoKSEpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UhLndpZHRoID0gMzI7XHJcbiAgICAgICAgdGhpcy5pbWFnZSEuaGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgdGhpcy50b3RhbFcgPSB3O1xyXG4gICAgICAgIHRoaXMudG90YWxIID0gaDtcclxuICAgICAgICB0aGlzLm90aGVySW1hZ2VzID0gc291cmNlcy5tYXAoc3JjID0+IHtcclxuICAgICAgICAgICAgbGV0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgzMiwgMzIpO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3JkZXIgIT09ICd1bmRlZmluZWQnKSB0aGlzLm9yZGVyID0gb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMzIsIDMyKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMudG90YWxXICogdGhpcy50b3RhbEg7IGkrKykge1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGkgPCB0aGlzLm9yZGVyLmxlbmd0aCA/IHRoaXMub3RoZXJJbWFnZXNbdGhpcy5vcmRlcltpXV0gOiB0aGlzLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy54ICsgKGkgJSB0aGlzLnRvdGFsVykgKiAzMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgTWF0aC5mbG9vcihpIC8gdGhpcy50b3RhbFcpICogMzIsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB3aGlsZSh0aGlzLm90aGVySW1hZ2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJJbWFnZXMuc2hpZnQoKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvb2RQYXJ0aWNsZSBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdHVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDIsIDIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJsb29kLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R1Y2spIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnN0dWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnR5cGUgKiAzLCAwLCAzLCA0LCB0aGlzLnBvbHlnb24ucG9zLnggLSAxLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCAzLCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldE9iamVjdCBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHByb3RlY3RlZCBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggLSA1LCB5IC0gMSwgMTAsIDIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJ1bGxldC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5kaXJlY3Rpb24gKiA3NTAgKiBkZWx0YSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZyYW1lVGltZSA+PSAwLjIwKSB0aGlzLmZyYW1lVGltZSAtPSAwLjIwO1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWUgLyAwLjEwKSAqIDQsIDAsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDMsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDQsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEltYWdlT2JqZWN0IGZyb20gXCIuLi9JbWFnZU9iamVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWF0aE1lc3NhZ2UgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImRlYXRoX21lc3NhZ2VcIiwgNDAwIC0gMzUwLCAzMDQgLSA4MiwgNzAwLCAxNjQsIFwiYXNzZXRzL3RleHR1cmVzL3VpL3NwckdhbWVPdmVyLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaWJQYXJ0aWNsZSBleHRlbmRzIEltYWdlT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB0eXBlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJvZHlWYXJpYW50OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgMDogYm9keSxcclxuICAgICAqIHR5cGUgMTogYm9keSBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDI6IGhlYWQsXHJcbiAgICAgKiB0eXBlIDM6IGhlYWQgc3RvbmVkLFxyXG4gICAgICogdHlwZSA0OiBhcm0sXHJcbiAgICAgKiB0eXBlIDU6IGFybSBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDY6IGZlZXQsXHJcbiAgICAgKiB0eXBlIDc6IGZlZXQgc3RvbmVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCB0eXBlOiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgOCwgOCwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByR2licy5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5keCA9IGR4O1xyXG4gICAgICAgIHRoaXMuZHkgPSBkeTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAwIHx8IHRoaXMudHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keVZhcmlhbnQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBNYXRoLm1pbihkZWx0YSwgMC4zKTtcclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4ID4gMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGhpc0FBQkI6IFBvbHlnb24gPSB0aGlzLnBvbHlnb24uZ2V0QUFCQigpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqdEFBQkI6IFBvbHlnb24gPSBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNBQUJCLnBvcy55ICsgdGhpc0FBQkIucG9pbnRzWzJdLnkgPD0gb2JqdEFBQkIucG9zLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpc0FBQkIucG9zLnkgPj0gb2JqdEFBQkIucG9zLnkgKyBvYmp0QUFCQi5wb2ludHNbMl0ueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR5ICo9IC0wLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHggKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0IHx8IG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmJvZHlWYXJpYW50ICogMiwgMCwgMiwgOSwgdGhpcy5wb2x5Z29uLnBvcy54ICsgNCwgdGhpcy5wb2x5Z29uLnBvcy55LCAyLCA5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMTgsIDEwLCAxNiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDEwLCAxNik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAxMCwgMTgsIDEwLCAxNiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDEwLCAxNik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDI4LCAxOCwgOCwgOCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDgsIDgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMzYsIDE4LCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAyLCB0aGlzLnBvbHlnb24ucG9zLnkgKyA0LCA0LCA0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBJbWFnZU9iamVjdCBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQgfSBmcm9tICcuLi8uLi9VdGlscyc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCBCbG9vZFBhcnRpY2xlIGZyb20gJy4vQmxvb2RQYXJ0aWNsZSc7XHJcbmltcG9ydCBHaWJQYXJ0aWNsZSBmcm9tICcuL0dpYlBhcnRpY2xlJztcclxuaW1wb3J0IERlYXRoTWVzc2FnZSBmcm9tICcuL0RlYXRoTWVzc2FnZSc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlbG9jaXR5OiBudW1iZXIgPSAxNzU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXZpdHk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgIHB1YmxpYyBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJQbGF5ZXIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcig5LCAxMSksIG5ldyBWZWN0b3IoOSwgMzIpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDIzLCAzMiksIG5ldyBWZWN0b3IoMjMsIDExKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRJZDogc3RyaW5nID0gXCJidWxsZXRcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCdWxsZXRPYmplY3QodGhpcy5wb2x5Z29uLnBvcy54ICsgMTYgKyAxMCAqIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RLZXlUaW1lKys7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lLmxldmVsLmlzUmVtb3ZlZCh0aGlzLmlkKSkgcmV0dXJuO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIGxldCBjZW50ZXI6IFZlY3RvciA9IHRoaXMucG9seWdvbi5nZXRDZW50cm9pZCgpLmFkZCh0aGlzLnBvbHlnb24ucG9zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyODsgaSsrKSB7XHJcbiAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBCbG9vZFBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogNiwgTWF0aC5zaW4oTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYmxvb2RcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgKGkgPiAzID8gMiA6IDEpOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBHaWJQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCwgTWF0aC5zaW4oTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCBcImdpYlwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvZ2FtZW92ZXIub2dnXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgRGVhdGhNZXNzYWdlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuNDApIHRoaXMuZnJhbWVUaW1lIC09IDAuNDA7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBmcmFtZTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgLy8gSnVtcGluZ1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjAyKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDY0LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjA0KSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDMyLCA2NCwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAoZnJhbWUgJSAyKSAqIDMyICsgNjQsIDY0LCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAoZnJhbWUgJSAyKSAqIDMyLCA5NiwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBmcmFtZSAqIDMyLCAzMiwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElkbGVcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBmcmFtZSAqIDMyLCAwLCAzMiwgMzIsIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyohXHJcbiogSSBXYW5uYSBCZSBUaGUgR3V5OiBUaGUgTW92aWU6IFRoZSBHYW1lXHJcbiogVHlwZVNjcmlwdCByZW1ha2UgbWFkZSBieSBQR2dhbWVyMiAoYWthIFNvbm9QRykuXHJcbiogWW91IGNhbiBmaW5kIHRoZSBzb3VyY2UgY29kZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vUEdnYW1lcjIvSVdCVEcudHNcclxuKiBPcmlnaW5hbCBnYW1lIG1hZGUgYnkgS2F5aW46IGh0dHBzOi8va2F5aW4ubW9lL2l3YnRnL1xyXG4qL1xyXG5cclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5cclxuZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICBHYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcbn1cclxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcblxyXG5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBHYW1lLmtleU1hcC5zZXQoZS5rZXkubGVuZ3RoID09IDEgPyBlLmtleS50b0xvd2VyQ2FzZSgpIDogZS5rZXksIHRydWUpO1xyXG4gICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4KCk7XHJcbn07XHJcbm9ua2V5dXAgPSBmdW5jdGlvbihlKSB7IEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgZmFsc2UpOyB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==