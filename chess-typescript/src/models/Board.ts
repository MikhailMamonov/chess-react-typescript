import { Bishop } from './figures/Bishop';
import { Rook } from './figures/Rook';
import { Pawn } from './figures/Pawn';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { Queen } from './figures/Queen';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Figure } from './figures/Figure';

/**
 *шахматная доска
 *
 * @export
 * @class Board
 */
export class Board {
  cells: Cell[][] = [];
  lostWhiteFigures: Figure[] = [];
  lostBlackFigures: Figure[] = [];

  /**
   *Инициализация ячеек доски
   *
   * @memberof Board
   */
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  /**
   *Добавить потерянную фигуру
   *
   * @param {Figure} figure
   * @memberof Board
   */
  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }

  /**
   *Назначение доступных для хода ячеек
   *
   * @param {(Cell| null)} selectedCell выбранная ячейка
   * @memberof Board
   */
  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  /**
   * Получить копию текущей доски
   */
  public getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  /**
   *Получить экземпляр ячейки
   *
   * @param {number} x строка
   * @param {number} y столбец
   * @return {*}
   * @memberof Board
   */
  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  /**
   *Добавить пешек
   *
   * @private
   * @memberof Board
   */
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  /**
   *Добавить королей
   *
   * @private
   * @memberof Board
   */
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  /**
   *Добавить ферзей
   *
   * @private
   * @memberof Board
   */
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  /**
   *Добавить слонов
   *
   * @private
   * @memberof Board
   */
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  /**
   *Добавить коней
   *
   * @private
   * @memberof Board
   */
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  /**
   *Добавить ладьи
   *
   * @private
   * @memberof Board
   */
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  /**
   *Добавление фигур
   *
   * @memberof Board
   */
  public addFigures() {
    this.addPawns();
    this.addKnights();
    this.addKings();
    this.addBishops();
    this.addQueens();
    this.addRooks();
  }
}
