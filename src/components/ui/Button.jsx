import React, { useState } from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group border border-border shadow-lg backdrop-blur-md",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-br from-primary/90 to-accent/80 text-primary-foreground dark:bg-gradient-to-br dark:from-white/10 dark:to-accent/30 dark:text-white/90 hover:scale-105 hover:shadow-glow focus:scale-105 focus:shadow-glow transition-transform duration-200",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-elevated active:scale-[0.98]",
                outline: "bg-transparent border-2 border-border text-foreground dark:text-white/80 hover:bg-white/10 hover:shadow-glow hover:scale-105 focus:scale-105 transition-transform duration-200",
                secondary: "gradient-secondary text-secondary-foreground hover:shadow-elevated hover:scale-105 focus:scale-105 active:scale-95 transition-transform duration-200",
                ghost: "hover:bg-accent/10 hover:text-accent transition-colors duration-200 hover:scale-105 focus:scale-105",
                link: "text-accent underline-offset-4 hover:underline hover:text-accent/80 hover:scale-105 focus:scale-105",
                success: "bg-success text-success-foreground hover:bg-success/90 hover:shadow-elevated active:scale-[0.98]",
                warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:shadow-elevated active:scale-[0.98]",
                danger: "bg-error text-error-foreground hover:bg-error/90 hover:shadow-elevated active:scale-[0.98]",
                accent: "gradient-accent text-accent-foreground hover:shadow-glow hover:scale-105 focus:scale-105 active:scale-95 transition-transform duration-200",
                gradient: "gradient-primary text-primary-foreground hover:shadow-elevated hover:scale-105 focus:scale-105 active:scale-95 transition-transform duration-200",
                glassmorphism: "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 text-foreground dark:text-white/90 hover:bg-white/20 hover:shadow-elevated hover:scale-105 focus:scale-105",
                neon: "bg-accent text-accent-foreground hover:animate-button-glow border-2 border-accent/50 hover:border-accent hover:scale-105 focus:scale-105",
                magnetic: "bg-secondary text-secondary-foreground hover:shadow-elevated transform transition-transform duration-200 hover:-translate-y-1 hover:scale-105 focus:scale-105",
            },
            size: {
                default: "h-11 px-6 py-2.5",
                sm: "h-9 rounded-md px-4 text-sm",
                lg: "h-13 rounded-lg px-8 text-base",
                icon: "h-11 w-11 rounded-lg",
                xs: "h-8 rounded-md px-3 text-xs",
                xl: "h-16 rounded-xl px-12 text-lg font-semibold",
                full: "w-full h-12 px-6 text-base",
            },
            elevation: {
                flat: "",
                soft: "shadow-soft hover:shadow-elevated",
                elevated: "shadow-elevated hover:shadow-xl",
                floating: "shadow-xl hover:shadow-2xl transform hover:-translate-y-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            elevation: "soft",
        },
    }
);

const Button = React.forwardRef(({
    className,
    variant,
    size,
    elevation,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ripple = true,
    shimmer = false,
    onClick,
    ...props
}, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    const iconSizeMap = {
        xs: 12,
        sm: 14,
        default: 16,
        lg: 18,
        xl: 22,
        icon: 16,
        full: 18,
    };

    const calculatedIconSize = iconSize || iconSizeMap[size] || 16;

    // Enhanced loading spinner with modern design
    const LoadingSpinner = () => (
        <div className="relative">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </div>
    );

    // Icon rendering with enhanced styling
    const renderIcon = () => {
        if (!iconName) return null;

        return (
            <Icon
                name={iconName}
                size={calculatedIconSize}
                className={cn(
                    "transition-transform duration-200",
                    children && iconPosition === 'left' && "mr-2",
                    children && iconPosition === 'right' && "ml-2",
                    loading && "opacity-0"
                )}
            />
        );
    };

    // Enhanced ripple effect
    const handleClick = (e) => {
        if (!ripple || disabled || loading) {
            onClick?.(e);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size,
        };

        setRipples(prev => [...prev, newRipple]);
        setIsPressed(true);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            setIsPressed(false);
        }, 600);

        onClick?.(e);
    };

    // Shimmer effect
    const ShimmerEffect = () => (
        <div className="absolute inset-0 -top-[2px] flex overflow-hidden rounded-lg">
            <div className="animate-shimmer w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </div>
    );

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, elevation }),
                fullWidth && "w-full",
                isPressed && variant !== "ghost" && variant !== "link" && "animate-button-press",
                className
            )}
            ref={ref}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
        >
            {/* Ripple effects */}
            {ripple && ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}
            
            {/* Shimmer effect */}
            {shimmer && !loading && <ShimmerEffect />}
            
            {/* Content */}
            <span className={cn(
                "flex items-center justify-center",
                loading && "opacity-70"
            )}>
                {loading && <LoadingSpinner />}
                {iconName && iconPosition === 'left' && renderIcon()}
                {children && (
                    <span className={cn(
                        "transition-opacity duration-200",
                        loading && "opacity-0"
                    )}>
                        {children}
                    </span>
                )}
                {iconName && iconPosition === 'right' && renderIcon()}
            </span>
        </Comp>
    );
});

Button.displayName = "Button";

export default Button;