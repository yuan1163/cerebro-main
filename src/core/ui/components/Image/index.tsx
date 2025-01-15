import React from 'react';

type Props = {
    alt?: string;
    className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<Props> = ({ alt, className, ...props }) => (
    <img alt={alt || ''} className={className} {...props} />
);
