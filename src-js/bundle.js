/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AudioManager.ts"
/*!*****************************!*\
  !*** ./src/AudioManager.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudioManager)
/* harmony export */ });
const _AudioManager = class _AudioManager {
  static play(key, src, loop = false, volume = 1) {
    let audio = _AudioManager.audioMap.get(key);
    if (audio !== void 0) {
      audio.play();
      return audio;
    }
    if (src === void 0) audio = new Audio();
    else audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    _AudioManager.audioMap.set(key, audio);
    audio.oncanplay = (e) => {
      audio.play().catch((err) => {
        console.warn(err);
        audio.setAttribute("muted", "");
        audio.muted = true;
      });
      audio.oncanplay = null;
    };
    return audio;
  }
  static playMusic(src, loop = true) {
    let audio = _AudioManager.audioMap.get("_music");
    if (audio !== void 0 && !audio.src.endsWith(src)) {
      _AudioManager.release("_music");
    }
    return _AudioManager.play("_music", src, loop, 0.75);
  }
  static pause(key) {
    let audio = _AudioManager.audioMap.get(key);
    if (audio !== void 0) {
      audio.pause();
      return true;
    }
    return false;
  }
  static release(key) {
    var _a;
    if (_AudioManager.pause(key)) {
      (_a = _AudioManager.audioMap.get(key)) == null ? void 0 : _a.remove();
      return _AudioManager.audioMap.delete(key);
    }
    return false;
  }
  static autoPlayFix() {
    if (!_AudioManager.autoPlayFixed) {
      console.info("Trying to fix autoplay...");
      _AudioManager.autoPlayFixed = true;
      _AudioManager.audioMap.forEach((val, key) => {
        if (val.muted) {
          val.removeAttribute("muted");
          val.muted = false;
          if (key == "_music") {
            val.play().catch((err) => {
              if (_AudioManager.autoPlayFixed) console.warn(err);
              _AudioManager.autoPlayFixed = false;
              val.setAttribute("muted", "");
              val.muted = true;
            });
          }
        }
      });
    }
  }
};
_AudioManager.audioMap = /* @__PURE__ */ new Map();
_AudioManager.autoPlayFixed = false;
let AudioManager = _AudioManager;



/***/ },

/***/ "./src/Camera.ts"
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Camera)
/* harmony export */ });
class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.sizeX = 1;
    this.sizeY = 1;
  }
}


/***/ },

/***/ "./src/Game.ts"
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
/* harmony import */ var _levels_SaveSelectMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels/SaveSelectMenu */ "./src/levels/SaveSelectMenu.ts");
/* harmony import */ var _levels_TestLevel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels/TestLevel */ "./src/levels/TestLevel.ts");



const _Game = class _Game {
  static update(timestamp) {
    _Game.DEBUG = _Game.isButtonDown("F2");
    let pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
    let scale = Math.floor(25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25);
    if (document.getElementById("discrete-scale-checkbox").checked)
      scale = Math.max(1 << 31 - Math.clz32(scale), 1);
    _Game.canvas.width = scale * 25;
    _Game.canvas.height = scale * 19;
    let ctx = _Game.canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, _Game.canvas.width, _Game.canvas.height);
    ctx.save();
    ctx.translate(_Game.camera.x, _Game.camera.y);
    ctx.rotate(_Game.camera.angle);
    ctx.scale(_Game.camera.sizeX * (_Game.canvas.width / 800), _Game.camera.sizeY * (_Game.canvas.height / 608));
    _Game.level.update(ctx, (timestamp - _Game.lastTimestamp) / 1e3);
    ctx.restore();
    if (_Game.isButtonDown("r")) {
      if (!_Game.isPushingReload) {
        this.level.dispose();
        this.level = this.level.instantiate();
      }
      _Game.isPushingReload = true;
    } else _Game.isPushingReload = false;
    _Game.lastTimestamp = timestamp;
  }
  static loadSave(save) {
    this.level.dispose();
    this.level = new _levels_TestLevel__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  static isButtonDown(keyName) {
    var _a;
    if (keyName.length == 1) keyName = keyName.toLowerCase();
    return (_a = _Game.keyMap.get(keyName)) != null ? _a : false;
  }
};
_Game.DEBUG = false;
_Game.canvas = document.getElementById("main-canvas");
_Game.lastTimestamp = performance.now();
_Game.level = new _levels_SaveSelectMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
_Game.camera = new _Camera__WEBPACK_IMPORTED_MODULE_0__["default"]();
_Game.keyMap = /* @__PURE__ */ new Map();
_Game.isPushingReload = false;
let Game = _Game;



/***/ },

/***/ "./src/SAT/Box.ts"
/*!************************!*\
  !*** ./src/SAT/Box.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Polygon */ "./src/SAT/Polygon.ts");


class Box {
  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will
   * be set to `0`.
   * 
   * @param {Vector} [pos=new Vector()] A Vector representing the bottom-left of the box(i.e. the smallest x and smallest y value).
   * @param {number} [w=0] The width of the Box.
   * @param {number} [h=0] The height of the Box.
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), w = 0, h = 0) {
    this.pos = pos;
    this.w = w;
    this.h = h;
  }
  /**
   * Returns a Polygon whose edges are the same as this Box.
   * 
   * @returns {Polygon} A new Polygon that represents this Box.
   */
  toPolygon() {
    const pos = this.pos;
    const w = this.w;
    const h = this.h;
    return new _Polygon__WEBPACK_IMPORTED_MODULE_1__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](pos.x, pos.y), [
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, 0),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, h),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, h)
    ]);
  }
}


/***/ },

/***/ "./src/SAT/Polygon.ts"
/*!****************************!*\
  !*** ./src/SAT/Polygon.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");


class Polygon {
  /**
   * Create a new polygon, passing in a position vector, and an array of points (represented by vectors 
   * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
   * 
   * @param {Vector} [pos=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
   * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), points = []) {
    this.angle = 0;
    this.offset = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.points = [];
    this.calcPoints = [];
    this.edges = [];
    this.normals = [];
    this.pos = pos;
    this.setPoints(points);
  }
  /**
   * Set the points of the polygon. Any consecutive duplicate points will be combined.
   * 
   * Note: The points are counter-clockwise *with respect to the coordinate system*. If you directly draw the points on a screen 
   * that has the origin at the top-left corner it will _appear_ visually that the points are being specified clockwise. This is 
   * just because of the inversion of the Y-axis when being displayed.
   * 
   * @param {Array<Vector>} points An array of vectors representing the points in the polygon, in counter-clockwise order.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setPoints(points) {
    const lengthChanged = !this.points || this.points.length !== points.length;
    if (lengthChanged) {
      let i;
      const calcPoints = this.calcPoints = [];
      const edges = this.edges = [];
      const normals = this.normals = [];
      for (i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = i < points.length - 1 ? points[i + 1] : points[0];
        if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
          points.splice(i, 1);
          i -= 1;
          continue;
        }
        calcPoints.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
        edges.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
        normals.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
      }
    }
    this.points = points;
    this._recalc();
    return this;
  }
  /**
   * Set the current rotation angle of the polygon.
   * 
   * @param {number} angle The current rotation angle (in radians).
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setAngle(angle) {
    this.angle = angle;
    this._recalc();
    return this;
  }
  /**
   * Set the current offset to apply to the `points` before applying the `angle` rotation.
   * 
   * @param {Vector} offset The new offset Vector.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setOffset(offset) {
    this.offset = offset;
    this._recalc();
    return this;
  }
  /**
   * Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
   * 
   * Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
   * 
   * @param {number} angle The angle to rotate (in radians).
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  rotate(angle) {
    const points = this.points;
    const len = points.length;
    for (let i = 0; i < len; i++) points[i].rotate(angle);
    this._recalc();
    return this;
  }
  /**
   * Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate system* (i.e. `pos`).
   * 
   * Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
   * 
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  translate(x, y) {
    const points = this.points;
    const len = points.length;
    for (let i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }
    this._recalc();
    return this;
  }
  /**
   * Computes the calculated collision Polygon.
   * 
   * This applies the `angle` and `offset` to the original points then recalculates the edges and normals of the collision Polygon.
   * 
   * @private
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  _recalc() {
    const calcPoints = this.calcPoints;
    const edges = this.edges;
    const normals = this.normals;
    const points = this.points;
    const offset = this.offset;
    const angle = this.angle;
    const len = points.length;
    let i;
    for (i = 0; i < len; i++) {
      const calcPoint = calcPoints[i].copy(points[i]);
      calcPoint.x += offset.x;
      calcPoint.y += offset.y;
      if (angle !== 0) calcPoint.rotate(angle);
    }
    for (i = 0; i < len; i++) {
      const p1 = calcPoints[i];
      const p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
      const e = edges[i].copy(p2).sub(p1);
      normals[i].copy(e).perp().normalize();
    }
    return this;
  }
  /**
   * Compute the axis-aligned bounding box.
   * 
   * Any current state (translations/rotations) will be applied before constructing the AABB.
   * 
   * Note: Returns a _new_ `Polygon` each time you call this.
   * 
   * @returns {Polygon} Returns AABB.
   */
  getAABB() {
    const points = this.calcPoints;
    let xMin = points[0].x;
    let yMin = points[0].y;
    let xMax = points[0].x;
    let yMax = points[0].y;
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      if (point.x < xMin) xMin = point.x;
      else if (point.x > xMax) xMax = point.x;
      if (point.y < yMin) yMin = point.y;
      else if (point.y > yMax) yMax = point.y;
    }
    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"](this.pos.clone().add(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  }
  /**
   * Compute the centroid (geometric center) of the Polygon.
   * 
   * Any current state (translations/rotations) will be applied before computing the centroid.
   * 
   * See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
   * 
   * Note: Returns a _new_ `Vector` each time you call this.
   * 
   * @returns {Vector} Returns a Vector that contains the coordinates of the centroid.
   */
  getCentroid() {
    const points = this.calcPoints;
    const len = points.length;
    let cx = 0;
    let cy = 0;
    let ar = 0;
    for (var i = 0; i < len; i++) {
      const p1 = points[i];
      const p2 = i === len - 1 ? points[0] : points[i + 1];
      const a = p1.x * p2.y - p2.x * p1.y;
      cx += (p1.x + p2.x) * a;
      cy += (p1.y + p2.y) * a;
      ar += a;
    }
    ar = ar * 3;
    cx = cx / ar;
    cy = cy / ar;
    return new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](cx, cy);
  }
}


/***/ },

/***/ "./src/SAT/Response.ts"
/*!*****************************!*\
  !*** ./src/SAT/Response.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Response)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");

class Response {
  constructor() {
    this.a = null;
    this.b = null;
    this.overlapN = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.overlapV = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.aInB = true;
    this.bInA = true;
    this.overlap = Number.MAX_VALUE;
  }
  /**
   * Set some values of the response back to their defaults.
   * 
   * Call this between tests if you are going to reuse a single Response object for multiple intersection tests (recommended as it will avoid allcating extra memory)
   * 
   * @returns {Response} Returns this for chaining.
   */
  clear() {
    this.aInB = true;
    this.bInA = true;
    this.overlap = Number.MAX_VALUE;
    return this;
  }
}


/***/ },

/***/ "./src/SAT/SAT.ts"
/*!************************!*\
  !*** ./src/SAT/SAT.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SAT)
/* harmony export */ });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Response */ "./src/SAT/Response.ts");
/*!
* sat-js (or SAT.js) made by Jim Riecken and released under the MIT license
* Modified by Robert Corponoi and me (SonoPG)
* Changes made by me: Bug fixes and conversion to TypeScript
*/



