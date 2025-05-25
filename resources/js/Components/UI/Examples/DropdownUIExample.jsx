import DropdownUI from '@/Components/UI/DropdownUI';
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

/**
 * Example component to demonstrate the usage of DropdownUI component
 */
const DropdownUIExample = () => {
    const handleSelect = (e) => {
        console.log('Selected menu item:', e.key);
    };

    // Example menu items
    const userMenuItems = [
        {
            label: 'Profile',
            key: 'profile',
            icon: <UserOutlined />,
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <SettingOutlined />,
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    // Example nested menu items
    const nestedMenuItems = [
        {
            label: 'User Management',
            key: 'user-management',
            children: [
                {
                    label: 'Add User',
                    key: 'add-user',
                },
                {
                    label: 'List Users',
                    key: 'list-users',
                },
                {
                    label: 'User Roles',
                    key: 'user-roles',
                    children: [
                        {
                            label: 'Admin',
                            key: 'admin-role',
                        },
                        {
                            label: 'Editor',
                            key: 'editor-role',
                        },
                        {
                            label: 'Viewer',
                            key: 'viewer-role',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Content Management',
            key: 'content-management',
            children: [
                {
                    label: 'Posts',
                    key: 'posts',
                },
                {
                    label: 'Pages',
                    key: 'pages',
                },
            ],
        },
    ];

    return (
        <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">DropdownUI Component Examples</h1>

            <div className="space-y-8">
                {/* Basic usage */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Basic Usage</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI items={userMenuItems} onSelect={handleSelect}>
                            <a onClick={(e) => e.preventDefault()}>
                                User Menu <DownOutlined />
                            </a>
                        </DropdownUI>
                    </div>
                </div>

                {/* With arrow */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">With Arrow</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI items={userMenuItems} arrow onSelect={handleSelect}>
                            <button className="flex items-center space-x-2 rounded border px-4 py-2">
                                <span>With Arrow</span> <DownOutlined />
                            </button>
                        </DropdownUI>
                    </div>
                </div>

                {/* Nested menus */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Nested Menus</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI items={nestedMenuItems} onSelect={handleSelect}>
                            <button className="rounded bg-blue-500 px-4 py-2 text-white">
                                Nested Menu <DownOutlined />
                            </button>
                        </DropdownUI>
                    </div>
                </div>

                {/* Different placements */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Different Placements</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <DropdownUI items={userMenuItems} placement="bottomLeft">
                            <button className="rounded border px-3 py-1">Bottom Left</button>
                        </DropdownUI>
                        <DropdownUI items={userMenuItems} placement="bottomRight">
                            <button className="rounded border px-3 py-1">Bottom Right</button>
                        </DropdownUI>
                        <DropdownUI items={userMenuItems} placement="topLeft">
                            <button className="rounded border px-3 py-1">Top Left</button>
                        </DropdownUI>
                        <DropdownUI items={userMenuItems} placement="topRight">
                            <button className="rounded border px-3 py-1">Top Right</button>
                        </DropdownUI>
                    </div>
                </div>

                {/* Hover trigger */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Hover Trigger</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI items={userMenuItems} trigger="hover">
                            <button className="rounded bg-gray-200 px-4 py-2">Hover Me</button>
                        </DropdownUI>
                    </div>
                </div>

                {/* Custom styling */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Custom Styling</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI
                            items={userMenuItems}
                            BgActiveColor="#f0f7ee"
                            selectableFontColor="#4caf50"
                            BgHover="#e8f5e9"
                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                            arrow
                        >
                            <button className="rounded bg-green-500 px-4 py-2 text-white">
                                Custom Styled <DownOutlined />
                            </button>
                        </DropdownUI>
                    </div>
                </div>

                {/* Disabled state */}
                <div className="rounded-lg border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Disabled State</h2>
                    <div className="flex items-center space-x-4">
                        <DropdownUI items={userMenuItems} disabled>
                            <button className="cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-gray-500">
                                Disabled Menu <DownOutlined />
                            </button>
                        </DropdownUI>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownUIExample;
