import { GameInterface } from "./Game";

export interface ScreenInterface {
  game: GameInterface;
  reels: any[];
  numberOfReels: number;
  isSpinning: boolean;
  update(delta: number): void;
  spin(): void;
}

class Screen implements ScreenInterface {
  game: GameInterface;
  reels: any[];
  numberOfReels: number;
  isSpinning: boolean;

  constructor(game: GameInterface, numberOfReels: number) {
    this.game = game;
    this.reels = [];
    this.numberOfReels = numberOfReels;
    this.isSpinning = false;

    console.log("Hello, it's the Screen!");
  }
  update(delta: number) {
    this.reels.forEach((reel) => {
      reel.update(delta);
    });
  }
  spin() {
    this.reels.forEach((reel) => {
      reel.spin();
    });
  }
}

export default Screen;
