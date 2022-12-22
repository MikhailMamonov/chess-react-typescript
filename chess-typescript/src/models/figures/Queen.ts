import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';

/**
 *Ферзь
 *
 * @export
 * @class Queen
 * @extends {Figure}
 */
export class Queen extends Figure {
  /**
   *Создать экземпляр Ферзя
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Queen
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof Queen
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyVertical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false;
  }
}
