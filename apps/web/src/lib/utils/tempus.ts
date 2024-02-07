/**
 * Type definition for a callback function that can be registered with the Raf class.
 * @callback Callback
 * @param {number} [now] - The current timestamp.
 * @param {number} [deltaTime] - The time elapsed since the last frame.
 */
type Callback = (now?: number, deltaTime?: number) => void;

/**
 * Class to manage and execute callback functions in sync with the browser's repaint using requestAnimationFrame.
 */
class Raf {
  /**
   * An array of objects containing callback functions and their priority.
   */
  callbacks: { callback: Callback; priority: number }[] = [];

  /**
   * The timestamp of the last execution of requestAnimationFrame.
   */
  now: number = performance.now();

  /**
   * Initializes the Raf class, sets up the requestAnimationFrame loop.
   */
  constructor() {
    if (typeof window === 'undefined') return;

    this.callbacks = [];
    this.now = performance.now();

    requestAnimationFrame(this.raf);
  }

  /**
   * Adds a callback function to be executed with each requestAnimationFrame call.
   * Callbacks are sorted and executed based on their priority.
   *
   * @param {Callback} callback - The callback function to be executed.
   * @param {number} [priority=0] - The priority of the callback, lower values indicate higher priority.
   * @returns {Function} A function to remove the added callback.
   */
  add(callback: Callback, priority = 0): () => void {
    this.callbacks.push({ callback, priority });
    this.callbacks.sort((a, b) => a.priority - b.priority);

    return () => this.remove(callback);
  }

  /**
   * Removes a callback function from the list of callbacks.
   *
   * @param {Callback} callback - The callback function to be removed.
   */
  remove(callback: Callback): void {
    this.callbacks = this.callbacks.filter(({ callback: cb }) => callback !== cb);
  }

  /**
   * The requestAnimationFrame loop. Executes all callbacks with the current timestamp and deltaTime.
   *
   * @param {number} now - The current timestamp.
   */
  raf = (now: number): void => {
    requestAnimationFrame(this.raf);

    const deltaTime = now - this.now;
    this.now = now;

    for (let i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i].callback(now, deltaTime);
    }
  };
}

const raf = new Raf();
export { raf };
