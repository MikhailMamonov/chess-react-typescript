import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

/**
 *Пешка
 *
 * @export
 * @class Pawn
 * @extends {Figure}
 */
export class Pawn extends Figure {
  isFirstStep: boolean = true;

  /**
   *Создать экземпляр Пешки
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Pawn
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof Pawn
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    //Логика хода
    if (
      (targetCell.y === this.cell.y + direction ||
        (this.isFirstStep &&
          targetCell.y === this.cell.y + firstStepDirection)) &&
      targetCell.x === this.cell.x &&
      this.cell.board.getCell(targetCell.x, targetCell.y).isEmpty()
    )
      return true;

    // Логика взятия фигуры
    if (
      targetCell.y === this.cell.y + direction &&
      (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1) &&
      this.cell.isEnemy(targetCell)
    )
      return true;
    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
