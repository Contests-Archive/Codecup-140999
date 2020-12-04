import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Loading from "./Loading";
import IssueItem from "./IssueItem";
import { useEffect } from "react";

function IssueList(props) {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  function fetchMoreListItems() {
    props.fetchMore();
  }

  useEffect(() => {
    if (isFetching && !props.isFinished) {
      fetchMoreListItems();
    } else {
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (props.issues && isFetching) {
      setIsFetching(false);
    }
  }, [props.issues]);

  return (
    <>
      <div className="issues" data-testid="issues">
        {props.issues &&
          props.issues.map((item, index) => (
            <IssueItem key={index} issue={item} />
          ))}
      </div>
      {(props.loading || isFetching) && <Loading />}
    </>
  );
}

export default IssueList;
