import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';

/**
 *Ладья
 *
 * @export
 * @class Rook
 * @extends {Figure}
 */
export class Rook extends Figure {
  /**
   *Создать экземпляр Ладьи
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Rook
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof Rook
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyVertical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;
    return false;
  }
}
