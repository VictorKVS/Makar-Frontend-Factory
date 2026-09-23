import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

type SurfaceTone = "base" | "elevated" | "interactive";
type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  tone?: SurfaceTone;
  glow?: "none" | "soft" | "medium" | "strong";
  children: ReactNode;
};

export function GlassPanel({
  tone = "base",
  glow = "soft",
  className = "",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <section
      className={`ff-glass-panel ff-surface-${tone} ff-glow-${glow} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  iconOnly?: boolean;
};

export function Button({
  variant = "secondary",
  iconOnly = false,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ff-button ff-button-${variant} ${iconOnly ? "ff-button-icon" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton(props: ButtonProps) {
  return <Button {...props} iconOnly />;
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone;
};

export function Badge({ tone = "neutral", className = "", children, ...props }: BadgeProps) {
  return (
    <span className={`ff-badge ff-status-${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Exclude<StatusTone, "neutral">;
  label: string;
};

export function StatusIndicator({
  tone = "info",
  label,
  className = "",
  ...props
}: StatusIndicatorProps) {
  return (
    <span className={`ff-status-indicator ff-status-${tone} ${className}`.trim()} {...props}>
      <span className="ff-status-dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export type MetricCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "neutral" | "success" | "warning" | "danger";
};

export function MetricCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  className = "",
  ...props
}: MetricCardProps) {
  return (
    <div className={`ff-metric-card ${className}`.trim()} {...props}>
      <span className="ff-metric-label">{label}</span>
      <strong className="ff-metric-value">{value}</strong>
      {delta ? <Badge tone={deltaTone}>{delta}</Badge> : null}
    </div>
  );
}

export type NavigationItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  icon?: ReactNode;
  label: string;
  description?: string;
};

export function NavigationItem({
  active = false,
  icon,
  label,
  description,
  className = "",
  ...props
}: NavigationItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={`ff-nav-item ${active ? "is-active" : ""} ${className}`.trim()}
      {...props}
    >
      {icon ? <span className="ff-nav-icon">{icon}</span> : null}
      <span className="ff-nav-copy">
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </button>
  );
}

export type CommandBarProps = HTMLAttributes<HTMLFormElement> & {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmitCommand?: (value: string) => void;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "placeholder">;
};

export function CommandBar({
  placeholder = "Ask ALINA…",
  value = "",
  onValueChange,
  onSubmitCommand,
  startSlot,
  endSlot,
  className = "",
  inputProps,
  ...props
}: CommandBarProps) {
  return (
    <form
      className={`ff-command-bar ${className}`.trim()}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitCommand?.(value);
      }}
      {...props}
    >
      {startSlot ? <span className="ff-command-slot">{startSlot}</span> : null}
      <input
        {...inputProps}
        className={`ff-command-input ${inputProps?.className ?? ""}`.trim()}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange?.(event.target.value)}
      />
      {endSlot ? <span className="ff-command-slot">{endSlot}</span> : null}
    </form>
  );
}