const T_VECTORS = [];
for (let i = 0; i < 10; i++) T_VECTORS.push(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]());
const T_ARRAYS = [];
for (let i = 0; i < 5; i++) T_ARRAYS.push([]);
const T_RESPONSE = new _Response__WEBPACK_IMPORTED_MODULE_2__["default"]();
const TEST_POINT = new _Box__WEBPACK_IMPORTED_MODULE_0__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](), 1e-6, 1e-6).toPolygon();
const LEFT_VORONOI_REGION = -1;
const MIDDLE_VORONOI_REGION = 0;
const RIGHT_VORONOI_REGION = 1;
function flattenPointsOn(points, normal, result) {
  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;
  const len = points.length;
  for (let i = 0; i < len; i++) {
    const dot = points[i].dot(normal);
    if (dot < min) min = dot;
    if (dot > max) max = dot;
  }
  result[0] = min;
  result[1] = max;
}
function voronoiRegion(line, point) {
  const len2 = line.len2();
  const dp = point.dot(line);
  if (dp < 0) return LEFT_VORONOI_REGION;
  else if (dp > len2) return RIGHT_VORONOI_REGION;
  else return MIDDLE_VORONOI_REGION;
}
class SAT {
  /**
   * Check whether two convex polygons are separated by the specified axis (must be a unit vector).
   * 
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array<Vector>} aPoints The points in the first polygon.
   * @param {Array<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false, and a response is passed in, information about how much overlap and the direction of the overlap will be populated.
   */
  static isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    const rangeA = T_ARRAYS.pop();
    const rangeB = T_ARRAYS.pop();
    const offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    const projectedOffset = offsetV.dot(axis);
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
      let overlap = 0;
      if (rangeA[0] < rangeB[0]) {
        response.aInB = false;
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response.bInA = false;
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      } else {
        response.bInA = false;
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response.aInB = false;
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      const absOverlap = Math.abs(overlap);
      if (absOverlap < response.overlap) {
        response.overlap = absOverlap;
        response.overlapN.copy(axis);
        if (overlap < 0) response.overlapN.reverse();
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  }
  /**
   * ## Collision Tests
   */
  /**
   * Check if a point is inside a circle.
   * 
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * 
   * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
   */
  static pointInCircle(p, c) {
    const differenceV = T_VECTORS.pop().copy(p).sub(c.pos).sub(c.offset);
    const radiusSq = c.r * c.r;
    const distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    return distanceSq <= radiusSq;
  }
  /**
   * Check if a point is inside a convex polygon.
   * 
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * 
   * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
   */
  static pointInPolygon(p, poly) {
    TEST_POINT.pos.copy(p);
    T_RESPONSE.clear();
    let result = SAT.testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) result = T_RESPONSE.aInB;
    return result;
  }
  /**
   * Check if two circles collide.
   * 
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response} [response] An optional response object that will be populated if the circles intersect.
   * 
   * @returns {boolean} Returns true if the circles intersect or false otherwise.
   */
  static testCircleCircle(a, b, response) {
    const differenceV = T_VECTORS.pop().copy(b.pos).add(b.offset).sub(a.pos).sub(a.offset);
    const totalRadius = a.r + b.r;
    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = differenceV.len2();
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    if (response) {
      const dist = Math.sqrt(distanceSq);
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
  }
  /**
   * Check if a polygon and a circle collide.
   * 
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  static testPolygonCircle(polygon, circle, response) {
    const circlePos = T_VECTORS.pop().copy(circle.pos).add(circle.offset).sub(polygon.pos);
    const radius = circle.r;
    const radius2 = radius * radius;
    const points = polygon.calcPoints;
    const len = points.length;
    const edge = T_VECTORS.pop();
    const point = T_VECTORS.pop();
    for (var i = 0; i < len; i++) {
      const next = i === len - 1 ? 0 : i + 1;
      const prev = i === 0 ? len - 1 : i - 1;
      let overlap = 0;
      let overlapN = null;
      edge.copy(polygon.edges[i]);
      point.copy(circlePos).sub(points[i]);
      if (response && point.len2() > radius2) response.aInB = false;
      let region = voronoiRegion(edge, point);
      if (region === LEFT_VORONOI_REGION) {
        edge.copy(polygon.edges[prev]);
        const point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
          const dist = point.len();
          if (dist > radius) {
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      } else if (region === RIGHT_VORONOI_REGION) {
        edge.copy(polygon.edges[next]);
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
          const dist = point.len();
          if (dist > radius) {
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      } else {
        const normal = edge.perp().normalize();
        const dist = point.dot(normal);
        const distAbs = Math.abs(dist);
        if (dist > 0 && distAbs > radius) {
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          overlapN = normal;
          overlap = radius - dist;
          if (dist >= 0 || overlap < 2 * radius) response.bInA = false;
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
  }
  /**
   * Check if a circle and a polygon collide.
   * 
   * **NOTE:** This is slightly less efficient than polygonCircle as it just runs polygonCircle and reverses everything
   * at the end.
   * 
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  static testCirclePolygon(circle, polygon, response) {
    const result = SAT.testPolygonCircle(polygon, circle, response);
    if (result && response) {
      const a = response.a;
      const aInB = response.aInB;
      response.overlapN.reverse();
      response.overlapV.reverse();
      response.a = response.b;
      response.b = a;
      response.aInB = response.bInA;
      response.bInA = aInB;
    }
    return result;
  }
  /**
   * Checks whether polygons collide.
   * 
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  static testPolygonPolygon(a, b, response) {
    const aPoints = a.calcPoints;
    const aLen = aPoints.length;
    const bPoints = b.calcPoints;
    const bLen = bPoints.length;
    for (let i = 0; i < aLen; i++) {
      if (SAT.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, a.normals[i], response)) {
        return false;
      }
    }
    for (let i = 0; i < bLen; i++) {
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
  }
}


/***/ },

/***/ "./src/SAT/Vector.ts"
/*!***************************!*\
  !*** ./src/SAT/Vector.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
class Vector {
  /**
   * @param {number} [x=0] The x coordinate of this Vector.
   * @param {number} [y=0] The y coordinate of this Vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * Copy the values of another Vector into this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  copy(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  /**
   * Create a new Vector with the same coordinates as the one.
   * 
   * @returns {Vector} The new cloned Vector.
   */
  clone() {
    return new Vector(this.x, this.y);
  }
  /**
   * Change this Vector to be perpendicular to what it was before.
   * 
   * Effectively this rotates it 90 degrees in a clockwise direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  perp() {
    const x = this.x;
    this.x = this.y;
    this.y = -x;
    return this;
  }
  /**
   * Rotate this Vector (counter-clockwise) by the specified angle (in radians).
   * 
   * @param {number} angle The angle to rotate (in radians).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  rotate(angle) {
    const x = this.x;
    const y = this.y;
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  }
  /**
   * Reverse this Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reverse() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * Normalize this vector (make it have a length of `1`).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  normalize() {
    const d = this.len();
    if (d > 0) {
      this.x = this.x / d;
      this.y = this.y / d;
    }
    return this;
  }
  /**
   * Add another Vector to this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  /**
   * Subtract another Vector from this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  /**
   * Scale this Vector.
   * 
   * An independent scaling factor can be provided for each axis, or a single scaling factor will scale
   * both `x` and `y`.
   * 
   * @param {number} x The scaling factor in the x direction.
   * @param {number} [y] The scaling factor in the y direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  scale(x, y) {
    this.x *= x;
    this.y *= typeof y != "undefined" ? y : x;
    return this;
  }
  /**
   * Project this Vector onto another Vector.
   * 
   * @param {Vector} other The Vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  project(other) {
    const amt = this.dot(other) / other.len2();
    this.x = amt * other.x;
    this.y = amt * other.y;
    return this;
  }
  /**
   * Project this Vector onto a Vector of unit length.
   * 
   * This is slightly more efficient than `project` when dealing with unit vectors.
   * 
   * @param {Vector} other The unit vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  projectN(other) {
    const amt = this.dot(other);
    this.x = amt * other.x;
    this.y = amt * other.y;
    return this;
  }
  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflect(axis) {
    const x = this.x;
    const y = this.y;
    this.project(axis).scale(2);
    this.x -= x;
    this.y -= y;
    return this;
  }
  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflectN(axis) {
    const x = this.x;
    const y = this.y;
    this.projectN(axis).scale(2);
    this.x -= x;
    this.y -= y;
    return this;
  }
  /**
   * Get the dot product of this Vector and another.
   * 
   * @param {Vector} other The Vector to dot this one against.
   * 
   * @returns {number} Returns dot product.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  /**
   * Get the squared length of this Vector.
   * 
   * @returns {number} Returns squared length.
   */
  len2() {
    return this.dot(this);
  }
  /**
   * Get the length of this Vector.
   * 
   * @returns {number} Returns length.
   */
  len() {
    return Math.sqrt(this.len2());
  }
}


/***/ },

/***/ "./src/SpriteManager.ts"
/*!******************************!*\
  !*** ./src/SpriteManager.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageList: () => (/* binding */ ImageList),
/* harmony export */   Sprite: () => (/* binding */ Sprite),
/* harmony export */   Sprites: () => (/* binding */ Sprites)
/* harmony export */ });
const _ImageList = class _ImageList {
  static register(src) {
    let img = new Image();
    img.src = src;
    _ImageList.IMAGES.push(img);
    return img;
  }
};
_ImageList.IMAGES = [];
_ImageList.TILEMAP_MASTER = _ImageList.register("assets/textures/objects/tileMaster.png");
_ImageList.SPIKE = _ImageList.register("assets/textures/objects/sprSpike.png");
_ImageList.BROCCOLI = _ImageList.register("assets/textures/objects/bgBroccoli.png");
_ImageList.KUMO_PLATFORM = _ImageList.register("assets/textures/objects/sprKumoPlatform.png");
_ImageList.PLAYER = _ImageList.register("assets/textures/objects/player/sprPlayer.png");
_ImageList.GORE = _ImageList.register("assets/textures/objects/player/sprGore.png");
_ImageList.BULLET = _ImageList.register("assets/textures/objects/player/sprBullet.png");
_ImageList.GAMEOVER = _ImageList.register("assets/textures/ui/sprGameOver.png");
let ImageList = _ImageList;
class Sprite {
  constructor(source, x = 0, y = 0, w, h) {
    this.source = source;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
var Sprites;
((Sprites2) => {
  Sprites2.FallingBlock = new Sprite(ImageList.TILEMAP_MASTER, 32, 32, 32, 32);
  Sprites2.GrassFallingBlock = new Sprite(ImageList.TILEMAP_MASTER, 0, 32, 32, 32);
  Sprites2.Broccoli = new Sprite(ImageList.BROCCOLI, 0, 0, 111, 175);
  Sprites2.KraidgiefBroccoli = new Sprite(ImageList.BROCCOLI, 112, 0, 111, 175);
  Sprites2.BigBroccoli = new Sprite(ImageList.BROCCOLI, 0, 175, 213, 331);
  Sprites2.SpikeUp = new Sprite(ImageList.SPIKE, 0, 0, 32, 32);
  Sprites2.SpikeRight = new Sprite(ImageList.SPIKE, 32, 0, 32, 32);
  Sprites2.SpikeDown = new Sprite(ImageList.SPIKE, 64, 0, 32, 32);
  Sprites2.SpikeLeft = new Sprite(ImageList.SPIKE, 96, 0, 32, 32);
  Sprites2.Cloud = [new Sprite(ImageList.KUMO_PLATFORM, 0, 0, 112, 32), new Sprite(ImageList.KUMO_PLATFORM, 112, 0, 112, 32)];
  Sprites2.DeathMessage = new Sprite(ImageList.GAMEOVER, 0, 0, 800, 188);
})(Sprites || (Sprites = {}));


/***/ },

/***/ "./src/levels/BasicLevel.ts"
/*!**********************************!*\
  !*** ./src/levels/BasicLevel.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicLevel)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/Game.ts");

class BasicLevel {
  constructor() {
    this.objects = [];
    this.removeQueue = [];
  }
  update(ctx, delta) {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(delta);
    }
    while (this.removeQueue.length != 0) {
      for (let o = 0; o < this.objects.length; o++) {
        if (this.objects[o].id == this.removeQueue[0]) {
          this.objects[o].dispose();
          this.objects.splice(o, 1);
          break;
        }
      }
      this.removeQueue.splice(0, 1);
    }
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].draw(ctx, delta);
    }
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].DEBUG) {
      this.drawCollisionLines(ctx);
    }
  }
  removeObject(id) {
    this.removeQueue.push(id);
  }
  isRemoved(id) {
    return this.removeQueue.indexOf(id) !== -1;
  }
  drawCollisionLines(ctx) {
    ctx.save();
    for (let i = 0; i < this.objects.length; i++) {
      const points = this.objects[i].polygon.points;
      ctx.beginPath();
      ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
      for (let p = 1; p < points.length; p++) {
        ctx.lineTo(this.objects[i].polygon.pos.x + points[p].x, this.objects[i].polygon.pos.y + points[p].y);
      }
      ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.objects[i].collision ? "#ff0000" : "#0000ff";
      ctx.stroke();
    }
    ctx.restore();
  }
  dispose() {
    while (this.objects.length != 0) {
      this.objects[0].dispose();
      this.objects.splice(0, 1);
    }
  }
}


/***/ },

/***/ "./src/levels/SaveSelectMenu.ts"
/*!**************************************!*\
  !*** ./src/levels/SaveSelectMenu.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveSelectMenu)
/* harmony export */ });
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _objects_player_FakePlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/player/FakePlayerObject */ "./src/objects/player/FakePlayerObject.ts");
/* harmony import */ var _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/SpriteObject */ "./src/objects/SpriteObject.ts");
/* harmony import */ var _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/TileObject */ "./src/objects/TileObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");
/* harmony import */ var _BasicLevel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");






const _SaveSelectMenu = class _SaveSelectMenu extends _BasicLevel__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor() {
    super();
    _AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"].playMusic("assets/music/saveselect.ogg");
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("grass", 0, 17, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.GrassFallingBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("ground", 0, 18, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.FallingBlock]));
    for (let i = 0; i < 7; i++) {
      this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("tree" + i, Math.random() * 800, 369, 111, 175, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Broccoli));
    }
    for (let i = 0; i < 6; i++) {
      this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.AnimatedSpriteObject("cloud" + i, Math.random() * 800, 10 + Math.random() * 300, 112, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Cloud, 0.5));
    }
    this.objects.push(new _objects_player_FakePlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"]());
  }
  update(ctx, delta) {
    for (let i = 0; i < 2; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -64)
        this.objects[i].polygon.pos.x = 0;
      else if (this.objects[i].polygon.pos.x < -32)
        this.objects[i].polygon.pos.x += 32;
    }
    for (let i = 2; i < 9; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -111)
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100;
    }
    for (let i = 9; i < 15; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -112) {
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100;
        this.objects[i].polygon.pos.y = 10 + Math.random() * 300;
      }
    }
    ctx.fillStyle = "#C4D7F7";
    ctx.fillRect(0, 0, 800, 608);
    ctx.fillStyle = "#88391E";
    ctx.fillRect(0, 608 - 64, 800, 64);
    ctx.fillStyle = "#000000";
    super.update(ctx, delta);
  }
  instantiate() {
    return new _SaveSelectMenu();
  }
};
_SaveSelectMenu.scrollVel = 75;
let SaveSelectMenu = _SaveSelectMenu;



/***/ },

/***/ "./src/levels/TestLevel.ts"
/*!*********************************!*\
  !*** ./src/levels/TestLevel.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TestLevel)
/* harmony export */ });
/* harmony import */ var _BasicLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");
/* harmony import */ var _objects_player_PlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/TileObject */ "./src/objects/TileObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");






class TestLevel extends _BasicLevel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    _AudioManager__WEBPACK_IMPORTED_MODULE_3__["default"].playMusic("assets/music/begins.ogg");
    this.objects.push(new _objects_player_PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"](32, 512));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("ground0", 0, 18, 25, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.FallingBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall0", 8, 14, 1, 4, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.FallingBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall1", 9, 12, 1, 6, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.FallingBlock]));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike0", 320, 416, 1));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike1", 320, 384, 1));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike2", 288, 352, 0));
  }
  instantiate() {
    return new TestLevel();
  }
}


/***/ },

/***/ "./src/objects/BasicObject.ts"
/*!************************************!*\
  !*** ./src/objects/BasicObject.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/Game.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");





class BasicObject {
  constructor(id, x, y, w, h) {
    this.collision = true;
    this.id = id;
    if (w == 0 && h == 0) this.collision = false;
    this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, h),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, h),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, 0)
    ]);
  }
  moveBy(x, y) {
    let collided = false;
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_2__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].polygon, response)) {
        collided = true;
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i]);
        let bColl = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].onCollision(response, this);
        if (aColl && bColl && this.collision) this.polygon.pos.sub(response.overlapV);
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    return true;
  }
  dispose() {
  }
}


/***/ },

/***/ "./src/objects/SpikeObject.ts"
/*!************************************!*\
  !*** ./src/objects/SpikeObject.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpikeDirection: () => (/* binding */ SpikeDirection),
/* harmony export */   "default": () => (/* binding */ SpikeObject)
/* harmony export */ });
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteObject */ "./src/objects/SpriteObject.ts");
/* harmony import */ var _player_PlayerObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");





var SpikeDirection = /* @__PURE__ */ ((SpikeDirection2) => {
  SpikeDirection2[SpikeDirection2["Up"] = 0] = "Up";
  SpikeDirection2[SpikeDirection2["Right"] = 1] = "Right";
  SpikeDirection2[SpikeDirection2["Down"] = 2] = "Down";
  SpikeDirection2[SpikeDirection2["Left"] = 3] = "Left";
  return SpikeDirection2;
})(SpikeDirection || {});
class SpikeObject extends _SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject {
  constructor(id, x, y, direction = 0) {
    super(id, x, y, 32, 32, SpikeObject.getDirSprite(direction));
    this.direction = direction;
    switch (this.direction) {
      case 3 /* Left */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 16),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 1)
        ]);
        break;
      case 2 /* Down */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 1)
        ]);
        break;
      case 1 /* Right */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 16)
        ]);
        break;
      default:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 31)
        ]);
    }
  }
  onCollision(info, obj) {
    if (obj instanceof _player_PlayerObject__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      obj.die();
    }
    return false;
  }
  static getDirSprite(dir) {
    const spikeDirSprites = [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeUp, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeRight, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeDown, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeLeft];
    return spikeDirSprites[dir];
  }
}


