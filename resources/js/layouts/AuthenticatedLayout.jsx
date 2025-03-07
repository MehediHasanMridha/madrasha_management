import LayoutUI from '@/Components/UI/LayoutUI';
import LeftSide from '@/Container/LeftSide/LeftSide';

export default function AuthenticatedLayout({ children }) {
    return (
        <LayoutUI>
            {() => (
                <>
                    <LeftSide />
                    <LayoutUI>{({ Content }) => <Content className="h-screen overflow-y-auto px-[50px] pt-[24px]">{children}</Content>}</LayoutUI>
                </>
            )}
        </LayoutUI>
    );
}
