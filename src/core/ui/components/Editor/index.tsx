import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

// plugins

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Bold, Italic, Strikethrough, Underline, Code } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

type Props = {
  className?: string;
  onChange: (event: any) => void;
  value?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const configuration = {
  plugins: [Alignment, Bold, Code, Essentials, Italic, Link, List, Strikethrough, Underline, Paragraph, Heading],
  fontSize: {
    options: ['default'],
  },
  toolbar: [
    'bold',
    'italic',
    'strikethrough',
    'underline',
    '|',
    'link',
    '|',
    'alignment:left',
    'alignment:center',
    'alignment:right',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'code',
    '|',
    'undo',
    'redo',
  ],
  width: 'full',
};

export const Editor: React.FC<Props> = ({ className, onChange, value, disabled }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      disabled={disabled}
      config={configuration}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange({ target: { name, value: data } });
      }}
    />
  );
};
