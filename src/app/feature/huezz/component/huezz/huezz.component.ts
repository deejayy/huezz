import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cell } from '@feature/huezz/model/huezz.model';

const GRID_SIZE = 10;
const RAND_ITER = GRID_SIZE * GRID_SIZE;
const GRID_WIDTH = 500;
const COLOR_MAX = 256;
const COLOR_START = 0;
const COLOR_CENTER = 2;
const DIST = Math.floor((COLOR_MAX - COLOR_START) / GRID_SIZE);

@Component({
  selector: 'app-huezz',
  templateUrl: './huezz.component.html',
  styleUrl: './huezz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HuezzComponent {
  public gridSize = GRID_SIZE;
  public gridWidth = GRID_WIDTH;

  public grid: Cell[][] = Array.from({ length: GRID_SIZE }, (_1, r) =>
    Array.from({ length: GRID_SIZE }, (_2, c) => ({ r: 128, g: 128, b: 128, pos: [r, c] })),
  );

  private dragging: boolean = false;
  private pickedX: number | undefined;
  private pickedY: number | undefined;
  private dropX: number | undefined;
  private dropY: number | undefined;

  constructor() {
    this.generateGrid();
    this.shuffle();
  }

  public generateGrid() {
    this.grid = Array.from({ length: GRID_SIZE }, (_1, r) =>
      Array.from({ length: GRID_SIZE }, (_2, c) => ({
        r: (COLOR_START + (COLOR_MAX - DIST * GRID_SIZE)) / COLOR_CENTER + c * DIST,
        g: (COLOR_START + (COLOR_MAX - DIST * GRID_SIZE)) / COLOR_CENTER + c * DIST,
        b: (COLOR_START + (COLOR_MAX - DIST * GRID_SIZE)) / COLOR_CENTER + r * DIST,
        pos: [r, c],
      })),
    );
  }

  public shuffle() {
    for (let i = 0; i < RAND_ITER; i++) {
      const rX1 = Math.floor(Math.random() * GRID_SIZE);
      const rY1 = Math.floor(Math.random() * GRID_SIZE);
      const rX2 = Math.floor(Math.random() * GRID_SIZE);
      const rY2 = Math.floor(Math.random() * GRID_SIZE);
      if (
        !['0/0', `0/${this.gridSize - 1}`, `${this.gridSize - 1}/0`, `${this.gridSize - 1}/${this.gridSize - 1}`].includes(
          `${rX1}/${rY1}`,
        ) &&
        !['0/0', `0/${this.gridSize - 1}`, `${this.gridSize - 1}/0`, `${this.gridSize - 1}/${this.gridSize - 1}`].includes(`${rX2}/${rY2}`)
      ) {
        const elem = this.grid[rX1]![rY1]!;
        this.grid[rX1]![rY1] = this.grid[rX2]![rY2]!;
        this.grid[rX2]![rY2] = elem;
      }
    }
  }

  private getTouchCoords = (_event: TouchEvent) => {
    const posX = Math.floor(
      (_event.targetTouches[0]!.clientX - (document.querySelector('.boxes') as HTMLElement).offsetLeft) / (this.gridWidth / this.gridSize),
    );
    const posY = Math.floor(
      (_event.targetTouches[0]!.clientY - (document.querySelector('.boxes') as HTMLElement).offsetTop) / (this.gridWidth / this.gridSize),
    );

    return { x: posX, y: posY };
  };

  public touchStart(_event: TouchEvent) {
    const pos = this.getTouchCoords(_event);
    this.pickedX = pos.x;
    this.pickedY = pos.y;

    this.dragging = true;
  }

  private inRange = (place: number | undefined): boolean => {
    return place !== undefined && place >= 0 && place <= this.gridSize - 1;
  };

  public touchEnd(drop: boolean = true) {
    this.dragging = false;
    if (drop) {
      if ([this.pickedX, this.pickedY, this.dropX, this.dropY].every(this.inRange)) {
        const elem = this.grid[this.pickedY!]![this.pickedX!]!;
        this.grid[this.pickedY!]![this.pickedX!] = this.grid[this.dropY!]![this.dropX!]!;
        this.grid[this.dropY!]![this.dropX!] = elem;
      }
      console.warn(this.grid, this.checkGameEnd(this.grid));
    }
    this.dropX = undefined;
    this.dropY = undefined;
    this.pickedX = undefined;
    this.pickedY = undefined;
  }

  public touchMove(_event: TouchEvent) {
    if (this.dragging) {
      const pos = this.getTouchCoords(_event);
      this.dropX = pos.x;
      this.dropY = pos.y;
    }
  }

  private checkGameEnd(grid: Cell[][]) {
    const res = grid
      .map((row, r) => {
        return row.every((cell, c) => cell.pos[0] === r && cell.pos[1] === c);
      })
      .every(Boolean);
    console.warn(res);
  }
}
