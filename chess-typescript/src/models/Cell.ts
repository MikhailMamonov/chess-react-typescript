import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';
/**
 * Класс ячейки на доске
 */
export class Cell {
  isEnemy(targetCell: Cell): boolean {
    if (targetCell.figure) return targetCell.figure?.color !== this.color;
    return false;
  }
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // можно ли переместиться
  id: number; //для реакт ключей
  /**
   *
   * @param {Board} board - description
   * @param {number} x - description
   * @param {number} y - description
   *
   */
  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  /**
   *Является ли клетка пустой
   *
   * @return {*}  {boolean}
   * @memberof Cell
   */
  isEmpty(): boolean {
    return this.figure === null;
  }

  /**
   *Является ли клетка пустой по вертикали
   *
   * @param {Cell} target
   * @return {*}  {boolean}
   * @memberof Cell
   */
  isEmptyVertical(target: Cell): boolean {
    if (target.x !== this.x) return false;
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) return false;
    }
    return true;
  }

  /**
   *Является ли клетка пустой по горизонтали
   *
   * @param {Cell} target
   * @return {*}  {boolean}
   * @memberof Cell
   */
  isEmptyHorizontal(target: Cell): boolean {
    if (target.y !== this.y) return false;
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) return false;
    }
    return true;
  }

  /**
   *Является ли клетка пустой по диагонали
   *
   * @param {Cell} target
   * @return {*}  {boolean}
   * @memberof Cell
   */
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) return false;
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  /**
   *Переместить фигуру
   *
   * @param {Cell} target целевая клетка
   * @memberof Cell
   */
  public moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
