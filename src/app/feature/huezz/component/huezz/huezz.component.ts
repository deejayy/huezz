import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cell, CellPos } from '@feature/huezz/model/huezz.model';
import { ScoreFacade } from '@feature/huezz/module/score/store/score.facade';
import { SettingsFacade } from '@feature/settings/store/settings.facade';
import { Observable, Subscription, combineLatest, fromEvent, map, startWith, take, tap, withLatestFrom } from 'rxjs';

const RAND_ITER = 1;
const CELL_SIZE_PX = 100;
const COLOR_SCALE = 256;
const COLOR_HALVING = 128;
const DIFFIULTY_DIVIDER = 10;
const DEFAULT_DIFFICULTY = 10;
const COLOR_REVERSE = -1;
const DIRECTION_DIVIDER = 0.5;

@Component({
  selector: 'app-huezz',
  templateUrl: './huezz.component.html',
  styleUrl: './huezz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HuezzComponent implements OnDestroy, OnInit {
  @ViewChild('svg', { read: ElementRef, static: true }) public svg!: ElementRef<HTMLElement>;
  @ViewChild('restartButton', { read: ElementRef, static: true }) public restartButton!: ElementRef<HTMLButtonElement>;

  public cellSize: number = CELL_SIZE_PX;

  public cellsX$: Observable<number> = this.settingsFacade.boardWidth$;
  public cellsY$: Observable<number> = this.settingsFacade.boardHeight$;
  public difficulty$: Observable<number> = this.settingsFacade.difficulty$;

  public width$: Observable<number> = this.cellsX$.pipe(map((v) => v * this.cellSize));
  public height$: Observable<number> = this.cellsY$.pipe(map((v) => v * this.cellSize));

  public grid: Cell[][] = [[]];
  public sourceCell: CellPos | undefined;
  public targetCell: CellPos | undefined;

  private subs: Subscription = new Subscription();

  public newFeatures$: Observable<boolean> = this.settingsFacade.newFeatures$;

  constructor(private settingsFacade: SettingsFacade, private scoreFacade: ScoreFacade, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.subs.add(
      combineLatest([
        this.cellsX$,
        this.cellsY$,
        this.difficulty$,
        fromEvent<TouchEvent>(this.restartButton.nativeElement, 'click').pipe(startWith(true)),
      ])
        .pipe(
          tap(([x, y, level]) => {
            this.grid = this.createGrid(x, y, level);
            this.shuffleGrid(x, y);
            this.scoreFacade.startGame(x * y - this.checkGameEnd(this.grid));
          }),
        )
        .subscribe(() => this.cdr.markForCheck()),
    );

    this.subs.add(
      combineLatest([fromEvent<TouchEvent>(this.svg.nativeElement, 'touchmove'), this.cellsX$]).subscribe(
        ([event, width]: [TouchEvent, number]) => {
          this.targetCell = this.touchToCellPos(event.touches[0]!, width);
        },
      ),
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

  private createGrid(width: number, height: number, difficulty: number = DEFAULT_DIFFICULTY): Cell[][] {
    const dir = Math.random() > DIRECTION_DIVIDER ? 1 : 0;

    const startR = Math.floor(Math.random() * COLOR_SCALE);
    const startG = Math.floor(Math.random() * COLOR_SCALE);
    const startB = Math.floor(Math.random() * COLOR_SCALE);

    const stepR =
      Math.floor((startR < COLOR_HALVING ? COLOR_SCALE - startR : COLOR_REVERSE * startR) / height) * (difficulty / DIFFIULTY_DIVIDER);
    const stepG =
      Math.floor((startG < COLOR_HALVING ? COLOR_SCALE - startG : COLOR_REVERSE * startG) / width) * (difficulty / DIFFIULTY_DIVIDER);
    const stepB =
      Math.floor((startB < COLOR_HALVING ? COLOR_SCALE - startB : COLOR_REVERSE * startB) / (dir ? width : height)) *
      (difficulty / DIFFIULTY_DIVIDER);

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

  // eslint-disable-next-line complexity
  private replaceCell(sourcePos: CellPos | undefined, targetPos: CellPos | undefined): boolean {
    if (
      sourcePos &&
      targetPos &&
      `${sourcePos.x}/${sourcePos.y}` !== `${targetPos.x}/${targetPos.y}` &&
      this.grid[sourcePos.y]?.[sourcePos.x] &&
      this.grid[targetPos.y]?.[targetPos.x]
    ) {
      const elem = this.grid[sourcePos.y]![sourcePos.x]!;
      this.grid[sourcePos.y]![sourcePos.x] = this.grid[targetPos.y]![targetPos.x]!;
      this.grid[targetPos.y]![targetPos.x] = elem;
      return true;
    }

    return false;
  }

  public checkGameEnd(grid: Cell[][]): number {
    return grid
      .map((row, r) => {
        return row.filter((cell, c) => cell.pos[0] !== c || cell.pos[1] !== r).length;
      })
      .reduce((acc, curr) => acc + curr, 0);
  }

  private dropCell() {
    if (this.replaceCell(this.sourceCell, this.targetCell)) {
      this.sourceCell = undefined;
      this.targetCell = undefined;

      this.scoreFacade.addStep();

      if (this.checkGameEnd(this.grid) === 0) {
        this.difficulty$.pipe(take(1), withLatestFrom(this.cellsX$, this.cellsY$)).subscribe(([level, x, y]) => {
          this.scoreFacade.endGame(level, x, y);
        });
      }
    }
  }

  public touchStart(pos: CellPos) {
    this.sourceCell = pos;
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
