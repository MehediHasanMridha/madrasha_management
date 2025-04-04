import { Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = ({ allData, handleScroll, children }) => {
    return (
        <div id="scrollableDiv" className="mb-3 h-[400px] overflow-auto">
            <InfiniteScroll
                dataLength={allData?.data?.length || 0}
                next={() => allData?.next_page_url && handleScroll(allData.next_page_url)}
                hasMore={!!allData?.next_page_url}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {children}
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollComponent;
