/* eslint-disable react/no-danger */
import { classNames } from 'utils/helpers';

type HtmlViewProps = {
  html: string;
  className?: string;
};

const HtmlView = ({ html, className }: HtmlViewProps) => (
  <div
    className={classNames('html-view-container prose max-w-none', className ?? '')}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default HtmlView;
