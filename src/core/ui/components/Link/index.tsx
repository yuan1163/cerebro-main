import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

// styles

import cn from 'classnames';
import styles from './styles.module.scss';

type Props = ReactRouterLinkProps & React.RefAttributes<HTMLAnchorElement>;

export const Link: React.FC<Props> = ({ children, ...props }) => (
  <ReactRouterLink className={styles['link']} {...props}>
    {children}
  </ReactRouterLink>
);
