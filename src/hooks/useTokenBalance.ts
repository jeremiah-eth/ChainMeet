): Promise<boolean> => {
    // In production, check actual token balance
    // For now, simulate
    await new Promise(resolve => setTimeout(resolve, 500))
    return Math.random() > 0.3
}
