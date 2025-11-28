import { useSendTransaction, useAccount } from 'wagmi'
import { parseEther } from 'viem'

export const useSendGift = () => {
    const { sendTransaction } = useSendTransaction()
    const { address } = useAccount()

    const sendGift = async (recipientAddress: string, amount: string, token: 'ETH' | 'USDC') => {
        if (!address) throw new Error('Wallet not connected')

        if (token === 'ETH') {
            // Send ETH
            const tx = await sendTransaction({
                to: recipientAddress as `0x${string}`,
                value: parseEther(amount),
            })
            return tx
        } else {
            // For USDC, would need to interact with ERC20 contract
            // This is a simplified version
            throw new Error('USDC transfers not yet implemented')
        }
    }

    return { sendGift }
}
