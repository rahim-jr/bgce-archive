"use client";

interface PasswordStrengthIndicatorProps {
    password: string;
    strength: number;
}

export function PasswordStrengthIndicator({ password, strength }: PasswordStrengthIndicatorProps) {
    const getLabel = () => {
        if (strength === 0) return "";
        if (strength < 40) return "Weak";
        if (strength < 70) return "Fair";
        if (strength < 90) return "Good";
        return "Strong";
    };

    const getColor = () => {
        if (strength < 40) return "bg-red-500";
        if (strength < 70) return "bg-yellow-500";
        if (strength < 90) return "bg-blue-500";
        return "bg-green-500";
    };

    const getTextColor = () => {
        if (strength < 40) return "text-red-500";
        if (strength < 70) return "text-yellow-500";
        if (strength < 90) return "text-blue-500";
        return "text-green-500";
    };

    if (!password) return null;

    return (
        <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-semibold ${getTextColor()}`}>
                    {getLabel()}
                </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${getColor()}`}
                    style={{ width: `${strength}%` }}
                />
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
                <p className={password.length >= 8 ? 'text-green-500' : ''}>
                    • At least 8 characters
                </p>
                <p className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-500' : ''}>
                    • Mix of uppercase and lowercase
                </p>
                <p className={/\d/.test(password) ? 'text-green-500' : ''}>
                    • At least one number
                </p>
            </div>
        </div>
    );
}
