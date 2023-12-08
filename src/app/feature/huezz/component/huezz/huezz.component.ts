/* eslint-disable no-magic-numbers */
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Cell, CellPos } from '@feature/huezz/model/huezz.model';
import { SettingsFacade } from '@feature/settings/store/settings.facade';
import { Observable, Subscription, combineLatest, map, of, tap } from 'rxjs';

const RAND_ITER = 1;

@Component({
  selector: 'app-huezz',
  templateUrl: './huezz.component.html',
  styleUrl: './huezz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HuezzComponent implements OnDestroy {
  public cellSize: number = 100;

  public cellsX$: Observable<number> = of(5);
  public cellsY$: Observable<number> = of(10);

  public width$: Observable<number> = this.cellsX$.pipe(map((v) => v * this.cellSize));
  public height$: Observable<number> = this.cellsY$.pipe(map((v) => v * this.cellSize));

  public grid: Cell[][] = [[]];
  public sourceCell: CellPos | undefined;
  public targetCell: CellPos | undefined;

  private subs: Subscription = new Subscription();

  public newFeatures$: Observable<boolean> = this.settingsFacade.newFeatures$;

  constructor(private settingsFacade: SettingsFacade) {
    this.subs.add(
      combineLatest([this.cellsX$, this.cellsY$])
        .pipe(
          tap(([x, y]) => {
            this.grid = this.createGrid(x, y);
            this.shuffleGrid(x, y);
          }),
        )
        .subscribe(),
    );
  }

  private shuffleGrid(width: number, height: number) {
    for (let i = 0; i < RAND_ITER; i++) {
      const rX1 = Math.floor(Math.random() * width);
      const rY1 = Math.floor(Math.random() * height);
      const rX2 = Math.floor(Math.random() * width);
      const rY2 = Math.floor(Math.random() * height);
      if (
        !['0/0', `0/${height - 1}`, `${width - 1}/0`, `${width - 1}/${height - 1}`].includes(`${rX1}/${rY1}`) &&
        !['0/0', `0/${height - 1}`, `${width - 1}/0`, `${width - 1}/${height - 1}`].includes(`${rX2}/${rY2}`)
      ) {
        this.replaceCell({ x: rX1, y: rY1 }, { x: rX2, y: rY2 });
      }
    }
  }

  private createGrid(width: number, height: number): Cell[][] {
    const dir = Math.random() > 0.5 ? 1 : 0;

    const startR = Math.floor(Math.random() * 256);
    const stepR = Math.floor((startR < 128 ? 256 - startR : -1 * startR) / height);
    const startG = Math.floor(Math.random() * 256);
    const stepG = Math.floor((startG < 128 ? 256 - startG : -1 * startG) / width);
    const startB = Math.floor(Math.random() * 256);
    const stepB = Math.floor((startB < 128 ? 256 - startB : -1 * startB) / (dir ? width : height));

    return Array.from({ length: height }, (_1, ix) => {
      return Array.from({ length: width }, (_2, iy) => {
        return {
          r: startR + ix * stepR,
          g: startG + iy * stepG,
          b: startB + (dir ? ix : iy) * stepB,
          pos: [iy, ix],
        };
      });
    });
  }

  private touchToCellPos(touch: Touch, cellsX: number): CellPos {
    const container = document.querySelector('.boxes') as HTMLElement;
    const touchPos = { x: touch.clientX - container.offsetLeft, y: touch.clientY - container.offsetTop };
    const boxWidth = container.clientWidth / cellsX;
    return {
      x: Math.floor(touchPos.x / boxWidth),
      y: Math.floor(touchPos.y / boxWidth),
    };
  }

  private replaceCell(sourcePos: CellPos | undefined, targetPos: CellPos | undefined) {
    if (sourcePos && targetPos && this.grid[sourcePos.y]?.[sourcePos.x] && this.grid[targetPos.y]?.[targetPos.x]) {
      const elem = this.grid[sourcePos.y]![sourcePos.x]!;
      this.grid[sourcePos.y]![sourcePos.x] = this.grid[targetPos.y]![targetPos.x]!;
      this.grid[targetPos.y]![targetPos.x] = elem;
    }
  }

  public checkGameEnd(grid: Cell[][]): boolean {
    return grid
      .map((row, r) => {
        return row.every((cell, c) => cell.pos[0] === c && cell.pos[1] === r);
      })
      .every(Boolean);
  }

  private dropCell() {
    this.replaceCell(this.sourceCell, this.targetCell);
    this.sourceCell = undefined;
    this.targetCell = undefined;

    console.warn(this.checkGameEnd(this.grid));
  }

  public touchStart(pos: CellPos) {
    this.sourceCell = pos;
  }

  public touchMove(event: TouchEvent) {
    this.targetCell = this.touchToCellPos(event.touches[0]!, 3);
  }

  public touchEnd() {
    this.dropCell();
  }

  public mouseDown(pos: CellPos) {
    this.sourceCell = pos;
  }

  public mouseMove(pos: CellPos) {
    this.targetCell = pos;
  }

  public mouseUp() {
    this.dropCell();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
