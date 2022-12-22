import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

/**
 *Конь
 *
 * @export
 * @class Knight
 * @extends {Figure}
 */
export class Knight extends Figure {
  /**
   *Создать экземпляр Коня
   * @param {Colors} color
   * @param {Cell} cell
   * @memberof Knight
   */
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  /**
   *
   *
   * @param {Cell} targetCell
   * @return {*}  {boolean}
   * @memberof Knight
   */
  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    const dx = Math.abs(this.cell.x - targetCell.x);
    const dy = Math.abs(this.cell.y - targetCell.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
