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
      this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__["default"]("tree" + i, Math.random() * 800, 369, 111, 175, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Broccoli));
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
class SpikeObject extends _SpriteObject__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
/* harmony export */   "default": () => (/* binding */ SpriteObject)
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

/***/ "./src/objects/player/DeathMessage.ts"
/*!********************************************!*\
  !*** ./src/objects/player/DeathMessage.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeathMessage)
/* harmony export */ });
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");
/* harmony import */ var _SpriteObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SpriteObject */ "./src/objects/SpriteObject.ts");


class DeathMessage extends _SpriteObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super("death_message", 400 - 350, 304 - 82, 700, 164, _SpriteManager__WEBPACK_IMPORTED_MODULE_0__.Sprites.DeathMessage);
    this.collision = false;
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
/* harmony import */ var _DeathMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DeathMessage */ "./src/objects/player/DeathMessage.ts");
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");











const _PlayerObject = class _PlayerObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x, y, id = "player") {
    super(id, x, y, 32, 32);
    this.frameTime = 0;
    this.lookingDirection = 1;
    this.rightKeyTime = 0;
    this.leftKeyTime = 0;
    this.jumpKeyTime = 0;
    this.shootKeyTime = 0;
    this.dx = 0;
    this.dy = 1;
    this.onGround = false;
    this.availableJumps = 0;
    this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_9__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
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
        if (this.availableJumps == 1) _AudioManager__WEBPACK_IMPORTED_MODULE_8__["default"].play("jump1", "assets/sounds/jump1.wav");
        else _AudioManager__WEBPACK_IMPORTED_MODULE_8__["default"].play("jump2", "assets/sounds/jump2.wav");
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
    _AudioManager__WEBPACK_IMPORTED_MODULE_8__["default"].play(bulletId, "assets/sounds/fire.wav").onended = (e) => {
      _AudioManager__WEBPACK_IMPORTED_MODULE_8__["default"].release(bulletId);
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
    _AudioManager__WEBPACK_IMPORTED_MODULE_8__["default"].playMusic("assets/music/gameover.ogg", false);
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(new _DeathMessage__WEBPACK_IMPORTED_MODULE_7__["default"]());
  }
  draw(ctx, delta) {
    this.frameTime += delta;
    while (this.frameTime >= 0.4) this.frameTime -= 0.4;
    let frame = Math.floor(this.frameTime / 0.1);
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
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, 0, 64, 32, 32), 0, 0, 32, 32);
      } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, 32, 64, 32, 32), 0, 0, 32, 32);
      } else {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, frame % 2 * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
      }
    } else if (!this.onGround) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, frame % 2 * 32, 96, 32, 32), 0, 0, 32, 32);
    } else if (this.dx != 0) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, frame * 32, 32, 32, 32), 0, 0, 32, 32);
    } else {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_10__.ImageList.PLAYER, frame * 32, 0, 32, 32), 0, 0, 32, 32);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQzVCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBLEU7OztVQ1BBLHlGOzs7VUNBQTtVQUNBO1VBQ0Esc0RBQXNELGlCQUFpQjtVQUN2RSxnREFBZ0QsYUFBYTtVQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPMEM7QUFDaEI7QUFFMUIsU0FBUyxNQUFNLFdBQWdDO0FBQzNDLE1BQUksQ0FBQyxTQUFTO0FBQ1YsaURBQUksQ0FBQyxPQUFPLFNBQVM7QUFDekIsU0FBTyxzQkFBc0IsS0FBSztBQUN0QztBQUNBLE9BQU8sc0JBQXNCLEtBQUs7QUFFbEMsWUFBWSxTQUFTLEdBQUc7QUFDcEIsK0NBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLFVBQVUsSUFBSSxFQUFFLElBQUksWUFBWSxJQUFJLEVBQUUsS0FBSyxJQUFJO0FBQ3JFLHVEQUFZLENBQUMsWUFBWTtBQUM3QjtBQUNBLFVBQVUsU0FBUyxHQUFHO0FBQUUsK0NBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLFVBQVUsSUFBSSxFQUFFLElBQUksWUFBWSxJQUFJLEVBQUUsS0FBSyxLQUFLO0FBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXVkaW9NYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9DYW1lcmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9Cb3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9Qb2x5Z29uLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9TQVQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Nwcml0ZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9CYXNpY0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvU2F2ZVNlbGVjdE1lbnUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9UZXN0TGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvQmFzaWNPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvU3Bpa2VPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvU3ByaXRlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1RpbGVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Jsb29kUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0J1bGxldE9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvRGVhdGhNZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9GYWtlUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9HaWJQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21tb25VdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb01hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBhdWRpb01hcDogTWFwPHN0cmluZywgSFRNTEF1ZGlvRWxlbWVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5KGtleTogc3RyaW5nLCBzcmM/OiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgdm9sdW1lOiBudW1iZXIgPSAxLjApOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgfCB1bmRlZmluZWQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmMgPT09IHVuZGVmaW5lZCkgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxuICAgICAgICBlbHNlIGF1ZGlvID0gbmV3IEF1ZGlvKHNyYyk7XHJcbiAgICAgICAgYXVkaW8ubG9vcCA9IGxvb3A7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sdW1lO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5zZXQoa2V5LCBhdWRpbyk7XHJcbiAgICAgICAgYXVkaW8ub25jYW5wbGF5ID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGF1ZGlvIS5wbGF5KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8hLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBhdWRpbyEubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXVkaW8hLm9uY2FucGxheSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlNdXNpYyhzcmM6IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IHRydWUpOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgfCB1bmRlZmluZWQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KFwiX211c2ljXCIpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkICYmICFhdWRpby5zcmMuZW5kc1dpdGgoc3JjKSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucmVsZWFzZShcIl9tdXNpY1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEF1ZGlvTWFuYWdlci5wbGF5KFwiX211c2ljXCIsIHNyYywgbG9vcCwgMC43NSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwYXVzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChBdWRpb01hbmFnZXIucGF1c2Uoa2V5KSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXV0b1BsYXlGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBhdXRvUGxheUZpeCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlRyeWluZyB0byBmaXggYXV0b3BsYXkuLi5cIik7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLm11dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwiX211c2ljXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2l6ZVg6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc2l6ZVk6IG51bWJlciA9IDE7XHJcbn0iLCJpbXBvcnQgQmFzaWNMZXZlbCBmcm9tICcuL2xldmVscy9CYXNpY0xldmVsJztcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmltcG9ydCBTYXZlU2VsZWN0TWVudSBmcm9tICcuL2xldmVscy9TYXZlU2VsZWN0TWVudSc7XHJcbmltcG9ydCBUZXN0TGV2ZWwgZnJvbSAnLi9sZXZlbHMvVGVzdExldmVsJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFQlVHOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIHN0YXRpYyBsYXN0VGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsZXZlbDogQmFzaWNMZXZlbCA9IG5ldyBTYXZlU2VsZWN0TWVudSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBjYW1lcmE6IENhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleU1hcDogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNQdXNoaW5nUmVsb2FkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1cGRhdGUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICAgICAgR2FtZS5ERUJVRyA9IEdhbWUuaXNCdXR0b25Eb3duKFwiRjJcIik7XHJcbiAgICAgICAgLy8gUmVzaXplIGtlZXBpbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgbGV0IHBhZ2VBc3BlY3RSYXRpbyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBNYXRoLmZsb29yKDI1IC8gMTkgPCBwYWdlQXNwZWN0UmF0aW8gPyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAvIDE5IDogZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIDI1KTtcclxuXHRcdGlmICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNjcmV0ZS1zY2FsZS1jaGVja2JveFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKVxyXG5cdFx0XHRzY2FsZSA9IE1hdGgubWF4KDEgPDwgKDMxIC0gTWF0aC5jbHozMihzY2FsZSkpLCAxKTtcdC8vIFNldCBzY2FsZSB0byBhIHBvd2VyIG9mIHR3b1xyXG4gICAgICAgIEdhbWUuY2FudmFzLndpZHRoID0gc2NhbGUgKiAyNTtcclxuICAgICAgICBHYW1lLmNhbnZhcy5oZWlnaHQgPSBzY2FsZSAqIDE5O1xyXG4gICAgICAgIC8vIEdldCBjb250ZXh0IGFuZCBjbGVhclxyXG4gICAgICAgIGxldCBjdHggPSBHYW1lLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikhO1xyXG4gICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIEdhbWUuY2FudmFzLndpZHRoLCBHYW1lLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW1lcmEueCwgR2FtZS5jYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZShHYW1lLmNhbWVyYS5hbmdsZSk7XHJcbiAgICAgICAgY3R4LnNjYWxlKEdhbWUuY2FtZXJhLnNpemVYICogKEdhbWUuY2FudmFzLndpZHRoIC8gODAwKSwgR2FtZS5jYW1lcmEuc2l6ZVkgKiAoR2FtZS5jYW52YXMuaGVpZ2h0IC8gNjA4KSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC51cGRhdGUoY3R4LCAodGltZXN0YW1wIC0gR2FtZS5sYXN0VGltZXN0YW1wKSAvIDEwMDApO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubGV2ZWwuaW5zdGFudGlhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNhdmUoc2F2ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sZXZlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBUZXN0TGV2ZWwoKTsgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0J1dHRvbkRvd24oa2V5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGtleU5hbWUubGVuZ3RoID09IDEpIGtleU5hbWUgPSBrZXlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUua2V5TWFwLmdldChrZXlOYW1lKSA/PyBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiAjIyBCb3hcclxuICogXHJcbiAqIFJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCwgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgdzogbnVtYmVyO1xyXG4gIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgQm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXHJcbiAgICogYmUgc2V0IHRvIGAwYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1uZXcgVmVjdG9yKCldIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MF0gVGhlIHdpZHRoIG9mIHRoZSBCb3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdIFRoZSBoZWlnaHQgb2YgdGhlIEJveC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHcgPSAwLCBoID0gMCkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLncgPSB3O1xyXG4gICAgdGhpcy5oID0gaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBQb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIEJveC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBCb3guXHJcbiAgICovXHJcbiAgcHVibGljIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zO1xyXG4gICAgY29uc3QgdyA9IHRoaXMudztcclxuICAgIGNvbnN0IGggPSB0aGlzLmg7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zLngsIHBvcy55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IoMCwgaClcclxuICAgIF0pO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuXHJcbi8qKlxyXG4gKiAjIyBQb2x5Z29uXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpLlxyXG4gKiBcclxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcclxuICogc2V0dGVycy4gT3RoZXJ3aXNlIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgdXBkYXRlZCBjb3JyZWN0bHkuXHJcbiAqIFxyXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIG9mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBlZGdlczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZCBieSB2ZWN0b3JzIFxyXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9VmVjdG9yXSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBbcG9pbnRzPVtdXSBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgY29uc3QgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzLnBvaW50cyB8fCB0aGlzLnBvaW50cy5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgbGV0IGk7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XHJcbiAgICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XHJcblxyXG4gICAgICAgIGlmIChwMSAhPT0gcDIgJiYgcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55KSB7XHJcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjUG9pbnRzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZWNhbGMoKTogUG9seWdvbiB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjYWxjUG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcblxyXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcclxuICAgICAgY2FsY1BvaW50LnkgKz0gb2Zmc2V0Lnk7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGUgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xyXG5cclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBBQUJCLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgQUFCQi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICBsZXQgeE1pbiA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW4gPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heCA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNYXggPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludC54IDwgeE1pbikgeE1pbiA9IHBvaW50Lng7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnggPiB4TWF4KSB4TWF4ID0gcG9pbnQueDtcclxuXHJcbiAgICAgIGlmIChwb2ludC55IDwgeU1pbikgeU1pbiA9IHBvaW50Lnk7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnkgPiB5TWF4KSB5TWF4ID0gcG9pbnQueTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLnBvcy5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldENlbnRyb2lkKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBjeCA9IDA7XHJcbiAgICBsZXQgY3kgPSAwO1xyXG4gICAgbGV0IGFyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XHJcblxyXG4gICAgICBjb25zdCBhID0gcDEueCAqIHAyLnkgLSBwMi54ICogcDEueTtcclxuXHJcbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xyXG4gICAgICBjeSArPSAocDEueSArIHAyLnkpICogYTtcclxuICAgICAgYXIgKz0gYTtcclxuICAgIH1cclxuXHJcbiAgICBhciA9IGFyICogMzsgLy8gd2Ugd2FudCAxIC8gNiB0aGUgYXJlYSBhbmQgd2UgY3VycmVudGx5IGhhdmUgMiphcmVhXHJcbiAgICBjeCA9IGN4IC8gYXI7XHJcbiAgICBjeSA9IGN5IC8gYXI7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogIyMgUmVzcG9uc2VcclxuICogXHJcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcclxuICBwdWJsaWMgYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgYjogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIG92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGJJbkE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBvdmVybGFwOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXIoKTogUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iLCIvKiFcclxuKiBzYXQtanMgKG9yIFNBVC5qcykgbWFkZSBieSBKaW0gUmllY2tlbiBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxyXG4qIENoYW5nZXMgbWFkZSBieSBtZTogQnVnIGZpeGVzIGFuZCBjb252ZXJzaW9uIHRvIFR5cGVTY3JpcHRcclxuKi9cclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcclxuXHJcbi8qKlxyXG4gKiAjIyBPYmplY3QgUG9vbHNcclxuICovXHJcblxyXG4vKipcclxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICogXHJcbiAqIEB0eXBlIHtBcnJheTxWZWN0b3I+fVxyXG4gKi9cclxuIGNvbnN0IFRfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gXHJcbiAvKipcclxuICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAqIFxyXG4gICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICovXHJcbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBUX0FSUkFZUy5wdXNoKFtdKTtcclxuIFxyXG5cclxuLyoqXHJcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAqL1xyXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4vKipcclxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UG9seWdvbn1cclxuICovXHJcbmNvbnN0IFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbi8qKlxyXG4gKiAjIyBDb25zdGFudHMgZm9yIFZvcm9ub2kgcmVnaW9ucy5cclxuICovXHJcbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuY29uc3QgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuLyoqXHJcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XHJcblxyXG4gICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0WzBdID0gbWluO1xyXG4gIHJlc3VsdFsxXSA9IG1heDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICogXHJcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICogXHJcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpITtcclxuICBcclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcclxuICAgIGNvbnN0IG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICBcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG4gIFxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlLm92ZXJsYXApIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG4gIFxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJbkNpcmNsZShwOiBWZWN0b3IsIGM6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkocCkuc3ViKGMucG9zKS5zdWIoYy5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c1NxID0gYy5yICogYy5yO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5IFRoZSBwb2x5Z29uIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5Qb2x5Z29uKHA6IFZlY3RvciwgcG9seTogUG9seWdvbik6IGJvb2xlYW4ge1xyXG4gICAgVEVTVF9QT0lOVC5wb3MuY29weShwKTtcclxuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uUG9seWdvbihURVNUX1BPSU5ULCBwb2x5LCBUX1JFU1BPTlNFKTtcclxuXHJcbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFLmFJbkI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlQ2lyY2xlKGE6IENpcmNsZSwgYjogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvcykuc3ViKGEub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbFJhZGl1cyA9IGEuciArIGIucjtcclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXkgaW50ZXJzZWN0LiAgSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gYS5yIDw9IGIuciAmJiBkaXN0IDw9IGIuciAtIGEucjtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGIuciA8PSBhLnIgJiYgZGlzdCA8PSBhLnIgLSBiLnI7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlLnBvcykuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvcyk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG5cclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gICAgICBsZXQgb3ZlcmxhcE4gPSBudWxsO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxyXG4gICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tpXSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIGxldCByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxyXG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcclxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cclxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jvbm9pIHJlZ2lvbikuXHJcbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IG92ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IHBvbHlnb247XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXHJcbiAgICogYXQgdGhlIGVuZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICBjb25zdCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcclxuICAgICAgY29uc3QgYUluQiA9IHJlc3BvbnNlLmFJbkI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xyXG4gICAgICByZXNwb25zZS5iID0gYTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0iLCIvKipcclxuICogIyMgVmVjdG9yXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuICogXHJcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcclxuICogaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgIHRoaXMueSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy55O1xyXG4gICAgdGhpcy55ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLnkgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgIHRoaXMueSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlXHJcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICo9IHg7XHJcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBwdWJsaWMgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMaXN0IHtcclxuICAgIHByaXZhdGUgc3RhdGljIElNQUdFUzogSFRNTEltYWdlRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlcihzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIEltYWdlTGlzdC5JTUFHRVMhLnB1c2goaW1nKTtcclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVElMRU1BUF9NQVNURVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy90aWxlTWFzdGVyLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1BJS0U6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJTcGlrZS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJST0NDT0xJOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvYmdCcm9jY29saS5wbmdcIik7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZRVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByUGxheWVyLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR09SRTogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJHb3JlLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQlVMTEVUOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckJ1bGxldC5wbmdcIik7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHQU1FT1ZFUjogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gICAgcHVibGljIHNvdXJjZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIHc6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOiBIVE1MSW1hZ2VFbGVtZW50LCB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgIHRoaXMuaCA9IGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU3ByaXRlcyB7XHJcbiAgICBleHBvcnQgY29uc3QgRmFsbGluZ0Jsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDMyLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEdyYXNzRmFsbGluZ0Jsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMCwgMzIsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgQnJvY2NvbGk6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkJST0NDT0xJLCAwLCAwLCAxMTEsIDE3NSk7XHJcbiAgICBleHBvcnQgY29uc3QgS3JhaWRnaWVmQnJvY2NvbGk6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkJST0NDT0xJLCAxMTIsIDAsIDExMSwgMTc1KTtcclxuICAgIGV4cG9ydCBjb25zdCBCaWdCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDAsIDE3NSwgMjEzLCAzMzEpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlVXA6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlUmlnaHQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAzMiwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZURvd246IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA2NCwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZUxlZnQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA5NiwgMCwgMzIsIDMyKTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNvbnN0IERlYXRoTWVzc2FnZTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuR0FNRU9WRVIsIDAsIDAsIDgwMCwgMTg4KTtcclxufSIsImltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCB7IElEaXNwb3NhYmxlLCBJbnN0YW5jZUZhYnJpYyB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY0xldmVsIGltcGxlbWVudHMgSURpc3Bvc2FibGUsIEluc3RhbmNlRmFicmljPEJhc2ljTGV2ZWw+IHtcclxuICAgIHB1YmxpYyBvYmplY3RzOiBBcnJheTxCYXNpY09iamVjdD4gPSBbXTtcclxuICAgIHByb3RlY3RlZCByZW1vdmVRdWV1ZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMucmVtb3ZlUXVldWUubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbb10uaWQgPT0gdGhpcy5yZW1vdmVRdWV1ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tvXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZShvLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbmRlcmluZ1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5kcmF3KGN0eCwgZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZS5ERUJVRykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdDb2xsaXNpb25MaW5lcyhjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlT2JqZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVF1ZXVlLnB1c2goaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1JlbW92ZWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVF1ZXVlLmluZGV4T2YoaWQpICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0NvbGxpc2lvbkxpbmVzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludHM6IFZlY3RvcltdID0gdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9pbnRzO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgPSAxOyBwIDwgcG9pbnRzLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzW3BdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzW3BdLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbMF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLm9iamVjdHNbaV0uY29sbGlzaW9uID8gJyNmZjAwMDAnIDogJyMwMDAwZmYnO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUodGhpcy5vYmplY3RzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1swXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBpbnN0YW50aWF0ZSgpOiBCYXNpY0xldmVsO1xyXG59IiwiaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vQXVkaW9NYW5hZ2VyXCI7XHJcbmltcG9ydCBGYWtlUGxheWVyT2JqZWN0IGZyb20gXCIuLi9vYmplY3RzL3BsYXllci9GYWtlUGxheWVyT2JqZWN0XCI7XHJcbmltcG9ydCBTcHJpdGVPYmplY3QgZnJvbSBcIi4uL29iamVjdHMvU3ByaXRlT2JqZWN0XCI7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gXCIuLi9vYmplY3RzL1RpbGVPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlcyB9IGZyb20gXCIuLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNpY0xldmVsIGZyb20gXCIuL0Jhc2ljTGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhdmVTZWxlY3RNZW51IGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNjcm9sbFZlbDogbnVtYmVyID0gNzU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL3NhdmVzZWxlY3Qub2dnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyYXNzXCIsIDAsIDE3LCAyNiwgMSwgW1Nwcml0ZXMuR3Jhc3NGYWxsaW5nQmxvY2tdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJncm91bmRcIiwgMCwgMTgsIDI2LCAxLCBbU3ByaXRlcy5GYWxsaW5nQmxvY2tdKSk7XHJcblxyXG4gICAgICAgIC8vIFRyZWVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInRyZWVcIiArIGksIE1hdGgucmFuZG9tKCkgKiA4MDAsIDM2OSwgMTExLCAxNzUsIFNwcml0ZXMuQnJvY2NvbGkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsb3Vkc1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgRmFrZVBsYXllck9iamVjdCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC02NClcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ID0gMDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMzIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArPSAzMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC0xMTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9IDg1MCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNDNEQ3RjdcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgODAwLCA2MDgpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM4ODM5MUVcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgNjA4IC0gNjQsIDgwMCwgNjQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBzdXBlci51cGRhdGUoY3R4LCBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2F2ZVNlbGVjdE1lbnUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vQmFzaWNMZXZlbCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvVGlsZU9iamVjdCc7XHJcbmltcG9ydCB7IFNwcml0ZXMgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdExldmVsIGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvYmVnaW5zLm9nZ1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGxheWVyT2JqZWN0KDMyLCA1MTIpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyb3VuZDBcIiwgMCwgMTgsIDI1LCAxLCBbU3ByaXRlcy5GYWxsaW5nQmxvY2tdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ3YWxsMFwiLCA4LCAxNCwgMSwgNCwgW1Nwcml0ZXMuRmFsbGluZ0Jsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDFcIiwgOSwgMTIsIDEsIDYsIFtTcHJpdGVzLkZhbGxpbmdCbG9ja10pKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UwXCIsIDMyMCwgNDE2LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UxXCIsIDMyMCwgMzg0LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UyXCIsIDI4OCwgMzUyLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdExldmVsKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IHsgSURpc3Bvc2FibGUgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi9TQVQvU0FUJztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNPYmplY3QgaW1wbGVtZW50cyBJRGlzcG9zYWJsZSB7XHJcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbjtcclxuICAgIHB1YmxpYyBjb2xsaXNpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIGlmICh3ID09IDAgJiYgaCA9PSAwKSB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKDAsIGgpLFxyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKHcsIDApXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYkNvbGw6IGJvb2xlYW4gPSBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsICYmIGJDb2xsICYmIHRoaXMuY29sbGlzaW9uKSB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge31cclxufSIsImltcG9ydCBQb2x5Z29uIGZyb20gJy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IFNwcml0ZU9iamVjdCBmcm9tICcuL1Nwcml0ZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IHsgU3ByaXRlLCBTcHJpdGVzIH0gZnJvbSAnLi4vU3ByaXRlTWFuYWdlcic7XHJcblxyXG5leHBvcnQgY29uc3QgZW51bSBTcGlrZURpcmVjdGlvbiB7XHJcbiAgICBVcCwgUmlnaHQsIERvd24sIExlZnRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2VPYmplY3QgZXh0ZW5kcyBTcHJpdGVPYmplY3Qge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRpcmVjdGlvbjogU3Bpa2VEaXJlY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogU3Bpa2VEaXJlY3Rpb24gPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDMyLCAzMiwgU3Bpa2VPYmplY3QuZ2V0RGlyU3ByaXRlKGRpcmVjdGlvbikpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgU3Bpa2VEaXJlY3Rpb24uTGVmdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxNiksIG5ldyBWZWN0b3IoMzEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3Bpa2VEaXJlY3Rpb24uRG93bjpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxNiwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5SaWdodDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDE2KVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxNiwgMSksIG5ldyBWZWN0b3IoMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAzMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHtcclxuICAgICAgICAgICAgKG9iaiBhcyBQbGF5ZXJPYmplY3QpLmRpZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJTcHJpdGUoZGlyOiBTcGlrZURpcmVjdGlvbik6IFNwcml0ZSB7XHJcbiAgICAgICAgY29uc3Qgc3Bpa2VEaXJTcHJpdGVzOiBTcHJpdGVbXSA9IFtTcHJpdGVzLlNwaWtlVXAsIFNwcml0ZXMuU3Bpa2VSaWdodCwgU3ByaXRlcy5TcGlrZURvd24sIFNwcml0ZXMuU3Bpa2VMZWZ0XTtcclxuICAgICAgICByZXR1cm4gc3Bpa2VEaXJTcHJpdGVzW2Rpcl07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZTogU3ByaXRlKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLnNvdXJjZSwgdGhpcy5zcHJpdGUueCwgdGhpcy5zcHJpdGUueSwgdGhpcy5zcHJpdGUudywgdGhpcy5zcHJpdGUuaCwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tIFwiLi9CYXNpY09iamVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHNwcml0ZUxpc3Q6IFNwcml0ZVtdO1xyXG4gICAgcHVibGljIHhSZXBlYXQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5UmVwZWF0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGlsZVdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgcHVibGljIG9yZGVyOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB4UmVwZWF0OiBudW1iZXIsIHlSZXBlYXQ6IG51bWJlciwgc3ByaXRlczogU3ByaXRlW10sIG9yZGVyPzogbnVtYmVyW10sIHRpbGVXaWR0aDogbnVtYmVyID0gc3ByaXRlc1swXS53LCB0aWxlSGVpZ2h0OiBudW1iZXIgPSBzcHJpdGVzWzBdLmgpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHhSZXBlYXQgKiB0aWxlV2lkdGgsIHlSZXBlYXQgKiB0aWxlSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnhSZXBlYXQgPSB4UmVwZWF0O1xyXG4gICAgICAgIHRoaXMueVJlcGVhdCA9IHlSZXBlYXQ7XHJcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aWxlV2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gdGlsZUhlaWdodDtcclxuICAgICAgICB0aGlzLnNwcml0ZUxpc3QgPSBzcHJpdGVzO1xyXG4gICAgICAgIGlmIChvcmRlciAhPT0gdW5kZWZpbmVkKSB0aGlzLm9yZGVyID0gb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnhSZXBlYXQgKiB0aGlzLnlSZXBlYXQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3ByaXRlOiBTcHJpdGUgPSB0aGlzLnNwcml0ZUxpc3RbaSA8IHRoaXMub3JkZXIubGVuZ3RoID8gdGhpcy5vcmRlcltpXSA6IDBdO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZS5zb3VyY2UsIHNwcml0ZS54LCBzcHJpdGUueSwgc3ByaXRlLncsIHNwcml0ZS5oLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy54ICsgKGkgJSB0aGlzLnhSZXBlYXQpICogdGhpcy50aWxlV2lkdGgsIHRoaXMucG9seWdvbi5wb3MueSArIE1hdGguZmxvb3IoaSAvIHRoaXMueFJlcGVhdCkgKiB0aGlzLnRpbGVIZWlnaHQsIHRoaXMudGlsZVdpZHRoLCB0aGlzLnRpbGVIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vU0FUL1ZlY3Rvcic7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9vZFBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0dWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMiwgMik7XHJcbiAgICAgICAgdGhpcy5keCA9IGR4O1xyXG4gICAgICAgIHRoaXMuZHkgPSBkeTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0dWNrKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIGRlbHRhO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZUJ5KHRoaXMuZHgsIHRoaXMuZHkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zdHVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuR09SRSwgdGhpcy50eXBlICogMywgMzQsIDMsIDQsIHRoaXMucG9seWdvbi5wb3MueCAtIDEsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDMsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldE9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHByb3RlY3RlZCBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggLSA1LCB5IC0gMSwgMTAsIDIpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMuZGlyZWN0aW9uICogNzUwICogZGVsdGEsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZSArPSBkZWx0YTtcclxuICAgICAgICB3aGlsZSAodGhpcy5mcmFtZVRpbWUgPj0gMC4yMCkgdGhpcy5mcmFtZVRpbWUgLT0gMC4yMDtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5CVUxMRVQsIE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWUgLyAwLjEwKSAqIDQsIDAsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDMsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDQsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlcyB9IGZyb20gXCIuLi8uLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcHJpdGVPYmplY3QgZnJvbSBcIi4uL1Nwcml0ZU9iamVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWF0aE1lc3NhZ2UgZXh0ZW5kcyBTcHJpdGVPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkZWF0aF9tZXNzYWdlXCIsIDQwMCAtIDM1MCwgMzA0IC0gODIsIDcwMCwgMTY0LCBTcHJpdGVzLkRlYXRoTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuLi8uLi9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSBcIi4vUGxheWVyT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWtlUGxheWVyT2JqZWN0IGV4dGVuZHMgUGxheWVyT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMTEyLCB5OiBudW1iZXIgPSA1MTIsIGlkOiBzdHJpbmcgPSBcImZha2VfcGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCBpZCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmR4ID0gTnVtYmVyLkVQU0lMT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmlnaHRLZXlUaW1lKysgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNhdmUgPSAodGhpcy5zZWxlY3RlZFNhdmUgKyAxKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUrKyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2F2ZSA9ICh0aGlzLnNlbGVjdGVkU2F2ZSAtIDEgKyAzKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ1NoaWZ0JykgfHwgR2FtZS5pc0J1dHRvbkRvd24oJ3onKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICBHYW1lLmxvYWRTYXZlKHRoaXMuc2VsZWN0ZWRTYXZlKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgPSAxMTIgKyB0aGlzLnNlbGVjdGVkU2F2ZSAqIDMyICogODtcclxuICAgICAgICBsZXQgZHggPSBNYXRoLm1pbihNYXRoLmFicyh0aGlzLnBvbHlnb24ucG9zLnggLSB0YXJnZXRQb3MpLCBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiA0ICogZGVsdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMucG9seWdvbi5wb3MueCA+IHRhcmdldFBvcyA/IC1keCA6IGR4LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge31cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpYlBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYm9keVZhcmlhbnQ6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSAwOiBib2R5LFxyXG4gICAgICogdHlwZSAxOiBib2R5IHN0b25lZCxcclxuICAgICAqIHR5cGUgMjogaGVhZCxcclxuICAgICAqIHR5cGUgMzogaGVhZCBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDQ6IGFybSxcclxuICAgICAqIHR5cGUgNTogYXJtIHN0b25lZCxcclxuICAgICAqIHR5cGUgNjogZmVldCxcclxuICAgICAqIHR5cGUgNzogZmVldCBzdG9uZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHR5cGU6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCA4LCA4KTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDAgfHwgdGhpcy50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5VmFyaWFudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIE1hdGgubWluKGRlbHRhLCAwLjMpO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aGlzQUFCQjogUG9seWdvbiA9IHRoaXMucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCAwLCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDEwLCAxOCwgMTAsIDE2LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMTAsIDE2KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAzNiwgMTgsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQsIGJ1ZmZlckRyYXdJbWFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL0NvbW1vblV0aWxzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJsb29kUGFydGljbGUgZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IEdpYlBhcnRpY2xlIGZyb20gJy4vR2liUGFydGljbGUnO1xyXG5pbXBvcnQgRGVhdGhNZXNzYWdlIGZyb20gJy4vRGVhdGhNZXNzYWdlJztcclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tICcuLi8uLi9BdWRpb01hbmFnZXInO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi8uLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHZlbG9jaXR5OiBudW1iZXIgPSAxNzU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXZpdHk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgIHB1YmxpYyBmcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoOSwgMTEpLCBuZXcgVmVjdG9yKDksIDMyKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigyMywgMzIpLCBuZXcgVmVjdG9yKDIzLCAxMSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgdGhpcy5keCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dSaWdodCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRLZXlUaW1lID09IDAgfHwgdGhpcy5yaWdodEtleVRpbWUgPCB0aGlzLmxlZnRLZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0S2V5VGltZSsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWdodEtleVRpbWUgPT0gMCB8fCB0aGlzLmxlZnRLZXlUaW1lIDwgdGhpcy5yaWdodEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSAtUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigneCcpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob290S2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJ1bGxldElkOiBzdHJpbmcgPSBcImJ1bGxldFwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKCk7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChcclxuICAgICAgICAgICAgbmV3IEJ1bGxldE9iamVjdCh0aGlzLnBvbHlnb24ucG9zLnggKyAxNiArIDEwICogdGhpcy5sb29raW5nRGlyZWN0aW9uLCB0aGlzLnBvbHlnb24ucG9zLnkgKyAyMSxcclxuICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZS5sZXZlbC5pc1JlbW92ZWQodGhpcy5pZCkpIHJldHVybjtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICBsZXQgY2VudGVyOiBWZWN0b3IgPSB0aGlzLnBvbHlnb24uZ2V0Q2VudHJvaWQoKS5hZGQodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjg7IGkrKykge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgQmxvb2RQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDYsIE1hdGguc2luKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBcImJsb29kX1wiICsgdGhpcy5pZCArIFwiX1wiICsgaVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IChpID4gMyA/IDIgOiAxKTsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgR2liUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsIE1hdGguc2luKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgXCJnaWJfXCIgKyB0aGlzLmlkICsgXCJfXCIgKyAoaSArIG8pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2dhbWVvdmVyLm9nZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IERlYXRoTWVzc2FnZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZyYW1lVGltZSA+PSAwLjQwKSB0aGlzLmZyYW1lVGltZSAtPSAwLjQwO1xyXG4gICAgICAgIGxldCBmcmFtZTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55KTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgLy8gSnVtcGluZ1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjAyKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAwLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDQpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIDMyLCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIChmcmFtZSAlIDIpICogMzIgKyA2NCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgKGZyYW1lICUgMikgKiAzMiwgOTYsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gUnVubmluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCBmcmFtZSAqIDMyLCAzMiwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJZGxlXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIGZyYW1lICogMzIsIDAsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIFVVSUQuIFRoZSBJRCBtaWdodCBub3QgYmUgdW5pcXVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuc2VjdXJlVVVJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICd4eHh4LXh4eHgteHh4LXh4eHgnLnJlcGxhY2UoL1t4XS9nLCAoYykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTsgIFxyXG4gICAgICAgIHJldHVybiByLnRvU3RyaW5nKDE2KTsgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGJ1ZmZlckNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1ZmZlci1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmNvbnN0IGJ1ZmZlckN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKCgpID0+IHtcclxuICAgIGxldCBjdHggPSBidWZmZXJDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcclxuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBjdHg7XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogRHJhd3MgYW4gaW1hZ2UgdG8gdGhlIChjbGVhbmVkKSBidWZmZXIgY2FudmFzIGFuZCByZXR1cm5zIHRoZSBjYW52YXMgaXRzZWxmLiBDYW4gYmUgdXNlZCB0byBkcmF3IGEgcGFydCBvZiBhbiBpbWFnZSB0byB0aGUgbWFpbiBjYW52YXMgd2l0aG91dCB0cmFuc2Zvcm0tY2F1c2VkIGFydGlmYWN0cy5cclxuICogQHBhcmFtIGltYWdlIGFuIGVsZW1lbnQgdG8gZHJhdyBpbnRvIHRoZSBjb250ZXh0LlxyXG4gKiBAcGFyYW0gc3ggeC1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3kgeS1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3cgd2lkdGggb2YgdGhlIHNvdXJjZSBpbWFnZSByZWdpb24gdG8gZHJhd1xyXG4gKiBAcGFyYW0gc2ggaGVpZ2h0IG9mIHRoZSBzb3VyY2UgaW1hZ2UgcmVnaW9uIHRvIGRyYXdcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyRHJhd0ltYWdlKGltYWdlOiBDYW52YXNJbWFnZVNvdXJjZSwgc3g6IG51bWJlciwgc3k6IG51bWJlciwgc3c6IG51bWJlciwgc2g6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHtcclxuICAgIGJ1ZmZlckNhbnZhcy53aWR0aCA9IHN3O1xyXG4gICAgYnVmZmVyQ2FudmFzLmhlaWdodCA9IHNoO1xyXG4gICAgYnVmZmVyQ3R4LmNsZWFyUmVjdCgwLCAwLCBidWZmZXJDYW52YXMud2lkdGgsIGJ1ZmZlckNhbnZhcy5oZWlnaHQpO1xyXG4gICAgYnVmZmVyQ3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzdywgc2gsIDAsIDAsIHN3LCBzaCk7XHJcbiAgICByZXR1cm4gYnVmZmVyQ2FudmFzO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiFcclxuKiBJIFdhbm5hIEJlIFRoZSBHdXk6IFRoZSBNb3ZpZTogVGhlIEdhbWVcclxuKiBUeXBlU2NyaXB0IHJlbWFrZSBtYWRlIGJ5IFBHZ2FtZXIyIChha2EgU29ub1BHKS5cclxuKiBZb3UgY2FuIGZpbmQgdGhlIHNvdXJjZSBjb2RlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9QR2dhbWVyMi9JV0JURy50c1xyXG4qIE9yaWdpbmFsIGdhbWUgbWFkZSBieSBLYXlpbjogaHR0cHM6Ly9rYXlpbi5tb2UvaXdidGcvXHJcbiovXHJcblxyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gXCIuL0F1ZGlvTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5mdW5jdGlvbiBmcmFtZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKVxyXG4gICAgICAgIEdhbWUudXBkYXRlKHRpbWVzdGFtcCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxufVxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKTtcclxuXHJcbm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgdHJ1ZSk7XHJcbiAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXgoKTtcclxufTtcclxub25rZXl1cCA9IGZ1bmN0aW9uKGUpIHsgR2FtZS5rZXlNYXAuc2V0KGUua2V5Lmxlbmd0aCA9PSAxID8gZS5rZXkudG9Mb3dlckNhc2UoKSA6IGUua2V5LCBmYWxzZSk7IH07Il0sIm5hbWVzIjpbIlNwcml0ZXMiLCJTcGlrZURpcmVjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=