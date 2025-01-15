// DESIGN SYSTEM

export type BrandPalette = 'primary' | 'secondary';

export type SeverityPalette = 'error' | 'success' | 'trivial' | 'warning';

export type ColorPalette =
  | 'amber'
  | 'blue'
  | 'brown'
  | 'cyan'
  | 'fuchsia'
  | 'green'
  | 'grass'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'sky'
  | 'teal'
  | 'violet'
  | 'yellow';

export type TypographyPalette =
  | 'typography-primary'
  | 'typography-secondary'
  | 'typography-tertiary'
  | 'typography-inverse'
  | 'typography-placeholder';

export type IconPalette =
  | 'icon-primary'
  | 'icon-secondary'
  | 'icon-tertiary'
  | 'icon-quaternary'
  | 'icon-inverse'
  | 'secondary-tint-active';

export type PaletteString = string & {};

export type SurfacePalette = 'surface-01' | 'surface-02' | 'surface-03';

// SPACING

export type Spacing = {
  spacing:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 16
    | 20
    | 24
    | 28
    | 32
    | 36
    | 40
    | 44
    | 48
    | 52
    | 56
    | 60
    | 64
    | 72
    | 80
    | 96;
};

// SECTION

export type PaddingSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

// GRID

export type GridDirection = 'column-reverse' | 'column' | 'row-reverse' | 'row';
export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// THEME

export type CurrentTheme = 'light' | 'dark';

// COMPONENTS

export type InputProps = {
  className?: string;
  clearButton?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  endButton?: React.ReactNode;
  endCaption?: string;
  endIcon?: React.ReactNode;
  endIconColor?: IconPalette | SeverityPalette | PaletteString;
  externalFocus?: boolean;
  helperText?: string;
  inputId?: string;
  label?: string;
  loading?: boolean;
  name?: string;
  noLabel?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: boolean;
  severity?: SeverityPalette;
  size?: 'sm' | 'md';
  startButton?: React.ReactNode;
  startCaption?: string;
  startIcon?: React.ReactNode;
  startIconColor?: IconPalette | SeverityPalette | PaletteString;
  startMenu?: React.ReactNode;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | (string & {});
  value?: any;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;
