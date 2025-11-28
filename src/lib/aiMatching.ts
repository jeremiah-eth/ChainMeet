// Mock AI matching service
// In production, this would call an actual AI API like OpenAI

export interface MatchScore {
    score: number
    reasons: string[]
}

export const calculateCompatibility = async (
    userBio: string,
    userInterests: string[],
    matchBio: string,
    matchInterests: string[]
): Promise<MatchScore> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Calculate simple compatibility based on shared interests
    const sharedInterests = userInterests.filter(interest =>
        matchInterests.includes(interest)
    )

    const interestScore = (sharedInterests.length / Math.max(userInterests.length, matchInterests.length)) * 100

    // Mock bio similarity (in production, use embeddings/semantic similarity)
    const bioScore = Math.random() * 50 + 25

    const totalScore = Math.round((interestScore * 0.6 + bioScore * 0.4))

    const reasons = []
    if (sharedInterests.length > 0) {
        reasons.push(`You both enjoy ${sharedInterests.slice(0, 2).join(' and ')}`)
    }
    if (totalScore > 70) {
        reasons.push('Strong personality match')
    }
    if (Math.random() > 0.5) {
        reasons.push('Similar communication style')
    }

    return {
        score: Math.min(totalScore, 99),
        reasons
    }
}

export const generateIcebreaker = async (
    matchName: string,
    sharedInterests: string[]
): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    const icebreakers = [
        `Hey ${matchName}! I noticed we both love ${sharedInterests[0]}. What got you into it?`,
        `Hi ${matchName}! Fellow ${sharedInterests[0]} enthusiast here! Have any recommendations?`,
        `Hey! I see you're into ${sharedInterests[0]} too. That's awesome! What's your favorite part about it?`,
        `Hi ${matchName}! ${sharedInterests[0]} caught my eye on your profile. We should chat about it!`,
    ]

    return icebreakers[Math.floor(Math.random() * icebreakers.length)]
}