/***/ },

/***/ "./src/objects/SpriteObject.ts"
/*!*************************************!*\
  !*** ./src/objects/SpriteObject.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimatedSpriteObject: () => (/* binding */ AnimatedSpriteObject),
/* harmony export */   SpriteObject: () => (/* binding */ SpriteObject)
/* harmony export */ });
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");

class SpriteObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, w, h, sprite) {
    super(id, x, y, w, h);
    this.sprite = sprite;
    this.width = w;
    this.height = h;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x, this.polygon.pos.y, this.width, this.height);
  }
}
class AnimatedSpriteObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, w, h, sprites, animDuration) {
    super(id, x, y, w, h);
    this.frameTimer = 0;
    this.sprites = sprites;
    this.width = w;
    this.height = h;
    this.animDuration = animDuration;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    this.frameTimer = (this.frameTimer + delta) % this.animDuration;
    let i = Math.floor(this.frameTimer * this.sprites.length / this.animDuration);
    ctx.drawImage(this.sprites[i].source, this.sprites[i].x, this.sprites[i].y, this.sprites[i].w, this.sprites[i].h, this.polygon.pos.x, this.polygon.pos.y, this.width, this.height);
  }
}


/***/ },

/***/ "./src/objects/TileObject.ts"
/*!***********************************!*\
  !*** ./src/objects/TileObject.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TileObject)
/* harmony export */ });
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");

class TileObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, xRepeat, yRepeat, sprites, order, tileWidth = sprites[0].w, tileHeight = sprites[0].h) {
    super(id, x * tileWidth, y * tileHeight, xRepeat * tileWidth, yRepeat * tileHeight);
    this.order = [];
    this.xRepeat = xRepeat;
    this.yRepeat = yRepeat;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.spriteList = sprites;
    if (order !== void 0) this.order = order;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    for (let i = 0; i < this.xRepeat * this.yRepeat; i++) {
      let sprite = this.spriteList[i < this.order.length ? this.order[i] : 0];
      ctx.drawImage(
        sprite.source,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h,
        this.polygon.pos.x + i % this.xRepeat * this.tileWidth,
        this.polygon.pos.y + Math.floor(i / this.xRepeat) * this.tileHeight,
        this.tileWidth,
        this.tileHeight
      );
    }
  }
}


/***/ },

/***/ "./src/objects/player/BloodParticle.ts"
/*!*********************************************!*\
  !*** ./src/objects/player/BloodParticle.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BloodParticle)
/* harmony export */ });
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");








class BloodParticle extends _BasicObject__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(x, y, dx, dy, id) {
    super(id, x, y, 2, 2);
    this.dx = 0;
    this.dy = 0;
    this.stuck = false;
    this.type = 0;
    this.dx = dx;
    this.dy = dy;
    this.type = Math.round(Math.random() * 3);
    this.collision = false;
  }
  update(delta) {
    if (this.stuck) return;
    this.dy += _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"].gravity * delta;
    if (this.dx > 0) {
      this.dx -= delta;
      if (this.dx < 0) this.dx = 0;
    } else if (this.dx < 0) {
      this.dx += delta;
      if (this.dx > 0) this.dx = 0;
    }
    if (this.moveBy(this.dx, this.dy)) {
      this.dx = 0;
      this.dy = 0;
      this.stuck = true;
    }
  }
  moveBy(x, y) {
    let collided = false;
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon, response)) {
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i]);
        _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].onCollision(response, this);
        if (aColl) {
          this.polygon.pos.sub(response.overlapV);
          collided = true;
        }
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"]) return false;
    if (obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_5__["default"]) return Math.random() < 0.5;
    return true;
  }
  draw(ctx, delta) {
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.type * 3, 34, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
  }
}


/***/ },

/***/ "./src/objects/player/BulletObject.ts"
/*!********************************************!*\
  !*** ./src/objects/player/BulletObject.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BulletObject)
/* harmony export */ });
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");





class BulletObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x, y, direction, id) {
    super(id, x - 5, y - 1, 10, 2);
    this.frameTime = 0;
    this.direction = direction;
  }
  update(delta) {
    this.moveBy(this.direction * 750 * delta, 0);
  }
  onCollision(info, obj) {
    if (obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_3__["default"]) return false;
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_0__["default"]) return false;
    _Game__WEBPACK_IMPORTED_MODULE_2__["default"].level.removeObject(this.id);
    return false;
  }
  draw(ctx, delta) {
    this.frameTime += delta;
    while (this.frameTime >= 0.2) this.frameTime -= 0.2;
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.BULLET, Math.floor(this.frameTime / 0.1) * 4, 0, 4, 4, this.polygon.pos.x + 3, this.polygon.pos.y - 1, 4, 4);
  }
}


/***/ },

/***/ "./src/objects/player/FakePlayerObject.ts"
/*!************************************************!*\
  !*** ./src/objects/player/FakePlayerObject.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FakePlayerObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");


class FakePlayerObject extends _PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x = 112, y = 512, id = "fake_player") {
    super(x, y, id);
    this.selectedSave = 0;
    this.collision = false;
    this.onGround = true;
    this.dx = Number.EPSILON;
  }
  update(delta) {
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowRight")) {
      if (this.rightKeyTime++ == 0) {
        this.selectedSave = (this.selectedSave + 1) % 3;
      }
    } else this.rightKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowLeft")) {
      if (this.leftKeyTime++ == 0) {
        this.selectedSave = (this.selectedSave - 1 + 3) % 3;
      }
    } else this.leftKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("x")) {
      if (this.shootKeyTime++ == 0)
        this.shoot();
    } else this.shootKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("Shift") || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("z")) {
      if (this.jumpKeyTime++ == 0)
        _Game__WEBPACK_IMPORTED_MODULE_0__["default"].loadSave(this.selectedSave);
    } else this.jumpKeyTime = 0;
    let targetPos = 112 + this.selectedSave * 32 * 8;
    let dx = Math.min(Math.abs(this.polygon.pos.x - targetPos), _PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"].velocity * 4 * delta);
    this.moveBy(this.polygon.pos.x > targetPos ? -dx : dx, 0);
  }
  die() {
  }
}


/***/ },

/***/ "./src/objects/player/GibParticle.ts"
/*!*******************************************!*\
  !*** ./src/objects/player/GibParticle.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GibParticle)
/* harmony export */ });
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");








class GibParticle extends _BasicObject__WEBPACK_IMPORTED_MODULE_4__["default"] {
  /**
   * Type 0: body,
   * type 1: body stoned,
   * type 2: head,
   * type 3: head stoned,
   * type 4: arm,
   * type 5: arm stoned,
   * type 6: feet,
   * type 7: feet stoned
   */
  constructor(x, y, dx, dy, type, id) {
    super(id, x, y, 8, 8);
    this.dx = 0;
    this.dy = 0;
    this.type = 0;
    this.bodyVariant = 0;
    this.dx = dx;
    this.dy = dy;
    this.type = type;
    this.collision = false;
    if (this.type == 0 || this.type == 1) {
      this.bodyVariant = Math.round(Math.random() * 32);
    }
  }
  update(delta) {
    this.dy += _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"].gravity * Math.min(delta, 0.3);
    if (this.dx > 0) {
      this.dx -= delta;
      if (this.dx < 0) this.dx = 0;
    } else if (this.dx < 0) {
      this.dx += delta;
      if (this.dx > 0) this.dx = 0;
    }
    this.moveBy(this.dx, this.dy);
  }
  moveBy(x, y) {
    let collided = false;
    let thisAABB = this.polygon.getAABB();
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon, response)) {
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i]);
        _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].onCollision(response, this);
        if (aColl) {
          this.polygon.pos.sub(response.overlapV);
          collided = true;
          let objtAABB = _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon.getAABB();
          if (thisAABB.pos.y + thisAABB.points[2].y <= objtAABB.pos.y || thisAABB.pos.y >= objtAABB.pos.y + objtAABB.points[2].y) {
            this.dy *= -0.75;
          } else {
            this.dx *= -0.75;
          }
        }
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"] || obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_5__["default"]) return false;
    return true;
  }
  draw(ctx, delta) {
    switch (this.type) {
      case 0:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.bodyVariant * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
        break;
      case 1:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.bodyVariant * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
        break;
      case 2:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 0, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
        break;
      case 3:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 10, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
        break;
      case 4:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 20, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
        break;
      case 5:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 28, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
        break;
      case 6:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 36, 18, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
        break;
      case 7:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 36, 22, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
    }
  }
}


/***/ },

/***/ "./src/objects/player/PlayerObject.ts"
/*!********************************************!*\
  !*** ./src/objects/player/PlayerObject.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _BulletObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BulletObject */ "./src/objects/player/BulletObject.ts");
/* harmony import */ var _utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/CommonUtils */ "./src/utils/CommonUtils.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _BloodParticle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BloodParticle */ "./src/objects/player/BloodParticle.ts");
/* harmony import */ var _GibParticle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GibParticle */ "./src/objects/player/GibParticle.ts");
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");
/* harmony import */ var _SpriteObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../SpriteObject */ "./src/objects/SpriteObject.ts");











const _PlayerObject = class _PlayerObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x, y, id = "player") {
    super(id, x, y, 32, 32);
    this.frameTimer = 0;
    this.lookingDirection = 1;
    this.rightKeyTime = 0;
    this.leftKeyTime = 0;
    this.jumpKeyTime = 0;
    this.shootKeyTime = 0;
    this.dx = 0;
    this.dy = 1;
    this.onGround = false;
    this.availableJumps = 0;
    this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_8__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](9, 11),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](9, 32),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](23, 32),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](23, 11)
    ]);
  }
  update(delta) {
    this.dy += _PlayerObject.gravity * delta;
    this.dx = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowRight")) {
      this.rightKeyTime++;
      if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
        this.dx = _PlayerObject.velocity * delta;
      }
    } else this.rightKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowLeft")) {
      this.leftKeyTime++;
      if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
        this.dx = -_PlayerObject.velocity * delta;
      }
    } else this.leftKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("x")) {
      if (this.shootKeyTime++ == 0)
        this.shoot();
    } else this.shootKeyTime = 0;
    if ((_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("Shift") || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("z")) && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
      if (this.jumpKeyTime == 0) {
        this.availableJumps--;
        if (this.availableJumps == 1) _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play("jump1", "assets/sounds/jump1.wav");
        else _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play("jump2", "assets/sounds/jump2.wav");
      }
      this.jumpKeyTime += delta;
      if (this.jumpKeyTime < 0.3) {
        if (this.availableJumps == 1) this.dy = -220 * delta;
        else this.dy = -180 * delta;
      }
    } else this.jumpKeyTime = 0;
    if (this.dx != 0) this.lookingDirection = Math.sign(this.dx);
    this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
    let previousPos = new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]().copy(this.polygon.pos);
    this.onGround = false;
    if (this.moveBy(this.dx, this.dy)) {
      if (this.dy > 0 && this.polygon.pos.y == previousPos.y) {
        this.dy = 1;
        this.onGround = true;
        this.availableJumps = 2;
      }
    }
    if (!this.onGround && this.availableJumps > 1) this.availableJumps = 1;
  }
  shoot() {
    let bulletId = "bullet" + (0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.randomUnsecureUUID)();
    _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play(bulletId, "assets/sounds/fire.wav").onended = (e) => {
      _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].release(bulletId);
    };
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
      new _BulletObject__WEBPACK_IMPORTED_MODULE_2__["default"](
        this.polygon.pos.x + 16 + 10 * this.lookingDirection,
        this.polygon.pos.y + 21,
        this.lookingDirection,
        bulletId
      )
    );
  }
  die() {
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.isRemoved(this.id)) return;
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.removeObject(this.id);
    let center = this.polygon.getCentroid().add(this.polygon.pos);
    for (let i = 0; i < 128; i++) {
      _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
        new _BloodParticle__WEBPACK_IMPORTED_MODULE_5__["default"](
          center.x,
          center.y,
          Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6,
          Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10,
          "blood_" + this.id + "_" + i
        )
      );
    }
    for (let i = 0; i < 8; i += 2) {
      for (let o = 0; o < (i > 3 ? 2 : 1); o++) {
        _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
          new _GibParticle__WEBPACK_IMPORTED_MODULE_6__["default"](
            center.x,
            center.y,
            Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4,
            Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4,
            i,
            "gib_" + this.id + "_" + (i + o)
          )
        );
      }
    }
    _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].playMusic("assets/music/gameover.ogg", false);
    let deathMessage = new _SpriteObject__WEBPACK_IMPORTED_MODULE_10__.SpriteObject("death_message", 400 - 350, 304 - 82, 700, 164, _SpriteManager__WEBPACK_IMPORTED_MODULE_9__.Sprites.DeathMessage);
    deathMessage.collision = false;
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(deathMessage);
  }
  draw(ctx, delta) {
    this.frameTimer = (this.frameTimer + delta) % 0.4;
    let frame = Math.floor(this.frameTimer / 0.1);
    ctx.save();
    if (this.lookingDirection == -1) {
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x, this.polygon.pos.y);
      ctx.scale(-1, 1);
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x * 2 - 32, 0);
    } else {
      ctx.translate(this.polygon.pos.x, this.polygon.pos.y);
    }
    if (this.dy < 0) {
      if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 0, 64, 32, 32), 0, 0, 32, 32);
      } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 32, 64, 32, 32), 0, 0, 32, 32);
      } else {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame % 2 * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
      }
    } else if (!this.onGround) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame % 2 * 32, 96, 32, 32), 0, 0, 32, 32);
    } else if (this.dx != 0) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame * 32, 32, 32, 32), 0, 0, 32, 32);
    } else {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame * 32, 0, 32, 32), 0, 0, 32, 32);
    }
    ctx.restore();
  }
};
_PlayerObject.velocity = 175;
_PlayerObject.gravity = 24;
let PlayerObject = _PlayerObject;



/***/ },

/***/ "./src/utils/CommonUtils.ts"
/*!**********************************!*\
  !*** ./src/utils/CommonUtils.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bufferDrawImage: () => (/* binding */ bufferDrawImage),
/* harmony export */   randomUnsecureUUID: () => (/* binding */ randomUnsecureUUID)
/* harmony export */ });
function randomUnsecureUUID() {
  return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}
