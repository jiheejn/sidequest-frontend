// components/RecruitStatusBadge.tsx
interface RecruitStatusBadgeProps {
    status: 'OPEN' | 'CLOSED';
}

export function RecruitStatusBadge({ status }: RecruitStatusBadgeProps) {
    return (
        <span className={`
            inline-block px-3 py-1 rounded-full text-xs font-semibold
            ${status === 'OPEN'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }
        `}>
            {status}
        </span>
    );
}