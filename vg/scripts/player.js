function createPlayer() {
  return {
    lives: 5,
    get alive() {
      return this.lives > 0;
    },
    loseLife() {
      this.lives--;
    },
  };
}

export { createPlayer };
