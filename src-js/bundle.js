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
        if (audio !== undefined) {
            audio.play();
            return audio;
        }
        if (src === undefined)
            audio = new Audio();
        else
            audio = new Audio(src);
        audio.loop = loop;
        audio.volume = volume;
        AudioManager.audioMap.set(key, audio);
        audio.oncanplay = function (e) {
            audio.play().catch(function (err) {
                console.warn(err);
                audio.setAttribute('muted', '');
                audio.muted = true;
            });
            audio.oncanplay = null;
        };
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
    Game.canvas = document.getElementById("main-canvas");
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
exports.bufferDrawImage = bufferDrawImage;
function randomUnsecureUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        return r.toString(16);
    });
}
var bufferCanvas = document.getElementById("buffer-canvas");
var bufferCtx = (function () {
    var ctx = bufferCanvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    return ctx;
})();
function bufferDrawImage(image, sx, sy, sw, sh) {
    bufferCanvas.width = sw;
    bufferCanvas.height = sh;
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    bufferCtx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    return bufferCanvas;
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
                ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, 0, 64, 32, 32), 0, 0, 32, 32);
            }
            else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
                ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, 32, 64, 32, 32), 0, 0, 32, 32);
            }
            else {
                ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, (frame % 2) * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
            }
        }
        else if (!this.onGround) {
            ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, (frame % 2) * 32, 96, 32, 32), 0, 0, 32, 32);
        }
        else if (this.dx != 0) {
            ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, frame * 32, 32, 32, 32), 0, 0, 32, 32);
        }
        else {
            ctx.drawImage((0, Utils_1.bufferDrawImage)(this.image, frame * 32, 0, 32, 32), 0, 0, 32, 32);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRixPQUFPLEdBQUcsVUFBUyxDQUFDLElBQUksY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0F1ZGlvTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQm94LnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL0Jhc2ljTGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9UZXN0TGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvQmFzaWNPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvSW1hZ2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvU3Bpa2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvVGlsZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvQmxvb2RQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvQnVsbGV0T2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9EZWF0aE1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0dpYlBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvTWFwOiBNYXA8c3RyaW5nLCBIVE1MQXVkaW9FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXkoa2V5OiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCBsb29wOiBib29sZWFuID0gZmFsc2UsIHZvbHVtZTogbnVtYmVyID0gMS4wKTogSFRNTEF1ZGlvRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3JjID09PSB1bmRlZmluZWQpIGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICAgICAgZWxzZSBhdWRpbyA9IG5ldyBBdWRpbyhzcmMpO1xyXG4gICAgICAgIGF1ZGlvLmxvb3AgPSBsb29wO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuc2V0KGtleSwgYXVkaW8pO1xyXG4gICAgICAgIGF1ZGlvLm9uY2FucGxheSA9IGUgPT4ge1xyXG4gICAgICAgICAgICBhdWRpbyEucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvIS5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8hLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF1ZGlvIS5vbmNhbnBsYXkgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXVkaW87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5TXVzaWMoc3JjOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSB0cnVlKTogSFRNTEF1ZGlvRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChcIl9tdXNpY1wiKTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCAmJiAhYXVkaW8uc3JjLmVuZHNXaXRoKHNyYykpIHtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnJlbGVhc2UoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIucGxheShcIl9tdXNpY1wiLCBzcmMsIGxvb3AsIDAuNzUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGF1c2Uoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgfCB1bmRlZmluZWQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbGVhc2Uoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLnBhdXNlKGtleSkpIHtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGF1dG9QbGF5Rml4ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXV0b1BsYXlGaXgoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJUcnlpbmcgdG8gZml4IGF1dG9wbGF5Li4uXCIpO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5mb3JFYWNoKCh2YWwsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5tdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5yZW1vdmVBdHRyaWJ1dGUoJ211dGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcIl9tdXNpY1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5wbGF5KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCkgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNpemVYOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHNpemVZOiBudW1iZXIgPSAxO1xyXG59IiwiaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSAnLi9sZXZlbHMvQmFzaWNMZXZlbCc7XHJcbmltcG9ydCBUZXN0TGV2ZWwgZnJvbSAnLi9sZXZlbHMvVGVzdExldmVsJztcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gICAgcHVibGljIHN0YXRpYyBERUJVRzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbGFzdFRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWw6IEJhc2ljTGV2ZWwgPSBuZXcgVGVzdExldmVsKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICAvLyBSZXNpemUga2VlcGluZyBhc3BlY3QgcmF0aW9cclxuICAgICAgICBsZXQgcGFnZUFzcGVjdFJhdGlvID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZSA9IE1hdGguZmxvb3IoMjUgLyAxOSA8IHBhZ2VBc3BlY3RSYXRpbyA/IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC8gMTkgOiBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMjUpO1xyXG5cdFx0aWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc2NyZXRlLXNjYWxlLWNoZWNrYm94XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXHJcblx0XHRcdHNjYWxlID0gTWF0aC5tYXgoMSA8PCAoMzEgLSBNYXRoLmNsejMyKHNjYWxlKSksIDEpO1x0Ly8gU2V0IHNjYWxlIHRvIGEgcG93ZXIgb2YgdHdvXHJcbiAgICAgICAgR2FtZS5jYW52YXMud2lkdGggPSBzY2FsZSAqIDI1O1xyXG4gICAgICAgIEdhbWUuY2FudmFzLmhlaWdodCA9IHNjYWxlICogMTk7XHJcbiAgICAgICAgLy8gR2V0IGNvbnRleHQgYW5kIGNsZWFyXHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XHJcbiAgICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgR2FtZS5jYW52YXMud2lkdGgsIEdhbWUuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbWVyYS54LCBHYW1lLmNhbWVyYS55KTtcclxuICAgICAgICBjdHgucm90YXRlKEdhbWUuY2FtZXJhLmFuZ2xlKTtcclxuICAgICAgICBjdHguc2NhbGUoR2FtZS5jYW1lcmEuc2l6ZVggKiAoR2FtZS5jYW52YXMud2lkdGggLyA4MDApLCBHYW1lLmNhbWVyYS5zaXplWSAqIChHYW1lLmNhbnZhcy5oZWlnaHQgLyA2MDgpKTtcclxuICAgICAgICBHYW1lLmxldmVsLnVwZGF0ZShjdHgsICh0aW1lc3RhbXAgLSBHYW1lLmxhc3RUaW1lc3RhbXApIC8gMTAwMCk7XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICAgICAgLy8gUmVsb2FkIGxldmVsXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdyJykpIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmlzUHVzaGluZ1JlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5sZXZlbC5pbnN0YW5jZUZhYnJpYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgR2FtZS5pc1B1c2hpbmdSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBHYW1lLmxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0J1dHRvbkRvd24oa2V5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGtleU5hbWUubGVuZ3RoID09IDEpIGtleU5hbWUgPSBrZXlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUua2V5TWFwLmdldChrZXlOYW1lKSA/PyBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiAjIyBCb3hcclxuICogXHJcbiAqIFJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCwgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgdzogbnVtYmVyO1xyXG4gIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgQm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXHJcbiAgICogYmUgc2V0IHRvIGAwYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1uZXcgVmVjdG9yKCldIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MF0gVGhlIHdpZHRoIG9mIHRoZSBCb3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdIFRoZSBoZWlnaHQgb2YgdGhlIEJveC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHcgPSAwLCBoID0gMCkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLncgPSB3O1xyXG4gICAgdGhpcy5oID0gaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBQb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIEJveC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBCb3guXHJcbiAgICovXHJcbiAgcHVibGljIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zO1xyXG4gICAgY29uc3QgdyA9IHRoaXMudztcclxuICAgIGNvbnN0IGggPSB0aGlzLmg7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zLngsIHBvcy55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IoMCwgaClcclxuICAgIF0pO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuXHJcbi8qKlxyXG4gKiAjIyBQb2x5Z29uXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpLlxyXG4gKiBcclxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcclxuICogc2V0dGVycy4gT3RoZXJ3aXNlIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgdXBkYXRlZCBjb3JyZWN0bHkuXHJcbiAqIFxyXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIG9mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBlZGdlczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZCBieSB2ZWN0b3JzIFxyXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9VmVjdG9yXSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBbcG9pbnRzPVtdXSBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgY29uc3QgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzLnBvaW50cyB8fCB0aGlzLnBvaW50cy5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgbGV0IGk7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XHJcbiAgICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XHJcblxyXG4gICAgICAgIGlmIChwMSAhPT0gcDIgJiYgcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55KSB7XHJcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjUG9pbnRzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZWNhbGMoKTogUG9seWdvbiB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjYWxjUG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcblxyXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcclxuICAgICAgY2FsY1BvaW50LnkgKz0gb2Zmc2V0Lnk7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGUgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xyXG5cclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBBQUJCLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgQUFCQi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICBsZXQgeE1pbiA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW4gPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heCA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNYXggPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludC54IDwgeE1pbikgeE1pbiA9IHBvaW50Lng7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnggPiB4TWF4KSB4TWF4ID0gcG9pbnQueDtcclxuXHJcbiAgICAgIGlmIChwb2ludC55IDwgeU1pbikgeU1pbiA9IHBvaW50Lnk7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnkgPiB5TWF4KSB5TWF4ID0gcG9pbnQueTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLnBvcy5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldENlbnRyb2lkKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBjeCA9IDA7XHJcbiAgICBsZXQgY3kgPSAwO1xyXG4gICAgbGV0IGFyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XHJcblxyXG4gICAgICBjb25zdCBhID0gcDEueCAqIHAyLnkgLSBwMi54ICogcDEueTtcclxuXHJcbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xyXG4gICAgICBjeSArPSAocDEueSArIHAyLnkpICogYTtcclxuICAgICAgYXIgKz0gYTtcclxuICAgIH1cclxuXHJcbiAgICBhciA9IGFyICogMzsgLy8gd2Ugd2FudCAxIC8gNiB0aGUgYXJlYSBhbmQgd2UgY3VycmVudGx5IGhhdmUgMiphcmVhXHJcbiAgICBjeCA9IGN4IC8gYXI7XHJcbiAgICBjeSA9IGN5IC8gYXI7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogIyMgUmVzcG9uc2VcclxuICogXHJcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcclxuICBwdWJsaWMgYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgYjogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIG92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGJJbkE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBvdmVybGFwOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXIoKTogUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iLCIvKiFcclxuKiBzYXQtanMgKG9yIFNBVC5qcykgbWFkZSBieSBKaW0gUmllY2tlbiBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxyXG4qIENoYW5nZXMgbWFkZSBieSBtZTogQnVnIGZpeGVzIGFuZCBjb252ZXJzaW9uIHRvIFR5cGVTY3JpcHRcclxuKi9cclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcclxuXHJcbi8qKlxyXG4gKiAjIyBPYmplY3QgUG9vbHNcclxuICovXHJcblxyXG4vKipcclxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICogXHJcbiAqIEB0eXBlIHtBcnJheTxWZWN0b3I+fVxyXG4gKi9cclxuIGNvbnN0IFRfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gXHJcbiAvKipcclxuICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAqIFxyXG4gICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICovXHJcbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBUX0FSUkFZUy5wdXNoKFtdKTtcclxuIFxyXG5cclxuLyoqXHJcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAqL1xyXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4vKipcclxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UG9seWdvbn1cclxuICovXHJcbmNvbnN0IFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbi8qKlxyXG4gKiAjIyBDb25zdGFudHMgZm9yIFZvcm9ub2kgcmVnaW9ucy5cclxuICovXHJcbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuY29uc3QgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuLyoqXHJcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XHJcblxyXG4gICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0WzBdID0gbWluO1xyXG4gIHJlc3VsdFsxXSA9IG1heDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICogXHJcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICogXHJcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpITtcclxuICBcclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcclxuICAgIGNvbnN0IG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICBcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG4gIFxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlLm92ZXJsYXApIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG4gIFxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJbkNpcmNsZShwOiBWZWN0b3IsIGM6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkocCkuc3ViKGMucG9zKS5zdWIoYy5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c1NxID0gYy5yICogYy5yO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5IFRoZSBwb2x5Z29uIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5Qb2x5Z29uKHA6IFZlY3RvciwgcG9seTogUG9seWdvbik6IGJvb2xlYW4ge1xyXG4gICAgVEVTVF9QT0lOVC5wb3MuY29weShwKTtcclxuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uUG9seWdvbihURVNUX1BPSU5ULCBwb2x5LCBUX1JFU1BPTlNFKTtcclxuXHJcbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFLmFJbkI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlQ2lyY2xlKGE6IENpcmNsZSwgYjogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvcykuc3ViKGEub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbFJhZGl1cyA9IGEuciArIGIucjtcclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXkgaW50ZXJzZWN0LiAgSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gYS5yIDw9IGIuciAmJiBkaXN0IDw9IGIuciAtIGEucjtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGIuciA8PSBhLnIgJiYgZGlzdCA8PSBhLnIgLSBiLnI7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlLnBvcykuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvcyk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG5cclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gICAgICBsZXQgb3ZlcmxhcE4gPSBudWxsO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxyXG4gICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tpXSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIGxldCByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxyXG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcclxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cclxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jvbm9pIHJlZ2lvbikuXHJcbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IG92ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IHBvbHlnb247XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXHJcbiAgICogYXQgdGhlIGVuZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICBjb25zdCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcclxuICAgICAgY29uc3QgYUluQiA9IHJlc3BvbnNlLmFJbkI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xyXG4gICAgICByZXNwb25zZS5iID0gYTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0iLCIvKipcclxuICogIyMgVmVjdG9yXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuICogXHJcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcclxuICogaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgIHRoaXMueSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy55O1xyXG4gICAgdGhpcy55ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLnkgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgIHRoaXMueSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlXHJcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICo9IHg7XHJcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBwdWJsaWMgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iLCIvKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIFVVSUQuIFRoZSBJRCBtaWdodCBub3QgYmUgdW5pcXVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuc2VjdXJlVVVJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICd4eHh4LXh4eHgteHh4LXh4eHgnLnJlcGxhY2UoL1t4XS9nLCAoYykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTsgIFxyXG4gICAgICAgIHJldHVybiByLnRvU3RyaW5nKDE2KTsgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGJ1ZmZlckNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1ZmZlci1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmNvbnN0IGJ1ZmZlckN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKCgpID0+IHtcclxuICAgIGxldCBjdHggPSBidWZmZXJDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcclxuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBjdHg7XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogRHJhd3MgYW4gaW1hZ2UgdG8gdGhlIChjbGVhbmVkKSBidWZmZXIgY2FudmFzIGFuZCByZXR1cm5zIHRoZSBjYW52YXMgaXRzZWxmLiBDYW4gYmUgdXNlZCB0byBkcmF3IGEgcGFydCBvZiBhbiBpbWFnZSB0byB0aGUgbWFpbiBjYW52YXMgd2l0aG91dCB0cmFuc2Zvcm0tY2F1c2VkIGFydGlmYWN0cy5cclxuICogQHBhcmFtIGltYWdlIGFuIGVsZW1lbnQgdG8gZHJhdyBpbnRvIHRoZSBjb250ZXh0LlxyXG4gKiBAcGFyYW0gc3ggeC1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3kgeS1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3cgd2lkdGggb2YgdGhlIHNvdXJjZSBpbWFnZSByZWdpb24gdG8gZHJhd1xyXG4gKiBAcGFyYW0gc2ggaGVpZ2h0IG9mIHRoZSBzb3VyY2UgaW1hZ2UgcmVnaW9uIHRvIGRyYXdcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyRHJhd0ltYWdlKGltYWdlOiBDYW52YXNJbWFnZVNvdXJjZSwgc3g6IG51bWJlciwgc3k6IG51bWJlciwgc3c6IG51bWJlciwgc2g6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHtcclxuICAgIGJ1ZmZlckNhbnZhcy53aWR0aCA9IHN3O1xyXG4gICAgYnVmZmVyQ2FudmFzLmhlaWdodCA9IHNoO1xyXG4gICAgYnVmZmVyQ3R4LmNsZWFyUmVjdCgwLCAwLCBidWZmZXJDYW52YXMud2lkdGgsIGJ1ZmZlckNhbnZhcy5oZWlnaHQpO1xyXG4gICAgYnVmZmVyQ3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzdywgc2gsIDAsIDAsIHN3LCBzaCk7XHJcbiAgICByZXR1cm4gYnVmZmVyQ2FudmFzO1xyXG59IiwiaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL29iamVjdHMvQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgb2JqZWN0czogQXJyYXk8QmFzaWNPYmplY3Q+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUXVldWU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLnJlbW92ZVF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW29dLmlkID09IHRoaXMucmVtb3ZlUXVldWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbb10uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UobywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW5kZXJpbmdcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uZHJhdyhjdHgsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWUuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q29sbGlzaW9uTGluZXMoY3R4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU9iamVjdChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5wdXNoKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNSZW1vdmVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVRdWV1ZS5pbmRleE9mKGlkKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdDb2xsaXNpb25MaW5lcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzOiBWZWN0b3JbXSA9IHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvaW50cztcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IHBvaW50cy5sZW5ndGg7IHArKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAgKyAxID09IHBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzW3AgKyAxXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1twICsgMV0ueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMub2JqZWN0c1tpXS5jb2xsaXNpb24gPyAnI2ZmMDAwMCcgOiAnIzAwMDBmZic7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSh0aGlzLm9iamVjdHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzWzBdLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGluc3RhbmNlRmFicmljKCk6IEJhc2ljTGV2ZWw7XHJcbn0iLCJpbXBvcnQgQmFzaWNMZXZlbCBmcm9tICcuL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4uL29iamVjdHMvcGxheWVyL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9vYmplY3RzL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tICcuLi9BdWRpb01hbmFnZXInO1xyXG5pbXBvcnQgVGlsZU9iamVjdCBmcm9tICcuLi9vYmplY3RzL1RpbGVPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TGV2ZWwgZXh0ZW5kcyBCYXNpY0xldmVsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlNdXNpYyhcImFzc2V0cy9tdXNpYy9iZWdpbnMub2dnXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBQbGF5ZXJPYmplY3QoMzIsIDUxMikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3JvdW5kMFwiLCAwLCAxOCwgMjUsIDEsIFtcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIl0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcIndhbGwwXCIsIDgsIDE0LCAxLCA0LCBbXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCJdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ3YWxsMVwiLCA5LCAxMiwgMSwgNiwgW1wiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiXSkpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTBcIiwgMzIwLCA0MTYsIDEpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTFcIiwgMzIwLCAzODQsIDEpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTJcIiwgMjg4LCAzNTIsIDApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zdGFuY2VGYWJyaWMoKTogQmFzaWNMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0TGV2ZWwoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbjtcclxuICAgIHB1YmxpYyBjb2xsaXNpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIGlmICh3ID09IDAgJiYgaCA9PSAwKSB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKDAsIGgpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKHcsIDApXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYkNvbGw6IGJvb2xlYW4gPSBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsICYmIGJDb2xsICYmIHRoaXMuY29sbGlzaW9uKSB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge31cclxufSIsImltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuL0Jhc2ljT2JqZWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWQgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNyYzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UhLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLmltYWdlIS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5pbWFnZSEuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgdGhpcy5pbWFnZS53aWR0aCwgdGhpcy5pbWFnZS5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW1hZ2U/LnJlbW92ZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmltYWdlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2VPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJTcGlrZS5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDE2KSwgbmV3IFZlY3RvcigzMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDE2LCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMSwgMSksIG5ldyBWZWN0b3IoMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxNilcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMTYsIDEpLCBuZXcgVmVjdG9yKDEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMzEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIChvYmogYXMgUGxheWVyT2JqZWN0KS5kaWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5kaXJlY3Rpb24gKiAzMiwgMCwgMzIsIDMyLCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMzIsIDMyKTtcclxuICAgIH1cclxufSIsImltcG9ydCBJbWFnZU9iamVjdCBmcm9tIFwiLi9JbWFnZU9iamVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHVibGljIG90aGVySW1hZ2VzOiBIVE1MSW1hZ2VFbGVtZW50W107XHJcbiAgICBwdWJsaWMgdG90YWxXOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdG90YWxIOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgb3JkZXI6IG51bWJlcltdID0gbmV3IEFycmF5KDApO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc291cmNlczogc3RyaW5nW10sIG9yZGVyPzogbnVtYmVyW10pIHtcclxuICAgICAgICBzdXBlcihpZCwgeCAqIDMyLCB5ICogMzIsIHcgKiAzMiwgaCAqIDMyLCBzb3VyY2VzLnNoaWZ0KCkhKTtcclxuICAgICAgICB0aGlzLmltYWdlIS53aWR0aCA9IDMyO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UhLmhlaWdodCA9IDMyO1xyXG4gICAgICAgIHRoaXMudG90YWxXID0gdztcclxuICAgICAgICB0aGlzLnRvdGFsSCA9IGg7XHJcbiAgICAgICAgdGhpcy5vdGhlckltYWdlcyA9IHNvdXJjZXMubWFwKHNyYyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoMzIsIDMyKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgcmV0dXJuIGltZztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodHlwZW9mIG9yZGVyICE9PSAndW5kZWZpbmVkJykgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDMyLCAzMik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnRvdGFsVyAqIHRoaXMudG90YWxIOyBpKyspIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpIDwgdGhpcy5vcmRlci5sZW5ndGggPyB0aGlzLm90aGVySW1hZ2VzW3RoaXMub3JkZXJbaV1dIDogdGhpcy5pbWFnZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3MueCArIChpICUgdGhpcy50b3RhbFcpICogMzIsIHRoaXMucG9seWdvbi5wb3MueSArIE1hdGguZmxvb3IoaSAvIHRoaXMudG90YWxXKSAqIDMyLCAzMiwgMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgd2hpbGUodGhpcy5vdGhlckltYWdlcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVySW1hZ2VzLnNoaWZ0KCk/LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb29kUGFydGljbGUgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3R1Y2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyB0eXBlOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCAyLCAyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJCbG9vZC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5keCA9IGR4O1xyXG4gICAgICAgIHRoaXMuZHkgPSBkeTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0dWNrKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIGRlbHRhO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zdHVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy50eXBlICogMywgMCwgMywgNCwgdGhpcy5wb2x5Z29uLnBvcy54IC0gMSwgdGhpcy5wb2x5Z29uLnBvcy55IC0gMSwgMywgNCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vU3Bpa2VPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgZnJhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4IC0gNSwgeSAtIDEsIDEwLCAyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJCdWxsZXQucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMuZGlyZWN0aW9uICogNzUwICogZGVsdGEsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZSArPSBkZWx0YTtcclxuICAgICAgICB3aGlsZSAodGhpcy5mcmFtZVRpbWUgPj0gMC4yMCkgdGhpcy5mcmFtZVRpbWUgLT0gMC4yMDtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lIC8gMC4xMCkgKiA0LCAwLCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAzLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBJbWFnZU9iamVjdCBmcm9tIFwiLi4vSW1hZ2VPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVhdGhNZXNzYWdlIGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkZWF0aF9tZXNzYWdlXCIsIDQwMCAtIDM1MCwgMzA0IC0gODIsIDcwMCwgMTY0LCBcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2liUGFydGljbGUgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBib2R5VmFyaWFudDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlIDA6IGJvZHksXHJcbiAgICAgKiB0eXBlIDE6IGJvZHkgc3RvbmVkLFxyXG4gICAgICogdHlwZSAyOiBoZWFkLFxyXG4gICAgICogdHlwZSAzOiBoZWFkIHN0b25lZCxcclxuICAgICAqIHR5cGUgNDogYXJtLFxyXG4gICAgICogdHlwZSA1OiBhcm0gc3RvbmVkLFxyXG4gICAgICogdHlwZSA2OiBmZWV0LFxyXG4gICAgICogdHlwZSA3OiBmZWV0IHN0b25lZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgdHlwZTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDgsIDgsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckdpYnMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMCB8fCB0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHlWYXJpYW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogTWF0aC5taW4oZGVsdGEsIDAuMyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRoaXNBQUJCOiBQb2x5Z29uID0gdGhpcy5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9ianRBQUJCOiBQb2x5Z29uID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24uZ2V0QUFCQigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzQUFCQi5wb3MueSArIHRoaXNBQUJCLnBvaW50c1syXS55IDw9IG9ianRBQUJCLnBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXNBQUJCLnBvcy55ID49IG9ianRBQUJCLnBvcy55ICsgb2JqdEFBQkIucG9pbnRzWzJdLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keSAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR4ICo9IC0wLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCB8fCBvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5ib2R5VmFyaWFudCAqIDIsIDAsIDIsIDksIHRoaXMucG9seWdvbi5wb3MueCArIDQsIHRoaXMucG9seWdvbi5wb3MueSwgMiwgOSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmJvZHlWYXJpYW50ICogMiwgOSwgMiwgOSwgdGhpcy5wb2x5Z29uLnBvcy54ICsgNCwgdGhpcy5wb2x5Z29uLnBvcy55LCAyLCA5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMTAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMjAsIDE4LCA4LCA4LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgOCwgOCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDM2LCAxOCwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAzNiwgMjIsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgSW1hZ2VPYmplY3QgZnJvbSAnLi4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgQnVsbGV0T2JqZWN0IGZyb20gJy4vQnVsbGV0T2JqZWN0JztcclxuaW1wb3J0IHsgcmFuZG9tVW5zZWN1cmVVVUlELCBidWZmZXJEcmF3SW1hZ2UgfSBmcm9tICcuLi8uLi9VdGlscyc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCBCbG9vZFBhcnRpY2xlIGZyb20gJy4vQmxvb2RQYXJ0aWNsZSc7XHJcbmltcG9ydCBHaWJQYXJ0aWNsZSBmcm9tICcuL0dpYlBhcnRpY2xlJztcclxuaW1wb3J0IERlYXRoTWVzc2FnZSBmcm9tICcuL0RlYXRoTWVzc2FnZSc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlbG9jaXR5OiBudW1iZXIgPSAxNzU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXZpdHk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgIHB1YmxpYyBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJQbGF5ZXIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcig5LCAxMSksIG5ldyBWZWN0b3IoOSwgMzIpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDIzLCAzMiksIG5ldyBWZWN0b3IoMjMsIDExKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXRJZDogc3RyaW5nID0gXCJidWxsZXRcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBCdWxsZXRPYmplY3QodGhpcy5wb2x5Z29uLnBvcy54ICsgMTYgKyAxMCAqIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RLZXlUaW1lKys7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lLmxldmVsLmlzUmVtb3ZlZCh0aGlzLmlkKSkgcmV0dXJuO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIGxldCBjZW50ZXI6IFZlY3RvciA9IHRoaXMucG9seWdvbi5nZXRDZW50cm9pZCgpLmFkZCh0aGlzLnBvbHlnb24ucG9zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyODsgaSsrKSB7XHJcbiAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBCbG9vZFBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogNiwgTWF0aC5zaW4oTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYmxvb2RcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgKGkgPiAzID8gMiA6IDEpOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBHaWJQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCwgTWF0aC5zaW4oTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCBcImdpYlwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvZ2FtZW92ZXIub2dnXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgRGVhdGhNZXNzYWdlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuNDApIHRoaXMuZnJhbWVUaW1lIC09IDAuNDA7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBmcmFtZTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgLy8gSnVtcGluZ1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjAyKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDQpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDMyLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKHRoaXMuaW1hZ2UsIChmcmFtZSAlIDIpICogMzIgKyA2NCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UodGhpcy5pbWFnZSwgKGZyYW1lICUgMikgKiAzMiwgOTYsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gUnVubmluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZSh0aGlzLmltYWdlLCBmcmFtZSAqIDMyLCAzMiwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJZGxlXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKHRoaXMuaW1hZ2UsIGZyYW1lICogMzIsIDAsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyohXHJcbiogSSBXYW5uYSBCZSBUaGUgR3V5OiBUaGUgTW92aWU6IFRoZSBHYW1lXHJcbiogVHlwZVNjcmlwdCByZW1ha2UgbWFkZSBieSBQR2dhbWVyMiAoYWthIFNvbm9QRykuXHJcbiogWW91IGNhbiBmaW5kIHRoZSBzb3VyY2UgY29kZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vUEdnYW1lcjIvSVdCVEcudHNcclxuKiBPcmlnaW5hbCBnYW1lIG1hZGUgYnkgS2F5aW46IGh0dHBzOi8va2F5aW4ubW9lL2l3YnRnL1xyXG4qL1xyXG5cclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5cclxuZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICBHYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcbn1cclxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcblxyXG5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBHYW1lLmtleU1hcC5zZXQoZS5rZXkubGVuZ3RoID09IDEgPyBlLmtleS50b0xvd2VyQ2FzZSgpIDogZS5rZXksIHRydWUpO1xyXG4gICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4KCk7XHJcbn07XHJcbm9ua2V5dXAgPSBmdW5jdGlvbihlKSB7IEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgZmFsc2UpOyB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==