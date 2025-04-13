import { Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = ({ allData, handleScroll, children }) => {
    return (
        <div id="scrollableDiv" className="mb-3 h-[400px] overflow-auto">
            <InfiniteScroll
                dataLength={allData?.data?.length || 0}
                next={() => allData?.links.next && handleScroll(allData?.links.next)}
                hasMore={!!allData?.links.next}
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
