interface RecruitStatusBadgeProps {
    status: 'OPEN' | 'CLOSED';
}

export function RecruitStatusBadge({ status }: RecruitStatusBadgeProps) {
    return (
        <span className={`
            inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium
            ${status === 'OPEN'
            ? 'bg-accent/10 text-accent-foreground'
            : 'bg-secondary text-muted-foreground'
        }
        `}>
            <span className={`h-1.5 w-1.5 rounded-full ${
                status === 'OPEN' ? 'bg-accent' : 'bg-muted-foreground/50'
            }`} />
            {status === 'OPEN' ? 'Open' : 'Closed'}
        </span>
    );
}
