import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

/**
 *Король
 *
 * @export
 * @class King
 * @extends {Figure}
 */
export class King extends Figure {
  /**
   * Создать экземпляр Короля.
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof King
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof King
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    else return true;
  }
}
