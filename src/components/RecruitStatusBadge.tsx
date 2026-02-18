// components/RecruitStatusBadge.tsx
interface RecruitStatusBadgeProps {
    status: 'OPEN' | 'CLOSED';
}

export function RecruitStatusBadge({ status }: RecruitStatusBadgeProps) {
    return (
        <span className={`
            inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border-2
            ${status === 'OPEN'
            ? 'bg-primary/15 text-primary border-primary/40'
            : 'bg-muted text-muted-foreground border-border'
        }
        `}>
            {status}
        </span>
    );
}
