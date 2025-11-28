export const generateReferralCode = (walletAddress: string): string => {
    const hash = walletAddress.slice(2, 10).toUpperCase()
    return `CM-${hash}`
}

export const trackReferral = async (
    referrerCode: string,
    newUserAddress: string
): Promise<boolean> => {
    // In production, store in database
    await new Promise(resolve => setTimeout(resolve, 500))
    return true
}

export const getReferralStats = async (
    userAddress: string
): Promise<{
    code: string
    referrals: number
    rewards: string
}> => {
    return {
        code: generateReferralCode(userAddress),
        referrals: Math.floor(Math.random() * 10),
        rewards: (Math.random() * 0.1).toFixed(4)
    }
}
