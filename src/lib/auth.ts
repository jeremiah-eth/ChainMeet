import { verifyMessage } from 'viem'

export async function verifyWalletOwnership(address: string, signature: string, message: string): Promise<boolean> {
    try {
        const valid = await verifyMessage({
            address: address as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
        })
        return valid
    } catch (error) {
        console.error('Error verifying wallet:', error)
        return false
    }
}

export function generateVerificationMessage(address: string): string {
    return `Verify ownership of ${address} for ChainMeet login. Timestamp: ${Date.now()}`
}