const bufferCanvas = document.getElementById("buffer-canvas");
const bufferCtx = (() => {
  let ctx = bufferCanvas.getContext("2d");
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


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");
/*!
* I Wanna Be The Guy: The Movie: The Game
* TypeScript remake made by PGgamer2 (aka SonoPG).
* You can find the source code here: https://github.com/PGgamer2/IWBTG.ts
* Original game made by Kayin: https://kayin.moe/iwbtg/
*/


function frame(timestamp) {
  if (!document.hidden)
    _Game__WEBPACK_IMPORTED_MODULE_1__["default"].update(timestamp);
  window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
onkeydown = function(e) {
  _Game__WEBPACK_IMPORTED_MODULE_1__["default"].keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, true);
  _AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"].autoPlayFix();
};
onkeyup = function(e) {
  _Game__WEBPACK_IMPORTED_MODULE_1__["default"].keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, false);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVSxHQUFHLEdBQUcsYUFBYSxPQUFPLGFBQWEsTUFBTTtBQUNqRSxZQUFVLFVBQVUsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLEVBQUU7QUFDdkQsU0FBTztBQUNYOzs7Ozs7O1VDaENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzBDO0FBQ2hCO0FBRTFCLFNBQVMsTUFBTSxXQUFnQztBQUMzQyxNQUFJLENBQUMsU0FBUztBQUNWLGlEQUFJLENBQUMsT0FBTyxTQUFTO0FBQ3pCLFNBQU8sc0JBQXNCLEtBQUs7QUFDdEM7QUFDQSxPQUFPLHNCQUFzQixLQUFLO0FBRWxDLFlBQVksU0FBUyxHQUFHO0FBQ3BCLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssSUFBSTtBQUNyRSx1REFBWSxDQUFDLFlBQVk7QUFDN0I7QUFDQSxVQUFVLFNBQVMsR0FBRztBQUFFLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssS0FBSztBQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0F1ZGlvTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQm94LnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9TcHJpdGVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvQmFzaWNMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL1NhdmVTZWxlY3RNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvVGVzdExldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2ljT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1NwaWtlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1Nwcml0ZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9UaWxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CbG9vZFBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CdWxsZXRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Zha2VQbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0dpYlBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vblV0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvTWFwOiBNYXA8c3RyaW5nLCBIVE1MQXVkaW9FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXkoa2V5OiBzdHJpbmcsIHNyYz86IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDEuMCk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNyYyA9PT0gdW5kZWZpbmVkKSBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIGVsc2UgYXVkaW8gPSBuZXcgQXVkaW8oc3JjKTtcclxuICAgICAgICBhdWRpby5sb29wID0gbG9vcDtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLnNldChrZXksIGF1ZGlvKTtcclxuICAgICAgICBhdWRpby5vbmNhbnBsYXkgPSBlID0+IHtcclxuICAgICAgICAgICAgYXVkaW8hLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICBhdWRpbyEuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvIS5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhdWRpbyEub25jYW5wbGF5ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheU11c2ljKHNyYzogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQgJiYgIWF1ZGlvLnNyYy5lbmRzV2l0aChzcmMpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5yZWxlYXNlKFwiX211c2ljXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLnBsYXkoXCJfbXVzaWNcIiwgc3JjLCBsb29wLCAwLjc1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5wYXVzZShrZXkpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvUGxheUZpeGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1dG9QbGF5Rml4KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVHJ5aW5nIHRvIGZpeCBhdXRvcGxheS4uLlwiKTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfbXVzaWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vQ2FtZXJhJztcclxuaW1wb3J0IFNhdmVTZWxlY3RNZW51IGZyb20gJy4vbGV2ZWxzL1NhdmVTZWxlY3RNZW51JztcclxuaW1wb3J0IFRlc3RMZXZlbCBmcm9tICcuL2xldmVscy9UZXN0TGV2ZWwnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RUaW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxldmVsOiBCYXNpY0xldmVsID0gbmV3IFNhdmVTZWxlY3RNZW51KCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICAvLyBSZXNpemUga2VlcGluZyBhc3BlY3QgcmF0aW9cclxuICAgICAgICBsZXQgcGFnZUFzcGVjdFJhdGlvID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZSA9IE1hdGguZmxvb3IoMjUgLyAxOSA8IHBhZ2VBc3BlY3RSYXRpbyA/IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC8gMTkgOiBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMjUpO1xyXG5cdFx0aWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc2NyZXRlLXNjYWxlLWNoZWNrYm94XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXHJcblx0XHRcdHNjYWxlID0gTWF0aC5tYXgoMSA8PCAoMzEgLSBNYXRoLmNsejMyKHNjYWxlKSksIDEpO1x0Ly8gU2V0IHNjYWxlIHRvIGEgcG93ZXIgb2YgdHdvXHJcbiAgICAgICAgR2FtZS5jYW52YXMud2lkdGggPSBzY2FsZSAqIDI1O1xyXG4gICAgICAgIEdhbWUuY2FudmFzLmhlaWdodCA9IHNjYWxlICogMTk7XHJcbiAgICAgICAgLy8gR2V0IGNvbnRleHQgYW5kIGNsZWFyXHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XHJcbiAgICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgR2FtZS5jYW52YXMud2lkdGgsIEdhbWUuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbWVyYS54LCBHYW1lLmNhbWVyYS55KTtcclxuICAgICAgICBjdHgucm90YXRlKEdhbWUuY2FtZXJhLmFuZ2xlKTtcclxuICAgICAgICBjdHguc2NhbGUoR2FtZS5jYW1lcmEuc2l6ZVggKiAoR2FtZS5jYW52YXMud2lkdGggLyA4MDApLCBHYW1lLmNhbWVyYS5zaXplWSAqIChHYW1lLmNhbnZhcy5oZWlnaHQgLyA2MDgpKTtcclxuICAgICAgICBHYW1lLmxldmVsLnVwZGF0ZShjdHgsICh0aW1lc3RhbXAgLSBHYW1lLmxhc3RUaW1lc3RhbXApIC8gMTAwMCk7XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICAgICAgLy8gUmVsb2FkIGxldmVsXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdyJykpIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmlzUHVzaGluZ1JlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5sZXZlbC5pbnN0YW50aWF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgR2FtZS5pc1B1c2hpbmdSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBHYW1lLmxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU2F2ZShzYXZlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxldmVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IFRlc3RMZXZlbCgpOyAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQnV0dG9uRG93bihrZXlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoa2V5TmFtZS5sZW5ndGggPT0gMSkga2V5TmFtZSA9IGtleU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gR2FtZS5rZXlNYXAuZ2V0KGtleU5hbWUpID8/IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xyXG5cclxuLyoqXHJcbiAqICMjIEJveFxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94LCB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XHJcbiAgcHVibGljIHBvczogVmVjdG9yO1xyXG4gIHB1YmxpYyB3OiBudW1iZXI7XHJcbiAgcHVibGljIGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBCb3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXHJcbiAgICogXHJcbiAgICogSWYgbm8gcG9zaXRpb24gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwgMClgLiBJZiBubyB3aWR0aCBvciBoZWlnaHQgYXJlIGdpdmVuLCB0aGV5IHdpbGxcclxuICAgKiBiZSBzZXQgdG8gYDBgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPW5ldyBWZWN0b3IoKV0gQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBib3R0b20tbGVmdCBvZiB0aGUgYm94KGkuZS4gdGhlIHNtYWxsZXN0IHggYW5kIHNtYWxsZXN0IHkgdmFsdWUpLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdz0wXSBUaGUgd2lkdGggb2YgdGhlIEJveC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2g9MF0gVGhlIGhlaWdodCBvZiB0aGUgQm94LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBvcyA9IG5ldyBWZWN0b3IoKSwgdyA9IDAsIGggPSAwKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMudyA9IHc7XHJcbiAgICB0aGlzLmggPSBoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cclxuICAgKi9cclxuICBwdWJsaWMgdG9Qb2x5Z29uKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5wb3M7XHJcbiAgICBjb25zdCB3ID0gdGhpcy53O1xyXG4gICAgY29uc3QgaCA9IHRoaXMuaDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcihwb3MueCwgcG9zLnkpLCBbXHJcbiAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3Rvcih3LCAwKSxcclxuICAgICAgbmV3IFZlY3Rvcih3LCBoKSwgbmV3IFZlY3RvcigwLCBoKVxyXG4gICAgXSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5cclxuLyoqXHJcbiAqICMjIFBvbHlnb25cclxuICogXHJcbiAqIFJlcHJlc2VudHMgYSAqY29udmV4KiBwb2x5Z29uIHdpdGggYW55IG51bWJlciBvZiBwb2ludHMgKHNwZWNpZmllZCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlcikuXHJcbiAqIFxyXG4gKiBOb3RlOiBEbyBfbm90XyBtYW51YWxseSBjaGFuZ2UgdGhlIGBwb2ludHNgLCBgYW5nbGVgLCBvciBgb2Zmc2V0YCBwcm9wZXJ0aWVzLiBVc2UgdGhlIHByb3ZpZGVkIFxyXG4gKiBzZXR0ZXJzLiBPdGhlcndpc2UgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSB1cGRhdGVkIGNvcnJlY3RseS5cclxuICogXHJcbiAqIGBwb3NgIGNhbiBiZSBjaGFuZ2VkIGRpcmVjdGx5LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XHJcbiAgcHVibGljIHBvczogVmVjdG9yO1xyXG4gIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiAgcHVibGljIGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiAgcHVibGljIG5vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkIGJ5IHZlY3RvcnMgXHJcbiAgICogcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1WZWN0b3JdIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoZSBwb2x5Z29uIChhbGwgb3RoZXIgcG9pbnRzIGFyZSByZWxhdGl2ZSB0byB0aGlzIG9uZSlcclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IFtwb2ludHM9W11dIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBvcyA9IG5ldyBWZWN0b3IoKSwgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW10pIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgcG9pbnRzIG9mIHRoZSBwb2x5Z29uLiBBbnkgY29uc2VjdXRpdmUgZHVwbGljYXRlIHBvaW50cyB3aWxsIGJlIGNvbWJpbmVkLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoZSBwb2ludHMgYXJlIGNvdW50ZXItY2xvY2t3aXNlICp3aXRoIHJlc3BlY3QgdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtKi4gSWYgeW91IGRpcmVjdGx5IGRyYXcgdGhlIHBvaW50cyBvbiBhIHNjcmVlbiBcclxuICAgKiB0aGF0IGhhcyB0aGUgb3JpZ2luIGF0IHRoZSB0b3AtbGVmdCBjb3JuZXIgaXQgd2lsbCBfYXBwZWFyXyB2aXN1YWxseSB0aGF0IHRoZSBwb2ludHMgYXJlIGJlaW5nIHNwZWNpZmllZCBjbG9ja3dpc2UuIFRoaXMgaXMgXHJcbiAgICoganVzdCBiZWNhdXNlIG9mIHRoZSBpbnZlcnNpb24gb2YgdGhlIFktYXhpcyB3aGVuIGJlaW5nIGRpc3BsYXllZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IHBvaW50cyBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0UG9pbnRzKHBvaW50czogQXJyYXk8VmVjdG9yPik6IFBvbHlnb24ge1xyXG4gICAgLy8gT25seSByZS1hbGxvY2F0ZSBpZiB0aGlzIGlzIGEgbmV3IHBvbHlnb24gb3IgdGhlIG51bWJlciBvZiBwb2ludHMgaGFzIGNoYW5nZWQuXHJcbiAgICBjb25zdCBsZW5ndGhDaGFuZ2VkID0gIXRoaXMucG9pbnRzIHx8IHRoaXMucG9pbnRzLmxlbmd0aCAhPT0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuZ3RoQ2hhbmdlZCkge1xyXG4gICAgICBsZXQgaTtcclxuXHJcbiAgICAgIGNvbnN0IGNhbGNQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmNhbGNQb2ludHMgPSBbXTtcclxuICAgICAgY29uc3QgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmVkZ2VzID0gW107XHJcbiAgICAgIGNvbnN0IG5vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLm5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgIC8vIEFsbG9jYXRlIHRoZSB2ZWN0b3IgYXJyYXlzIGZvciB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBSZW1vdmUgY29uc2VjdXRpdmUgZHVwbGljYXRlIHBvaW50c1xyXG4gICAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICAgIGNvbnN0IHAyID0gaSA8IHBvaW50cy5sZW5ndGggLSAxID8gcG9pbnRzW2kgKyAxXSA6IHBvaW50c1swXTtcclxuXHJcbiAgICAgICAgaWYgKHAxICE9PSBwMiAmJiBwMS54ID09PSBwMi54ICYmIHAxLnkgPT09IHAyLnkpIHtcclxuICAgICAgICAgIHBvaW50cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICBpIC09IDE7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIGVkZ2VzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldEFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIGBwb2ludHNgIGJlZm9yZSBhcHBseWluZyB0aGUgYGFuZ2xlYCByb3RhdGlvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0T2Zmc2V0KG9mZnNldDogVmVjdG9yKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZXMgdGhpcyBQb2x5Z29uIGNvdW50ZXItY2xvY2t3aXNlIGFyb3VuZCB0aGUgb3JpZ2luIG9mICppdHMgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgYW5nbGVgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyByb3RhdGlvbikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBvZmZzZXRgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyB0cmFuc2xhdGlvbilcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgaG9yaXpvbnRhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHBvaW50c1tpXS54ICs9IHg7XHJcbiAgICAgIHBvaW50c1tpXS55ICs9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlcyB0aGUgY2FsY3VsYXRlZCBjb2xsaXNpb24gUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBUaGlzIGFwcGxpZXMgdGhlIGBhbmdsZWAgYW5kIGBvZmZzZXRgIHRvIHRoZSBvcmlnaW5hbCBwb2ludHMgdGhlbiByZWNhbGN1bGF0ZXMgdGhlIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBjb2xsaXNpb24gUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlY2FsYygpOiBQb2x5Z29uIHtcclxuICAgIC8vIENhbGN1bGF0ZWQgcG9pbnRzIC0gdGhpcyBpcyB3aGF0IGlzIHVzZWQgZm9yIHVuZGVybHlpbmcgY29sbGlzaW9ucyBhbmQgdGFrZXMgaW50byBhY2NvdW50XHJcbiAgICAvLyB0aGUgYW5nbGUvb2Zmc2V0IHNldCBvbiB0aGUgcG9seWdvbi5cclxuICAgIGNvbnN0IGNhbGNQb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcblxyXG4gICAgLy8gVGhlIGVkZ2VzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlIHRvXHJcbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XHJcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IGVkZ2VzID0gdGhpcy5lZGdlcztcclxuXHJcbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxyXG4gICAgLy8gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhbiBlZGdlIG5vcm1hbCwgeW91IG11c3QgZmlyc3RcclxuICAgIC8vIHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgY29uc3Qgbm9ybWFscyA9IHRoaXMubm9ybWFscztcclxuXHJcbiAgICAvLyBDb3B5IHRoZSBvcmlnaW5hbCBwb2ludHMgYXJyYXkgYW5kIGFwcGx5IHRoZSBvZmZzZXQvYW5nbGVcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGU7XHJcblxyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIGxldCBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBjYWxjUG9pbnQgPSBjYWxjUG9pbnRzW2ldLmNvcHkocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIGNhbGNQb2ludC54ICs9IG9mZnNldC54O1xyXG4gICAgICBjYWxjUG9pbnQueSArPSBvZmZzZXQueTtcclxuXHJcbiAgICAgIGlmIChhbmdsZSAhPT0gMCkgY2FsY1BvaW50LnJvdGF0ZShhbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBlZGdlcy9ub3JtYWxzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgcDEgPSBjYWxjUG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPCBsZW4gLSAxID8gY2FsY1BvaW50c1tpICsgMV0gOiBjYWxjUG9pbnRzWzBdO1xyXG5cclxuICAgICAgY29uc3QgZSA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XHJcblxyXG4gICAgICBub3JtYWxzW2ldLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveC5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb25zdHJ1Y3RpbmcgdGhlIEFBQkIuXHJcbiAgICogXHJcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBQb2x5Z29uYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyBBQUJCLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRBQUJCKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIGxldCB4TWluID0gcG9pbnRzWzBdLng7XHJcbiAgICBsZXQgeU1pbiA9IHBvaW50c1swXS55O1xyXG5cclxuICAgIGxldCB4TWF4ID0gcG9pbnRzWzBdLng7XHJcbiAgICBsZXQgeU1heCA9IHBvaW50c1swXS55O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHBvaW50ID0gcG9pbnRzW2ldO1xyXG5cclxuICAgICAgaWYgKHBvaW50LnggPCB4TWluKSB4TWluID0gcG9pbnQueDtcclxuICAgICAgZWxzZSBpZiAocG9pbnQueCA+IHhNYXgpIHhNYXggPSBwb2ludC54O1xyXG5cclxuICAgICAgaWYgKHBvaW50LnkgPCB5TWluKSB5TWluID0gcG9pbnQueTtcclxuICAgICAgZWxzZSBpZiAocG9pbnQueSA+IHlNYXgpIHlNYXggPSBwb2ludC55O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQm94KHRoaXMucG9zLmNsb25lKCkuYWRkKG5ldyBWZWN0b3IoeE1pbiwgeU1pbikpLCB4TWF4IC0geE1pbiwgeU1heCAtIHlNaW4pLnRvUG9seWdvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgY2VudHJvaWQgKGdlb21ldHJpYyBjZW50ZXIpIG9mIHRoZSBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbXB1dGluZyB0aGUgY2VudHJvaWQuXHJcbiAgICogXHJcbiAgICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NlbnRyb2lkI0NlbnRyb2lkX29mX2FfcG9seWdvblxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgVmVjdG9yYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIGEgVmVjdG9yIHRoYXQgY29udGFpbnMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBjZW50cm9pZC5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q2VudHJvaWQoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgbGV0IGN4ID0gMDtcclxuICAgIGxldCBjeSA9IDA7XHJcbiAgICBsZXQgYXIgPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgcDEgPSBwb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyID0gaSA9PT0gbGVuIC0gMSA/IHBvaW50c1swXSA6IHBvaW50c1tpICsgMV07IC8vIExvb3AgYXJvdW5kIGlmIGxhc3QgcG9pbnRcclxuXHJcbiAgICAgIGNvbnN0IGEgPSBwMS54ICogcDIueSAtIHAyLnggKiBwMS55O1xyXG5cclxuICAgICAgY3ggKz0gKHAxLnggKyBwMi54KSAqIGE7XHJcbiAgICAgIGN5ICs9IChwMS55ICsgcDIueSkgKiBhO1xyXG4gICAgICBhciArPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIGFyID0gYXIgKiAzOyAvLyB3ZSB3YW50IDEgLyA2IHRoZSBhcmVhIGFuZCB3ZSBjdXJyZW50bHkgaGF2ZSAyKmFyZWFcclxuICAgIGN4ID0gY3ggLyBhcjtcclxuICAgIGN5ID0gY3kgLyBhcjtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoY3gsIGN5KTtcclxuICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuXHJcbi8qKlxyXG4gKiAjIyBSZXNwb25zZVxyXG4gKiBcclxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIGFuIGludGVyc2VjdGlvbi4gQ29udGFpbnM6XHJcbiAqIC0gVGhlIHR3byBvYmplY3RzIHBhcnRpY2lwYXRpbmcgaW4gdGhlIGludGVyc2VjdGlvblxyXG4gKiAtIFRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZSBvZiB0aGUgb3ZlcmxhcClcclxuICogLSBXaGV0aGVyIHRoZSBmaXJzdCBvYmplY3QgaXMgZW50aXJlbHkgaW5zaWRlIHRoZSBzZWNvbmQsIGFuZCB2aWNlIHZlcnNhLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2Uge1xyXG4gIHB1YmxpYyBhOiBhbnkgPSBudWxsO1xyXG4gIHB1YmxpYyBiOiBhbnkgPSBudWxsO1xyXG4gIHB1YmxpYyBvdmVybGFwTiA9IG5ldyBWZWN0b3IoKTtcclxuICBwdWJsaWMgb3ZlcmxhcFYgPSBuZXcgVmVjdG9yKCk7XHJcblxyXG4gIHB1YmxpYyBhSW5COiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgYkluQTogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIG92ZXJsYXA6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy5cclxuICAgKiBcclxuICAgKiBDYWxsIHRoaXMgYmV0d2VlbiB0ZXN0cyBpZiB5b3UgYXJlIGdvaW5nIHRvIHJldXNlIGEgc2luZ2xlIFJlc3BvbnNlIG9iamVjdCBmb3IgbXVsdGlwbGUgaW50ZXJzZWN0aW9uIHRlc3RzIChyZWNvbW1lbmRlZCBhcyBpdCB3aWxsIGF2b2lkIGFsbGNhdGluZyBleHRyYSBtZW1vcnkpXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Jlc3BvbnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbGVhcigpOiBSZXNwb25zZSB7XHJcbiAgICB0aGlzLmFJbkIgPSB0cnVlO1xyXG4gICAgdGhpcy5iSW5BID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufSIsIi8qIVxyXG4qIHNhdC1qcyAob3IgU0FULmpzKSBtYWRlIGJ5IEppbSBSaWVja2VuIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuKiBNb2RpZmllZCBieSBSb2JlcnQgQ29ycG9ub2kgYW5kIG1lIChTb25vUEcpXHJcbiogQ2hhbmdlcyBtYWRlIGJ5IG1lOiBCdWcgZml4ZXMgYW5kIGNvbnZlcnNpb24gdG8gVHlwZVNjcmlwdFxyXG4qL1xyXG5cclxuaW1wb3J0IEJveCBmcm9tICcuL0JveCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vQ2lyY2xlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xyXG5cclxuLyoqXHJcbiAqICMjIE9iamVjdCBQb29sc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHBvb2wgb2YgYFZlY3RvciBvYmplY3RzIHRoYXQgYXJlIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmcgbWVtb3J5LlxyXG4gKiBcclxuICogQHR5cGUge0FycmF5PFZlY3Rvcj59XHJcbiAqL1xyXG4gY29uc3QgVF9WRUNUT1JTOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIFRfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiBcclxuIC8qKlxyXG4gICogQSBwb29sIG9mIGFycmF5cyBvZiBudW1iZXJzIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmcgbWVtb3J5LlxyXG4gICogXHJcbiAgKiBAdHlwZSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59XHJcbiAgKi9cclxuIGNvbnN0IFRfQVJSQVlTOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIFRfQVJSQVlTLnB1c2goW10pO1xyXG4gXHJcblxyXG4vKipcclxuICogVGVtcG9yYXJ5IHJlc3BvbnNlIHVzZWQgZm9yIFBvbHlnb24gaGl0IGRldGVjdGlvbi5cclxuICogXHJcbiAqIEB0eXBlIHtSZXNwb25zZX1cclxuICovXHJcbmNvbnN0IFRfUkVTUE9OU0UgPSBuZXcgUmVzcG9uc2UoKTtcclxuXHJcbi8qKlxyXG4gKiBUaW55IFwicG9pbnRcIiBQb2x5Z29uIHVzZWQgZm9yIFBvbHlnb24gaGl0IGRldGVjdGlvbi5cclxuICogXHJcbiAqIEB0eXBlIHtQb2x5Z29ufVxyXG4gKi9cclxuY29uc3QgVEVTVF9QT0lOVCA9IG5ldyBCb3gobmV3IFZlY3RvcigpLCAwLjAwMDAwMSwgMC4wMDAwMDEpLnRvUG9seWdvbigpO1xyXG5cclxuLyoqXHJcbiAqICMjIENvbnN0YW50cyBmb3IgVm9yb25vaSByZWdpb25zLlxyXG4gKi9cclxuY29uc3QgTEVGVF9WT1JPTk9JX1JFR0lPTiA9IC0xO1xyXG5jb25zdCBNSURETEVfVk9ST05PSV9SRUdJT04gPSAwO1xyXG5jb25zdCBSSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XHJcblxyXG4vKipcclxuICogIyMgSGVscGVyIEZ1bmN0aW9uc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyByZXN1bHRpbmcgaW4gYSBvbmUgZGltZW5zaW9uc2xcclxuICogcmFuZ2Ugb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgb24gdGhhdCBheGlzLlxyXG4gKiBcclxuICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgVGhlIHBvaW50cyB0byBmbGF0dGVuLlxyXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbm9ybWFsIFRoZSB1bml0IHZlY3RvciBheGlzIHRvIGZsYXR0ZW4gb24uXHJcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLCByZXN1bHRbMV0gd2lsbCBiZSB0aGUgbWF4aW11bSB2YWx1ZS5cclxuICovXHJcbmZ1bmN0aW9uIGZsYXR0ZW5Qb2ludHNPbihwb2ludHM6IEFycmF5PFZlY3Rvcj4sIG5vcm1hbDogVmVjdG9yLCByZXN1bHQ6IEFycmF5PG51bWJlcj4pOiB2b2lkIHtcclxuICBsZXQgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICBsZXQgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbC5cclxuICAgIGNvbnN0IGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcclxuXHJcbiAgICBpZiAoZG90IDwgbWluKSBtaW4gPSBkb3Q7XHJcbiAgICBpZiAoZG90ID4gbWF4KSBtYXggPSBkb3Q7XHJcbiAgfVxyXG5cclxuICByZXN1bHRbMF0gPSBtaW47XHJcbiAgcmVzdWx0WzFdID0gbWF4O1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxyXG4gKiBcclxuICogSXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggdGhlIGxpbmUgYW5kIHRoZSBwb2ludCBhcmUgcmVsYXRpdmUgdG8gYCgwLDApYFxyXG4gKiBcclxuICogICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XHJcbiAqICAgICAgKC0xKSAgW1NdLS0tLS0tLS0tLS0tLS1bRV0gICgxKVxyXG4gKiAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiBcclxuICogQHBhcmFtIHtWZWN0b3J9IGxpbmUgVGhlIGxpbmUgc2VnbWVudC5cclxuICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cclxuICogQHJldHVybiB7bnVtYmVyfSBMRUZUX1ZPUk9OT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIE1JRERMRV9WT1JPTk9JX1JFR0lPTiAoMCkgaWYgaXQgaXMgdGhlIG1pZGRsZSByZWdpb24sXHJcbiAqICAgICAgICAgICAgICAgICAgUklHSFRfVk9ST05PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiB2b3Jvbm9pUmVnaW9uKGxpbmU6IFZlY3RvciwgcG9pbnQ6IFZlY3Rvcik6IG51bWJlciB7XHJcbiAgY29uc3QgbGVuMiA9IGxpbmUubGVuMigpO1xyXG4gIGNvbnN0IGRwID0gcG9pbnQuZG90KGxpbmUpO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIGxlZnQgdm9yb25vaSByZWdpb24uXHJcbiAgaWYgKGRwIDwgMCkgcmV0dXJuIExFRlRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIHJpZ2h0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGVsc2UgaWYgKGRwID4gbGVuMikgcmV0dXJuIFJJR0hUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBPdGhlcndpc2UsIGl0J3MgaW4gdGhlIG1pZGRsZSBvbmUuXHJcbiAgZWxzZSByZXR1cm4gTUlERExFX1ZPUk9OT0lfUkVHSU9OO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTQVQge1xyXG4gIC8qKlxyXG4gICAqIENoZWNrIHdoZXRoZXIgdHdvIGNvbnZleCBwb2x5Z29ucyBhcmUgc2VwYXJhdGVkIGJ5IHRoZSBzcGVjaWZpZWQgYXhpcyAobXVzdCBiZSBhIHVuaXQgdmVjdG9yKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYVBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IGFQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IGJQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIGF4aXMgKHVuaXQgc2l6ZWQpIHRvIHRlc3QgYWdhaW5zdC4gIFRoZSBwb2ludHMgb2YgYm90aCBwb2x5Z29ucyB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgQSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpdCBpcyBhIHNlcGFyYXRpbmcgYXhpcywgZmFsc2Ugb3RoZXJ3aXNlLiAgSWYgZmFsc2UsIGFuZCBhIHJlc3BvbnNlIGlzIHBhc3NlZCBpbiwgaW5mb3JtYXRpb24gYWJvdXQgaG93IG11Y2ggb3ZlcmxhcCBhbmQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgb3ZlcmxhcCB3aWxsIGJlIHBvcHVsYXRlZC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzU2VwYXJhdGluZ0F4aXMoYVBvczogVmVjdG9yLCBiUG9zOiBWZWN0b3IsIGFQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGJQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGF4aXM6IFZlY3RvciwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmFuZ2VBID0gVF9BUlJBWVMucG9wKCkhO1xyXG4gICAgY29uc3QgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCkhO1xyXG4gIFxyXG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIHR3byBwb2x5Z29uc1xyXG4gICAgY29uc3Qgb2Zmc2V0ViA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShiUG9zKS5zdWIoYVBvcyk7XHJcbiAgICBjb25zdCBwcm9qZWN0ZWRPZmZzZXQgPSBvZmZzZXRWLmRvdChheGlzKTtcclxuICBcclxuICAgIC8vIFByb2plY3QgdGhlIHBvbHlnb25zIG9udG8gdGhlIGF4aXMuXHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYVBvaW50cywgYXhpcywgcmFuZ2VBKTtcclxuICAgIGZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xyXG4gIFxyXG4gICAgLy8gTW92ZSBCJ3MgcmFuZ2UgdG8gaXRzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIEEuXHJcbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcclxuICBcclxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgZ2FwLiBJZiB0aGVyZSBpcywgdGhpcyBpcyBhIHNlcGFyYXRpbmcgYXhpcyBhbmQgd2UgY2FuIHN0b3BcclxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG4gIFxyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBUaGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy4gSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuICBcclxuICAgICAgLy8gQSBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQlxyXG4gICAgICBpZiAocmFuZ2VBWzBdIDwgcmFuZ2VCWzBdKSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYUluQiA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEEgZW5kcyBiZWZvcmUgQiBkb2VzLiBXZSBoYXZlIHRvIHB1bGwgQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBCIGlzIGZ1bGx5IGluc2lkZSBBLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEIgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgLy8gQiBlbmRzIGJlZm9yZSBBIGVuZHMuIFdlIGhhdmUgdG8gcHVzaCBBIG91dCBvZiBCXHJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA+IHJhbmdlQlsxXSkge1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVswXSAtIHJhbmdlQlsxXTtcclxuICBcclxuICAgICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICAgICAgICAgIC8vIEEgaXMgZnVsbHkgaW5zaWRlIEIuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcclxuICBcclxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3QgYW1vdW50IG9mIG92ZXJsYXAgd2UndmUgc2VlbiBzbyBmYXIsIHNldCBpdCBhcyB0aGUgbWluaW11bSBvdmVybGFwLlxyXG4gICAgICBjb25zdCBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XHJcbiAgXHJcbiAgICAgIGlmIChhYnNPdmVybGFwIDwgcmVzcG9uc2Uub3ZlcmxhcCkge1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBhYnNPdmVybGFwO1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLmNvcHkoYXhpcyk7XHJcbiAgXHJcbiAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG4gIFxyXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG4gIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogIyMgQ29sbGlzaW9uIFRlc3RzXHJcbiAgICovXHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjIFRoZSBjaXJjbGUgdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwb2ludEluQ2lyY2xlKHA6IFZlY3RvciwgYzogQ2lyY2xlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShwKS5zdWIoYy5wb3MpLnN1YihjLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzU3EgPSBjLnIgKiBjLnI7XHJcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBpcyBzbWFsbGVyIHRoYW4gdGhlIHJhZGl1cyB0aGVuIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZS5cclxuICAgIHJldHVybiBkaXN0YW5jZVNxIDw9IHJhZGl1c1NxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjb252ZXggcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHkgVGhlIHBvbHlnb24gdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24gb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJblBvbHlnb24ocDogVmVjdG9yLCBwb2x5OiBQb2x5Z29uKTogYm9vbGVhbiB7XHJcbiAgICBURVNUX1BPSU5ULnBvcy5jb3B5KHApO1xyXG4gICAgVF9SRVNQT05TRS5jbGVhcigpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25Qb2x5Z29uKFRFU1RfUE9JTlQsIHBvbHksIFRfUkVTUE9OU0UpO1xyXG5cclxuICAgIGlmIChyZXN1bHQpIHJlc3VsdCA9IFRfUkVTUE9OU0UuYUluQjtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdHdvIGNpcmNsZXMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBiIFRoZSBzZWNvbmQgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RDaXJjbGVDaXJjbGUoYTogQ2lyY2xlLCBiOiBDaXJjbGUsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXJzIG9mIHRoZSB0d28gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYi5wb3MpLmFkZChiLm9mZnNldCkuc3ViKGEucG9zKS5zdWIoYS5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzID0gYS5yICsgYi5yO1xyXG4gICAgY29uc3QgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XHJcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyBiaWdnZXIgdGhhbiB0aGUgY29tYmluZWQgcmFkaXVzLCB0aGV5IGRvbid0IGludGVyc2VjdC5cclxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhleSBpbnRlcnNlY3QuICBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSBhO1xyXG4gICAgICByZXNwb25zZS5iID0gYjtcclxuXHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSB0b3RhbFJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLmNvcHkoZGlmZmVyZW5jZVYubm9ybWFsaXplKCkpO1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KGRpZmZlcmVuY2VWKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSBhLnIgPD0gYi5yICYmIGRpc3QgPD0gYi5yIC0gYS5yO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYi5yIDw9IGEuciAmJiBkaXN0IDw9IGEuciAtIGIucjtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvbHlnb24gYW5kIGEgY2lyY2xlIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbjogUG9seWdvbiwgY2lyY2xlOiBDaXJjbGUsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgcG9seWdvbi5cclxuICAgIGNvbnN0IGNpcmNsZVBvcyA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShjaXJjbGUucG9zKS5hZGQoY2lyY2xlLm9mZnNldCkuc3ViKHBvbHlnb24ucG9zKTtcclxuXHJcbiAgICBjb25zdCByYWRpdXMgPSBjaXJjbGUucjtcclxuICAgIGNvbnN0IHJhZGl1czIgPSByYWRpdXMgKiByYWRpdXM7XHJcblxyXG4gICAgY29uc3QgcG9pbnRzID0gcG9seWdvbi5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBlZGdlID0gVF9WRUNUT1JTLnBvcCgpITtcclxuICAgIGNvbnN0IHBvaW50ID0gVF9WRUNUT1JTLnBvcCgpITtcclxuXHJcbiAgICAvLyBGb3IgZWFjaCBlZGdlIGluIHRoZSBwb2x5Z29uOlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBuZXh0ID0gaSA9PT0gbGVuIC0gMSA/IDAgOiBpICsgMTtcclxuICAgICAgY29uc3QgcHJldiA9IGkgPT09IDAgPyBsZW4gLSAxIDogaSAtIDE7XHJcblxyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgICAgIGxldCBvdmVybGFwTiA9IG51bGw7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGVkZ2UuXHJcbiAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW2ldKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBlZGdlLlxyXG4gICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tpXSk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgYW5kIHRoZSBwb2ludCBpcyBiaWdnZXIgdGhhbiB0aGUgcmFkaXVzLCB0aGUgcG9seWdvbiBpcyBkZWZpbml0ZWx5IG5vdCBmdWxseSBpbiB0aGUgY2lyY2xlLlxyXG4gICAgICBpZiAocmVzcG9uc2UgJiYgcG9pbnQubGVuMigpID4gcmFkaXVzMikgcmVzcG9uc2UuYUluQiA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIFZvcm9ub2kgcmVnaW9uIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBpbi5cclxuICAgICAgbGV0IHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgLy8gSWYgaXQncyB0aGUgbGVmdCByZWdpb246XHJcbiAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbcHJldl0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxyXG4gICAgICAgIGNvbnN0IHBvaW50MiA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xyXG5cclxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50Mik7XHJcblxyXG4gICAgICAgIGlmIChyZWdpb24gPT09IFJJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XHJcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBsZWZ0IHJlZ2lvbiBvbiB0aGUgbmV4dCBlZGdlXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbbmV4dF0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgbmV4dCBlZGdlLlxyXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpdCdzIHRoZSBtaWRkbGUgcmVnaW9uOlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgaWYgdGhlIGNpcmNsZSBpcyBpbnRlcnNlY3RpbmcgdGhlIGVkZ2UsIGNoYW5nZSB0aGUgZWRnZSBpbnRvIGl0cyBcImVkZ2Ugbm9ybWFsXCIuXHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gZWRnZS5wZXJwKCkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIHBlcnBlbmRpY3VsYXIgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgYW5kIHRoZSBlZGdlLlxyXG4gICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5kb3Qobm9ybWFsKTtcclxuICAgICAgICBjb25zdCBkaXN0QWJzID0gTWF0aC5hYnMoZGlzdCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIHRoZXJlIGlzIG5vIGludGVyc2VjdGlvbi5cclxuICAgICAgICBpZiAoZGlzdCA+IDAgJiYgZGlzdEFicyA+IHJhZGl1cykge1xyXG4gICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxyXG4gICAgICAgICAgaWYgKGRpc3QgPj0gMCB8fCBvdmVybGFwIDwgMiAqIHJhZGl1cykgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3Qgb3ZlcmxhcCB3ZSd2ZSBzZWVuLCBrZWVwIGl0LlxyXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cclxuICAgICAgaWYgKG92ZXJsYXBOICYmIHJlc3BvbnNlICYmIE1hdGguYWJzKG92ZXJsYXApIDwgTWF0aC5hYnMocmVzcG9uc2Uub3ZlcmxhcCkpIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gb3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KG92ZXJsYXBOKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IgLSBiYXNlZCBvbiB0aGUgc21hbGxlc3Qgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gcG9seWdvbjtcclxuICAgICAgcmVzcG9uc2UuYiA9IGNpcmNsZTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkocmVzcG9uc2Uub3ZlcmxhcE4pLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xyXG4gICAgfVxyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cclxuICAgKiBcclxuICAgKiAqKk5PVEU6KiogVGhpcyBpcyBzbGlnaHRseSBsZXNzIGVmZmljaWVudCB0aGFuIHBvbHlnb25DaXJjbGUgYXMgaXQganVzdCBydW5zIHBvbHlnb25DaXJjbGUgYW5kIHJldmVyc2VzIGV2ZXJ5dGhpbmdcclxuICAgKiBhdCB0aGUgZW5kLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZTogQ2lyY2xlLCBwb2x5Z29uOiBQb2x5Z29uLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cclxuICAgIGNvbnN0IHJlc3VsdCA9IFNBVC50ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIHJlc3BvbnNlKSB7XHJcbiAgICAgIC8vIFN3YXAgQSBhbmQgQiBpbiB0aGUgcmVzcG9uc2UuXHJcbiAgICAgIGNvbnN0IGEgPSByZXNwb25zZS5hO1xyXG4gICAgICBjb25zdCBhSW5CID0gcmVzcG9uc2UuYUluQjtcclxuXHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLnJldmVyc2UoKTtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYSA9IHJlc3BvbnNlLmI7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBhO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYUluQiA9IHJlc3BvbnNlLmJJbkE7XHJcbiAgICAgIHJlc3BvbnNlLmJJbkEgPSBhSW5CO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3Mgd2hldGhlciBwb2x5Z29ucyBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGIgVGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0UG9seWdvblBvbHlnb24oYTogUG9seWdvbiwgYjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgYVBvaW50cyA9IGEuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGFMZW4gPSBhUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBiUG9pbnRzID0gYi5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYkxlbiA9IGJQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGEubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQiBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiTGVuOyBpKyspIHtcclxuICAgICAgaWYgKFNBVC5pc1NlcGFyYXRpbmdBeGlzKGEucG9zLCBiLnBvcywgYVBvaW50cywgYlBvaW50cywgYi5ub3JtYWxzW2ldLCByZXNwb25zZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5jZSBub25lIG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBvciBCIGFyZSBhIHNlcGFyYXRpbmcgYXhpcywgdGhlcmUgaXMgYW4gaW50ZXJzZWN0aW9uXHJcbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHJlc3BvbnNlLmEgPSBhO1xyXG4gICAgICByZXNwb25zZS5iID0gYjtcclxuXHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkocmVzcG9uc2Uub3ZlcmxhcE4pLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSIsIi8qKlxyXG4gKiAjIyBWZWN0b3JcclxuICogXHJcbiAqIFJlcHJlc2VudHMgYSB2ZWN0b3IgaW4gdHdvIGRpbWVuc2lvbnMgd2l0aCBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzLlxyXG4gKiBcclxuICogQ3JlYXRlIGEgbmV3IFZlY3Rvciwgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgeGAgYW5kIGB5YCBjb29yZGluYXRlcy4gSWYgYSBjb29yZGluYXRlIGlzIG5vdCBzcGVjaWZpZWQsIFxyXG4gKiBpdCB3aWxsIGJlIHNldCB0byBgMGAuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xyXG4gIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyBWZWN0b3IuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbm90aGVyIFZlY3RvciBpbnRvIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGNvcHkob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLnggPSBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBWZWN0b3Igd2l0aCB0aGUgc2FtZSBjb29yZGluYXRlcyBhcyB0aGUgb25lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFRoZSBuZXcgY2xvbmVkIFZlY3Rvci5cclxuICAgKi9cclxuICBwdWJsaWMgY2xvbmUoKTogVmVjdG9yIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSB0aGlzIFZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS5cclxuICAgKiBcclxuICAgKiBFZmZlY3RpdmVseSB0aGlzIHJvdGF0ZXMgaXQgOTAgZGVncmVlcyBpbiBhIGNsb2Nrd2lzZSBkaXJlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcGVycCgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuXHJcbiAgICB0aGlzLnggPSB0aGlzLnk7XHJcbiAgICB0aGlzLnkgPSAteDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZSB0aGlzIFZlY3RvciAoY291bnRlci1jbG9ja3dpc2UpIGJ5IHRoZSBzcGVjaWZpZWQgYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgY29uc3QgeSA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3MoYW5nbGUpIC0geSAqIE1hdGguc2luKGFuZ2xlKTtcclxuICAgIHRoaXMueSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2ZXJzZSB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXZlcnNlKCk6IFZlY3RvciB7XHJcbiAgICB0aGlzLnggPSAtdGhpcy54O1xyXG4gICAgdGhpcy55ID0gLXRoaXMueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5vcm1hbGl6ZSB0aGlzIHZlY3RvciAobWFrZSBpdCBoYXZlIGEgbGVuZ3RoIG9mIGAxYCkuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgbm9ybWFsaXplKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBkID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICBpZiAoZCA+IDApIHtcclxuICAgICAgdGhpcy54ID0gdGhpcy54IC8gZDtcclxuICAgICAgdGhpcy55ID0gdGhpcy55IC8gZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbm90aGVyIFZlY3RvciB0byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGQob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLnggKz0gb3RoZXIueDtcclxuICAgIHRoaXMueSArPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3QgYW5vdGhlciBWZWN0b3IgZnJvbSB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdWIob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLnggLT0gb3RoZXIueDtcclxuICAgIHRoaXMueSAtPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2NhbGUgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQW4gaW5kZXBlbmRlbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHdpbGwgc2NhbGVcclxuICAgKiBib3RoIGB4YCBhbmQgYHlgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5XSBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHkgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNjYWxlKHg6IG51bWJlciwgeT86IG51bWJlcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLnggKj0geDtcclxuICAgIHRoaXMueSAqPSB0eXBlb2YgeSAhPSAndW5kZWZpbmVkJyA/IHkgOiB4O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvamVjdCB0aGlzIFZlY3RvciBvbnRvIGFub3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgYW10ID0gdGhpcy5kb3Qob3RoZXIpIC8gb3RoZXIubGVuMigpO1xyXG5cclxuICAgIHRoaXMueCA9IGFtdCAqIG90aGVyLng7XHJcbiAgICB0aGlzLnkgPSBhbXQgKiBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvamVjdCB0aGlzIFZlY3RvciBvbnRvIGEgVmVjdG9yIG9mIHVuaXQgbGVuZ3RoLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcHJvamVjdGAgd2hlbiBkZWFsaW5nIHdpdGggdW5pdCB2ZWN0b3JzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdW5pdCB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHByb2plY3ROKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgYW10ID0gdGhpcy5kb3Qob3RoZXIpO1xyXG5cclxuICAgIHRoaXMueCA9IGFtdCAqIG90aGVyLng7XHJcbiAgICB0aGlzLnkgPSBhbXQgKiBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWZsZWN0KGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgY29uc3QgeSA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWZsZWN0TihheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcclxuXHJcbiAgICB0aGlzLnggLT0geDtcclxuICAgIHRoaXMueSAtPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIFZlY3RvciBhbmQgYW5vdGhlci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBkb3QgdGhpcyBvbmUgYWdhaW5zdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGRvdCBwcm9kdWN0LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBkb3Qob3RoZXI6IFZlY3Rvcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgc3F1YXJlZCBsZW5ndGguXHJcbiAgICovXHJcbiAgcHVibGljIGxlbjIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbGVuZ3RoIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW4yKCkpO1xyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBJbWFnZUxpc3Qge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSU1BR0VTOiBIVE1MSW1hZ2VFbGVtZW50W10gfCB1bmRlZmluZWQgPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlZ2lzdGVyKHNyYzogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgSW1hZ2VMaXN0LklNQUdFUyEucHVzaChpbWcpO1xyXG4gICAgICAgIHJldHVybiBpbWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBUSUxFTUFQX01BU1RFUjogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3RpbGVNYXN0ZXIucG5nXCIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBTUElLRTogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwclNwaWtlLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQlJPQ0NPTEk6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9iZ0Jyb2Njb2xpLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgS1VNT19QTEFURk9STTogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3Nwckt1bW9QbGF0Zm9ybS5wbmdcIik7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZRVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByUGxheWVyLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR09SRTogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJHb3JlLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQlVMTEVUOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJ1bGxldC5wbmdcIik7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHQU1FT1ZFUjogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gICAgcHVibGljIHNvdXJjZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIHc6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOiBIVE1MSW1hZ2VFbGVtZW50LCB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgIHRoaXMuaCA9IGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU3ByaXRlcyB7XHJcbiAgICBleHBvcnQgY29uc3QgRmFsbGluZ0Jsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDMyLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEdyYXNzRmFsbGluZ0Jsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMCwgMzIsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgQnJvY2NvbGk6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkJST0NDT0xJLCAwLCAwLCAxMTEsIDE3NSk7XHJcbiAgICBleHBvcnQgY29uc3QgS3JhaWRnaWVmQnJvY2NvbGk6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkJST0NDT0xJLCAxMTIsIDAsIDExMSwgMTc1KTtcclxuICAgIGV4cG9ydCBjb25zdCBCaWdCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDAsIDE3NSwgMjEzLCAzMzEpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlVXA6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlUmlnaHQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAzMiwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZURvd246IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA2NCwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZUxlZnQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA5NiwgMCwgMzIsIDMyKTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgQ2xvdWQ6IFNwcml0ZVtdID0gW25ldyBTcHJpdGUoSW1hZ2VMaXN0LktVTU9fUExBVEZPUk0sIDAsIDAsIDExMiwgMzIpLCBuZXcgU3ByaXRlKEltYWdlTGlzdC5LVU1PX1BMQVRGT1JNLCAxMTIsIDAsIDExMiwgMzIpXTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNvbnN0IERlYXRoTWVzc2FnZTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuR0FNRU9WRVIsIDAsIDAsIDgwMCwgMTg4KTtcclxufSIsImltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCB7IElEaXNwb3NhYmxlLCBJbnN0YW5jZUZhYnJpYyB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY0xldmVsIGltcGxlbWVudHMgSURpc3Bvc2FibGUsIEluc3RhbmNlRmFicmljPEJhc2ljTGV2ZWw+IHtcclxuICAgIHB1YmxpYyBvYmplY3RzOiBBcnJheTxCYXNpY09iamVjdD4gPSBbXTtcclxuICAgIHByb3RlY3RlZCByZW1vdmVRdWV1ZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMucmVtb3ZlUXVldWUubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbb10uaWQgPT0gdGhpcy5yZW1vdmVRdWV1ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tvXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShvLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbmRlcmluZ1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5kcmF3KGN0eCwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZS5ERUJVRykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdDb2xsaXNpb25MaW5lcyhjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlT2JqZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnB1c2goaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1JlbW92ZWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVF1ZXVlLmluZGV4T2YoaWQpICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0NvbGxpc2lvbkxpbmVzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludHM6IFZlY3RvcltdID0gdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9pbnRzO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgPSAxOyBwIDwgcG9pbnRzLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzW3BdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzW3BdLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLm9iamVjdHNbaV0uY29sbGlzaW9uID8gJyNmZjAwMDAnIDogJyMwMDAwZmYnO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUodGhpcy5vYmplY3RzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1swXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBpbnN0YW50aWF0ZSgpOiBCYXNpY0xldmVsO1xyXG59IiwiaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vQXVkaW9NYW5hZ2VyXCI7XHJcbmltcG9ydCBGYWtlUGxheWVyT2JqZWN0IGZyb20gXCIuLi9vYmplY3RzL3BsYXllci9GYWtlUGxheWVyT2JqZWN0XCI7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCwgQW5pbWF0ZWRTcHJpdGVPYmplY3QgfSBmcm9tIFwiLi4vb2JqZWN0cy9TcHJpdGVPYmplY3RcIjtcclxuaW1wb3J0IFRpbGVPYmplY3QgZnJvbSBcIi4uL29iamVjdHMvVGlsZU9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVzIH0gZnJvbSBcIi4uL1Nwcml0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSBcIi4vQmFzaWNMZXZlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2F2ZVNlbGVjdE1lbnUgZXh0ZW5kcyBCYXNpY0xldmVsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc2Nyb2xsVmVsOiBudW1iZXIgPSA3NTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvc2F2ZXNlbGVjdC5vZ2dcIik7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3Jhc3NcIiwgMCwgMTcsIDI2LCAxLCBbU3ByaXRlcy5HcmFzc0ZhbGxpbmdCbG9ja10pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyb3VuZFwiLCAwLCAxOCwgMjYsIDEsIFtTcHJpdGVzLkZhbGxpbmdCbG9ja10pKTtcclxuXHJcbiAgICAgICAgLy8gVHJlZXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwidHJlZVwiICsgaSwgTWF0aC5yYW5kb20oKSAqIDgwMCwgMzY5LCAxMTEsIDE3NSwgU3ByaXRlcy5Ccm9jY29saSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvdWRzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEFuaW1hdGVkU3ByaXRlT2JqZWN0KFwiY2xvdWRcIiArIGksIE1hdGgucmFuZG9tKCkgKiA4MDAsIDEwICsgTWF0aC5yYW5kb20oKSAqIDMwMCwgMTEyLCAzMiwgU3ByaXRlcy5DbG91ZCwgMC41KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgRmFrZVBsYXllck9iamVjdCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC02NClcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ID0gMDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMzIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArPSAzMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC0xMTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9IDg1MCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDk7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IC09IFNhdmVTZWxlY3RNZW51LnNjcm9sbFZlbCAqIGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMTEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9IDg1MCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ID0gMTAgKyBNYXRoLnJhbmRvbSgpICogMzAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjQzREN0Y3XCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDgwMCwgNjA4KTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjODgzOTFFXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDYwOCAtIDY0LCA4MDAsIDY0KTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGN0eCwgZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW50aWF0ZSgpOiBCYXNpY0xldmVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNhdmVTZWxlY3RNZW51KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzaWNMZXZlbCBmcm9tICcuL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4uL29iamVjdHMvcGxheWVyL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9vYmplY3RzL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tICcuLi9BdWRpb01hbmFnZXInO1xyXG5pbXBvcnQgVGlsZU9iamVjdCBmcm9tICcuLi9vYmplY3RzL1RpbGVPYmplY3QnO1xyXG5pbXBvcnQgeyBTcHJpdGVzIH0gZnJvbSAnLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RMZXZlbCBleHRlbmRzIEJhc2ljTGV2ZWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2JlZ2lucy5vZ2dcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFBsYXllck9iamVjdCgzMiwgNTEyKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJncm91bmQwXCIsIDAsIDE4LCAyNSwgMSwgW1Nwcml0ZXMuRmFsbGluZ0Jsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDBcIiwgOCwgMTQsIDEsIDQsIFtTcHJpdGVzLkZhbGxpbmdCbG9ja10pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcIndhbGwxXCIsIDksIDEyLCAxLCA2LCBbU3ByaXRlcy5GYWxsaW5nQmxvY2tdKSk7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMFwiLCAzMjAsIDQxNiwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMVwiLCAzMjAsIDM4NCwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMlwiLCAyODgsIDM1MiwgMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW50aWF0ZSgpOiBCYXNpY0xldmVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3RMZXZlbCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCB7IElEaXNwb3NhYmxlIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2ljT2JqZWN0IGltcGxlbWVudHMgSURpc3Bvc2FibGUge1xyXG4gICAgcHVibGljIHBvbHlnb246IFBvbHlnb247XHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICBpZiAodyA9PSAwICYmIGggPT0gMCkgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3RvcigwLCBoKSxcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcih3LCBoKSwgbmV3IFZlY3Rvcih3LCAwKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2xsOiBib29sZWFuID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCAmJiBiQ29sbCAmJiB0aGlzLmNvbGxpc2lvbikgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHt9XHJcbn0iLCJpbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4vU3ByaXRlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBTcHJpdGUsIFNwcml0ZXMgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBlbnVtIFNwaWtlRGlyZWN0aW9uIHtcclxuICAgIFVwLCBSaWdodCwgRG93biwgTGVmdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZU9iamVjdCBleHRlbmRzIFNwcml0ZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbiA9IDApIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBTcGlrZU9iamVjdC5nZXREaXJTcHJpdGUoZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5MZWZ0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDE2KSwgbmV3IFZlY3RvcigzMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5Eb3duOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDE2LCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNwaWtlRGlyZWN0aW9uLlJpZ2h0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMTYpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDE2LCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDMxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkge1xyXG4gICAgICAgICAgICAob2JqIGFzIFBsYXllck9iamVjdCkuZGllKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpclNwcml0ZShkaXI6IFNwaWtlRGlyZWN0aW9uKTogU3ByaXRlIHtcclxuICAgICAgICBjb25zdCBzcGlrZURpclNwcml0ZXM6IFNwcml0ZVtdID0gW1Nwcml0ZXMuU3Bpa2VVcCwgU3ByaXRlcy5TcGlrZVJpZ2h0LCBTcHJpdGVzLlNwaWtlRG93biwgU3ByaXRlcy5TcGlrZUxlZnRdO1xyXG4gICAgICAgIHJldHVybiBzcGlrZURpclNwcml0ZXNbZGlyXTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZTogU3ByaXRlKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLnNvdXJjZSwgdGhpcy5zcHJpdGUueCwgdGhpcy5zcHJpdGUueSwgdGhpcy5zcHJpdGUudywgdGhpcy5zcHJpdGUuaCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGVkU3ByaXRlT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHNwcml0ZXM6IFNwcml0ZVtdO1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYW5pbUR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGZyYW1lVGltZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBzcHJpdGVzOiBTcHJpdGVbXSwgYW5pbUR1cmF0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgdywgaCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gc3ByaXRlcztcclxuICAgICAgICB0aGlzLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XHJcbiAgICAgICAgdGhpcy5hbmltRHVyYXRpb24gPSBhbmltRHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gKHRoaXMuZnJhbWVUaW1lciArIGRlbHRhKSAlIHRoaXMuYW5pbUR1cmF0aW9uO1xyXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lciAqIHRoaXMuc3ByaXRlcy5sZW5ndGggLyB0aGlzLmFuaW1EdXJhdGlvbik7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZXNbaV0uc291cmNlLCB0aGlzLnNwcml0ZXNbaV0ueCwgdGhpcy5zcHJpdGVzW2ldLnksIHRoaXMuc3ByaXRlc1tpXS53LCB0aGlzLnNwcml0ZXNbaV0uaCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tIFwiLi9CYXNpY09iamVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHNwcml0ZUxpc3Q6IFNwcml0ZVtdO1xyXG4gICAgcHVibGljIHhSZXBlYXQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5UmVwZWF0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGlsZVdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgcHVibGljIG9yZGVyOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB4UmVwZWF0OiBudW1iZXIsIHlSZXBlYXQ6IG51bWJlciwgc3ByaXRlczogU3ByaXRlW10sIG9yZGVyPzogbnVtYmVyW10sIHRpbGVXaWR0aDogbnVtYmVyID0gc3ByaXRlc1swXS53LCB0aWxlSGVpZ2h0OiBudW1iZXIgPSBzcHJpdGVzWzBdLmgpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHhSZXBlYXQgKiB0aWxlV2lkdGgsIHlSZXBlYXQgKiB0aWxlSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnhSZXBlYXQgPSB4UmVwZWF0O1xyXG4gICAgICAgIHRoaXMueVJlcGVhdCA9IHlSZXBlYXQ7XHJcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aWxlV2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gdGlsZUhlaWdodDtcclxuICAgICAgICB0aGlzLnNwcml0ZUxpc3QgPSBzcHJpdGVzO1xyXG4gICAgICAgIGlmIChvcmRlciAhPT0gdW5kZWZpbmVkKSB0aGlzLm9yZGVyID0gb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnhSZXBlYXQgKiB0aGlzLnlSZXBlYXQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3ByaXRlOiBTcHJpdGUgPSB0aGlzLnNwcml0ZUxpc3RbaSA8IHRoaXMub3JkZXIubGVuZ3RoID8gdGhpcy5vcmRlcltpXSA6IDBdO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZS5zb3VyY2UsIHNwcml0ZS54LCBzcHJpdGUueSwgc3ByaXRlLncsIHNwcml0ZS5oLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy54ICsgKGkgJSB0aGlzLnhSZXBlYXQpICogdGhpcy50aWxlV2lkdGgsIHRoaXMucG9seWdvbi5wb3MueSArIE1hdGguZmxvb3IoaSAvIHRoaXMueFJlcGVhdCkgKiB0aGlzLnRpbGVIZWlnaHQsIHRoaXMudGlsZVdpZHRoLCB0aGlzLnRpbGVIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9vZFBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0dWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMiwgMik7XHJcbiAgICAgICAgdGhpcy5keCA9IGR4O1xyXG4gICAgICAgIHRoaXMuZHkgPSBkeTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0dWNrKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIGRlbHRhO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zdHVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgdGhpcy50eXBlICogMywgMzQsIDMsIDQsIHRoaXMucG9seWdvbi5wb3MueCAtIDEsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDMsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldE9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHByb3RlY3RlZCBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggLSA1LCB5IC0gMSwgMTAsIDIpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMuZGlyZWN0aW9uICogNzUwICogZGVsdGEsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZSArPSBkZWx0YTtcclxuICAgICAgICB3aGlsZSAodGhpcy5mcmFtZVRpbWUgPj0gMC4yMCkgdGhpcy5mcmFtZVRpbWUgLT0gMC4yMDtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5CVUxMRVQsIE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWUgLyAwLjEwKSAqIDQsIDAsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDMsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDQsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4uLy4uL0dhbWVcIjtcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tIFwiLi9QbGF5ZXJPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZha2VQbGF5ZXJPYmplY3QgZXh0ZW5kcyBQbGF5ZXJPYmplY3Qge1xyXG4gICAgcHVibGljIHNlbGVjdGVkU2F2ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAxMTIsIHk6IG51bWJlciA9IDUxMiwgaWQ6IHN0cmluZyA9IFwiZmFrZV9wbGF5ZXJcIikge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIGlkKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZHggPSBOdW1iZXIuRVBTSUxPTjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ0Fycm93UmlnaHQnKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWdodEtleVRpbWUrKyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2F2ZSA9ICh0aGlzLnNlbGVjdGVkU2F2ZSArIDEpICUgMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZWZ0S2V5VGltZSsrID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTYXZlID0gKHRoaXMuc2VsZWN0ZWRTYXZlIC0gMSArIDMpICUgMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ3gnKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9vdEtleVRpbWUrKyA9PSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xyXG4gICAgICAgIH0gZWxzZSB0aGlzLnNob290S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1bXBLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIEdhbWUubG9hZFNhdmUodGhpcy5zZWxlY3RlZFNhdmUpO1xyXG4gICAgICAgIH0gZWxzZSB0aGlzLmp1bXBLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldFBvcyA9IDExMiArIHRoaXMuc2VsZWN0ZWRTYXZlICogMzIgKiA4O1xyXG4gICAgICAgIGxldCBkeCA9IE1hdGgubWluKE1hdGguYWJzKHRoaXMucG9seWdvbi5wb3MueCAtIHRhcmdldFBvcyksIFBsYXllck9iamVjdC52ZWxvY2l0eSAqIDQgKiBkZWx0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5wb2x5Z29uLnBvcy54ID4gdGFyZ2V0UG9zID8gLWR4IDogZHgsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaWUoKTogdm9pZCB7fVxyXG59IiwiaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBJbWFnZUxpc3QgfSBmcm9tICcuLi8uLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2liUGFydGljbGUgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBib2R5VmFyaWFudDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlIDA6IGJvZHksXHJcbiAgICAgKiB0eXBlIDE6IGJvZHkgc3RvbmVkLFxyXG4gICAgICogdHlwZSAyOiBoZWFkLFxyXG4gICAgICogdHlwZSAzOiBoZWFkIHN0b25lZCxcclxuICAgICAqIHR5cGUgNDogYXJtLFxyXG4gICAgICogdHlwZSA1OiBhcm0gc3RvbmVkLFxyXG4gICAgICogdHlwZSA2OiBmZWV0LFxyXG4gICAgICogdHlwZSA3OiBmZWV0IHN0b25lZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgdHlwZTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDgsIDgpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMCB8fCB0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHlWYXJpYW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogTWF0aC5taW4oZGVsdGEsIDAuMyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRoaXNBQUJCOiBQb2x5Z29uID0gdGhpcy5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9ianRBQUJCOiBQb2x5Z29uID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24uZ2V0QUFCQigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzQUFCQi5wb3MueSArIHRoaXNBQUJCLnBvaW50c1syXS55IDw9IG9ianRBQUJCLnBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXNBQUJCLnBvcy55ID49IG9ianRBQUJCLnBvcy55ICsgb2JqdEFBQkIucG9pbnRzWzJdLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keSAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR4ICo9IC0wLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCB8fCBvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgdGhpcy5ib2R5VmFyaWFudCAqIDIsIDAsIDIsIDksIHRoaXMucG9seWdvbi5wb3MueCArIDQsIHRoaXMucG9seWdvbi5wb3MueSwgMiwgOSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgdGhpcy5ib2R5VmFyaWFudCAqIDIsIDksIDIsIDksIHRoaXMucG9seWdvbi5wb3MueCArIDQsIHRoaXMucG9seWdvbi5wb3MueSwgMiwgOSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgMCwgMTgsIDEwLCAxNiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDEwLCAxNik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgMTAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDIwLCAxOCwgOCwgOCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDgsIDgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDI4LCAxOCwgOCwgOCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDgsIDgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDM2LCAxOCwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgMzYsIDIyLCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAyLCB0aGlzLnBvbHlnb24ucG9zLnkgKyA0LCA0LCA0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEJ1bGxldE9iamVjdCBmcm9tICcuL0J1bGxldE9iamVjdCc7XHJcbmltcG9ydCB7IHJhbmRvbVVuc2VjdXJlVVVJRCwgYnVmZmVyRHJhd0ltYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvQ29tbW9uVXRpbHMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmxvb2RQYXJ0aWNsZSBmcm9tICcuL0Jsb29kUGFydGljbGUnO1xyXG5pbXBvcnQgR2liUGFydGljbGUgZnJvbSAnLi9HaWJQYXJ0aWNsZSc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgeyBJbWFnZUxpc3QsIFNwcml0ZXMgfSBmcm9tICcuLi8uLi9TcHJpdGVNYW5hZ2VyJztcclxuaW1wb3J0IHsgU3ByaXRlT2JqZWN0IH0gZnJvbSAnLi4vU3ByaXRlT2JqZWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB2ZWxvY2l0eTogbnVtYmVyID0gMTc1O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBncmF2aXR5OiBudW1iZXIgPSAyNDtcclxuXHJcbiAgICBwdWJsaWMgZnJhbWVUaW1lcjogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsb29raW5nRGlyZWN0aW9uOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIHB1YmxpYyByaWdodEtleVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbGVmdEtleVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMganVtcEtleVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2hvb3RLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBvbkdyb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGF2YWlsYWJsZUp1bXBzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBpZDogc3RyaW5nID0gXCJwbGF5ZXJcIikge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCAzMiwgMzIpO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcig5LCAxMSksIG5ldyBWZWN0b3IoOSwgMzIpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDIzLCAzMiksIG5ldyBWZWN0b3IoMjMsIDExKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoKEdhbWUuaXNCdXR0b25Eb3duKCdTaGlmdCcpIHx8IEdhbWUuaXNCdXR0b25Eb3duKCd6JykpICYmICh0aGlzLmF2YWlsYWJsZUp1bXBzICE9IDAgfHwgdGhpcy5qdW1wS2V5VGltZSAhPSAwKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVKdW1wcyA9PSAxKSBBdWRpb01hbmFnZXIucGxheShcImp1bXAxXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMS53YXZcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIEF1ZGlvTWFuYWdlci5wbGF5KFwianVtcDJcIiwgXCJhc3NldHMvc291bmRzL2p1bXAyLndhdlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmp1bXBLZXlUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA8IDAuMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgdGhpcy5keSA9IC0yMjAgKiBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5keSA9IC0xODAgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmp1bXBLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHggIT0gMCkgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gTWF0aC5zaWduKHRoaXMuZHgpO1xyXG4gICAgICAgIHRoaXMuZHkgPSBNYXRoLm1heChNYXRoLm1pbih0aGlzLmR5LCAxMC42NjYpLCAtMTAuNjY2KTtcclxuICAgICAgICBsZXQgcHJldmlvdXNQb3M6IFZlY3RvciA9IChuZXcgVmVjdG9yKCkpLmNvcHkodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgdGhpcy5vbkdyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keSA+IDAgJiYgdGhpcy5wb2x5Z29uLnBvcy55ID09IHByZXZpb3VzUG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9uIGdyb3VuZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5vbkdyb3VuZCAmJiB0aGlzLmF2YWlsYWJsZUp1bXBzID4gMSkgdGhpcy5hdmFpbGFibGVKdW1wcyA9IDE7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG9vdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYnVsbGV0SWQ6IHN0cmluZyA9IFwiYnVsbGV0XCIgKyByYW5kb21VbnNlY3VyZVVVSUQoKTtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheShidWxsZXRJZCwgXCJhc3NldHMvc291bmRzL2ZpcmUud2F2XCIpLm9uZW5kZWQgPSBlID0+IHsgQXVkaW9NYW5hZ2VyLnJlbGVhc2UoYnVsbGV0SWQpOyB9O1xyXG4gICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgQnVsbGV0T2JqZWN0KHRoaXMucG9seWdvbi5wb3MueCArIDE2ICsgMTAgKiB0aGlzLmxvb2tpbmdEaXJlY3Rpb24sIHRoaXMucG9seWdvbi5wb3MueSArIDIxLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uLCBidWxsZXRJZFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lLmxldmVsLmlzUmVtb3ZlZCh0aGlzLmlkKSkgcmV0dXJuO1xyXG4gICAgICAgIEdhbWUubGV2ZWwucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIGxldCBjZW50ZXI6IFZlY3RvciA9IHRoaXMucG9seWdvbi5nZXRDZW50cm9pZCgpLmFkZCh0aGlzLnBvbHlnb24ucG9zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyODsgaSsrKSB7XHJcbiAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBCbG9vZFBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogNiwgTWF0aC5zaW4oTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYmxvb2RfXCIgKyB0aGlzLmlkICsgXCJfXCIgKyBpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgKGkgPiAzID8gMiA6IDEpOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBHaWJQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCwgTWF0aC5zaW4oTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLCBcImdpYl9cIiArIHRoaXMuaWQgKyBcIl9cIiArIChpICsgbylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvZ2FtZW92ZXIub2dnXCIsIGZhbHNlKTtcclxuICAgICAgICBsZXQgZGVhdGhNZXNzYWdlOiBTcHJpdGVPYmplY3QgPSBuZXcgU3ByaXRlT2JqZWN0KFwiZGVhdGhfbWVzc2FnZVwiLCA0MDAgLSAzNTAsIDMwNCAtIDgyLCA3MDAsIDE2NCwgU3ByaXRlcy5EZWF0aE1lc3NhZ2UpO1xyXG4gICAgICAgIGRlYXRoTWVzc2FnZS5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChkZWF0aE1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gKHRoaXMuZnJhbWVUaW1lciArIGRlbHRhKSAlIDAuNDA7XHJcbiAgICAgICAgbGV0IGZyYW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lciAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgLy8gSnVtcGluZ1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjAyKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAwLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDQpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIDMyLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIChmcmFtZSAlIDIpICogMzIgKyA2NCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgKGZyYW1lICUgMikgKiAzMiwgOTYsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gUnVubmluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCBmcmFtZSAqIDMyLCAzMiwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJZGxlXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIGZyYW1lICogMzIsIDAsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIFVVSUQuIFRoZSBJRCBtaWdodCBub3QgYmUgdW5pcXVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuc2VjdXJlVVVJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICd4eHh4LXh4eHgteHh4LXh4eHgnLnJlcGxhY2UoL1t4XS9nLCAoYykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTsgIFxyXG4gICAgICAgIHJldHVybiByLnRvU3RyaW5nKDE2KTsgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGJ1ZmZlckNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1ZmZlci1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmNvbnN0IGJ1ZmZlckN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKCgpID0+IHtcclxuICAgIGxldCBjdHggPSBidWZmZXJDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcclxuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBjdHg7XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogRHJhd3MgYW4gaW1hZ2UgdG8gdGhlIChjbGVhbmVkKSBidWZmZXIgY2FudmFzIGFuZCByZXR1cm5zIHRoZSBjYW52YXMgaXRzZWxmLiBDYW4gYmUgdXNlZCB0byBkcmF3IGEgcGFydCBvZiBhbiBpbWFnZSB0byB0aGUgbWFpbiBjYW52YXMgd2l0aG91dCB0cmFuc2Zvcm0tY2F1c2VkIGFydGlmYWN0cy5cclxuICogQHBhcmFtIGltYWdlIGFuIGVsZW1lbnQgdG8gZHJhdyBpbnRvIHRoZSBjb250ZXh0LlxyXG4gKiBAcGFyYW0gc3ggeC1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3kgeS1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3cgd2lkdGggb2YgdGhlIHNvdXJjZSBpbWFnZSByZWdpb24gdG8gZHJhd1xyXG4gKiBAcGFyYW0gc2ggaGVpZ2h0IG9mIHRoZSBzb3VyY2UgaW1hZ2UgcmVnaW9uIHRvIGRyYXdcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyRHJhd0ltYWdlKGltYWdlOiBDYW52YXNJbWFnZVNvdXJjZSwgc3g6IG51bWJlciwgc3k6IG51bWJlciwgc3c6IG51bWJlciwgc2g6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHtcclxuICAgIGJ1ZmZlckNhbnZhcy53aWR0aCA9IHN3O1xyXG4gICAgYnVmZmVyQ2FudmFzLmhlaWdodCA9IHNoO1xyXG4gICAgYnVmZmVyQ3R4LmNsZWFyUmVjdCgwLCAwLCBidWZmZXJDYW52YXMud2lkdGgsIGJ1ZmZlckNhbnZhcy5oZWlnaHQpO1xyXG4gICAgYnVmZmVyQ3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzdywgc2gsIDAsIDAsIHN3LCBzaCk7XHJcbiAgICByZXR1cm4gYnVmZmVyQ2FudmFzO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiFcclxuKiBJIFdhbm5hIEJlIFRoZSBHdXk6IFRoZSBNb3ZpZTogVGhlIEdhbWVcclxuKiBUeXBlU2NyaXB0IHJlbWFrZSBtYWRlIGJ5IFBHZ2FtZXIyIChha2EgU29ub1BHKS5cclxuKiBZb3UgY2FuIGZpbmQgdGhlIHNvdXJjZSBjb2RlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9QR2dhbWVyMi9JV0JURy50c1xyXG4qIE9yaWdpbmFsIGdhbWUgbWFkZSBieSBLYXlpbjogaHR0cHM6Ly9rYXlpbi5tb2UvaXdidGcvXHJcbiovXHJcblxyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gXCIuL0F1ZGlvTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5mdW5jdGlvbiBmcmFtZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKVxyXG4gICAgICAgIEdhbWUudXBkYXRlKHRpbWVzdGFtcCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxufVxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxuXHJcbm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgdHJ1ZSk7XHJcbiAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXgoKTtcclxufTtcclxub25rZXl1cCA9IGZ1bmN0aW9uKGUpIHsgR2FtZS5rZXlNYXAuc2V0KGUua2V5Lmxlbmd0aCA9PSAxID8gZS5rZXkudG9Mb3dlckNhc2UoKSA6IGUua2V5LCBmYWxzZSk7IH07Il0sIm5hbWVzIjpbIlNwcml0ZXMiLCJTcGlrZURpcmVjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=