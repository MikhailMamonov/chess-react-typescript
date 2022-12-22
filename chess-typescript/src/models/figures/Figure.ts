import { Cell } from '../Cell';
import { Colors } from '../Colors';
import logo from '../../assets/black-king.png';

/**
 *Перечисление названий фигур
 *
 * @export
 * @enum {number}
 */
export enum FigureNames {
  FIGURE = 'Фигура',
  KING = 'Король',
  KNIGHT = 'Конь',
  PAWN = 'Пешка',
  QUEEN = 'Ферзь',
  ROOK = 'Ладья',
  BISHOP = 'Слон',
}

/**
 *Базовый класс фигуры
 *
 * @export
 * @class Figure
 */
export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  /**
   * Creates an instance of Figure.
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Figure
   */
  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  /**
   *Возможно ли перемещение в эту ячейку
   *
   * @return {*}  {boolean}
   * @memberof Figure
   */
  canMove(targetCell: Cell): boolean {
    if (this.color === targetCell.figure?.color) return false;
    if (targetCell.figure?.name === FigureNames.KING) return false;
    return true;
  }

  /**
   *Переместить фигуру
   *
   * @param {Cell} target целевая ячейка
   * @memberof Figure
   */
  moveFigure(target: Cell): void {}
}
