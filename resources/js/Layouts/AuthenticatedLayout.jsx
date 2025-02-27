import LayoutUI from "@/Components/LayoutUI";
import LeftSide from "@/Container/LeftSide/LeftSide";

export default function AuthenticatedLayout({ children }) {
    return (
        <LayoutUI>
            {() => (
                <>
                    <LeftSide />
                    <LayoutUI>
                        {({ Content }) => (
                            <Content className="overflow-y-auto h-screen">
                                {children}
                            </Content>
                        )}
                    </LayoutUI>
                </>
            )}
        </LayoutUI>
    );
}
