export const mapClaimStatus = (status: string): string => {
    let res = '';
    switch (status) {
        case 'Pending':
            res = 'pending';
            break;
        case 'Review':
            res = 'review';
            break;
        case 'Pending Acceptance':
            res = 'pending_acceptance';
            break;
        case 'Accepted':
            res = 'accepted';
            break;
        case 'Denied':
            res = 'denied';
            break;
        case 'Revoked':
            res = 'revoked';
            break;
    }
    return res;
};
