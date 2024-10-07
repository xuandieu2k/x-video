import React from "react"
import Shimmer from 'react-native-shimmer-kit';
export const ShimmerTest = () => {
    return (
        <Shimmer
            width={120}
            height={120}
            borderRadius={60}
            duration={3000}
            colors={['#93C5FD', '#BFDBFE', '#BFDBFE', '#93C5FD']}
        />
    )
}