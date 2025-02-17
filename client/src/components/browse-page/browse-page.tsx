import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Beejs } from "../../process/Beejs";

import AvatarCard from "../avatar-card/avatar-card";
import { useStore } from "../../utils/store";
import "./browse-page.css";

export default function BrowsePage() {
  let { section } = useParams();
  const page = section || "explore";
  const {
    state: { feeds, downloadingFeeds }, // , error, errorMessage
    dispatch,
  } = useStore();
  const [itemsPerPage] = useState(10);
  const [isLoadInitiated, setIsLoadInitiated] = useState(false);
  const [twitterArchives, setTwitterArchives] = useState({});
  const refreshFeeds = useCallback(() => {
    dispatch({ type: "GET_FEEDS_FROM_SWARM", itemsPerPage });
  }, [itemsPerPage, dispatch]);
  useEffect(() => {
    if (!isLoadInitiated) {
      setIsLoadInitiated(true);
      refreshFeeds();
    }
  }, [isLoadInitiated, refreshFeeds]);

  useEffect(() => {
    console.log("Browse page\n creating bee");
    const bee = new Beejs();

    console.log("Getting feed for browse page");
    bee.getFeed().then((res) => {
      console.log("feed:", res);
      setTwitterArchives(res);
    });
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Browse - Social Archive</title>
      </Helmet>
      <div className="col">
        {page === "explore" && (
          <>
            <h2 className="col-header" onClick={refreshFeeds}>
              Recently Added
            </h2>
            {Object.keys(twitterArchives).map((username) => {
              return (
                <p>
                  <a href={"/archive/" + twitterArchives[username]}>{username}</a>
                </p>
              );
            })}
            {downloadingFeeds && <div>Downloading...</div>}
            {/* {error && errorMessage.length > 0 && (
              <div className="archive-pending-error">{errorMessage}</div>
            )} */}
            {feeds.map((account, i) => {
              const { swarmHash, timestamp } = account;
              const archiveDate = new Date(timestamp).toUTCString();
              return (
                <div key={i} className="archive-row">
                  <div className="archive-timestamp">
                    <a href={`/archive/${swarmHash}`} className="archive-row">
                      {/* {archiveDate} */}
                      <div>
                        <AvatarCard archivedAccount={account} isUserRow={true} />
                        {archiveDate}
                      </div>
                    </a>
                  </div>
                  {/* <div>
                    <AvatarCard archivedAccount={account} isUserRow={true} />
                  </div> */}
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="col">
        <h2 className="col-header">Find Account</h2>
        <i>Coming Soon</i>
      </div>
    </div>
  );
}

export interface ArchivedAccount {
  timestamp: number;
  username: string;
  isArchived: boolean;
  accountDisplayName: string;
  description: {
    bio: string;
    website?: string;
    location?: string;
  };
  avatarMediaUrl: string;
  swarmHash?: string;
  archiveDate?: string;
  archiveSize?: string;
}
