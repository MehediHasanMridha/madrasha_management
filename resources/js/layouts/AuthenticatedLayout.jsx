import LayoutUI from '@/Components/LayoutUI';
import LeftSide from '@/Container/LeftSide/LeftSide';

export default function AuthenticatedLayout({ children }) {
    return (
        <LayoutUI>
            {() => (
                <>
                    <LeftSide />
                    <LayoutUI>{({ Content }) => <Content className="h-screen overflow-y-auto">{children}</Content>}</LayoutUI>
                </>
            )}
        </LayoutUI>
    );
}
