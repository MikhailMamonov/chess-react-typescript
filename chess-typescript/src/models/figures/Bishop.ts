import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';

/**
 *Слон
 *
 * @export
 * @class Bishop
 * @extends {Figure}
 */
export class Bishop extends Figure {
  /**
   * Создать экземпляр слона.
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Bishop
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof Bishop
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false;
  }
}
