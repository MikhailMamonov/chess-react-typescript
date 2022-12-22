import { FC } from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((fig) => (
        <div key={fig.id}>
          {fig.name}{' '}
          {fig.logo && <img src={fig.logo} width={20} height={20} alt="" />}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
