import { createPublicClient, http, normalize } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
})

export interface ENSData {
    name: string | null
    avatar: string | null
    description: string | null
    twitter: string | null
    github: string | null
    url: string | null
}

export const resolveENS = async (address: string): Promise<ENSData> => {
    try {
        // Get primary ENS name
        const ensName = await publicClient.getEnsName({
            address: address as `0x${string}`,
        })

        if (!ensName) {
            return {
                name: null,
                avatar: null,
                description: null,
                twitter: null,
                github: null,
                url: null,
            }
        }

        // Get ENS avatar
        const avatar = await publicClient.getEnsAvatar({
            name: normalize(ensName),
        })

        // Get text records
        const [description, twitter, github, url] = await Promise.all([
            publicClient.getEnsText({
                name: normalize(ensName),
                key: 'description',
            }).catch(() => null),
            publicClient.getEnsText({
                name: normalize(ensName),
                key: 'com.twitter',
            }).catch(() => null),
            publicClient.getEnsText({
                name: normalize(ensName),
                key: 'com.github',
            }).catch(() => null),
            publicClient.getEnsText({
                name: normalize(ensName),
                key: 'url',
            }).catch(() => null),
        ])

        return {
            name: ensName,
            avatar,
            description,
            twitter,
            github,
            url,
        }
    } catch (error) {
        console.error('Error resolving ENS:', error)
        return {
            name: null,
            avatar: null,
            description: null,
            twitter: null,
            github: null,
            url: null,
        }
    }
}

export const lookupAddress = async (ensName: string): Promise<string | null> => {
    try {
        const address = await publicClient.getEnsAddress({
            name: normalize(ensName),
        })
        return address
    } catch (error) {
        console.error('Error looking up ENS address:', error)
        return null
    }
}
