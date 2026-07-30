import { USER_ROLES } from '../utils/constants';

// Hard-coded user credentials
export const CREDENTIALS = {
    admin: {
        username: 'admin',
        password: 'admin123',
        role: USER_ROLES.ADMIN,
        name: 'Admin User',
        email: 'admin@goldarc.com',
    },
    franchiseOwner: {
        username: 'owner',
        password: 'owner123',
        role: USER_ROLES.ADMIN,
        name: 'Franchise Owner',
        email: 'owner@goldarc.com',
    },
    headOffice: {
        username: 'headoffice',
        password: 'headoffice123',
        role: USER_ROLES.ADMIN,
        name: 'Head Office Manager',
        email: 'headoffice@goldarc.com',
    },
    branches: [
        {
            id: 'branch_1',
            username: 'mumbai',
            password: 'mumbai123',
            role: USER_ROLES.FRANCHISE_BRANCH,
            name: 'Mumbai Branch',
            location: 'Mumbai, Maharashtra',
            email: 'mumbai@goldarc.com',
            branchCode: 'MUM001',
        },
        {
            id: 'branch_2',
            username: 'delhi',
            password: 'delhi123',
            role: USER_ROLES.FRANCHISE_BRANCH,
            name: 'Delhi Branch',
            location: 'New Delhi, Delhi',
            email: 'delhi@goldarc.com',
            branchCode: 'DEL002',
        },
        {
            id: 'branch_3',
            username: 'bangalore',
            password: 'bangalore123',
            role: USER_ROLES.FRANCHISE_BRANCH,
            name: 'Bangalore Branch',
            location: 'Bangalore, Karnataka',
            email: 'bangalore@goldarc.com',
            branchCode: 'BLR003',
        },
        {
            id: 'branch_4',
            username: 'chennai',
            password: 'chennai123',
            role: USER_ROLES.FRANCHISE_BRANCH,
            name: 'Chennai Branch',
            location: 'Chennai, Tamil Nadu',
            email: 'chennai@goldarc.com',
            branchCode: 'CHN004',
        },
    ],
};

// Validate login credentials
export const validateCredentials = (username, password) => {
    // Check administrative users
    const adminUser = [CREDENTIALS.admin, CREDENTIALS.franchiseOwner, CREDENTIALS.headOffice].find(
        u => u.username === username && u.password === password
    );
    if (adminUser) return adminUser;

    // Check branches
    const branch = CREDENTIALS.branches.find(
        b => b.username === username && b.password === password
    );
    if (branch) {
        return branch;
    }

    return null;
};

// Get all branch credentials (only accessible to admin)
export const getAllBranchCredentials = () => {
    return CREDENTIALS.branches.map(branch => ({
        name: branch.name,
        username: branch.username,
        password: branch.password,
        location: branch.location,
        branchCode: branch.branchCode,
    }));
};
