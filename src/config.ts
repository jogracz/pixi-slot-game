// export const GAME_WIDTH = 800;
// export const GAME_HEIGHT = 600;
// export const NUMBER_OF_REELS = 5;
// export const REEL_WIDTH = GAME_WIDTH / 5;
// export const SYMBOL_WIDTH = REEL_WIDTH;
// export const SPINNING_SPEED = 100;

export interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  numberOfReels: number;
  reelWidth: number;
  symbolWidth: number;
  spinningSpeed: number;
  minMatching: number;
  defaultScore: number;
  prize: number;
}

const config = {
  gameWidth: 800,
  gameHeight: 600,
  screenWidth: 700,
  srceenHeight: 400,
  numberOfReels: 5,
  reelLength: 3,
  reelWidth: 700 / 5,
  symbolWidth: 700 / 5,
  spinningSpeed: 10,
  minMatch: 3,
  defaultScore: 100,
  prize: 5,
};

export default config;
