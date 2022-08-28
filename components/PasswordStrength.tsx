const ZXCVBN = require("zxcvbn")

interface passwordProps {
    password: string
}

export default function PasswordStrength({ password }: passwordProps) {
    const getPasswordScore = (password: string) => {
        if (password.length >= 12) {
            return 4
        }
        const checkPassword = ZXCVBN(password)
        return checkPassword.score
    }

    const score = getPasswordScore(password)

    const showPasswordProps = () => {
        switch (score) {
            case 0:
                return {
                    color: "#64748b",
                    label: "Too Weak!",
                }
            case 1:
                return {
                    color: "#dc2626",
                    label: "Weak!",
                }
            case 2:
                return {
                    color: "#f59e0b",
                    label: "Acceptable!",
                }
            case 3:
                return {
                    color: "#10b981",
                    label: "Good!",
                }
            case 4:
                return {
                    color: "#45ba64",
                    label: "Strong 💪",
                }
            default: {
                return {
                    color: "#e2e8f0",
                    label: "Too Strong!",
                }
            }
        }
    }

    return (
        <div className="">
            <p className="text-md font-semibold" style={{ color: showPasswordProps().color }}>   {showPasswordProps().label}
            </p>
        </div>
    )
}
