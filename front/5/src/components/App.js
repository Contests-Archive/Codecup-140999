import OpenIssueIcon from "./OpenIssueIcon";
import CloseIssueIcon from "./CloseIssueIcon";
import IssueList from "./IssueList";
import { useEffect, useState } from "react";

function App() {
  const [issues, setIssues] = useState([]);
  const [issuesFilter, setFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFinished, setFinished] = useState(false);

  const fetchList = (issuesFilter = 0) => {
    setFinished(false);
    setLoading(true);
    fetch(`http://localhost:9000/issues?page=1&issuesFilter=${issuesFilter}`)
      .then((res) => res.json())
      .then((res) => {
        setIssues([...res]);
        setLoading(false);
      });
  };

  const fetchMore = () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    fetch(
      `http://localhost:9000/issues?page=${page}&issuesFilter=${issuesFilter}`
    )
      .then((res) => res.json())
      .then((res) => {
        setIssues((prev) => [...prev, ...res]);
        setLoading(false);
        if (res.length === 0) {
          setFinished(true);
        }
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">
          <div
            data-testid="open-issues"
            className="open-issues"
            onClick={() => {
              if (issuesFilter !== 1) {
                setFilter(1);
                fetchList(1);
              }
            }}
          >
            <OpenIssueIcon /> Open
          </div>
          <div
            data-testid="close-issues"
            className="close-issues"
            onClick={() => {
              if (issuesFilter !== 2) {
                setFilter(2);
                fetchList(2);
              }
            }}
          >
            <CloseIssueIcon /> Closed
          </div>
        </div>

        <IssueList
          issues={issues}
          loading={loading}
          fetchMore={fetchMore}
          isFinished={isFinished}
        />
      </div>
    </div>
  );
}

export default App;
