import { useState } from 'react';

const useProfile = () => {
    const userProfileSession = localStorage.getItem('currentUser');
    const [loading] = useState(userProfileSession ? false : true);
    const [userProfile] = useState(userProfileSession ? userProfileSession : null);

    return { userProfile, loading };
};

export { useProfile };
