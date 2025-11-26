'use client'

import { Button } from '@/components/ui/Button'

interface AuthOptionsProps {
    onCreateAccount: () => void
    onSignIn: () => void
}

export default function AuthOptions({ onCreateAccount, onSignIn }: AuthOptionsProps) {
    return (
        <div className="w-full max-w-xs space-y-4 mb-8 animate-fade-in">
            <Button
                variant="default"
                size="lg"
                fullWidth
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
                onClick={onCreateAccount}
            >
                Create an account
            </Button>
            <div className="text-center">
                <span className="text-gray-500 text-sm">Already have an account? </span>
                <button
                    onClick={onSignIn}
                    className="text-purple-600 font-bold text-sm hover:underline"
                >
                    Sign In
                </button>
            </div>

            <div className="pt-4 text-center">
                <p className="text-xs text-gray-400 max-w-[250px] mx-auto">
                    By signing up, you agree to our Terms. See how we use your data in our Privacy Policy.
                </p>
            </div>
        </div>
    )
}
