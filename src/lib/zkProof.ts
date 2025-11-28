// Mock ZK proof verification service
// In production, this would integrate with actual ZK proof libraries like snarkjs

export interface VerifiedAttribute {
    type: 'age' | 'asset'
    threshold: string
    verified_at: string
}

export const verifyProof = async (
    proofType: 'age' | 'asset',
    value: string
): Promise<boolean> => {
    // Simulate proof generation and verification
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock verification logic
    // In production, this would:
    // 1. Generate a ZK proof that the user meets the criteria
    // 2. Verify the proof on-chain or via a verifier contract
    // 3. Return the verification result

    const numValue = parseFloat(value)

    if (isNaN(numValue) || numValue <= 0) {
        return false
    }

    // Simulate 90% success rate for valid inputs
    return Math.random() > 0.1
}

export const formatVerifiedAttribute = (
    type: 'age' | 'asset',
    threshold: string
): string => {
    if (type === 'age') {
        return `Age 18+`
    } else {
        return `${threshold}+ ETH`
    }
}

export const getVerificationBadgeColor = (type: 'age' | 'asset'): string => {
    return type === 'age' ? 'bg-blue-500' : 'bg-green-500'
}
