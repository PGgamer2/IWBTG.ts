/**
 * ## Vector
 * 
 * Represents a vector in two dimensions with `x` and `y` properties.
 * 
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If a coordinate is not specified, 
 * it will be set to `0`.
 */
export default class Vector {
  public x: number;
  public y: number;

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
  public copy(other: Vector): Vector {
    this.x = other.x;
    this.y = other.y;

    return this;
  }

  /**
   * Create a new Vector with the same coordinates as the one.
   * 
   * @returns {Vector} The new cloned Vector.
   */
  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  /**
   * Change this Vector to be perpendicular to what it was before.
   * 
   * Effectively this rotates it 90 degrees in a clockwise direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  public perp(): Vector {
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
  public rotate(angle: number): Vector {
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
  public reverse(): Vector {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Normalize this vector (make it have a length of `1`).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  public normalize(): Vector {
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
  public add(other: Vector): Vector {
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
  public sub(other: Vector): Vector {
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
  public scale(x: number, y?: number): Vector {
    this.x *= x;
    this.y *= typeof y != 'undefined' ? y : x;

    return this;
  }

  /**
   * Project this Vector onto another Vector.
   * 
   * @param {Vector} other The Vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  public project(other: Vector): Vector {
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
  public projectN(other: Vector): Vector {
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
  public reflect(axis: Vector): Vector {
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
  public reflectN(axis: Vector): Vector {
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
  public dot(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Get the squared length of this Vector.
   * 
   * @returns {number} Returns squared length.
   */
  public len2(): number {
    return this.dot(this);
  }

  /**
   * Get the length of this Vector.
   * 
   * @returns {number} Returns length.
   */
  public len(): number {
    return Math.sqrt(this.len2());
  }
}