export function truncateAddress(address: string) {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

export function formatTime(date: string | Date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}
