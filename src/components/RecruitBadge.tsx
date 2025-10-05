import React from "react";

interface RecruitBadgeProps{
    status: 'open' | 'closed';
}

export const RecruitBadge: React.FC<RecruitBadgeProps> = ({status}) =>{
    const isClosed = status === 'closed';
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
            isClosed
            ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
        }`}
    >
            {isClosed ? 'closed' : 'open'}
        </span>
    );
}