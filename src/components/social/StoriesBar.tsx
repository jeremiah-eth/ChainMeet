'use client'

import { Plus } from 'lucide-react'

interface Story {
    id: string
    profile: {
        display_name: string
        photo_url: string
    }
    has_viewed: boolean
}

interface StoriesBarProps {
    stories: Story[]
    onStoryClick: (storyId: string) => void
    onAddStory: () => void
}

export default function StoriesBar({ stories, onStoryClick, onAddStory }: StoriesBarProps) {
    return (
        <div className="bg-white border-b border-gray-100 py-4">
            <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
                {/* Add Story Button */}
                <button
                    onClick={onAddStory}
                    className="flex-shrink-0 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-2">
                        <Plus className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-medium text-gray-900 truncate w-16">
                        Your Story
                    </p>
                </button>

                {/* Stories */}
                {stories.map((story) => (
                    <button
                        key={story.id}
                        onClick={() => onStoryClick(story.id)}
                        className="flex-shrink-0 text-center"
                    >
                        <div className={`w-16 h-16 rounded-full p-0.5 mb-2 ${story.has_viewed
                                ? 'bg-gray-300'
                                : 'bg-gradient-to-br from-purple-600 to-pink-600'
                            }`}>
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                                <img
                                    src={story.profile.photo_url}
                                    alt={story.profile.display_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <p className="text-xs font-medium text-gray-900 truncate w-16">
                            {story.profile.display_name}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}
