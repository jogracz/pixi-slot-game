export interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  screenWidth: number;
  srceenHeight: number;
  numberOfReels: number;
  reelLength: number;
  reelWidth: number;
  symbolWidth: number;
  symbolHeight: number;
  spinningSpeed: number;
  minMatch: number;
  defaultScore: number;
  prize: number;
  symbolIds: string[];
}

const config: ConfigInterface = {
  gameWidth: 800,
  gameHeight: 600,
  screenWidth: 700,
  srceenHeight: 400,
  numberOfReels: 5,
  reelLength: 3,
  reelWidth: 700 / 5,
  symbolWidth: 700 / 5,
  symbolHeight: 400 / 3,
  spinningSpeed: 15,
  minMatch: 3,
  defaultScore: 100,
  prize: 5,
  symbolIds: [
    "s9",
    "s10",
    "A",
    "J",
    "K",
    "Q",
    "H1",
    "H3",
    "H4",
    "H5",
    "H6",
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
  ],
};

export default config;
