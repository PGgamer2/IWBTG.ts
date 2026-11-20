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
    let ctx = _Game.canvas.getContext("2d", { desynchronized: true, alpha: false });
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = _Game.level.backgroundStyle || "#000000";
    ctx.fillRect(0, 0, _Game.canvas.width, _Game.canvas.height);
    ctx.save();
    ctx.translate(_Game.camera.x, _Game.camera.y);
    ctx.scale(_Game.camera.sizeX * (_Game.canvas.width / 800), _Game.camera.sizeY * (_Game.canvas.height / 608));
    try {
      _Game.level.update(ctx, (timestamp - _Game.lastTimestamp) / 1e3);
    } catch (e) {
      console.error(e);
    }
    ctx.restore();
    if (_Game.isButtonDown("r")) {
      if (!_Game.isPushingReload) {
        this.loadSave();
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
_ImageList.GAMEOVER = _ImageList.register("assets/textures/ui/sprGameOver.png");
_ImageList.NEWGAME = _ImageList.register("assets/textures/ui/sprNewFile.png");
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
  Sprites2.RedBlock = new Sprite(ImageList.TILEMAP_MASTER, 32, 32, 32, 32);
  Sprites2.GrassRedBlock = new Sprite(ImageList.TILEMAP_MASTER, 0, 32, 32, 32);
  Sprites2.SimpleVBeam = new Sprite(ImageList.TILEMAP_MASTER, 32, 64, 32, 32);
  Sprites2.SimpleHBeam = new Sprite(ImageList.TILEMAP_MASTER, 0, 96, 32, 32);
  Sprites2.SimpleBlock = new Sprite(ImageList.TILEMAP_MASTER, 32, 96, 32, 32);
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
    this.backgroundStyle = "#000000";
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
    this.backgroundStyle = "#C4D7F7";
    _AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"].playMusic("assets/music/saveselect.ogg");
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("grass", 0, 17, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.GrassRedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("ground", 0, 18, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.RedBlock]));
    for (let i = 0; i < 7; i++) {
      let obj = new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("tree" + i, Math.random() * 800 | 0, 369, 111, 175, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Broccoli);
      obj.collision = false;
      this.objects.push(obj);
    }
    for (let i = 0; i < 6; i++) {
      let obj = new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.AnimatedSpriteObject("cloud" + i, Math.random() * 800 | 0, 96 + Math.random() * 210 | 0, 112, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Cloud, 0.5);
      obj.collision = false;
      this.objects.push(obj);
    }
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("top0", 0, 0, 1, 3, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam], [0, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("top1", 24, 0, 1, 3, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam], [0, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("top2", 32, 0, 736, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("top2", 32, 64, 736, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save0_0", 1, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save0_1", 1, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save0_2", 32, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save0_3", 192, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save1_0", 9, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save1_1", 9, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save1_2", 288, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save1_3", 448, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save2_0", 17, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save2_1", 17, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save2_2", 544, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save2_3", 704, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.fakePlayer = new _objects_player_FakePlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.objects.push(this.fakePlayer);
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
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100 | 0;
    }
    for (let i = 9; i < 15; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -112) {
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100 | 0;
        this.objects[i].polygon.pos.y = 96 + Math.random() * 210 | 0;
      }
    }
    ctx.fillStyle = "#88391E";
    ctx.fillRect(0, 544, 800, 64);
    super.update(ctx, delta);
    this.drawUI(ctx, delta);
  }
  drawUI(ctx, delta) {
    ctx.font = "19px comicsans";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillRect(32, 32, 736, 32);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("* Select Your Saved Game *", 384, 56);
    ctx.font = "16px comicsans";
    if (this.fakePlayer.selectedSave == 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(32, 128, 192, 352);
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(64, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 64, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 1", 128, 182);
    if (this.fakePlayer.selectedSave == 1) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(288, 128, 192, 352);
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(320, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 320, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 2", 384, 182);
    if (this.fakePlayer.selectedSave == 2) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(544, 128, 192, 352);
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(576, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 576, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 3", 640, 182);
  }
  instantiate() {
    return new _SaveSelectMenu();
  }
};
_SaveSelectMenu.scrollVel = 40;
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
    this.backgroundStyle = "#C4D7F7";
    _AudioManager__WEBPACK_IMPORTED_MODULE_3__["default"].playMusic("assets/music/begins.ogg");
    this.objects.push(new _objects_player_PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"](32, 512));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("ground0", 0, 18, 25, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall0", 8, 14, 1, 4, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall1", 9, 12, 1, 6, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall0", 10, 14, 1, 2, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
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
  constructor(id, x = 0, y = 0, w = 0, h = 0) {
    this.collision = true;
    this.id = id;
    if (w == 0 && h == 0) {
      this.collision = false;
      this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__["default"]();
    } else {
      this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
        new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](),
        new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, h),
        new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, h),
        new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, 0)
      ]);
    }
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
    ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
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
    ctx.drawImage(this.sprites[i].source, this.sprites[i].x, this.sprites[i].y, this.sprites[i].w, this.sprites[i].h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
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
    this.frameTime = (this.frameTime + delta) % 0.2;
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.PLAYER, Math.floor(this.frameTime / 0.1) * 4, 160, 4, 4, (this.polygon.pos.x | 0) + 3, (this.polygon.pos.y | 0) - 1, 4, 4);
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
    this.dy += _PlayerObject.gravity * Math.max(delta, Number.EPSILON);
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
        if (this.availableJumps == 1) this.dy = -235 * delta;
        else this.dy = -170 * delta;
      }
    } else this.jumpKeyTime = 0;
    if (this.dx != 0) this.lookingDirection = Math.sign(this.dx);
    this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
    let expectedPos = new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](this.dx, this.dy).add(this.polygon.pos);
    this.onGround = false;
    if (this.moveBy(this.dx, this.dy) && this.polygon.pos.y != expectedPos.y) {
      if (this.dy < 0) {
        this.dy = 0;
        this.jumpKeyTime = 0.3;
      } else {
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
    let slowFrame = Math.floor(this.frameTimer * 4 / 0.4);
    let fastFrame = Math.floor(this.frameTimer * 2 / 0.1);
    ctx.save();
    if (this.lookingDirection == -1) {
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x | 0, this.polygon.pos.y | 0);
      ctx.scale(-1, 1);
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - (this.polygon.pos.x | 0) * 2 - 32, 0);
    } else {
      ctx.translate(this.polygon.pos.x | 0, this.polygon.pos.y | 0);
    }
    if (this.dy < 0) {
      if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 0, 64, 32, 32), 0, 0, 32, 32);
      } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 32, 64, 32, 32), 0, 0, 32, 32);
      } else {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 2 * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
      }
    } else if (!this.onGround) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 2 * 32, 96, 32, 32), 0, 0, 32, 32);
    } else if (this.dx != 0) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 4 * 32, 32, 32, 32), 0, 0, 32, 32);
    } else {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, slowFrame * 32, 0, 32, 32), 0, 0, 32, 32);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzBDO0FBQ2hCO0FBRTFCLFNBQVMsTUFBTSxXQUFnQztBQUMzQyxNQUFJLENBQUMsU0FBUztBQUNWLGlEQUFJLENBQUMsT0FBTyxTQUFTO0FBQ3pCLFNBQU8sc0JBQXNCLEtBQUs7QUFDdEM7QUFDQSxPQUFPLHNCQUFzQixLQUFLO0FBRWxDLFlBQVksU0FBUyxHQUFHO0FBQ3BCLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssSUFBSTtBQUNyRSx1REFBWSxDQUFDLFlBQVk7QUFDN0I7QUFDQSxVQUFVLFNBQVMsR0FBRztBQUFFLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssS0FBSztBQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0F1ZGlvTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQm94LnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9TcHJpdGVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvQmFzaWNMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL1NhdmVTZWxlY3RNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvVGVzdExldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2ljT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1NwaWtlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1Nwcml0ZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9UaWxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CbG9vZFBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CdWxsZXRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Zha2VQbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0dpYlBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vblV0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvTWFwOiBNYXA8c3RyaW5nLCBIVE1MQXVkaW9FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXkoa2V5OiBzdHJpbmcsIHNyYz86IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDEuMCk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNyYyA9PT0gdW5kZWZpbmVkKSBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIGVsc2UgYXVkaW8gPSBuZXcgQXVkaW8oc3JjKTtcclxuICAgICAgICBhdWRpby5sb29wID0gbG9vcDtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLnNldChrZXksIGF1ZGlvKTtcclxuICAgICAgICBhdWRpby5vbmNhbnBsYXkgPSBlID0+IHtcclxuICAgICAgICAgICAgYXVkaW8hLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICBhdWRpbyEuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvIS5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhdWRpbyEub25jYW5wbGF5ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheU11c2ljKHNyYzogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQgJiYgIWF1ZGlvLnNyYy5lbmRzV2l0aChzcmMpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5yZWxlYXNlKFwiX211c2ljXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLnBsYXkoXCJfbXVzaWNcIiwgc3JjLCBsb29wLCAwLjc1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5wYXVzZShrZXkpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvUGxheUZpeGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1dG9QbGF5Rml4KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVHJ5aW5nIHRvIGZpeCBhdXRvcGxheS4uLlwiKTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfbXVzaWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vQ2FtZXJhJztcclxuaW1wb3J0IFNhdmVTZWxlY3RNZW51IGZyb20gJy4vbGV2ZWxzL1NhdmVTZWxlY3RNZW51JztcclxuaW1wb3J0IFRlc3RMZXZlbCBmcm9tICcuL2xldmVscy9UZXN0TGV2ZWwnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RUaW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxldmVsOiBCYXNpY0xldmVsID0gbmV3IFNhdmVTZWxlY3RNZW51KCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICAvLyBSZXNpemUga2VlcGluZyBhc3BlY3QgcmF0aW9cclxuICAgICAgICBsZXQgcGFnZUFzcGVjdFJhdGlvID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZSA9IE1hdGguZmxvb3IoMjUgLyAxOSA8IHBhZ2VBc3BlY3RSYXRpbyA/IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC8gMTkgOiBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMjUpO1xyXG5cdFx0aWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc2NyZXRlLXNjYWxlLWNoZWNrYm94XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXHJcblx0XHRcdHNjYWxlID0gTWF0aC5tYXgoMSA8PCAoMzEgLSBNYXRoLmNsejMyKHNjYWxlKSksIDEpO1x0Ly8gU2V0IHNjYWxlIHRvIGEgcG93ZXIgb2YgdHdvXHJcbiAgICAgICAgR2FtZS5jYW52YXMud2lkdGggPSBzY2FsZSAqIDI1O1xyXG4gICAgICAgIEdhbWUuY2FudmFzLmhlaWdodCA9IHNjYWxlICogMTk7XHJcbiAgICAgICAgLy8gR2V0IGNvbnRleHQgYW5kIGNsZWFyXHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCB7ZGVzeW5jaHJvbml6ZWQ6IHRydWUsIGFscGhhOiBmYWxzZX0pITtcclxuICAgICAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IEdhbWUubGV2ZWwuYmFja2dyb3VuZFN0eWxlIHx8IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBHYW1lLmNhbnZhcy53aWR0aCwgR2FtZS5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBjdHgudHJhbnNsYXRlKEdhbWUuY2FtZXJhLngsIEdhbWUuY2FtZXJhLnkpO1xyXG4gICAgICAgIGN0eC5zY2FsZShHYW1lLmNhbWVyYS5zaXplWCAqIChHYW1lLmNhbnZhcy53aWR0aCAvIDgwMCksIEdhbWUuY2FtZXJhLnNpemVZICogKEdhbWUuY2FudmFzLmhlaWdodCAvIDYwOCkpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIEdhbWUubGV2ZWwudXBkYXRlKGN0eCwgKHRpbWVzdGFtcCAtIEdhbWUubGFzdFRpbWVzdGFtcCkgLyAxMDAwKTtcclxuICAgICAgICB9IGNhdGNoKGU6IHVua25vd24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICAgICAgLy8gUmVsb2FkIGxldmVsXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdyJykpIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmlzUHVzaGluZ1JlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgR2FtZS5pc1B1c2hpbmdSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBHYW1lLmxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU2F2ZShzYXZlPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sZXZlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBUZXN0TGV2ZWwoKTsgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0J1dHRvbkRvd24oa2V5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGtleU5hbWUubGVuZ3RoID09IDEpIGtleU5hbWUgPSBrZXlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUua2V5TWFwLmdldChrZXlOYW1lKSA/PyBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiAjIyBCb3hcclxuICogXHJcbiAqIFJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCwgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgdzogbnVtYmVyO1xyXG4gIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgQm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXHJcbiAgICogYmUgc2V0IHRvIGAwYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1uZXcgVmVjdG9yKCldIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MF0gVGhlIHdpZHRoIG9mIHRoZSBCb3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdIFRoZSBoZWlnaHQgb2YgdGhlIEJveC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHcgPSAwLCBoID0gMCkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLncgPSB3O1xyXG4gICAgdGhpcy5oID0gaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBQb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIEJveC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBCb3guXHJcbiAgICovXHJcbiAgcHVibGljIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zO1xyXG4gICAgY29uc3QgdyA9IHRoaXMudztcclxuICAgIGNvbnN0IGggPSB0aGlzLmg7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zLngsIHBvcy55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IoMCwgaClcclxuICAgIF0pO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuXHJcbi8qKlxyXG4gKiAjIyBQb2x5Z29uXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpLlxyXG4gKiBcclxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcclxuICogc2V0dGVycy4gT3RoZXJ3aXNlIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgdXBkYXRlZCBjb3JyZWN0bHkuXHJcbiAqIFxyXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIG9mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBlZGdlczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZCBieSB2ZWN0b3JzIFxyXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9VmVjdG9yXSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBbcG9pbnRzPVtdXSBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgY29uc3QgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzLnBvaW50cyB8fCB0aGlzLnBvaW50cy5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgbGV0IGk7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XHJcbiAgICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XHJcblxyXG4gICAgICAgIGlmIChwMSAhPT0gcDIgJiYgcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55KSB7XHJcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjUG9pbnRzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZWNhbGMoKTogUG9seWdvbiB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjYWxjUG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcblxyXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcclxuICAgICAgY2FsY1BvaW50LnkgKz0gb2Zmc2V0Lnk7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGUgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xyXG5cclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBBQUJCLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgQUFCQi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICBsZXQgeE1pbiA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW4gPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heCA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNYXggPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludC54IDwgeE1pbikgeE1pbiA9IHBvaW50Lng7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnggPiB4TWF4KSB4TWF4ID0gcG9pbnQueDtcclxuXHJcbiAgICAgIGlmIChwb2ludC55IDwgeU1pbikgeU1pbiA9IHBvaW50Lnk7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnkgPiB5TWF4KSB5TWF4ID0gcG9pbnQueTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLnBvcy5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldENlbnRyb2lkKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBjeCA9IDA7XHJcbiAgICBsZXQgY3kgPSAwO1xyXG4gICAgbGV0IGFyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XHJcblxyXG4gICAgICBjb25zdCBhID0gcDEueCAqIHAyLnkgLSBwMi54ICogcDEueTtcclxuXHJcbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xyXG4gICAgICBjeSArPSAocDEueSArIHAyLnkpICogYTtcclxuICAgICAgYXIgKz0gYTtcclxuICAgIH1cclxuXHJcbiAgICBhciA9IGFyICogMzsgLy8gd2Ugd2FudCAxIC8gNiB0aGUgYXJlYSBhbmQgd2UgY3VycmVudGx5IGhhdmUgMiphcmVhXHJcbiAgICBjeCA9IGN4IC8gYXI7XHJcbiAgICBjeSA9IGN5IC8gYXI7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogIyMgUmVzcG9uc2VcclxuICogXHJcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcclxuICBwdWJsaWMgYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgYjogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIG92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGJJbkE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBvdmVybGFwOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXIoKTogUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iLCIvKiFcclxuKiBzYXQtanMgKG9yIFNBVC5qcykgbWFkZSBieSBKaW0gUmllY2tlbiBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxyXG4qIENoYW5nZXMgbWFkZSBieSBtZTogQnVnIGZpeGVzIGFuZCBjb252ZXJzaW9uIHRvIFR5cGVTY3JpcHRcclxuKi9cclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcclxuXHJcbi8qKlxyXG4gKiAjIyBPYmplY3QgUG9vbHNcclxuICovXHJcblxyXG4vKipcclxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICogXHJcbiAqIEB0eXBlIHtBcnJheTxWZWN0b3I+fVxyXG4gKi9cclxuIGNvbnN0IFRfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gXHJcbiAvKipcclxuICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAqIFxyXG4gICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICovXHJcbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBUX0FSUkFZUy5wdXNoKFtdKTtcclxuIFxyXG5cclxuLyoqXHJcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAqL1xyXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4vKipcclxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UG9seWdvbn1cclxuICovXHJcbmNvbnN0IFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbi8qKlxyXG4gKiAjIyBDb25zdGFudHMgZm9yIFZvcm9ub2kgcmVnaW9ucy5cclxuICovXHJcbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuY29uc3QgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuLyoqXHJcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XHJcblxyXG4gICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0WzBdID0gbWluO1xyXG4gIHJlc3VsdFsxXSA9IG1heDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICogXHJcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICogXHJcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpITtcclxuICBcclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcclxuICAgIGNvbnN0IG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICBcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG4gIFxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlLm92ZXJsYXApIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG4gIFxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJbkNpcmNsZShwOiBWZWN0b3IsIGM6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkocCkuc3ViKGMucG9zKS5zdWIoYy5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c1NxID0gYy5yICogYy5yO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5IFRoZSBwb2x5Z29uIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5Qb2x5Z29uKHA6IFZlY3RvciwgcG9seTogUG9seWdvbik6IGJvb2xlYW4ge1xyXG4gICAgVEVTVF9QT0lOVC5wb3MuY29weShwKTtcclxuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uUG9seWdvbihURVNUX1BPSU5ULCBwb2x5LCBUX1JFU1BPTlNFKTtcclxuXHJcbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFLmFJbkI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlQ2lyY2xlKGE6IENpcmNsZSwgYjogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvcykuc3ViKGEub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbFJhZGl1cyA9IGEuciArIGIucjtcclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXkgaW50ZXJzZWN0LiAgSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gYS5yIDw9IGIuciAmJiBkaXN0IDw9IGIuciAtIGEucjtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGIuciA8PSBhLnIgJiYgZGlzdCA8PSBhLnIgLSBiLnI7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlLnBvcykuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvcyk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG5cclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gICAgICBsZXQgb3ZlcmxhcE4gPSBudWxsO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxyXG4gICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tpXSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIGxldCByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxyXG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcclxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cclxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jvbm9pIHJlZ2lvbikuXHJcbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IG92ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IHBvbHlnb247XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXHJcbiAgICogYXQgdGhlIGVuZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICBjb25zdCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcclxuICAgICAgY29uc3QgYUluQiA9IHJlc3BvbnNlLmFJbkI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xyXG4gICAgICByZXNwb25zZS5iID0gYTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0iLCIvKipcclxuICogIyMgVmVjdG9yXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuICogXHJcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcclxuICogaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgIHRoaXMueSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy55O1xyXG4gICAgdGhpcy55ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLnkgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgIHRoaXMueSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlXHJcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICo9IHg7XHJcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBwdWJsaWMgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMaXN0IHtcclxuICAgIHByaXZhdGUgc3RhdGljIElNQUdFUzogSFRNTEltYWdlRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlcihzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIEltYWdlTGlzdC5JTUFHRVMhLnB1c2goaW1nKTtcclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVElMRU1BUF9NQVNURVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy90aWxlTWFzdGVyLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1BJS0U6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJTcGlrZS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJST0NDT0xJOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvYmdCcm9jY29saS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEtVTU9fUExBVEZPUk06IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJLdW1vUGxhdGZvcm0ucG5nXCIpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUExBWUVSOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwclBsYXllci5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdPUkU6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByR29yZS5wbmdcIik7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHQU1FT1ZFUjogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5FV0dBTUU6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvdWkvc3ByTmV3RmlsZS5wbmdcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gICAgcHVibGljIHNvdXJjZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIHc6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOiBIVE1MSW1hZ2VFbGVtZW50LCB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgIHRoaXMuaCA9IGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU3ByaXRlcyB7XHJcbiAgICBleHBvcnQgY29uc3QgUmVkQmxvY2s6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlRJTEVNQVBfTUFTVEVSLCAzMiwgMzIsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgR3Jhc3NSZWRCbG9jazogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuVElMRU1BUF9NQVNURVIsIDAsIDMyLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNpbXBsZVZCZWFtOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDY0LCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNpbXBsZUhCZWFtOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMCwgOTYsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgU2ltcGxlQmxvY2s6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlRJTEVNQVBfTUFTVEVSLCAzMiwgOTYsIDMyLCAzMik7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IEJyb2Njb2xpOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5CUk9DQ09MSSwgMCwgMCwgMTExLCAxNzUpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEtyYWlkZ2llZkJyb2Njb2xpOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5CUk9DQ09MSSwgMTEyLCAwLCAxMTEsIDE3NSk7XHJcbiAgICBleHBvcnQgY29uc3QgQmlnQnJvY2NvbGk6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkJST0NDT0xJLCAwLCAxNzUsIDIxMywgMzMxKTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlVXA6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNwaWtlUmlnaHQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCAzMiwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZURvd246IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA2NCwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZUxlZnQ6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlNQSUtFLCA5NiwgMCwgMzIsIDMyKTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgQ2xvdWQ6IFNwcml0ZVtdID0gW25ldyBTcHJpdGUoSW1hZ2VMaXN0LktVTU9fUExBVEZPUk0sIDAsIDAsIDExMiwgMzIpLCBuZXcgU3ByaXRlKEltYWdlTGlzdC5LVU1PX1BMQVRGT1JNLCAxMTIsIDAsIDExMiwgMzIpXTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNvbnN0IERlYXRoTWVzc2FnZTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuR0FNRU9WRVIsIDAsIDAsIDgwMCwgMTg4KTtcclxufSIsImltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCB7IElEaXNwb3NhYmxlLCBJbnN0YW5jZUZhYnJpYyB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY0xldmVsIGltcGxlbWVudHMgSURpc3Bvc2FibGUsIEluc3RhbmNlRmFicmljPEJhc2ljTGV2ZWw+IHtcclxuICAgIHB1YmxpYyBiYWNrZ3JvdW5kU3R5bGU6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiA9IFwiIzAwMDAwMFwiO1xyXG4gICAgcHVibGljIG9iamVjdHM6IEJhc2ljT2JqZWN0W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCByZW1vdmVRdWV1ZTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLnJlbW92ZVF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW29dLmlkID09IHRoaXMucmVtb3ZlUXVldWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbb10uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UobywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW5kZXJpbmdcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uZHJhdyhjdHgsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWUuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q29sbGlzaW9uTGluZXMoY3R4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU9iamVjdChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5wdXNoKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNSZW1vdmVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVRdWV1ZS5pbmRleE9mKGlkKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdDb2xsaXNpb25MaW5lcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzOiBWZWN0b3JbXSA9IHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvaW50cztcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMTsgcCA8IHBvaW50cy5sZW5ndGg7IHArKykge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1twXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1twXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vYmplY3RzW2ldLmNvbGxpc2lvbiA/ICcjZmYwMDAwJyA6ICcjMDAwMGZmJztcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlKHRoaXMub2JqZWN0cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbMF0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaW5zdGFudGlhdGUoKTogQmFzaWNMZXZlbDtcclxufSIsImltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4uL0F1ZGlvTWFuYWdlclwiO1xyXG5pbXBvcnQgRmFrZVBsYXllck9iamVjdCBmcm9tIFwiLi4vb2JqZWN0cy9wbGF5ZXIvRmFrZVBsYXllck9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVPYmplY3QsIEFuaW1hdGVkU3ByaXRlT2JqZWN0IH0gZnJvbSBcIi4uL29iamVjdHMvU3ByaXRlT2JqZWN0XCI7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gXCIuLi9vYmplY3RzL1RpbGVPYmplY3RcIjtcclxuaW1wb3J0IHsgSW1hZ2VMaXN0LCBTcHJpdGVzIH0gZnJvbSBcIi4uL1Nwcml0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSBcIi4vQmFzaWNMZXZlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2F2ZVNlbGVjdE1lbnUgZXh0ZW5kcyBCYXNpY0xldmVsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc2Nyb2xsVmVsOiBudW1iZXIgPSA0MDtcclxuICAgIHB1YmxpYyBmYWtlUGxheWVyOiBGYWtlUGxheWVyT2JqZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kU3R5bGUgPSBcIiNDNEQ3RjdcIjtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL3NhdmVzZWxlY3Qub2dnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyYXNzXCIsIDAsIDE3LCAyNiwgMSwgW1Nwcml0ZXMuR3Jhc3NSZWRCbG9ja10pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyb3VuZFwiLCAwLCAxOCwgMjYsIDEsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG5cclxuICAgICAgICAvLyBUcmVlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmo6IFNwcml0ZU9iamVjdCA9IG5ldyBTcHJpdGVPYmplY3QoXCJ0cmVlXCIgKyBpLCAoTWF0aC5yYW5kb20oKSAqIDgwMCkgfCAwLCAzNjksIDExMSwgMTc1LCBTcHJpdGVzLkJyb2Njb2xpKTtcclxuICAgICAgICAgICAgb2JqLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvdWRzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iajogQW5pbWF0ZWRTcHJpdGVPYmplY3QgPSBuZXcgQW5pbWF0ZWRTcHJpdGVPYmplY3QoXCJjbG91ZFwiICsgaSwgKE1hdGgucmFuZG9tKCkgKiA4MDApIHwgMCwgKDk2ICsgTWF0aC5yYW5kb20oKSAqIDIxMCkgfCAwLCAxMTIsIDMyLCBTcHJpdGVzLkNsb3VkLCAwLjUpO1xyXG4gICAgICAgICAgICBvYmouY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVSVxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwidG9wMFwiLCAwLCAwLCAxLCAzLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVWQmVhbV0sIFswLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwidG9wMVwiLCAyNCwgMCwgMSwgMywgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlVkJlYW1dLCBbMCwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwidG9wMlwiLCAzMiwgMCwgNzM2LCAzMiwgU3ByaXRlcy5TaW1wbGVIQmVhbSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJ0b3AyXCIsIDMyLCA2NCwgNzM2LCAzMiwgU3ByaXRlcy5TaW1wbGVIQmVhbSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTBfMFwiLCAxLCA0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTBfMVwiLCAxLCAxNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTBfMlwiLCAzMiwgMTYwLCAzMiwgMjg4LCBTcHJpdGVzLlNpbXBsZVZCZWFtKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUwXzNcIiwgMTkyLCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUxXzBcIiwgOSwgNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUxXzFcIiwgOSwgMTQsIDYsIDEsIFtTcHJpdGVzLlNpbXBsZUJsb2NrLCBTcHJpdGVzLlNpbXBsZUhCZWFtXSwgWzAsIDEsIDEsIDEsIDEsIDBdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUxXzJcIiwgMjg4LCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTFfM1wiLCA0NDgsIDE2MCwgMzIsIDI4OCwgU3ByaXRlcy5TaW1wbGVWQmVhbSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTJfMFwiLCAxNywgNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUyXzFcIiwgMTcsIDE0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJzYXZlMl8yXCIsIDU0NCwgMTYwLCAzMiwgMjg4LCBTcHJpdGVzLlNpbXBsZVZCZWFtKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUyXzNcIiwgNzA0LCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWtlUGxheWVyID0gbmV3IEZha2VQbGF5ZXJPYmplY3QoKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaCh0aGlzLmZha2VQbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCAtPSBTYXZlU2VsZWN0TWVudS5zY3JvbGxWZWwgKiBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IDwgLTY0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPSAwO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC0zMilcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICs9IDMyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCAtPSBTYXZlU2VsZWN0TWVudS5zY3JvbGxWZWwgKiBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IDwgLTExMSlcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ID0gKDg1MCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwMCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gOTsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC0xMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ID0gKDg1MCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEwMCkgfCAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgPSAoOTYgKyBNYXRoLnJhbmRvbSgpICogMjEwKSB8IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM4ODM5MUVcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgNTQ0LCA4MDAsIDY0KTtcclxuICAgICAgICBzdXBlci51cGRhdGUoY3R4LCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5kcmF3VUkoY3R4LCBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdVSShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5mb250ID0gXCIxOXB4IGNvbWljc2Fuc1wiO1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIC8vIHRvcFxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMzIsIDMyLCA3MzYsIDMyKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiKiBTZWxlY3QgWW91ciBTYXZlZCBHYW1lICpcIiwgMzg0LCA1Nik7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggY29taWNzYW5zXCI7XHJcbiAgICAgICAgLy8gc2F2ZTBcclxuICAgICAgICBpZiAodGhpcy5mYWtlUGxheWVyLnNlbGVjdGVkU2F2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSlcIjtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDMyLCAxMjgsIDE5MiwgMzUyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCg2NCwgMTYwLCAxMjgsIDI4OCk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuTkVXR0FNRSwgNjQsIDE5Mik7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNBVkUgR0FNRSAxXCIsIDEyOCwgMTgyKTtcclxuICAgICAgICAvLyBzYXZlMVxyXG4gICAgICAgIGlmICh0aGlzLmZha2VQbGF5ZXIuc2VsZWN0ZWRTYXZlID09IDEpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KVwiO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMjg4LCAxMjgsIDE5MiwgMzUyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgzMjAsIDE2MCwgMTI4LCAyODgpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0Lk5FV0dBTUUsIDMyMCwgMTkyKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiU0FWRSBHQU1FIDJcIiwgMzg0LCAxODIpO1xyXG4gICAgICAgIC8vIHNhdmUyXHJcbiAgICAgICAgaWYgKHRoaXMuZmFrZVBsYXllci5zZWxlY3RlZFNhdmUgPT0gMikge1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpXCI7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCg1NDQsIDEyOCwgMTkyLCAzNTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDU3NiwgMTYwLCAxMjgsIDI4OCk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuTkVXR0FNRSwgNTc2LCAxOTIpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQoXCJTQVZFIEdBTUUgM1wiLCA2NDAsIDE4Mik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2F2ZVNlbGVjdE1lbnUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vQmFzaWNMZXZlbCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IFNwaWtlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gJy4uL29iamVjdHMvVGlsZU9iamVjdCc7XHJcbmltcG9ydCB7IFNwcml0ZXMgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdExldmVsIGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFN0eWxlID0gXCIjQzREN0Y3XCI7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlNdXNpYyhcImFzc2V0cy9tdXNpYy9iZWdpbnMub2dnXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBQbGF5ZXJPYmplY3QoMzIsIDUxMikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3JvdW5kMFwiLCAwLCAxOCwgMjUsIDEsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDBcIiwgOCwgMTQsIDEsIDQsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDFcIiwgOSwgMTIsIDEsIDYsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDBcIiwgMTAsIDE0LCAxLCAyLCBbU3ByaXRlcy5SZWRCbG9ja10pKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UwXCIsIDMyMCwgNDE2LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UxXCIsIDMyMCwgMzg0LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UyXCIsIDI4OCwgMzUyLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbnRpYXRlKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdExldmVsKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IHsgSURpc3Bvc2FibGUgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi9TQVQvU0FUJztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNPYmplY3QgaW1wbGVtZW50cyBJRGlzcG9zYWJsZSB7XHJcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbjtcclxuICAgIHB1YmxpYyBjb2xsaXNpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgdzogbnVtYmVyID0gMCwgaDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICBpZiAodyA9PSAwICYmIGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3RvcigwLCBoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IodywgMClcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2xsOiBib29sZWFuID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCAmJiBiQ29sbCAmJiB0aGlzLmNvbGxpc2lvbikgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHt9XHJcbn0iLCJpbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4vU3ByaXRlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBTcHJpdGUsIFNwcml0ZXMgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBlbnVtIFNwaWtlRGlyZWN0aW9uIHtcclxuICAgIFVwLCBSaWdodCwgRG93biwgTGVmdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZU9iamVjdCBleHRlbmRzIFNwcml0ZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbiA9IDApIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBTcGlrZU9iamVjdC5nZXREaXJTcHJpdGUoZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5MZWZ0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDE2KSwgbmV3IFZlY3RvcigzMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5Eb3duOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDE2LCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNwaWtlRGlyZWN0aW9uLlJpZ2h0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMTYpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDE2LCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDMxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkge1xyXG4gICAgICAgICAgICAob2JqIGFzIFBsYXllck9iamVjdCkuZGllKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpclNwcml0ZShkaXI6IFNwaWtlRGlyZWN0aW9uKTogU3ByaXRlIHtcclxuICAgICAgICBjb25zdCBzcGlrZURpclNwcml0ZXM6IFNwcml0ZVtdID0gW1Nwcml0ZXMuU3Bpa2VVcCwgU3ByaXRlcy5TcGlrZVJpZ2h0LCBTcHJpdGVzLlNwaWtlRG93biwgU3ByaXRlcy5TcGlrZUxlZnRdO1xyXG4gICAgICAgIHJldHVybiBzcGlrZURpclNwcml0ZXNbZGlyXTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZTogU3ByaXRlKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLnNvdXJjZSwgdGhpcy5zcHJpdGUueCwgdGhpcy5zcHJpdGUueSwgdGhpcy5zcHJpdGUudywgdGhpcy5zcHJpdGUuaCwgdGhpcy5wb2x5Z29uLnBvcy54IHwgMCwgdGhpcy5wb2x5Z29uLnBvcy55IHwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZWRTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlczogU3ByaXRlW107XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhbmltRHVyYXRpb246IG51bWJlcjtcclxuICAgIHByaXZhdGUgZnJhbWVUaW1lcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZXM6IFNwcml0ZVtdLCBhbmltRHVyYXRpb246IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBzcHJpdGVzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICB0aGlzLmFuaW1EdXJhdGlvbiA9IGFuaW1EdXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAodGhpcy5mcmFtZVRpbWVyICsgZGVsdGEpICUgdGhpcy5hbmltRHVyYXRpb247XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWVyICogdGhpcy5zcHJpdGVzLmxlbmd0aCAvIHRoaXMuYW5pbUR1cmF0aW9uKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlc1tpXS5zb3VyY2UsIHRoaXMuc3ByaXRlc1tpXS54LCB0aGlzLnNwcml0ZXNbaV0ueSwgdGhpcy5zcHJpdGVzW2ldLncsIHRoaXMuc3ByaXRlc1tpXS5oLCB0aGlzLnBvbHlnb24ucG9zLnggfCAwLCB0aGlzLnBvbHlnb24ucG9zLnkgfCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSBcIi4vQmFzaWNPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzcHJpdGVMaXN0OiBTcHJpdGVbXTtcclxuICAgIHB1YmxpYyB4UmVwZWF0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeVJlcGVhdDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVXaWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBvcmRlcjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgeFJlcGVhdDogbnVtYmVyLCB5UmVwZWF0OiBudW1iZXIsIHNwcml0ZXM6IFNwcml0ZVtdLCBvcmRlcj86IG51bWJlcltdLCB0aWxlV2lkdGg6IG51bWJlciA9IHNwcml0ZXNbMF0udywgdGlsZUhlaWdodDogbnVtYmVyID0gc3ByaXRlc1swXS5oKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB4UmVwZWF0ICogdGlsZVdpZHRoLCB5UmVwZWF0ICogdGlsZUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy54UmVwZWF0ID0geFJlcGVhdDtcclxuICAgICAgICB0aGlzLnlSZXBlYXQgPSB5UmVwZWF0O1xyXG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gdGlsZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVMaXN0ID0gc3ByaXRlcztcclxuICAgICAgICBpZiAob3JkZXIgIT09IHVuZGVmaW5lZCkgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54UmVwZWF0ICogdGhpcy55UmVwZWF0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZTogU3ByaXRlID0gdGhpcy5zcHJpdGVMaXN0W2kgPCB0aGlzLm9yZGVyLmxlbmd0aCA/IHRoaXMub3JkZXJbaV0gOiAwXTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHJpdGUuc291cmNlLCBzcHJpdGUueCwgc3ByaXRlLnksIHNwcml0ZS53LCBzcHJpdGUuaCxcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3MueCArIChpICUgdGhpcy54UmVwZWF0KSAqIHRoaXMudGlsZVdpZHRoLCB0aGlzLnBvbHlnb24ucG9zLnkgKyBNYXRoLmZsb29yKGkgLyB0aGlzLnhSZXBlYXQpICogdGhpcy50aWxlSGVpZ2h0LCB0aGlzLnRpbGVXaWR0aCwgdGhpcy50aWxlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi8uLi9TQVQvU0FUJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBJbWFnZUxpc3QgfSBmcm9tICcuLi8uLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvb2RQYXJ0aWNsZSBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdHVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDIsIDIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdHVjaykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4ID4gMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1Y2sgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMudHlwZSAqIDMsIDM0LCAzLCA0LCB0aGlzLnBvbHlnb24ucG9zLnggLSAxLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCAzLCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgZnJhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4IC0gNSwgeSAtIDEsIDEwLCAyKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmRpcmVjdGlvbiAqIDc1MCAqIGRlbHRhLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgPSAodGhpcy5mcmFtZVRpbWUgKyBkZWx0YSkgJSAwLjIwO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApICogNCwgMTYwLCA0LCA0LCAodGhpcy5wb2x5Z29uLnBvcy54IHwgMCkgKyAzLCAodGhpcy5wb2x5Z29uLnBvcy55IHwgMCkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuLi8uLi9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSBcIi4vUGxheWVyT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWtlUGxheWVyT2JqZWN0IGV4dGVuZHMgUGxheWVyT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMTEyLCB5OiBudW1iZXIgPSA1MTIsIGlkOiBzdHJpbmcgPSBcImZha2VfcGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCBpZCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmR4ID0gTnVtYmVyLkVQU0lMT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmlnaHRLZXlUaW1lKysgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNhdmUgPSAodGhpcy5zZWxlY3RlZFNhdmUgKyAxKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUrKyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2F2ZSA9ICh0aGlzLnNlbGVjdGVkU2F2ZSAtIDEgKyAzKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ1NoaWZ0JykgfHwgR2FtZS5pc0J1dHRvbkRvd24oJ3onKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICBHYW1lLmxvYWRTYXZlKHRoaXMuc2VsZWN0ZWRTYXZlKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgPSAxMTIgKyB0aGlzLnNlbGVjdGVkU2F2ZSAqIDMyICogODtcclxuICAgICAgICBsZXQgZHggPSBNYXRoLm1pbihNYXRoLmFicyh0aGlzLnBvbHlnb24ucG9zLnggLSB0YXJnZXRQb3MpLCBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiA0ICogZGVsdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMucG9seWdvbi5wb3MueCA+IHRhcmdldFBvcyA/IC1keCA6IGR4LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge31cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpYlBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYm9keVZhcmlhbnQ6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSAwOiBib2R5LFxyXG4gICAgICogdHlwZSAxOiBib2R5IHN0b25lZCxcclxuICAgICAqIHR5cGUgMjogaGVhZCxcclxuICAgICAqIHR5cGUgMzogaGVhZCBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDQ6IGFybSxcclxuICAgICAqIHR5cGUgNTogYXJtIHN0b25lZCxcclxuICAgICAqIHR5cGUgNjogZmVldCxcclxuICAgICAqIHR5cGUgNzogZmVldCBzdG9uZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHR5cGU6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCA4LCA4KTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDAgfHwgdGhpcy50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5VmFyaWFudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIE1hdGgubWluKGRlbHRhLCAwLjMpO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aGlzQUFCQjogUG9seWdvbiA9IHRoaXMucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCAwLCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDEwLCAxOCwgMTAsIDE2LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMTAsIDE2KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAzNiwgMTgsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQsIGJ1ZmZlckRyYXdJbWFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL0NvbW1vblV0aWxzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJsb29kUGFydGljbGUgZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IEdpYlBhcnRpY2xlIGZyb20gJy4vR2liUGFydGljbGUnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uLy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0LCBTcHJpdGVzIH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4uL1Nwcml0ZU9iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllck9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmVsb2NpdHk6IG51bWJlciA9IDE3NTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ3Jhdml0eTogbnVtYmVyID0gMjQ7XHJcblxyXG4gICAgcHVibGljIGZyYW1lVGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoOSwgMTEpLCBuZXcgVmVjdG9yKDksIDMyKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigyMywgMzIpLCBuZXcgVmVjdG9yKDIzLCAxMSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogTWF0aC5tYXgoZGVsdGEsIE51bWJlci5FUFNJTE9OKTtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEtleVRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUgPT0gMCB8fCB0aGlzLnJpZ2h0S2V5VGltZSA8IHRoaXMubGVmdEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLnJpZ2h0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd0xlZnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0S2V5VGltZSA9PSAwIHx8IHRoaXMubGVmdEtleVRpbWUgPCB0aGlzLnJpZ2h0S2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keCA9IC1QbGF5ZXJPYmplY3QudmVsb2NpdHkgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmxlZnRLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoKEdhbWUuaXNCdXR0b25Eb3duKCdTaGlmdCcpIHx8IEdhbWUuaXNCdXR0b25Eb3duKCd6JykpICYmICh0aGlzLmF2YWlsYWJsZUp1bXBzICE9IDAgfHwgdGhpcy5qdW1wS2V5VGltZSAhPSAwKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVKdW1wcyA9PSAxKSBBdWRpb01hbmFnZXIucGxheShcImp1bXAxXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMS53YXZcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIEF1ZGlvTWFuYWdlci5wbGF5KFwianVtcDJcIiwgXCJhc3NldHMvc291bmRzL2p1bXAyLndhdlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmp1bXBLZXlUaW1lICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSA8IDAuMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgdGhpcy5keSA9IC0yMzUgKiBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5keSA9IC0xNzAgKiBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmp1bXBLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHggIT0gMCkgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gTWF0aC5zaWduKHRoaXMuZHgpO1xyXG4gICAgICAgIHRoaXMuZHkgPSBNYXRoLm1heChNYXRoLm1pbih0aGlzLmR5LCAxMC42NjYpLCAtMTAuNjY2KTtcclxuICAgICAgICBsZXQgZXhwZWN0ZWRQb3M6IFZlY3RvciA9IChuZXcgVmVjdG9yKHRoaXMuZHgsIHRoaXMuZHkpKS5hZGQodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgdGhpcy5vbkdyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSAmJiB0aGlzLnBvbHlnb24ucG9zLnkgIT0gZXhwZWN0ZWRQb3MueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keSA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEhpdCB0aGUgY2VpbGluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBLZXlUaW1lID0gMC4zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gT24gZ3JvdW5kXHJcbiAgICAgICAgICAgICAgICB0aGlzLmR5ID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Hcm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcyA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uR3JvdW5kICYmIHRoaXMuYXZhaWxhYmxlSnVtcHMgPiAxKSB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMTsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob290KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBidWxsZXRJZDogc3RyaW5nID0gXCJidWxsZXRcIiArIHJhbmRvbVVuc2VjdXJlVVVJRCgpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5KGJ1bGxldElkLCBcImFzc2V0cy9zb3VuZHMvZmlyZS53YXZcIikub25lbmRlZCA9IGUgPT4geyBBdWRpb01hbmFnZXIucmVsZWFzZShidWxsZXRJZCk7IH07XHJcbiAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBCdWxsZXRPYmplY3QodGhpcy5wb2x5Z29uLnBvcy54ICsgMTYgKyAxMCAqIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgMjEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24sIGJ1bGxldElkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUubGV2ZWwuaXNSZW1vdmVkKHRoaXMuaWQpKSByZXR1cm47XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgbGV0IGNlbnRlcjogVmVjdG9yID0gdGhpcy5wb2x5Z29uLmdldENlbnRyb2lkKCkuYWRkKHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcclxuICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IEJsb29kUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiA2LCBNYXRoLnNpbihNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJibG9vZF9cIiArIHRoaXMuaWQgKyBcIl9cIiArIGlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpICs9IDIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCAoaSA+IDMgPyAyIDogMSk7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IEdpYlBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LCBNYXRoLnNpbihNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGksIFwiZ2liX1wiICsgdGhpcy5pZCArIFwiX1wiICsgKGkgKyBvKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlNdXNpYyhcImFzc2V0cy9tdXNpYy9nYW1lb3Zlci5vZ2dcIiwgZmFsc2UpO1xyXG4gICAgICAgIGxldCBkZWF0aE1lc3NhZ2U6IFNwcml0ZU9iamVjdCA9IG5ldyBTcHJpdGVPYmplY3QoXCJkZWF0aF9tZXNzYWdlXCIsIDQwMCAtIDM1MCwgMzA0IC0gODIsIDcwMCwgMTY0LCBTcHJpdGVzLkRlYXRoTWVzc2FnZSk7XHJcbiAgICAgICAgZGVhdGhNZXNzYWdlLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKGRlYXRoTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAodGhpcy5mcmFtZVRpbWVyICsgZGVsdGEpICUgMC40MDtcclxuICAgICAgICBsZXQgc2xvd0ZyYW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lciAqIDQgLyAwLjQwKTtcclxuICAgICAgICBsZXQgZmFzdEZyYW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lciAqIDIgLyAwLjEwKTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBpZiAodGhpcy5sb29raW5nRGlyZWN0aW9uID09IC0xKSB7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW52YXMud2lkdGggLSB0aGlzLnBvbHlnb24ucG9zLnggfCAwLCB0aGlzLnBvbHlnb24ucG9zLnkgfCAwKTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtICh0aGlzLnBvbHlnb24ucG9zLnggfCAwKSAqIDIgLSAzMiwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvbHlnb24ucG9zLnggfCAwLCB0aGlzLnBvbHlnb24ucG9zLnkgfCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR5IDwgMCkge1xyXG4gICAgICAgICAgICAvLyBKdW1waW5nXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1bXBLZXlUaW1lICE9IDAgJiYgdGhpcy5qdW1wS2V5VGltZSA8IDAuMDIpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIDAsIDY0LCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuanVtcEtleVRpbWUgIT0gMCAmJiB0aGlzLmp1bXBLZXlUaW1lIDwgMC4wNCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgMzIsIDY0LCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgKGZhc3RGcmFtZSAlIDIpICogMzIgKyA2NCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxpbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgKGZhc3RGcmFtZSAlIDIpICogMzIsIDk2LCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgKGZhc3RGcmFtZSAlIDQpICogMzIsIDMyLCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElkbGVcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgc2xvd0ZyYW1lICogMzIsIDAsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIFVVSUQuIFRoZSBJRCBtaWdodCBub3QgYmUgdW5pcXVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuc2VjdXJlVVVJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICd4eHh4LXh4eHgteHh4LXh4eHgnLnJlcGxhY2UoL1t4XS9nLCAoYykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KTsgIFxyXG4gICAgICAgIHJldHVybiByLnRvU3RyaW5nKDE2KTsgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGJ1ZmZlckNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1ZmZlci1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmNvbnN0IGJ1ZmZlckN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKCgpID0+IHtcclxuICAgIGxldCBjdHggPSBidWZmZXJDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcclxuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBjdHg7XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogRHJhd3MgYW4gaW1hZ2UgdG8gdGhlIChjbGVhbmVkKSBidWZmZXIgY2FudmFzLiBDYW4gYmUgdXNlZCB0byBkcmF3IGEgcGFydCBvZiBhbiBpbWFnZSB0byB0aGUgbWFpbiBjYW52YXMgd2l0aG91dCB0cmFuc2Zvcm0tY2F1c2VkIGFydGlmYWN0cy5cclxuICogQHBhcmFtIGltYWdlIGFuIGVsZW1lbnQgdG8gZHJhdyBpbnRvIHRoZSBjb250ZXh0LlxyXG4gKiBAcGFyYW0gc3ggeC1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3kgeS1heGlzIGNvb3JkaW5hdGUgb2YgdGhlIHNvdXJjZSBpbWFnZSdzIHRvcCBsZWZ0IGNvcm5lclxyXG4gKiBAcGFyYW0gc3cgd2lkdGggb2YgdGhlIHNvdXJjZSBpbWFnZSByZWdpb24gdG8gZHJhd1xyXG4gKiBAcGFyYW0gc2ggaGVpZ2h0IG9mIHRoZSBzb3VyY2UgaW1hZ2UgcmVnaW9uIHRvIGRyYXdcclxuICogQHJldHVybnMgdGhlIGJ1ZmZlciBjYW52YXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJEcmF3SW1hZ2UoaW1hZ2U6IENhbnZhc0ltYWdlU291cmNlLCBzeDogbnVtYmVyLCBzeTogbnVtYmVyLCBzdzogbnVtYmVyLCBzaDogbnVtYmVyKTogSFRNTENhbnZhc0VsZW1lbnQge1xyXG4gICAgYnVmZmVyQ2FudmFzLndpZHRoID0gc3c7XHJcbiAgICBidWZmZXJDYW52YXMuaGVpZ2h0ID0gc2g7XHJcbiAgICBidWZmZXJDdHguY2xlYXJSZWN0KDAsIDAsIGJ1ZmZlckNhbnZhcy53aWR0aCwgYnVmZmVyQ2FudmFzLmhlaWdodCk7XHJcbiAgICBidWZmZXJDdHguZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgMCwgMCwgc3csIHNoKTtcclxuICAgIHJldHVybiBidWZmZXJDYW52YXM7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIVxyXG4qIEkgV2FubmEgQmUgVGhlIEd1eTogVGhlIE1vdmllOiBUaGUgR2FtZVxyXG4qIFR5cGVTY3JpcHQgcmVtYWtlIG1hZGUgYnkgUEdnYW1lcjIgKGFrYSBTb25vUEcpLlxyXG4qIFlvdSBjYW4gZmluZCB0aGUgc291cmNlIGNvZGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL1BHZ2FtZXIyL0lXQlRHLnRzXHJcbiogT3JpZ2luYWwgZ2FtZSBtYWRlIGJ5IEtheWluOiBodHRwczovL2theWluLm1vZS9pd2J0Zy9cclxuKi9cclxuXHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4vQXVkaW9NYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcclxuXHJcbmZ1bmN0aW9uIGZyYW1lKHRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCkge1xyXG4gICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pXHJcbiAgICAgICAgR2FtZS51cGRhdGUodGltZXN0YW1wKTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpO1xyXG59XHJcbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpO1xyXG5cclxub25rZXlkb3duID0gZnVuY3Rpb24oZSkge1xyXG4gICAgR2FtZS5rZXlNYXAuc2V0KGUua2V5Lmxlbmd0aCA9PSAxID8gZS5rZXkudG9Mb3dlckNhc2UoKSA6IGUua2V5LCB0cnVlKTtcclxuICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeCgpO1xyXG59O1xyXG5vbmtleXVwID0gZnVuY3Rpb24oZSkgeyBHYW1lLmtleU1hcC5zZXQoZS5rZXkubGVuZ3RoID09IDEgPyBlLmtleS50b0xvd2VyQ2FzZSgpIDogZS5rZXksIGZhbHNlKTsgfTsiXSwibmFtZXMiOlsiU3ByaXRlcyIsIlNwaWtlRGlyZWN0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==